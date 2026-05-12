export const NOTE_NAMES = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

export const NOTE_NAMES_FLATS = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "Gb",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export const DEFAULT_NOTE = { name: "C", octave: 4 };

export const NOTE_TO_INDEX = {
  C: 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
};

export const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];

// pc (0..11) of each natural letter. Use this to derive accidentals when
// spelling chord/scale notes that must land on a specific letter.
export const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

// Pairs for converting between simple sharp/flat spellings of the same
// pitch class (e.g. "C#" ↔ "Db"). Does NOT include hard enharmonics like
// "F##" ↔ "G" — those are intentional and preserve the strict spelling
// rule (see ADR-0002).
export const ENHARMONIC_SHARP_TO_FLAT = Object.freeze({
  "C#": "Db",
  "D#": "Eb",
  "F#": "Gb",
  "G#": "Ab",
  "A#": "Bb",
});

export const ENHARMONIC_FLAT_TO_SHARP = Object.freeze({
  Db: "C#",
  Eb: "D#",
  Gb: "F#",
  Ab: "G#",
  Bb: "A#",
});

// Normalised pitch class for a MIDI value (0..11).
export function pitchClass(midi) {
  return ((midi % 12) + 12) % 12;
}

// "#", "##", "b", "bb", … from a signed semitone offset relative to the
// natural letter pitch class. Empty string for offset 0.
export function buildAccidental(offset) {
  if (offset === 0) return "";
  if (offset > 0) return "#".repeat(offset);
  return "b".repeat(-offset);
}

export function pitchNameToPitchClass(name) {
  const m = name?.trim().match(/^([A-G])([#b]*)$/);
  if (!m) return null;
  const base = LETTER_PC[m[1]];
  if (base === undefined) return null;
  let delta = 0;
  for (const c of m[2]) {
    if (c === "#") delta += 1;
    else if (c === "b") delta -= 1;
  }
  return (((base + delta) % 12) + 12) % 12;
}

function pitchNameToSignedOffset(name) {
  const m = name?.trim().match(/^([A-G])([#b]*)$/);
  if (!m) return null;
  const base = LETTER_PC[m[1]];
  if (base === undefined) return null;
  let delta = 0;
  for (const c of m[2]) {
    if (c === "#") delta += 1;
    else if (c === "b") delta -= 1;
  }
  return base + delta;
}

export function noteToMidi(name, octave) {
  const normalizedName = name?.trim();
  if (!normalizedName) {
    console.warn("noteToMidi: empty note name, returning 0");
    return 0;
  }

  if (typeof octave !== "number" || isNaN(octave)) {
    console.warn(
      `noteToMidi: invalid octave ${octave} for note "${name}", returning 0`
    );
    return 0;
  }

  const signed = pitchNameToSignedOffset(normalizedName);
  if (signed !== null) {
    return (octave + 1) * 12 + signed;
  }

  const index = NOTE_TO_INDEX[normalizedName];
  if (index === undefined) {
    console.warn(`noteToMidi: unknown note name "${name}", returning 0`);
    return 0;
  }

  return (octave + 1) * 12 + index;
}

export function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const index = ((midi % 12) + 12) % 12;
  return { name: NOTE_NAMES[index], octave };
}
