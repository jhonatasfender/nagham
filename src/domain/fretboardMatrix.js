import { getNoteAt, getAllPositionsForNote } from "./guitar";
import { getChordVoicing } from "./voicings";

export const STRING_COUNT = 6;
export const FRET_COUNT = 13;

export const TRIAD_NOTES = [
  { name: "C", octave: 4 },
  { name: "E", octave: 4 },
  { name: "G", octave: 4 },
];

export function getFretboardMatrix() {
  const matrix = [];
  for (let stringIndex = 0; stringIndex < STRING_COUNT; stringIndex++) {
    const row = [];
    for (let fret = 0; fret < FRET_COUNT; fret++) {
      row.push(getNoteAt(stringIndex, fret));
    }
    matrix.push(row);
  }
  return matrix;
}

export function isTriadNote(name, octave) {
  return TRIAD_NOTES.some((t) => t.name === name && t.octave === octave);
}

export function getPositionsForNote(name, octave) {
  return getAllPositionsForNote(name, octave);
}

export function getTriadPositionKeys() {
  const set = new Set();
  for (const { name, octave } of TRIAD_NOTES) {
    getAllPositionsForNote(name, octave).forEach((p) => {
      set.add(`${p.stringIndex}-${p.fret}`);
    });
  }
  return set;
}

export function getTriadChordShape() {
  const positions = [
    [4, 3],
    [3, 2],
    [2, 0],
    [1, 1],
  ];
  return new Set(positions.map(([s, f]) => `${s}-${f}`));
}

export function getBasicChordVoicing(root, quality) {
  return getChordVoicing(root, quality);
}
