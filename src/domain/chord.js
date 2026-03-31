import { notes as chordNotes, get as chordGet } from "@tonaljs/chord";
import { NOTE_NAMES, NOTE_NAMES_FLATS, pitchNameToPitchClass } from "./notes";

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
  "9+": "7#9",
  m9: "m9",
  m5: "5",
  11: "11",
  13: "13",
};

function parseTonalNote(str, useFlats = false) {
  const noteNames = useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
  const match = str.match(/^([A-G])([#b]*)(\d*)$/);
  if (!match) return null;
  const [, letter, accidentals, octStr] = match;
  const pitch = letter + accidentals;
  const octave = octStr !== "" ? parseInt(octStr, 10) : 4;
  const flatToSharp = { Db: "C#", Eb: "D#", Gb: "F#", Ab: "G#", Bb: "A#" };
  const sharpToFlat = {
    "C#": "Db",
    "D#": "Eb",
    "F#": "Gb",
    "G#": "Ab",
    "A#": "Bb",
  };

  if (noteNames.includes(pitch)) {
    return { name: pitch, octave };
  }
  if (flatToSharp[pitch] && noteNames.includes(flatToSharp[pitch])) {
    return { name: flatToSharp[pitch], octave };
  }
  if (sharpToFlat[pitch] && noteNames.includes(sharpToFlat[pitch])) {
    return { name: sharpToFlat[pitch], octave };
  }

  const pc = pitchNameToPitchClass(pitch);
  if (pc !== null) {
    return { name: noteNames[pc], octave };
  }

  return null;
}

export function getChordNotes(root, quality, options = {}) {
  const { bass = null, octave = 4, useFlats = false } = options;
  const tonalType = QUALITY_TO_TONAL[quality];
  if (!tonalType) return [];

  const tonic = `${root}${octave}`;
  let noteStrings = [];

  if (bass && bass !== root) {
    const symbol = `${root}${qualityToChordSymbolSuffix(quality)}/${bass}`;
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

  const noteNameSet = useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
  return noteStrings
    .map((str) => parseTonalNote(str, useFlats))
    .filter(Boolean)
    .map(({ name, octave: oct }) => {
      const canonical = toCanonicalName(name, noteNameSet);
      return { name: canonical, octave: oct };
    });
}

function qualityToChordSymbolSuffix(quality) {
  if (quality === "Maj") return "";
  if (quality === "m5") return "5";
  if (quality === "9+") return "7#9";
  if (quality === "m7(b5)") return "m7b5";
  return quality;
}

function qualityToDisplaySuffix(quality) {
  if (quality === "Maj") return "";
  if (quality === "maj9") return "M9";
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

const EXTENSION_COMPOSABLE_MAP = {
  5: { Maj: "5", m: "m5" },
  6: { Maj: "6", m: "m6" },
  7: { Maj: "7", m: "m7" },
  9: { Maj: "9", m: "m9" },
};

export const EXTENSION_COMPOSABLE_WITH_TRIAD = new Set(
  Object.keys(EXTENSION_COMPOSABLE_MAP)
);

export function effectiveChordQuality({ triad, extension }) {
  if (extension == null) return triad;
  const row = EXTENSION_COMPOSABLE_MAP[extension];
  if (row) return row[triad];
  return extension;
}

export function getChordLabel(root, quality, useFlats, bass = null) {
  const rootDisplay = toCanonicalName(
    root,
    useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES
  );
  const suffix = qualityToDisplaySuffix(quality);
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
