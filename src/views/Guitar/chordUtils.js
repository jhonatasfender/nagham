import { getAllPositionsForNote } from "../../domain/guitar";
import { DEFAULT_VISIBLE_FRETS } from "./constants";

export function getChordPositionKeys(
  chordNotes,
  visibleFrets = DEFAULT_VISIBLE_FRETS
) {
  const set = new Set();
  if (!chordNotes?.length) return set;
  const visibleFretSet = new Set(visibleFrets);
  const bestPositionByString = new Map();

  for (const { name, octave } of chordNotes) {
    getAllPositionsForNote(name, octave).forEach((p) => {
      if (visibleFretSet.has(p.fret)) {
        const currentBest = bestPositionByString.get(p.stringIndex);
        if (!currentBest || p.fret < currentBest.fret) {
          bestPositionByString.set(p.stringIndex, p);
        }
      }
    });
  }

  bestPositionByString.forEach((p) => {
    set.add(`${p.stringIndex}-${p.fret}`);
  });

  return set;
}

export function detectBarre(chordKeys, maxFret = 12) {
  const positionsByFret = new Map();

  chordKeys.forEach((key) => {
    const [stringIndex, fret] = key.split("-").map(Number);
    if (fret > 0 && fret <= maxFret) {
      if (!positionsByFret.has(fret)) {
        positionsByFret.set(fret, []);
      }
      positionsByFret.get(fret).push(stringIndex);
    }
  });

  for (const [fret, strings] of positionsByFret) {
    if (strings.length >= 3) {
      const sortedStrings = [...strings].sort((a, b) => a - b);
      return { fret, strings: sortedStrings };
    }
  }

  return null;
}
