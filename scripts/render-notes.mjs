#!/usr/bin/env node
import {
  NOTE_NAMES,
  noteToMidi,
  midiToNote,
} from "../src/domain/notes.js";
import { midiToTreblePosition } from "../src/domain/staffPositions.js";
import {
  createMatrixFromChord,
  iterateNotes,
} from "../src/domain/notationMatrix.js";
import { getFretboardMatrix } from "../src/domain/fretboardMatrix.js";
import { getPianoKeys, resolvePianoOctaves } from "../src/domain/pianoKeys.js";
import { getPianoChordVoicing } from "../src/domain/pianoVoicings/index.js";
import { getStaffChordVoicing } from "../src/domain/staffVoicings/index.js";
import { getChordVoicing } from "../src/domain/voicings/index.js";

const EXPECTED_INTERVALS_PC = {
  Maj: [0, 4, 7],
  m: [0, 3, 7],
  5: [0, 7],
  m5: [0, 7],
  dim: [0, 3, 6],
  aug: [0, 4, 8],
  sus2: [0, 2, 7],
  sus4: [0, 5, 7],
  7: [0, 4, 7, 10],
  m7: [0, 3, 7, 10],
  maj7: [0, 4, 7, 11],
  "m7(b5)": [0, 3, 6, 10],
  dim7: [0, 3, 6, 9],
  6: [0, 4, 7, 9],
  m6: [0, 3, 7, 9],
  9: [0, 4, 7, 10, 2],
  maj9: [0, 4, 7, 11, 2],
  m9: [0, 3, 7, 10, 2],
  add9: [0, 4, 7, 2],
  2: [0, 4, 7, 2],
  11: [0, 4, 7, 10, 2, 5],
  13: [0, 4, 7, 10, 2, 5, 9],
  "9+": [0, 4, 7, 10, 3],
};

const ALL_ROOTS = ["C", "C#", "D", "D#", "E", "F", "G", "A", "B"];
const ALL_QUALITIES = Object.keys(EXPECTED_INTERVALS_PC);

const C = {
  reset: "\x1b[0m",
  dim: "\x1b[2m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m",
  gray: "\x1b[90m",
};

function pc(midi) {
  return ((midi % 12) + 12) % 12;
}

function rootToPc(root) {
  const m = noteToMidi(root, 4);
  return pc(m);
}

function expectedPcSet(root, quality) {
  const rootPc = rootToPc(root);
  const intervals = EXPECTED_INTERVALS_PC[quality];
  if (!intervals) return null;
  return new Set(intervals.map((i) => pc(rootPc + i)));
}

function pcSetFromNotes(notes) {
  return new Set(
    notes.map((n) => pc(noteToMidi(n.name, n.octave))),
  );
}

function setsEqual(a, b) {
  if (a.size !== b.size) return false;
  for (const x of a) if (!b.has(x)) return false;
  return true;
}

function setDiff(a, b) {
  return [...a].filter((x) => !b.has(x));
}

// ─── Piano renderer (uses pianoKeys.getPianoKeys, same as the app) ─────────
function renderPiano(chordNotes) {
  const octs = resolvePianoOctaves(chordNotes);
  const keys = getPianoKeys(octs);
  const whiteKeys = keys.filter((k) => !k.isBlack);
  const cellW = 4;
  const totalW = whiteKeys.length * cellW;

  const markedMidi = new Set(
    chordNotes.map((n) => noteToMidi(n.name, n.octave)),
  );

  let topLine = "";
  let blackRow = "";
  let blackLabel = "";

  for (let i = 0; i < whiteKeys.length; i++) {
    const wk = whiteKeys[i];
    const nextWk = whiteKeys[i + 1];
    let blackBetween = null;
    if (nextWk) {
      const wkMidi = noteToMidi(wk.name, wk.octave);
      const nextMidi = noteToMidi(nextWk.name, nextWk.octave);
      if (nextMidi - wkMidi === 2) {
        blackBetween = { midi: wkMidi + 1, name: NOTE_NAMES[(wkMidi + 1) % 12] };
      }
    }
    topLine += " ".repeat(cellW);
    if (blackBetween) {
      const marked = markedMidi.has(blackBetween.midi);
      const color = marked ? C.yellow : C.gray;
      blackRow +=
        " ".repeat(cellW - 1) + color + (marked ? "█" : "▓") + C.reset;
      blackLabel +=
        " ".repeat(cellW - 2) +
        color +
        blackBetween.name.padEnd(2) +
        C.reset;
    } else {
      blackRow += " ".repeat(cellW);
      blackLabel += " ".repeat(cellW);
    }
  }

  let whiteSep = "";
  let whiteLabel = "";
  let whiteMark = "";
  for (const wk of whiteKeys) {
    const midi = noteToMidi(wk.name, wk.octave);
    const marked = markedMidi.has(midi);
    const label = `${wk.name}${wk.octave}`.padEnd(cellW - 1);
    whiteSep += "+" + "-".repeat(cellW - 1);
    if (marked) {
      whiteLabel += "|" + C.green + C.bold + label + C.reset;
      whiteMark += "|" + C.green + C.bold + " ●  ".slice(0, cellW - 1) + C.reset;
    } else {
      whiteLabel += "|" + C.dim + label + C.reset;
      whiteMark += "|" + " ".repeat(cellW - 1);
    }
  }
  whiteSep += "+";
  whiteLabel += "|";
  whiteMark += "|";

  return [
    C.dim + "  [PIANO matrix — getPianoKeys(" + JSON.stringify(octs) + ")]" + C.reset,
    "  " + blackLabel,
    "  " + blackRow,
    "  " + whiteSep,
    "  " + whiteLabel,
    "  " + whiteMark,
    "  " + whiteSep,
  ].join("\n");
}

// ─── Staff renderer (uses notationMatrix + midiToTreblePosition) ───────────
function renderStaff(chordNotes) {
  const matrix = createMatrixFromChord(chordNotes);
  const events = iterateNotes(matrix);
  const notes = events.map((e) => e.note);
  // staff lines: positions 0,2,4,6,8 → E4,G4,B4,D5,F5
  // staff spaces: positions 1,3,5,7 → F4,A4,C5,E5
  // we render positions from -4 (below middle C) to +10 (above staff)
  const minPos = Math.min(-4, ...notes.map((n) => midiToTreblePosition(n.midi)));
  const maxPos = Math.max(10, ...notes.map((n) => midiToTreblePosition(n.midi)));

  const lines = [];
  // staff lines at 0,2,4,6,8 (E4..F5)
  const STAFF_LINE_POS = new Set([0, 2, 4, 6, 8]);
  const LEDGER_C4 = -2; // middle C
  const noteAtPos = new Map();
  for (const n of notes) {
    const p = midiToTreblePosition(n.midi);
    const info = midiToNote(n.midi);
    noteAtPos.set(p, `${info.name}${info.octave}`);
  }

  const W = 32;
  for (let p = maxPos; p >= minPos; p--) {
    const isLine = STAFF_LINE_POS.has(p);
    const isLedger = p === LEDGER_C4 && noteAtPos.has(p);
    const hasNote = noteAtPos.has(p);
    const label = noteAtPos.get(p) || "";

    let body;
    if (isLine) {
      body = "─".repeat(W);
    } else if (isLedger) {
      body = " ".repeat((W - 7) / 2) + "─ ─ ─ ─" + " ".repeat((W - 7) / 2);
    } else {
      body = " ".repeat(W);
    }
    if (hasNote) {
      const mid = Math.floor(W / 2);
      body = body.slice(0, mid - 1) + C.green + C.bold + "●" + C.reset + body.slice(mid);
    }
    const labelOut = hasNote ? "  ← " + C.cyan + label + C.reset : "";
    lines.push("  " + body + labelOut);
  }

  return (
    C.dim +
    "  [STAFF matrix — createMatrixFromChord → iterateNotes → midiToTreblePosition]" +
    C.reset +
    "\n" +
    lines.join("\n")
  );
}

// ─── Fretboard renderer (uses fretboardMatrix.getFretboardMatrix) ──────────
function renderFretboard(chordNotes, root, quality) {
  const matrix = getFretboardMatrix();
  const voicing = getChordVoicing(root, quality);
  const markedKeys = new Set(
    (voicing || []).map((p) => `${p.stringIndex}-${p.fret}`),
  );
  const VISIBLE = 13;
  const cellW = 5;

  const headerNums = "       " + Array.from({ length: VISIBLE }, (_, f) =>
    String(f).padStart(cellW - 1).padEnd(cellW),
  ).join("");

  const lines = [];
  const stringLabels = ["E4", "B3", "G3", "D3", "A2", "E2"];
  for (let s = 0; s < 6; s++) {
    const openLabel = stringLabels[s];
    let row = ` ${openLabel} │`;
    for (let f = 0; f < VISIBLE; f++) {
      const note = matrix[s][f];
      const key = `${s}-${f}`;
      const marked = markedKeys.has(key);
      if (marked) {
        const label = `${note.name}${note.octave}`.padEnd(cellW - 1);
        row += C.green + C.bold + label + C.reset + "│";
      } else {
        row += C.dim + " ".repeat(cellW - 1) + C.reset + "│";
      }
    }
    lines.push(row);
  }

  return (
    C.dim +
    "  [FRETBOARD matrix — getFretboardMatrix() + getChordVoicing]" +
    C.reset +
    "\n" +
    "  " +
    headerNums +
    "\n" +
    lines.map((l) => "  " + l).join("\n")
  );
}

// ─── Audit one (root, quality) ─────────────────────────────────────────────
function auditChord(root, quality) {
  const pianoVoicing = getPianoChordVoicing(root, quality);
  const staffVoicing = getStaffChordVoicing(root, quality);
  const guitarVoicing = getChordVoicing(root, quality);
  const expected = expectedPcSet(root, quality);

  console.log(
    "\n" +
      C.magenta +
      C.bold +
      "═".repeat(78) +
      "\n " +
      `ROOT: ${root}  QUALITY: ${quality}` +
      "\n" +
      "═".repeat(78) +
      C.reset,
  );

  if (!pianoVoicing) {
    console.log(C.red + `  ⨯ pianoVoicings/${root} has no '${quality}' entry` + C.reset);
  } else {
    const pcSet = pcSetFromNotes(pianoVoicing);
    const ok = expected && setsEqual(pcSet, expected);
    const mark = ok ? C.green + "✓" : C.red + "⨯";
    const cmpInfo = expected
      ? ok
        ? ""
        : ` (expected pcs={${[...expected].join(",")}}  got pcs={${[...pcSet].join(",")}})`
      : "";
    console.log(
      `  ${mark} PIANO voicing notes:` +
        C.reset +
        " " +
        pianoVoicing
          .map((n) => `${n.name}${n.octave}`)
          .join(" · ") +
        C.yellow +
        cmpInfo +
        C.reset,
    );

    if (expected && !ok) {
      const missing = setDiff(expected, pcSet);
      const extra = setDiff(pcSet, expected);
      if (missing.length)
        console.log(C.red + `    missing pitch classes: ${missing.join(", ")}` + C.reset);
      if (extra.length)
        console.log(C.red + `    extra pitch classes: ${extra.join(", ")}` + C.reset);
    }

    // staff vs piano divergence
    if (staffVoicing) {
      const staffPc = pcSetFromNotes(staffVoicing);
      if (!setsEqual(staffPc, pcSet)) {
        console.log(
          C.yellow +
            `    ⚠ staffVoicing pitches differ: ${staffVoicing.map((n) => n.name + n.octave).join(" · ")}` +
            C.reset,
        );
      }
    }
  }

  if (guitarVoicing) {
    // resolve guitar voicing notes via fretboard matrix
    const fb = getFretboardMatrix();
    const notes = guitarVoicing.map((p) => fb[p.stringIndex][p.fret]);
    const gPc = pcSetFromNotes(notes);
    const ok = expected && setsEqual(gPc, expected);
    const mark = ok ? C.green + "✓" : C.red + "⨯";
    console.log(
      `  ${mark} GUITAR voicing notes:` +
        C.reset +
        " " +
        notes.map((n) => `${n.name}${n.octave}`).join(" · "),
    );
  } else {
    console.log(C.gray + `  · no guitar voicing for ${root} ${quality}` + C.reset);
  }

  if (pianoVoicing) {
    console.log("");
    console.log(renderPiano(pianoVoicing));
    console.log("");
    console.log(renderStaff(staffVoicing || pianoVoicing));
    console.log("");
    console.log(renderFretboard(pianoVoicing, root, quality));
  }
}

// ─── CLI ───────────────────────────────────────────────────────────────────
const [, , arg1, arg2] = process.argv;

if (arg1 === "--summary") {
  // Print only the audit lines, no ASCII, for a quick scan
  const fb = getFretboardMatrix();
  const ALL_ROOTS_GUITAR = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",
  ];
  let pianoTotal = 0, pianoFailures = 0;
  let guitarTotal = 0, guitarFailures = 0;
  console.log(C.bold + "── PIANO voicings ──" + C.reset);
  for (const root of ALL_ROOTS) {
    for (const quality of ALL_QUALITIES) {
      const v = getPianoChordVoicing(root, quality);
      if (!v) continue;
      pianoTotal++;
      const expected = expectedPcSet(root, quality);
      const pcSet = pcSetFromNotes(v);
      if (expected && !setsEqual(pcSet, expected)) {
        pianoFailures++;
        const missing = setDiff(expected, pcSet);
        const extra = setDiff(pcSet, expected);
        console.log(
          `${C.red}⨯${C.reset} ${root.padEnd(3)} ${quality.padEnd(8)}  got=[${v.map((n) => n.name + n.octave).join(",")}]  missing=[${missing.join(",")}]  extra=[${extra.join(",")}]`,
        );
      }
    }
  }
  console.log(C.bold + "\n── GUITAR voicings ──" + C.reset);
  for (const root of ALL_ROOTS_GUITAR) {
    for (const quality of ALL_QUALITIES) {
      const v = getChordVoicing(root, quality);
      if (!v) continue;
      guitarTotal++;
      const notes = v.map((p) => fb[p.stringIndex][p.fret]);
      const expected = expectedPcSet(root, quality);
      const pcSet = pcSetFromNotes(notes);
      if (expected && !setsEqual(pcSet, expected)) {
        guitarFailures++;
        const missing = setDiff(expected, pcSet);
        const extra = setDiff(pcSet, expected);
        console.log(
          `${C.red}⨯${C.reset} ${root.padEnd(3)} ${quality.padEnd(8)}  got=[${notes.map((n) => n.name + n.octave).join(",")}]  missing=[${missing.join(",")}]  extra=[${extra.join(",")}]`,
        );
      }
    }
  }
  console.log(
    `\n${C.bold}PIANO:${C.reset}  ${pianoTotal - pianoFailures}/${pianoTotal}  (${pianoFailures} failures)`,
  );
  console.log(
    `${C.bold}GUITAR:${C.reset} ${guitarTotal - guitarFailures}/${guitarTotal}  (${guitarFailures} failures)`,
  );
  process.exit(0);
}

const roots = arg1 ? [arg1] : ALL_ROOTS;
const qualities = arg2 ? [arg2] : ALL_QUALITIES;

for (const root of roots) {
  for (const quality of qualities) {
    if (!getPianoChordVoicing(root, quality)) continue;
    auditChord(root, quality);
  }
}
