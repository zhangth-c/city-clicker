export function currencyUnit() {
  return "s";
}

export function labelForCurrency(content, currencyId) {
  if (currencyId === "districts") {
    return "Districts";
  }
  return content.currencies[currencyId].name;
}

export function formatPercent(value) {
  return `${formatNumber(Number(value || 0) * 100)}%`;
}

export function formatNumber(value) {
  const numeric = Number(value || 0);
  const absolute = Math.abs(numeric);

  if (absolute >= 1_000_000) {
    return new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2
    }).format(numeric);
  }

  if (absolute >= 1000) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 1
    }).format(numeric);
  }

  if (absolute >= 100) {
    return new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 0
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
