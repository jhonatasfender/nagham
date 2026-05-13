// musicca.com URL slugs por (root, quality).
//
// Slug pattern: `<root>-<quality>` (com hífens). Padrões observados no
// dicionário do musicca em maio/2026. Re-validar com fetch.mjs --probe se
// algum 404 aparecer.

const ROOT_SLUG = {
  C: "do",
  "C#": "do-sustenido",
  Db: "re-bemol",
  D: "re",
  "D#": "re-sustenido",
  Eb: "mi-bemol",
  E: "mi",
  F: "fa",
  "F#": "fa-sustenido",
  Gb: "sol-bemol",
  G: "sol",
  "G#": "sol-sustenido",
  Ab: "la-bemol",
  A: "la",
  "A#": "la-sustenido",
  Bb: "si-bemol",
  B: "si",
};

const QUALITY_SLUG = {
  Maj: "maior",
  m: "menor",
  "5": "power-chord",
  aug: "aumentado",
  sus2: "de-2a-suspensa",
  sus4: "de-4a-suspensa",
  "6": "com-6a",
  m6: "menor-com-6a",
  "7": "de-7a-dominante",
  m7: "menor-com-7a",
  maj7: "de-7a-maior",
  "m7(b5)": "meio-diminuto",
  dim7: "diminuto-com-7a",
  "6/9": "com-6a-e-9a",
  add9: "com-9a-adicionada",
  "9": "com-9a",
  m9: "menor-com-9a",
  maj9: "de-9a-maior",
  "9+": "com-9a-aumentada",
  "11": "com-11a",
  "13": "de-13a-dominante",
};

// We export (root, quality) → slug.
export function getSlug(root, quality) {
  const rootSlug = ROOT_SLUG[root];
  const qualitySlug = QUALITY_SLUG[quality];
  if (!rootSlug || !qualitySlug) return null;
  return `${rootSlug}-${qualitySlug}`;
}

export const ALL_ROOTS = Object.keys(ROOT_SLUG);
export const ALL_QUALITIES = Object.keys(QUALITY_SLUG);
