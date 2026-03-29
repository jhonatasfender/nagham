import { notes as chordNotes, get as chordGet } from "@tonaljs/chord";
import { NOTE_NAMES, NOTE_NAMES_FLATS } from "./notes";

const QUALITY_TO_TONAL = {
  Maj: "maj",
  m: "m",
  5: "5",
  dim: "dim",
  aug: "aug",
  sus2: "sus2",
  sus4: "sus4",
  2: "add9",
  6: "6",
  m6: "m6",
  7: "7",
  maj7: "maj7",
  m7: "m7",
  "m7(b5)": "m7b5",
  dim7: "dim7",
  add9: "add9",
  9: "9",
  maj9: "maj9",
  m9: "m9",
  11: "11",
  13: "13",
};

function parseTonalNote(str, useFlats = false) {
  const noteNames = useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
  const match = str.match(/^([A-G][#b]?)(\d*)$/);
  if (!match) return null;
  const [, pitch, octStr] = match;
  const octave = octStr !== "" ? parseInt(octStr, 10) : 4;
  const sharpIndex = {
    C: 0,
    "C#": 1,
    D: 2,
    "D#": 3,
    E: 4,
    F: 5,
    "F#": 6,
    G: 7,
    "G#": 8,
    A: 9,
    "A#": 10,
    B: 11,
  };
  const flatToSharp = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
  let name = pitch;
  if (flatToSharp[name]) name = flatToSharp[name];
  if (!noteNames.includes(name)) {
    const sharpName = flatToSharp[pitch] || pitch;
    const idx = sharpIndex[sharpName];
    if (idx !== undefined) name = noteNames[idx];
  }
  return { name, octave };
}

export function getChordNotes(root, quality, options = {}) {
  const { bass = null, octave = 4 } = options;
  const tonalType = QUALITY_TO_TONAL[quality];
  if (!tonalType) return [];

  const tonic = `${root}${octave}`;
  let noteStrings = [];

  if (bass && bass !== root) {
    const symbol = `${root}${qualityToSuffix(quality)}/${bass}`;
    const chordInfo = chordGet(symbol);
    if (chordInfo.empty) return [];
    const pitchClasses = chordInfo.notes;
    const bassOctave = octave - 1;
    noteStrings = pitchClasses.map((pc, i) =>
      i === 0 ? `${pc}${bassOctave}` : `${pc}${octave}`
    );
  } else {
    noteStrings = chordNotes(tonalType, tonic);
  }

  return noteStrings
    .map((str) => parseTonalNote(str, false))
    .filter(Boolean)
    .map(({ name, octave: oct }) => {
      const canonical = toCanonicalName(name, NOTE_NAMES);
      return { name: canonical, octave: oct };
    });
}

function qualityToSuffix(quality) {
  if (quality === "Maj") return "";
  return quality;
}

function toCanonicalName(name, noteNames) {
  const sharpToFlat = {
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
    "A#": "Bb",
  };
  if (noteNames.includes(name)) return name;
  const asFlat = sharpToFlat[name];
  if (asFlat && noteNames.includes(asFlat)) return asFlat;
  const flatToSharp = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
  const asSharp = flatToSharp[name];
  if (asSharp && noteNames.includes(asSharp)) return asSharp;
  return name;
}

export function getNoteForDisplay(name, useFlats) {
  const noteNames = useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
  return toCanonicalName(name, noteNames);
}

export function getChordLabel(root, quality, useFlats, bass = null) {
  const rootDisplay = toCanonicalName(
    root,
    useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES
  );
  const suffix = qualityToSuffix(quality);
  const main = suffix ? `${rootDisplay}${suffix}` : rootDisplay;
  if (bass && bass !== root) {
    const bassDisplay = toCanonicalName(
      bass,
      useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES
    );
    return `${main}/${bassDisplay}`;
  }
  return main;
}
