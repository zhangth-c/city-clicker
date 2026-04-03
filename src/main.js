import GAME_CONTENT from "./content-runtime/generated-content.js";
import { MAX_FRAME_MS, RENDER_INTERVAL_MS } from "./core/config.js";
import { formatCurrencyAmount, formatNumber, labelForCurrency, titleCase } from "./core/format.js";
import { buildSaveEnvelope } from "./core/save-migrations.js";
import { buildStateSnapshot, createInitialState, normalizeState, snapshotCurrencies } from "./core/state.js";
import {
  addCurrency,
  calculateDerivedState,
  canAfford,
  getAreaById,
  getBuildingById,
  getBuildingCost,
  getPolicyBlockedReason,
  getPolicyById,
  spendCost,
  updateUtilityLocks
} from "./systems/economy.js";
import {
  arePolicyPrerequisitesMet,
  calculateAnnexationGain,
  requirementsMet,
  syncProgressState
} from "./systems/progression.js";
import { getElements } from "./ui/elements.js";
import { createRenderer } from "./ui/render.js";

const content = GAME_CONTENT;
const elements = getElements(document);
const storageKey = `${content.meta.id}-save`;
const legacyStorageKeys = ["patchwork-borough-v1-save", "patchwork-borough-save"];
const uiState = {
  screen: "area",
  encyclopediaKind: "buildings",
  encyclopediaArea: content.defaultAreaId,
  encyclopediaFamily: "all",
  encyclopediaCategory: "all",
  encyclopediaProgress: "all"
};

const renderer = createRenderer({
  content,
  elements,
  handlers: {
    onRunManualAction: runManualAction,
    onBuyBuilding: buyBuilding,
    onBuyPolicy: buyPolicy,
    onSelectArea: selectArea,
    onOpenEncyclopedia: openEncyclopedia
  }
});

let state = createInitialState(content);
let derived = calculateDerivedState(content, state);
let lastFrameMs = 0;
let lastRenderMs = 0;
let saveAccumulatorMs = 0;
let statusMessage = "";

init();

function init() {
  hydrateStaticCopy();
  state = loadState();
  recalculate();
  applyOfflineProgress();
  bindEvents();
  render(true);
  lastFrameMs = performance.now();
  lastRenderMs = lastFrameMs;
  requestAnimationFrame(frame);
}

function hydrateStaticCopy() {
  document.title = content.meta.name;
  elements.title.textContent = content.meta.name;
}

function bindEvents() {
  elements.saveButton.addEventListener("click", () => {
    if (saveState("Progress saved locally.")) {
      render(true);
    }
  });
  elements.exportButton.addEventListener("click", exportSave);
  elements.importButton.addEventListener("click", () => elements.importInput.click());
  elements.importInput.addEventListener("change", importSave);
  elements.resetButton.addEventListener("click", hardReset);
  elements.annexButton.addEventListener("click", annexDistrict);

  elements.codexKindFilter.addEventListener("change", () => {
    uiState.encyclopediaKind = elements.codexKindFilter.value;
    uiState.encyclopediaFamily = "all";
    uiState.encyclopediaCategory = "all";
    uiState.encyclopediaProgress = "all";
    render(true);
  });
  elements.codexAreaFilter.addEventListener("change", () => {
    uiState.encyclopediaArea = elements.codexAreaFilter.value;
    uiState.encyclopediaFamily = "all";
    uiState.encyclopediaCategory = "all";
    render(true);
  });
  elements.codexFamilyFilter.addEventListener("change", () => {
    uiState.encyclopediaFamily = elements.codexFamilyFilter.value;
    render(true);
  });
  elements.codexCategoryFilter.addEventListener("change", () => {
    uiState.encyclopediaCategory = elements.codexCategoryFilter.value;
    render(true);
  });
  elements.codexProgressFilter.addEventListener("change", () => {
    uiState.encyclopediaProgress = elements.codexProgressFilter.value;
    render(true);
  });

  window.addEventListener("beforeunload", () => {
    saveState();
  });
}

function frame(nowMs) {
  if (!lastFrameMs) {
    lastFrameMs = nowMs;
  }

  const deltaMs = Math.min(nowMs - lastFrameMs, MAX_FRAME_MS);
  lastFrameMs = nowMs;

  simulate(deltaMs / 1000);
  saveAccumulatorMs += deltaMs;

  if (saveAccumulatorMs >= content.formulas.autosaveMs) {
    saveState();
    saveAccumulatorMs = 0;
  }

  if (nowMs - lastRenderMs >= RENDER_INTERVAL_MS) {
    render(false);
    lastRenderMs = nowMs;
  }

  requestAnimationFrame(frame);
}

function render(force) {
  renderer.render({
    content,
    state,
    derived,
    activeAreaId: state.areas.activeAreaId,
    screen: uiState.screen,
    uiState,
    statusMessage,
    force
  });
}

function recalculate() {
  derived = calculateDerivedState(content, state);
  updateUtilityLocks(content, state, derived);
  syncProgressState(content, state, derived);
  derived = calculateDerivedState(content, state);
  updateUtilityLocks(content, state, derived);
  syncProgressState(content, state, derived);
  derived = calculateDerivedState(content, state);
}

function simulate(seconds) {
  if (seconds <= 0) {
    return;
  }

  Object.entries(derived.passivePerSecond).forEach(([currencyId, rate]) => {
    addCurrency(content, state, currencyId, Number(rate || 0) * seconds);
  });
  recalculate();
}

function loadState() {
  try {
    const candidates = [storageKey, ...legacyStorageKeys]
      .map((key) => window.localStorage.getItem(key))
      .filter(Boolean);
    if (!candidates.length) {
      statusMessage = "A new city has been founded.";
      return createInitialState(content);
    }

    const parsed = JSON.parse(candidates[0]);
    const merged = normalizeState(content, parsed);
    statusMessage = "Save restored.";
    return merged;
  } catch (error) {
    console.error(error);
    statusMessage = "Save recovery failed. Starting a new city.";
    return createInitialState(content);
  }
}

function saveState(customMessage) {
  try {
    const record = buildSaveEnvelope(content, buildStateSnapshot(state));
    window.localStorage.setItem(storageKey, JSON.stringify(record));
    if (typeof customMessage === "string") {
      statusMessage = customMessage;
    }
    return true;
  } catch (error) {
    console.error(error);
    statusMessage = "Saving failed.";
    return false;
  }
}

function buildExportPayload() {
  return {
    exportVersion: 3,
    exportedAt: new Date().toISOString(),
    ...buildSaveEnvelope(content, buildStateSnapshot(state))
  };
}

function exportSave() {
  try {
    const payload = buildExportPayload();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const anchor = document.createElement("a");
    const timestamp = new Date().toISOString().replace(/[:]/g, "-").replace(/\..+$/, "");
    const url = URL.createObjectURL(blob);

    anchor.href = url;
    anchor.download = `${content.meta.id}-save-${timestamp}.json`;
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);

    statusMessage = "Save exported.";
    render(true);
  } catch (error) {
    console.error(error);
    statusMessage = "Export failed.";
    render(true);
  }
}

function importSave(event) {
  const file = event.target.files?.[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      state = normalizeState(content, parsed);
      state.stats.lastSavedAt = Date.now();
      recalculate();
      saveState("Imported save loaded.");
      render(true);
    } catch (error) {
      console.error(error);
      statusMessage = error instanceof Error ? error.message : "Import failed.";
      render(true);
    } finally {
      elements.importInput.value = "";
    }
  };
  reader.onerror = () => {
    statusMessage = "Import failed while reading the file.";
    elements.importInput.value = "";
    render(true);
  };
  reader.readAsText(file);
}

function applyOfflineProgress() {
  const elapsedSeconds = Math.max(0, (Date.now() - Number(state.stats.lastSavedAt || Date.now())) / 1000);
  const cappedSeconds = Math.min(elapsedSeconds, content.formulas.offlineProgressCapSeconds);

  if (cappedSeconds < 1) {
    return;
  }

  const before = snapshotCurrencies(state);
  let remaining = cappedSeconds;
  const stepSize = cappedSeconds > 120 ? 1 : content.formulas.tickRateMs / 1000;

  while (remaining > 0) {
    const step = Math.min(stepSize, remaining);
    simulate(step);
    remaining -= step;
  }

  const after = snapshotCurrencies(state);
  const gains = Object.entries(after)
    .map(([key, amount]) => ({
      key,
      amount: Number(amount || 0) - Number(before[key] || 0)
    }))
    .filter((entry) => entry.amount > 0.01)
    .sort((left, right) => right.amount - left.amount)
    .slice(0, 4)
    .map((entry) => {
      const currencyId = describeSnapshotCurrencyId(entry.key);
      return `+${formatCurrencyAmount(content, currencyId, entry.amount, { rate: true })} ${labelForCurrency(content, currencyId)}`;
    })
    .join(", ");

  statusMessage = gains
    ? `Offline progress: ${gains}.`
    : `Offline progress applied for ${Math.round(cappedSeconds / 60)} min.`;
}

function describeSnapshotKey(key) {
  if (!key.includes(":")) {
    return labelForCurrency(content, key);
  }
  const [, currencyId] = key.split(":");
  return labelForCurrency(content, currencyId);
}

function describeSnapshotCurrencyId(key) {
  if (!key.includes(":")) {
    return key;
  }
  const [, currencyId] = key.split(":");
  return currencyId;
}

function runManualAction(actionId) {
  const areaId = state.areas.activeAreaId;
  const action = (derived.manualActionsByArea[areaId] || []).find((item) => item.id === actionId);
  if (!action || !action.unlocked) {
    return { granted: false };
  }

  addCurrency(content, state, action.currency, action.amount);
  state.stats.totalClicks += 1;
  statusMessage = "";
  recalculate();
  render(true);

  return {
    granted: true,
    currencyId: action.currency,
    label: `+${formatCurrencyAmount(content, action.currency, action.amount, { rate: true })} ${labelForCurrency(
      content,
      action.currency
    )}`
  };
}

function buyBuilding(buildingId) {
  const building = getBuildingById(content, buildingId);
  if (!building || building.areaId !== state.areas.activeAreaId) {
    return;
  }

  const cost = getBuildingCost(content, state, derived, building);
  if (!canAfford(content, state, derived, cost)) {
    statusMessage = `${building.name} needs more resources.`;
    render(true);
    return;
  }

  spendCost(content, state, cost);
  state.ownedBuildings[building.id] = Number(state.ownedBuildings[building.id] || 0) + 1;
  state.stats.lifetimeBuiltByBuildingId[building.id] =
    Number(state.stats.lifetimeBuiltByBuildingId[building.id] || 0) + 1;
  statusMessage = `${building.name} built.`;
  recalculate();
  render(true);
}

function buyPolicy(policyId) {
  const policy = getPolicyById(content, policyId);
  const policyName = getPolicyName(policy);
  if (!policy || policy.areaId !== state.areas.activeAreaId) {
    return;
  }
  if ((state.purchasedPolicies || []).includes(policy.id)) {
    return;
  }

  const blockedReason = getPolicyBlockedReason(content, state, policy);
  if (blockedReason) {
    statusMessage = blockedReason;
    render(true);
    return;
  }
  if (!arePolicyPrerequisitesMet(state, policy)) {
    statusMessage = `${policyName} needs earlier policies first.`;
    render(true);
    return;
  }
  if (!requirementsMet(content, state, derived, policy.areaId, policy.unlock || {})) {
    statusMessage = `${policyName} has not been unlocked yet.`;
    render(true);
    return;
  }
  if (!canAfford(content, state, derived, policy.cost || {})) {
    statusMessage = `${policyName} needs more resources.`;
    render(true);
    return;
  }

  spendCost(content, state, policy.cost || {});
  state.purchasedPolicies.push(policy.id);
  if (policy.exclusiveGroupId) {
    state.policyChoices[policy.exclusiveGroupId] = policy.id;
  }

  const unlockedAreaEffect = (policy.effects || []).find((effect) => effect.type === "unlockArea");
  recalculate();

  if (unlockedAreaEffect?.areaId && state.areas.unlockedAreaIds.includes(unlockedAreaEffect.areaId)) {
    state.areas.activeAreaId = unlockedAreaEffect.areaId;
    uiState.screen = "area";
    statusMessage = `${titleCase(unlockedAreaEffect.areaId.replace(/-/g, " "))} unlocked.`;
  } else {
    statusMessage = `${policyName} adopted.`;
  }

  render(true);
}

function selectArea(areaId) {
  if (!(state.areas.unlockedAreaIds || []).includes(areaId)) {
    return;
  }
  state.areas.activeAreaId = areaId;
  uiState.screen = "area";
  statusMessage = "";
  render(true);
}

function openEncyclopedia() {
  uiState.screen = "encyclopedia";
  uiState.encyclopediaArea = state.areas.activeAreaId;
  render(true);
}

function annexDistrict() {
  const areaId = state.areas.activeAreaId;
  const area = getAreaById(content, areaId);
  const gain = calculateAnnexationGain(content, state);
  if (gain <= 0) {
    return;
  }

  const previous = state;
  state = createInitialState(content);
  state.areas.unlockedAreaIds = Array.from(new Set(previous.areas.unlockedAreaIds || [content.defaultAreaId]));
  state.areas.activeAreaId = content.defaultAreaId;
  content.areas.forEach((entry) => {
    state.areas[entry.id].districts = Number(previous.areas?.[entry.id]?.districts || 0);
  });
  state.areas[areaId].districts += gain;
  state.encyclopedia = JSON.parse(JSON.stringify(previous.encyclopedia));
  state.systems.annexationUnlocked = true;
  state.systems.utilityLocks = {};
  state.stats.lifetimeBuiltByBuildingId = JSON.parse(JSON.stringify(previous.stats.lifetimeBuiltByBuildingId));
  state.stats.totalClicks = previous.stats.totalClicks;
  state.stats.totalAnnexations = Number(previous.stats.totalAnnexations || 0) + 1;
  recalculate();
  statusMessage = `Annexed ${area?.name || "area"} for ${formatNumber(gain)} districts.`;
  render(true);
}

function hardReset() {
  const confirmed = window.confirm("Reset the current save? This clears local progress for the current version.");
  if (!confirmed) {
    return;
  }

  state = createInitialState(content);
  uiState.screen = "area";
  window.localStorage.removeItem(storageKey);
  statusMessage = "Local save reset.";
  recalculate();
  render(true);
}

function getPolicyName(policy) {
  return policy?.name || titleCase(String(policy?.id || "policy").replace(/-/g, " "));
}
