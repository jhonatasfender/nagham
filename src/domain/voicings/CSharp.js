const voicings = {
  5: [
    [4, 4],
    [3, 6],
  ],

  6: [[1, 9], [2, 10], [5, 9], { barre: 8, strings: [5, 4, 3, 2, 1] }],

  7: [[2, 10], { barre: 9, strings: [5, 3, 2, 1, 0] }],

  9: [[1, 9], [3, 9], [5, 9], { barre: 8, strings: [5, 4, 3, 2, 1] }],

  // Dominant 11 — 5th-string-root mini-barre (R, 11, ♭7, 9); omits the 3.
  11: [
    [4, 4],
    [3, 4],
    [2, 4],
    [1, 4],
  ],

  // Dominant 13 — 6th-string-root shape (R, ♭7, 3, 13). 5/9/11 omitted.
  13: [
    [5, 9],
    [3, 9],
    [2, 10],
    [1, 11],
  ],

  // Dominant 7(#9) — 5th-string-root "Hendrix" shape (R, ♭7, 3, #9).
  "9+": [
    [4, 4],
    [3, 9],
    [2, 10],
    [1, 5],
  ],

  Maj: [[1, 6], [2, 6], [3, 6], { barre: 4, strings: [4, 3, 2, 1, 0] }],

  m: [[1, 5], [2, 6], [3, 6], { barre: 4, strings: [4, 3, 2, 1, 0] }],

  dim: [
    [2, 9],
    [4, 10],
    [5, 9],
  ],

  aug: [
    [1, 10],
    [4, 8],
    [5, 9],
  ],

  sus2: [
    [2, 8],
    [4, 11],
    [5, 9],
  ],

  sus4: [
    [2, 6],
    [1, 7],
    [0, 4],
  ],

  m7: [{ barre: 9, strings: [5, 3, 2, 1, 0] }],

  maj7: [[3, 6], [2, 5], [1, 6], { barre: 4, strings: [4, 3, 2, 1, 0] }],

  "m7(b5)": [[4, 10], { barre: 9, strings: [5, 4, 3, 2, 0] }],

  dim7: [[2, 9], [4, 10], [5, 9], { barre: 8, strings: [5, 4, 3, 2, 1] }],

  m6: [[3, 8], [5, 9], { barre: 9, strings: [2, 1, 0] }],

  "6/9": [[0, 4], [1, 4], [4, 4], { barre: 3, strings: [4, 3, 2, 1, 0] }],

  maj9: [[1, 9], [5, 9], { barre: 8, strings: [5, 4, 2, 1, 0] }],

  m9: [[0, 11], { barre: 9, strings: [5, 3, 2, 1, 0] }],

  add9: [[1, 9], [3, 11], [5, 9], { barre: 8, strings: [5, 4, 3, 2, 1] }],
};

export default voicings;
