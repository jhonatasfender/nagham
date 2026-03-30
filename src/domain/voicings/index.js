import CDefault from "./C.js";
const C = CDefault;
import DDefault from "./D.js";
const D = DDefault;
import EDefault from "./E.js";
const E = EDefault;
import FDefault from "./F.js";
const F = FDefault;
import FSharpDefault from "./FSharp.js";
const FSharp = FSharpDefault;
import GDefault from "./G.js";
const G = GDefault;
import GSharpDefault from "./GSharp.js";
const GSharp = GSharpDefault;
import ADefault from "./A.js";
const A = ADefault;
import ASharpDefault from "./ASharp.js";
const ASharp = ASharpDefault;
import BDefault from "./B.js";
const B = BDefault;
import CSharpDefault from "./CSharp.js";
const CSharp = CSharpDefault;
import DSharpDefault from "./DSharp.js";
const DSharp = DSharpDefault;
import { resolveVoicingQuality } from "../voicingQualityAlias.js";

const VOICINGS_BY_ROOT = {
  C,
  "C#": CSharp,
  D,
  "D#": DSharp,
  E,
  F,
  "F#": FSharp,
  Gb: FSharp,
  G,
  "G#": GSharp,
  Ab: GSharp,
  A,
  "A#": ASharp,
  Bb: ASharp,
  B,
};

export function getChordVoicing(root, quality, positionIndex = 0) {
  const rootVoicings = VOICINGS_BY_ROOT[root];
  if (!rootVoicings) return null;

  const voicing = rootVoicings[resolveVoicingQuality(quality)];
  if (!voicing) return null;

  if (Array.isArray(voicing[0]) && Array.isArray(voicing[0][0])) {
    const positions = voicing;
    if (positionIndex >= 0 && positionIndex < positions.length) {
      return positions[positionIndex]
        .filter((item) => Array.isArray(item))
        .map(([stringIndex, fret]) => ({
          stringIndex,
          fret,
        }));
    }
    return positions[0]
      .filter((item) => Array.isArray(item))
      .map(([stringIndex, fret]) => ({ stringIndex, fret }));
  }

  if (Array.isArray(voicing)) {
    return voicing
      .filter((item) => Array.isArray(item))
      .map(([stringIndex, fret]) => ({ stringIndex, fret }));
  }

  return null;
}

export function getBarreFromVoicing(root, quality) {
  const rootVoicings = VOICINGS_BY_ROOT[root];
  if (!rootVoicings) return null;

  const voicing = rootVoicings[resolveVoicingQuality(quality)];
  if (!voicing) return null;

  let voicingArray;
  if (Array.isArray(voicing[0]) && Array.isArray(voicing[0][0])) {
    voicingArray = voicing[0];
  } else if (Array.isArray(voicing)) {
    voicingArray = voicing;
  } else {
    return null;
  }

  const barreObj = voicingArray.find(
    (item) => item && typeof item === "object" && item.barre
  );

  if (barreObj && barreObj.barre) {
    return {
      fret: barreObj.barre,
      strings: barreObj.strings || [],
    };
  }

  return null;
}

export function getChordVoicingCount(root, quality) {
  const rootVoicings = VOICINGS_BY_ROOT[root];
  if (!rootVoicings) return 0;

  const voicing = rootVoicings[resolveVoicingQuality(quality)];
  if (!voicing) return 0;

  if (Array.isArray(voicing[0]) && Array.isArray(voicing[0][0])) {
    return voicing.length;
  }

  return 1;
}
