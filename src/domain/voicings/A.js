const voicings = {

  "5": [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [2, 2],
        [3, 2],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [0, 5],
        [1, 5],
        [4, 7],
        [5, 5],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [3, 4],
        [4, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  "7": [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 2],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 2],
        [2, 0],
        [3, 2],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [3, 5],
        [4, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  "9": [
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [3, 5],
        [5, 5],
      ],
      barre: { fret: 4, strings: [5, 4, 3, 2, 1] },
    },
  ],

  // 11: unable to generate a valid shape
  // 13: unable to generate a valid shape
  Maj: [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 2],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [0, 5],
        [1, 5],
        [4, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  m: [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [0, 5],
        [1, 5],
        [2, 5],
        [5, 5],
      ],
      barre: null,
    },
  ],

  dim: [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 1],
        [2, 2],
        [1, 1],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [0, 5],
        [1, 4],
        [2, 5],
        [5, 5],
      ],
      barre: null,
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [0, 1],
        [1, 2],
        [2, 2],
        [3, 3],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [0, 5],
        [1, 6],
        [4, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 0],
        [2, 2],
        [3, 2],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [0, 5],
        [1, 5],
        [2, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  sus4: [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 3],
        [2, 2],
        [3, 0],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [0, 5],
        [1, 5],
        [4, 5],
        [5, 5],
      ],
      barre: null,
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 1],
        [2, 2],
        [3, 2],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [2, 5],
        [3, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  "6/9": [
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [5, 5],
      ],
      barre: { fret: 4, strings: [5, 4, 3, 2, 1] },
    },
  ],

  m7: [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 2],
        [2, 2],
        [1, 1],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 1],
        [2, 0],
        [3, 2],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [1, 5],
        [2, 5],
        [3, 5],
        [5, 5],
      ],
      barre: null,
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 2],
        [2, 1],
        [1, 2],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [0, 4],
        [1, 5],
        [4, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  "m7(b5)": [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 1],
        [2, 2],
        [1, 1],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 3],
        [1, 1],
        [2, 0],
        [3, 1],
        [4, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [1, 4],
        [2, 5],
        [3, 5],
        [5, 5],
      ],
      barre: null,
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [4, 0],
        [3, 1],
        [2, 2],
        [1, 1],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [1, 4],
        [2, 5],
        [3, 4],
        [5, 5],
      ],
      barre: null,
    },
  ],

  add9: [
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [3, 7],
        [5, 5],
      ],
      barre: { fret: 4, strings: [5, 4, 3, 2, 1] },
    },
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [2, 4],
        [4, 4],
        [5, 5],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [0, 12],
        [1, 12],
        [3, 11],
        [4, 12],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "fret-4",
      positions: [
        [1, 5],
        [5, 5],
      ],
      barre: { fret: 4, strings: [5, 4, 2, 1, 0] },
    },
  ],

  m9: [
    {
      region: "fret-5",
      positions: [
        [0, 7],
      ],
      barre: { fret: 5, strings: [5, 3, 2, 1, 0] },
    },
  ],

  // 9+: unable to generate a valid shape
};

export default voicings;
