const voicings = {

  "5": [
  {
    region: "fret-3",
    positions: [
      [5, 3],
      [4, 5],
    ],
    barre: null,
  },
  ],

  "6": [
  {
    region: "fret-2",
    positions: [
      [1, 3],
      [2, 4],
      [5, 3],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "7": [
  {
    region: "open",
    positions: [
      [0, 1],
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 2],
      [5, 3],
    ],
    barre: null,
  },
  ],

  "9": [
  {
    region: "fret-2",
    positions: [
      [1, 3],
      [3, 3],
      [5, 3],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 1] },
  },
  ],

  "11": [
  {
    region: "fret-10",
    positions: [
      [4, 10],
      [3, 10],
      [2, 10],
      [1, 10],
    ],
    barre: null,
  },
  ],

  "13": [
  {
    region: "fret-3",
    positions: [
      [5, 3],
      [3, 3],
      [2, 4],
      [1, 5],
    ],
    barre: null,
  },
  ],

  Maj: [
  {
    region: "open",
    positions: [
      [5, 3],
      [4, 2],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 3],
    ],
    barre: null,
  },
  ],

  m: [
  {
    region: "fret-3",
    positions: [
      [4, 5],
    ],
    barre: { fret: 3, strings: [5, 4, 2, 1, 0] },
  },
  ],

  dim: [
  {
    region: "fret-3",
    positions: [
      [2, 3],
      [4, 4],
      [5, 3],
    ],
    barre: null,
  },
  ],

  aug: [
  {
    region: "fret-2",
    positions: [
      [1, 4],
      [4, 2],
      [5, 3],
    ],
    barre: null,
  },
  ],

  sus2: [
  {
    region: "fret-2",
    positions: [
      [2, 2],
      [4, 5],
      [5, 3],
    ],
    barre: null,
  },
  ],

  sus4: [
  {
    region: "fret-3",
    positions: [
      [3, 5],
    ],
    barre: { fret: 3, strings: [5, 4, 3, 1, 0] },
  },
  ],

  m6: [
  {
    region: "fret-2",
    positions: [
      [3, 2],
      [5, 3],
    ],
    barre: { fret: 3, strings: [2, 1, 0] },
  },
  ],

  "6/9": [
  {
    region: "fret-2",
    positions: [
      [1, 3],
      [5, 3],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 1] },
  },
  ],

  m7: [
  {
    region: "fret-3",
    positions: [

    ],
    barre: { fret: 3, strings: [5, 3, 2, 1, 0] },
  },
  ],

  maj7: [
  {
    region: "open",
    positions: [
      [5, 3],
      [4, 2],
      [3, 0],
      [2, 0],
      [1, 0],
      [0, 2],
    ],
    barre: null,
  },
  ],

  "m7(b5)": [
  {
    region: "fret-3",
    positions: [
      [4, 4],
    ],
    barre: { fret: 3, strings: [5, 4, 3, 2, 0] },
  },
  ],

  dim7: [
  {
    region: "fret-2",
    positions: [
      [2, 3],
      [4, 4],
      [5, 3],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 1] },
  },
  ],

  add9: [
  {
    region: "fret-2",
    positions: [
      [1, 3],
      [3, 5],
      [5, 3],
    ],
    barre: { fret: 2, strings: [5, 4, 3, 2, 1] },
  },
  ],

  maj9: [
  {
    region: "fret-2",
    positions: [
      [1, 3],
      [5, 3],
    ],
    barre: { fret: 2, strings: [5, 4, 2, 1, 0] },
  },
  ],

  m9: [
  {
    region: "fret-3",
    positions: [
      [0, 5],
    ],
    barre: { fret: 3, strings: [5, 3, 2, 1, 0] },
  },
  ],

  "9+": [
  {
    region: "fret-3",
    positions: [
      [5, 3],
      [3, 3],
      [2, 4],
      [0, 6],
    ],
    barre: null,
  },
  ],

};

export default voicings;
