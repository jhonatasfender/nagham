import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  NOTE_NAMES,
  NOTE_NAMES_FLATS,
  NOTE_TO_INDEX,
  noteToMidi,
  midiToNote,
} from "../src/domain/notes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildXml() {
  const generated = new Date().toISOString();

  const spellingRows = Object.keys(NOTE_TO_INDEX)
    .sort()
    .map((name) => {
      const pc = NOTE_TO_INDEX[name];
      const midi = noteToMidi(name, 4);
      return `    <spelling name="${escapeXml(name)}" pitchClass="${pc}" midiOctave4="${midi}"/>`;
    })
    .join("\n");

  const sharpRows = NOTE_NAMES.map(
    (name, index) =>
      `    <pitchClass index="${index}" notation="sharps" name="${escapeXml(name)}"/>`
  ).join("\n");

  const flatRows = NOTE_NAMES_FLATS.map(
    (name, index) =>
      `    <pitchClass index="${index}" notation="flats" name="${escapeXml(name)}"/>`
  ).join("\n");

  const midiRows = [];
  for (let midi = 0; midi <= 127; midi++) {
    const { name, octave } = midiToNote(midi);
    midiRows.push(
      `    <midiNote value="${midi}" name="${escapeXml(name)}" octave="${octave}"/>`
    );
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<musicalNotesIndex version="1" generated="${generated}">
  <description>Índice das notas registadas no domínio da aplicação Nagham (classes de altura, escritas e gama MIDI 0–127).</description>
  <registeredSpellings>
${spellingRows}
  </registeredSpellings>
  <chromaticScales>
    <scale notation="sharps">
${sharpRows}
    </scale>
    <scale notation="flats">
${flatRows}
    </scale>
  </chromaticScales>
  <midiRange min="0" max="127">
${midiRows.join("\n")}
  </midiRange>
</musicalNotesIndex>
`;
}

const outPath = resolve(__dirname, "../public/notes-index.xml");
writeFileSync(outPath, buildXml(), "utf8");
console.log(`Wrote ${outPath}`);
