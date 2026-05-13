// Voicings de violão importados de musicca.com.
// Veja docs/adr/0011-musicca-as-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/musicca/apply.mjs.

const voicings = {

  "5": [
    {
      region: "open",
      positions: [
        [1, 1],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [2, 5],
        [3, 5],
        [4, 3],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [2, 5],
        [1, 8],
        [0, 8],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 10],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 12],
        [1, 13],
      ],
      barre: null,
    },
  ],

  "6": [
    {
      region: "open",
      positions: [
        [4, 3],
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
        [5, 8],
        [4, 7],
        [3, 5],
        [2, 5],
        [1, 5],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 1, 2, 3] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 8],
        [4, 7],
        [3, 7],
        [2, 9],
        [1, 8],
      ],
      barre: { fret: 7, strings: [3, 4] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 10],
        [2, 9],
        [1, 10],
      ],
      barre: null,
    },
  ],

  "7": [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 3],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 5],
        [2, 3],
        [1, 5],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 2, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [2, 5],
        [1, 5],
        [0, 6],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 8],
        [4, 7],
        [3, 8],
        [2, 5],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 8],
        [2, 9],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 3, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 12],
        [1, 11],
        [0, 12],
      ],
      barre: null,
    },
  ],

  "9": [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 3],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 3],
        [3, 2],
        [2, 3],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [5, 8],
        [4, 7],
        [3, 8],
        [2, 7],
      ],
      barre: { fret: 7, strings: [2, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 8],
        [2, 9],
        [1, 8],
        [0, 10],
      ],
      barre: { fret: 8, strings: [1, 3, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 10],
        [2, 9],
        [1, 11],
        [0, 10],
      ],
      barre: null,
    },
  ],

  "11": [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 3],
        [2, 3],
        [1, 3],
        [0, 0],
      ],
      barre: { fret: 3, strings: [2, 3, 4] },
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 3],
        [2, 3],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 3],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1] },
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 3],
        [2, 3],
        [1, 5],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 2, 3, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 8],
        [3, 8],
        [2, 9],
        [1, 11],
        [0, 10],
      ],
      barre: { fret: 8, strings: [3, 4, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 10],
        [1, 11],
        [0, 12],
      ],
      barre: { fret: 10, strings: [2, 3] },
    },
  ],

  "13": [
    {
      region: "open",
      positions: [
        [4, 3],
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
        [4, 3],
        [3, 3],
        [2, 2],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 8],
        [3, 8],
        [2, 9],
        [1, 10],
        [0, 10],
      ],
      barre: { fret: 8, strings: [3, 4, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 8],
        [3, 8],
        [2, 9],
        [1, 10],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 3, 4, 5] },
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
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 5],
        [2, 5],
        [1, 5],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [2, 5],
        [1, 5],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [0, 8],
        [4, 7],
        [5, 8],
      ],
      barre: { fret: 5, strings: [5, 4, 3, 2, 1, 0] },
      manual: true,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 10],
        [2, 9],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 10],
        [2, 9],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 12],
        [0, 12],
      ],
      barre: null,
    },
  ],

  m: [
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 5],
        [2, 5],
        [1, 4],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 4] },
    },
    {
      region: "fret-3",
      positions: [
        [2, 5],
        [1, 4],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 10],
        [2, 8],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 2, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 10],
        [2, 8],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 2] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 10],
        [2, 8],
        [1, 8],
        [0, 11],
      ],
      barre: { fret: 8, strings: [1, 2] },
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 1],
        [1, 1],
      ],
      barre: { fret: 1, strings: [1, 2] },
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [2, 5],
        [1, 5],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [2, 5],
        [1, 5],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 8],
        [4, 7],
        [3, 6],
        [2, 5],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 8],
        [4, 7],
        [3, 6],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 10],
        [2, 9],
        [1, 9],
        [0, 8],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 0],
        [1, 1],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 0],
        [1, 1],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 5],
        [2, 5],
        [1, 3],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 1, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 8],
        [4, 5],
        [3, 5],
        [2, 5],
      ],
      barre: { fret: 5, strings: [2, 3, 4] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 10],
        [2, 7],
        [1, 8],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 12],
        [1, 13],
        [0, 10],
      ],
      barre: { fret: 10, strings: [0, 3] },
    },
  ],

  sus4: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 3],
        [2, 0],
        [1, 1],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 3],
        [2, 0],
        [1, 1],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 1] },
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 3],
        [2, 5],
        [1, 6],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 3, 4] },
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 5],
        [2, 5],
        [1, 6],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 10],
        [2, 10],
      ],
      barre: null,
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 1],
        [2, 2],
        [1, 1],
        [0, 3],
      ],
      barre: { fret: 1, strings: [1, 3] },
    },
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
    {
      region: "fret-4",
      positions: [
        [2, 5],
        [1, 4],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 10],
        [2, 8],
        [1, 10],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 2] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 12],
        [1, 10],
        [0, 11],
      ],
      barre: { fret: 10, strings: [1, 3] },
    },
  ],

  "6/9": [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 2],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 3],
        [3, 2],
        [2, 2],
        [1, 3],
        [0, 3],
      ],
      barre: { fret: 2, strings: [2, 3] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 8],
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 5],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 1, 2, 3, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 8],
        [4, 5],
        [3, 5],
        [2, 7],
        [1, 5],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 1, 3, 4] },
    },
    {
      region: "fret-5",
      positions: [
        [5, 8],
        [4, 5],
        [3, 7],
        [2, 5],
        [1, 5],
        [0, 5],
      ],
      barre: { fret: 5, strings: [0, 1, 2, 4] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 10],
        [2, 9],
        [1, 10],
        [0, 10],
      ],
      barre: null,
    },
  ],

  m7: [
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 5],
        [2, 3],
        [1, 4],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 2, 4] },
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [2, 3],
        [1, 4],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 2, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 8],
        [2, 8],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 2, 3, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 12],
        [1, 11],
        [0, 11],
      ],
      barre: null,
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
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 4],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-3",
      positions: [
        [4, 3],
        [3, 5],
        [2, 4],
        [1, 5],
        [0, 3],
      ],
      barre: { fret: 3, strings: [0, 4] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 10],
        [2, 9],
        [1, 8],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 9],
        [2, 9],
        [1, 8],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 1, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 12],
        [1, 12],
        [0, 12],
      ],
      barre: null,
    },
  ],

  "m7(b5)": [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 1],
        [2, 3],
        [1, 1],
        [0, 2],
      ],
      barre: { fret: 1, strings: [1, 3] },
    },
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
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 9],
        [3, 8],
        [2, 8],
      ],
      barre: { fret: 8, strings: [2, 3, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 9],
        [3, 8],
        [2, 8],
        [1, 11],
        [0, 8],
      ],
      barre: { fret: 8, strings: [0, 2, 3, 5] },
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 11],
        [1, 11],
        [0, 11],
      ],
      barre: null,
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 1],
        [2, 2],
        [1, 1],
        [0, 2],
      ],
      barre: { fret: 1, strings: [1, 3] },
    },
    {
      region: "fret-2",
      positions: [
        [4, 3],
        [3, 4],
        [2, 2],
        [1, 4],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 2] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 8],
        [4, 9],
        [3, 7],
        [2, 8],
      ],
      barre: null,
    },
    {
      region: "fret-10",
      positions: [
        [3, 10],
        [2, 11],
        [1, 10],
        [0, 11],
      ],
      barre: { fret: 10, strings: [1, 3] },
    },
  ],

  add9: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 0],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 0],
        [1, 3],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 0],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 8],
        [4, 5],
        [3, 5],
        [2, 5],
        [1, 5],
      ],
      barre: { fret: 5, strings: [1, 2, 3, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 10],
        [2, 9],
        [1, 8],
        [0, 10],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 2],
        [2, 0],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 0],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 4],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 4],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 8],
        [4, 7],
        [3, 9],
        [2, 0],
        [1, 0],
        [0, 10],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [3, 10],
        [2, 9],
        [1, 12],
        [0, 10],
      ],
      barre: null,
    },
  ],

  m9: [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 1],
        [2, 3],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 0],
        [2, 3],
        [1, 4],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 8],
        [4, 6],
        [3, 8],
        [2, 7],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 8],
        [2, 8],
        [1, 8],
        [0, 10],
      ],
      barre: { fret: 8, strings: [1, 2, 3, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 10],
        [2, 8],
        [1, 11],
        [0, 10],
      ],
      barre: null,
    },
  ],

  "9+": [
    {
      region: "open",
      positions: [
        [4, 3],
        [3, 5],
        [2, 3],
        [1, 4],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 3],
        [3, 2],
        [2, 3],
        [1, 4],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 8],
        [4, 6],
        [3, 8],
        [2, 9],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [5, 8],
        [4, 10],
        [3, 8],
        [2, 9],
        [1, 8],
        [0, 11],
      ],
      barre: { fret: 8, strings: [1, 3, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 10],
        [2, 9],
        [1, 11],
        [0, 11],
      ],
      barre: null,
    },
  ],

};

export default voicings;
