const voicings = {

  "5": [
    {
      region: "open",
      positions: [
        [1, 4],
        [2, 3],
        [3, 1],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "open",
      positions: [
        [0, 3],
        [1, 1],
        [2, 3],
        [3, 1],
      ],
      barre: null,
    },
  ],

  "7": [
    {
      region: "open",
      positions: [
        [0, 3],
        [1, 2],
        [2, 3],
        [3, 1],
      ],
      barre: null,
    },
  ],

  "9": [
    {
      region: "fret-10",
      positions: [
        [1, 11],
        [3, 11],
        [5, 11],
      ],
      barre: { fret: 10, strings: [5, 4, 3, 2, 1] },
    },
  ],

  "11": [
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 6],
      ],
      barre: null,
    },
  ],

  "13": [
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [3, 11],
        [2, 12],
        [1, 13],
      ],
      barre: null,
    },
  ],

  Maj: [
    {
      region: "fret-6",
      positions: [
        [1, 8],
        [2, 8],
        [3, 8],
      ],
      barre: { fret: 6, strings: [4, 3, 2, 1, 0] },
    },
  ],

  m: [
    {
      region: "fret-6",
      positions: [
        [1, 7],
        [2, 8],
        [3, 8],
      ],
      barre: { fret: 6, strings: [4, 3, 2, 1, 0] },
    },
  ],

  dim: [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 4],
        [2, 2],
        [3, 1],
      ],
      barre: null,
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [0, 3],
        [1, 0],
        [2, 0],
        [3, 1],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [0, 1],
        [1, 4],
        [2, 3],
        [3, 1],
      ],
      barre: null,
    },
  ],

  sus4: [
    {
      region: "open",
      positions: [
        [0, 4],
        [1, 4],
        [2, 3],
        [3, 1],
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
        [2, 3],
        [3, 1],
      ],
      barre: null,
    },
  ],

  "6/9": [
    {
      region: "fret-5",
      positions: [
        [0, 6],
        [1, 6],
        [4, 6],
      ],
      barre: { fret: 5, strings: [4, 3, 2, 1, 0] },
    },
  ],

  m7: [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 2],
        [2, 3],
        [3, 1],
      ],
      barre: null,
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [0, 3],
        [1, 3],
        [2, 3],
        [3, 1],
      ],
      barre: null,
    },
  ],

  "m7(b5)": [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 1],
      ],
      barre: null,
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 1],
        [2, 2],
        [3, 1],
      ],
      barre: null,
    },
  ],

  add9: [
    {
      region: "fret-10",
      positions: [
        [1, 11],
        [3, 13],
        [5, 11],
      ],
      barre: { fret: 10, strings: [5, 4, 3, 2, 1] },
    },
  ],

  maj9: [
    {
      region: "fret-10",
      positions: [
        [1, 11],
        [5, 11],
      ],
      barre: { fret: 10, strings: [5, 4, 2, 1, 0] },
    },
  ],

  m9: [
    {
      region: "fret-11",
      positions: [
        [0, 13],
      ],
      barre: { fret: 11, strings: [5, 3, 2, 1, 0] },
    },
  ],

  "9+": [
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 11],
        [2, 12],
        [1, 7],
      ],
      barre: null,
    },
  ],

};

export default voicings;
