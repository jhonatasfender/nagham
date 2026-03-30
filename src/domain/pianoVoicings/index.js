import CDefault from "./C.js";
const C = CDefault;
import DDefault from "./D.js";
const D = DDefault;
import EDefault from "./E.js";
const E = EDefault;
import FDefault from "./F.js";
const F = FDefault;
import GDefault from "./G.js";
const G = GDefault;
import ADefault from "./A.js";
const A = ADefault;
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
  G,
  A,
  B,
};

export function getPianoChordVoicing(root, quality, positionIndex = 0) {
  const rootVoicings = VOICINGS_BY_ROOT[root];
  if (!rootVoicings) return null;

  const voicing = rootVoicings[resolveVoicingQuality(quality)];
  if (!voicing) return null;

  if (Array.isArray(voicing[0]) && Array.isArray(voicing[0][0])) {
    const positions = voicing;
    if (positionIndex >= 0 && positionIndex < positions.length) {
      return positions[positionIndex];
    }
    return positions[0];
  }

  if (Array.isArray(voicing)) {
    return voicing;
  }

  return null;
}

export function getPianoChordVoicingCount(root, quality) {
  const rootVoicings = VOICINGS_BY_ROOT[root];
  if (!rootVoicings) return 0;

  const voicing = rootVoicings[resolveVoicingQuality(quality)];
  if (!voicing) return 0;

  if (Array.isArray(voicing[0]) && Array.isArray(voicing[0][0])) {
    return voicing.length;
  }

  return 1;
}
