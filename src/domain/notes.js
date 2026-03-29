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

const NOTE_TO_INDEX = {
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

export function noteToMidi(name, octave) {
  const normalizedName = name?.trim();
  if (!normalizedName) {
    console.warn("noteToMidi: empty note name, returning 0");
    return 0;
  }

  const index = NOTE_TO_INDEX[normalizedName];
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
