#!/usr/bin/env node
// Theoretical-spelling auditor: checks that each chord's notes use the
// correct letter for their scale degree (3rd = root_letter + 2, 5th = +4,
// 7th = +6, 9th = +1, 11th = +3, 13th = +5) and the right accidental for
// the interval. Catches enharmonic spelling errors that the pitch-class
// audit misses (e.g., "G#" used for the augmented 5th of F# instead of
// "Cx", or "B" used for the diminished 7th of D instead of "Cb").
import { LETTERS, LETTER_PC, noteToMidi, buildAccidental } from "../src/domain/notes.js";
import {
  CHORD_QUALITIES,
  getQualityDegrees,
} from "../src/domain/chordQualities.js";
import {
  getPianoChordVoicing,
  getStaffChordVoicing,
} from "../src/domain/pianoVoicings/index.js";

// scale-degree (1-based) → letter step from the root letter.
const DEGREE_LETTER_STEP = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 9: 1, 11: 3, 13: 5 };

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

function expectedSpelling(root, quality) {
  const info = rootInfo(root);
  if (!info) return null;
  const degrees = getQualityDegrees(quality);
  if (!degrees) return null;
  return degrees.map(([degree, semitones]) => {
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

const QUALITIES_TO_AUDIT = Object.keys(CHORD_QUALITIES);

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
