import {
  getPrestigeCurrencyId,
  isUpgradeInitiallyDiscovered,
  syncSystemUnlocks
} from "../systems/progression.js";

export function buildStateSnapshot(state) {
  state.stats.lastSavedAt = Date.now();
  return JSON.parse(JSON.stringify(state));
}

export function createInitialState(content) {
  const prestigeCurrencyId = getPrestigeCurrencyId(content);
  const currencies = {};
  Object.keys(content.currencies).forEach((id) => {
    currencies[id] = content.startingState[id] || 0;
  });
  currencies[prestigeCurrencyId] = 0;

  return {
    currencies,
    ownedBuildings: Object.fromEntries(content.buildings.map((building) => [building.id, 0])),
    purchasedUpgrades: [],
    discoveredUpgrades: content.globalUpgrades
      .filter((upgrade) => isUpgradeInitiallyDiscovered(upgrade))
      .map((upgrade) => upgrade.id),
    discoveredBuildings: content.buildings
      .filter((building) => Object.keys(building.unlock || {}).length === 0)
      .map((building) => building.id),
    systems: {
      annexationUnlocked: false
    },
    stats: {
      peakResidents: 0,
      peakAppeal: 0,
      totalClicks: 0,
      totalAnnexations: 0,
      lastSavedAt: Date.now()
    }
  };
}

export function normalizeState(content, candidate) {
  const payload = candidate && typeof candidate === "object" ? candidate : {};

  if (payload.gameId && payload.gameId !== content.meta.id) {
    throw new Error("This save file belongs to a different game.");
  }

  const source = payload.state && typeof payload.state === "object" ? payload.state : payload;
  const initial = createInitialState(content);
  const prestigeCurrencyId = getPrestigeCurrencyId(content);
  const validBuildingIds = new Set(content.buildings.map((building) => building.id));
  const validUpgradeIds = new Set(content.globalUpgrades.map((upgrade) => upgrade.id));
  const merged = {
    ...initial,
    ...source,
    currencies: {
      ...initial.currencies,
      ...(source.currencies || {})
    },
    ownedBuildings: {
      ...initial.ownedBuildings,
      ...(source.ownedBuildings || {})
    },
    purchasedUpgrades: Array.isArray(source.purchasedUpgrades)
      ? source.purchasedUpgrades.filter((id) => validUpgradeIds.has(id))
      : [],
    discoveredUpgrades: Array.isArray(source.discoveredUpgrades)
      ? source.discoveredUpgrades.filter((id) => validUpgradeIds.has(id))
      : initial.discoveredUpgrades.slice(),
    discoveredBuildings: Array.isArray(source.discoveredBuildings)
      ? source.discoveredBuildings.filter((id) => validBuildingIds.has(id))
      : initial.discoveredBuildings.slice(),
    systems: {
      ...initial.systems,
      ...(source.systems || {})
    },
    stats: {
      ...initial.stats,
      ...(source.stats || {})
    }
  };

  Object.keys(merged.currencies).forEach((currencyId) => {
    merged.currencies[currencyId] = Number(merged.currencies[currencyId] || 0);
  });
  Object.keys(merged.ownedBuildings).forEach((buildingId) => {
    merged.ownedBuildings[buildingId] = Math.max(0, Number(merged.ownedBuildings[buildingId] || 0));
  });

  merged.currencies[prestigeCurrencyId] = Number(merged.currencies[prestigeCurrencyId] || 0);
  merged.currencies.residents = Number(merged.currencies.residents || 0);
  merged.stats.peakResidents = Math.max(0, Number(merged.stats.peakResidents || 0));
  merged.stats.peakAppeal = Math.max(0, Number(merged.stats.peakAppeal || 0));
  merged.stats.totalClicks = Math.max(0, Number(merged.stats.totalClicks || 0));
  merged.stats.totalAnnexations = Math.max(0, Number(merged.stats.totalAnnexations || 0));
  merged.stats.lastSavedAt = Number(merged.stats.lastSavedAt || Date.now());
  syncSystemUnlocks(content, merged);
  return merged;
}

export function snapshotCurrencies(state) {
  return {
    coins: state.currencies.coins || 0,
    materials: state.currencies.materials || 0,
    appeal: state.currencies.appeal || 0
  };
}
