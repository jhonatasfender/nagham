import {
  NOTE_NAMES,
  NOTE_NAMES_FLATS,
  pitchNameToPitchClass,
} from "./notes";
import { formatQualitySuffix } from "./chordSymbol";

const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_NATURAL_PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };

const INTERVAL_SEMITONES_12TET = Object.freeze({
  minorThird: 3,
  majorThird: 4,
  diminishedFifth: 6,
  perfectFifth: 7,
  augmentedFifth: 8,
});

const STEP_WIDTH_SEMITONES = Object.freeze({
  halfStep: 1,
  wholeStep: 2,
  wholePlusHalf: 3,
});

const TriadQuality = Object.freeze({
  major: "major",
  minor: "minor",
  dim: "dim",
  aug: "aug",
  other: "other",
});

// `letterSteps` defines how many letter positions each note is from the
// tonic letter (0-indexed). 7-note scales default to [0,1,2,3,4,5,6]
// (one per letter); pentatonic/hexatonic scales need explicit steps so
// the spelling preserves traditional naming (e.g. blues uses two letters
// of position 3 for the "blue note" + perfect 4th, not three different
// letters).
export const SCALE_DEFINITIONS = [
  { id: "major-ionian", semitones: [0, 2, 4, 5, 7, 9, 11] },
  { id: "natural-minor", semitones: [0, 2, 3, 5, 7, 8, 10] },
  { id: "harmonic-minor", semitones: [0, 2, 3, 5, 7, 8, 11] },
  { id: "melodic-minor", semitones: [0, 2, 3, 5, 7, 9, 11] },
  { id: "dorian", semitones: [0, 2, 3, 5, 7, 9, 10] },
  { id: "phrygian", semitones: [0, 1, 3, 5, 7, 8, 10] },
  { id: "lydian", semitones: [0, 2, 4, 6, 7, 9, 11] },
  { id: "mixolydian", semitones: [0, 2, 4, 5, 7, 9, 10] },
  { id: "locrian", semitones: [0, 1, 3, 5, 6, 8, 10] },
  {
    id: "major-pentatonic",
    semitones: [0, 2, 4, 7, 9],
    letterSteps: [0, 1, 2, 4, 5],
  },
  {
    id: "minor-pentatonic",
    semitones: [0, 3, 5, 7, 10],
    letterSteps: [0, 2, 3, 4, 6],
  },
  {
    id: "blues",
    semitones: [0, 3, 5, 6, 7, 10],
    letterSteps: [0, 2, 3, 3, 4, 6],
  },
  {
    id: "chinese-pentatonic",
    semitones: [0, 2, 4, 7, 9],
    letterSteps: [0, 1, 2, 4, 5],
  },
  {
    id: "hirajoshi",
    semitones: [0, 2, 3, 7, 8],
    letterSteps: [0, 1, 2, 4, 5],
    approximate12Tet: true,
  },
  { id: "hungarian-minor", semitones: [0, 2, 3, 6, 7, 8, 11] },
  {
    id: "arabic-maqam",
    semitones: [0, 1, 3, 5, 7, 8, 10],
    approximate12Tet: true,
  },
  {
    id: "thaat-raga-framework",
    semitones: null,
    conceptualOnly: true,
  },
  { id: "pelog", semitones: null, conceptualOnly: true },
  { id: "slendro", semitones: null, conceptualOnly: true },
];

export function scaleRoots(useFlats = false) {
  return useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
}

export function getScaleDefinition(scaleId) {
  return (
    SCALE_DEFINITIONS.find((definition) => definition.id === scaleId) || null
  );
}

function accidentalToken(offset) {
  if (offset === 0) return "";
  if (offset > 0) return "#".repeat(offset);
  return "b".repeat(-offset);
}

function defaultLetterSteps(semitones) {
  if (semitones.length === 7) return [0, 1, 2, 3, 4, 5, 6];
  // For unknown shapes, derive a best-effort letter step from each
  // semitone — this only matters as a fallback; the SCALE_DEFINITIONS
  // entries below provide explicit letterSteps for the 5/6-note shapes.
  return semitones.map((s) => {
    const guess = Math.round(s / 2);
    return ((guess % 7) + 7) % 7;
  });
}

// Spells a scale by walking through the tonic's letter sequence and
// computing the accidental needed on each letter so the audible pitch
// matches the requested semitone interval. Falls back to the chromatic
// spelling row if the tonic's letter cannot be parsed.
export function buildScaleNotes(root, semitones, useFlats = false, options = {}) {
  if (!Array.isArray(semitones) || semitones.length === 0) return [];
  const tonicPitchClass = pitchNameToPitchClass(root);
  if (tonicPitchClass == null) return [];

  const rootLetter = root[0];
  const rootLetterIdx = LETTERS.indexOf(rootLetter);
  if (rootLetterIdx === -1) {
    const spellingRow = useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
    return semitones.map(
      (intervalFromTonic) =>
        spellingRow[(tonicPitchClass + intervalFromTonic) % 12],
    );
  }

  const letterSteps = options.letterSteps ?? defaultLetterSteps(semitones);

  return semitones.map((intervalFromTonic, idx) => {
    const letterStep = letterSteps[idx] ?? 0;
    const targetLetter = LETTERS[(rootLetterIdx + letterStep) % 7];
    const naturalPc = LETTER_NATURAL_PC[targetLetter];
    const targetPc = (tonicPitchClass + intervalFromTonic) % 12;
    let offset = targetPc - naturalPc;
    while (offset > 6) offset -= 12;
    while (offset < -6) offset += 12;
    return targetLetter + accidentalToken(offset);
  });
}

function triadQualityFromIntervals(thirdSemitones, fifthSemitones) {
  const {
    minorThird,
    majorThird,
    diminishedFifth,
    perfectFifth,
    augmentedFifth,
  } = INTERVAL_SEMITONES_12TET;
  if (thirdSemitones === majorThird && fifthSemitones === perfectFifth) {
    return TriadQuality.major;
  }
  if (thirdSemitones === minorThird && fifthSemitones === perfectFifth) {
    return TriadQuality.minor;
  }
  if (thirdSemitones === minorThird && fifthSemitones === diminishedFifth) {
    return TriadQuality.dim;
  }
  if (thirdSemitones === majorThird && fifthSemitones === augmentedFifth) {
    return TriadQuality.aug;
  }
  return TriadQuality.other;
}

const TRIAD_QUALITY_TO_CHORD_KEY = {
  [TriadQuality.major]: "Maj",
  [TriadQuality.minor]: "m",
  [TriadQuality.dim]: "dim",
  [TriadQuality.aug]: "aug",
};

function formatTriadLabel(rootNoteName, triadQuality) {
  const chordKey = TRIAD_QUALITY_TO_CHORD_KEY[triadQuality];
  if (!chordKey) return `${rootNoteName}(?)`;
  return `${rootNoteName}${formatQualitySuffix(chordKey)}`;
}

export function buildScaleDegreeTriads(
  root,
  semitones,
  useFlats = false,
  options = {}
) {
  const scaleSpellings = buildScaleNotes(root, semitones, useFlats, options);
  const degreeCount = scaleSpellings.length;
  if (degreeCount < 3) return [];

  const triadLabels = [];
  for (let degreeIndex = 0; degreeIndex < degreeCount; degreeIndex += 1) {
    const rootSpelling = scaleSpellings[degreeIndex];
    const thirdSpelling = scaleSpellings[(degreeIndex + 2) % degreeCount];
    const fifthSpelling = scaleSpellings[(degreeIndex + 4) % degreeCount];
    const rootPitchClass = pitchNameToPitchClass(rootSpelling);
    const thirdPitchClass = pitchNameToPitchClass(thirdSpelling);
    const fifthPitchClass = pitchNameToPitchClass(fifthSpelling);
    if (
      rootPitchClass == null ||
      thirdPitchClass == null ||
      fifthPitchClass == null
    ) {
      triadLabels.push(`${rootSpelling}(?)`);
      continue;
    }
    const thirdSemitones = (thirdPitchClass - rootPitchClass + 12) % 12;
    const fifthSemitones = (fifthPitchClass - rootPitchClass + 12) % 12;
    triadLabels.push(
      formatTriadLabel(
        rootSpelling,
        triadQualityFromIntervals(thirdSemitones, fifthSemitones)
      )
    );
  }
  return triadLabels;
}

const AEOLIAN_MINOR_SEMITONES = [0, 2, 3, 5, 7, 8, 10];
const MELODIC_MINOR_ASC_SEMITONES = [0, 2, 3, 5, 7, 9, 11];
const SUPERTONIC_DEGREE_INDEX = 1;

export function buildNaturalMinorTriadsWithBorrowedSixth(root, useFlats) {
  const aeolianSpellings = buildScaleNotes(
    root,
    AEOLIAN_MINOR_SEMITONES,
    useFlats
  );
  const melodicAscSpellings = buildScaleNotes(
    root,
    MELODIC_MINOR_ASC_SEMITONES,
    useFlats
  );
  const degreeCount = aeolianSpellings.length;
  if (degreeCount !== 7 || melodicAscSpellings.length !== 7) return [];

  const triadLabels = [];
  for (let degreeIndex = 0; degreeIndex < degreeCount; degreeIndex += 1) {
    const rootSpelling = aeolianSpellings[degreeIndex];
    const thirdSpelling = aeolianSpellings[(degreeIndex + 2) % degreeCount];
    const fifthSpelling =
      degreeIndex === SUPERTONIC_DEGREE_INDEX
        ? melodicAscSpellings[(degreeIndex + 4) % degreeCount]
        : aeolianSpellings[(degreeIndex + 4) % degreeCount];
    const rootPitchClass = pitchNameToPitchClass(rootSpelling);
    const thirdPitchClass = pitchNameToPitchClass(thirdSpelling);
    const fifthPitchClass = pitchNameToPitchClass(fifthSpelling);
    if (
      rootPitchClass == null ||
      thirdPitchClass == null ||
      fifthPitchClass == null
    ) {
      triadLabels.push(`${rootSpelling}(?)`);
      continue;
    }
    const thirdSemitones = (thirdPitchClass - rootPitchClass + 12) % 12;
    const fifthSemitones = (fifthPitchClass - rootPitchClass + 12) % 12;
    triadLabels.push(
      formatTriadLabel(
        rootSpelling,
        triadQualityFromIntervals(thirdSemitones, fifthSemitones)
      )
    );
  }
  return triadLabels;
}

export function buildScalesTableTriads(
  root,
  { showTriadsColumn, scaleId, semitones, useFlats, letterSteps }
) {
  if (!showTriadsColumn) {
    return [];
  }
  if (scaleId === "natural-minor") {
    return buildNaturalMinorTriadsWithBorrowedSixth(root, useFlats);
  }
  return buildScaleDegreeTriads(root, semitones, useFlats, { letterSteps });
}

function semitoneStepLabel(stepWidthSemitones) {
  const { halfStep, wholeStep, wholePlusHalf } = STEP_WIDTH_SEMITONES;
  if (stepWidthSemitones === halfStep) return "S";
  if (stepWidthSemitones === wholeStep) return "T";
  if (stepWidthSemitones === wholePlusHalf) return "T+S";
  return `${stepWidthSemitones}st`;
}

export function buildStepPattern(semitones) {
  if (!Array.isArray(semitones) || semitones.length < 2) return [];
  const semitonesThroughOctave = [...semitones, 12];
  const adjacentStepWidths = [];
  for (
    let stepIndex = 0;
    stepIndex < semitonesThroughOctave.length - 1;
    stepIndex += 1
  ) {
    adjacentStepWidths.push(
      semitonesThroughOctave[stepIndex + 1] - semitonesThroughOctave[stepIndex]
    );
  }
  return adjacentStepWidths.map(semitoneStepLabel);
}
