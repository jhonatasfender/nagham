const voicings = {

  "5": [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 0],
        [3, 2],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 7],
        [2, 9],
        [3, 9],
        [4, 7],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 2],
        [2, 1],
        [3, 2],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 7],
        [2, 6],
        [3, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  "7": [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 0],
        [2, 1],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 7],
        [2, 7],
        [3, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  "9": [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [2, 1],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 0],
        [2, 1],
        [3, 0],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
  ],

  "11": [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 0],
        [2, 1],
        [3, 0],
        [4, 0],
        [5, 0],
      ],
      barre: null,
    },
  ],

  // 13: unable to generate a valid shape
  Maj: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 1],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 7],
        [2, 9],
        [3, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  m: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 0],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 7],
        [1, 8],
        [3, 9],
        [4, 7],
      ],
      barre: null,
    },
  ],

  dim: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 1],
        [3, 2],
        [2, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [2, 0],
        [3, 2],
        [4, 1],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 6],
        [1, 8],
        [3, 8],
        [4, 7],
      ],
      barre: null,
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 1],
        [2, 1],
        [3, 2],
        [4, 3],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 8],
        [2, 9],
        [3, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 0],
        [3, 2],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 7],
        [1, 7],
        [3, 9],
        [4, 7],
      ],
      barre: null,
    },
  ],

  sus4: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 2],
        [1, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 0],
        [2, 2],
        [3, 2],
        [4, 0],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 7],
        [2, 9],
        [3, 7],
        [4, 7],
      ],
      barre: null,
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 2],
        [2, 0],
        [3, 2],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 7],
        [1, 8],
        [2, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  "6/9": [
    {
      region: "fret-6",
      positions: [
        [0, 7],
        [1, 7],
        [4, 7],
      ],
      barre: { fret: 6, strings: [4, 3, 2, 1, 0] },
    },
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 2],
        [2, 1],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
  ],

  m7: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 0],
        [2, 0],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [0, 7],
        [1, 8],
        [2, 7],
        [4, 7],
      ],
      barre: null,
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 1],
        [2, 1],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 7],
        [2, 8],
        [3, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  "m7(b5)": [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 1],
        [3, 2],
        [2, 0],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 3],
        [2, 0],
        [3, 0],
        [4, 1],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 6],
        [1, 8],
        [2, 7],
        [4, 7],
      ],
      barre: null,
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 1],
        [3, 2],
        [2, 0],
        [1, 2],
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
        [4, 1],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 6],
        [1, 8],
        [2, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  add9: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 1],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [0, 7],
        [1, 7],
        [3, 6],
        [4, 7],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 1],
        [2, 1],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
  ],

  m9: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 0],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 0],
        [2, 0],
        [3, 0],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
  ],

  "9+": [
    {
      region: "open",
      positions: [
        [0, 3],
        [1, 0],
        [2, 1],
        [3, 0],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
  ],

};

export default voicings;
