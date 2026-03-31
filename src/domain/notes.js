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

const LETTER_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

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

export function noteToMidi(name, octave) {
  const normalizedName = name?.trim();
  if (!normalizedName) {
    console.warn("noteToMidi: empty note name, returning 0");
    return 0;
  }

  let index = NOTE_TO_INDEX[normalizedName];
  if (index === undefined) {
    const parsed = pitchNameToPitchClass(normalizedName);
    if (parsed !== null) index = parsed;
  }
  if (index === undefined) {
    console.warn(`noteToMidi: unknown note name "${name}", returning 0`);
    return 0;
  }

  if (typeof octave !== "number" || isNaN(octave)) {
    console.warn(
      `noteToMidi: invalid octave ${octave} for note "${name}", returning 0`
    );
    return 0;
  }

  return (octave + 1) * 12 + index;
}

export function midiToNote(midi) {
  const octave = Math.floor(midi / 12) - 1;
  const index = ((midi % 12) + 12) % 12;
  return { name: NOTE_NAMES[index], octave };
}
