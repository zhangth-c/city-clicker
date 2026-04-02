export function applyUpgradeSystemUnlocks(content, state, upgrade) {
  (upgrade.effects || []).forEach((effect) => {
    if (effect.type === "unlockSystem" && effect.systemId === "annexation") {
      state.systems.annexationUnlocked = true;
    }
  });
}

export function calculateAnnexationGain(state) {
  const peakResidents = Number(state.stats.peakResidents || 0);
  const peakAppeal = Number(state.stats.peakAppeal || 0);
  return Math.max(0, Math.floor(peakResidents / 200) + Math.floor(peakAppeal / 15));
}

export function discoverBuildings(content, state, derived) {
  const known = new Set(state.discoveredBuildings || []);
  let discoveredNow = null;

  content.buildings.forEach((building) => {
    if (known.has(building.id)) {
      return;
    }

    if (requirementsMet(state, derived, building.unlock || {})) {
      known.add(building.id);
      discoveredNow = building;
    }
  });

  state.discoveredBuildings = Array.from(known);
  return discoveredNow;
}

export function discoverUpgrades(content, state, derived) {
  const known = new Set(state.discoveredUpgrades || []);
  const visibleCurrencyIds = new Set(getVisibleCurrencyIds(content, state, derived));
  let discoveredNow = null;

  content.globalUpgrades.forEach((upgrade) => {
    if (known.has(upgrade.id)) {
      return;
    }

    if (isUpgradeReadyToDiscover(upgrade, state, derived, visibleCurrencyIds)) {
      known.add(upgrade.id);
      discoveredNow = upgrade;
    }
  });

  state.discoveredUpgrades = Array.from(known);
  return discoveredNow;
}

export function getPrestigeCurrencyId(content) {
  return content.systems.annexation.prestigeCurrency.id;
}

export function getVisibleCurrencyIds(content, state, derived) {
  const visible = ["coins"];

  if (derived && derived.residents > 0) {
    visible.push("residents");
  }
  if (Number(state.currencies.materials || 0) > 0) {
    visible.push("materials");
  }
  if (Number(state.currencies.appeal || 0) > 0) {
    visible.push("appeal");
  }
  if (state.systems.annexationUnlocked || Number(state.currencies.districts || 0) > 0) {
    visible.push("districts");
  }

  return visible;
}

export function isUpgradeInitiallyDiscovered(upgrade) {
  return (
    Object.keys(upgrade.unlock || {}).length === 0 &&
    Object.keys(upgrade.cost || {}).every((currencyId) => currencyId === "coins")
  );
}

export function isUpgradeReadyToDiscover(upgrade, state, derived, visibleCurrencyIds) {
  if (!requirementsMet(state, derived, upgrade.unlock || {})) {
    return false;
  }

  return Object.keys(upgrade.cost || {}).every((currencyId) => {
    return currencyId === "coins" || visibleCurrencyIds.has(currencyId);
  });
}

export function requirementsMet(state, derived, requirements) {
  return Object.entries(requirements).every(([currencyId, amount]) => {
    if (currencyId === "residents") {
      return derived ? derived.residents >= Number(amount) : Number(state.currencies.residents || 0) >= Number(amount);
    }
    return Number(state.currencies[currencyId] || 0) >= Number(amount);
  });
}

export function syncSystemUnlocks(content, targetState) {
  const purchasedSet = new Set(targetState.purchasedUpgrades || []);
  const charterPurchased = purchasedSet.has(content.systems.annexation.unlockUpgradeId);
  targetState.systems.annexationUnlocked =
    Boolean(targetState.systems.annexationUnlocked) || charterPurchased;
}
