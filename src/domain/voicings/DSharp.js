// Voicings de violão importados de musicca.com.
// Veja docs/adr/0011-musicca-as-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/musicca/apply.mjs.

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
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [1, 4],
        [0, 6],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 8],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [2, 8],
        [1, 11],
        [0, 11],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 13],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 3],
        [1, 1],
        [0, 3],
      ],
      barre: { fret: 1, strings: [1, 3] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 11],
        [4, 10],
        [3, 8],
        [2, 8],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 2, 3] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 11],
        [3, 10],
        [2, 12],
        [1, 11],
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
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 5],
        [2, 6],
        [1, 4],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 6],
        [1, 8],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 2, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [3, 11],
        [2, 12],
        [1, 11],
      ],
      barre: { fret: 11, strings: [1, 3, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 11],
        [2, 12],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1, 3, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [3, 13],
        [2, 12],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1] },
    },
  ],

  "9": [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 0],
        [1, 2],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 6],
        [3, 5],
        [2, 6],
        [1, 6],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 11],
        [4, 10],
        [3, 11],
        [2, 10],
        [1, 11],
      ],
      barre: { fret: 10, strings: [2, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [3, 11],
        [2, 12],
        [1, 11],
        [0, 13],
      ],
      barre: { fret: 11, strings: [1, 3, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 11],
        [2, 12],
        [1, 11],
        [0, 13],
      ],
      barre: { fret: 11, strings: [1, 3, 5] },
    },
  ],

  "11": [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 1],
        [1, 2],
        [0, 3],
      ],
      barre: { fret: 1, strings: [2, 3] },
    },
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 3],
        [2, 3],
        [1, 4],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 2, 3] },
    },
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 5],
        [2, 6],
        [1, 4],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 1] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 8],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 2, 3, 4] },
    },
    {
      region: "fret-9",
      positions: [
        [5, 11],
        [3, 11],
        [2, 10],
        [1, 9],
        [0, 9],
      ],
      barre: { fret: 9, strings: [0, 1] },
    },
  ],

  "13": [
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 3],
        [2, 5],
        [1, 4],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 3] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 11],
        [3, 11],
        [2, 10],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [3, 11],
        [2, 12],
        [1, 13],
        [0, 13],
      ],
      barre: { fret: 11, strings: [3, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 11],
        [2, 12],
        [1, 13],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 3, 5] },
    },
  ],

  Maj: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 3],
        [1, 4],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 5],
        [2, 3],
        [1, 4],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 2] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 8],
        [1, 8],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 13],
        [2, 12],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [3, 13],
        [2, 12],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1] },
    },
  ],

  m: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 3],
        [1, 4],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 8],
        [1, 7],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [2, 8],
        [1, 7],
        [0, 6],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 13],
        [2, 11],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1, 2, 5] },
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
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 4],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 5],
        [2, 4],
        [1, 4],
      ],
      barre: { fret: 4, strings: [1, 2] },
    },
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 5],
        [2, 4],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 11],
        [4, 10],
        [3, 9],
        [2, 8],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [3, 13],
        [2, 12],
        [1, 12],
        [0, 11],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 3],
        [1, 4],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 3] },
    },
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 3],
        [2, 3],
        [1, 4],
      ],
      barre: { fret: 3, strings: [2, 3] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 8],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 10],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [3, 13],
        [2, 10],
        [1, 11],
        [0, 13],
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
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 6],
        [2, 3],
        [1, 4],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 8],
        [1, 9],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 13],
        [2, 13],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [3, 13],
        [2, 13],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1] },
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 3],
        [1, 1],
        [0, 2],
      ],
      barre: { fret: 1, strings: [1, 3] },
    },
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 4],
        [2, 5],
        [1, 4],
      ],
      barre: { fret: 4, strings: [1, 3] },
    },
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 4],
        [2, 5],
        [1, 4],
        [0, 6],
      ],
      barre: { fret: 4, strings: [1, 3] },
    },
    {
      region: "fret-5",
      positions: [
        [4, 6],
        [3, 8],
        [2, 5],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 11],
        [3, 10],
        [2, 11],
        [1, 11],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 13],
        [2, 11],
        [1, 13],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 2, 5] },
    },
  ],

  "6/9": [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 0],
        [1, 1],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 6],
        [3, 5],
        [2, 5],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 5, strings: [2, 3] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 11],
        [4, 8],
        [3, 8],
        [2, 8],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 2, 3, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 11],
        [4, 8],
        [3, 8],
        [2, 10],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 3, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 11],
        [4, 8],
        [3, 10],
        [2, 8],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 2, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 11],
        [3, 8],
        [2, 10],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 3] },
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
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 4],
        [2, 6],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 4],
        [2, 6],
        [1, 4],
      ],
      barre: { fret: 4, strings: [1, 3] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 6],
        [1, 7],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 2, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [3, 11],
        [2, 11],
        [1, 11],
      ],
      barre: { fret: 11, strings: [1, 2, 3, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 11],
        [2, 11],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1, 2, 3, 5] },
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 0],
        [1, 3],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 5],
        [2, 3],
        [1, 3],
      ],
      barre: { fret: 3, strings: [1, 2] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 7],
        [1, 8],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 13],
        [2, 12],
        [1, 11],
        [0, 10],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [3, 12],
        [2, 12],
        [1, 11],
      ],
      barre: { fret: 11, strings: [1, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 12],
        [2, 12],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1, 5] },
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
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 4],
        [2, 6],
        [1, 4],
        [0, 5],
      ],
      barre: { fret: 4, strings: [1, 3] },
    },
    {
      region: "fret-5",
      positions: [
        [4, 6],
        [2, 6],
        [1, 7],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 7],
        [2, 6],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 7],
        [2, 6],
        [1, 7],
        [0, 9],
      ],
      barre: { fret: 6, strings: [2, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 12],
        [3, 11],
        [2, 11],
      ],
      barre: { fret: 11, strings: [2, 3, 5] },
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 2],
        [1, 1],
        [0, 2],
      ],
      barre: { fret: 1, strings: [1, 3] },
    },
    {
      region: "fret-4",
      positions: [
        [4, 6],
        [3, 4],
        [2, 5],
        [1, 4],
        [0, 5],
      ],
      barre: { fret: 4, strings: [1, 3] },
    },
    {
      region: "fret-5",
      positions: [
        [4, 6],
        [3, 7],
        [2, 5],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 11],
        [3, 10],
        [2, 11],
        [1, 10],
      ],
      barre: { fret: 10, strings: [1, 3] },
    },
  ],

  add9: [
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 3],
        [2, 3],
        [1, 4],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 2, 3] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 10],
        [1, 8],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [2, 12],
        [1, 11],
        [0, 13],
      ],
      barre: { fret: 11, strings: [1, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [3, 13],
        [2, 12],
        [1, 11],
        [0, 13],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 0],
        [1, 3],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 6],
        [3, 3],
        [2, 3],
        [1, 3],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 1, 2, 3] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 11],
        [3, 12],
        [2, 10],
        [1, 11],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 11],
        [4, 10],
        [3, 12],
        [2, 10],
        [1, 11],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 2, 4] },
    },
  ],

  m9: [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 3],
        [1, 2],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 3] },
    },
    {
      region: "fret-6",
      positions: [
        [4, 6],
        [3, 8],
        [2, 6],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 2, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 11],
        [4, 13],
        [3, 11],
        [2, 11],
        [1, 11],
        [0, 13],
      ],
      barre: { fret: 11, strings: [1, 2, 3, 5] },
    },
  ],

  "9+": [
    {
      region: "open",
      positions: [
        [3, 1],
        [2, 0],
        [1, 2],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 6],
        [3, 5],
        [2, 6],
        [1, 7],
      ],
      barre: null,
    },
  ],

};

export default voicings;
