import { noteToMidi, midiToNote } from "./notes";

export const STAFF_TREBLE = 0;
export const STAFF_BASS = 1;

export const TREBLE_REF_POSITION = 6;
export const BASS_REF_POSITION = 14;

const TREBLE_BOTTOM_MIDI = 64;
const BASS_BOTTOM_MIDI = 43;

export function staffPositionToMidi(staffId, position) {
  const base = staffId === STAFF_TREBLE ? TREBLE_BOTTOM_MIDI : BASS_BOTTOM_MIDI;
  return base + position;
}

export function midiToStaffPosition(staffId, midi) {
  const base = staffId === STAFF_TREBLE ? TREBLE_BOTTOM_MIDI : BASS_BOTTOM_MIDI;
  return midi - base;
}

export function emptyCell() {
  return null;
}

export function chord(noteSpecs, duration = "quarter") {
  return {
    notes: noteSpecs.map((n) => ({
      midi: noteToMidi(n.name, n.octave),
      duration,
      accidental: n.accidental,
    })),
  };
}

export function createEmptyMatrix(measureCount = 4, beatsPerMeasure = 4) {
  const measures = [];
  for (let m = 0; m < measureCount; m++) {
    const staves = [[], []];
    for (let s = 0; s < 2; s++) {
      for (let b = 0; b < beatsPerMeasure; b++) {
        staves[s][b] = null;
      }
    }
    measures.push({ staves });
  }
  return {
    timeSignature: { count: beatsPerMeasure, unit: 4 },
    keySignature: { sharps: 0, flats: 0 },
    measures,
  };
}

export function createSampleMatrix() {
  const matrix = createEmptyMatrix(1, 4);
  matrix.keySignature = { sharps: 0, flats: 0 };
  const chordNotes = [
    { name: "C", octave: 4 },
    { name: "E", octave: 4 },
    { name: "G", octave: 4 },
  ];
  matrix.measures[0].staves[STAFF_TREBLE][0] = chord(chordNotes, "quarter");
  return matrix;
}

export function createMatrixFromChord(chordNotes) {
  if (!chordNotes?.length) return createSampleMatrix();
  const matrix = createEmptyMatrix(1, 4);
  matrix.keySignature = { sharps: 0, flats: 0 };
  matrix.measures[0].staves[STAFF_TREBLE][0] = chord(chordNotes, "quarter");
  return matrix;
}

export function iterateNotes(score) {
  const out = [];
  for (let mi = 0; mi < score.measures.length; mi++) {
    const measure = score.measures[mi];
    for (let staffId = 0; staffId < measure.staves.length; staffId++) {
      const events = measure.staves[staffId];
      for (let bi = 0; bi < events.length; bi++) {
        const ev = events[bi];
        if (!ev || !ev.notes) continue;
        for (let noteIndex = 0; noteIndex < ev.notes.length; noteIndex++) {
          out.push({
            measureIndex: mi,
            staffId,
            beatIndex: bi,
            note: ev.notes[noteIndex],
            noteIndex,
          });
        }
      }
    }
  }
  return out;
}

export { midiToNote };
