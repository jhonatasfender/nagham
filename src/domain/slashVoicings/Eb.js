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
          [3, 1],
          [2, 3],
          [1, 4],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 5],
          [2, 3],
          [1, 4],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 8],
          [2, 8],
          [1, 8],
          [0, 6],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "fret-3",
        positions: [
          [3, 6],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [2, 8],
          [1, 8],
        ],
        barre: { fret: 6, strings: [0, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 3] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 13],
          [2, 12],
        ],
        barre: { fret: 11, strings: [0, 1, 4] },
      },
    ],
    B: [
      {
        region: "fret-2",
        positions: [
          [4, 2],
          [3, 5],
          [2, 3],
          [1, 4],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [3, 9],
          [2, 8],
          [1, 8],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-9",
        positions: [
          [3, 9],
          [2, 12],
          [1, 11],
          [0, 11],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [4, 14],
          [3, 13],
          [2, 12],
        ],
        barre: { fret: 11, strings: [0, 1] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [2, 3],
          [1, 4],
          [0, 3],
        ],
        barre: { fret: 1, strings: [3, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 8],
          [1, 8],
        ],
        barre: { fret: 6, strings: [0, 4, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 8],
          [1, 8],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 3] },
      },
    ],
    C: [
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2, 4] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [1, 4],
          [0, 6],
        ],
        barre: { fret: 3, strings: [2, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 10],
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 3, 5] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 10],
          [1, 11],
          [0, 11],
        ],
        barre: { fret: 8, strings: [2, 3, 5] },
      },
    ],
    "C#": [
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [3, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 9],
          [4, 10],
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 3] },
      },
      {
        region: "fret-11",
        positions: [
          [2, 12],
        ],
        barre: { fret: 11, strings: [0, 1, 3] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 8],
          [1, 8],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [3, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 10],
          [4, 10],
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 3] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [2, 3],
          [1, 4],
          [0, 3],
        ],
        barre: { fret: 1, strings: [3, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 6],
          [3, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 8],
          [2, 8],
          [1, 8],
        ],
        barre: { fret: 6, strings: [0, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 2],
          [2, 3],
          [1, 4],
          [0, 3],
        ],
        barre: null,
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [2, 3],
          [1, 4],
          [0, 3],
        ],
        barre: { fret: 1, strings: [3, 4, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-8",
        positions: [],
        barre: { fret: 8, strings: [1, 2, 3, 4] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 1],
          [3, 1],
          [2, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 4],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
        ],
        barre: { fret: 8, strings: [1, 2, 3] },
      },
    ],
    G: [
      {
        region: "fret-3",
        positions: [
          [4, 6],
          [3, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [2, 3],
          [1, 4],
          [0, 6],
        ],
        barre: null,
      },
    ],
  },
  m: {
    A: [
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 1],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 8],
          [2, 8],
          [1, 7],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [3, 7],
          [2, 8],
          [1, 7],
          [0, 6],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "fret-6",
        positions: [
          [2, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 3] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 13],
        ],
        barre: { fret: 11, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 13],
          [0, 14],
        ],
        barre: { fret: 11, strings: [1, 2, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 13],
        ],
        barre: { fret: 11, strings: [1, 2, 4] },
      },
    ],
    B: [
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 3],
          [1, 4],
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
        region: "fret-9",
        positions: [
          [3, 9],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
      {
        region: "fret-11",
        positions: [
          [4, 14],
          [3, 13],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: { fret: 1, strings: [3, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 4, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 8],
          [1, 7],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [3, 8],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
    ],
    C: [
      {
        region: "fret-3",
        positions: [
          [3, 4],
          [1, 4],
        ],
        barre: { fret: 3, strings: [2, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [1, 11],
          [0, 11],
        ],
        barre: { fret: 8, strings: [2, 3, 5] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 10],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
    ],
    "C#": [
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [3, 4],
          [2, 3],
          [1, 4],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [5, 9],
          [4, 9],
        ],
        barre: { fret: 8, strings: [2, 3] },
      },
      {
        region: "fret-11",
        positions: [],
        barre: { fret: 11, strings: [0, 1, 2, 3] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 8],
          [1, 7],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [5, 10],
          [4, 9],
          [3, 8],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: { fret: 1, strings: [3, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 8],
          [2, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 9],
          [1, 11],
          [0, 11],
        ],
        barre: { fret: 8, strings: [2, 3] },
      },
      {
        region: "fret-2",
        positions: [
          [2, 3],
          [1, 4],
        ],
        barre: { fret: 2, strings: [0, 3] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: { fret: 1, strings: [3, 4, 5] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 3],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [2, 11],
          [1, 11],
          [0, 11],
        ],
        barre: { fret: 8, strings: [3, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [5, 13],
          [4, 13],
          [3, 13],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
    ],
    "F#": [
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [1, 11],
          [0, 11],
        ],
        barre: { fret: 8, strings: [2, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [3, 8],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
      {
        region: "fret-11",
        positions: [
          [5, 14],
          [4, 13],
          [3, 13],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
    ],
    G: [
      {
        region: "fret-2",
        positions: [
          [3, 5],
          [2, 3],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [4, 6],
          [3, 4],
        ],
        barre: { fret: 3, strings: [2, 5] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 5],
          [2, 8],
          [1, 7],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [4, 10],
          [3, 8],
        ],
        barre: { fret: 11, strings: [0, 1, 2] },
      },
    ],
  },
  m9: {
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [2, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 9],
          [3, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 9],
          [3, 8],
          [2, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 9],
          [3, 8],
        ],
        barre: { fret: 6, strings: [1, 2, 4] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [2, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 3, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [2, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
