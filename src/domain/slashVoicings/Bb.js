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
          [3, 0],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 3],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 5],
          [4, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
    ],
    Ab: [
      {
        region: "fret-3",
        positions: [
          [5, 4],
          [4, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [2, 7],
        ],
        barre: { fret: 6, strings: [0, 1, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [3, 12],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 2] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 0],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [4, 2],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 9],
          [2, 7],
        ],
        barre: { fret: 6, strings: [0, 1] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 9],
          [2, 10],
          [1, 11],
          [0, 10],
        ],
        barre: null,
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [2, 10],
          [1, 11],
          [0, 10],
        ],
        barre: { fret: 8, strings: [3, 4, 5] },
      },
      {
        region: "fret-10",
        positions: [
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 2, 3] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 11],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 2] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 3],
        ],
        barre: { fret: 6, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [1, 6],
          [0, 6],
        ],
        barre: { fret: 3, strings: [2, 3] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 3],
          [2, 3],
          [1, 3],
        ],
        barre: { fret: 1, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 5],
          [1, 6],
          [0, 6],
        ],
        barre: { fret: 3, strings: [2, 3] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [2, 3],
          [1, 3],
        ],
        barre: { fret: 1, strings: [0, 3] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 7],
        ],
        barre: { fret: 6, strings: [0, 1, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 13],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 2] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 3],
          [1, 3],
        ],
        barre: { fret: 1, strings: [0, 4, 5] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 8],
          [3, 8],
          [2, 7],
        ],
        barre: { fret: 6, strings: [0, 1] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 3],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 1],
        ],
        barre: { fret: 3, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 4],
          [2, 7],
          [1, 6],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [4, 9],
          [3, 8],
          [2, 7],
        ],
        barre: { fret: 6, strings: [0, 1] },
      },
    ],
    G: [
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 3, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [1, 6],
          [0, 6],
        ],
        barre: { fret: 3, strings: [2, 3, 5] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 5],
          [2, 7],
          [1, 6],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [3, 12],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 2, 4] },
      },
    ],
  },
  m: {
    A: [
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 3],
          [2, 3],
          [1, 2],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 3],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 5],
          [4, 4],
          [3, 3],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
    ],
    Ab: [
      {
        region: "fret-3",
        positions: [
          [5, 4],
          [4, 4],
        ],
        barre: { fret: 3, strings: [2, 3] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 4],
          [3, 3],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [],
        barre: { fret: 6, strings: [0, 1, 2, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [3, 11],
          [2, 10],
          [1, 11],
        ],
        barre: null,
      },
    ],
    B: [
      {
        region: "fret-2",
        positions: [
          [3, 3],
          [2, 3],
        ],
        barre: { fret: 2, strings: [1, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 7],
          [4, 8],
          [3, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 9],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [2, 10],
          [1, 11],
        ],
        barre: { fret: 9, strings: [0, 3] },
      },
    ],
    C: [
      {
        region: "fret-3",
        positions: [
          [2, 6],
          [1, 6],
          [0, 6],
        ],
        barre: { fret: 3, strings: [3, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 8],
          [4, 8],
          [3, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [2, 10],
          [1, 11],
          [0, 9],
        ],
        barre: { fret: 8, strings: [3, 4, 5] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 10],
          [2, 10],
          [1, 11],
          [0, 9],
        ],
        barre: null,
      },
    ],
    "C#": [
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [1, 6],
          [0, 6],
        ],
        barre: { fret: 3, strings: [2, 3] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [3, 3],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 9],
          [4, 8],
          [3, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
          [2, 10],
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
          [1, 2],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 10],
          [1, 11],
          [0, 9],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [3, 3],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 3],
          [2, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [2, 3],
          [1, 2],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [1, 6],
          [0, 6],
        ],
        barre: { fret: 3, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [3, 3],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [2, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [0, 9],
        ],
        barre: { fret: 6, strings: [1, 2, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
        ],
        barre: { fret: 6, strings: [1, 2, 4] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 3],
          [1, 2],
        ],
        barre: { fret: 1, strings: [0, 4, 5] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 3],
          [1, 2],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 3],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 8],
          [3, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 3],
          [1, 2],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 4],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [4, 9],
          [3, 8],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 11],
          [2, 10],
          [1, 11],
        ],
        barre: { fret: 9, strings: [0, 4] },
      },
    ],
    G: [
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [1, 6],
          [0, 6],
        ],
        barre: { fret: 3, strings: [2, 3, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [1, 6],
        ],
        barre: { fret: 3, strings: [2, 3, 5] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 5],
        ],
        barre: { fret: 6, strings: [0, 1, 2] },
      },
    ],
  },
  m9: {
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 4],
          [3, 3],
          [2, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 4],
          [3, 3],
        ],
        barre: { fret: 1, strings: [1, 2, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 11],
          [2, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 3] },
      },
    ],
    "C#": [
      {
        region: "fret-8",
        positions: [
          [5, 9],
          [2, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 3, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 9],
          [2, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
