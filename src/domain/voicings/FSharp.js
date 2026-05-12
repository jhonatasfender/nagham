const voicings = {
  5: [
    [4, 4],
    [5, 2],
  ],

  6: [[1, 2], [2, 3], [5, 2], { barre: 1, strings: [5, 4, 3, 2, 1] }],

  7: [[2, 3], { barre: 2, strings: [5, 3, 2, 1, 0] }],

  9: [[1, 2], [3, 2], [5, 2], { barre: 1, strings: [5, 4, 3, 2, 1] }],

  // Dominant 11 — 5th-string-root mini-barre (R, 11, ♭7, 9); omits the 3.
  11: [
    [4, 9],
    [3, 9],
    [2, 9],
    [1, 9],
  ],

  // Dominant 13 — 6th-string-root shape (R, ♭7, 3, 13). 5/9/11 omitted.
  13: [
    [5, 2],
    [3, 2],
    [2, 3],
    [1, 4],
  ],

  // Dominant 7(#9) — 6th-string-root "Hendrix" shape (R, ♭7, 3, #9).
  "9+": [
    [5, 2],
    [3, 2],
    [2, 3],
    [0, 5],
  ],

  Maj: [[2, 3], [3, 4], [4, 4], { barre: 2, strings: [5, 4, 3, 2, 1, 0] }],

  m: [[4, 4], { barre: 2, strings: [5, 4, 2, 1, 0] }],

  dim: [
    [2, 2],
    [4, 3],
    [5, 2],
  ],

  aug: [
    [1, 3],
    [4, 1],
    [5, 2],
  ],

  sus2: [
    [2, 1],
    [4, 4],
    [5, 2],
  ],

  sus4: [[3, 4], { barre: 2, strings: [5, 4, 3, 1, 0] }],

  m7: [{ barre: 2, strings: [5, 3, 2, 1, 0] }],

  maj7: [[2, 3], [3, 3], [4, 4], { barre: 2, strings: [5, 4, 3, 2, 1] }],

  "m7(b5)": [[4, 3], { barre: 2, strings: [5, 4, 3, 2, 0] }],

  dim7: [[2, 2], [4, 3], [5, 2], { barre: 1, strings: [5, 4, 3, 2, 1] }],

  m6: [[3, 1], [5, 2], { barre: 2, strings: [2, 1, 0] }],

  "6/9": [[1, 2], [5, 2], { barre: 1, strings: [5, 4, 3, 2, 1] }],

  maj9: [[1, 2], [5, 2], { barre: 1, strings: [5, 4, 2, 1, 0] }],

  m9: [[0, 4], { barre: 2, strings: [5, 3, 2, 1, 0] }],

  add9: [[1, 2], [3, 4], [5, 2], { barre: 1, strings: [5, 4, 3, 2, 1] }],
};

export default voicings;
