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
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [1, 3],
        [4, 5],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [0, 10],
        [2, 12],
        [3, 12],
        [4, 10],
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
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [3, 2],
        [4, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 10],
        [2, 9],
        [3, 9],
        [4, 10],
      ],
      barre: null,
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
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [3, 3],
        [4, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 10],
        [2, 10],
        [3, 9],
        [4, 10],
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

  // 11: unable to generate a valid shape
  // 13: unable to generate a valid shape
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
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 3],
        [4, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 10],
        [2, 12],
        [3, 9],
        [4, 10],
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
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [1, 3],
        [2, 3],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [0, 10],
        [1, 11],
        [3, 12],
        [4, 10],
      ],
      barre: null,
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
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 2],
        [2, 3],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 9],
        [1, 11],
        [3, 11],
        [4, 10],
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
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 4],
        [4, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 11],
        [2, 12],
        [3, 9],
        [4, 10],
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
    {
      region: "fret-2",
      positions: [
        [0, 3],
        [1, 3],
        [2, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [0, 10],
        [1, 10],
        [3, 12],
        [4, 10],
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
    {
      region: "fret-3",
      positions: [
        [0, 3],
        [1, 3],
        [4, 3],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [0, 10],
        [2, 12],
        [3, 10],
        [4, 10],
      ],
      barre: null,
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
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [2, 3],
        [3, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 10],
        [1, 11],
        [2, 9],
        [4, 10],
      ],
      barre: null,
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
        [1, 3],
        [2, 3],
        [3, 3],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [0, 10],
        [1, 11],
        [2, 10],
        [4, 10],
      ],
      barre: null,
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
    {
      region: "fret-2",
      positions: [
        [0, 2],
        [1, 3],
        [4, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 10],
        [2, 11],
        [3, 9],
        [4, 10],
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
    {
      region: "fret-2",
      positions: [
        [1, 2],
        [2, 3],
        [3, 3],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 9],
        [1, 11],
        [2, 10],
        [4, 10],
      ],
      barre: null,
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
    {
      region: "fret-2",
      positions: [
        [1, 2],
        [2, 3],
        [3, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 9],
        [1, 11],
        [2, 9],
        [4, 10],
      ],
      barre: null,
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
    {
      region: "fret-2",
      positions: [
        [1, 3],
        [2, 2],
        [4, 2],
        [5, 3],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [0, 10],
        [1, 10],
        [3, 9],
        [4, 10],
      ],
      barre: null,
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

  // 9+: unable to generate a valid shape
};

export default voicings;
