// Single source of truth for chord-quality theory.
//
// Each entry maps a quality (the internal key used in voicings and in
// ChordBuilderSection) to:
// - `tonal`: the chord-type string passed to @tonaljs/chord
// - `degrees`: ordered list of [scaleDegree, semitones-from-root] pairs.
//   `scaleDegree` is the diatonic position (1, 3, 5, 7, 9, 11, 13, plus 2
//   and 6 for sus/added chords) and drives the letter-step in spelling.
//
// Everything else is derived: list of semitones, list of pitch classes,
// number of notes per chord, etc.
//
// See docs/adr/0008-chord-qualities-single-source.md and
// docs/domain/chords.md.

export const CHORD_QUALITIES = Object.freeze({
  Maj: {
    tonal: "maj",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
    ],
  },
  m: {
    tonal: "m",
    degrees: [
      [1, 0],
      [3, 3],
      [5, 7],
    ],
  },
  5: {
    tonal: "5",
    degrees: [
      [1, 0],
      [5, 7],
    ],
  },
  m5: {
    tonal: "5",
    degrees: [
      [1, 0],
      [5, 7],
    ],
  },
  dim: {
    tonal: "dim",
    degrees: [
      [1, 0],
      [3, 3],
      [5, 6],
    ],
  },
  aug: {
    tonal: "aug",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 8],
    ],
  },
  sus2: {
    tonal: "sus2",
    degrees: [
      [1, 0],
      [2, 2],
      [5, 7],
    ],
  },
  sus4: {
    tonal: "sus4",
    degrees: [
      [1, 0],
      [4, 5],
      [5, 7],
    ],
  },
  6: {
    tonal: "6",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [6, 9],
    ],
  },
  m6: {
    tonal: "m6",
    degrees: [
      [1, 0],
      [3, 3],
      [5, 7],
      [6, 9],
    ],
  },
  "6/9": {
    tonal: "69",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [6, 9],
      [9, 14],
    ],
  },
  7: {
    tonal: "7",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [7, 10],
    ],
  },
  m7: {
    tonal: "m7",
    degrees: [
      [1, 0],
      [3, 3],
      [5, 7],
      [7, 10],
    ],
  },
  maj7: {
    tonal: "maj7",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [7, 11],
    ],
  },
  "m7(b5)": {
    tonal: "m7b5",
    degrees: [
      [1, 0],
      [3, 3],
      [5, 6],
      [7, 10],
    ],
  },
  dim7: {
    tonal: "dim7",
    degrees: [
      [1, 0],
      [3, 3],
      [5, 6],
      [7, 9],
    ],
  },
  add9: {
    tonal: "add9",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [9, 14],
    ],
  },
  9: {
    tonal: "9",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [7, 10],
      [9, 14],
    ],
  },
  maj9: {
    tonal: "maj9",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [7, 11],
      [9, 14],
    ],
  },
  m9: {
    tonal: "m9",
    degrees: [
      [1, 0],
      [3, 3],
      [5, 7],
      [7, 10],
      [9, 14],
    ],
  },
  "9+": {
    tonal: "7#9",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [7, 10],
      [9, 15],
    ],
  },
  11: {
    tonal: "11",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [7, 10],
      [9, 14],
      [11, 17],
    ],
  },
  13: {
    tonal: "13",
    degrees: [
      [1, 0],
      [3, 4],
      [5, 7],
      [7, 10],
      [9, 14],
      [11, 17],
      [13, 21],
    ],
  },
});

export function getQualityTonalType(quality) {
  return CHORD_QUALITIES[quality]?.tonal ?? null;
}

export function getQualityDegrees(quality) {
  return CHORD_QUALITIES[quality]?.degrees ?? null;
}

export function getQualityIntervals(quality) {
  const degrees = getQualityDegrees(quality);
  if (!degrees) return null;
  return degrees.map(([, semitones]) => semitones);
}

export function getQualityPitchClasses(quality) {
  const intervals = getQualityIntervals(quality);
  if (!intervals) return null;
  return intervals.map((s) => ((s % 12) + 12) % 12);
}

export const QUALITY_KEYS = Object.freeze(Object.keys(CHORD_QUALITIES));
