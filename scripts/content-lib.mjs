import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const contentRoot = path.join(projectRoot, "content");

async function readJson(relativePath) {
  const filePath = path.join(contentRoot, relativePath);
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function collectCurrencyIndex(content) {
  const index = {};

  Object.entries(content.resources.sharedCurrencies || {}).forEach(([currencyId, currency]) => {
    index[currencyId] = {
      ...currency,
      id: currencyId,
      scope: "shared",
      areaId: null
    };
  });

  content.areas.forEach((area) => {
    Object.entries(area.manifest.localCurrencies || {}).forEach(([currencyId, currency]) => {
      index[currencyId] = {
        ...currency,
        id: currencyId,
        scope: "local",
        areaId: area.id
      };
    });
  });

  return index;
}

function validateResourceMap(errors, currencyIndex, areaId, value, label) {
  const record = value || {};
  Object.entries(record).forEach(([currencyId, amount]) => {
    const currency = currencyIndex[currencyId];
    if (!currency) {
      errors.push(`${label} references unknown currency "${currencyId}".`);
      return;
    }
    if (currency.scope === "local" && currency.areaId !== areaId) {
      errors.push(`${label} illegally references ${currencyId} from area "${currency.areaId}".`);
    }
    if (!Number.isFinite(Number(amount))) {
      errors.push(`${label} has non-numeric amount for "${currencyId}".`);
    }
  });
}

function validateCodex(errors, entityLabel, codex) {
  if (!codex || typeof codex !== "object") {
    errors.push(`${entityLabel} is missing codex metadata.`);
    return;
  }
  for (const key of ["family", "tier", "summary", "lore", "masteryTarget", "sortKey"]) {
    if (codex[key] === undefined || codex[key] === null || codex[key] === "") {
      errors.push(`${entityLabel} codex is missing "${key}".`);
    }
  }
}

function buildPolicyTreeIndex(policies) {
  const trees = {};
  policies.forEach((policy) => {
    if (!trees[policy.treeId]) {
      trees[policy.treeId] = {
        id: policy.treeId,
        name: titleCase(policy.treeId.replace(/-/g, " ")),
        tiers: {}
      };
    }
    if (!trees[policy.treeId].tiers[policy.tier]) {
      trees[policy.treeId].tiers[policy.tier] = [];
    }
    trees[policy.treeId].tiers[policy.tier].push(policy.id);
  });

  return Object.values(trees).map((tree) => ({
    ...tree,
    tiers: Object.entries(tree.tiers)
      .sort(([left], [right]) => Number(left) - Number(right))
      .map(([tier, policyIds]) => ({
        tier: Number(tier),
        policyIds: policyIds.slice()
      }))
  }));
}

export async function loadContent() {
  const game = await readJson("base/game.json");
  const resources = await readJson("base/resources.json");
  const policies = await readJson("base/policies.json");
  const systems = await readJson("base/systems.json");
  const areasRoot = path.join(contentRoot, "areas");
  const areaEntries = await fs.readdir(areasRoot, { withFileTypes: true });
  const areas = [];

  for (const entry of areaEntries) {
    if (!entry.isDirectory()) {
      continue;
    }

    const areaId = entry.name;
    const manifest = await readJson(path.join("areas", areaId, "manifest.json"));
    const districts = await readJson(path.join("areas", areaId, "districts.json"));
    areas.push({
      id: areaId,
      manifest,
      districts
    });
  }

  areas.sort((left, right) => left.id.localeCompare(right.id));

  return {
    projectRoot,
    game,
    resources,
    policies,
    systems,
    areas
  };
}

export function validateContent(content) {
  const errors = [];
  const areaIds = new Set();
  const buildingIds = new Set();
  const policyIds = new Set();
  const manualActionIds = new Set();

  if (!content.game.appVersion) {
    errors.push("Game metadata is missing appVersion.");
  }
  if (!Number.isInteger(Number(content.game.saveVersion))) {
    errors.push("Game metadata is missing an integer saveVersion.");
  }
  if (!content.game.balanceVersion) {
    errors.push("Game metadata is missing balanceVersion.");
  }
  if (!content.game.defaultAreaId) {
    errors.push("Game metadata is missing defaultAreaId.");
  }

  if (!content.resources.sharedCurrencies?.coins) {
    errors.push('Shared currencies must include "coins".');
  }
  if (!content.resources.sharedCurrencies?.districts) {
    errors.push('Shared currencies must include "districts".');
  }

  content.areas.forEach((area) => {
    if (areaIds.has(area.id)) {
      errors.push(`Duplicate area id "${area.id}".`);
    }
    areaIds.add(area.id);

    if (area.manifest.id !== area.id) {
      errors.push(`Area manifest id mismatch for "${area.id}".`);
    }
  });

  if (!areaIds.has(content.game.defaultAreaId)) {
    errors.push(`Default area "${content.game.defaultAreaId}" does not exist.`);
  }

  const currencyIndex = collectCurrencyIndex(content);
  const currencyIds = new Set();
  Object.keys(currencyIndex).forEach((currencyId) => {
    if (currencyIds.has(currencyId)) {
      errors.push(`Duplicate currency id "${currencyId}".`);
    }
    currencyIds.add(currencyId);
  });

  content.areas.forEach((area) => {
    const localCurrencyIds = Object.keys(area.manifest.localCurrencies || {});
    if (!localCurrencyIds.includes(area.manifest.populationCurrencyId)) {
      errors.push(
        `Area "${area.id}" populationCurrencyId "${area.manifest.populationCurrencyId}" is not local to the area.`
      );
    }

    for (const manualAction of area.manifest.manualActions || []) {
      if (manualActionIds.has(manualAction.id)) {
        errors.push(`Duplicate manual action id "${manualAction.id}".`);
      }
      manualActionIds.add(manualAction.id);
      if (manualAction.areaId !== area.id) {
        errors.push(`Manual action "${manualAction.id}" has mismatched areaId.`);
      }
      validateResourceMap(errors, currencyIndex, area.id, { [manualAction.currency]: 1 }, `manual action ${manualAction.id}`);
      for (const scaling of manualAction.buildingScaling || []) {
        if (!scaling.buildingId) {
          errors.push(`Manual action "${manualAction.id}" contains an empty building scaling id.`);
        }
      }
    }

    for (const score of area.manifest.prestigeScoreConfig || []) {
      validateResourceMap(errors, currencyIndex, area.id, { [score.currencyId]: 1 }, `prestige score ${area.id}`);
      if (!Number.isFinite(Number(score.per)) || !Number.isFinite(Number(score.gain))) {
        errors.push(`Area "${area.id}" has an invalid prestige score config entry for "${score.currencyId}".`);
      }
    }

    area.districts.forEach((building) => {
      if (buildingIds.has(building.id)) {
        errors.push(`Duplicate building id "${building.id}".`);
      }
      buildingIds.add(building.id);
      validateResourceMap(errors, currencyIndex, area.id, building.unlock, `building ${building.id} unlock`);
      validateResourceMap(errors, currencyIndex, area.id, building.baseCost, `building ${building.id} baseCost`);
      validateResourceMap(
        errors,
        currencyIndex,
        area.id,
        building.outputPerSecond,
        `building ${building.id} outputPerSecond`
      );
      validateResourceMap(
        errors,
        currencyIndex,
        area.id,
        building.maintenancePerSecond,
        `building ${building.id} maintenancePerSecond`
      );
      validateCodex(errors, `building ${building.id}`, building.codex);

      Object.keys(building.statsPerOwned || {}).forEach((statId) => {
        const currency = currencyIndex[statId];
        if (!currency) {
          errors.push(`Building "${building.id}" references unknown stat "${statId}".`);
        } else if (currency.scope !== "local" || currency.areaId !== area.id) {
          errors.push(`Building "${building.id}" stat "${statId}" must be local to area "${area.id}".`);
        }
      });
    });
  });

  const policiesById = new Map();
  content.policies.forEach((policy) => {
    if (policyIds.has(policy.id)) {
      errors.push(`Duplicate policy id "${policy.id}".`);
    }
    policyIds.add(policy.id);
    policiesById.set(policy.id, policy);

    if (!areaIds.has(policy.areaId)) {
      errors.push(`Policy "${policy.id}" references unknown area "${policy.areaId}".`);
    }
    if (!policy.treeId) {
      errors.push(`Policy "${policy.id}" is missing treeId.`);
    }
    if (!Number.isFinite(Number(policy.tier))) {
      errors.push(`Policy "${policy.id}" is missing a numeric tier.`);
    }

    validateCodex(errors, `policy ${policy.id}`, policy.codex);
    validateResourceMap(errors, currencyIndex, policy.areaId, policy.unlock, `policy ${policy.id} unlock`);
    validateResourceMap(errors, currencyIndex, policy.areaId, policy.cost, `policy ${policy.id} cost`);

    for (const prerequisiteId of policy.prerequisitePolicyIds || []) {
      if (!policiesById.has(prerequisiteId) && !content.policies.some((item) => item.id === prerequisiteId)) {
        errors.push(`Policy "${policy.id}" prerequisite "${prerequisiteId}" was not found.`);
      }
    }
    for (const prerequisiteId of policy.prerequisiteAnyPolicyIds || []) {
      if (!policiesById.has(prerequisiteId) && !content.policies.some((item) => item.id === prerequisiteId)) {
        errors.push(`Policy "${policy.id}" prerequisiteAny "${prerequisiteId}" was not found.`);
      }
    }

    for (const effect of policy.effects || []) {
      if (effect.currency) {
        validateResourceMap(errors, currencyIndex, policy.areaId, { [effect.currency]: 1 }, `policy ${policy.id} effect`);
      }
      if (effect.sourceCurrency) {
        validateResourceMap(
          errors,
          currencyIndex,
          policy.areaId,
          { [effect.sourceCurrency]: 1 },
          `policy ${policy.id} effect`
        );
      }
      if (effect.targetCurrency) {
        validateResourceMap(
          errors,
          currencyIndex,
          policy.areaId,
          { [effect.targetCurrency]: 1 },
          `policy ${policy.id} effect`
        );
      }
      for (const currencyId of effect.currencies || []) {
        validateResourceMap(errors, currencyIndex, policy.areaId, { [currencyId]: 1 }, `policy ${policy.id} effect`);
      }
      for (const buildingId of effect.buildingIds || []) {
        if (!buildingIds.has(buildingId) && !content.areas.some((area) => area.districts.some((item) => item.id === buildingId))) {
          errors.push(`Policy "${policy.id}" effect references unknown building "${buildingId}".`);
        }
      }
      if (effect.type === "unlockArea" && !areaIds.has(effect.areaId)) {
        errors.push(`Policy "${policy.id}" tries to unlock unknown area "${effect.areaId}".`);
      }
    }
  });

  content.areas.forEach((area) => {
    if (area.manifest.areaUnlockPolicyId && !policyIds.has(area.manifest.areaUnlockPolicyId)) {
      errors.push(`Area "${area.id}" references unknown unlock policy "${area.manifest.areaUnlockPolicyId}".`);
    }

    for (const manualAction of area.manifest.manualActions || []) {
      if (manualAction.unlockPolicyId && !policyIds.has(manualAction.unlockPolicyId)) {
        errors.push(`Manual action "${manualAction.id}" references unknown unlock policy "${manualAction.unlockPolicyId}".`);
      }
      if (
        manualAction.unlockBuildingId &&
        !content.areas.some((candidate) => candidate.districts.some((item) => item.id === manualAction.unlockBuildingId))
      ) {
        errors.push(`Manual action "${manualAction.id}" references unknown unlock building "${manualAction.unlockBuildingId}".`);
      }
      for (const scaling of manualAction.buildingScaling || []) {
        if (!buildingIds.has(scaling.buildingId)) {
          errors.push(`Manual action "${manualAction.id}" references unknown scaling building "${scaling.buildingId}".`);
        }
      }
    }
  });

  if (content.systems.annexation?.unlockPolicyId && !policyIds.has(content.systems.annexation.unlockPolicyId)) {
    errors.push(`Annexation system references unknown unlock policy "${content.systems.annexation.unlockPolicyId}".`);
  }

  errors.push(...validatePolicyGraphs(content.policies));
  return errors;
}

function validatePolicyGraphs(policies) {
  const errors = [];
  const policyById = new Map(policies.map((policy) => [policy.id, policy]));
  const adjacency = new Map();

  policies.forEach((policy) => {
    const dependencies = [
      ...(policy.prerequisitePolicyIds || []),
      ...(policy.prerequisiteAnyPolicyIds || [])
    ];
    adjacency.set(policy.id, dependencies.filter((id) => policyById.has(id)));
  });

  const visitState = new Map();
  function dfs(policyId) {
    const state = visitState.get(policyId) || "unseen";
    if (state === "visiting") {
      errors.push(`Policy prerequisites contain a cycle at "${policyId}".`);
      return;
    }
    if (state === "done") {
      return;
    }
    visitState.set(policyId, "visiting");
    for (const nextId of adjacency.get(policyId) || []) {
      dfs(nextId);
    }
    visitState.set(policyId, "done");
  }

  policies.forEach((policy) => dfs(policy.id));

  const groups = new Map();
  policies.forEach((policy) => {
    if (!policy.exclusiveGroupId) {
      return;
    }
    if (!groups.has(policy.exclusiveGroupId)) {
      groups.set(policy.exclusiveGroupId, []);
    }
    groups.get(policy.exclusiveGroupId).push(policy);
  });
  groups.forEach((members, groupId) => {
    if (members.length < 2) {
      errors.push(`Exclusive group "${groupId}" must contain at least two policies.`);
      return;
    }
    const first = members[0];
    members.slice(1).forEach((policy) => {
      if (policy.areaId !== first.areaId || policy.treeId !== first.treeId || Number(policy.tier) !== Number(first.tier)) {
        errors.push(`Exclusive group "${groupId}" must stay within one area, tree, and tier.`);
      }
    });
  });

  return errors;
}

export function buildRuntimeContent(content) {
  const currencyIndex = collectCurrencyIndex(content);
  const buildings = [];
  const policies = content.policies.map((policy) => ({
    ...policy,
    effects: (policy.effects || []).map((effect) => ({
      areaId: policy.areaId,
      ...effect
    }))
  }));
  const policiesByArea = {};
  const buildingsByArea = {};

  content.areas.forEach((area) => {
    const areaBuildings = area.districts.map((building) => ({
      ...building,
      areaId: area.id
    }));
    buildings.push(...areaBuildings);
    buildingsByArea[area.id] = areaBuildings.map((building) => building.id);
  });

  content.areas.forEach((area) => {
    policiesByArea[area.id] = policies.filter((policy) => policy.areaId === area.id).map((policy) => policy.id);
  });

  const areas = content.areas.map((area) => {
    const areaPolicies = policies.filter((policy) => policy.areaId === area.id);
    return {
      ...area.manifest,
      buildings: area.districts.map((building) => ({
        ...building,
        areaId: area.id
      })),
      policies: areaPolicies,
      policyTrees: buildPolicyTreeIndex(areaPolicies)
    };
  });

  return {
    meta: {
      appId: content.game.appId,
      id: content.game.appId,
      appVersion: content.game.appVersion,
      saveVersion: Number(content.game.saveVersion),
      balanceVersion: content.game.balanceVersion,
      eyebrow: content.game.eyebrow,
      name: content.game.name
    },
    formulas: {
      ...content.game.formulas
    },
    defaultAreaId: content.game.defaultAreaId,
    sharedCurrencies: content.resources.sharedCurrencies,
    areas,
    buildings,
    policies,
    systems: content.systems,
    indexes: {
      areaIds: areas.map((area) => area.id),
      allCurrencyIds: Object.keys(currencyIndex),
      currencyIndex,
      buildingsByArea,
      policiesByArea
    },
    startingSharedCurrencies: content.game.startingSharedCurrencies
  };
}

export async function writeRuntimeModule(runtimeContent) {
  const outputPath = path.join(projectRoot, "src", "content-runtime", "generated-content.js");
  const fileBody = `const GAME_CONTENT = ${JSON.stringify(runtimeContent, null, 2)};\n\nexport default GAME_CONTENT;\n`;
  await fs.writeFile(outputPath, fileBody, "utf8");
  return outputPath;
}

function titleCase(value) {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}
