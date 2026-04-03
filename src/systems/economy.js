export function getAreaById(content, areaId) {
  return content.areas.find((area) => area.id === areaId) || null;
}

export function getBuildingById(content, buildingId) {
  return content.buildings.find((building) => building.id === buildingId) || null;
}

export function getAreaDistricts(state, areaId) {
  return Math.max(0, Number(state.areas?.[areaId]?.districts || 0));
}

export function getPolicyById(content, policyId) {
  return content.policies.find((policy) => policy.id === policyId) || null;
}

export function getCurrencyDefinition(content, currencyId) {
  return content.indexes.currencyIndex[currencyId] || null;
}

export function isPopulationCurrency(content, currencyId) {
  return content.areas.some((area) => area.populationCurrencyId === currencyId);
}

export function getCurrencyAmount(content, state, derived, currencyId) {
  const currency = getCurrencyDefinition(content, currencyId);
  if (!currency) {
    return 0;
  }

  if (currency.scope === "shared") {
    return Number(state.sharedCurrencies?.[currencyId] || 0);
  }

  if (isPopulationCurrency(content, currencyId) && derived?.populationByArea) {
    return Number(derived.populationByArea[currency.areaId] || 0);
  }

  return Number(state.areas?.[currency.areaId]?.currencies?.[currencyId] || 0);
}

export function addCurrency(content, state, currencyId, amount) {
  const currency = getCurrencyDefinition(content, currencyId);
  if (!currency) {
    return;
  }

  if (currency.scope === "shared") {
    state.sharedCurrencies[currencyId] = Math.max(0, Number(state.sharedCurrencies[currencyId] || 0) + Number(amount || 0));
    return;
  }

  state.areas[currency.areaId].currencies[currencyId] = Math.max(
    0,
    Number(state.areas[currency.areaId].currencies[currencyId] || 0) + Number(amount || 0)
  );
}

export function canAfford(content, state, derived, cost) {
  return Object.entries(cost || {}).every(([currencyId, amount]) => {
    return getCurrencyAmount(content, state, derived, currencyId) >= Number(amount);
  });
}

export function spendCost(content, state, cost) {
  Object.entries(cost || {}).forEach(([currencyId, amount]) => {
    addCurrency(content, state, currencyId, -Number(amount));
  });
}

export function getPurchasedPolicies(content, state) {
  const purchasedSet = new Set(state.purchasedPolicies || []);
  return content.policies.filter((policy) => purchasedSet.has(policy.id));
}

export function getPolicyBlockedReason(content, state, policy) {
  if (!policy?.exclusiveGroupId) {
    return "";
  }
  const chosenPolicyId = state.policyChoices?.[policy.exclusiveGroupId];
  if (!chosenPolicyId || chosenPolicyId === policy.id) {
    return "";
  }
  const chosenPolicy = getPolicyById(content, chosenPolicyId);
  return chosenPolicy ? `Blocked by ${getPolicyDisplayName(chosenPolicy)}` : "Blocked by another branch";
}

function getPolicyDisplayName(policy) {
  if (policy?.name) {
    return policy.name;
  }

  return String(policy?.id || "another branch")
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getBuildingCost(content, state, derived, building) {
  const owned = Number(state.ownedBuildings?.[building.id] || 0);
  const growth = Number(content.formulas?.buildingCostGrowth || 1.15);
  const effects = derived?.effects || getPurchasedPolicies(content, state).flatMap((policy) => policy.effects || []);
  const cost = {};

  Object.entries(building.baseCost || {}).forEach(([currencyId, baseAmount]) => {
    const multiplier = effects.reduce((running, effect) => {
      if (
        effect.type !== "buildingCostMultiplier" ||
        effect.areaId !== building.areaId ||
        effect.currency !== currencyId
      ) {
        return running;
      }
      if (Array.isArray(effect.buildingIds) && !effect.buildingIds.includes(building.id)) {
        return running;
      }
      return running * Number(effect.multiplier || 1);
    }, 1);

    cost[currencyId] = Math.max(1, Math.floor(Number(baseAmount) * Math.pow(growth, owned) * multiplier));
  });

  return cost;
}

export function calculateDerivedState(content, state) {
  const purchasedPolicies = getPurchasedPolicies(content, state);
  const effects = purchasedPolicies.flatMap((policy) =>
    (policy.effects || []).map((effect) => ({
      ...effect,
      policyId: policy.id,
      policyName: policy.name,
      areaId: effect.areaId || policy.areaId
    }))
  );
  const activeAreaIds = new Set(state.areas?.unlockedAreaIds || [content.defaultAreaId]);
  const passiveCurrencyIds = content.indexes.allCurrencyIds.filter((currencyId) => {
    return currencyId !== "districts" && !isPopulationCurrency(content, currencyId);
  });
  const grossPerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));
  const rawSupplyPerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));
  const maintenancePerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));
  const passivePerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));
  const populationByArea = Object.fromEntries(content.areas.map((area) => [area.id, 0]));
  const populationByBuilding = {};
  const perBuilding = {};
  const synergyStateByBuilding = {};
  const rawBuildingStates = [];
  const maintenanceDemandPerSecond = Object.fromEntries(passiveCurrencyIds.map((currencyId) => [currencyId, 0]));

  content.buildings.forEach((building) => {
    const area = getAreaById(content, building.areaId);
    const populationCurrencyId = area.populationCurrencyId;
    const count = Number(state.ownedBuildings?.[building.id] || 0);
    const synergyState = getBuildingSynergyState(content, state, building);
    const basePopulation = Number(building.statsPerOwned?.[populationCurrencyId] || 0);
    const populationMultiplier =
      getStatMultiplier(building, populationCurrencyId, effects) *
      getTargetMultiplier(synergyState.statMultipliers, populationCurrencyId);
    const totalPopulation = Math.round(count * basePopulation * populationMultiplier);

    synergyStateByBuilding[building.id] = synergyState;
    populationByBuilding[building.id] = totalPopulation;
    populationByArea[building.areaId] += totalPopulation;
  });

  content.buildings.forEach((building) => {
    const count = Number(state.ownedBuildings?.[building.id] || 0);
    const synergyState = synergyStateByBuilding[building.id] || createEmptySynergyState();
    const rawOutputs = {};
    const rawMaintenance = {};

    Object.entries(building.outputPerSecond || {}).forEach(([currencyId, baseAmount]) => {
      const amountPerBuilding =
        Number(baseAmount) *
        getIncomeMultiplier(content, state, effects, building, currencyId) *
        getTargetMultiplier(synergyState.outputMultipliers, currencyId);
      rawOutputs[currencyId] = amountPerBuilding;
      if (activeAreaIds.has(building.areaId)) {
        rawSupplyPerSecond[currencyId] += amountPerBuilding * count;
      }
    });

    Object.entries(building.maintenancePerSecond || {}).forEach(([currencyId, baseAmount]) => {
      const amountPerBuilding =
        Number(baseAmount) *
        getMaintenanceMultiplier(effects, building, currencyId) *
        getTargetMultiplier(synergyState.maintenanceMultipliers, currencyId);
      rawMaintenance[currencyId] = amountPerBuilding;
      if (activeAreaIds.has(building.areaId)) {
        maintenanceDemandPerSecond[currencyId] += amountPerBuilding * count;
      }
    });

    rawBuildingStates.push({
      building,
      count,
      rawOutputs,
      rawMaintenance,
      population: Number(populationByBuilding[building.id] || 0),
      synergies: synergyState.activeBonuses
    });
  });

  const activeShortages = getActiveShortages(content, state, maintenanceDemandPerSecond, rawSupplyPerSecond);

  rawBuildingStates.forEach(({ building, count, rawOutputs, rawMaintenance, population, synergies }) => {
    const shortageState = getBuildingShortageState(activeShortages, rawMaintenance);
    const operatingMultiplier = shortageState.outputMultiplier;
    const outputs = {};
    const maintenance = {};

    Object.entries(rawOutputs).forEach(([currencyId, amountPerBuilding]) => {
      const scaledAmount = Number(amountPerBuilding) * operatingMultiplier;
      outputs[currencyId] = scaledAmount;
      if (activeAreaIds.has(building.areaId)) {
        grossPerSecond[currencyId] += scaledAmount * count;
        passivePerSecond[currencyId] += scaledAmount * count;
      }
    });

    Object.entries(rawMaintenance).forEach(([currencyId, amountPerBuilding]) => {
      const maintenanceMultiplier = Number(shortageState.maintenanceMultipliers?.[currencyId] ?? operatingMultiplier);
      const scaledAmount = Number(amountPerBuilding) * maintenanceMultiplier;
      maintenance[currencyId] = scaledAmount;
      if (activeAreaIds.has(building.areaId)) {
        maintenancePerSecond[currencyId] += scaledAmount * count;
        passivePerSecond[currencyId] -= scaledAmount * count;
      }
    });

    perBuilding[building.id] = {
      areaId: building.areaId,
      count,
      outputs,
      maintenance,
      population,
      synergies,
      operatingMultiplier,
      shortages: shortageState.reasons
    };
  });

  const manualActionsByArea = {};
  content.areas.forEach((area) => {
    const actions = (area.manualActions || []).map((action) => ({
      ...action,
      unlocked: isManualActionUnlocked(state, action),
      amount: calculateManualActionYield({
        content,
        state,
        effects,
        areaId: area.id,
        action,
        population: populationByArea[area.id]
      })
    }));
    manualActionsByArea[area.id] = actions;
  });

  return {
    purchasedPolicies,
    effects,
    passivePerSecond,
    grossPerSecond,
    rawSupplyPerSecond,
    maintenancePerSecond,
    rawMaintenanceDemandPerSecond: maintenanceDemandPerSecond,
    activeShortages,
    populationByArea,
    perBuilding,
    manualActionsByArea
  };
}

export function updateUtilityLocks(content, state, derived) {
  const shortageRules = content.systems?.shortages || {};
  const nextLocks = {
    ...(state.systems?.utilityLocks || {})
  };

  Object.entries(shortageRules).forEach(([currencyId, rule]) => {
    if (rule.mode !== "bufferedShutdown") {
      return;
    }

    const demand = Number(derived?.rawMaintenanceDemandPerSecond?.[currencyId] || 0);
    const threshold = Number(rule.threshold || 0);
    const amount = getCurrencyAmount(content, state, null, currencyId);
    const currentlyLocked = Boolean(nextLocks[currencyId]);
    const recoveryThreshold = getRecoveryThreshold(rule, demand);

    if (demand <= 0) {
      nextLocks[currencyId] = false;
      return;
    }

    if (amount <= threshold) {
      nextLocks[currencyId] = true;
      return;
    }

    if (!currentlyLocked) {
      nextLocks[currencyId] = false;
      return;
    }

    nextLocks[currencyId] = amount < recoveryThreshold;
  });

  state.systems.utilityLocks = nextLocks;
}

function getActiveShortages(content, state, maintenanceDemandPerSecond, rawSupplyPerSecond) {
  const shortageRules = content.systems?.shortages || {};
  const activeShortages = {};
  const utilityLocks = state.systems?.utilityLocks || {};

  Object.entries(shortageRules).forEach(([currencyId, rule]) => {
    const demand = Number(maintenanceDemandPerSecond[currencyId] || 0);
    if (demand <= 0) {
      return;
    }

    const threshold = Number(rule.threshold || 0);
    const amount = getCurrencyAmount(content, state, null, currencyId);
    const locked = Boolean(utilityLocks[currencyId]);
    if (rule.mode === "supplyGate") {
      const supply = Number(rawSupplyPerSecond?.[currencyId] || 0);
      if (amount > threshold && supply >= demand) {
        return;
      }
    } else if (rule.mode === "bufferedShutdown") {
      if (!locked && amount > threshold) {
        return;
      }
    } else if (amount > threshold) {
      return;
    }

    activeShortages[currencyId] = {
      currencyId,
      label: String(rule.label || `${titleCaseLabel(currencyId)} shortage`),
      outputMultiplier: clampShortageMultiplier(rule.outputMultiplier),
      maintainConsumption: Boolean(rule.maintainConsumption)
    };
  });

  return activeShortages;
}

function getBuildingShortageState(activeShortages, maintenance) {
  const reasons = [];
  let outputMultiplier = 1;
  let hasShortage = false;
  const maintenanceMultipliers = Object.fromEntries(
    Object.keys(maintenance || {}).map((currencyId) => [currencyId, 1])
  );

  Object.entries(maintenance || {}).forEach(([currencyId, amount]) => {
    if (Number(amount || 0) <= 0 || !activeShortages[currencyId]) {
      return;
    }
    const shortage = activeShortages[currencyId];
    hasShortage = true;
    outputMultiplier = Math.min(outputMultiplier, shortage.outputMultiplier);
    reasons.push(shortage);
  });

  Object.entries(maintenance || {}).forEach(([currencyId, amount]) => {
    if (Number(amount || 0) <= 0) {
      return;
    }
    if (activeShortages[currencyId]?.maintainConsumption) {
      maintenanceMultipliers[currencyId] = 1;
      return;
    }
    if (hasShortage) {
      maintenanceMultipliers[currencyId] = outputMultiplier;
    }
  });

  return {
    outputMultiplier,
    reasons,
    maintenanceMultipliers
  };
}

function clampShortageMultiplier(value) {
  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    return 0;
  }
  return Math.max(0, Math.min(1, numericValue));
}

function getRecoveryThreshold(rule, demand) {
  return Math.max(
    Number(rule.threshold || 0),
    Number(rule.recoveryThreshold || 0),
    Number(demand || 0) * Number(rule.recoveryBufferSeconds || 0)
  );
}

function titleCaseLabel(currencyId) {
  return String(currencyId)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isManualActionUnlocked(state, action) {
  if (action.unlockPolicyId && !(state.purchasedPolicies || []).includes(action.unlockPolicyId)) {
    return false;
  }
  const requiredBuildingCount = Number(action.unlockBuildingCount || (action.unlockBuildingId ? 1 : 0));
  if (
    action.unlockBuildingId &&
    Number(state.ownedBuildings?.[action.unlockBuildingId] || 0) < requiredBuildingCount
  ) {
    return false;
  }
  return true;
}

function calculateManualActionYield({ content, state, effects, areaId, action, population }) {
  let amount = Number(action.baseAmount || 0);

  if (action.populationScaling?.perPopulation) {
    amount +=
      Math.floor(Number(population || 0) / Number(action.populationScaling.perPopulation || 1)) *
      Number(action.populationScaling.amount || 0);
  }

  (action.buildingScaling || []).forEach((scaling) => {
    const owned = Number(state.ownedBuildings?.[scaling.buildingId] || 0);
    amount += owned * Number(scaling.amountPerOwned || 0);
  });

  amount += getClickBonus(effects, areaId, action.currency, action.id);

  if (action.applyIncomeMultiplier) {
    amount *= getIncomeMultiplierForAction(content, state, effects, areaId, action.currency);
  }

  return amount;
}

function getClickBonus(effects, areaId, currencyId, actionId) {
  return effects.reduce((total, effect) => {
    if (effect.type !== "clickBonus" || effect.areaId !== areaId) {
      return total;
    }
    if ((effect.currency && effect.currency === currencyId) || (effect.actionId && effect.actionId === actionId)) {
      return total + Number(effect.amount || 0);
    }
    return total;
  }, 0);
}

function getIncomeMultiplierForAction(content, state, effects, areaId, currencyId) {
  const buildingStub = {
    id: `manual-${areaId}-${currencyId}`,
    areaId
  };
  return getIncomeMultiplier(content, state, effects, buildingStub, currencyId, true);
}

function getIncomeMultiplier(content, state, effects, building, currencyId) {
  let multiplier = 1 + getPrestigeMultiplier(content, state, building.areaId, currencyId);

  effects.forEach((effect) => {
    if (effect.type !== "incomeMultiplier") {
      return;
    }
    if (effect.areaId && effect.areaId !== building.areaId) {
      return;
    }
    if (Array.isArray(effect.currencies) && !effect.currencies.includes(currencyId)) {
      return;
    }
    if (Array.isArray(effect.buildingIds) && !effect.buildingIds.includes(building.id)) {
      return;
    }
    multiplier *= Number(effect.multiplier || 1);
  });

  return multiplier;
}

function getPrestigeMultiplier(content, state, areaId, currencyId) {
  const area = getAreaById(content, areaId);
  if (!area) {
    return 0;
  }
  const districts = getAreaDistricts(state, areaId);
  return (area.annexationBonuses || []).reduce((total, bonus) => {
    if (bonus.currencyId !== currencyId) {
      return total;
    }
    return total + districts * Number(bonus.multiplierPerDistrict || 0);
  }, 0);
}

function getMaintenanceMultiplier(effects, building, currencyId) {
  return effects.reduce((multiplier, effect) => {
    if (effect.type !== "maintenanceMultiplier" || effect.areaId !== building.areaId) {
      return multiplier;
    }
    if (effect.currency !== currencyId) {
      return multiplier;
    }
    if (Array.isArray(effect.buildingIds) && !effect.buildingIds.includes(building.id)) {
      return multiplier;
    }
    return multiplier * Number(effect.multiplier || 1);
  }, 1);
}

function getStatMultiplier(building, statId, effects) {
  return effects.reduce((multiplier, effect) => {
    if (effect.type !== "statMultiplier" || effect.areaId !== building.areaId) {
      return multiplier;
    }
    if (effect.stat !== statId) {
      return multiplier;
    }
    if (Array.isArray(effect.buildingIds) && !effect.buildingIds.includes(building.id)) {
      return multiplier;
    }
    return multiplier * Number(effect.multiplier || 1);
  }, 1);
}

function createEmptySynergyState() {
  return {
    outputMultipliers: {},
    statMultipliers: {},
    maintenanceMultipliers: {},
    activeBonuses: []
  };
}

function getTargetMultiplier(bucket, target) {
  return Number(bucket[target] || 1);
}

function getSynergyBucket(state, targetType) {
  if (targetType === "output") {
    return state.outputMultipliers;
  }
  if (targetType === "maintenance") {
    return state.maintenanceMultipliers;
  }
  return state.statMultipliers;
}

function getBuildingSynergyState(content, state, building) {
  const synergyState = createEmptySynergyState();

  (building.synergies || []).forEach((rule) => {
    const triggerSize = Math.max(1, Number(rule.perOwned || 1));
    const sourceCount = (rule.sourceBuildingIds || []).reduce((total, buildingId) => {
      return total + Number(state.ownedBuildings?.[buildingId] || 0);
    }, 0);
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
