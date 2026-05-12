const voicings = {

  "5": [
  {
    region: "open",
    positions: [
      [4, 1],
      [3, 3],
    ],
    barre: null,
  },
  ],

  "6": [
  {
    region: "fret-5",
    positions: [
      [1, 6],
      [2, 7],
      [5, 6],
    ],
    barre: { fret: 5, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "7": [
  {
    region: "open",
    positions: [
      [4, 1],
      [0, 4],
    ],
    barre: { fret: 3, strings: [3, 2, 1, 0] },
  },
  ],

  "9": [
  {
    region: "fret-5",
    positions: [
      [1, 6],
      [3, 6],
      [5, 6],
    ],
    barre: { fret: 5, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "11": [
  {
    region: "open",
    positions: [
      [4, 1],
      [3, 1],
      [2, 1],
      [1, 1],
    ],
    barre: null,
  },
  ],

  "13": [
  {
    region: "fret-6",
    positions: [
      [5, 6],
      [3, 6],
      [2, 7],
      [1, 8],
    ],
    barre: null,
  },
  ],

  Maj: [
  {
    region: "fret-6",
    positions: [
      [2, 7],
      [3, 8],
      [4, 8],
    ],
    barre: { fret: 6, strings: [5, 4, 3, 2, 1, 0] },
  },
  ],

  m: [
  {
    region: "open",
    positions: [
      [1, 2],
      [2, 3],
      [3, 3],
    ],
    barre: { fret: 1, strings: [4, 3, 2, 1, 0] },
  },
  ],

  dim: [
  {
    region: "open",
    positions: [
      [4, 1],
      [3, 2],
      [2, 3],
      [1, 2],
    ],
    barre: null,
  },
  ],

  aug: [
  {
    region: "open",
    positions: [
      [0, 2],
      [1, 3],
      [2, 3],
      [3, 0],
      [4, 1],
    ],
    barre: null,
  },
  ],

  sus2: [
  {
    region: "open",
    positions: [
      [2, 3],
      [3, 3],
    ],
    barre: { fret: 1, strings: [4, 3, 2, 1, 0] },
  },
  ],

  sus4: [
  {
    region: "open",
    positions: [
      [2, 3],
      [1, 4],
      [0, 1],
    ],
    barre: null,
  },
  ],

  m6: [
  {
    region: "fret-5",
    positions: [
      [3, 5],
      [5, 6],
    ],
    barre: { fret: 6, strings: [2, 1, 0] },
  },
  ],

  "6/9": [
  {
    region: "fret-5",
    positions: [
      [1, 6],
      [5, 6],
    ],
    barre: { fret: 5, strings: [5, 4, 3, 2, 1] },
  },
  ],

  m7: [
  {
    region: "fret-2",
    positions: [
      [3, 3],
      [2, 3],
      [1, 2],
      [0, 4],
    ],
    barre: null,
  },
  ],

  maj7: [
  {
    region: "open",
    positions: [
      [3, 3],
      [2, 2],
      [1, 3],
    ],
    barre: { fret: 1, strings: [4, 3, 2, 1, 0] },
  },
  ],

  "m7(b5)": [
  {
    region: "fret-2",
    positions: [
      [3, 2],
      [2, 3],
      [1, 2],
      [0, 4],
    ],
    barre: null,
  },
  ],

  dim7: [
  {
    region: "fret-2",
    positions: [
      [3, 2],
      [2, 3],
      [1, 2],
      [0, 3],
    ],
    barre: null,
  },
  ],

  add9: [
  {
    region: "fret-5",
    positions: [
      [1, 6],
      [3, 8],
      [5, 6],
    ],
    barre: { fret: 5, strings: [5, 4, 3, 2, 1] },
  },
  ],

  maj9: [
  {
    region: "fret-5",
    positions: [
      [1, 6],
      [3, 7],
      [5, 6],
    ],
    barre: { fret: 5, strings: [5, 4, 3, 2, 1] },
  },
  ],

  m9: [
  {
    region: "fret-6",
    positions: [
      [0, 8],
    ],
    barre: { fret: 6, strings: [5, 3, 2, 1, 0] },
  },
  ],

  "9+": [
  {
    region: "open",
    positions: [
      [4, 1],
      [3, 6],
      [2, 7],
      [1, 2],
    ],
    barre: null,
  },
  ],

};

export default voicings;
