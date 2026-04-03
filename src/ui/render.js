import { SPRITE_POSITIONS } from "../core/config.js";
import {
  currencyUnit,
  formatCurrencyAmount,
  formatNumber,
  formatPercent,
  labelForCurrency,
  titleCase
} from "../core/format.js";
import {
  canAfford,
  getAreaById,
  getBuildingById,
  getBuildingCost,
  getCurrencyAmount,
  getPolicyBlockedReason,
  getPolicyById
} from "../systems/economy.js";
import {
  arePolicyPrerequisitesMet,
  calculateAnnexationGain,
  getNextBuildingUnlockHint,
  getPrestigeCurrencyId,
  getVisibleLocalCurrencyIds,
  getVisibleSharedCurrencyIds,
  requirementsMet
} from "../systems/progression.js";

export function createRenderer({ content, elements, handlers }) {
  const sharedStatNodes = new Map();
  const viewTabNodes = new Map();
  let currentAreaId = null;
  let localStatNodes = new Map();
  let manualActionNodes = new Map();
  let buildingNodes = new Map();
  let policyNodes = new Map();
  let policyTierNodes = new Map();
  let policyTreeNodes = new Map();
  let activePoliciesSignature = "";
  let codexFiltersSignature = "";
  let codexEntriesSignature = "";

  function ensureViewTabs() {
    if (viewTabNodes.size) {
      return;
    }

    elements.viewTabs.innerHTML = [
      ...content.areas.map((area) => {
        return `<button class="view-tab" data-view-tab="${area.id}" type="button">${area.name}</button>`;
      }),
      `<button class="view-tab" data-view-tab="encyclopedia" type="button">Encyclopedia</button>`
    ].join("");

    elements.viewTabs.querySelectorAll("[data-view-tab]").forEach((button) => {
      const tabId = button.getAttribute("data-view-tab");
      if (tabId === "encyclopedia") {
        button.addEventListener("click", () => handlers.onOpenEncyclopedia());
      } else {
        button.addEventListener("click", () => handlers.onSelectArea(tabId));
      }
      viewTabNodes.set(tabId, button);
    });
  }

  function ensureAreaView(areaId) {
    if (currentAreaId === areaId) {
      return;
    }

    const area = getAreaById(content, areaId);
    currentAreaId = areaId;
    buildLocalStats(area);
    buildManualActions(area);
    buildBuildingCards(area);
    buildPolicyTrees(area);
  }

  function buildLocalStats(area) {
    sharedStatNodes.clear();
    localStatNodes = new Map();
    elements.localStats.innerHTML = [
      ...Object.keys(content.sharedCurrencies).map((currencyId) => {
        return `
          <article class="stat-card" data-shared-stat-card="${currencyId}" hidden>
            <div class="stat-card__head">
              ${renderIcon(content.sharedCurrencies[currencyId].iconPath, "stat-card__icon")}
              <span>${content.sharedCurrencies[currencyId].name}</span>
            </div>
            <strong data-shared-stat-value="${currencyId}">0</strong>
            <small class="stat-card__trend" data-shared-stat-trend="${currencyId}">Stable</small>
          </article>
        `;
      }),
      ...Object.keys(area.localCurrencies).map((currencyId) => {
        return `
          <article class="stat-card" data-local-stat-card="${currencyId}" hidden>
            <div class="stat-card__head">
              ${renderIcon(area.localCurrencies[currencyId].iconPath, "stat-card__icon")}
              <span>${area.localCurrencies[currencyId].name}</span>
            </div>
            <strong data-local-stat-value="${currencyId}">0</strong>
            <small class="stat-card__trend" data-local-stat-trend="${currencyId}">Stable</small>
          </article>
        `;
      })
    ].join("");

    elements.localStats.querySelectorAll("[data-shared-stat-card]").forEach((card) => {
      const currencyId = card.getAttribute("data-shared-stat-card");
      sharedStatNodes.set(currencyId, {
        card,
        currencyId,
        value: card.querySelector(`[data-shared-stat-value="${currencyId}"]`),
        trend: card.querySelector(`[data-shared-stat-trend="${currencyId}"]`)
      });
    });

    elements.localStats.querySelectorAll("[data-local-stat-card]").forEach((card) => {
      const currencyId = card.getAttribute("data-local-stat-card");
      localStatNodes.set(currencyId, {
        card,
        currencyId,
        value: card.querySelector(`[data-local-stat-value="${currencyId}"]`),
        trend: card.querySelector(`[data-local-stat-trend="${currencyId}"]`)
      });
    });
  }

  function buildManualActions(area) {
    manualActionNodes = new Map();
    elements.manualActions.innerHTML = (area.manualActions || [])
      .map((action) => {
        const currency = content.indexes.currencyIndex[action.currency];
        const currencyLabel = currency?.name || labelForCurrency(content, action.currency);
        return `
          <button class="manual-action manual-action--${action.currency}" data-manual-action-card="${action.id}" type="button">
            <span class="manual-action__head">
              ${renderIcon(currency?.iconPath, "manual-action__icon", currencyLabel.charAt(0))}
              <span class="manual-action__label">${action.name}</span>
            </span>
            <strong class="manual-action__value" data-manual-action-value="${action.id}">
              <span class="manual-action__amount" data-manual-action-amount="${action.id}">+0</span>
              <span class="manual-action__currency" data-manual-action-currency="${action.id}">${currencyLabel}</span>
            </strong>
          </button>
        `;
      })
      .join("");

    elements.manualActions.querySelectorAll("[data-manual-action-card]").forEach((button) => {
      const actionId = button.getAttribute("data-manual-action-card");
      button.addEventListener("click", () => {
        const result = handlers.onRunManualAction(actionId);
        if (result?.granted) {
          emitBurst(button, result.label, result.currencyId);
        }
      });
      manualActionNodes.set(actionId, {
        button,
        value: button.querySelector(`[data-manual-action-value="${actionId}"]`),
        amount: button.querySelector(`[data-manual-action-amount="${actionId}"]`),
        currency: button.querySelector(`[data-manual-action-currency="${actionId}"]`)
      });
    });
  }

  function buildBuildingCards(area) {
    buildingNodes = new Map();
    elements.buildingsList.innerHTML = area.buildings
      .map((building) => {
        return `
          <article class="market-card" data-building-card="${building.id}">
            <div class="market-card__row">
              ${renderBuildingArt(building)}
              <div class="market-card__content">
                <div class="market-topline">
                  <div class="market-title-stack">
                    <h3>${building.name}</h3>
                    <span class="market-badge">${titleCase(building.category)}</span>
                  </div>
                  <div class="market-count" data-building-count="${building.id}"></div>
                </div>
                <p class="market-copy">${building.description}</p>
                <div class="market-yields" data-building-yields="${building.id}"></div>
                <div class="market-costs" data-building-costs="${building.id}"></div>
                <div class="market-note" data-building-note="${building.id}"></div>
                <button class="market-action" data-building-action="${building.id}" type="button">Build</button>
              </div>
            </div>
          </article>
        `;
      })
      .join("");

    elements.buildingsList.querySelectorAll("[data-building-card]").forEach((card) => {
      const buildingId = card.getAttribute("data-building-card");
      const action = card.querySelector(`[data-building-action="${buildingId}"]`);
      action.addEventListener("click", () => handlers.onBuyBuilding(buildingId));
      buildingNodes.set(buildingId, {
        card,
        count: card.querySelector(`[data-building-count="${buildingId}"]`),
        yields: card.querySelector(`[data-building-yields="${buildingId}"]`),
        costs: card.querySelector(`[data-building-costs="${buildingId}"]`),
        note: card.querySelector(`[data-building-note="${buildingId}"]`),
        action
      });
    });
  }

  function buildPolicyTrees(area) {
    policyNodes = new Map();
    policyTierNodes = new Map();
    policyTreeNodes = new Map();
    elements.policyTrees.innerHTML = (area.policyTrees || [])
      .map((tree) => {
        return `
          <section class="policy-tree" data-policy-tree="${tree.id}">
            <header class="policy-tree__head">
              <h3>${tree.name}</h3>
            </header>
            <div class="policy-tree__tiers">
              ${tree.tiers
                .map((tier) => {
                  const tierKey = `${tree.id}:${tier.tier}`;
                  return `
                    <section class="policy-tier" data-policy-tier="${tierKey}">
                      <div class="policy-tier__label">Tier ${tier.tier}</div>
                      <div class="policy-tier__grid">
                        ${tier.policyIds
                          .map((policyId) => {
                            const policy = getPolicyById(content, policyId);
                            const policyName = getPolicyName(policy);
                            return `
                              <article class="policy-card tooltip-anchor" data-policy-card="${policy.id}">
                                <div class="policy-card__head">
                                  <div class="policy-card__headline">
                                    ${renderIcon(getPolicyIconPath(policy), "market-title-icon", policyName.charAt(0))}
                                    <h4>${policyName}</h4>
                                  </div>
                                  <span class="policy-card__status" data-policy-status="${policy.id}"></span>
                                </div>
                                <div class="market-costs" data-policy-costs="${policy.id}"></div>
                                <button class="market-action market-action--upgrade" data-policy-action="${policy.id}" type="button">
                                  Adopt
                                </button>
                              </article>
                            `;
                          })
                          .join("")}
                      </div>
                    </section>
                  `;
                })
                .join("")}
            </div>
          </section>
        `;
      })
      .join("");

    elements.policyTrees.querySelectorAll("[data-policy-card]").forEach((card) => {
      const policyId = card.getAttribute("data-policy-card");
      const action = card.querySelector(`[data-policy-action="${policyId}"]`);
      action.addEventListener("click", () => handlers.onBuyPolicy(policyId));
      policyNodes.set(policyId, {
        card,
        status: card.querySelector(`[data-policy-status="${policyId}"]`),
        costs: card.querySelector(`[data-policy-costs="${policyId}"]`),
        action
      });
    });

    (area.policyTrees || []).forEach((tree) => {
      const treeSection = elements.policyTrees.querySelector(`[data-policy-tree="${tree.id}"]`);
      if (treeSection) {
        policyTreeNodes.set(tree.id, {
          section: treeSection,
          tierKeys: tree.tiers.map((tier) => `${tree.id}:${tier.tier}`)
        });
      }

      tree.tiers.forEach((tier) => {
        const tierKey = `${tree.id}:${tier.tier}`;
        const tierSection = elements.policyTrees.querySelector(`[data-policy-tier="${tierKey}"]`);
        if (tierSection) {
          policyTierNodes.set(tierKey, {
            section: tierSection,
            policyIds: tier.policyIds.slice()
          });
        }
      });
    });
  }

  function render(view) {
    ensureViewTabs();
    renderTabs(view);
    renderScreenVisibility(view);

    if (view.screen === "encyclopedia") {
      renderCodex(view);
      return;
    }

    ensureAreaView(view.activeAreaId);
    renderAreaHeader(view);
    renderSharedStats(view);
    renderLocalStats(view);
    renderManualActions(view);
    renderBuildings(view);
    renderPolicies(view);
    renderActivePolicies(view);
    renderDistrictHint(view);
    renderAnnexation(view);
    renderStatus(view);
  }

  function renderTabs({ state, screen, activeAreaId }) {
    const unlocked = new Set(state.areas.unlockedAreaIds || []);
    viewTabNodes.forEach((button, tabId) => {
      if (tabId !== "encyclopedia") {
        button.hidden = !unlocked.has(tabId);
      }
      button.className = [
        "view-tab",
        screen === "encyclopedia"
          ? tabId === "encyclopedia"
            ? "view-tab--active"
            : ""
          : tabId === activeAreaId
            ? "view-tab--active"
            : ""
      ]
        .filter(Boolean)
        .join(" ");
    });
  }

  function renderScreenVisibility({ screen }) {
    const encyclopedia = screen === "encyclopedia";
    elements.areaPanel.hidden = encyclopedia;
    elements.playGrid.hidden = encyclopedia;
    elements.encyclopediaPanel.hidden = !encyclopedia;
  }

  function renderSharedStats({ state, derived }) {
    const visibleIds = getVisibleSharedCurrencyIds(content, state);
    const visibleSet = new Set(visibleIds);

    sharedStatNodes.forEach((nodes, currencyId) => {
      nodes.card.hidden = !visibleSet.has(currencyId);
      if (!visibleSet.has(currencyId)) {
        return;
      }
      nodes.value.textContent = formatCurrencyAmount(content, currencyId, Number(state.sharedCurrencies[currencyId] || 0));
      applyStatTrend(content, nodes, Number(derived.passivePerSecond?.[currencyId] || 0));
    });
  }

  function renderAreaHeader({ activeAreaId }) {
    const area = getAreaById(content, activeAreaId);
    elements.areaTitle.textContent = area.name;
    elements.areaGoal.textContent = area.goalText;
  }

  function renderLocalStats({ state, derived, activeAreaId }) {
    const visibleIds = new Set(getVisibleLocalCurrencyIds(content, state, derived, activeAreaId));
    localStatNodes.forEach((nodes, currencyId) => {
      nodes.card.hidden = !visibleIds.has(currencyId);
      if (!visibleIds.has(currencyId)) {
        return;
      }
      nodes.value.textContent = formatCurrencyAmount(content, currencyId, getCurrencyAmount(content, state, derived, currencyId));
      applyStatTrend(content, nodes, Number(derived.passivePerSecond?.[currencyId] || 0));
    });
  }

  function renderManualActions({ state, derived, activeAreaId }) {
    const actions = derived.manualActionsByArea[activeAreaId] || [];
    const focusedCurrencies = getFocusedCurrencies(content, state, derived, activeAreaId);
    const actionById = new Map(actions.map((action) => [action.id, action]));

    manualActionNodes.forEach((nodes, actionId) => {
      const action = actionById.get(actionId);
      if (!action) {
        nodes.button.hidden = true;
        return;
      }
      nodes.button.hidden = !action.unlocked;
      if (!action.unlocked) {
        return;
      }
      nodes.button.className = [
        "manual-action",
        `manual-action--${action.currency}`,
        focusedCurrencies.has(action.currency) ? "manual-action--focus" : ""
      ]
        .filter(Boolean)
        .join(" ");
      nodes.amount.textContent = `+${formatCurrencyAmount(content, action.currency, action.amount, { rate: true })}`;
      nodes.currency.textContent = labelForCurrency(content, action.currency);
      nodes.value.setAttribute(
        "aria-label",
        `+${formatCurrencyAmount(content, action.currency, action.amount, { rate: true })} ${labelForCurrency(content, action.currency)}`
      );
    });
  }

  function renderBuildings({ state, derived, activeAreaId }) {
    const area = getAreaById(content, activeAreaId);
    const seen = new Set(state.encyclopedia.seenBuildingIds || []);

    area.buildings.forEach((building) => {
      const nodes = buildingNodes.get(building.id);
      const cost = getBuildingCost(content, state, derived, building);
      const details = derived.perBuilding[building.id] || {
        count: 0,
        outputs: {},
        maintenance: {},
        population: 0,
        synergies: []
      };
      const affordable = canAfford(content, state, derived, cost);
      const visible = seen.has(building.id);

      nodes.card.hidden = !visible;
      if (!visible) {
        return;
      }

      nodes.card.className = [
        "market-card",
        details.count > 0 ? "market-card--owned" : "",
        affordable ? "market-card--affordable" : "",
        details.operatingMultiplier < 0.999 ? "market-card--strained" : ""
      ]
        .filter(Boolean)
        .join(" ");
      nodes.count.textContent = details.count > 0 ? `Owned ${details.count}` : "";
      nodes.yields.innerHTML = renderBuildingYieldPills(content, building, details);
      nodes.costs.innerHTML = renderCostPills(content, cost);
      nodes.note.textContent = formatBuildingNotes(details);
      nodes.action.className = ["market-action", affordable ? "" : "market-action--inactive"]
        .filter(Boolean)
        .join(" ");
      nodes.action.disabled = !affordable;
      nodes.action.setAttribute("aria-disabled", affordable ? "false" : "true");
    });
  }

  function renderPolicies({ state, derived, activeAreaId }) {
    const area = getAreaById(content, activeAreaId);
    const seenPolicies = new Set(state.encyclopedia?.seenPolicyIds || []);

    area.policies.forEach((policy) => {
      const nodes = policyNodes.get(policy.id);
      const purchased = (state.purchasedPolicies || []).includes(policy.id);
      const blockedReason = getPolicyBlockedReason(content, state, policy);
      const prerequisitesMet = arePolicyPrerequisitesMet(state, policy);
      const unlocked = requirementsMet(content, state, derived, activeAreaId, policy.unlock || {});
      const affordable = canAfford(content, state, derived, policy.cost || {});
      const visible = !purchased && !blockedReason && seenPolicies.has(policy.id);
      let status = "Locked";
      let actionText = "Locked";
      let disabled = true;

      nodes.card.hidden = !visible;
      if (!visible) {
        return;
      }

      nodes.costs.innerHTML = renderCostPills(content, policy.cost || {});
      nodes.card.dataset.tooltip = buildPolicyTooltip(content, policy);

      if (purchased) {
        status = "Active";
        actionText = "Active";
      } else if (blockedReason) {
        status = blockedReason;
        actionText = "Blocked";
      } else if (!prerequisitesMet) {
        status = "Need previous policy";
        actionText = "Locked";
      } else if (!unlocked) {
        status = describeUnlockShortfall(content, state, derived, policy);
        actionText = "Locked";
      } else if (!affordable) {
        status = "Need resources";
        actionText = "Need resources";
        disabled = true;
      } else {
        status = "Ready";
        actionText = "Adopt";
        disabled = false;
      }

      if (purchased || blockedReason || !prerequisitesMet || !unlocked) {
        disabled = true;
      }

      nodes.card.className = [
        "policy-card",
        purchased ? "policy-card--active" : "",
        blockedReason ? "policy-card--blocked" : "",
        !purchased && unlocked && affordable && !blockedReason && prerequisitesMet ? "policy-card--ready" : ""
      ]
        .filter(Boolean)
        .join(" ");
      nodes.status.textContent = status;
      nodes.action.textContent = actionText;
      nodes.action.className = [
        "market-action",
        "market-action--upgrade",
        disabled ? "market-action--inactive" : ""
      ]
        .filter(Boolean)
        .join(" ");
      nodes.action.disabled = disabled;
    });

    policyTierNodes.forEach(({ section, policyIds }) => {
      section.hidden = policyIds.every((policyId) => policyNodes.get(policyId)?.card.hidden);
    });
    policyTreeNodes.forEach(({ section, tierKeys }) => {
      section.hidden = tierKeys.every((tierKey) => policyTierNodes.get(tierKey)?.section.hidden);
    });
  }

  function renderActivePolicies({ state, activeAreaId }) {
    const policies = content.policies.filter((policy) => {
      return policy.areaId === activeAreaId && (state.purchasedPolicies || []).includes(policy.id);
    });
    const signature = `${activeAreaId}:${policies.map((policy) => policy.id).join("|")}`;

    elements.activePoliciesPanel.hidden = policies.length === 0;
    if (signature === activePoliciesSignature) {
      return;
    }

    activePoliciesSignature = signature;
    elements.activePoliciesList.innerHTML = policies
      .map((policy) => {
        const policyName = getPolicyName(policy);
        return `
          <article class="active-policy tooltip-anchor" data-tooltip="${escapeAttribute(buildPolicyTooltip(content, policy))}" tabindex="0">
            ${renderIcon(getPolicyIconPath(policy), "active-policy__icon", policy.treeId?.[0]?.toUpperCase() || "P")}
            <div class="active-policy__copy">
              <strong>${policyName}</strong>
              <span>${titleCase(policy.treeId.replace(/-/g, " "))}</span>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function renderDistrictHint({ state, derived, activeAreaId }) {
    const hint = getNextBuildingUnlockHint(content, state, derived, activeAreaId);
    elements.districtHint.hidden = !hint || hint.missing.length === 0;
    if (!hint || hint.missing.length === 0) {
      return;
    }
    elements.districtHint.textContent = `Next: ${hint.buildingName}. Missing ${hint.missing
      .slice(0, 3)
      .map((entry) => `${formatCurrencyAmount(content, entry.currencyId, entry.deficit, { ceil: true })} ${labelForCurrency(content, entry.currencyId)}`)
      .join(", ")}.`;
  }

  function renderAnnexation({ state }) {
    elements.annexPanel.hidden = !state.systems.annexationUnlocked;
    if (!state.systems.annexationUnlocked) {
      return;
    }

    const activeAreaId = state.areas.activeAreaId;
    const activeArea = getAreaById(content, activeAreaId);
    const gain = calculateAnnexationGain(content, state);
    const prestigeCurrencyId = getPrestigeCurrencyId(content);
    const totalDistricts = Number(state.sharedCurrencies[prestigeCurrencyId] || 0);
    const areaDistricts = Number(state.areas?.[activeAreaId]?.districts || 0);

    elements.annexationSummary.innerHTML = `
      <h3>${activeArea?.name || "Area"}: ${formatNumber(areaDistricts)} Districts</h3>
      <p>${gain > 0 ? `${formatNumber(gain)} ready to claim from this area.` : "No district claim is ready in this area yet."}</p>
      <dl>
        <div><dt>This area</dt><dd>${formatNumber(areaDistricts)}</dd></div>
        <div><dt>Next gain</dt><dd>${formatNumber(gain)}</dd></div>
        <div><dt>Total</dt><dd>${formatNumber(totalDistricts)}</dd></div>
      </dl>
    `;
    elements.annexButton.disabled = gain <= 0;
    elements.annexButton.className = [
      "collect-button",
      "collect-button--secondary",
      gain > 0 ? "" : "collect-button--inactive"
    ]
      .filter(Boolean)
      .join(" ");
  }

  function renderStatus({ statusMessage }) {
    elements.statusLine.hidden = !statusMessage;
    if (!statusMessage) {
      return;
    }
    elements.statusLine.textContent = statusMessage;
  }

  function renderCodex(view) {
    const filters = view.uiState;
    const entries = getFilteredCodexEntries(view);
    const knownCount = entries.filter((entry) => entry.progress !== "unknown").length;
    const filtersSignature = [
      filters.encyclopediaKind,
      filters.encyclopediaArea,
      filters.encyclopediaFamily,
      filters.encyclopediaCategory,
      filters.encyclopediaProgress
    ].join("|");
    if (filtersSignature !== codexFiltersSignature) {
      renderCodexFilters(filters);
      codexFiltersSignature = filtersSignature;
    }

    const summary = `${knownCount} of ${entries.length} entries revealed for the current filters.`;
    if (elements.codexSummary.textContent !== summary) {
      elements.codexSummary.textContent = summary;
    }

    const entriesSignature = entries
      .map((entry) => `${entry.kind}:${entry.item.id}:${entry.progress}`)
      .join("|");
    if (entriesSignature === codexEntriesSignature) {
      return;
    }

    codexEntriesSignature = entriesSignature;
    elements.codexList.innerHTML = entries
      .map((entry) => {
        return renderCodexEntry(content, entry, view);
      })
      .join("");
  }

  function renderCodexFilters(filters) {
    const kind = filters.encyclopediaKind;
    const areaValue = filters.encyclopediaArea;
    const items =
      kind === "buildings"
        ? content.buildings.filter((building) => areaValue === "all" || building.areaId === areaValue)
        : content.policies.filter((policy) => areaValue === "all" || policy.areaId === areaValue);

    setSelectOptions(
      elements.codexAreaFilter,
      [{ value: "all", label: "All Areas" }, ...content.areas.map((area) => ({ value: area.id, label: area.name }))],
      areaValue
    );
    setSelectOptions(
      elements.codexFamilyFilter,
      [
        { value: "all", label: "All" },
        ...Array.from(new Set(items.map((item) => (kind === "buildings" ? item.codex.family : item.treeId)))).map((value) => ({
          value,
          label: titleCase(value.replace(/-/g, " "))
        }))
      ],
      filters.encyclopediaFamily
    );
    setSelectOptions(
      elements.codexCategoryFilter,
      [
        { value: "all", label: "All" },
        ...Array.from(new Set(items.map((item) => item.category))).map((value) => ({
          value,
          label: titleCase(value.replace(/-/g, " "))
        }))
      ],
      filters.encyclopediaCategory
    );
    setSelectOptions(
      elements.codexProgressFilter,
      kind === "buildings"
        ? [
            { value: "all", label: "All" },
            { value: "unknown", label: "Unknown" },
            { value: "seen", label: "Seen" },
            { value: "built", label: "Built" },
            { value: "mastered", label: "Mastered" }
          ]
        : [
            { value: "all", label: "All" },
            { value: "unknown", label: "Unknown" },
            { value: "seen", label: "Seen" },
            { value: "purchased", label: "Purchased" },
            { value: "blocked", label: "Blocked" }
          ],
      filters.encyclopediaProgress
    );
  }

  function getFilteredCodexEntries(view) {
    const { state, uiState } = view;
    const kind = uiState.encyclopediaKind;
    const allItems = kind === "buildings" ? content.buildings : content.policies;
    const entries = allItems
      .map((item) => {
        const progress = getCodexProgress(item, kind, state);
        return {
          kind,
          item,
          progress
        };
      })
      .filter((entry) => {
        if (uiState.encyclopediaArea !== "all" && entry.item.areaId !== uiState.encyclopediaArea) {
          return false;
        }
        if (
          uiState.encyclopediaFamily !== "all" &&
          (kind === "buildings" ? entry.item.codex.family : entry.item.treeId) !== uiState.encyclopediaFamily
        ) {
          return false;
        }
        if (uiState.encyclopediaCategory !== "all" && entry.item.category !== uiState.encyclopediaCategory) {
          return false;
        }
        if (uiState.encyclopediaProgress !== "all" && entry.progress !== uiState.encyclopediaProgress) {
          return false;
        }
        return true;
      })
      .sort((left, right) => Number(left.item.codex.sortKey || 0) - Number(right.item.codex.sortKey || 0));

    return entries;
  }

  function getCodexProgress(item, kind, state) {
    if (kind === "buildings") {
      const seen = (state.encyclopedia.seenBuildingIds || []).includes(item.id);
      const built =
        Number(state.ownedBuildings?.[item.id] || 0) > 0 ||
        Number(state.stats?.lifetimeBuiltByBuildingId?.[item.id] || 0) > 0;
      const mastered = (state.encyclopedia.masteredBuildingIds || []).includes(item.id);
      if (mastered) {
        return "mastered";
      }
      if (built) {
        return "built";
      }
      if (seen) {
        return "seen";
      }
      return "unknown";
    }

    const purchased = (state.purchasedPolicies || []).includes(item.id);
    const blocked = Boolean(getPolicyBlockedReason(content, state, item));
    const seen = (state.encyclopedia.seenPolicyIds || []).includes(item.id);
    if (purchased) {
      return "purchased";
    }
    if (blocked) {
      return "blocked";
    }
    if (seen) {
      return "seen";
    }
    return "unknown";
  }

  return { render };
}

function renderIcon(iconPath, className, fallbackText = "") {
  if (!iconPath) {
    return `<span class="${className} ${className}--placeholder" aria-hidden="true">${fallbackText}</span>`;
  }
  return `<img class="${className}" src="${iconPath}" alt="" loading="lazy" decoding="async" />`;
}

function applyStatTrend(content, nodes, rate) {
  if (!nodes?.trend) {
    return;
  }

  const magnitude = Math.abs(Number(rate || 0));
  let text = "→ Stable";
  let className = "stat-card__trend stat-card__trend--steady";

  if (magnitude >= 0.001) {
    if (rate > 0) {
      text = `↑ +${formatCurrencyAmount(content, nodes.currencyId, rate, { rate: true })}/${currencyUnit()}`;
      className = "stat-card__trend stat-card__trend--up";
    } else {
      text = `↓ ${formatCurrencyAmount(content, nodes.currencyId, rate, { rate: true })}/${currencyUnit()}`;
      className = "stat-card__trend stat-card__trend--down";
    }
  }

  nodes.trend.textContent = text;
  nodes.trend.className = className;
}

function getPolicyIconPath(policy) {
  if (policy?.iconPath) {
    return policy.iconPath;
  }

  if (policy?.id) {
    return `./public/art/icon-kits/policies-v2/${policy.id}.png`;
  }

  const treeIconMap = {
    civic: "./public/art/icon-kits/patchwork-borough/policies/census-office.png",
    industry: "./public/art/icon-kits/patchwork-borough/policies/builders-guild.png",
    trade: "./public/art/icon-kits/patchwork-borough/policies/stone-roads.png",
    "harbor-operations": "./public/art/icon-kits/patchwork-borough/policies/industrial-logistics.png",
    "maritime-society": "./public/art/icon-kits/patchwork-borough/policies/tourism-board.png"
  };

  return treeIconMap[policy?.treeId] || "";
}

function escapeAttribute(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "&#10;");
}

function renderBuildingArt(building) {
  if (building.artPath) {
    return `
      <div class="market-card__file-art" aria-hidden="true">
        <img class="market-card__art-image" src="${building.artPath}" alt="" loading="lazy" decoding="async" />
      </div>
    `;
  }

  const sprite = SPRITE_POSITIONS[building.spriteRef] || SPRITE_POSITIONS["houses-top-1"];
  const backgroundImage = building.spriteSheetPath
    ? `background-image: url('${building.spriteSheetPath}');`
    : "background-image: url('./public/art/houses.jpg');";
  return `
    <div
      class="market-card__art"
      style="${backgroundImage} --sprite-x: ${sprite.x}; --sprite-y: ${sprite.y};"
      aria-hidden="true"
    ></div>
  `;
}

function renderCostPills(content, cost) {
  return Object.entries(cost || {})
    .map(([currencyId, amount]) => {
      return `<span class="cost-pill cost-pill--${currencyId}">${formatCurrencyAmount(content, currencyId, amount)} ${labelForCurrency(
        content,
        currencyId
      )}</span>`;
    })
    .join("");
}

function renderBuildingYieldPills(content, building, details) {
  const pills = [];
  const populationPerOwned =
    details.count > 0 && details.population > 0 ? Math.round(details.population / details.count) : 0;

  if (populationPerOwned > 0) {
    const populationLabel = building.areaId === "port-city" ? "Crew" : "Residents";
    pills.push(`<span class="yield-pill yield-pill--${building.areaId === "port-city" ? "crew" : "residents"}">+${formatNumber(populationPerOwned)} ${populationLabel}</span>`);
  }

  const net = {};
  Object.entries(details.outputs || {}).forEach(([currencyId, amount]) => {
    net[currencyId] = Number(amount || 0);
  });
  Object.entries(details.maintenance || {}).forEach(([currencyId, amount]) => {
    net[currencyId] = Number(net[currencyId] || 0) - Number(amount || 0);
  });

  Object.entries(net).forEach(([currencyId, amount]) => {
    if (Math.abs(amount) < 0.0001) {
      return;
    }
    pills.push(
      `<span class="yield-pill yield-pill--${currencyId}${amount < 0 ? " yield-pill--negative" : ""}">${
        amount > 0 ? "+" : ""
      }${formatCurrencyAmount(content, currencyId, amount, { rate: true })} ${labelForCurrency(content, currencyId)}/${currencyUnit(currencyId)}</span>`
    );
  });

  return pills.join("");
}

function formatSynergyNotes(synergies) {
  if (!synergies?.length) {
    return "";
  }
  return synergies
    .slice(0, 2)
    .map((bonus) => `${bonus.label} +${formatPercent(bonus.bonus)} ${bonus.target.replace(/_/g, " ")}`)
    .join(" • ");
}

function formatBuildingNotes(details) {
  const notes = [];

  if (details.operatingMultiplier < 0.999 && details.shortages?.length) {
    const shortageNote = details.shortages
      .slice(0, 2)
      .map((shortage) => {
        if (details.operatingMultiplier <= 0.001) {
          return `${shortage.label}: offline`;
        }
        return `${shortage.label}: ${Math.round(details.operatingMultiplier * 100)}% output`;
      })
      .join(" • ");
    if (shortageNote) {
      notes.push(shortageNote);
    }
  }

  const synergyNote = formatSynergyNotes(details.synergies);
  if (synergyNote) {
    notes.push(synergyNote);
  }

  return notes.join(" • ");
}

function describeUnlockShortfall(content, state, derived, policy) {
  const missing = Object.entries(policy.unlock || {})
    .map(([currencyId, amount]) => ({
      currencyId,
      deficit: Math.max(0, Number(amount) - getCurrencyAmount(content, state, derived, currencyId))
    }))
    .filter((entry) => entry.deficit > 0)
    .slice(0, 2);

  if (!missing.length) {
    return "Locked";
  }

  return `Missing ${missing
    .map((entry) => `${formatCurrencyAmount(content, entry.currencyId, entry.deficit, { ceil: true })} ${labelForCurrency(content, entry.currencyId)}`)
    .join(", ")}`;
}

function describePolicyEffects(content, policy) {
  return getPolicyEffectLines(content, policy).slice(0, 3).join(" • ");
}

function buildPolicyTooltip(content, policy) {
  return [getPolicyName(policy), policy.description, describePolicyEffects(content, policy)].filter(Boolean).join("\n");
}

function getPolicyEffectLines(content, policy) {
  return (policy.effects || []).map((effect) => {
    if (effect.type === "incomeMultiplier") {
      return `+${formatPercent(Number(effect.multiplier || 1) - 1)} ${(effect.currencies || [])
        .map((currencyId) => labelForCurrency(content, currencyId))
        .join(", ")} income`;
    }
    if (effect.type === "maintenanceMultiplier") {
      return `${formatPercent(1 - Number(effect.multiplier || 1))} lower ${labelForCurrency(content, effect.currency)} upkeep`;
    }
    if (effect.type === "buildingCostMultiplier") {
      return `${formatPercent(1 - Number(effect.multiplier || 1))} lower ${labelForCurrency(content, effect.currency)} build cost`;
    }
    if (effect.type === "statMultiplier") {
      return `+${formatPercent(Number(effect.multiplier || 1) - 1)} ${labelForCurrency(content, effect.stat)}`;
    }
    if (effect.type === "clickBonus") {
      return `+${formatCurrencyAmount(content, effect.currency, effect.amount, { rate: true })} ${labelForCurrency(
        content,
        effect.currency
      )} per click`;
    }
    if (effect.type === "unlockSystem") {
      return `Unlocks ${titleCase(effect.systemId)}`;
    }
    if (effect.type === "unlockArea") {
      return `Unlocks ${titleCase(effect.areaId.replace(/-/g, " "))}`;
    }
    return titleCase(effect.type);
  });
}

function setSelectOptions(select, options, selectedValue) {
  const normalized = options.filter((option, index, array) => {
    return array.findIndex((candidate) => candidate.value === option.value) === index;
  });
  select.innerHTML = normalized
    .map((option) => `<option value="${option.value}">${option.label}</option>`)
    .join("");
  if (normalized.some((option) => option.value === selectedValue)) {
    select.value = selectedValue;
  }
}

function renderCodexEntry(content, entry, view) {
  const { item, progress, kind } = entry;
  const known = progress !== "unknown";
  const title = known ? (kind === "buildings" ? item.name : getPolicyName(item)) : kind === "buildings" ? "Unknown Building" : "Unknown Policy";
  const areaName = getAreaById(content, item.areaId)?.name || titleCase(item.areaId);
  const summary = known ? item.codex.summary : "Undiscovered entry.";
  const lore = known ? item.codex.lore : "Keep expanding the area to reveal more.";
  const extra =
    kind === "buildings"
      ? `Tier ${item.codex.tier} • ${titleCase(item.category)} • ${titleCase(item.codex.family)}`
      : `Tier ${item.tier} • ${titleCase(item.treeId.replace(/-/g, " "))}`;
  const details = known
    ? kind === "buildings"
      ? renderBuildingCodexDetails(content, item)
      : renderPolicyCodexDetails(content, item)
    : "";

  return `
    <article class="codex-card codex-card--${progress}">
      <div class="codex-card__art">
        ${
          kind === "buildings" && known
            ? renderBuildingArt(item)
            : kind === "policies" && known
              ? renderPolicyCodexArt(item)
            : `<div class="codex-card__placeholder">${kind === "buildings" ? "?" : titleCase(item.treeId || "policy")}</div>`
        }
      </div>
      <div class="codex-card__content">
        <div class="codex-card__head">
          <h3>${title}</h3>
          <span class="codex-card__state">${titleCase(progress)}</span>
        </div>
        <p class="codex-card__meta">${areaName} • ${extra}</p>
        <p class="codex-card__summary">${summary}</p>
        <p class="codex-card__lore">${lore}</p>
        ${details}
      </div>
    </article>
  `;
}

function renderPolicyCodexArt(policy) {
  return `
    <div class="codex-card__placeholder codex-card__placeholder--policy">
      ${renderIcon(getPolicyIconPath(policy), "codex-card__icon", getPolicyName(policy).charAt(0))}
    </div>
  `;
}

function renderBuildingCodexDetails(content, building) {
  const sections = [];
  sections.push(renderCodexDetailBlock("Cost", renderCostPills(content, building.baseCost || {})));

  const production = renderCodexRatePills(content, building.outputPerSecond || {}, "yield-pill");
  sections.push(renderCodexDetailBlock("Produces", production || `<span class="codex-card__empty">No passive output</span>`));

  const consumption = renderCodexRatePills(content, building.maintenancePerSecond || {}, "yield-pill yield-pill--negative");
  sections.push(renderCodexDetailBlock("Consumes", consumption || `<span class="codex-card__empty">No upkeep</span>`));

  const stats = renderCodexStatPills(content, building);
  if (stats) {
    sections.push(renderCodexDetailBlock("Adds", stats));
  }

  return `<div class="codex-card__details">${sections.join("")}</div>`;
}

function renderPolicyCodexDetails(content, policy) {
  const sections = [];
  sections.push(renderCodexDetailBlock("Cost", renderCostPills(content, policy.cost || {})));

  const effects = getPolicyEffectLines(content, policy);
  sections.push(
    renderCodexDetailBlock(
      "Effects",
      effects.length
        ? `<ul class="codex-card__effects">${effects.map((line) => `<li>${line}</li>`).join("")}</ul>`
        : `<span class="codex-card__empty">No listed effects</span>`
    )
  );

  return `<div class="codex-card__details">${sections.join("")}</div>`;
}

function renderCodexDetailBlock(label, body) {
  return `
    <section class="codex-card__detail-block">
      <h4>${label}</h4>
      <div class="codex-card__detail-body">${body}</div>
    </section>
  `;
}

function renderCodexRatePills(content, entries, className) {
  return Object.entries(entries || {})
    .map(([currencyId, amount]) => {
      const amountText = `${Number(amount || 0) > 0 ? "+" : ""}${formatCurrencyAmount(content, currencyId, amount, { rate: true })}`;
      return `<span class="${className} yield-pill--${currencyId}">${amountText} ${labelForCurrency(content, currencyId)}/${currencyUnit(
        currencyId
      )}</span>`;
    })
    .join("");
}

function renderCodexStatPills(content, building) {
  return Object.entries(building.statsPerOwned || {})
    .map(([currencyId, amount]) => {
      return `<span class="yield-pill yield-pill--${currencyId}">+${formatCurrencyAmount(content, currencyId, amount)} ${labelForCurrency(
        content,
        currencyId
      )}</span>`;
    })
    .join("");
}

function getFocusedCurrencies(content, state, derived, areaId) {
  const blockers = getCurrentAreaBlockers(content, state, derived, areaId);
  return new Set(blockers.map((entry) => entry.currencyId));
}

function getCurrentAreaBlockers(content, state, derived, areaId) {
  const area = getAreaById(content, areaId);
  const seen = new Set(state.encyclopedia?.seenBuildingIds || []);
  const blockedBuilding = area.buildings.find((building) => {
    return seen.has(building.id) && !canAfford(content, state, derived, getBuildingCost(content, state, derived, building));
  });

  if (blockedBuilding) {
    return getMissingCostEntries(content, state, derived, getBuildingCost(content, state, derived, blockedBuilding));
  }

  const blockedPolicy = area.policies.find((policy) => {
    if ((state.purchasedPolicies || []).includes(policy.id)) {
      return false;
    }
    if (getPolicyBlockedReason(content, state, policy)) {
      return false;
    }
    if (!arePolicyPrerequisitesMet(state, policy)) {
      return false;
    }
    if (!requirementsMet(content, state, derived, areaId, policy.unlock || {})) {
      return false;
    }
    return !canAfford(content, state, derived, policy.cost || {});
  });

  if (blockedPolicy) {
    return getMissingCostEntries(content, state, derived, blockedPolicy.cost || {});
  }

  const hint = getNextBuildingUnlockHint(content, state, derived, areaId);
  return hint?.missing || [];
}

function getMissingCostEntries(content, state, derived, cost) {
  return Object.entries(cost || {})
    .map(([currencyId, amount]) => ({
      currencyId,
      deficit: Math.max(0, Number(amount) - getCurrencyAmount(content, state, derived, currencyId)),
      shareMissing:
        Number(amount) > 0 ? Math.max(0, Number(amount) - getCurrencyAmount(content, state, derived, currencyId)) / Number(amount) : 0
    }))
    .filter((entry) => entry.deficit > 0)
    .sort((left, right) => {
      if (right.shareMissing !== left.shareMissing) {
        return right.shareMissing - left.shareMissing;
      }
      return right.deficit - left.deficit;
    })
    .slice(0, 2);
}

function emitBurst(button, label, currencyId) {
  const burst = document.createElement("span");
  burst.className = `tax-burst tax-burst--${currencyId}`;
  burst.textContent = label;
  button.appendChild(burst);
  window.setTimeout(() => burst.remove(), 850);
}

function getPolicyName(policy) {
  return policy?.name || titleCase(String(policy?.id || "policy").replace(/-/g, " "));
}
