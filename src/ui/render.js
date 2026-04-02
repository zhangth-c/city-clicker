import { CATEGORY_LABELS, SPRITE_POSITIONS } from "../core/config.js";
import { currencyUnit, formatNumber, formatPercent, labelForCurrency } from "../core/format.js";
import { canAfford, getBuildingCost } from "../systems/economy.js";
import {
  calculateAnnexationGain,
  getNextBuildingUnlockHint,
  getPrestigeCurrencyId,
  getVisibleCurrencyIds
} from "../systems/progression.js";

export function createRenderer({ content, elements, handlers }) {
  const statNodes = new Map();
  const manualActionNodes = new Map();
  const buildingNodes = new Map();
  const upgradeNodes = new Map();
  const activeUpgradeNodes = new Map();

  function ensureStatCards() {
    if (statNodes.size) {
      return;
    }

    const currencyIds = [...Object.keys(content.currencies), getPrestigeCurrencyId(content)];
    elements.statsGrid.innerHTML = currencyIds
      .map((currencyId) => {
        const currencyDef =
          currencyId === "districts"
            ? content.systems.annexation.prestigeCurrency
            : content.currencies[currencyId];

        return `
          <article class="stat-card" data-stat-card="${currencyId}" hidden>
            <div class="stat-card__head">
              ${renderIcon(currencyDef.iconPath, "stat-card__icon")}
              <span>${currencyDef.name}</span>
            </div>
            <strong data-stat-value="${currencyId}">0</strong>
          </article>
        `;
      })
      .join("");

    elements.statsGrid.querySelectorAll("[data-stat-card]").forEach((card) => {
      const currencyId = card.getAttribute("data-stat-card");
      statNodes.set(currencyId, {
        card,
        value: card.querySelector(`[data-stat-value="${currencyId}"]`)
      });
    });
  }

  function ensureMarketCards() {
    if (!buildingNodes.size) {
      elements.buildingsList.innerHTML = content.buildings
        .map((building) => {
          return `
            <article class="market-card" data-building-card="${building.id}">
              <div class="market-card__row">
                ${renderBuildingArt(building)}
                <div class="market-card__content">
                  <div class="market-topline">
                    <div class="market-title-stack">
                      <h3>${building.name}</h3>
                      <span class="market-badge">${CATEGORY_LABELS[building.category] || building.category}</span>
                    </div>
                    <div class="market-count" data-building-count="${building.id}"></div>
                  </div>
                  <p class="market-copy">${building.description}</p>
                  <div class="market-yields" data-building-yields="${building.id}"></div>
                  <div class="market-costs" data-building-costs="${building.id}"></div>
                  <div class="market-note" data-building-note="${building.id}"></div>
                  <button class="market-action" data-building-id="${building.id}" type="button">
                    Build
                  </button>
                </div>
              </div>
            </article>
          `;
        })
        .join("");

      elements.buildingsList.querySelectorAll("[data-building-card]").forEach((card) => {
        const buildingId = card.getAttribute("data-building-card");
        const action = card.querySelector(`[data-building-id="${buildingId}"]`);
        action.addEventListener("click", () => {
          handlers.onBuyBuilding(buildingId);
        });
        buildingNodes.set(buildingId, {
          card,
          yields: card.querySelector(`[data-building-yields="${buildingId}"]`),
          costs: card.querySelector(`[data-building-costs="${buildingId}"]`),
          count: card.querySelector(`[data-building-count="${buildingId}"]`),
          note: card.querySelector(`[data-building-note="${buildingId}"]`),
          action
        });
      });
    }

    if (!upgradeNodes.size) {
      elements.upgradesList.innerHTML = content.globalUpgrades
        .map((upgrade) => {
          return `
            <article class="market-card market-card--upgrade" data-upgrade-card="${upgrade.id}">
              <div class="market-card__content market-card__content--full">
                <div class="market-topline">
                  <div class="market-title-row">
                    ${renderIcon(upgrade.iconPath, "market-title-icon")}
                    <div class="market-title-stack">
                      <h3>${upgrade.name}</h3>
                      <span class="market-badge market-badge--rose">Global</span>
                    </div>
                  </div>
                </div>
                <p class="market-copy">${upgrade.description}</p>
                <div class="market-costs" data-upgrade-costs="${upgrade.id}"></div>
                <div class="market-note" data-upgrade-note="${upgrade.id}"></div>
                <button class="market-action market-action--upgrade" data-upgrade-id="${upgrade.id}" type="button">
                  Adopt
                </button>
              </div>
            </article>
          `;
        })
        .join("");

      elements.upgradesList.querySelectorAll("[data-upgrade-card]").forEach((card) => {
        const upgradeId = card.getAttribute("data-upgrade-card");
        const action = card.querySelector(`[data-upgrade-id="${upgradeId}"]`);
        action.addEventListener("click", () => {
          handlers.onBuyUpgrade(upgradeId);
        });
        upgradeNodes.set(upgradeId, {
          card,
          costs: card.querySelector(`[data-upgrade-costs="${upgradeId}"]`),
          note: card.querySelector(`[data-upgrade-note="${upgradeId}"]`),
          action
        });
      });
    }

    if (!activeUpgradeNodes.size) {
      elements.activePoliciesList.innerHTML = content.globalUpgrades
        .map((upgrade) => {
          return `
            <article class="active-policy" data-active-upgrade-card="${upgrade.id}" hidden>
              ${renderIcon(upgrade.iconPath, "active-policy__icon")}
              <div class="active-policy__copy">
                <strong>${upgrade.name}</strong>
                <span>Active</span>
              </div>
            </article>
          `;
        })
        .join("");

      elements.activePoliciesList.querySelectorAll("[data-active-upgrade-card]").forEach((card) => {
        const upgradeId = card.getAttribute("data-active-upgrade-card");
        activeUpgradeNodes.set(upgradeId, { card });
      });
    }
  }

  function ensureManualActionCards() {
    if (manualActionNodes.size) {
      return;
    }

    elements.manualActions.innerHTML = (content.manualActions || [])
      .map((action) => {
        const currency = content.currencies[action.currency];

        return `
          <button class="manual-action manual-action--${action.currency}" data-manual-action-card="${action.id}" type="button" hidden>
            <span class="manual-action__head">
              ${renderIcon(currency.iconPath, "manual-action__icon")}
              <span class="manual-action__label">${action.name}</span>
            </span>
            <strong class="manual-action__value" data-manual-action-value="${action.id}">+0 ${currency.name}</strong>
          </button>
        `;
      })
      .join("");

    elements.manualActions.querySelectorAll("[data-manual-action-card]").forEach((button) => {
      const actionId = button.getAttribute("data-manual-action-card");
      button.addEventListener("click", (event) => {
        handlers.onRunManualAction(actionId, event);
      });
      manualActionNodes.set(actionId, {
        button,
        value: button.querySelector(`[data-manual-action-value="${actionId}"]`)
      });
    });
  }

  function render(view) {
    ensureStatCards();
    ensureManualActionCards();
    ensureMarketCards();
    renderStats(view);
    renderHeaderMetrics(view);
    renderManualActions(view);
    renderBuildings(view);
    renderUpgrades(view);
    renderActivePolicies(view);
    renderDistrictHint(view);
    renderAnnexation(view);
    renderSidebar(view);
  }

  function renderAnnexation({ state }) {
    elements.annexPanel.hidden = !state.systems.annexationUnlocked;
    if (!state.systems.annexationUnlocked) {
      return;
    }

    const gain = calculateAnnexationGain(state);
    const prestigeCurrencyId = getPrestigeCurrencyId(content);
    const districts = Number(state.currencies[prestigeCurrencyId] || 0);

    elements.annexationSummary.innerHTML = `
      <h3>${formatNumber(districts)} Districts</h3>
      <p>${gain > 0 ? `${formatNumber(gain)} ready to claim.` : "Nothing ready to claim yet."}</p>
      <dl>
        <div>
          <dt>Current</dt>
          <dd>${formatNumber(districts)}</dd>
        </div>
        <div>
          <dt>Next gain</dt>
          <dd>${formatNumber(gain)}</dd>
        </div>
      </dl>
    `;
    elements.annexButton.className = [
      "collect-button",
      "collect-button--secondary",
      gain > 0 ? "" : "collect-button--inactive"
    ]
      .filter(Boolean)
      .join(" ");
    elements.annexButton.disabled = gain <= 0;
    elements.annexButton.setAttribute("aria-disabled", gain > 0 ? "false" : "true");
    elements.annexButton.innerHTML = "<span>Reset</span><strong>Annex</strong>";
  }

  function renderBuildings({ state, derived }) {
    content.buildings.forEach((building) => {
      const nodes = buildingNodes.get(building.id);
      if (!nodes) {
        return;
      }

      const discovered = state.discoveredBuildings.includes(building.id);
      const count = Number(state.ownedBuildings[building.id] || 0);
      const cost = getBuildingCost(content, state, derived, building);
      const details = derived.perBuilding[building.id] || {
        count,
        outputs: {},
        maintenance: {},
        residents: 0,
        synergies: []
      };
      const affordable = canAfford(state, cost);

      nodes.card.hidden = !discovered;
      if (!discovered) {
        return;
      }

      nodes.card.className = ["market-card", count > 0 ? "market-card--owned" : ""]
        .filter(Boolean)
        .join(" ");
      nodes.yields.innerHTML = renderYieldPills(state, derived, building, details);
      nodes.costs.innerHTML = renderCostPills(cost);
      nodes.count.textContent = count > 0 ? `Owned ${count}` : "";
      nodes.note.textContent = count > 0 ? formatSynergyNotes(details.synergies) : "";
      nodes.action.className = ["market-action", affordable ? "" : "market-action--inactive"]
        .filter(Boolean)
        .join(" ");
      nodes.action.disabled = !affordable;
      nodes.action.setAttribute("aria-disabled", affordable ? "false" : "true");
      nodes.action.textContent = "Build";
    });
  }

  function renderCostPills(cost) {
    return Object.entries(cost)
      .map(([currencyId, amount]) => {
        return `<span class="cost-pill cost-pill--${currencyId}">${formatNumber(amount)} ${labelForCurrency(content, currencyId)}</span>`;
      })
      .join("");
  }

  function renderHeaderMetrics({ derived, statusMessage }) {
    const shortageEntry = Object.entries(derived.passivePerSecond).find(([, rate]) => rate < -0.001);
    const ambientMessage = !statusMessage && shortageEntry
      ? `${labelForCurrency(content, shortageEntry[0])} upkeep is outpacing supply.`
      : "";
    const nextMessage = statusMessage || ambientMessage;
    elements.statusLine.textContent = nextMessage;
    elements.statusLine.hidden = !nextMessage;
  }

  function renderManualActions({ derived }) {
    (content.manualActions || []).forEach((action) => {
      const nodes = manualActionNodes.get(action.id);
      const derivedAction = derived.manualActions.find((item) => item.id === action.id);
      if (!nodes || !derivedAction) {
        return;
      }

      nodes.button.hidden = !derivedAction.unlocked;
      if (!derivedAction.unlocked) {
        return;
      }

      nodes.button.className = `manual-action manual-action--${derivedAction.currency}`;
      nodes.value.textContent = `+${formatNumber(derivedAction.amount)} ${labelForCurrency(content, derivedAction.currency)}`;
    });
  }

  function renderSidebar({ state }) {
    const activePolicies = content.globalUpgrades.some((upgrade) => {
      return state.purchasedUpgrades.includes(upgrade.id);
    });
    const visiblePolicies = content.globalUpgrades.some((upgrade) => {
      const purchased = state.purchasedUpgrades.includes(upgrade.id);
      return !purchased && state.discoveredUpgrades.includes(upgrade.id);
    });
    elements.activePoliciesPanel.hidden = !activePolicies;
    elements.policiesPanel.hidden = !visiblePolicies;
    elements.sidebar.hidden = !visiblePolicies && !activePolicies && elements.annexPanel.hidden;
    elements.contentGrid.classList.toggle("content-grid--single", elements.sidebar.hidden);
  }

  function renderStats({ state, derived }) {
    const visibleIds = new Set(getVisibleCurrencyIds(content, state, derived));

    statNodes.forEach((nodes, currencyId) => {
      const visible = visibleIds.has(currencyId);
      nodes.card.hidden = !visible;
      if (!visible) {
        return;
      }

      const value =
        currencyId === "residents"
          ? derived.residents
          : Number(state.currencies[currencyId] || 0);

      nodes.value.textContent = formatNumber(value);
    });
  }

  function renderUpgrades({ state }) {
    content.globalUpgrades.forEach((upgrade) => {
      const nodes = upgradeNodes.get(upgrade.id);
      if (!nodes) {
        return;
      }

      const purchased = state.purchasedUpgrades.includes(upgrade.id);
      const visible = state.discoveredUpgrades.includes(upgrade.id);
      const affordable = canAfford(state, upgrade.cost || {});

      nodes.card.hidden = !visible || purchased;
      if (!visible || purchased) {
        return;
      }

      nodes.card.className = ["market-card", "market-card--upgrade"].join(" ");
      nodes.costs.innerHTML = renderCostPills(upgrade.cost || {});
      nodes.note.textContent = "";
      nodes.action.className = [
        "market-action",
        "market-action--upgrade",
        affordable ? "" : "market-action--inactive"
      ]
        .filter(Boolean)
        .join(" ");
      nodes.action.disabled = !affordable;
      nodes.action.setAttribute("aria-disabled", affordable ? "false" : "true");
      nodes.action.textContent = "Adopt";
    });
  }

  function renderDistrictHint({ state, derived }) {
    const hint = getNextBuildingUnlockHint(content, state, derived);

    elements.districtHint.hidden = !hint || hint.missing.length === 0;
    if (!hint || hint.missing.length === 0) {
      return;
    }

    const summary = hint.missing
      .slice(0, 3)
      .map(({ currencyId, deficit }) => `${formatNumber(deficit)} ${labelForCurrency(content, currencyId)}`)
      .join(", ");

    elements.districtHint.textContent = `Next: ${hint.buildingName}. Missing ${summary}.`;
  }

  function renderActivePolicies({ state }) {
    content.globalUpgrades.forEach((upgrade) => {
      const nodes = activeUpgradeNodes.get(upgrade.id);
      if (!nodes) {
        return;
      }

      nodes.card.hidden = !state.purchasedUpgrades.includes(upgrade.id);
    });
  }

  function renderYieldPills(state, derived, building, details) {
    const pills = [];
    const residentsPerOwned = building.statsPerOwned && building.statsPerOwned.residents
      ? details.count > 0
        ? Math.round(details.residents / details.count)
        : Math.round(building.statsPerOwned.residents)
      : 0;

    if (residentsPerOwned) {
      pills.push(
        `<span class="yield-pill yield-pill--residents">+${formatNumber(residentsPerOwned)} Residents</span>`
      );
    }

    const netOutputs = {};
    Object.entries(details.outputs || {}).forEach(([currencyId, amount]) => {
      netOutputs[currencyId] = Number(amount || 0);
    });
    Object.entries(details.maintenance || {}).forEach(([currencyId, amount]) => {
      netOutputs[currencyId] = Number(netOutputs[currencyId] || 0) - Number(amount || 0);
    });

    Object.entries(netOutputs).forEach(([currencyId, amount]) => {
      if (Math.abs(amount) < 0.0001) {
        return;
      }
      const prefix = amount > 0 ? "+" : "";
      const signClass = amount < 0 ? " yield-pill--negative" : "";
      pills.push(
        `<span class="yield-pill yield-pill--${currencyId}${signClass}">${prefix}${formatNumber(amount)} ${labelForCurrency(content, currencyId)}/${currencyUnit(currencyId)}</span>`
      );
    });

    return pills.join("");
  }

  return { render };
}

function renderBuildingArt(building) {
  if (building.artPath) {
    return `
      <div class="market-card__file-art" aria-hidden="true">
        <img class="market-card__art-image" src="${building.artPath}" alt="" loading="lazy" />
      </div>
    `;
  }

  const sprite = SPRITE_POSITIONS[building.spriteRef] || SPRITE_POSITIONS["houses-top-1"];
  return `<div class="market-card__art" style="--sprite-x: ${sprite.x}; --sprite-y: ${sprite.y};" aria-hidden="true"></div>`;
}

function renderIcon(iconPath, className) {
  if (!iconPath) {
    return "";
  }

  return `<img class="${className}" src="${iconPath}" alt="" loading="lazy" decoding="async" />`;
}

function describeSynergyTarget(bonus) {
  if (bonus.targetType === "stat" && bonus.target === "residents") {
    return "residents";
  }
  if (bonus.targetType === "maintenance") {
    return "lower upkeep";
  }
  return bonus.target;
}

function formatSynergyNotes(synergies) {
  if (!Array.isArray(synergies) || synergies.length === 0) {
    return "";
  }

  return synergies
    .slice(0, 2)
    .map((bonus) => `${bonus.label} +${formatPercent(bonus.bonus)} ${describeSynergyTarget(bonus)}`)
    .join(" • ");
}
