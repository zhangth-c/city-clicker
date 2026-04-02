import GAME_CONTENT from "./content-runtime/generated-content.js";
import { MAX_FRAME_MS, RENDER_INTERVAL_MS } from "./core/config.js";
import { buildStateSnapshot, createInitialState, normalizeState, snapshotCurrencies } from "./core/state.js";
import { formatNumber } from "./core/format.js";
import { calculateDerivedState, canAfford, getBuildingCost, spendCost } from "./systems/economy.js";
import {
  applyUpgradeSystemUnlocks,
  calculateAnnexationGain,
  discoverBuildings,
  discoverUpgrades,
  getPrestigeCurrencyId
} from "./systems/progression.js";
import { getElements } from "./ui/elements.js";
import { createRenderer } from "./ui/render.js";

const content = GAME_CONTENT;
const elements = getElements(document);
const storageKey = `${content.meta.id}-save`;
const eventLog = [];
const renderer = createRenderer({
  content,
  elements,
  handlers: {
    onBuyBuilding: buyBuilding,
    onBuyUpgrade: buyUpgrade
  }
});

let state = createInitialState(content);
let derived = null;
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
  elements.eyebrow.textContent = content.meta.eyebrow;
  elements.title.textContent = content.meta.name;
  elements.goalLine.textContent = content.meta.goalText;
  elements.collectLabel.textContent = content.startingState.clickActionName;
}

function bindEvents() {
  elements.collectButton.addEventListener("click", collectTaxes);
  elements.saveButton.addEventListener("click", () => {
    if (saveState("Progress saved locally.")) {
      pushLog("Manual save created.", "Your borough snapshot has been written to local storage.");
      render(true);
    }
  });
  elements.exportButton.addEventListener("click", exportSave);
  elements.importButton.addEventListener("click", () => {
    elements.importInput.click();
  });
  elements.importInput.addEventListener("change", importSave);
  elements.resetButton.addEventListener("click", hardReset);
  elements.annexButton.addEventListener("click", annexDistrict);
  window.addEventListener("beforeunload", () => {
    saveState();
  });
}

function loadState() {
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      pushLog("Welcome to Patchwork Borough.", "Start by collecting taxes and buying your first duplex.");
      return createInitialState(content);
    }

    const parsed = JSON.parse(raw);
    const merged = normalizeState(content, parsed);
    pushLog("Save restored.", "The borough is ready to grow again.");
    return merged;
  } catch (error) {
    console.error(error);
    pushLog("Save recovery failed.", "A fresh borough has been created.");
    statusMessage = "Save recovery failed. Starting a new borough.";
    return createInitialState(content);
  }
}

function saveState(customMessage) {
  try {
    const snapshot = buildStateSnapshot(state);
    window.localStorage.setItem(storageKey, JSON.stringify(snapshot));
    if (typeof customMessage === "string") {
      statusMessage = customMessage;
    }
    return true;
  } catch (error) {
    console.error(error);
    statusMessage = "Saving failed. Local storage may be unavailable.";
    return false;
  }
}

function buildExportPayload() {
  return {
    version: 1,
    gameId: content.meta.id,
    exportedAt: new Date().toISOString(),
    state: buildStateSnapshot(state)
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

    window.localStorage.setItem(storageKey, JSON.stringify(payload.state));
    statusMessage = "Save exported to a JSON file.";
    pushLog("Save exported.", "A portable borough save file was downloaded.");
    render(true);
  } catch (error) {
    console.error(error);
    statusMessage = "Export failed.";
    pushLog("Export failed.", "The save file could not be generated.");
    render(true);
  }
}

function importSave(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) {
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || ""));
      const nextState = normalizeState(content, parsed);
      nextState.stats.lastSavedAt = Date.now();
      state = nextState;
      eventLog.length = 0;
      pushLog("Save imported.", "The borough state was loaded from file.");
      saveState("Imported save loaded.");
      recalculate();
      render(true);
    } catch (error) {
      console.error(error);
      statusMessage = error instanceof Error ? error.message : "Import failed.";
      pushLog("Import failed.", "The selected file was not a valid Patchwork Borough save.");
      render(true);
    } finally {
      elements.importInput.value = "";
    }
  };
  reader.onerror = () => {
    statusMessage = "Import failed while reading the file.";
    pushLog("Import failed.", "The selected file could not be read.");
    elements.importInput.value = "";
    render(true);
  };
  reader.readAsText(file);
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

function simulate(seconds) {
  if (seconds <= 0) {
    return;
  }

  recalculate();
  Object.entries(derived.passivePerSecond).forEach(([currencyId, rate]) => {
    state.currencies[currencyId] = Math.max(0, (state.currencies[currencyId] || 0) + rate * seconds);
  });
  recalculate();
}

function applyOfflineProgress() {
  const elapsedSeconds = Math.max(0, (Date.now() - Number(state.stats.lastSavedAt || Date.now())) / 1000);
  const cappedSeconds = Math.min(elapsedSeconds, content.formulas.offlineProgressCapSeconds);

  if (cappedSeconds < 1) {
    return;
  }

  const chunkSeconds = cappedSeconds > 120 ? 1 : content.formulas.tickRateMs / 1000;
  let remaining = cappedSeconds;
  const before = snapshotCurrencies(state);

  while (remaining > 0) {
    const step = Math.min(chunkSeconds, remaining);
    simulate(step);
    remaining -= step;
  }

  const gains = {
    coins: state.currencies.coins - before.coins,
    materials: state.currencies.materials - before.materials,
    appeal: state.currencies.appeal - before.appeal
  };
  const offlineMinutes = Math.round(cappedSeconds / 60);
  statusMessage = `Offline progress applied for ${offlineMinutes} min.`;
  pushLog(
    "Offline progress applied.",
    `+${formatNumber(gains.coins)} Coins, +${formatNumber(gains.materials)} Materials, +${formatNumber(gains.appeal)} Appeal.`
  );
}

function recalculate() {
  derived = calculateDerivedState(content, state);
  const discoveredBuilding = discoverBuildings(content, state, derived);
  const discoveredUpgrade = discoverUpgrades(content, state, derived);
  state.currencies.residents = derived.residents;
  state.stats.peakResidents = Math.max(state.stats.peakResidents || 0, derived.residents);
  state.stats.peakAppeal = Math.max(state.stats.peakAppeal || 0, state.currencies.appeal || 0);

  if (discoveredUpgrade) {
    statusMessage = `New policy drafted: ${discoveredUpgrade.name}.`;
    pushLog("New policy drafted.", `${discoveredUpgrade.name} is now available.`);
  } else if (discoveredBuilding) {
    statusMessage = `Surveyors uncovered ${discoveredBuilding.name}.`;
    pushLog("New district surveyed.", `${discoveredBuilding.name} is now ready for construction.`);
  }
}

function collectTaxes(event) {
  recalculate();
  state.currencies.coins += derived.coinsPerClick;
  state.stats.totalClicks = Number(state.stats.totalClicks || 0) + 1;
  recalculate();
  spawnTaxBurst(event, `+${formatNumber(derived.coinsPerClick)} Coins`);
  render();
}

function spawnTaxBurst(event, label) {
  const burst = document.createElement("span");
  const rect = elements.collectButton.getBoundingClientRect();
  const burstX = event && typeof event.clientX === "number" ? event.clientX - rect.left : rect.width / 2;
  const burstY = event && typeof event.clientY === "number" ? event.clientY - rect.top : rect.height / 2;
  burst.className = "tax-burst";
  burst.textContent = label;
  burst.style.left = `${burstX}px`;
  burst.style.top = `${burstY}px`;
  elements.collectButton.appendChild(burst);
  burst.addEventListener("animationend", () => burst.remove(), { once: true });
}

function buyBuilding(buildingId) {
  const building = content.buildings.find((item) => item.id === buildingId);
  if (!building) {
    return;
  }

  if (!state.discoveredBuildings.includes(building.id)) {
    statusMessage = `${building.name} has not been surveyed yet.`;
    render();
    return;
  }

  const cost = getBuildingCost(content, state, derived, building);
  if (!canAfford(state, cost)) {
    statusMessage = `Not enough resources to build ${building.name}.`;
    render();
    return;
  }

  spendCost(state, cost);
  state.ownedBuildings[building.id] = Number(state.ownedBuildings[building.id] || 0) + 1;
  recalculate();
  pushLog("District expanded.", `Built ${building.name}.`);
  statusMessage = "";
  render(true);
}

function buyUpgrade(upgradeId) {
  const upgrade = content.globalUpgrades.find((item) => item.id === upgradeId);
  if (!upgrade || state.purchasedUpgrades.includes(upgrade.id)) {
    return;
  }

  if (!state.discoveredUpgrades.includes(upgrade.id)) {
    statusMessage = `${upgrade.name} is not available yet.`;
    render();
    return;
  }

  if (!canAfford(state, upgrade.cost || {})) {
    statusMessage = `Not enough resources to adopt ${upgrade.name}.`;
    render();
    return;
  }

  spendCost(state, upgrade.cost || {});
  state.purchasedUpgrades.push(upgrade.id);
  applyUpgradeSystemUnlocks(content, state, upgrade);
  recalculate();
  pushLog("Upgrade enacted.", `${upgrade.name} is now active city-wide.`);
  statusMessage = "";
  render(true);
}

function annexDistrict() {
  if (!state.systems.annexationUnlocked) {
    statusMessage = "Annexation unlocks after purchasing City Charter.";
    render();
    return;
  }

  const gain = calculateAnnexationGain(state);
  if (gain <= 0) {
    statusMessage = "Grow the borough further before annexing.";
    render();
    return;
  }

  const confirmed = window.confirm(
    `Annex the current borough for ${gain} Districts?\n\nThis resets buildings, upgrades, coins, materials, appeal, and residents.`
  );

  if (!confirmed) {
    return;
  }

  const prestigeCurrencyId = getPrestigeCurrencyId(content);
  const priorAnnexations = Number(state.stats.totalAnnexations || 0);
  const totalDistricts = Number(state.currencies[prestigeCurrencyId] || 0) + gain;

  state = createInitialState(content);
  state.currencies[prestigeCurrencyId] = totalDistricts;
  state.systems.annexationUnlocked = true;
  state.stats.totalAnnexations = priorAnnexations + 1;
  state.stats.lastSavedAt = Date.now();

  pushLog("Annexation completed.", `You gained ${gain} Districts for future runs.`);
  statusMessage = `Annexed successfully. ${gain} Districts secured.`;
  recalculate();
  render(true);
}

function hardReset() {
  const confirmed = window.confirm(
    "Delete the current local save and restart Patchwork Borough from the beginning?"
  );
  if (!confirmed) {
    return;
  }

  try {
    window.localStorage.removeItem(storageKey);
  } catch (error) {
    console.error(error);
  }

  state = createInitialState(content);
  eventLog.length = 0;
  pushLog("Save cleared.", "The borough has been reset to its founding day.");
  statusMessage = "Local save reset.";
  recalculate();
  render(true);
}

function pushLog(title, body) {
  eventLog.unshift({
    title,
    body,
    time: new Date().toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })
  });
  if (eventLog.length > 8) {
    eventLog.length = 8;
  }
}

function render(force) {
  if (!force && !derived) {
    return;
  }
  if (!derived) {
    recalculate();
  }
  renderer.render({
    state,
    derived,
    statusMessage
  });
  if (force) {
    lastRenderMs = performance.now();
  }
}
