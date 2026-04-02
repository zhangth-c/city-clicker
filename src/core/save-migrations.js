function cloneRecord(value) {
  return JSON.parse(JSON.stringify(value));
}

export function getCurrentSaveVersion(content) {
  return Number(content.meta.saveVersion || 1);
}

export function buildSaveEnvelope(content, state) {
  return {
    gameId: content.meta.id,
    appVersion: content.meta.appVersion,
    balanceVersion: content.meta.balanceVersion,
    saveVersion: getCurrentSaveVersion(content),
    savedAt: new Date().toISOString(),
    state: cloneRecord(state)
  };
}

export function migrateSaveEnvelope(content, candidate) {
  const normalized = normalizeEnvelope(content, candidate);
  const currentVersion = getCurrentSaveVersion(content);

  if (normalized.saveVersion > currentVersion) {
    throw new Error(
      `This save uses schema ${normalized.saveVersion}, but the game only supports schema ${currentVersion}.`
    );
  }

  let working = normalized;
  while (working.saveVersion < currentVersion) {
    const migrate = SAVE_MIGRATIONS[working.saveVersion];
    if (!migrate) {
      throw new Error(`No migration exists for save schema ${working.saveVersion}.`);
    }
    working = migrate(content, working);
  }

  return {
    ...working,
    gameId: content.meta.id,
    appVersion: working.appVersion || content.meta.appVersion,
    balanceVersion: working.balanceVersion || content.meta.balanceVersion,
    saveVersion: currentVersion
  };
}

const SAVE_MIGRATIONS = {
  0: migrateV0ToV1
};

function normalizeEnvelope(content, candidate) {
  const payload = candidate && typeof candidate === "object" ? candidate : {};

  if (payload.gameId && payload.gameId !== content.meta.id) {
    throw new Error("This save file belongs to a different game.");
  }

  if (payload.state && typeof payload.state === "object") {
    return {
      ...cloneRecord(payload),
      saveVersion: Number.isInteger(Number(payload.saveVersion)) ? Number(payload.saveVersion) : 0
    };
  }

  return {
    gameId: content.meta.id,
    appVersion: null,
    balanceVersion: null,
    saveVersion: 0,
    savedAt: null,
    state: cloneRecord(payload)
  };
}

function migrateV0ToV1(content, envelope) {
  return {
    ...envelope,
    gameId: envelope.gameId || content.meta.id,
    appVersion: envelope.appVersion || "legacy",
    balanceVersion: envelope.balanceVersion || "legacy",
    saveVersion: 1,
    state: {
      ...(envelope.state || {})
    }
  };
}
