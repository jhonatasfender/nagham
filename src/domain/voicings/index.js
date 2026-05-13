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
import { getSlashVariations } from "../slashVoicings/index.js";

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

// ─── Read shim ──────────────────────────────────────────────────
// Accepts 3 formats for each `voicings[quality]`:
//   1. Legacy flat:    [[s,f], ..., {barre, strings}?]
//   2. Legacy nested:  [[[s,f],...], [[s,f],...]]
//   3. New (objects):  [{region, positions, barre}, ...]
// Always returns normalized: [{region, positions, barre}].
function normalizeVoicing(raw) {
  if (!raw) return [];

  if (
    Array.isArray(raw) &&
    raw.length > 0 &&
    raw[0] &&
    typeof raw[0] === "object" &&
    !Array.isArray(raw[0]) &&
    Array.isArray(raw[0].positions)
  ) {
    return raw.map((v) => {
      const out = {
        region: v.region ?? computeRegion(v.positions, v.barre),
        positions: v.positions,
        barre: v.barre ?? null,
      };
      if (v.manual === true) out.manual = true;
      return out;
    });
  }

  if (Array.isArray(raw) && Array.isArray(raw[0]) && Array.isArray(raw[0][0])) {
    return raw.map((inner) => splitPositionsAndBarre(inner));
  }

  if (Array.isArray(raw)) {
    return [splitPositionsAndBarre(raw)];
  }

  return [];
}

function splitPositionsAndBarre(items) {
  const positions = [];
  let barre = null;
  for (const item of items) {
    if (Array.isArray(item)) {
      positions.push(item);
    } else if (item && typeof item === "object" && item.barre != null) {
      barre = { fret: item.barre, strings: item.strings ?? [] };
    }
  }
  return {
    region: computeRegion(positions, barre),
    positions,
    barre,
  };
}

function computeRegion(positions, barre) {
  if (!positions.length && !barre) return "open";
  const frettedFrets = positions.map(([, f]) => f).filter((f) => f > 0);
  const hasOpenString = positions.some(([, f]) => f === 0);
  const minFretted = frettedFrets.length ? Math.min(...frettedFrets) : Infinity;
  const minBarre = barre?.fret ?? Infinity;
  const minOverall = Math.min(minFretted, minBarre);
  if (hasOpenString || minOverall <= 1) return "open";
  return `fret-${minOverall}`;
}

// ─── Public API ─────────────────────────────────────────────────

// `bass` is optional. When set to a note distinct from `root` and we have
// slash chord variations for (root, quality, bass), those are returned.
// Otherwise we fall back to the regular voicings so the UI still renders
// a shape even for slash combos not covered by chords-db.
function getRegularVariations(root, quality) {
  const rootVoicings = VOICINGS_BY_ROOT[root];
  if (!rootVoicings) return [];
  return normalizeVoicing(rootVoicings[resolveVoicingQuality(quality)]);
}

export function getChordVariations(root, quality, bass = null) {
  if (bass && bass !== root) {
    const slash = getSlashVariations(root, quality, bass);
    if (slash.length > 0) return slash;
  }
  return getRegularVariations(root, quality);
}

function pickVariation(root, quality, variationIndex, bass) {
  const variations = getChordVariations(root, quality, bass);
  if (!variations.length) return null;
  const idx =
    variationIndex >= 0 && variationIndex < variations.length
      ? variationIndex
      : 0;
  return variations[idx];
}

export function getChordVoicing(root, quality, variationIndex = 0, bass = null) {
  const v = pickVariation(root, quality, variationIndex, bass);
  if (!v) return null;
  return v.positions.map(([stringIndex, fret]) => ({ stringIndex, fret }));
}

export function getBarreFromVoicing(
  root,
  quality,
  variationIndex = 0,
  bass = null
) {
  const v = pickVariation(root, quality, variationIndex, bass);
  return v?.barre ?? null;
}

export function getChordVoicingCount(root, quality, bass = null) {
  return getChordVariations(root, quality, bass).length;
}

export function getVariationRegionLabelKey(region) {
  if (region === "open") return { key: "voicings.region.open", params: {} };
  const m = /^fret-(\d+)$/.exec(region ?? "");
  if (m) {
    return {
      key: "voicings.region.fret",
      params: { n: parseInt(m[1], 10) },
    };
  }
  return { key: "voicings.region.open", params: {} };
}
