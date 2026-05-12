const voicings = {

  "5": [
  {
    region: "open",
    positions: [
      [4, 3],
      [5, 1],
    ],
    barre: null,
  },
  ],

  "6": [
  {
    region: "fret-7",
    positions: [
      [0, 8],
      [1, 10],
      [4, 8],
    ],
    barre: { fret: 7, strings: [4, 3, 2, 1, 0] },
  },
  ],

  "7": [
  {
    region: "open",
    positions: [
      [2, 2],
    ],
    barre: { fret: 1, strings: [5, 3, 2, 1, 0] },
  },
  ],

  "9": [
  {
    region: "fret-7",
    positions: [
      [3, 7],
      [4, 8],
    ],
    barre: { fret: 8, strings: [2, 1, 0] },
  },
  ],

  "11": [
  {
    region: "fret-8",
    positions: [
      [4, 8],
      [3, 8],
      [2, 8],
      [1, 8],
    ],
    barre: null,
  },
  ],

  "13": [
  {
    region: "open",
    positions: [
      [5, 1],
      [3, 1],
      [2, 2],
      [1, 3],
    ],
    barre: null,
  },
  ],

  Maj: [
  {
    region: "open",
    positions: [
      [4, 3],
      [3, 3],
      [2, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 2, 1, 0] },
  },
  ],

  m: [
  {
    region: "open",
    positions: [
      [4, 3],
    ],
    barre: { fret: 1, strings: [5, 4, 2, 1, 0] },
  },
  ],

  dim: [
  {
    region: "open",
    positions: [
      [1, 0],
      [2, 1],
      [5, 1],
    ],
    barre: null,
  },
  ],

  aug: [
  {
    region: "open",
    positions: [
      [1, 2],
      [4, 0],
      [5, 1],
    ],
    barre: null,
  },
  ],

  sus2: [
  {
    region: "open",
    positions: [
      [2, 0],
      [4, 3],
      [5, 1],
    ],
    barre: null,
  },
  ],

  sus4: [
  {
    region: "open",
    positions: [
      [3, 3],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 1, 0] },
  },
  ],

  m6: [
  {
    region: "fret-7",
    positions: [
      [1, 9],
      [2, 7],
      [3, 10],
      [4, 8],
    ],
    barre: null,
  },
  ],

  "6/9": [
  {
    region: "fret-7",
    positions: [
      [0, 8],
      [1, 8],
      [4, 8],
    ],
    barre: { fret: 7, strings: [4, 3, 2, 1, 0] },
  },
  ],

  m7: [
  {
    region: "open",
    positions: [

    ],
    barre: { fret: 1, strings: [5, 3, 2, 1, 0] },
  },
  ],

  maj7: [
  {
    region: "open",
    positions: [
      [0, 0],
      [2, 2],
      [4, 3],
      [5, 1],
    ],
    barre: null,
  },
  ],

  "m7(b5)": [
  {
    region: "open",
    positions: [
      [1, 0],
      [4, 2],
    ],
    barre: { fret: 1, strings: [5, 4, 3, 2, 0] },
  },
  ],

  dim7: [
  {
    region: "open",
    positions: [
      [0, 1],
      [1, 0],
      [2, 1],
      [3, 0],
      [4, 2],
      [5, 1],
    ],
    barre: null,
  },
  ],

  add9: [
  {
    region: "fret-7",
    positions: [
      [0, 8],
      [1, 8],
      [3, 7],
      [4, 8],
    ],
    barre: null,
  },
  ],

  maj9: [
  {
    region: "fret-7",
    positions: [
      [2, 9],
      [3, 7],
      [4, 8],
    ],
    barre: { fret: 8, strings: [2, 1, 0] },
  },
  ],

  m9: [
  {
    region: "open",
    positions: [
      [0, 3],
    ],
    barre: { fret: 1, strings: [5, 3, 2, 1, 0] },
  },
  ],

  "9+": [
  {
    region: "open",
    positions: [
      [5, 1],
      [3, 1],
      [2, 2],
      [0, 4],
    ],
    barre: null,
  },
  ],

};

export default voicings;
