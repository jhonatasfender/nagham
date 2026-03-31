import { NOTE_NAMES } from "./notes";

export const WHITE_KEY_NAMES = ["C", "D", "E", "F", "G", "A", "B"];
export const BLACK_KEY_NAMES = ["C#", "D#", "F#", "G#", "A#"];
export const TRIAD_KEYS = [
  { name: "C", octave: 4 },
  { name: "E", octave: 4 },
  { name: "G", octave: 4 },
];

const DEFAULT_PIANO_OCTAVES = [3, 4, 5];
const MIN_PIANO_OCTAVE = 2;
const MAX_PIANO_OCTAVE = 6;
const MIN_VISIBLE_OCTAVE_SPAN = 3;

export function resolvePianoOctaves(chordNotes) {
  if (!chordNotes?.length) return [...DEFAULT_PIANO_OCTAVES];
  const octs = chordNotes
    .map((n) => n.octave)
    .filter((o) => typeof o === "number" && !Number.isNaN(o));
  if (!octs.length) return [...DEFAULT_PIANO_OCTAVES];

  const minN = Math.min(...octs);
  const maxN = Math.max(...octs);
  let low = Math.max(MIN_PIANO_OCTAVE, minN - 1);
  let high = Math.min(MAX_PIANO_OCTAVE, maxN);
  while (high - low + 1 < 2) {
    if (high < MAX_PIANO_OCTAVE) high += 1;
    else if (low > MIN_PIANO_OCTAVE) low -= 1;
    else break;
  }
  while (high - low + 1 < MIN_VISIBLE_OCTAVE_SPAN) {
    if (high < MAX_PIANO_OCTAVE) high += 1;
    else if (low > MIN_PIANO_OCTAVE) low -= 1;
    else break;
  }
  return Array.from({ length: high - low + 1 }, (_, i) => low + i);
}

export function getPianoKeys(octaves = [3, 4]) {
  const keys = [];
  for (const octave of octaves) {
    for (const name of NOTE_NAMES) {
      keys.push({
        key: `${name}${octave}`,
        name,
        octave,
        isBlack: BLACK_KEY_NAMES.includes(name),
      });
    }
  }
  return keys;
}

export function getWhiteKeys(octaves = [3, 4]) {
  const keys = [];
  for (const octave of octaves) {
    for (const name of WHITE_KEY_NAMES) {
      keys.push({
        key: `${name}${octave}`,
        name,
        octave,
        isBlack: false,
      });
    }
  }
  return keys;
}

export function getBlackKeys(octaves = [3, 4]) {
  return getPianoKeys(octaves).filter((k) => k.isBlack);
}

export function isTriadNote(name, octave) {
  return TRIAD_KEYS.some((t) => t.name === name && t.octave === octave);
}
