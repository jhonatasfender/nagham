#!/usr/bin/env node
// Rewrite pianoVoicings and staffVoicings note names to match the
// theoretical spelling (one letter per scale degree, accidental matching
// the interval). Preserves the audible pitch (MIDI) — only the spelling
// changes. Run from project root:
//   node --import ./scripts/_resolver.mjs scripts/fix-spelling.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { resolve as pathResolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { noteToMidi } from "../src/domain/notes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const DEGREE_LETTER_STEP = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 9: 1, 11: 3, 13: 5 };

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

const ROOT_TO_FILE = {
  C: "C.js", "C#": "CSharp.js", D: "D.js", "D#": "DSharp.js",
  E: "E.js", F: "F.js", G: "G.js", A: "A.js", B: "B.js",
};

const PIANO_DIR = pathResolve(__dirname, "../src/domain/pianoVoicings");

function pcMod(n) { return ((n % 12) + 12) % 12; }

function rootPc(root) {
  const m = root.match(/^([A-G])([#b]*)$/);
  if (!m) return null;
  const base = LETTER_PC[m[1]];
  let offset = 0;
  for (const c of m[2]) offset += c === "#" ? 1 : -1;
  return pcMod(base + offset);
}

function buildAccidental(offset) {
  if (offset === 0) return "";
  if (offset > 0) return "#".repeat(offset);
  return "b".repeat(-offset);
}

function expectedNames(root, quality) {
  const rPc = rootPc(root);
  if (rPc == null) return null;
  const rLetterIdx = LETTERS.indexOf(root[0]);
  const intervals = QUALITY_INTERVALS[quality];
  if (!intervals) return null;
  return intervals.map(([degree, semitones]) => {
    const letterStep = DEGREE_LETTER_STEP[degree];
    const targetLetter = LETTERS[(rLetterIdx + letterStep) % 7];
    const naturalPc = LETTER_PC[targetLetter];
    const targetPc = pcMod(rPc + semitones);
    let offset = targetPc - naturalPc;
    while (offset > 6) offset -= 12;
    while (offset < -6) offset += 12;
    return targetLetter + buildAccidental(offset);
  });
}

// Given an existing octave for an old name and a new name with the same
// audible pitch, return the octave to use with the new name so that
// noteToMidi(newName, newOctave) == noteToMidi(oldName, oldOctave).
function preserveMidi(oldName, oldOctave, newName) {
  const targetMidi = noteToMidi(oldName, oldOctave);
  for (let oct = oldOctave - 1; oct <= oldOctave + 1; oct++) {
    if (noteToMidi(newName, oct) === targetMidi) return oct;
  }
  // fallback: keep the old octave (shouldn't happen for sane chord notes)
  return oldOctave;
}

function rewriteFile(filePath, root) {
  const src = readFileSync(filePath, "utf8");
  // crude parser: split into quality blocks and rebuild
  // we don't reparse JS; instead we use regex to find each `quality: [ ... ]`
  // and replace its name entries.
  const qualities = Object.keys(QUALITY_INTERVALS);
  let updated = src;
  let changes = 0;

  for (const quality of qualities) {
    const expected = expectedNames(root, quality);
    if (!expected) continue;
    // build a regex that matches `<key>: [ ... ]`
    const keyPattern = /^[a-zA-Z_$][\w$]*$/.test(quality)
      ? quality
      : JSON.stringify(quality).slice(1, -1).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(
      `(\\b(?:${keyPattern}|"${keyPattern}"):\\s*\\[)([\\s\\S]*?)(\\n  \\],)`,
      "m",
    );
    const match = updated.match(re);
    if (!match) continue;
    const blockBody = match[2];

    // parse note entries
    const noteRe = /\{\s*name:\s*"([^"]+)",\s*octave:\s*(\d+)\s*\}/g;
    const oldNotes = [];
    let m;
    while ((m = noteRe.exec(blockBody)) !== null) {
      oldNotes.push({ name: m[1], octave: Number(m[2]) });
    }
    if (oldNotes.length !== expected.length) continue;

    let newBody = blockBody;
    let touched = false;
    for (let i = 0; i < oldNotes.length; i++) {
      const old = oldNotes[i];
      const wanted = expected[i];
      if (old.name === wanted) continue;
      const newOctave = preserveMidi(old.name, old.octave, wanted);
      const oldEntry = `{ name: "${old.name}", octave: ${old.octave} }`;
      const newEntry = `{ name: "${wanted}", octave: ${newOctave} }`;
      // replace only the first occurrence in the block body
      const idx = newBody.indexOf(oldEntry);
      if (idx === -1) continue;
      newBody = newBody.slice(0, idx) + newEntry + newBody.slice(idx + oldEntry.length);
      touched = true;
      changes++;
    }
    if (touched) {
      updated = updated.replace(re, `$1${newBody}$3`);
    }
  }

  if (changes > 0) writeFileSync(filePath, updated, "utf8");
  return changes;
}

let total = 0;
for (const [root, filename] of Object.entries(ROOT_TO_FILE)) {
  for (const dir of [PIANO_DIR]) {
    const filePath = pathResolve(dir, filename);
    try {
      const n = rewriteFile(filePath, root);
      if (n > 0) console.log(`✓ ${dir.split("/").slice(-1)[0]}/${filename}: ${n} note(s) rewritten`);
      total += n;
    } catch (err) {
      console.error(`! ${filePath}: ${err.message}`);
    }
  }
}
console.log(`\nTotal notes rewritten: ${total}`);
