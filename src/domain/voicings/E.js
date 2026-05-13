// Voicings de violão importados de musicca.com.
// Veja docs/adr/0011-musicca-as-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/musicca/apply.mjs.

const voicings = {

  "5": [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 9],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [3, 2],
        [2, 4],
        [1, 5],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [1, 5],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [2, 9],
        [1, 12],
        [0, 12],
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
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 4],
        [1, 2],
        [0, 4],
      ],
      barre: { fret: 2, strings: [1, 3, 4] },
    },
    {
      region: "open",
      positions: [
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
        [5, 0],
        [4, 11],
        [3, 11],
        [2, 13],
        [1, 12],
      ],
      barre: { fret: 11, strings: [3, 4] },
    },
    {
      region: "fret-2",
      positions: [
        [3, 2],
        [2, 4],
        [1, 2],
        [0, 4],
      ],
      barre: { fret: 2, strings: [1, 3] },
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
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 1],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 0],
        [2, 1],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 7],
        [1, 9],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 2, 4] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 12],
        [2, 13],
        [1, 12],
      ],
      barre: null,
    },
  ],

  "9": [
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
    {
      region: "open",
      positions: [
        [3, 2],
        [2, 1],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 6],
        [2, 7],
        [1, 7],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 12],
        [2, 11],
      ],
      barre: { fret: 11, strings: [2, 4] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 12],
        [2, 11],
        [1, 12],
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
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 0],
        [3, 0],
        [2, 1],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 0],
        [3, 6],
        [2, 7],
        [1, 7],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 7],
        [2, 7],
        [1, 9],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 2, 3, 4] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 0],
        [3, 0],
        [2, 13],
        [1, 12],
      ],
      barre: null,
    },
  ],

  "13": [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 4],
        [3, 0],
        [2, 1],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 0],
        [2, 1],
        [1, 2],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 0],
        [3, 0],
        [2, 11],
        [1, 12],
        [0, 9],
      ],
      barre: null,
    },
  ],

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
      region: "open",
      positions: [
        [5, 0],
        [2, 4],
        [1, 5],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 9],
        [1, 9],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 9],
        [2, 9],
        [1, 9],
      ],
      barre: { fret: 9, strings: [1, 2, 3] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [2, 13],
        [1, 12],
        [0, 12],
      ],
      barre: { fret: 12, strings: [0, 1] },
    },
    {
      region: "fret-9",
      positions: [
        [5, 12],
        [4, 11],
        [3, 9],
        [2, 9],
        [1, 9],
      ],
      barre: { fret: 9, strings: [1, 2, 3] },
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
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 4],
        [1, 5],
        [0, 3],
      ],
      barre: { fret: 2, strings: [3, 4] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 2],
        [2, 0],
        [1, 0],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 2],
        [2, 4],
        [1, 5],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 9],
        [1, 8],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 4] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 10],
        [3, 9],
        [2, 9],
        [1, 8],
        [0, 0],
      ],
      barre: null,
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [3, 2],
        [2, 1],
        [1, 1],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 6],
        [2, 5],
        [1, 5],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [4, 7],
        [3, 6],
        [2, 5],
        [1, 5],
      ],
      barre: { fret: 5, strings: [1, 2] },
    },
    {
      region: "fret-9",
      positions: [
        [5, 12],
        [4, 11],
        [3, 10],
        [2, 9],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 4],
        [2, 4],
        [1, 5],
      ],
      barre: { fret: 4, strings: [2, 3] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 9],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 4] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 9],
        [2, 9],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 9],
        [3, 9],
        [2, 11],
        [1, 12],
      ],
      barre: { fret: 9, strings: [3, 4] },
    },
  ],

  sus4: [
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
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 2],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 0],
        [3, 2],
        [2, 4],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 0],
        [3, 2],
        [2, 4],
        [1, 5],
        [0, 5],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 9],
        [1, 10],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 7],
        [2, 9],
        [1, 10],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 3, 4] },
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
      region: "open",
      positions: [
        [5, 0],
        [4, 4],
        [3, 2],
        [2, 0],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 5],
        [2, 6],
        [1, 5],
      ],
      barre: { fret: 5, strings: [1, 3] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 9],
        [2, 9],
        [1, 8],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 10],
        [3, 11],
        [2, 12],
        [1, 12],
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
        [2, 1],
        [4, 2],
        [5, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 4],
        [3, 4],
        [2, 1],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 4],
        [2, 4],
        [1, 2],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 6],
        [2, 6],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 6, strings: [2, 3] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 11],
        [2, 11],
        [1, 12],
        [0, 12],
      ],
      barre: { fret: 11, strings: [2, 3, 4] },
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
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
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
        [5, 0],
        [4, 2],
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
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 7],
        [1, 8],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 2, 4] },
    },
    {
      region: "fret-10",
      positions: [
        [5, 12],
        [4, 10],
        [3, 12],
        [2, 12],
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
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 9],
        [2, 8],
        [1, 9],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 4] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 13],
        [2, 13],
        [1, 12],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [3, 2],
        [2, 4],
        [1, 4],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [4, 7],
        [3, 6],
        [2, 4],
        [1, 4],
      ],
      barre: null,
    },
    {
      region: "fret-12",
      positions: [
        [5, 12],
        [3, 13],
        [2, 13],
        [1, 12],
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
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 2],
        [2, 3],
        [1, 3],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 8],
        [2, 7],
        [1, 8],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [3, 2],
        [2, 3],
        [1, 3],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [4, 7],
        [3, 8],
        [2, 7],
        [1, 8],
      ],
      barre: null,
    },
  ],

  dim7: [
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
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 8],
        [2, 6],
        [1, 8],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 11],
        [2, 12],
        [1, 11],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [3, 2],
        [2, 3],
        [1, 2],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 7],
        [3, 8],
        [2, 6],
        [1, 8],
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
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 4],
        [2, 1],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 4],
        [2, 4],
        [1, 0],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 4],
        [2, 4],
        [1, 5],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 2, 3] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 6],
        [2, 9],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 9],
        [2, 11],
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
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 1],
        [2, 1],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 1, 2, 3] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 1, 2, 3] },
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 13],
        [2, 11],
        [1, 12],
      ],
      barre: { fret: 11, strings: [2, 4] },
    },
    {
      region: "fret-11",
      positions: [
        [5, 12],
        [4, 11],
        [3, 13],
        [2, 11],
        [1, 12],
      ],
      barre: { fret: 11, strings: [2, 4] },
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
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 2],
        [2, 0],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 4],
        [2, 0],
        [1, 3],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 7],
        [3, 5],
        [2, 7],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 10],
        [3, 12],
        [2, 11],
        [1, 12],
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
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 2],
        [3, 0],
        [2, 0],
        [1, 0],
        [0, 4],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [3, 2],
        [2, 1],
        [1, 3],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [5, 0],
        [4, 11],
        [3, 12],
        [2, 12],
        [1, 12],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [4, 7],
        [3, 6],
        [2, 7],
        [1, 8],
      ],
      barre: null,
    },
  ],

};

export default voicings;
