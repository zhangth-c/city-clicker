import { getPrestigeCurrencyId } from "./progression.js";

export function calculateDerivedState(content, state) {
  const purchasedUpgrades = getPurchasedUpgrades(content, state);
  const effects = purchasedUpgrades.flatMap((upgrade) => upgrade.effects || []);
  const uniqueDistricts = content.buildings.filter(
    (building) => Number(state.ownedBuildings[building.id] || 0) > 0
  ).length;
  const passiveCurrencyIds = Object.keys(content.currencies).filter((currencyId) => currencyId !== "residents");

  const residentsByBuilding = {};
  const synergyStateByBuilding = {};
  let residents = 0;

  content.buildings.forEach((building) => {
    const count = Number(state.ownedBuildings[building.id] || 0);
    const baseResidents = Number((building.statsPerOwned && building.statsPerOwned.residents) || 0);
    const synergyState = getBuildingSynergyState(content, state, building);
    const residentMultiplier =
      getResidentMultiplier(building.id, effects) *
      getTargetMultiplier(synergyState.statMultipliers, "residents");
    const totalResidents = Math.round(count * baseResidents * residentMultiplier);
    synergyStateByBuilding[building.id] = synergyState;
    residentsByBuilding[building.id] = totalResidents;
    residents += totalResidents;
  });

  const grossPerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));
  const maintenancePerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));
  const passivePerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));
  const globalIncomeMultipliers = Object.fromEntries(
    passiveCurrencyIds.map((currencyId) => [
      currencyId,
      getGlobalIncomeMultiplier(content, state, currencyId, effects, uniqueDistricts)
    ])
  );
  const perBuilding = {};

  content.buildings.forEach((building) => {
    const count = Number(state.ownedBuildings[building.id] || 0);
    const synergyState = synergyStateByBuilding[building.id] || createEmptySynergyState();
    const outputs = {};
    const maintenance = {};

    Object.entries(building.outputPerSecond || {}).forEach(([currencyId, baseAmount]) => {
      const amountPerBuilding =
        Number(baseAmount) *
        globalIncomeMultipliers[currencyId] *
        getBuildingOutputMultiplier(building.id, currencyId, effects) *
        getTargetMultiplier(synergyState.outputMultipliers, currencyId);
      outputs[currencyId] = amountPerBuilding;
      grossPerSecond[currencyId] += amountPerBuilding * count;
      passivePerSecond[currencyId] += amountPerBuilding * count;
    });

    Object.entries(building.maintenancePerSecond || {}).forEach(([currencyId, baseAmount]) => {
      const amountPerBuilding =
        Number(baseAmount) *
        getBuildingMaintenanceMultiplier(building.id, currencyId, effects) *
        getTargetMultiplier(synergyState.maintenanceMultipliers, currencyId);
      maintenance[currencyId] = amountPerBuilding;
      maintenancePerSecond[currencyId] += amountPerBuilding * count;
      passivePerSecond[currencyId] -= amountPerBuilding * count;
    });

    perBuilding[building.id] = {
      count,
      outputs,
      maintenance,
      residents: residentsByBuilding[building.id],
      synergies: synergyState.activeBonuses
    };
  });

  const clickBase =
    Number(content.startingState.baseCoinsPerClick || 0) +
    Math.floor(residents / Number(content.startingState.residentsPerClickBonus || 1)) *
      Number(content.startingState.coinsPerClickPerResidentBonus || 0) +
    getClickBonus(effects);
  const coinsPerClick = clickBase * globalIncomeMultipliers.coins;

  return {
    purchasedUpgrades,
    effects,
    residents,
    perBuilding,
    grossPerSecond,
    maintenancePerSecond,
    passivePerSecond,
    globalIncomeMultipliers,
    coinsPerClick,
    uniqueDistricts
  };
}

export function canAfford(state, cost) {
  return Object.entries(cost).every(([currencyId, amount]) => {
    return Number(state.currencies[currencyId] || 0) >= Number(amount);
  });
}

export function getBuildingCost(content, state, derived, building) {
  const owned = Number(state.ownedBuildings[building.id] || 0);
  const purchasedEffects = derived
    ? derived.effects
    : getPurchasedUpgrades(content, state).flatMap((upgrade) => upgrade.effects || []);
  const growth = Number(content.formulas.buildingCostGrowth || 1.15);
  const costs = {};

  Object.entries(building.baseCost || {}).forEach(([currencyId, baseCost]) => {
    let multiplier = 1;
    purchasedEffects.forEach((effect) => {
      if (
        effect.type === "buildingCostMultiplier" &&
        effect.currency === currencyId &&
        (effect.targets === "all" ||
          (Array.isArray(effect.buildingIds) && effect.buildingIds.includes(building.id)))
      ) {
        multiplier *= Number(effect.multiplier || 1);
      }
    });
    costs[currencyId] = Math.max(1, Math.floor(Number(baseCost) * Math.pow(growth, owned) * multiplier));
  });

  return costs;
}

export function spendCost(state, cost) {
  Object.entries(cost).forEach(([currencyId, amount]) => {
    state.currencies[currencyId] = Math.max(0, Number(state.currencies[currencyId] || 0) - Number(amount));
  });
}

function createEmptySynergyState() {
  return {
    outputMultipliers: {},
    statMultipliers: {},
    maintenanceMultipliers: {},
    activeBonuses: []
  };
}

function getBuildingMaintenanceMultiplier(buildingId, currencyId, effects) {
  return effects.reduce((multiplier, effect) => {
    if (
      effect.type === "maintenanceMultiplier" &&
      effect.currency === currencyId &&
      (effect.targets === "all" ||
        (Array.isArray(effect.buildingIds) && effect.buildingIds.includes(buildingId)))
    ) {
      return multiplier * Number(effect.multiplier || 1);
    }

    return multiplier;
  }, 1);
}

function getBuildingOutputMultiplier(buildingId, currencyId, effects) {
  return effects.reduce((multiplier, effect) => {
    if (
      effect.type === "incomeMultiplier" &&
      Array.isArray(effect.currencies) &&
      effect.currencies.includes(currencyId) &&
      Array.isArray(effect.buildingIds) &&
      effect.buildingIds.includes(buildingId)
    ) {
      return multiplier * Number(effect.multiplier || 1);
    }

    if (
      effect.type === "buildingOutputMultiplier" &&
      Array.isArray(effect.buildingIds) &&
      effect.buildingIds.includes(buildingId)
    ) {
      return multiplier * Number(effect.multiplier || 1);
    }

    return multiplier;
  }, 1);
}

function getBuildingSynergyState(content, state, building) {
  const synergyState = createEmptySynergyState();

  (building.synergies || []).forEach((rule) => {
    if (!rule || !rule.targetType || !rule.target) {
      return;
    }

    const triggerSize = Math.max(1, Number(rule.perOwned || 1));
    const sourceCount = getSynergySourceCount(content, state, rule);
    const steps = Math.floor(sourceCount / triggerSize);

    if (steps <= 0) {
      return;
    }

    const perStepBonus = Number(rule.bonus || 0);
    const rawBonus = steps * perStepBonus;
    const cappedBonus = Number.isFinite(Number(rule.cap))
      ? perStepBonus >= 0
        ? Math.min(rawBonus, Number(rule.cap))
        : Math.max(rawBonus, Number(rule.cap))
      : rawBonus;
    const multiplier = Math.max(0, 1 + cappedBonus);
    const bucket = getSynergyBucket(synergyState, rule.targetType);

    bucket[rule.target] = getTargetMultiplier(bucket, rule.target) * multiplier;
    synergyState.activeBonuses.push({
      label: rule.label || "District synergy",
      targetType: rule.targetType,
      target: rule.target,
      bonus: cappedBonus
    });
  });

  return synergyState;
}

function getClickBonus(effects) {
  return effects.reduce((total, effect) => {
    if (effect.type === "clickBonus" && effect.currency === "coins") {
      return total + Number(effect.amount || 0);
    }
    return total;
  }, 0);
}

function getGlobalIncomeMultiplier(content, state, currencyId, effects, uniqueDistricts) {
  let multiplier = 1;

  effects.forEach((effect) => {
    if (
      effect.type === "incomeMultiplier" &&
      Array.isArray(effect.currencies) &&
      effect.currencies.includes(currencyId) &&
      effect.targets === "all" &&
      !effect.buildingIds
    ) {
      multiplier *= Number(effect.multiplier || 1);
    }

    if (
      (effect.type === "appealToIncomeBonus" || effect.type === "resourceToIncomeBonus") &&
      effect.targetCurrency === currencyId
    ) {
      multiplier *= 1 + Number(state.currencies[effect.sourceCurrency] || 0) * Number(effect.ratePerPoint || 0);
    }

    if (effect.type === "uniqueBuildingIncomeBonus") {
      const bonus = Math.min(
        Number(effect.ratePerUniqueOwned || 0) * uniqueDistricts,
        Number(effect.cap || 0)
      );
      multiplier *= 1 + bonus;
    }
  });

  multiplier *= getPrestigeIncomeMultiplier(content, state, currencyId);
  return multiplier;
}

function getPrestigeIncomeMultiplier(content, state, currencyId) {
  const system = content.systems.annexation;
  const prestigeCurrencyId = getPrestigeCurrencyId(content);
  const prestigeCount = Number(state.currencies[prestigeCurrencyId] || 0);

  if (!system || prestigeCount <= 0) {
    return 1;
  }

  return (system.permanentBonuses || []).reduce((multiplier, bonus) => {
    if (bonus.type === "incomeMultiplierPerPrestige" && bonus.currency === currencyId) {
      return multiplier * (1 + prestigeCount * Number(bonus.multiplierPerPoint || 0));
    }
    return multiplier;
  }, 1);
}

function getPurchasedUpgrades(content, state) {
  const purchasedSet = new Set(state.purchasedUpgrades);
  return content.globalUpgrades.filter((upgrade) => purchasedSet.has(upgrade.id));
}

function getResidentMultiplier(buildingId, effects) {
  return effects.reduce((multiplier, effect) => {
    if (
      effect.type === "statMultiplier" &&
      effect.stat === "residents" &&
      Array.isArray(effect.buildingIds) &&
      effect.buildingIds.includes(buildingId)
    ) {
      return multiplier * Number(effect.multiplier || 1);
    }
    return multiplier;
  }, 1);
}

function getSynergyBucket(synergyState, targetType) {
  if (targetType === "stat") {
    return synergyState.statMultipliers;
  }
  if (targetType === "maintenance") {
    return synergyState.maintenanceMultipliers;
  }
  return synergyState.outputMultipliers;
}

function getSynergySourceCount(content, state, rule) {
  const sourceIds = new Set(Array.isArray(rule.sourceBuildingIds) ? rule.sourceBuildingIds : []);

  if (Array.isArray(rule.sourceCategories)) {
    content.buildings.forEach((building) => {
      if (rule.sourceCategories.includes(building.category)) {
        sourceIds.add(building.id);
      }
    });
  }

  return Array.from(sourceIds).reduce((sum, buildingId) => {
    return sum + Number(state.ownedBuildings[buildingId] || 0);
  }, 0);
}

function getTargetMultiplier(targetMap, targetId) {
  return Number(targetMap[targetId] || 1);
}
