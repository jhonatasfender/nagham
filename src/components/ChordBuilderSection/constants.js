export const CHORD_QUALITY_TRIAD = ["Maj", "m"];

export const CHORD_QUALITIES_REST = [
  "5",
  "dim",
  "aug",
  "sus2",
  "sus4",
  "2",
  "6",
  "7",
  "9",
  "9+",
  "maj7",
  "m7(b5)",
  "dim7",
  "add9",
  "maj9",
  "11",
  "13",
];

export const TRIAD_I18N_KEY = {
  Maj: "chordBuilder.triadMajor",
  m: "chordBuilder.triadMinor",
};

export function extensionChipLabel(quality) {
  if (quality === "maj9") return "M9";
  return quality;
}
