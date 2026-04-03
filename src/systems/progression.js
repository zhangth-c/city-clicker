import { getAreaById, getCurrencyAmount, getPolicyBlockedReason, getPolicyById } from "./economy.js";

export function getPrestigeCurrencyId(content) {
  return content.systems.annexation?.prestigeCurrencyId || "districts";
}

export function requirementsMet(content, state, derived, areaId, requirements) {
  return Object.entries(requirements || {}).every(([currencyId, amount]) => {
    const current = getCurrencyAmount(content, state, derived, currencyId);
    return current >= Number(amount);
  });
}

export function arePolicyPrerequisitesMet(state, policy) {
  const purchased = new Set(state.purchasedPolicies || []);
  const requiredAll = (policy.prerequisitePolicyIds || []).every((policyId) => purchased.has(policyId));
  const requiredAny =
    !policy.prerequisiteAnyPolicyIds?.length ||
    policy.prerequisiteAnyPolicyIds.some((policyId) => purchased.has(policyId));
  return requiredAll && requiredAny;
}

export function syncProgressState(content, state, derived) {
  const unlockedAreas = new Set(state.areas?.unlockedAreaIds || [content.defaultAreaId]);
  unlockedAreas.add(content.defaultAreaId);

  (state.purchasedPolicies || []).forEach((policyId) => {
    const policy = getPolicyById(content, policyId);
    (policy?.effects || []).forEach((effect) => {
      if (effect.type === "unlockArea" && effect.areaId) {
        unlockedAreas.add(effect.areaId);
      }
      if (effect.type === "unlockSystem" && effect.systemId === "annexation") {
        state.systems.annexationUnlocked = true;
      }
    });
  });

  if ((state.purchasedPolicies || []).includes(content.systems.annexation?.unlockPolicyId)) {
    state.systems.annexationUnlocked = true;
  }

  state.areas.unlockedAreaIds = Array.from(unlockedAreas);

  const seenBuildingIds = new Set(state.encyclopedia?.seenBuildingIds || []);
  const seenPolicyIds = new Set();
  const masteredBuildingIds = new Set(state.encyclopedia?.masteredBuildingIds || []);

  content.buildings.forEach((building) => {
    if (!unlockedAreas.has(building.areaId)) {
      return;
    }
    if (requirementsMet(content, state, derived, building.areaId, building.unlock || {})) {
      seenBuildingIds.add(building.id);
    }
  });

  content.policies.forEach((policy) => {
    if (!unlockedAreas.has(policy.areaId)) {
      return;
    }
    const purchased = (state.purchasedPolicies || []).includes(policy.id);
    const reachable = requirementsMet(content, state, derived, policy.areaId, policy.unlock || {}) && arePolicyPrerequisitesMet(state, policy);
    const blocked = Boolean(getPolicyBlockedReason(content, state, policy));
    if (
      purchased ||
      reachable ||
      blocked
    ) {
      seenPolicyIds.add(policy.id);
    }
  });

  content.buildings.forEach((building) => {
    if (Number(state.stats?.lifetimeBuiltByBuildingId?.[building.id] || 0) >= Number(building.codex?.masteryTarget || Infinity)) {
      masteredBuildingIds.add(building.id);
    }
  });

  state.encyclopedia.seenBuildingIds = Array.from(seenBuildingIds);
  state.encyclopedia.seenPolicyIds = Array.from(seenPolicyIds);
  state.encyclopedia.masteredBuildingIds = Array.from(masteredBuildingIds);

  if (derived) {
    content.areas.forEach((area) => {
      const populationCurrencyId = area.populationCurrencyId;
      state.areas[area.id].currencies[populationCurrencyId] = Math.max(0, Number(derived.populationByArea?.[area.id] || 0));
      Object.keys(area.localCurrencies || {}).forEach((currencyId) => {
        const current = getCurrencyAmount(content, state, derived, currencyId);
        state.stats.peakCurrenciesByArea[area.id][currencyId] = Math.max(
          Number(state.stats.peakCurrenciesByArea?.[area.id]?.[currencyId] || 0),
          current
        );
      });
    });
  }
}

export function calculateAnnexationGain(content, state) {
  return content.areas.reduce((total, area) => {
    const config = area.prestigeScoreConfig || [];
    const peaks = state.stats?.peakCurrenciesByArea?.[area.id] || {};
    const subtotal = config.reduce((running, entry) => {
      return running + Math.floor(Number(peaks[entry.currencyId] || 0) / Number(entry.per || 1)) * Number(entry.gain || 0);
    }, 0);
    return total + subtotal;
  }, 0);
}

export function getVisibleSharedCurrencyIds(content, state) {
  return Object.keys(content.sharedCurrencies).filter((currencyId) => {
    return Number(state.sharedCurrencies?.[currencyId] || 0) > 0;
  });
}

export function getVisibleLocalCurrencyIds(content, state, derived, areaId) {
  const area = getAreaById(content, areaId);
  const currencyIds = Object.keys(area.localCurrencies || {});
  const seenBuildingIds = new Set(state.encyclopedia?.seenBuildingIds || []);

  return currencyIds.filter((currencyId) => {
    const current = getCurrencyAmount(content, state, derived, currencyId);
    if (current > 0) {
      return true;
    }
    if (currencyId === area.populationCurrencyId) {
      return false;
    }

    if (
      area.buildings.some((building) => {
        if (!seenBuildingIds.has(building.id)) {
          return false;
        }
        return currencyProducedByBuilding(building, currencyId);
      })
    ) {
      return true;
    }

    return (area.manualActions || []).some((action) => {
      if (action.currency !== currencyId) {
        return false;
      }

      if (action.unlockPolicyId && !(state.purchasedPolicies || []).includes(action.unlockPolicyId)) {
        return false;
      }

      const requiredBuildingCount = Number(action.unlockBuildingCount || (action.unlockBuildingId ? 1 : 0));
      if (action.unlockBuildingId) {
        return Number(state.ownedBuildings?.[action.unlockBuildingId] || 0) >= requiredBuildingCount;
      }

      return true;
    });
  });
}

function currencyProducedByBuilding(building, currencyId) {
  return (
    Object.prototype.hasOwnProperty.call(building.outputPerSecond || {}, currencyId) ||
    Object.prototype.hasOwnProperty.call(building.statsPerOwned || {}, currencyId)
  );
}

export function getNextBuildingUnlockHint(content, state, derived, areaId) {
  const area = getAreaById(content, areaId);
  const seen = new Set(state.encyclopedia?.seenBuildingIds || []);
  const nextLockedBuilding = area.buildings.find((building) => !seen.has(building.id));

  if (!nextLockedBuilding) {
    return null;
  }

  const missing = Object.entries(nextLockedBuilding.unlock || {})
    .map(([currencyId, amount]) => ({
      currencyId,
      deficit: Math.max(0, Number(amount) - getCurrencyAmount(content, state, derived, currencyId))
    }))
    .filter((entry) => entry.deficit > 0);

  return {
    buildingId: nextLockedBuilding.id,
    buildingName: nextLockedBuilding.name,
    missing
  };
}
