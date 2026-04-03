function cloneRecord(value) {
  return JSON.parse(JSON.stringify(value));
}

const LEGACY_GAME_IDS = new Set(["patchwork-borough-v1", "patchwork-borough", "city-clicker"]);

export function getCurrentSaveVersion(content) {
  return Number(content.meta.saveVersion || 1);
}

export function buildSaveEnvelope(content, state) {
  return {
    gameId: content.meta.id,
    appVersion: content.meta.appVersion,
    balanceVersion: content.meta.balanceVersion,
    saveVersion: getCurrentSaveVersion(content),
    savedAt: new Date().toISOString(),
    state: cloneRecord(state)
  };
}

export function migrateSaveEnvelope(content, candidate) {
  const normalized = normalizeEnvelope(content, candidate);
  const currentVersion = getCurrentSaveVersion(content);

  if (normalized.saveVersion > currentVersion) {
    throw new Error(
      `This save uses schema ${normalized.saveVersion}, but the game only supports schema ${currentVersion}.`
    );
  }

  let working = normalized;
  while (working.saveVersion < currentVersion) {
    const migrate = SAVE_MIGRATIONS[working.saveVersion];
    if (!migrate) {
      throw new Error(`No migration exists for save schema ${working.saveVersion}.`);
    }
    working = migrate(content, working);
  }

  return {
    ...working,
    gameId: content.meta.id,
    appVersion: content.meta.appVersion,
    balanceVersion: content.meta.balanceVersion,
    saveVersion: currentVersion
  };
}

const SAVE_MIGRATIONS = {
  0: migrateV0ToV1,
  1: migrateV1ToV2,
  2: migrateV2ToV3
};

function normalizeEnvelope(content, candidate) {
  const payload = candidate && typeof candidate === "object" ? candidate : {};

  if (payload.gameId && !LEGACY_GAME_IDS.has(payload.gameId) && payload.gameId !== content.meta.id) {
    throw new Error("This save file belongs to a different game.");
  }

  if (payload.state && typeof payload.state === "object") {
    return {
      ...cloneRecord(payload),
      saveVersion: Number.isInteger(Number(payload.saveVersion)) ? Number(payload.saveVersion) : 0
    };
  }

  return {
    gameId: content.meta.id,
    appVersion: null,
    balanceVersion: null,
    saveVersion: 0,
    savedAt: null,
    state: cloneRecord(payload)
  };
}

function migrateV0ToV1(content, envelope) {
  return {
    ...envelope,
    gameId: envelope.gameId || content.meta.id,
    appVersion: envelope.appVersion || "legacy",
    balanceVersion: envelope.balanceVersion || "legacy",
    saveVersion: 1,
    state: {
      ...(envelope.state || {})
    }
  };
}

function migrateV1ToV2(content, envelope) {
  const source = envelope.state || {};
  const defaultAreaId = content.defaultAreaId;
  const portAreaId = content.indexes.areaIds.find((areaId) => areaId !== defaultAreaId);
  const defaultArea = content.areas.find((area) => area.id === defaultAreaId);
  const portArea = content.areas.find((area) => area.id === portAreaId);
  const legacyCurrencies = source.currencies || {};
  const sharedCurrencies = {
    coins: Number(legacyCurrencies.coins || 0),
    districts: Number(legacyCurrencies.districts || 0)
  };

  const legacyBuildingIds = new Set(Object.keys(source.ownedBuildings || {}));
  const ownedBuildings = Object.fromEntries(
    content.buildings.map((building) => [building.id, Number(source.ownedBuildings?.[building.id] || 0)])
  );

  const patchworkCurrencies = Object.fromEntries(
    Object.keys(defaultArea.localCurrencies).map((currencyId) => [currencyId, Number(legacyCurrencies[currencyId] || 0)])
  );
  const portCurrencies = Object.fromEntries(
    Object.keys(portArea?.localCurrencies || {}).map((currencyId) => [currencyId, 0])
  );

  const purchasedPolicies = mapLegacyPolicies(source.purchasedUpgrades || []);
  const policyChoices = derivePolicyChoices(content, purchasedPolicies);
  const seenBuildingIds = Array.from(
    new Set([
      ...(source.discoveredBuildings || []),
      ...Object.entries(ownedBuildings)
        .filter(([, count]) => Number(count) > 0)
        .map(([buildingId]) => buildingId),
      ...content.areas
        .find((area) => area.id === defaultAreaId)
        .buildings.filter((building) => Object.keys(building.unlock || {}).length === 0)
        .map((building) => building.id)
    ])
  ).filter((buildingId) => legacyBuildingIds.has(buildingId) || content.buildings.some((building) => building.id === buildingId));
  const seenPolicyIds = Array.from(new Set(purchasedPolicies));

  const peakCurrenciesByArea = {
    [defaultAreaId]: {
      residents: Math.max(Number(source.stats?.peakResidents || 0), Number(patchworkCurrencies.residents || 0)),
      food: Number(patchworkCurrencies.food || 0),
      timber: Number(patchworkCurrencies.timber || 0),
      stone: Number(patchworkCurrencies.stone || 0),
      goods: Number(patchworkCurrencies.goods || 0),
      power: Number(patchworkCurrencies.power || 0),
      knowledge: Number(patchworkCurrencies.knowledge || 0),
      appeal: Math.max(Number(source.stats?.peakAppeal || 0), Number(patchworkCurrencies.appeal || 0)),
      influence: Number(patchworkCurrencies.influence || 0)
    }
  };
  if (portAreaId) {
    peakCurrenciesByArea[portAreaId] = Object.fromEntries(
      Object.keys(portArea.localCurrencies).map((currencyId) => [currencyId, 0])
    );
  }

  if ((source.purchasedUpgrades || []).includes("permit-desk")) {
    sharedCurrencies.coins += 250;
  }

  return {
    ...envelope,
    saveVersion: 2,
    state: {
      sharedCurrencies,
      areas: {
        activeAreaId: defaultAreaId,
        unlockedAreaIds: [defaultAreaId],
        [defaultAreaId]: {
          currencies: patchworkCurrencies
        },
        ...(portAreaId
          ? {
              [portAreaId]: {
                currencies: portCurrencies
              }
            }
          : {})
      },
      ownedBuildings,
      purchasedPolicies,
      policyChoices,
      encyclopedia: {
        seenBuildingIds,
        seenPolicyIds,
        masteredBuildingIds: []
      },
      systems: {
        annexationUnlocked:
          Boolean(source.systems?.annexationUnlocked) || purchasedPolicies.includes("city-charter")
      },
      stats: {
        peakCurrenciesByArea,
        lifetimeBuiltByBuildingId: Object.fromEntries(
          Object.entries(ownedBuildings).map(([buildingId, count]) => [buildingId, Number(count || 0)])
        ),
        totalClicks: Number(source.stats?.totalClicks || 0),
        totalAnnexations: Number(source.stats?.totalAnnexations || 0),
        lastSavedAt: Number(source.stats?.lastSavedAt || Date.now())
      }
    }
  };
}

function migrateV2ToV3(content, envelope) {
  const source = cloneRecord(envelope.state || {});
  const defaultAreaId = content.defaultAreaId;
  const previousTotalDistricts = Number(source.sharedCurrencies?.districts || 0);
  let assignedDistricts = 0;

  content.areas.forEach((area) => {
    source.areas ||= {};
    source.areas[area.id] ||= {};
    const current = Math.max(0, Number(source.areas[area.id].districts || 0));
    source.areas[area.id].districts = current;
    assignedDistricts += current;
  });

  if (assignedDistricts <= 0 && previousTotalDistricts > 0) {
    source.areas[defaultAreaId] ||= {};
    source.areas[defaultAreaId].districts = previousTotalDistricts;
    assignedDistricts = previousTotalDistricts;
  }

  source.sharedCurrencies ||= {};
  source.sharedCurrencies.districts = assignedDistricts;

  return {
    ...envelope,
    saveVersion: 3,
    state: source
  };
}

function mapLegacyPolicies(legacyPolicyIds) {
  const legacy = new Set(legacyPolicyIds || []);
  const picked = [];

  const add = (policyId) => {
    if (!picked.includes(policyId)) {
      picked.push(policyId);
    }
  };

  if (legacy.has("census-office")) {
    add("census-registry");
  }
  if (legacy.has("stone-roads")) {
    add("stone-roads");
  }
  if (legacy.has("supply-depot")) {
    add("masons-guild");
  }

  if (legacy.has("builders-guild")) {
    add("granary-cooperative");
  } else if (legacy.has("supply-depot")) {
    add("quarry-standards");
  }

  if (legacy.has("plumbing-grid")) {
    add("workshop-standards");
  } else if (legacy.has("industrial-logistics")) {
    add("power-authority");
  }

  if (legacy.has("heritage-program")) {
    add("public-schools");
  } else if (legacy.has("tourism-board")) {
    add("festival-office");
  }

  if (legacy.has("heritage-program")) {
    add("neighborhood-councils");
  } else if (legacy.has("tourism-board")) {
    add("monument-committee");
  }

  if (legacy.has("merchants-union")) {
    add("merchants-union");
  } else if (legacy.has("tourism-board")) {
    add("market-fairs");
  } else if (legacy.has("stone-roads")) {
    add("merchants-union");
  }

  if (legacy.has("skyline-campaign")) {
    add("skyline-office");
  } else if (legacy.has("zoning-reform")) {
    add("guild-brokers");
  }

  if (legacy.has("city-charter")) {
    add("city-charter");
  }

  return picked;
}

function derivePolicyChoices(content, purchasedPolicies) {
  const choices = {};
  const purchasedSet = new Set(purchasedPolicies);

  content.policies.forEach((policy) => {
    if (!policy.exclusiveGroupId || !purchasedSet.has(policy.id)) {
      return;
    }
    if (!choices[policy.exclusiveGroupId]) {
      choices[policy.exclusiveGroupId] = policy.id;
    }
  });

  return choices;
}
