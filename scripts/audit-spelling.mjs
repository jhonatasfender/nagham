#!/usr/bin/env node
// Theoretical-spelling auditor: checks that each chord's notes use the
// correct letter for their scale degree (3rd = root_letter + 2, 5th = +4,
// 7th = +6, 9th = +1, 11th = +3, 13th = +5) and the right accidental for
// the interval. Catches enharmonic spelling errors that the pitch-class
// audit misses (e.g., "G#" used for the augmented 5th of F# instead of
// "Cx", or "B" used for the diminished 7th of D instead of "Cb").
import { noteToMidi } from "../src/domain/notes.js";
import { getPianoChordVoicing } from "../src/domain/pianoVoicings/index.js";
import { getStaffChordVoicing } from "../src/domain/staffVoicings/index.js";

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

// scale-degree (1-based) → letter step from the root letter.
const DEGREE_LETTER_STEP = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 9: 1, 11: 3, 13: 5 };

// chord quality → list of [scaleDegree, semitones-from-root].
// each entry produces exactly one note in the expected spelling.
const QUALITY_INTERVALS = {
  Maj: [[1, 0], [3, 4], [5, 7]],
  m: [[1, 0], [3, 3], [5, 7]],
  5: [[1, 0], [5, 7]],
  m5: [[1, 0], [5, 7]],
  dim: [[1, 0], [3, 3], [5, 6]],
  aug: [[1, 0], [3, 4], [5, 8]],
  sus2: [[1, 0], [2, 2], [5, 7]],
  sus4: [[1, 0], [4, 5], [5, 7]],
  7: [[1, 0], [3, 4], [5, 7], [7, 10]],
  m7: [[1, 0], [3, 3], [5, 7], [7, 10]],
  maj7: [[1, 0], [3, 4], [5, 7], [7, 11]],
  "m7(b5)": [[1, 0], [3, 3], [5, 6], [7, 10]],
  dim7: [[1, 0], [3, 3], [5, 6], [7, 9]],
  6: [[1, 0], [3, 4], [5, 7], [6, 9]],
  m6: [[1, 0], [3, 3], [5, 7], [6, 9]],
  9: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 14]],
  maj9: [[1, 0], [3, 4], [5, 7], [7, 11], [9, 14]],
  m9: [[1, 0], [3, 3], [5, 7], [7, 10], [9, 14]],
  add9: [[1, 0], [3, 4], [5, 7], [9, 14]],
  2: [[1, 0], [3, 4], [5, 7], [9, 14]],
  11: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 14], [11, 17]],
  13: [[1, 0], [3, 4], [5, 7], [7, 10], [9, 14], [11, 17], [13, 21]],
  "9+": [[1, 0], [3, 4], [5, 7], [7, 10], [9, 15]],
};

const ROOTS = ["C", "C#", "D", "D#", "E", "F", "G", "A", "B"];

const C = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  gray: "\x1b[90m",
  bold: "\x1b[1m",
};

function pcMod(n) {
  return ((n % 12) + 12) % 12;
}

function rootInfo(root) {
  const m = root.match(/^([A-G])([#b]*)$/);
  if (!m) return null;
  const letter = m[1];
  let accidentalOffset = 0;
  for (const c of m[2]) accidentalOffset += c === "#" ? 1 : -1;
  return {
    letter,
    letterIdx: LETTERS.indexOf(letter),
    pc: pcMod(LETTER_PC[letter] + accidentalOffset),
  };
}

function buildAccidental(offset) {
  if (offset === 0) return "";
  if (offset > 0) return "#".repeat(offset);
  return "b".repeat(-offset);
}

function expectedSpelling(root, quality) {
  const info = rootInfo(root);
  if (!info) return null;
  const intervals = QUALITY_INTERVALS[quality];
  if (!intervals) return null;
  return intervals.map(([degree, semitones]) => {
    const letterStep = DEGREE_LETTER_STEP[degree];
    const targetLetter = LETTERS[(info.letterIdx + letterStep) % 7];
    const naturalPc = LETTER_PC[targetLetter];
    const targetPc = pcMod(info.pc + semitones);
    // signed offset that the natural letter needs to reach the target pc
    let offset = targetPc - naturalPc;
    while (offset > 6) offset -= 12;
    while (offset < -6) offset += 12;
    return targetLetter + buildAccidental(offset);
  });
}

function noteName(note) {
  return note?.name ?? "?";
}

function auditOne(root, quality) {
  const piano = getPianoChordVoicing(root, quality);
  const staff = getStaffChordVoicing(root, quality);
  const expected = expectedSpelling(root, quality);
  if (!piano || !expected) return null;

  const actualPiano = piano.map(noteName);
  const actualStaff = staff ? staff.map(noteName) : null;

  const pianoMismatch =
    actualPiano.length !== expected.length ||
    actualPiano.some((n, i) => n !== expected[i]);
  const staffMismatch =
    actualStaff != null &&
    (actualStaff.length !== expected.length ||
      actualStaff.some((n, i) => n !== expected[i]));

  if (!pianoMismatch && !staffMismatch) return null;

  return {
    root,
    quality,
    expected,
    actualPiano,
    actualStaff,
    pianoMismatch,
    staffMismatch,
  };
}

const QUALITIES_TO_AUDIT = Object.keys(QUALITY_INTERVALS);

const failures = [];
for (const root of ROOTS) {
  for (const quality of QUALITIES_TO_AUDIT) {
    const result = auditOne(root, quality);
    if (result) failures.push(result);
  }
}

const totalChecked = ROOTS.length * QUALITIES_TO_AUDIT.length;
console.log(
  `\n${C.bold}Theoretical-spelling audit${C.reset}  (${ROOTS.length} roots × ${QUALITIES_TO_AUDIT.length} qualities)`,
);
console.log(C.gray + "─".repeat(72) + C.reset);

for (const f of failures) {
  const tag = f.pianoMismatch && f.staffMismatch ? "PIANO+STAFF" : f.pianoMismatch ? "PIANO" : "STAFF";
  console.log(
    `${C.red}⨯${C.reset} ${f.root.padEnd(3)} ${f.quality.padEnd(8)} ${C.gray}[${tag}]${C.reset}`,
  );
  console.log(
    `   ${C.green}expected:${C.reset} ${f.expected.join(" · ")}`,
  );
  if (f.pianoMismatch) {
    console.log(
      `   ${C.yellow}piano:   ${C.reset} ${f.actualPiano.join(" · ")}`,
    );
  }
  if (f.staffMismatch && f.actualStaff) {
    console.log(
      `   ${C.cyan}staff:   ${C.reset} ${f.actualStaff.join(" · ")}`,
    );
  }
}

const okCount = totalChecked - failures.length;
console.log(
  C.gray + "─".repeat(72) + C.reset +
    `\n${okCount}/${totalChecked} voicings match the theoretical spelling ` +
    `(${failures.length} mismatches)\n`,
);
