export function currencyUnit() {
  return "s";
}

export function getCurrencyDefinition(content, currencyId) {
  return content.indexes.currencyIndex[currencyId] || null;
}

export function labelForCurrency(content, currencyId) {
  return getCurrencyDefinition(content, currencyId)?.name || titleCase(currencyId.replace(/_/g, " "));
}

export function formatCurrencyAmount(content, currencyId, value, options = {}) {
  const numeric = Number(value || 0);
  const currency = getCurrencyDefinition(content, currencyId);

  if (currency?.displayMode === "integer" && !options.rate) {
    const rounded =
      options.ceil && numeric >= 0 ? Math.ceil(numeric) : numeric >= 0 ? Math.floor(numeric) : Math.ceil(numeric);
    return formatNumber(rounded);
  }

  return formatNumber(numeric);
}

export function formatPercent(value) {
  return `${formatNumber(Number(value || 0) * 100)}%`;
}

export function titleCase(value) {
  return String(value || "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function formatNumber(value) {
  const numeric = Number(value || 0);
  const absolute = Math.abs(numeric);

  if (absolute >= 1_000_000_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumSignificantDigits: 3
    })
      .format(numeric)
      .replace(/\s+/g, "");
  }

  if (absolute >= 1_000_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1
    })
      .format(numeric)
      .replace(/\s+/g, "");
  }

  if (absolute >= 100_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 0
    })
      .format(numeric)
      .replace(/\s+/g, "");
  }

  if (absolute >= 10_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1
    })
      .format(numeric)
      .replace(/\s+/g, "");
  }

  if (absolute >= 1000) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0
    }).format(numeric);
  }

  if (absolute >= 100) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1
    }).format(numeric);
  }

  if (absolute >= 10) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1
    }).format(numeric);
  }

  if (absolute >= 1) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 2
    }).format(numeric);
  }

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 3
  }).format(numeric);
}
