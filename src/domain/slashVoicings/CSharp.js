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
          [3, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 3],
          [2, 1],
          [1, 2],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 6],
          [2, 6],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 7],
          [2, 6],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 6],
          [1, 6],
        ],
        barre: { fret: 4, strings: [0, 4, 5] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 6],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [0, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 11],
          [3, 11],
          [2, 10],
        ],
        barre: { fret: 9, strings: [0, 1] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 7],
          [4, 8],
          [0, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [2, 10],
        ],
        barre: { fret: 9, strings: [0, 1, 3] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [3, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2, 4] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [1, 2],
          [0, 4],
        ],
        barre: { fret: 1, strings: [2, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 8],
          [0, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 3, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 8],
          [1, 9],
          [0, 9],
        ],
        barre: { fret: 6, strings: [2, 3, 5] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 8],
          [4, 8],
          [0, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 10],
          [2, 10],
        ],
        barre: { fret: 9, strings: [0, 1] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 6],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 10],
        ],
        barre: { fret: 9, strings: [0, 1] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 12],
          [2, 10],
        ],
        barre: { fret: 9, strings: [0, 1] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [3, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 6],
          [2, 6],
          [1, 6],
        ],
        barre: { fret: 4, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 8],
          [0, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 3] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [0, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-6",
        positions: [],
        barre: { fret: 6, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [2, 13],
          [1, 14],
          [0, 13],
        ],
        barre: { fret: 11, strings: [3, 4, 5] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2, 5] },
      },
      {
        region: "open",
        positions: [
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2, 5] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 1],
          [1, 2],
          [0, 4],
        ],
        barre: null,
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [3, 4],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [2, 6],
          [1, 6],
        ],
        barre: { fret: 4, strings: [0, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
          [2, 10],
        ],
        barre: { fret: 9, strings: [0, 1, 4] },
      },
    ],
    G: [
      {
        region: "fret-3",
        positions: [
          [5, 3],
          [4, 4],
        ],
        barre: { fret: 6, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 5],
          [2, 6],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [3, 11],
          [2, 10],
        ],
        barre: { fret: 9, strings: [0, 1] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [3, 11],
          [2, 10],
          [1, 9],
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
          [4, 0],
          [3, 6],
          [2, 6],
          [1, 5],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 6],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 7],
          [2, 6],
          [1, 5],
          [0, 4],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 4, 5] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 6],
          [1, 5],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [3, 6],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 11],
          [3, 11],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
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
          [4, 2],
          [3, 2],
          [2, 1],
          [1, 2],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [5, 7],
          [4, 7],
        ],
        barre: { fret: 6, strings: [2, 3] },
      },
      {
        region: "fret-9",
        positions: [],
        barre: { fret: 9, strings: [0, 1, 2, 3] },
      },
    ],
    Bb: [
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
        region: "fret-6",
        positions: [
          [4, 7],
          [1, 9],
          [0, 9],
        ],
        barre: { fret: 6, strings: [2, 3, 5] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 8],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 2],
          [2, 1],
          [1, 2],
          [0, 0],
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
        barre: { fret: 9, strings: [0, 1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 10],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 1],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 6],
          [1, 5],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [5, 10],
          [4, 11],
          [3, 11],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
    ],
    E: [
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
          [3, 6],
          [2, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 7],
          [1, 9],
          [0, 9],
        ],
        barre: { fret: 6, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 7],
          [3, 6],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 1],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [2, 9],
          [1, 9],
          [0, 9],
        ],
        barre: { fret: 6, strings: [3, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [5, 11],
          [4, 11],
          [3, 11],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
      {
        region: "fret-11",
        positions: [
          [2, 13],
          [1, 14],
          [0, 12],
        ],
        barre: { fret: 11, strings: [3, 4, 5] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 1],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 2],
        ],
        barre: { fret: 1, strings: [2, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 3],
          [2, 6],
          [1, 5],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [4, 8],
          [3, 6],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 1],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [2, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
        ],
        barre: { fret: 9, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
          [0, 12],
        ],
        barre: { fret: 9, strings: [1, 2, 4] },
      },
    ],
    G: [
      {
        region: "fret-4",
        positions: [
          [3, 5],
          [2, 6],
          [1, 5],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [3, 11],
        ],
        barre: { fret: 9, strings: [0, 1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [3, 11],
          [0, 12],
        ],
        barre: { fret: 9, strings: [1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [3, 11],
        ],
        barre: { fret: 9, strings: [1, 2] },
      },
    ],
  },
  m9: {
    B: [
      {
        region: "fret-4",
        positions: [
          [5, 7],
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-4",
        positions: [
          [5, 7],
          [3, 6],
          [2, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 4] },
      },
      {
        region: "fret-4",
        positions: [
          [5, 7],
          [3, 6],
        ],
        barre: { fret: 4, strings: [1, 2, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [4, 14],
          [2, 13],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 3] },
      },
    ],
    E: [
      {
        region: "fret-11",
        positions: [
          [5, 12],
          [2, 13],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 3, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [5, 12],
          [2, 13],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
