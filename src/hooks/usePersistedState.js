import { useEffect, useReducer, useState } from "react";

const STORAGES = {
  session: typeof sessionStorage !== "undefined" ? sessionStorage : null,
  local: typeof localStorage !== "undefined" ? localStorage : null,
};

function readStored(key, storageType) {
  const storage = STORAGES[storageType];
  if (!storage) return undefined;
  try {
    const raw = storage.getItem(key);
    if (raw == null) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

function writeStored(key, value, storageType) {
  const storage = STORAGES[storageType];
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
    // sessionStorage/localStorage unavailable (private mode, quota) — skip
  }
}

function resolveInitial(initialValue) {
  return typeof initialValue === "function" ? initialValue() : initialValue;
}

function mergeWithInitial(stored, initial, merge) {
  const isPlainObject = (v) =>
    v != null && typeof v === "object" && !Array.isArray(v);
  if (merge && isPlainObject(stored) && isPlainObject(initial)) {
    return { ...initial, ...stored };
  }
  return stored;
}

export function usePersistedState(key, initialValue, options = {}) {
  const { storage = "session", merge = true } = options;

  const [state, setState] = useState(() => {
    const stored = readStored(key, storage);
    const initial = resolveInitial(initialValue);
    if (stored === undefined) return initial;
    return mergeWithInitial(stored, initial, merge);
  });

  useEffect(() => {
    writeStored(key, state, storage);
  }, [key, state, storage]);

  return [state, setState];
}

export function usePersistedReducer(reducer, initialState, key, options = {}) {
  const { storage = "session", merge = true } = options;

  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const stored = readStored(key, storage);
    if (stored === undefined) return initialState;
    return mergeWithInitial(stored, initialState, merge);
  });

  useEffect(() => {
    writeStored(key, state, storage);
  }, [key, state, storage]);

  return [state, dispatch];
}
