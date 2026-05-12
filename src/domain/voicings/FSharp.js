const voicings = {

  "5": [
  {
    region: "fret-2",
    positions: [
      [4, 4],
      [5, 2],
    ],
    barre: null,
  },
  ],

  "6": [
  {
    region: "open",
    positions: [
      [1, 2],
      [2, 3],
      [5, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "7": [
  {
    region: "fret-2",
    positions: [
      [2, 3],
    ],
    barre: { fret: 2, strings: [5, 3, 2, 1, 0] },
  },
  ],

  "9": [
  {
    region: "open",
    positions: [
      [1, 2],
      [3, 2],
      [5, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "11": [
  {
    region: "fret-9",
    positions: [
      [4, 9],
      [3, 9],
      [2, 9],
      [1, 9],
    ],
    barre: null,
  },
  ],

  "13": [
  {
    region: "fret-2",
    positions: [
      [5, 2],
      [3, 2],
      [2, 3],
      [1, 4],
    ],
    barre: null,
  },
  ],

  Maj: [
  {
    region: "fret-2",
    positions: [
      [2, 3],
      [3, 4],
      [4, 4],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 1, 0] },
  },
  ],

  m: [
  {
    region: "fret-2",
    positions: [
      [4, 4],
    ],
    barre: { fret: 2, strings: [5, 4, 2, 1, 0] },
  },
  ],

  dim: [
  {
    region: "fret-2",
    positions: [
      [2, 2],
      [4, 3],
      [5, 2],
    ],
    barre: null,
  },
  ],

  aug: [
  {
    region: "open",
    positions: [
      [1, 3],
      [4, 1],
      [5, 2],
    ],
    barre: null,
  },
  ],

  sus2: [
  {
    region: "open",
    positions: [
      [2, 1],
      [4, 4],
      [5, 2],
    ],
    barre: null,
  },
  ],

  sus4: [
  {
    region: "fret-2",
    positions: [
      [3, 4],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 1, 0] },
  },
  ],

  m6: [
  {
    region: "open",
    positions: [
      [3, 1],
      [5, 2],
    ],
    barre: { fret: 2, strings: [2, 1, 0] },
  },
  ],

  "6/9": [
  {
    region: "open",
    positions: [
      [1, 2],
      [5, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 2, 1] },
  },
  ],

  m7: [
  {
    region: "fret-2",
    positions: [

    ],
    barre: { fret: 2, strings: [5, 3, 2, 1, 0] },
  },
  ],

  maj7: [
  {
    region: "fret-2",
    positions: [
      [2, 3],
      [3, 3],
      [4, 4],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "m7(b5)": [
  {
    region: "fret-2",
    positions: [
      [4, 3],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 0] },
  },
  ],

  dim7: [
  {
    region: "open",
    positions: [
      [2, 2],
      [4, 3],
      [5, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 2, 1] },
  },
  ],

  add9: [
  {
    region: "open",
    positions: [
      [1, 2],
      [3, 4],
      [5, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 2, 1] },
  },
  ],

  maj9: [
  {
    region: "open",
    positions: [
      [1, 2],
      [5, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 2, 1, 0] },
  },
  ],

  m9: [
  {
    region: "fret-2",
    positions: [
      [0, 4],
    ],
    barre: { fret: 2, strings: [5, 3, 2, 1, 0] },
  },
  ],

  "9+": [
  {
    region: "fret-2",
    positions: [
      [5, 2],
      [3, 2],
      [2, 3],
      [0, 5],
    ],
    barre: null,
  },
  ],

};

export default voicings;
