const voicings = {

  "5": [
  {
    region: "open",
    positions: [
      [3, 0],
      [2, 2],
    ],
    barre: null,
  },
  ],

  "6": [
  {
    region: "open",
    positions: [
      [0, 2],
      [1, 0],
      [2, 2],
      [3, 0],
    ],
    barre: null,
  },
  ],

  "7": [
  {
    region: "open",
    positions: [
      [0, 2],
      [1, 1],
      [2, 2],
      [3, 0],
    ],
    barre: null,
  },
  ],

  "9": [
  {
    region: "fret-9",
    positions: [
      [1, 10],
      [3, 10],
      [5, 10],
    ],
    barre: { fret: 9, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "11": [
  {
    region: "fret-5",
    positions: [
      [4, 5],
      [3, 5],
      [2, 5],
      [1, 5],
    ],
    barre: null,
  },
  ],

  "13": [
  {
    region: "fret-10",
    positions: [
      [5, 10],
      [3, 10],
      [2, 11],
      [1, 12],
    ],
    barre: null,
  },
  ],

  Maj: [
  {
    region: "open",
    positions: [
      [3, 0],
      [2, 2],
      [1, 3],
      [0, 2],
    ],
    barre: null,
  },
  ],

  m: [
  {
    region: "open",
    positions: [
      [3, 0],
      [2, 2],
      [1, 3],
      [0, 1],
    ],
    barre: null,
  },
  ],

  dim: [
  {
    region: "open",
    positions: [
      [3, 0],
      [2, 1],
      [1, 3],
      [0, 1],
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
    ],
    barre: null,
  },
  ],

  sus2: [
  {
    region: "open",
    positions: [
      [0, 0],
      [1, 3],
      [2, 2],
      [3, 0],
    ],
    barre: null,
  },
  ],

  sus4: [
  {
    region: "open",
    positions: [
      [3, 0],
      [2, 2],
      [1, 3],
      [0, 3],
    ],
    barre: null,
  },
  ],

  m6: [
  {
    region: "open",
    positions: [
      [0, 1],
      [1, 0],
      [2, 2],
      [3, 0],
    ],
    barre: null,
  },
  ],

  "6/9": [
  {
    region: "fret-4",
    positions: [
      [0, 5],
      [1, 5],
      [4, 5],
    ],
    barre: { fret: 4, strings: [4, 3, 2, 1, 0] },
  },
  ],

  m7: [
  {
    region: "open",
    positions: [
      [0, 1],
      [1, 1],
      [2, 2],
      [3, 0],
    ],
    barre: null,
  },
  ],

  maj7: [
  {
    region: "open",
    positions: [
      [3, 0],
      [2, 2],
      [1, 2],
      [0, 2],
    ],
    barre: null,
  },
  ],

  "m7(b5)": [
  {
    region: "open",
    positions: [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 0],
    ],
    barre: null,
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
    ],
    barre: null,
  },
  ],

  add9: [
  {
    region: "fret-9",
    positions: [
      [1, 10],
      [3, 12],
      [5, 10],
    ],
    barre: { fret: 9, strings: [5, 4, 3, 2, 1] },
  },
  ],

  maj9: [
  {
    region: "fret-9",
    positions: [
      [1, 10],
      [5, 10],
    ],
    barre: { fret: 9, strings: [5, 4, 2, 1, 0] },
  },
  ],

  m9: [
  {
    region: "fret-10",
    positions: [
      [0, 12],
    ],
    barre: { fret: 10, strings: [5, 3, 2, 1, 0] },
  },
  ],

  "9+": [
  {
    region: "fret-5",
    positions: [
      [4, 5],
      [3, 10],
      [2, 11],
      [1, 6],
    ],
    barre: null,
  },
  ],

};

export default voicings;
