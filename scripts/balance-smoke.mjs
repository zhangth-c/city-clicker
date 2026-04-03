import GAME_CONTENT from "../src/content-runtime/generated-content.js";
import { createInitialState } from "../src/core/state.js";
import { calculateDerivedState, getAreaById, getBuildingCost } from "../src/systems/economy.js";
import { calculateAnnexationGain, getNextBuildingUnlockHint, syncProgressState } from "../src/systems/progression.js";

const content = GAME_CONTENT;

function recalc(state) {
  let derived = calculateDerivedState(content, state);
  syncProgressState(content, state, derived);
  derived = calculateDerivedState(content, state);
  syncProgressState(content, state, derived);
  return derived;
}

function grantAreaCurrencies(state, areaId, entries) {
  Object.entries(entries).forEach(([currencyId, amount]) => {
    state.areas[areaId].currencies[currencyId] = Number(amount);
  });
}

function grantShared(state, entries) {
  Object.entries(entries).forEach(([currencyId, amount]) => {
    state.sharedCurrencies[currencyId] = Number(amount);
  });
}

function own(state, buildingId, count) {
  state.ownedBuildings[buildingId] = Number(count);
  state.stats.lifetimeBuiltByBuildingId[buildingId] = Math.max(
    Number(state.stats.lifetimeBuiltByBuildingId[buildingId] || 0),
    Number(count)
  );
}

function adopt(state, policyId) {
  if (!state.purchasedPolicies.includes(policyId)) {
    state.purchasedPolicies.push(policyId);
  }
  const policy = content.policies.find((entry) => entry.id === policyId);
  if (policy?.exclusiveGroupId && !state.policyChoices[policy.exclusiveGroupId]) {
    state.policyChoices[policy.exclusiveGroupId] = policy.id;
  }
}

function printHint(areaId, state, derived) {
  const hint = getNextBuildingUnlockHint(content, state, derived, areaId);
  if (!hint) {
    console.log(`- ${areaId}: all buildings revealed`);
    return [];
  }
  const missing = hint.missing.map((entry) => `${entry.currencyId}:${entry.deficit.toFixed(2)}`);
  console.log(`- ${areaId}: next ${hint.buildingName} | missing ${missing.join(", ") || "none"}`);
  return hint.missing.map((entry) => entry.currencyId);
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function getCurrencyBalance(state, areaId, currencyId) {
  if (Object.prototype.hasOwnProperty.call(state.sharedCurrencies, currencyId)) {
    return Number(state.sharedCurrencies[currencyId] || 0);
  }
  return Number(state.areas[areaId]?.currencies?.[currencyId] || 0);
}

function getCostAffordabilitySeconds(state, derived, areaId, cost) {
  return Object.entries(cost || {}).reduce((maxSeconds, [currencyId, amount]) => {
    const have = getCurrencyBalance(state, areaId, currencyId);
    const deficit = Math.max(0, Number(amount) - have);
    if (deficit <= 0) {
      return maxSeconds;
    }
    const rate = Number(derived.passivePerSecond[currencyId] || 0);
    const seconds = rate > 0 ? deficit / rate : Infinity;
    return Math.max(maxSeconds, seconds);
  }, 0);
}

function runScenario(name, buildState, check) {
  const state = createInitialState(content);
  buildState(state);
  const derived = recalc(state);
  console.log(`\n[${name}]`);
  const result = check(state, derived);
  return result;
}

runScenario(
  "fresh-borough",
  () => {},
  (state, derived) => {
    printHint("patchwork-borough", state, derived);
  }
);

runScenario(
  "borough-midgame",
  (state) => {
    grantShared(state, { coins: 2600, districts: 0 });
    grantAreaCurrencies(state, "patchwork-borough", {
      food: 90,
      timber: 150,
      stone: 138,
      goods: 72,
      knowledge: 22,
      appeal: 10,
      influence: 8,
      power: 2
    });
    own(state, "suburban-duplex", 20);
    own(state, "red-cottage", 15);
    own(state, "timber-cabin", 8);
    own(state, "farmstead", 10);
    own(state, "lane-bungalow", 14);
    own(state, "quarry-yard", 6);
    own(state, "cube-villa", 8);
    own(state, "freight-depot", 2);
    own(state, "grand-manor", 5);
    own(state, "greenhouse-terrace", 3);
    own(state, "brick-factory", 2);
    own(state, "palm-bungalow", 8);
    ["census-registry", "public-schools", "neighborhood-councils", "masons-guild", "quarry-standards", "workshop-standards", "stone-roads", "merchants-union", "guild-brokers"].forEach((policyId) =>
      adopt(state, policyId)
    );
  },
  (state, derived) => {
    const blockers = printHint("patchwork-borough", state, derived);
    assert(
      blockers.some((currencyId) => ["stone", "goods", "knowledge", "power", "appeal", "influence"].includes(currencyId)),
      "Borough midgame is still gated only by coins."
    );
  }
);

runScenario(
  "port-unlock",
  (state) => {
    grantShared(state, { coins: 12000, districts: 0 });
    grantAreaCurrencies(state, "patchwork-borough", {
      food: 80,
      timber: 120,
      stone: 150,
      goods: 130,
      power: 18,
      knowledge: 30,
      appeal: 16,
      influence: 18
    });
    [
      "suburban-duplex",
      "red-cottage",
      "timber-cabin",
      "farmstead",
      "lane-bungalow",
      "quarry-yard",
      "cube-villa",
      "freight-depot",
      "grand-manor",
      "greenhouse-terrace",
      "brick-factory",
      "borough-exchange"
    ].forEach((buildingId) => own(state, buildingId, 2));
    ["stone-roads", "merchants-union", "skyline-office", "harbor-charter"].forEach((policyId) => adopt(state, policyId));
  },
  (state, derived) => {
    assert(state.areas.unlockedAreaIds.includes("port-city"), "Port City failed to unlock from Harbor Charter.");
    printHint("port-city", state, derived);
  }
);

runScenario(
  "port-midgame",
  (state) => {
    state.areas.unlockedAreaIds = ["patchwork-borough", "port-city"];
    state.areas.activeAreaId = "port-city";
    grantShared(state, { coins: 5600, districts: 0 });
    grantAreaCurrencies(state, "port-city", {
      catch: 44,
      lumber: 40,
      masonry: 28,
      cargo: 46,
      harbor_capacity: 10,
      charts: 4,
      renown: 2
    });
    own(state, "fisher-huts", 26);
    own(state, "driftwood-yard", 12);
    own(state, "salt-smokehouse", 4);
    own(state, "timber-pier", 3);
    own(state, "barge-masons", 2);
    own(state, "chandlery-market", 2);
    ["dock-ledgers", "longshift-piers", "bonded-logistics", "sailors-guild", "tavern-leagues"].forEach((policyId) =>
      adopt(state, policyId)
    );
  },
  (state, derived) => {
    const blockers = printHint("port-city", state, derived);
    assert(
      blockers.some((currencyId) => ["cargo", "harbor_capacity", "charts", "renown"].includes(currencyId)),
      "Port midgame is missing its intended harbor bottlenecks."
    );
  }
);

runScenario(
  "annexation-smoke",
  (state) => {
    state.areas.unlockedAreaIds = ["patchwork-borough", "port-city"];
    grantShared(state, { coins: 50000, districts: 12 });
    grantAreaCurrencies(state, "patchwork-borough", {
      residents: 360,
      food: 180,
      timber: 120,
      stone: 240,
      goods: 180,
      power: 56,
      knowledge: 60,
      appeal: 42,
      influence: 34
    });
    grantAreaCurrencies(state, "port-city", {
      crew: 170,
      catch: 90,
      lumber: 70,
      masonry: 70,
      cargo: 130,
      harbor_capacity: 60,
      charts: 34,
      renown: 20
    });
    recalc(state);
  },
  (state) => {
    const gain = calculateAnnexationGain(content, state);
    console.log(`- annexation gain: ${gain}`);
    assert(gain > 0, "Annexation gain should be positive in the late smoke scenario.");
  }
);

runScenario(
  "late-affordability",
  (state) => {
    state.areas.unlockedAreaIds = ["patchwork-borough", "port-city"];
    state.areas.activeAreaId = "patchwork-borough";
    grantShared(state, { coins: 50000, districts: 12 });
    grantAreaCurrencies(state, "patchwork-borough", {
      residents: 360,
      food: 180,
      timber: 120,
      stone: 240,
      goods: 180,
      power: 56,
      knowledge: 60,
      appeal: 42,
      influence: 34
    });
    grantAreaCurrencies(state, "port-city", {
      crew: 170,
      catch: 90,
      lumber: 70,
      masonry: 70,
      cargo: 130,
      harbor_capacity: 60,
      charts: 34,
      renown: 20
    });
    Object.entries({
      "suburban-duplex": 20,
      "red-cottage": 15,
      "timber-cabin": 8,
      farmstead: 10,
      "lane-bungalow": 14,
      "quarry-yard": 8,
      "cube-villa": 8,
      "freight-depot": 7,
      "grand-manor": 6,
      "greenhouse-terrace": 5,
      "brick-factory": 4,
      "borough-exchange": 3,
      "hillside-lodge": 3,
      "public-archive": 2,
      "dome-habitat": 1,
      "summit-powerhouse": 1,
      "stone-keep": 1,
      "palm-bungalow": 1,
      "glass-condo": 1,
      "fisher-huts": 26,
      "driftwood-yard": 12,
      "salt-smokehouse": 8,
      "timber-pier": 6,
      "barge-masons": 5,
      "chandlery-market": 4,
      "dredger-works": 3,
      "chart-house": 2,
      "bonded-warehouse": 2,
      "customs-tower": 1,
      "regatta-quay": 1
    }).forEach(([buildingId, count]) => own(state, buildingId, count));
    [
      "census-registry",
      "public-schools",
      "neighborhood-councils",
      "masons-guild",
      "quarry-standards",
      "workshop-standards",
      "power-authority",
      "stone-roads",
      "merchants-union",
      "guild-brokers",
      "harbor-charter",
      "dock-ledgers",
      "fish-auctions",
      "bonded-logistics",
      "sailors-guild",
      "tavern-leagues"
    ].forEach((policyId) => adopt(state, policyId));
  },
  (state, derived) => {
    const thresholds = [
      {
        label: "Glass Highrise",
        areaId: "patchwork-borough",
        cost: getAreaById(content, "patchwork-borough").buildings.find((building) => building.id === "glass-condo").baseCost,
        minSeconds: 45
      },
      {
        label: "Skyline Galleria",
        areaId: "patchwork-borough",
        cost: getAreaById(content, "patchwork-borough").buildings.find((building) => building.id === "skyline-galleria").baseCost,
        minSeconds: 60
      },
      {
        label: "City Charter",
        areaId: "patchwork-borough",
        cost: content.policies.find((policy) => policy.id === "city-charter").cost,
        minSeconds: 45
      },
      {
        label: "Bonded Warehouse",
        areaId: "port-city",
        cost: getAreaById(content, "port-city").buildings.find((building) => building.id === "bonded-warehouse").baseCost,
        minSeconds: 30
      },
      {
        label: "Grand Terminal",
        areaId: "port-city",
        cost: getAreaById(content, "port-city").buildings.find((building) => building.id === "grand-terminal").baseCost,
        minSeconds: 100
      },
      {
        label: "Harbor Senate",
        areaId: "port-city",
        cost: content.policies.find((policy) => policy.id === "harbor-senate").cost,
        minSeconds: 70
      }
    ];

    thresholds.forEach((entry) => {
      const seconds = getCostAffordabilitySeconds(state, derived, entry.areaId, entry.cost);
      console.log(`- ${entry.label}: ${seconds.toFixed(1)}s to afford`);
      assert(
        seconds >= entry.minSeconds,
        `${entry.label} is still too cheap in the representative late state (${seconds.toFixed(1)}s < ${entry.minSeconds}s).`
      );
    });
  }
);

runScenario(
  "unlock-stockpile-pressure",
  (state) => {
    state.areas.unlockedAreaIds = ["patchwork-borough", "port-city"];

    grantShared(state, { coins: 18000, districts: 3 });
    grantAreaCurrencies(state, "patchwork-borough", {
      residents: 295,
      food: 1400,
      timber: 900,
      stone: 2200,
      goods: 1800,
      power: 180,
      knowledge: 260,
      appeal: 150,
      influence: 160
    });
    Object.entries({
      "suburban-duplex": 28,
      "red-cottage": 22,
      "timber-cabin": 12,
      farmstead: 14,
      "lane-bungalow": 18,
      "quarry-yard": 12,
      "cube-villa": 12,
      "freight-depot": 10,
      "grand-manor": 8,
      "greenhouse-terrace": 8,
      "brick-factory": 6,
      "borough-exchange": 5,
      "hillside-lodge": 4,
      "public-archive": 3,
      "dome-habitat": 2,
      "summit-powerhouse": 0,
      "stone-keep": 2,
      "palm-bungalow": 2
    }).forEach(([buildingId, count]) => own(state, buildingId, count));
    [
      "census-registry",
      "public-schools",
      "neighborhood-councils",
      "masons-guild",
      "quarry-standards",
      "power-authority",
      "borough-works-board",
      "stone-roads",
      "merchants-union",
      "guild-brokers"
    ].forEach((policyId) => adopt(state, policyId));

    grantShared(state, { coins: 24000, districts: 4 });
    grantAreaCurrencies(state, "port-city", {
      crew: 158,
      catch: 1800,
      lumber: 700,
      masonry: 1300,
      cargo: 1800,
      harbor_capacity: 420,
      charts: 180,
      renown: 120
    });
    Object.entries({
      "fisher-huts": 30,
      "driftwood-yard": 16,
      "salt-smokehouse": 12,
      "timber-pier": 10,
      "barge-masons": 8,
      "chandlery-market": 8,
      "dredger-works": 6,
      "chart-house": 5,
      "bonded-warehouse": 4,
      "customs-tower": 0,
      "regatta-quay": 2
    }).forEach(([buildingId, count]) => own(state, buildingId, count));
    [
      "dock-ledgers",
      "longshift-piers",
      "bonded-logistics",
      "freeport-authority",
      "sailors-guild",
      "tavern-leagues",
      "chart-academy"
    ].forEach((policyId) => adopt(state, policyId));
  },
  (state, derived) => {
    const boroughArea = getAreaById(content, "patchwork-borough");
    const portArea = getAreaById(content, "port-city");
    const powerhouseCost = getBuildingCost(
      content,
      state,
      derived,
      boroughArea.buildings.find((building) => building.id === "summit-powerhouse")
    );
    const customsTowerCost = getBuildingCost(
      content,
      state,
      derived,
      portArea.buildings.find((building) => building.id === "customs-tower")
    );
    const boroughDeficits = Object.entries(powerhouseCost)
      .filter(([currencyId]) => ["stone", "goods", "knowledge"].includes(currencyId))
      .map(([currencyId, amount]) => Math.max(0, Number(amount) - getCurrencyBalance(state, "patchwork-borough", currencyId)));
    const portDeficits = Object.entries(customsTowerCost)
      .filter(([currencyId]) => ["masonry", "cargo", "harbor_capacity", "charts"].includes(currencyId))
      .map(([currencyId, amount]) => Math.max(0, Number(amount) - getCurrencyBalance(state, "port-city", currencyId)));

    console.log(`- summit-powerhouse deficits: ${boroughDeficits.map((value) => value.toFixed(1)).join(", ")}`);
    console.log(`- customs-tower deficits: ${portDeficits.map((value) => value.toFixed(1)).join(", ")}`);

    assert(
      boroughDeficits.some((value) => value > 0),
      "Summit Powerhouse is still instantly affordable from a plausible pre-unlock stockpile."
    );
    assert(
      portDeficits.some((value) => value > 0),
      "Customs Tower is still instantly affordable from a plausible pre-unlock stockpile."
    );
  }
);

runScenario(
  "maintenance-pressure",
  (state) => {
    state.areas.unlockedAreaIds = ["patchwork-borough", "port-city"];
    grantShared(state, { coins: 999999, districts: 12 });
    grantAreaCurrencies(state, "patchwork-borough", {
      residents: 420,
      food: 400,
      timber: 300,
      stone: 500,
      goods: 400,
      power: 120,
      knowledge: 120,
      appeal: 90,
      influence: 90
    });
    grantAreaCurrencies(state, "port-city", {
      crew: 220,
      catch: 400,
      lumber: 220,
      masonry: 220,
      cargo: 320,
      harbor_capacity: 160,
      charts: 90,
      renown: 60
    });
    Object.entries({
      "suburban-duplex": 20,
      "red-cottage": 15,
      "timber-cabin": 8,
      farmstead: 10,
      "lane-bungalow": 14,
      "quarry-yard": 8,
      "cube-villa": 8,
      "freight-depot": 7,
      "grand-manor": 6,
      "greenhouse-terrace": 5,
      "brick-factory": 4,
      "borough-exchange": 6,
      "hillside-lodge": 6,
      "public-archive": 4,
      "dome-habitat": 3,
      "summit-powerhouse": 2,
      "stone-keep": 3,
      "palm-bungalow": 3,
      "glass-condo": 3,
      "skyline-galleria": 2,
      "fisher-huts": 26,
      "driftwood-yard": 12,
      "salt-smokehouse": 8,
      "timber-pier": 6,
      "barge-masons": 5,
      "chandlery-market": 6,
      "dredger-works": 4,
      "chart-house": 4,
      "bonded-warehouse": 4,
      "customs-tower": 3,
      "regatta-quay": 3,
      "grand-terminal": 2
    }).forEach(([buildingId, count]) => own(state, buildingId, count));
    [
      "census-registry",
      "public-schools",
      "neighborhood-councils",
      "masons-guild",
      "power-authority",
      "stone-roads",
      "merchants-union",
      "guild-brokers",
      "harbor-charter",
      "dock-ledgers",
      "fish-auctions",
      "sailors-guild",
      "tavern-leagues"
    ].forEach((policyId) => adopt(state, policyId));
  },
  (state, derived) => {
    const boroughPressure = {
      food: Number(derived.passivePerSecond.food || 0),
      goods: Number(derived.passivePerSecond.goods || 0),
      power: Number(derived.passivePerSecond.power || 0)
    };
    const portPressure = {
      cargo: Number(derived.passivePerSecond.cargo || 0),
      harbor_capacity: Number(derived.passivePerSecond.harbor_capacity || 0)
    };

    console.log(
      `- borough net: food ${boroughPressure.food.toFixed(2)}, goods ${boroughPressure.goods.toFixed(2)}, power ${boroughPressure.power.toFixed(2)}`
    );
    console.log(
      `- port net: cargo ${portPressure.cargo.toFixed(2)}, harbor_capacity ${portPressure.harbor_capacity.toFixed(2)}`
    );

    assert(
      Object.values(boroughPressure).some((value) => value < 0),
      "An overbuilt borough still has no negative upkeep pressure."
    );
    assert(
      Object.values(portPressure).some((value) => value < 0),
      "An overbuilt port still has no negative upkeep pressure."
    );
  }
);

runScenario(
  "shortage-shutdown",
  (state) => {
    grantShared(state, { coins: 20000, districts: 2 });
    grantAreaCurrencies(state, "patchwork-borough", {
      residents: 320,
      food: 300,
      timber: 200,
      stone: 800,
      goods: 600,
      power: 0,
      knowledge: 200,
      appeal: 80,
      influence: 80
    });
    Object.entries({
      "suburban-duplex": 20,
      "red-cottage": 16,
      "timber-cabin": 10,
      farmstead: 12,
      "quarry-yard": 10,
      "cube-villa": 10,
      "freight-depot": 8,
      "brick-factory": 5,
      "borough-exchange": 4,
      "public-archive": 3,
      "glass-condo": 1
    }).forEach(([buildingId, count]) => own(state, buildingId, count));
    [
      "census-registry",
      "public-schools",
      "masons-guild",
      "quarry-standards",
      "workshop-standards",
      "stone-roads",
      "merchants-union"
    ].forEach((policyId) => adopt(state, policyId));
  },
  (state, derived) => {
    const glassCondo = derived.perBuilding["glass-condo"];
    console.log(
      `- glass condo operating multiplier: ${Number(glassCondo?.operatingMultiplier || 0).toFixed(2)} | coin output ${Number(
        glassCondo?.outputs?.coins || 0
      ).toFixed(2)}`
    );
    assert(glassCondo?.operatingMultiplier === 0, "Glass Highrise should shut down when power is empty.");
    assert(Number(glassCondo?.outputs?.coins || 0) === 0, "Glass Highrise should produce no coins during a power outage.");
  }
);

console.log("\nBalance smoke complete.");
