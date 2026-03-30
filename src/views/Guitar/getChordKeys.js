import {
  getTriadChordShape,
  getBasicChordVoicing,
} from "../../domain/fretboardMatrix";
import { getBarreFromVoicing } from "../../domain/voicings";
import { getChordPositionKeys } from "./chordUtils";

export function getChordKeys(
  isEditor,
  customPositions,
  chordNotes,
  root,
  quality,
  visibleFrets
) {
  if (isEditor && customPositions) {
    return new Set(
      customPositions.map(([stringIndex, fret]) => `${stringIndex}-${fret}`)
    );
  }
  if (chordNotes?.length && root && quality) {
    const basicVoicing = getBasicChordVoicing(root, quality);
    if (basicVoicing) {
      const keys = new Set(
        basicVoicing.map((p) => `${p.stringIndex}-${p.fret}`)
      );

      const barre = getBarreFromVoicing(root, quality);
      if (barre?.strings) {
        barre.strings.forEach((stringIndex) => {
          keys.add(`${stringIndex}-${barre.fret}`);
        });
      }

      return keys;
    }
    return getChordPositionKeys(chordNotes, visibleFrets);
  }
  if (chordNotes?.length) {
    return getChordPositionKeys(chordNotes, visibleFrets);
  }
  return getTriadChordShape();
}
