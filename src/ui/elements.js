export function getElements(documentRef = document) {
  return {
    eyebrow: documentRef.getElementById("eyebrow"),
    title: documentRef.getElementById("game-title"),
    goalLine: documentRef.getElementById("goal-line"),
    statsGrid: documentRef.getElementById("stats-grid"),
    contentGrid: documentRef.getElementById("content-grid"),
    manualActions: documentRef.getElementById("manual-actions"),
    statusLine: documentRef.getElementById("status-line"),
    districtHint: documentRef.getElementById("district-hint"),
    buildingsList: documentRef.getElementById("buildings-list"),
    upgradesList: documentRef.getElementById("upgrades-list"),
    sidebar: documentRef.getElementById("sidebar"),
    activePoliciesPanel: documentRef.getElementById("active-policies-panel"),
    activePoliciesList: documentRef.getElementById("active-policies-list"),
    policiesPanel: documentRef.getElementById("policies-panel"),
    annexPanel: documentRef.getElementById("annex-panel"),
    annexationSummary: documentRef.getElementById("annexation-summary"),
    annexButton: documentRef.getElementById("annex-button"),
    saveButton: documentRef.getElementById("save-button"),
    exportButton: documentRef.getElementById("export-button"),
    importButton: documentRef.getElementById("import-button"),
    importInput: documentRef.getElementById("import-input"),
    resetButton: documentRef.getElementById("reset-button")
  };
}
