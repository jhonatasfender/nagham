import { noteToMidi, midiToNote } from "./notes";

const DEFAULT_TUNING_MIDI = [64, 59, 55, 50, 45, 40];
const MAX_FRET = 12;

export function getNoteAt(stringIndex, fret) {
  if (stringIndex < 0 || stringIndex > 5 || fret < 0 || fret > MAX_FRET) {
    return { name: "C", octave: 4 };
  }
  const openMidi = DEFAULT_TUNING_MIDI[stringIndex];
  const midi = openMidi + fret;
  return midiToNote(midi);
}

export const TABLE_FRET_COUNT = 15;

export function getNoteAtFret(stringIndex, fret) {
  if (stringIndex < 0 || stringIndex > 5 || fret < 0) {
    return { name: "C", octave: 4 };
  }
  const openMidi = DEFAULT_TUNING_MIDI[stringIndex];
  return midiToNote(openMidi + fret);
}

export function getAllPositionsForNote(name, octave) {
  const targetMidi = noteToMidi(name, octave);
  const positions = [];
  for (let s = 0; s < 6; s++) {
    const openMidi = DEFAULT_TUNING_MIDI[s];
    const fret = targetMidi - openMidi;
    if (fret >= 0 && fret <= MAX_FRET) {
      positions.push({ stringIndex: s, fret });
    }
  }
  return positions;
}
