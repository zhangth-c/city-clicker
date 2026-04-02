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
  const resourceIds = new Set(Object.keys(content.resources));
  const areaIds = new Set();
  const districtIds = new Set();
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

  content.areas.forEach((area) => {
    if (areaIds.has(area.manifest.id)) {
      errors.push(`Duplicate area id "${area.manifest.id}".`);
    }
    areaIds.add(area.manifest.id);

    for (const manualAction of area.manifest.manualActions || []) {
      if (manualActionIds.has(manualAction.id)) {
        errors.push(`Duplicate manual action id "${manualAction.id}".`);
      }
      manualActionIds.add(manualAction.id);
    }

    area.districts.forEach((district) => {
      if (districtIds.has(district.id)) {
        errors.push(`Duplicate district id "${district.id}".`);
      }
      districtIds.add(district.id);
    });
  });

  content.policies.forEach((policy) => {
    if (policyIds.has(policy.id)) {
      errors.push(`Duplicate policy id "${policy.id}".`);
    }
    policyIds.add(policy.id);
  });

  if (!areaIds.has(content.game.activeAreaId)) {
    errors.push(`Active area "${content.game.activeAreaId}" was not found under content/areas.`);
  }

  const validCurrencies = new Set([...resourceIds]);

  for (const area of content.areas) {
    for (const manualAction of area.manifest.manualActions || []) {
      if (!resourceIds.has(manualAction.currency)) {
        errors.push(`Manual action ${manualAction.id} references unknown resource "${manualAction.currency}".`);
      }
      if (manualAction.unlockUpgradeId && !policyIds.has(manualAction.unlockUpgradeId)) {
        errors.push(
          `Manual action ${manualAction.id} references unknown unlock policy "${manualAction.unlockUpgradeId}".`
        );
      }
      for (const scaling of manualAction.buildingScaling || []) {
        if (!districtIds.has(scaling.buildingId)) {
          errors.push(
            `Manual action ${manualAction.id} references unknown district "${scaling.buildingId}".`
          );
        }
      }
    }

    for (const district of area.districts) {
      validateResourceMap(errors, district.baseCost, validCurrencies, `district ${district.id} baseCost`);
      validateResourceMap(errors, district.outputPerSecond, validCurrencies, `district ${district.id} outputPerSecond`);
      validateResourceMap(
        errors,
        district.maintenancePerSecond,
        validCurrencies,
        `district ${district.id} maintenancePerSecond`
      );
      validateResourceMap(errors, district.unlock, validCurrencies, `district ${district.id} unlock`, {
        allowResidents: true
      });

      for (const synergy of district.synergies || []) {
        if (synergy.targetType === "output" || synergy.targetType === "maintenance") {
          if (!validCurrencies.has(synergy.target)) {
            errors.push(
              `District ${district.id} synergy target "${synergy.target}" is not a known resource.`
            );
          }
        }
        if (synergy.targetType === "stat" && synergy.target !== "residents") {
          errors.push(`District ${district.id} synergy stat target "${synergy.target}" is unsupported.`);
        }

        for (const buildingId of synergy.sourceBuildingIds || []) {
          if (!districtIds.has(buildingId)) {
            errors.push(`District ${district.id} synergy references unknown district "${buildingId}".`);
          }
        }
      }
    }
  }

  for (const policy of content.policies) {
    validateResourceMap(errors, policy.cost, validCurrencies, `policy ${policy.id} cost`);
    validateResourceMap(errors, policy.unlock, validCurrencies, `policy ${policy.id} unlock`, {
      allowResidents: true
    });

    for (const effect of policy.effects || []) {
      for (const buildingId of effect.buildingIds || []) {
        if (!districtIds.has(buildingId)) {
          errors.push(`Policy ${policy.id} effect references unknown district "${buildingId}".`);
        }
      }

      for (const currencyId of effect.currencies || []) {
        if (!validCurrencies.has(currencyId)) {
          errors.push(`Policy ${policy.id} effect references unknown resource "${currencyId}".`);
        }
      }

      if (effect.currency && !validCurrencies.has(effect.currency)) {
        errors.push(`Policy ${policy.id} effect references unknown resource "${effect.currency}".`);
      }
      if (effect.sourceCurrency && !validCurrencies.has(effect.sourceCurrency)) {
        errors.push(`Policy ${policy.id} effect references unknown source resource "${effect.sourceCurrency}".`);
      }
      if (effect.targetCurrency && !validCurrencies.has(effect.targetCurrency)) {
        errors.push(`Policy ${policy.id} effect references unknown target resource "${effect.targetCurrency}".`);
      }
    }
  }

  for (const system of Object.values(content.systems)) {
    if (system.unlockUpgradeId && !policyIds.has(system.unlockUpgradeId)) {
      errors.push(
        `System ${system.id} references unknown unlock policy "${system.unlockUpgradeId}".`
      );
    }
  }

  return errors;
}

export function buildRuntimeContent(content) {
  const activeArea = content.areas.find((area) => area.id === content.game.activeAreaId);
  const areas = content.areas.map((area) => area.manifest);
  const buildings = activeArea.districts.map((district) => ({
    ...district,
    areaId: activeArea.id
  }));

  return {
    meta: {
      appId: content.game.appId,
      id: activeArea.manifest.runtimeId || `${content.game.appId}-${activeArea.id}`,
      appVersion: content.game.appVersion,
      saveVersion: Number(content.game.saveVersion),
      balanceVersion: content.game.balanceVersion,
      areaId: activeArea.id,
      eyebrow: content.game.eyebrow,
      name: activeArea.manifest.name,
      theme: activeArea.manifest.theme,
      goalText: activeArea.manifest.goalText,
      artReference: activeArea.manifest.artReference
    },
    areas,
    activeAreaId: activeArea.id,
    indexes: {
      areaIds: areas.map((area) => area.id),
      buildingIds: buildings.map((building) => building.id),
      upgradeIds: content.policies.map((policy) => policy.id),
      manualActionIds: (activeArea.manifest.manualActions || []).map((action) => action.id),
      resourceIds: Object.keys(content.resources),
      buildingsByArea: {
        [activeArea.id]: buildings.map((building) => building.id)
      }
    },
    currencies: content.resources,
    startingState: activeArea.manifest.startingState,
    manualActions: activeArea.manifest.manualActions || [],
    formulas: activeArea.manifest.formulas,
    pacing: activeArea.manifest.pacing,
    buildings,
    globalUpgrades: content.policies,
    systems: content.systems
  };
}

export async function writeRuntimeModule(runtimeContent) {
  const outputPath = path.join(projectRoot, "src", "content-runtime", "generated-content.js");
  const moduleSource = `export const GAME_CONTENT = ${JSON.stringify(runtimeContent, null, 2)};\nexport default GAME_CONTENT;\n`;
  await fs.writeFile(outputPath, moduleSource);
  return outputPath;
}

function validateResourceMap(errors, map, validCurrencies, label, options = {}) {
  if (!map || typeof map !== "object") {
    return;
  }

  Object.keys(map).forEach((currencyId) => {
    if (options.allowResidents && currencyId === "residents") {
      return;
    }
    if (!validCurrencies.has(currencyId)) {
      errors.push(`${label} references unknown resource "${currencyId}".`);
    }
  });
}
