export const AUTO_ROOTS = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

export function isFlatRoot(root) {
  return root.includes("b");
}

const HARD_ENHARMONIC_MAP = {
  Cbb: "Bb",
  Fbb: "Eb",
  "C##": "D",
  "D##": "E",
  "F##": "G",
  "G##": "A",
  "A##": "B",
  "E##": "F#",
  "B##": "C#",
  "E#": "F",
  "B#": "C",
  Cb: "B",
  Fb: "E",
};

const HARD_ENHARMONIC_RE = /Cbb|Fbb|C##|D##|F##|G##|A##|E##|B##|E#|B#|Cb|Fb/g;

export function simplifyHardEnharmonics(text) {
  return text.replace(HARD_ENHARMONIC_RE, (m) => HARD_ENHARMONIC_MAP[m] ?? m);
}
