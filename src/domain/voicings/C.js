const voicings = {

  "5": [
    {
      region: "fret-3",
      positions: [
        [2, 5],
        [3, 5],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [2, 5],
        [3, 5],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [0, 8],
        [1, 8],
        [4, 10],
        [5, 8],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 5],
        [4, 3],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [2, 2],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [1, 8],
        [3, 7],
        [4, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  "7": [
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [2, 3],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [1, 8],
        [3, 8],
        [4, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  "9": [
    {
      region: "fret-2",
      positions: [
        [3, 2],
        [4, 3],
      ],
      barre: { fret: 3, strings: [2, 1, 0] },
    },
  ],

  // 11: unable to generate a valid shape
  // 13: unable to generate a valid shape
  Maj: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 0],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [2, 5],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [0, 8],
        [4, 7],
        [5, 8],
      ],
      barre: { fret: 5, strings: [5, 4, 3, 2, 1, 0] },
      manual: true,
    },
  ],

  m: [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [2, 5],
        [3, 5],
      ],
      barre: { fret: 3, strings: [4, 3, 2, 1, 0] },
    },
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [1, 4],
        [3, 5],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [0, 8],
        [1, 8],
        [2, 8],
        [5, 8],
      ],
      barre: null,
    },
  ],

  dim: [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [3, 4],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [0, 2],
        [1, 4],
        [3, 4],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 8],
        [1, 7],
        [2, 8],
        [5, 8],
      ],
      barre: null,
    },
  ],

  aug: [
    {
      region: "fret-2",
      positions: [
        [0, 4],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [0, 4],
        [2, 5],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 8],
        [1, 9],
        [4, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "fret-3",
      positions: [
        [2, 5],
        [3, 5],
      ],
      barre: { fret: 3, strings: [4, 3, 2, 1, 0] },
    },
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [1, 3],
        [3, 5],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 8],
        [1, 8],
        [2, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  sus4: [
    {
      region: "fret-3",
      positions: [
        [1, 6],
        [2, 5],
      ],
      barre: { fret: 3, strings: [4, 3, 2, 1, 0] },
    },
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [2, 5],
        [3, 3],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [0, 8],
        [1, 8],
        [4, 8],
        [5, 8],
      ],
      barre: null,
    },
  ],

  m6: [
    {
      region: "fret-2",
      positions: [
        [1, 4],
        [2, 2],
        [3, 5],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 4],
        [2, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [1, 8],
        [2, 8],
        [3, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  "6/9": [
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 3],
        [4, 3],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
  ],

  m7: [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [3, 5],
      ],
      barre: { fret: 3, strings: [4, 3, 2, 1, 0] },
    },
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [1, 4],
        [2, 3],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [1, 8],
        [2, 8],
        [3, 8],
        [5, 8],
      ],
      barre: null,
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [2, 4],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 7],
        [1, 8],
        [4, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  "m7(b5)": [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [2, 3],
        [3, 4],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [0, 2],
        [1, 4],
        [2, 3],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [1, 7],
        [2, 8],
        [3, 8],
        [5, 8],
      ],
      barre: null,
    },
  ],

  dim7: [
    {
      region: "fret-2",
      positions: [
        [1, 4],
        [3, 4],
        [4, 3],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
    {
      region: "fret-2",
      positions: [
        [0, 2],
        [1, 4],
        [2, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [1, 7],
        [2, 8],
        [3, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  add9: [
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 3],
        [3, 2],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [1, 8],
        [2, 7],
        [4, 7],
        [5, 8],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "fret-2",
      positions: [
        [2, 4],
        [3, 2],
        [4, 3],
      ],
      barre: { fret: 3, strings: [2, 1, 0] },
    },
  ],

  m9: [
    {
      region: "fret-8",
      positions: [
        [0, 10],
      ],
      barre: { fret: 8, strings: [5, 3, 2, 1, 0] },
    },
  ],

  // 9+: unable to generate a valid shape
};

export default voicings;
