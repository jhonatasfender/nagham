// Determines each string's play state from chord data, and centralizes the
// "open / muted / fretted / barre" decision so both the horizontal fretboard
// (drawDots) and the compact chord card (drawChordCard) render consistently.

export const STRING_STATE = Object.freeze({
  OPEN: "open",
  MUTED: "muted",
  FRETTED: "fretted",
  BARRE: "barre",
});

/**
 * Returns a Map from stringIndex → STRING_STATE.
 *
 * @param {object} args
 * @param {Set<string>|Iterable<string>} [args.chordKeys] - Keys like "string-fret".
 * @param {Array<[number, number]>} [args.positions] - Alternative input: list of [s,f] pairs.
 * @param {{fret: number, strings: number[]}|null} [args.barre]
 * @param {number} [args.stringCount=6]
 */
export function computeStringStates({
  chordKeys,
  positions,
  barre,
  stringCount = 6,
}) {
  const states = new Map();
  const stringFrets = new Map(); // stringIndex → array of frets

  if (positions) {
    for (const [s, f] of positions) {
      if (!stringFrets.has(s)) stringFrets.set(s, []);
      stringFrets.get(s).push(f);
    }
  } else if (chordKeys) {
    for (const key of chordKeys) {
      const [sRaw, fRaw] = key.split("-");
      const s = Number(sRaw);
      const f = Number(fRaw);
      if (Number.isNaN(s) || Number.isNaN(f)) continue;
      if (!stringFrets.has(s)) stringFrets.set(s, []);
      stringFrets.get(s).push(f);
    }
  }

  const barreStrings = new Set(barre?.strings ?? []);

  for (let s = 0; s < stringCount; s++) {
    const frets = stringFrets.get(s) ?? [];
    const onBarre = barreStrings.has(s);

    // A string is "barre" only if it has NO independent fingered note
    // outside the barre fret. If it has any fret > barre.fret (a fingered
    // note above), treat it as "fretted" (the higher note is what sounds).
    if (onBarre && frets.every((f) => f === 0 || f === barre.fret)) {
      states.set(s, STRING_STATE.BARRE);
      continue;
    }

    if (frets.some((f) => f > 0)) {
      states.set(s, STRING_STATE.FRETTED);
      continue;
    }

    if (frets.some((f) => f === 0)) {
      states.set(s, STRING_STATE.OPEN);
      continue;
    }

    states.set(s, STRING_STATE.MUTED);
  }

  return states;
}
