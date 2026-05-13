// Slash chord voicings importados de tombatossals/chords-db (GitHub).
// Veja docs/adr/0012-chords-db-as-slash-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/slash-voicings/apply.mjs.

const slashVoicings = {
  Maj: {
    A: [
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [2, 6],
          [1, 7],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 8],
          [2, 6],
          [1, 7],
          [0, 9],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "fret-4",
        positions: [
          [2, 6],
          [1, 7],
          [0, 6],
        ],
        barre: { fret: 4, strings: [3, 4, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2, 3] },
      },
      {
        region: "fret-11",
        positions: [
          [0, 14],
        ],
        barre: { fret: 11, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-11",
        positions: [],
        barre: { fret: 11, strings: [1, 2, 3, 4] },
      },
    ],
    B: [
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 3],
        ],
        barre: { fret: 2, strings: [1, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 9],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [2, 11],
          [1, 11],
        ],
        barre: { fret: 9, strings: [0, 3] },
      },
    ],
    Bb: [
      {
        region: "fret-6",
        positions: [
          [4, 9],
          [3, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 6],
          [1, 7],
          [0, 9],
        ],
        barre: null,
      },
    ],
    C: [
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 4],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 4],
          [2, 3],
          [1, 2],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [5, 8],
          [4, 9],
        ],
        barre: { fret: 11, strings: [1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 10],
          [2, 11],
          [1, 11],
          [0, 9],
        ],
        barre: null,
      },
    ],
    "C#": [
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [3, 4],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
      {
        region: "fret-4",
        positions: [
          [2, 6],
          [1, 7],
          [0, 6],
        ],
        barre: { fret: 4, strings: [3, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
          [2, 11],
          [1, 11],
        ],
        barre: { fret: 9, strings: [0, 4, 5] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
          [2, 11],
          [1, 11],
          [0, 9],
        ],
        barre: null,
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 11],
          [1, 11],
          [0, 9],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [4, 5],
          [3, 4],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [3, 4],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [2, 6],
          [1, 7],
          [0, 6],
        ],
        barre: { fret: 4, strings: [3, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 9],
          [3, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1, 3] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 3],
          [1, 2],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [1, 7],
          [0, 9],
        ],
        barre: { fret: 6, strings: [2, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [4, 13],
          [0, 14],
        ],
        barre: { fret: 11, strings: [1, 2, 3, 5] },
      },
    ],
    F: [
      {
        region: "fret-2",
        positions: [
          [3, 3],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 8],
          [3, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 2] },
      },
      {
        region: "fret-11",
        positions: [
          [5, 13],
          [4, 13],
          [0, 14],
        ],
        barre: { fret: 11, strings: [1, 2, 3] },
      },
    ],
    G: [
      {
        region: "fret-2",
        positions: [
          [3, 5],
          [2, 3],
        ],
        barre: { fret: 2, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [3, 4],
        ],
        barre: { fret: 3, strings: [2, 5] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 5],
          [2, 6],
          [1, 7],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [4, 10],
        ],
        barre: { fret: 11, strings: [1, 2, 3] },
      },
    ],
  },
  m: {
    A: [
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [2, 6],
          [1, 7],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [5, 5],
          [4, 4],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 0],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [5, 4],
          [4, 4],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [2, 6],
          [1, 7],
          [0, 5],
        ],
        barre: { fret: 4, strings: [3, 4, 5] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 6],
          [2, 6],
          [1, 7],
          [0, 5],
        ],
        barre: null,
      },
    ],
    B: [
      {
        region: "fret-2",
        positions: [
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
        ],
        barre: { fret: 2, strings: [1, 2, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [2, 11],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 3] },
      },
    ],
    Bb: [
      {
        region: "fret-5",
        positions: [
          [3, 8],
          [2, 6],
          [1, 7],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [4, 9],
          [3, 7],
        ],
        barre: { fret: 6, strings: [2, 5] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 8],
          [2, 11],
          [1, 10],
          [0, 9],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [4, 13],
          [3, 11],
        ],
        barre: { fret: 14, strings: [0, 1, 2] },
      },
    ],
    C: [
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 4],
        ],
        barre: { fret: 2, strings: [1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 10],
          [2, 11],
          [1, 10],
          [0, 9],
        ],
        barre: null,
      },
    ],
    "C#": [
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [3, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [2, 6],
          [1, 7],
          [0, 5],
        ],
        barre: { fret: 4, strings: [3, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
          [2, 11],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 4, 5] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
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
        region: "fret-2",
        positions: [
          [4, 5],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 7],
          [2, 6],
          [1, 7],
        ],
        barre: { fret: 5, strings: [0, 4] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [3, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2] },
      },
      {
        region: "fret-2",
        positions: [],
        barre: { fret: 2, strings: [0, 1, 2, 3] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 7],
          [1, 7],
        ],
        barre: { fret: 6, strings: [2, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [4, 12],
          [1, 14],
          [0, 14],
        ],
        barre: { fret: 11, strings: [2, 3, 5] },
      },
    ],
    F: [
      {
        region: "fret-2",
        positions: [
          [3, 3],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 8],
          [3, 7],
          [2, 6],
          [1, 7],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [5, 13],
          [4, 12],
          [3, 11],
        ],
        barre: { fret: 14, strings: [0, 1, 2] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [5, 3],
          [4, 4],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 5],
        ],
        barre: { fret: 2, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [2, 6],
          [1, 7],
        ],
        barre: { fret: 5, strings: [0, 3] },
      },
    ],
  },
  m9: {
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 4],
          [0, 4],
        ],
        barre: { fret: 2, strings: [1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [3, 4],
          [0, 4],
        ],
        barre: { fret: 2, strings: [1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 7],
          [2, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [5, 12],
          [3, 11],
        ],
        barre: { fret: 9, strings: [0, 1, 2, 4] },
      },
    ],
    A: [
      {
        region: "fret-4",
        positions: [
          [5, 5],
          [2, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 3, 4] },
      },
      {
        region: "fret-4",
        positions: [
          [5, 5],
          [2, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
