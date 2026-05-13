// Voicings de violão importados de musicca.com.
// Veja docs/adr/0011-musicca-as-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/musicca/apply.mjs.

const voicings = {
  5: [
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [2, 4],
        [1, 7],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 9],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 11],
        [1, 12],
      ],
      barre: null,
    },
  ],

  6: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 1],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 6],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 1, 2, 3] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 11],
        [1, 9],
        [0, 11],
      ],
      barre: { fret: 9, strings: [1, 3] },
    },
  ],

  7: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 2],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 2],
        [1, 4],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 2, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 7],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 7],
        [2, 8],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 3, 5] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 7],
        [2, 8],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 3, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 11],
        [1, 10],
        [0, 11],
      ],
      barre: null,
    },
  ],

  9: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 2],
        [1, 2],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 5],
      ],
      barre: { fret: 4, strings: [1, 2, 3, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 7],
        [2, 6],
      ],
      barre: { fret: 6, strings: [2, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 7],
        [2, 6],
        [1, 7],
      ],
      barre: { fret: 6, strings: [2, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 9],
        [2, 8],
        [1, 10],
        [0, 9],
      ],
      barre: null,
    },
  ],

  11: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 2],
        [1, 2],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 2],
        [2, 2],
        [1, 2],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 1, 2, 3, 4] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 7],
        [3, 7],
        [2, 8],
        [1, 7],
        [0, 9],
      ],
      barre: { fret: 7, strings: [1, 3, 4, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 9],
        [1, 10],
        [0, 11],
      ],
      barre: { fret: 9, strings: [2, 3] },
    },
  ],

  13: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 1],
        [1, 2],
      ],
      barre: { fret: 1, strings: [2, 3] },
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 2],
        [1, 2],
        [0, 4],
      ],
      barre: { fret: 2, strings: [1, 2, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 6],
        [2, 6],
      ],
      barre: { fret: 6, strings: [2, 3, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 9],
      ],
      barre: { fret: 6, strings: [2, 3, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 9],
        [2, 8],
        [1, 9],
        [0, 9],
      ],
      barre: null,
    },
  ],

  Maj: [
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 4],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 6],
        [3, 4],
        [2, 4],
        [1, 4],
      ],
      barre: { fret: 4, strings: [1, 2, 3] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 9],
        [2, 8],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 5] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 9],
        [2, 8],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1] },
    },
    {
      region: "fret-11",
      positions: [
        [2, 11],
        [1, 12],
        [0, 11],
      ],
      barre: null,
    },
  ],

  m: [
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 3],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 4] },
    },
    {
      region: "fret-2",
      positions: [
        [2, 4],
        [1, 3],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 5],
        [3, 4],
        [2, 4],
      ],
      barre: { fret: 4, strings: [2, 3] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 9],
        [2, 7],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 2, 5] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 9],
        [2, 7],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 2] },
    },
  ],

  aug: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 0],
        [1, 0],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 0],
        [1, 0],
        [0, 3],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 6],
        [3, 5],
        [2, 4],
      ],
      barre: null,
    },
    {
      region: "fret-5",
      positions: [
        [5, 7],
        [4, 6],
        [3, 5],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [3, 9],
        [2, 8],
        [1, 8],
        [0, 7],
      ],
      barre: null,
    },
    {
      region: "fret-8",
      positions: [
        [3, 9],
        [2, 8],
        [1, 8],
      ],
      barre: null,
    },
  ],

  sus2: [
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 2],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 1, 4] },
    },
    {
      region: "fret-2",
      positions: [
        [2, 4],
        [1, 2],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 1] },
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 4],
        [3, 4],
        [2, 4],
      ],
      barre: { fret: 4, strings: [2, 3, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [3, 9],
        [2, 6],
        [1, 7],
      ],
      barre: null,
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 11],
        [1, 12],
        [0, 9],
      ],
      barre: { fret: 9, strings: [0, 3] },
    },
  ],

  sus4: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 0],
        [0, 0],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 5],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 2],
        [2, 4],
        [1, 5],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 3, 4] },
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 5],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 4] },
    },
  ],

  m6: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 0],
        [2, 1],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 9],
        [2, 7],
        [1, 9],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 2, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 11],
        [1, 9],
        [0, 10],
      ],
      barre: { fret: 9, strings: [1, 3] },
    },
  ],

  "6/9": [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 1],
        [1, 2],
        [0, 2],
      ],
      barre: { fret: 1, strings: [2, 3] },
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 4],
        [1, 2],
        [0, 4],
      ],
      barre: { fret: 2, strings: [1, 4] },
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 1, 2, 3, 4] },
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 4],
        [3, 4],
        [2, 6],
        [1, 4],
        [0, 4],
      ],
      barre: { fret: 4, strings: [0, 1, 3, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 6],
        [2, 6],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 6, strings: [2, 3, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 9],
        [2, 8],
        [1, 9],
        [0, 9],
      ],
      barre: null,
    },
  ],

  m7: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 0],
        [2, 2],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 2],
        [1, 3],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 4] },
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [2, 4],
        [1, 3],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 4] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 7],
        [2, 7],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 2, 3, 5] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 9],
        [2, 7],
        [1, 10],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 2] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 11],
        [1, 10],
        [0, 10],
      ],
      barre: null,
    },
  ],

  maj7: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 3],
        [1, 0],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-2",
      positions: [
        [4, 2],
        [3, 4],
        [2, 3],
        [1, 4],
        [0, 2],
      ],
      barre: { fret: 2, strings: [0, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [3, 9],
        [2, 8],
        [1, 7],
        [0, 6],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 8],
        [2, 8],
        [1, 7],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 1, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 11],
        [1, 11],
        [0, 11],
      ],
      barre: null,
    },
  ],

  "m7(b5)": [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 0],
        [2, 2],
        [1, 0],
        [0, 1],
      ],
      barre: null,
    },
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
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 8],
        [3, 7],
        [2, 7],
        [1, 10],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 2, 3, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 10],
        [1, 10],
        [0, 10],
      ],
      barre: null,
    },
  ],

  dim7: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 3],
        [2, 1],
        [1, 3],
        [0, 1],
      ],
      barre: { fret: 1, strings: [0, 2] },
    },
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 3],
        [2, 1],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 8],
        [3, 6],
        [2, 7],
        [1, 6],
      ],
      barre: { fret: 6, strings: [1, 3] },
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 8],
        [3, 9],
        [2, 7],
        [1, 9],
        [0, 7],
      ],
      barre: { fret: 7, strings: [0, 2, 5] },
    },
    {
      region: "fret-9",
      positions: [
        [3, 9],
        [2, 10],
        [1, 9],
        [0, 10],
      ],
      barre: null,
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
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 4],
        [1, 2],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [3, 9],
        [2, 8],
        [1, 0],
        [0, 9],
      ],
      barre: null,
    },
    {
      region: "fret-4",
      positions: [
        [5, 7],
        [4, 4],
        [3, 4],
        [2, 4],
        [1, 4],
      ],
      barre: { fret: 4, strings: [1, 2, 3, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 9],
        [2, 6],
      ],
      barre: { fret: 6, strings: [2, 4] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 9],
        [2, 8],
        [1, 7],
        [0, 9],
      ],
      barre: null,
    },
  ],

  maj9: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 3],
        [1, 2],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 8],
        [2, 6],
        [1, 7],
      ],
      barre: { fret: 6, strings: [2, 4] },
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 8],
        [2, 6],
        [1, 7],
        [0, 6],
      ],
      barre: { fret: 6, strings: [0, 2, 4] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 9],
        [2, 8],
        [1, 11],
        [0, 9],
      ],
      barre: null,
    },
  ],

  m9: [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 0],
        [2, 2],
        [1, 2],
        [0, 2],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 7],
        [2, 7],
        [1, 7],
        [0, 9],
      ],
      barre: { fret: 7, strings: [1, 2, 3, 5] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 9],
        [2, 7],
        [1, 7],
        [0, 9],
      ],
      barre: { fret: 7, strings: [1, 2] },
    },
    {
      region: "fret-7",
      positions: [
        [3, 9],
        [2, 7],
        [1, 10],
        [0, 9],
      ],
      barre: null,
    },
  ],

  "9+": [
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 1],
        [2, 2],
        [1, 3],
      ],
      barre: null,
    },
    {
      region: "open",
      positions: [
        [4, 2],
        [3, 0],
        [2, 2],
        [1, 4],
      ],
      barre: null,
    },
    {
      region: "fret-6",
      positions: [
        [5, 7],
        [4, 6],
        [3, 7],
        [2, 7],
      ],
      barre: null,
    },
    {
      region: "fret-7",
      positions: [
        [5, 7],
        [4, 9],
        [3, 7],
        [2, 8],
        [1, 7],
        [0, 10],
      ],
      barre: { fret: 7, strings: [1, 3, 5] },
    },
    {
      region: "fret-8",
      positions: [
        [3, 9],
        [2, 8],
        [1, 10],
        [0, 10],
      ],
      barre: null,
    },
  ],
};

export default voicings;
