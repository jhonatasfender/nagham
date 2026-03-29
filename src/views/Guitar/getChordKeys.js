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
  quality
) {
  if (isEditor && customPositions) {
    return new Set(
      customPositions.map(([stringIndex, fret]) => `${stringIndex}-${fret}`)
    );
  } else if (chordNotes?.length && root && quality) {
    const basicVoicing = getBasicChordVoicing(root, quality);
    if (basicVoicing) {
      const keys = new Set(
        basicVoicing.map((p) => `${p.stringIndex}-${p.fret}`)
      );

      const barre = getBarreFromVoicing(root, quality);
      if (barre && barre.strings) {
        barre.strings.forEach((stringIndex) => {
          keys.add(`${stringIndex}-${barre.fret}`);
        });
      }

      return keys;
    } else {
      return getChordPositionKeys(chordNotes);
    }
  } else if (chordNotes?.length) {
    return getChordPositionKeys(chordNotes);
  } else {
    return getTriadChordShape();
  }
}
