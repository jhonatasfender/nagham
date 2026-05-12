const voicings = {

  "5": [
    {
      region: "fret-2",
      positions: [
        [0, 2],
        [2, 4],
        [3, 4],
        [4, 2],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 4],
        [4, 2],
      ],
      barre: { fret: 1, strings: [4, 3, 2, 1, 0] },
    },
  ],

  "7": [
    {
      region: "open",
      positions: [
        [0, 2],
        [2, 2],
        [3, 1],
        [4, 2],
      ],
      barre: null,
    },
  ],

  "9": [
    {
      region: "open",
      positions: [
        [3, 1],
        [4, 2],
      ],
      barre: { fret: 2, strings: [2, 1, 0] },
    },
  ],

  "11": [
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 2],
        [2, 2],
        [1, 2],
      ],
      barre: null,
    },
  ],

  "13": [
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [3, 7],
        [2, 8],
        [1, 9],
      ],
      barre: null,
    },
  ],

  Maj: [
    {
      region: "fret-2",
      positions: [
        [1, 4],
        [2, 4],
        [3, 4],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
  ],

  m: [
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [2, 4],
        [3, 4],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
  ],

  dim: [
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [3, 3],
        [4, 2],
      ],
      barre: null,
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [0, 3],
        [3, 1],
        [4, 2],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "fret-2",
      positions: [
        [2, 4],
        [3, 4],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
  ],

  sus4: [
    {
      region: "fret-2",
      positions: [
        [1, 5],
        [2, 4],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [1, 3],
        [2, 1],
        [3, 4],
        [4, 2],
      ],
      barre: null,
    },
  ],

  "6/9": [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 2],
        [4, 2],
      ],
      barre: { fret: 1, strings: [4, 3, 2, 1, 0] },
    },
  ],

  m7: [
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [3, 4],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
  ],

  maj7: [
    {
      region: "fret-2",
      positions: [
        [1, 4],
        [2, 3],
        [3, 4],
      ],
      barre: { fret: 2, strings: [4, 3, 2, 1, 0] },
    },
  ],

  "m7(b5)": [
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [2, 2],
        [3, 3],
        [4, 2],
      ],
      barre: null,
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [1, 3],
        [3, 3],
        [4, 2],
      ],
      barre: { fret: 1, strings: [4, 3, 2, 1, 0] },
    },
  ],

  add9: [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 2],
        [3, 1],
        [4, 2],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "open",
      positions: [
        [2, 3],
        [3, 1],
        [4, 2],
      ],
      barre: { fret: 2, strings: [2, 1, 0] },
    },
  ],

  m9: [
    {
      region: "fret-7",
      positions: [
        [0, 9],
      ],
      barre: { fret: 7, strings: [5, 3, 2, 1, 0] },
    },
  ],

  "9+": [
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 7],
        [2, 8],
        [1, 3],
      ],
      barre: null,
    },
  ],

};

export default voicings;
