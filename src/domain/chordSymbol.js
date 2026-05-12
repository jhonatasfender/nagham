// Single source of truth for how each chord quality renders as a suffix.
// Quality names match the keys used in QUALITY_TO_TONAL (chord.js) and
// CHORD_QUALITIES_REST (constants.js).
//
// Style: ASCII text — see docs/adr/0006-ascii-text-chord-symbol-style.md.
// The chord builder, the chord-label bar, the picker chips and the
// scale-degree triads all read from this table.
export const QUALITY_SUFFIX = {
  Maj: "",
  m: "m",
  5: "5",
  m5: "5",
  dim: "dim",
  aug: "aug",
  sus2: "sus2",
  sus4: "sus4",
  6: "6",
  m6: "m6",
  "6/9": "6/9",
  7: "7",
  m7: "m7",
  maj7: "maj7",
  "m7(b5)": "m7(b5)",
  dim7: "dim",
  add9: "add9",
  9: "9",
  maj9: "maj9",
  m9: "m9",
  "9+": "7(#9)",
  11: "11",
  13: "13",
};

export function formatQualitySuffix(quality) {
  if (quality == null) return "";
  return Object.prototype.hasOwnProperty.call(QUALITY_SUFFIX, quality)
    ? QUALITY_SUFFIX[quality]
    : quality;
}

export function formatChordSymbol({ root, quality, bass = null }) {
  if (!root) return "";
  const suffix = formatQualitySuffix(quality);
  const main = suffix ? `${root}${suffix}` : root;
  if (bass && bass !== root) {
    return `${main}/${bass}`;
  }
  return main;
}
