// Voicings de violão importados de musicca.com.
// Veja docs/adr/0011-musicca-as-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/musicca/apply.mjs.

const voicings = {
  5: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 3],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [2, 3],
        [1, 6],
        [0, 6],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 8],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 11],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [2, 10],
        [1, 11],
      ],
      barre: null,
    },
  ],

  6: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 0],
        [1, 3],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 0],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [3, 5],
        [2, 7],
        [1, 6],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [3, 8],
        [2, 7],
        [1, 8],
        [0, 6],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 8],
        [0, 10],
      ],
      barre: { fret: 8, strings: [1, 3] },
    },
    {
      region: "fret-12",
      positions: [
        [4, 13],
        [3, 12],
        [2, 12],
        [0, 13],
      ],
      barre: { fret: 12, strings: [2, 3] },
    },
  ],

  7: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 1],
        [1, 3],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 2, 4] },
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 1],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [2, 3],
        [1, 3],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 6],
        [2, 7],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 3, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [4, 13],
        [3, 12],
        [2, 13],
        [1, 11],
      ],
      barre: null,
    },
  ],

  9: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 1],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1, 2] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [4, 5],
        [3, 6],
        [2, 5],
        [1, 6],
      ],
      barre: { fret: 5, strings: [2, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [4, 5],
        [3, 6],
        [2, 5],
      ],
      barre: { fret: 5, strings: [2, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [3, 6],
        [2, 7],
        [1, 6],
        [0, 8],
      ],
      barre: { fret: 6, strings: [1, 3, 5] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 6],
        [2, 7],
        [1, 6],
        [0, 8],
      ],
      barre: { fret: 6, strings: [1, 3, 5] },
    },
  ],

  11: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 1],
        [2, 1],
        [1, 3],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 2, 3, 4] },
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 1],
        [2, 1],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1, 2, 3, 4] },
    },
    {
      region: "fret-4",
      positions: [
        [5, 6],
        [3, 6],
        [2, 5],
        [1, 4],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 1] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 6],
        [2, 8],
        [1, 6],
        [0, 8],
      ],
      barre: { fret: 6, strings: [1, 3, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 8],
        [1, 9],
        [0, 10],
      ],
      barre: { fret: 8, strings: [2, 3] },
    },
    {
      region: "fret-11",
      positions: [
        [4, 13],
        [3, 12],
        [2, 13],
        [1, 11],
        [0, 11],
      ],
      barre: { fret: 11, strings: [0, 1] },
    },
  ],

  13: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 0],
        [1, 3],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 1],
        [1, 1],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 6],
        [2, 7],
        [1, 8],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 3, 5] },
    },
  ],

  Maj: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 3],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 3],
        [1, 3],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 4] },
    },
    {
      region: "open",
      positions: [
        [2, 3],
        [1, 3],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 8],
        [2, 7],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 5] },
    },
    {
      region: "fret-6",
      positions: [
        [3, 8],
        [2, 7],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1] },
    },
  ],

  m: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 3],
        [1, 2],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 4] },
    },
    {
      region: "open",
      positions: [
        [2, 3],
        [1, 2],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 8],
        [2, 6],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 2, 5] },
    },
    {
      region: "fret-6",
      positions: [
        [3, 8],
        [2, 6],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 2] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 11],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [3, 11],
        [2, 10],
        [1, 11],
      ],
      barre: null,
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
        [4, 1],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [2, 3],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [5, 6],
        [4, 5],
        [3, 4],
        [2, 3],
        [1, 3],
      ],
      barre: { fret: 3, strings: [1, 2] },
    },
    {
      region: "fret-3",
      positions: [
        [5, 6],
        [4, 5],
        [3, 4],
        [2, 3],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [3, 8],
        [2, 7],
        [1, 7],
        [0, 6],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [4, 13],
        [3, 12],
        [2, 11],
        [1, 11],
      ],
      barre: { fret: 11, strings: [1, 2] },
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 3],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1, 4] },
    },
    {
      region: "open",
      positions: [
        [2, 3],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1] },
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 5],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 10],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 11],
        [0, 8],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [3, 10],
        [2, 10],
        [1, 11],
      ],
      barre: { fret: 10, strings: [2, 3] },
    },
  ],

  sus4: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 3],
        [1, 4],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 8],
        [2, 8],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 5] },
    },
    {
      region: "fret-6",
      positions: [
        [3, 8],
        [2, 8],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 11],
        [0, 11],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [3, 13],
        [2, 10],
        [1, 11],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [3, 13],
        [2, 10],
      ],
      barre: null,
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 0],
        [1, 2],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 0],
        [1, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 0],
        [1, 2],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [3, 5],
        [2, 6],
        [1, 6],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 8],
        [0, 9],
      ],
      barre: { fret: 8, strings: [1, 3] },
    },
    {
      region: "fret-11",
      positions: [
        [4, 13],
        [3, 11],
        [2, 12],
        [1, 11],
      ],
      barre: null,
    },
  ],

  "6/9": [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 0],
        [1, 1],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [5, 6],
        [4, 3],
        [3, 5],
        [2, 3],
        [1, 3],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 1, 2, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 5, strings: [2, 3, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [2, 7],
        [1, 8],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 5] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 8],
        [2, 7],
        [1, 8],
        [0, 8],
      ],
      barre: null,
    },
    {
      region: "fret-12",
      positions: [
        [4, 13],
        [3, 12],
        [2, 12],
        [1, 13],
      ],
      barre: { fret: 12, strings: [2, 3] },
    },
  ],

  m7: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 1],
        [1, 2],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 2, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 6],
        [2, 6],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 2, 3, 5] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [3, 6],
        [2, 6],
        [1, 6],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 8],
        [2, 6],
        [1, 9],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 2, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 9],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [4, 13],
        [3, 11],
        [2, 13],
        [1, 11],
      ],
      barre: { fret: 11, strings: [1, 3] },
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 2],
        [1, 3],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [3, 8],
        [2, 7],
        [1, 6],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 7],
        [2, 7],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 5] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [3, 7],
        [2, 7],
        [1, 6],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 1, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 10],
        [1, 10],
        [0, 10],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [3, 12],
        [2, 10],
        [1, 10],
      ],
      barre: { fret: 10, strings: [1, 2] },
    },
  ],

  "m7(b5)": [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 2],
        [2, 1],
        [1, 2],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 2],
        [2, 1],
        [1, 2],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 7],
        [3, 6],
        [2, 6],
        [1, 9],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 2, 3, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 9],
        [1, 9],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [4, 13],
        [3, 11],
        [2, 9],
        [1, 9],
      ],
      barre: { fret: 9, strings: [1, 2] },
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 2],
        [2, 0],
        [1, 2],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
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
        [4, 13],
        [3, 11],
        [2, 12],
        [1, 11],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [4, 7],
        [3, 5],
        [2, 6],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 8],
        [2, 9],
        [1, 8],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "fret-11",
      positions: [
        [4, 13],
        [3, 11],
        [2, 12],
        [1, 11],
        [0, 12],
      ],
      barre: { fret: 11, strings: [1, 3] },
    },
  ],

  add9: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 3],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1] },
    },
    {
      region: "fret-3",
      positions: [
        [5, 6],
        [4, 3],
        [3, 3],
        [2, 5],
        [1, 3],
      ],
      barre: { fret: 3, strings: [1, 3, 4] },
    },
    {
      region: "fret-3",
      positions: [
        [5, 6],
        [4, 5],
        [3, 3],
        [2, 5],
        [1, 3],
      ],
      barre: { fret: 3, strings: [1, 3] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [3, 8],
        [2, 7],
        [1, 6],
        [0, 8],
      ],
      barre: { fret: 6, strings: [1, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [3, 12],
        [2, 10],
        [1, 13],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 2],
        [1, 1],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [4, 5],
        [3, 7],
        [2, 5],
        [1, 6],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 2, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [4, 5],
        [3, 7],
        [2, 5],
        [1, 6],
      ],
      barre: { fret: 5, strings: [2, 4] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 8],
        [2, 7],
        [1, 10],
        [0, 8],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [4, 13],
        [3, 10],
        [2, 10],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 1, 2, 3] },
    },
  ],

  m9: [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 3],
        [2, 1],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1, 2, 4] },
    },
    {
      region: "fret-4",
      positions: [
        [5, 6],
        [4, 4],
        [3, 6],
        [2, 5],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [3, 6],
        [2, 6],
        [1, 6],
        [0, 8],
      ],
      barre: { fret: 6, strings: [1, 2, 3, 5] },
    },
    {
      region: "fret-11",
      positions: [
        [4, 13],
        [3, 11],
        [2, 13],
        [1, 13],
      ],
      barre: null,
    },
  ],

  "9+": [
    {
      region: "open",
      positions: [
        [4, 1],
        [3, 0],
        [2, 1],
        [1, 2],
        [0, 1],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 6],
        [4, 5],
        [3, 6],
        [2, 6],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 6],
        [4, 8],
        [3, 6],
        [2, 7],
        [1, 6],
        [0, 9],
      ],
      barre: { fret: 6, strings: [1, 3, 5] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 8],
        [2, 7],
        [1, 9],
        [0, 9],
      ],
      barre: null,
    },
  ],
};

export default voicings;
