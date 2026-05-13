import A from "./A.js";
import Ab from "./Ab.js";
import B from "./B.js";
import Bb from "./Bb.js";
import C from "./C.js";
import CSharp from "./CSharp.js";
import D from "./D.js";
import E from "./E.js";
import Eb from "./Eb.js";
import F from "./F.js";
import FSharp from "./FSharp.js";
import G from "./G.js";
import { resolveVoicingQuality } from "../voicingQualityAlias.js";

// Cobertura: chord-db indexa 12 raízes. Aliasing pra raízes enarmônicas:
//   C# ↔ Db, D# ↔ Eb, F# ↔ Gb, G# ↔ Ab, A# ↔ Bb.
const SLASH_BY_ROOT = {
  C,
  "C#": CSharp,
  Db: CSharp,
  D,
  "D#": Eb,
  Eb,
  E,
  F,
  "F#": FSharp,
  Gb: FSharp,
  G,
  "G#": Ab,
  Ab,
  A,
  "A#": Bb,
  Bb,
  B,
};

// chord-db tem qualidades base: Maj, m, m9, 7. Não há overlap com aliases
// adicionais por enquanto, então só normaliza.
function resolveBassName(bass) {
  return bass;
}

function getQualityMap(root, quality) {
  const rootMap = SLASH_BY_ROOT[root];
  if (!rootMap) return null;
  return rootMap[resolveVoicingQuality(quality)] ?? null;
}

export function getSlashVariations(root, quality, bass) {
  if (!bass || bass === root) return [];
  const qualityMap = getQualityMap(root, quality);
  if (!qualityMap) return [];
  const variations = qualityMap[resolveBassName(bass)];
  return Array.isArray(variations) ? variations : [];
}

export function getSlashVoicingCount(root, quality, bass) {
  return getSlashVariations(root, quality, bass).length;
}

export function hasSlashVariations(root, quality, bass) {
  return getSlashVoicingCount(root, quality, bass) > 0;
}

export function getAvailableBasses(root, quality) {
  const qualityMap = getQualityMap(root, quality);
  if (!qualityMap) return [];
  return Object.keys(qualityMap);
}
