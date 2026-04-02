import { CATEGORY_LABELS, SPRITE_POSITIONS } from "../core/config.js";
import { currencyUnit, formatNumber, formatPercent, labelForCurrency } from "../core/format.js";
import { canAfford, getBuildingCost } from "../systems/economy.js";
import { calculateAnnexationGain, getPrestigeCurrencyId, getVisibleCurrencyIds } from "../systems/progression.js";

export function createRenderer({ content, elements, handlers }) {
  const buildingNodes = new Map();
  const upgradeNodes = new Map();

  function ensureMarketCards() {
    if (!buildingNodes.size) {
      elements.buildingsList.innerHTML = content.buildings
        .map((building) => {
          const sprite = SPRITE_POSITIONS[building.spriteRef] || SPRITE_POSITIONS["houses-top-1"];
          return `
            <article class="market-card" data-building-card="${building.id}">
              <div class="market-card__row">
                <div class="market-card__art" style="--sprite-x: ${sprite.x}; --sprite-y: ${sprite.y};" aria-hidden="true"></div>
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
                  <div class="market-title-stack">
                    <h3>${upgrade.name}</h3>
                    <span class="market-badge market-badge--rose">Global</span>
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
  }

  function render(view) {
    ensureMarketCards();
    renderStats(view);
    renderHeaderMetrics(view);
    renderBuildings(view);
    renderUpgrades(view);
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
    elements.coinsPerClick.textContent = `+${formatNumber(derived.coinsPerClick)} Coins`;
    const ambientMessage =
      !statusMessage && derived.passivePerSecond.coins < 0
        ? "Upkeep is draining more coins than your streets collect."
        : "";
    const nextMessage = statusMessage || ambientMessage;
    elements.statusLine.textContent = nextMessage;
    elements.statusLine.hidden = !nextMessage;
  }

  function renderSidebar({ state }) {
    const visiblePolicies = content.globalUpgrades.some((upgrade) => {
      const purchased = state.purchasedUpgrades.includes(upgrade.id);
      return !purchased && state.discoveredUpgrades.includes(upgrade.id);
    });
    elements.policiesPanel.hidden = !visiblePolicies;
    elements.sidebar.hidden = !visiblePolicies && elements.annexPanel.hidden;
    elements.contentGrid.classList.toggle("content-grid--single", elements.sidebar.hidden);
  }

  function renderStats({ state, derived }) {
    elements.statsGrid.innerHTML = getVisibleCurrencyIds(content, state, derived)
      .map((currencyId) => {
        const currencyDef =
          currencyId === "districts"
            ? { name: "Districts" }
            : content.currencies[currencyId];
        const value =
          currencyId === "residents"
            ? derived.residents
            : Number(state.currencies[currencyId] || 0);

        return `
          <article class="stat-card">
            <span>${currencyDef.name}</span>
            <strong>${formatNumber(value)}</strong>
          </article>
        `;
      })
      .join("");
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

  function renderYieldPills(state, derived, building, details) {
    const pills = [];
    const visibleCurrencies = new Set(getVisibleCurrencyIds(content, state, derived));
    const residentsPerOwned = building.statsPerOwned && building.statsPerOwned.residents
      ? details.count > 0
        ? Math.round(details.residents / details.count)
        : Math.round(building.statsPerOwned.residents)
      : 0;

    if (residentsPerOwned && visibleCurrencies.has("residents")) {
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
      if (!visibleCurrencies.has(currencyId) || Math.abs(amount) < 0.0001) {
        return;
      }
      const prefix = amount > 0 ? "+" : "";
      pills.push(
        `<span class="yield-pill yield-pill--${currencyId}">${prefix}${formatNumber(amount)}/${currencyUnit(currencyId)}</span>`
      );
    });

    return pills.join("");
  }

  return { render };
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
