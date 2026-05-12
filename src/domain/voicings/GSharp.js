const voicings = {

  "5": [
    {
      region: "fret-4",
      positions: [
        [5, 4],
        [4, 6],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [2, 5],
        [5, 4],
      ],
      barre: { fret: 3, strings: [5, 4, 3, 2, 1] },
    },
  ],

  "7": [
    {
      region: "fret-4",
      positions: [
        [2, 5],
      ],
      barre: { fret: 4, strings: [5, 3, 2, 1, 0] },
    },
  ],

  "9": [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [3, 4],
        [5, 4],
      ],
      barre: { fret: 3, strings: [5, 4, 3, 2, 1] },
    },
  ],

  "11": [
    {
      region: "fret-11",
      positions: [
        [4, 11],
        [3, 11],
        [2, 11],
        [1, 11],
      ],
      barre: null,
    },
  ],

  "13": [
    {
      region: "fret-4",
      positions: [
        [5, 4],
        [3, 4],
        [2, 5],
        [1, 6],
      ],
      barre: null,
    },
  ],

  Maj: [
    {
      region: "fret-4",
      positions: [
        [2, 5],
        [3, 6],
        [4, 6],
      ],
      barre: { fret: 4, strings: [5, 4, 3, 2, 1, 0] },
    },
  ],

  m: [
    {
      region: "fret-4",
      positions: [
        [4, 6],
      ],
      barre: { fret: 4, strings: [5, 4, 2, 1, 0] },
    },
  ],

  dim: [
    {
      region: "fret-4",
      positions: [
        [2, 4],
        [4, 5],
        [5, 4],
      ],
      barre: null,
    },
  ],

  aug: [
    {
      region: "fret-3",
      positions: [
        [1, 5],
        [4, 3],
        [5, 4],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "fret-3",
      positions: [
        [2, 3],
        [4, 6],
        [5, 4],
      ],
      barre: null,
    },
  ],

  sus4: [
    {
      region: "fret-4",
      positions: [
        [3, 6],
      ],
      barre: { fret: 4, strings: [5, 4, 3, 1, 0] },
    },
  ],

  m6: [
    {
      region: "fret-3",
      positions: [
        [3, 3],
        [5, 4],
      ],
      barre: { fret: 4, strings: [2, 1, 0] },
    },
  ],

  "6/9": [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [5, 4],
      ],
      barre: { fret: 3, strings: [5, 4, 3, 2, 1] },
    },
  ],

  m7: [
    {
      region: "fret-4",
      positions: [],
      barre: { fret: 4, strings: [5, 3, 2, 1, 0] },
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [4, 3],
        [0, 3],
      ],
      barre: { fret: 1, strings: [4, 3, 2, 1, 0] },
    },
  ],

  "m7(b5)": [
    {
      region: "fret-4",
      positions: [
        [4, 5],
      ],
      barre: { fret: 4, strings: [5, 4, 3, 2, 0] },
    },
  ],

  dim7: [
    {
      region: "fret-3",
      positions: [
        [2, 4],
        [4, 5],
        [5, 4],
      ],
      barre: { fret: 3, strings: [5, 4, 3, 2, 1] },
    },
  ],

  add9: [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [3, 6],
        [5, 4],
      ],
      barre: { fret: 3, strings: [5, 4, 3, 2, 1] },
    },
  ],

  maj9: [
    {
      region: "fret-3",
      positions: [
        [1, 4],
        [5, 4],
      ],
      barre: { fret: 3, strings: [5, 4, 2, 1, 0] },
    },
  ],

  m9: [
    {
      region: "fret-4",
      positions: [
        [0, 6],
      ],
      barre: { fret: 4, strings: [5, 3, 2, 1, 0] },
    },
  ],

  "9+": [
    {
      region: "fret-4",
      positions: [
        [5, 4],
        [3, 4],
        [2, 5],
        [0, 7],
      ],
      barre: null,
    },
  ],

};

export default voicings;
