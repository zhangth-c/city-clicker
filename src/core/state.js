import { syncProgressState } from "../systems/progression.js";
import { migrateSaveEnvelope } from "./save-migrations.js";

export function buildStateSnapshot(state) {
  state.stats.lastSavedAt = Date.now();
  return JSON.parse(JSON.stringify(state));
}

function buildEmptyAreaState(content, areaId) {
  const area = content.areas.find((entry) => entry.id === areaId);
  return {
    currencies: Object.fromEntries(
      Object.keys(area.localCurrencies || {}).map((currencyId) => [
        currencyId,
        Number(area.startingCurrencies?.[currencyId] || 0)
      ])
    )
  };
}

export function createInitialState(content) {
  const defaultAreaId = content.defaultAreaId;
  const areaStates = Object.fromEntries(
    content.areas.map((area) => [area.id, buildEmptyAreaState(content, area.id)])
  );
  const peakCurrenciesByArea = Object.fromEntries(
    content.areas.map((area) => [
      area.id,
      Object.fromEntries(Object.keys(area.localCurrencies || {}).map((currencyId) => [currencyId, 0]))
    ])
  );

  const state = {
    sharedCurrencies: Object.fromEntries(
      Object.keys(content.sharedCurrencies).map((currencyId) => [
        currencyId,
        Number(content.startingSharedCurrencies?.[currencyId] || 0)
      ])
    ),
    areas: {
      activeAreaId: defaultAreaId,
      unlockedAreaIds: [defaultAreaId],
      ...areaStates
    },
    ownedBuildings: Object.fromEntries(content.buildings.map((building) => [building.id, 0])),
    purchasedPolicies: [],
    policyChoices: {},
    encyclopedia: {
      seenBuildingIds: [],
      seenPolicyIds: [],
      masteredBuildingIds: []
    },
    systems: {
      annexationUnlocked: false
    },
    stats: {
      peakCurrenciesByArea,
      lifetimeBuiltByBuildingId: Object.fromEntries(content.buildings.map((building) => [building.id, 0])),
      totalClicks: 0,
      totalAnnexations: 0,
      lastSavedAt: Date.now()
    }
  };

  syncProgressState(content, state, null);
  return state;
}

export function normalizeState(content, candidate) {
  const payload = migrateSaveEnvelope(content, candidate);
  const source = payload.state && typeof payload.state === "object" ? payload.state : {};
  const initial = createInitialState(content);
  const validAreaIds = new Set(content.areas.map((area) => area.id));
  const validBuildingIds = new Set(content.buildings.map((building) => building.id));
  const validPolicyIds = new Set(content.policies.map((policy) => policy.id));
  const validGroups = new Set(content.policies.map((policy) => policy.exclusiveGroupId).filter(Boolean));

  const merged = {
    ...initial,
    ...source,
    sharedCurrencies: {
      ...initial.sharedCurrencies,
      ...(source.sharedCurrencies || {})
    },
    areas: {
      ...initial.areas,
      ...(source.areas || {})
    },
    ownedBuildings: {
      ...initial.ownedBuildings,
      ...(source.ownedBuildings || {})
    },
    purchasedPolicies: Array.isArray(source.purchasedPolicies)
      ? source.purchasedPolicies.filter((policyId) => validPolicyIds.has(policyId))
      : [],
    policyChoices: Object.fromEntries(
      Object.entries(source.policyChoices || {}).filter(([groupId, policyId]) => {
        return validGroups.has(groupId) && validPolicyIds.has(policyId);
      })
    ),
    encyclopedia: {
      ...initial.encyclopedia,
      ...(source.encyclopedia || {}),
      seenBuildingIds: Array.isArray(source.encyclopedia?.seenBuildingIds)
        ? source.encyclopedia.seenBuildingIds.filter((buildingId) => validBuildingIds.has(buildingId))
        : initial.encyclopedia.seenBuildingIds.slice(),
      seenPolicyIds: Array.isArray(source.encyclopedia?.seenPolicyIds)
        ? source.encyclopedia.seenPolicyIds.filter((policyId) => validPolicyIds.has(policyId))
        : initial.encyclopedia.seenPolicyIds.slice(),
      masteredBuildingIds: Array.isArray(source.encyclopedia?.masteredBuildingIds)
        ? source.encyclopedia.masteredBuildingIds.filter((buildingId) => validBuildingIds.has(buildingId))
        : initial.encyclopedia.masteredBuildingIds.slice()
    },
    systems: {
      ...initial.systems,
      ...(source.systems || {})
    },
    stats: {
      ...initial.stats,
      ...(source.stats || {}),
      peakCurrenciesByArea: {
        ...initial.stats.peakCurrenciesByArea,
        ...(source.stats?.peakCurrenciesByArea || {})
      },
      lifetimeBuiltByBuildingId: {
        ...initial.stats.lifetimeBuiltByBuildingId,
        ...(source.stats?.lifetimeBuiltByBuildingId || {})
      }
    }
  };

  merged.areas.activeAreaId = validAreaIds.has(merged.areas.activeAreaId)
    ? merged.areas.activeAreaId
    : content.defaultAreaId;
  merged.areas.unlockedAreaIds = Array.isArray(merged.areas.unlockedAreaIds)
    ? Array.from(new Set(merged.areas.unlockedAreaIds.filter((areaId) => validAreaIds.has(areaId))))
    : [content.defaultAreaId];
  if (!merged.areas.unlockedAreaIds.includes(content.defaultAreaId)) {
    merged.areas.unlockedAreaIds.unshift(content.defaultAreaId);
  }

  content.areas.forEach((area) => {
    const sourceArea = merged.areas[area.id] || {};
    merged.areas[area.id] = {
      ...initial.areas[area.id],
      ...sourceArea,
      currencies: {
        ...initial.areas[area.id].currencies,
        ...(sourceArea.currencies || {})
      }
    };
    Object.keys(merged.areas[area.id].currencies).forEach((currencyId) => {
      merged.areas[area.id].currencies[currencyId] = Math.max(
        0,
        Number(merged.areas[area.id].currencies[currencyId] || 0)
      );
    });
    merged.stats.peakCurrenciesByArea[area.id] = {
      ...initial.stats.peakCurrenciesByArea[area.id],
      ...(merged.stats.peakCurrenciesByArea[area.id] || {})
    };
    Object.keys(merged.stats.peakCurrenciesByArea[area.id]).forEach((currencyId) => {
      merged.stats.peakCurrenciesByArea[area.id][currencyId] = Math.max(
        0,
        Number(merged.stats.peakCurrenciesByArea[area.id][currencyId] || 0)
      );
    });
  });

  Object.keys(merged.sharedCurrencies).forEach((currencyId) => {
    merged.sharedCurrencies[currencyId] = Math.max(0, Number(merged.sharedCurrencies[currencyId] || 0));
  });
  Object.keys(merged.ownedBuildings).forEach((buildingId) => {
    merged.ownedBuildings[buildingId] = Math.max(0, Number(merged.ownedBuildings[buildingId] || 0));
  });
  Object.keys(merged.stats.lifetimeBuiltByBuildingId).forEach((buildingId) => {
    merged.stats.lifetimeBuiltByBuildingId[buildingId] = Math.max(
      0,
      Number(merged.stats.lifetimeBuiltByBuildingId[buildingId] || 0)
    );
  });
  merged.stats.totalClicks = Math.max(0, Number(merged.stats.totalClicks || 0));
  merged.stats.totalAnnexations = Math.max(0, Number(merged.stats.totalAnnexations || 0));
  merged.stats.lastSavedAt = Number(merged.stats.lastSavedAt || Date.now());

  syncProgressState(content, merged, null);
  return merged;
}

export function snapshotCurrencies(state) {
  const snapshot = {
    ...state.sharedCurrencies
  };

  Object.entries(state.areas || {}).forEach(([areaId, areaState]) => {
    if (areaId === "activeAreaId" || areaId === "unlockedAreaIds") {
      return;
    }
    Object.entries(areaState.currencies || {}).forEach(([currencyId, amount]) => {
      snapshot[`${areaId}:${currencyId}`] = Number(amount || 0);
    });
  });

  return snapshot;
}
