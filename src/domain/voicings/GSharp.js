const voicings = {
  5: [
    [5, 4],
    [4, 6],
  ],

  6: [[1, 4], [2, 5], [5, 4], { barre: 3, strings: [5, 4, 3, 2, 1] }],

  7: [[2, 5], { barre: 4, strings: [5, 3, 2, 1, 0] }],

  9: [[1, 4], [3, 4], [5, 4], { barre: 3, strings: [5, 4, 3, 2, 1] }],

  // Dominant 11 — 5th-string-root mini-barre (R, 11, ♭7, 9); omits the 3.
  11: [
    [4, 11],
    [3, 11],
    [2, 11],
    [1, 11],
  ],

  // Dominant 13 — 6th-string-root shape (R, ♭7, 3, 13). 5/9/11 omitted.
  13: [
    [5, 4],
    [3, 4],
    [2, 5],
    [1, 6],
  ],

  // Dominant 7(#9) — 6th-string-root "Hendrix" shape (R, ♭7, 3, #9).
  "9+": [
    [5, 4],
    [3, 4],
    [2, 5],
    [0, 7],
  ],

  Maj: [[2, 5], [3, 6], [4, 6], { barre: 4, strings: [5, 4, 3, 2, 1, 0] }],

  m: [[4, 6], { barre: 4, strings: [5, 4, 2, 1, 0] }],

  dim: [
    [2, 4],
    [4, 5],
    [5, 4],
  ],

  aug: [
    [1, 5],
    [4, 3],
    [5, 4],
  ],

  sus2: [
    [2, 3],
    [4, 6],
    [5, 4],
  ],

  sus4: [[3, 6], { barre: 4, strings: [5, 4, 3, 1, 0] }],

  m7: [{ barre: 4, strings: [5, 3, 2, 1, 0] }],

  maj7: [[4, 3], [0, 3], { barre: 1, strings: [4, 3, 2, 1, 0] }],

  "m7(b5)": [[4, 5], { barre: 4, strings: [5, 4, 3, 2, 0] }],

  dim7: [[2, 4], [4, 5], [5, 4], { barre: 3, strings: [5, 4, 3, 2, 1] }],

  m6: [[3, 3], [5, 4], { barre: 4, strings: [2, 1, 0] }],

  "6/9": [[1, 4], [5, 4], { barre: 3, strings: [5, 4, 3, 2, 1] }],

  maj9: [[1, 4], [5, 4], { barre: 3, strings: [5, 4, 2, 1, 0] }],

  m9: [[0, 6], { barre: 4, strings: [5, 3, 2, 1, 0] }],

  add9: [[1, 4], [3, 6], [5, 4], { barre: 3, strings: [5, 4, 3, 2, 1] }],
};

export default voicings;
