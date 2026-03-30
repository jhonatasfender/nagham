export { EXTENSION_COMPOSABLE_WITH_TRIAD } from "./chord.js";

export const EXTENSION_IMPLIES_MINOR = new Set(["m7(b5)"]);

export const EXTENSION_IMPLIES_MAJOR = new Set([
  "maj7",
  "maj9",
  "11",
  "13",
  "add9",
  "2",
]);

export function impliedTriadForExtension(ext) {
  if (EXTENSION_IMPLIES_MINOR.has(ext)) return "m";
  if (EXTENSION_IMPLIES_MAJOR.has(ext)) return "Maj";
  return null;
}

function isNeutralExtension(ext) {
  if (ext == null || ext === "5") return false;
  if (EXTENSION_IMPLIES_MINOR.has(ext)) return false;
  if (EXTENSION_IMPLIES_MAJOR.has(ext)) return false;
  return true;
}

export function triadMajSelected(triad, extension) {
  if (extension == null || extension === "5") return triad === "Maj";
  if (EXTENSION_IMPLIES_MINOR.has(extension)) return false;
  if (EXTENSION_IMPLIES_MAJOR.has(extension)) return true;
  if (isNeutralExtension(extension)) return triad === "Maj";
  return false;
}

export function triadMinorSelected(triad, extension) {
  if (extension == null || extension === "5") return triad === "m";
  if (EXTENSION_IMPLIES_MINOR.has(extension)) return true;
  if (EXTENSION_IMPLIES_MAJOR.has(extension)) return false;
  if (isNeutralExtension(extension)) return triad === "m";
  return false;
}
