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
  ],

  "7": [
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 1],
        [2, 3],
        [3, 2],
        [4, 3],
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

  "11": [
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 3],
        [2, 3],
        [1, 3],
      ],
      barre: null,
    },
  ],

  "13": [
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [3, 8],
        [2, 9],
        [1, 10],
      ],
      barre: null,
    },
  ],

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

  "9+": [
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 8],
        [2, 9],
        [1, 4],
      ],
      barre: null,
    },
  ],

};

export default voicings;
