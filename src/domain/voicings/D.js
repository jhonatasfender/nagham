// Voicings de violão importados de musicca.com.
// Veja docs/adr/0011-musicca-as-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/musicca/apply.mjs.

const voicings = {

  "5": [
    {
      region: "open",
      positions: [
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 7],
        [1, 10],
        [0, 10],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 7],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 12],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 0],
        [2, 2],
        [3, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 4],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 7],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 2] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 10],
        [4, 9],
        [3, 7],
        [2, 7],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 2, 3] },
    },
    {
      region: "fret-9",
      positions: [
        [5, 10],
        [4, 9],
        [3, 9],
        [2, 11],
        [1, 10],
      ],
      barre: { fret: 9, strings: [3, 4] },
    },
  ],

  "7": [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 1],
        [2, 2],
        [3, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 5],
        [1, 7],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 11],
        [1, 10],
        [0, 8],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 11],
        [1, 13],
        [0, 10],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 5],
        [1, 7],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 2, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 10],
        [2, 11],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 3, 5] },
    },
  ],

  "9": [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 5],
        [1, 7],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [4, 5],
        [3, 4],
        [2, 5],
        [1, 5],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 5],
        [1, 5],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 1, 2, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [3, 12],
        [2, 11],
        [1, 13],
        [0, 12],
      ],
      barre: null,
    },
  ],

  "11": [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 0],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 0],
        [1, 7],
        [0, 8],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 5],
        [3, 4],
        [2, 5],
        [1, 3],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 1] },
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 7],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 2, 3, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 10],
        [3, 10],
        [2, 11],
        [1, 13],
        [0, 12],
      ],
      barre: { fret: 10, strings: [3, 4, 5] },
    },
  ],

  "13": [
    {
      region: "open",
      positions: [
        [4, 5],
        [3, 4],
        [2, 5],
        [1, 0],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 4],
        [1, 1],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 5],
        [3, 4],
        [2, 5],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 5, strings: [2, 3, 4] },
    },
    {
      region: "fret-9",
      positions: [
        [5, 10],
        [4, 9],
        [3, 10],
        [2, 9],
        [1, 12],
      ],
      barre: { fret: 9, strings: [2, 4] },
    },
  ],

  Maj: [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 7],
        [1, 7],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 7],
        [1, 7],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 12],
        [2, 11],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 12],
        [2, 11],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 12],
        [2, 11],
        [1, 10],
      ],
      barre: null,
    },
  ],

  m: [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 10],
        [1, 10],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 7],
        [1, 6],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [2, 7],
        [1, 6],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 12],
        [2, 10],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 2, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 12],
        [2, 10],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 2] },
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [0, 2],
        [1, 3],
        [2, 3],
        [3, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 11],
        [1, 11],
        [0, 10],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 5],
        [3, 4],
        [2, 3],
        [1, 3],
      ],
      barre: { fret: 3, strings: [1, 2] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 10],
        [4, 9],
        [3, 8],
        [2, 7],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [0, 0],
        [1, 3],
        [2, 2],
        [3, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 7],
        [1, 10],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 9],
        [1, 10],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 10],
        [4, 12],
        [3, 0],
        [2, 9],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 5],
        [3, 2],
        [2, 2],
      ],
      barre: { fret: 2, strings: [2, 3] },
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 7],
        [1, 5],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 1, 4] },
    },
  ],

  sus4: [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 0],
        [1, 3],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 5],
        [3, 7],
        [2, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 7],
        [1, 8],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 7],
        [1, 8],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 12],
        [2, 12],
      ],
      barre: null,
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [0, 1],
        [1, 0],
        [2, 2],
        [3, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 4],
        [1, 3],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 7],
        [1, 6],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 10],
        [1, 10],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 5],
        [3, 3],
        [2, 4],
        [1, 3],
        [0, 5],
      ],
      barre: { fret: 3, strings: [1, 3] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 12],
        [2, 10],
        [1, 12],
        [0, 13],
      ],
      barre: null,
    },
  ],

  "6/9": [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 2],
        [1, 5],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 2] },
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 11],
        [1, 12],
        [0, 12],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [4, 5],
        [3, 4],
        [2, 4],
        [1, 5],
        [0, 5],
      ],
      barre: { fret: 4, strings: [2, 3] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 10],
        [3, 7],
        [2, 9],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 3] },
    },
    {
      region: "fret-9",
      positions: [
        [5, 10],
        [4, 9],
        [3, 9],
        [2, 9],
        [1, 10],
      ],
      barre: { fret: 9, strings: [2, 3, 4] },
    },
  ],

  m7: [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 2],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1] },
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 5],
        [1, 6],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 2] },
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 10],
        [1, 10],
        [0, 8],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 5],
        [1, 6],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 2, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 10],
        [2, 10],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 2, 3, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 12],
        [2, 10],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 2] },
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 2],
        [1, 2],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 1, 2] },
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 6],
        [1, 7],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 11],
        [1, 10],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 5],
        [3, 4],
        [2, 2],
        [1, 2],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 1, 2] },
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 7],
        [2, 6],
        [1, 7],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 11],
        [2, 11],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 5] },
    },
  ],

  "m7(b5)": [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 1],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1, 2] },
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 5],
        [1, 6],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 13],
        [1, 13],
        [0, 13],
      ],
      barre: { fret: 13, strings: [0, 1, 2] },
    },
    {
      region: "fret-5",
      positions: [
        [4, 5],
        [3, 6],
        [2, 5],
        [1, 6],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 11],
        [3, 10],
        [2, 10],
      ],
      barre: { fret: 10, strings: [2, 3, 5] },
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [0, 1],
        [1, 0],
        [2, 1],
        [3, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 10],
        [1, 9],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 5],
        [3, 3],
        [2, 4],
        [1, 3],
        [0, 4],
      ],
      barre: { fret: 3, strings: [1, 3] },
    },
    {
      region: "fret-4",
      positions: [
        [4, 5],
        [3, 6],
        [2, 4],
        [1, 6],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 2] },
    },
    {
      region: "fret-9",
      positions: [
        [5, 10],
        [4, 11],
        [3, 9],
        [2, 10],
      ],
      barre: null,
    },
  ],

  add9: [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 2],
        [1, 5],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 2] },
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 9],
        [1, 7],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 5],
        [3, 2],
        [2, 2],
        [1, 3],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 2, 3] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 10],
        [4, 7],
        [3, 7],
        [2, 7],
        [1, 7],
      ],
      barre: { fret: 7, strings: [1, 2, 3, 4] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 10],
        [4, 7],
        [3, 7],
        [2, 9],
        [1, 7],
      ],
      barre: { fret: 7, strings: [1, 3, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 12],
        [2, 11],
        [1, 10],
        [0, 12],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 9],
        [1, 7],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 5],
        [3, 2],
        [2, 2],
        [1, 2],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 1, 2, 3] },
    },
    {
      region: "fret-4",
      positions: [
        [4, 5],
        [3, 4],
        [2, 6],
        [1, 5],
      ],
      barre: null,
    },
  ],

  m9: [
    {
      region: "open",
      positions: [
        [4, 5],
        [3, 0],
        [2, 5],
        [1, 6],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 5],
        [1, 6],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 0],
        [2, 10],
        [1, 13],
        [0, 12],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 5],
        [3, 3],
        [2, 5],
        [1, 5],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [5, 10],
        [4, 12],
        [3, 10],
        [2, 10],
        [1, 10],
        [0, 12],
      ],
      barre: { fret: 10, strings: [1, 2, 3, 5] },
    },
  ],

  "9+": [
    {
      region: "fret-4",
      positions: [
        [4, 5],
        [3, 4],
        [2, 5],
        [1, 6],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [5, 10],
        [4, 9],
        [3, 10],
        [2, 10],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [3, 12],
        [2, 11],
        [1, 13],
        [0, 13],
      ],
      barre: null,
    },
  ],

};

export default voicings;
