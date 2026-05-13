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
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 6],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 6],
          [2, 8],
          [1, 9],
          [0, 8],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 7],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "open",
        positions: [
          [4, 2],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [5, 7],
          [4, 6],
          [3, 6],
          [2, 5],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [3, 9],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3, 4] },
      },
      {
        region: "open",
        positions: [],
        barre: { fret: 1, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [2, 8],
          [1, 9],
          [0, 8],
        ],
        barre: { fret: 6, strings: [3, 4, 5] },
      },
      {
        region: "fret-8",
        positions: [
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2, 3] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [1, 4],
          [0, 4],
        ],
        barre: { fret: 1, strings: [2, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 11],
          [3, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2, 5] },
      },
      {
        region: "fret-8",
        positions: [
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2, 5] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 11],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2] },
      },
      {
        region: "fret-11",
        positions: [
          [2, 13],
          [1, 13],
        ],
        barre: { fret: 11, strings: [0, 3] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 13],
          [1, 13],
          [0, 11],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 5],
          [3, 6],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [1, 4],
          [0, 4],
        ],
        barre: { fret: 1, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 6],
          [3, 6],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 2],
          [2, 5],
          [1, 4],
          [0, 4],
        ],
        barre: null,
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [3, 6],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1] },
      },
      {
        region: "fret-6",
        positions: [
          [2, 8],
          [1, 9],
          [0, 8],
        ],
        barre: { fret: 6, strings: [3, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 13],
          [2, 13],
          [1, 13],
        ],
        barre: { fret: 11, strings: [0, 4, 5] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [4, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3, 5] },
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [1, 4],
          [0, 4],
        ],
        barre: { fret: 1, strings: [2, 3, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 3],
          [2, 5],
          [1, 4],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2, 4] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [3, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 5],
          [2, 5],
        ],
        barre: { fret: 4, strings: [0, 1] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 10],
          [3, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 2] },
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
          [2, 1],
          [1, 0],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 1],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [1, 4],
          [0, 4],
        ],
        barre: { fret: 1, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 1],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [5, 7],
          [4, 6],
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 9],
          [2, 8],
          [1, 9],
          [0, 7],
        ],
        barre: null,
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [2, 4],
          [1, 4],
          [0, 4],
        ],
        barre: { fret: 1, strings: [3, 4] },
      },
      {
        region: "fret-4",
        positions: [
          [5, 6],
          [4, 6],
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [2, 8],
          [1, 9],
          [0, 7],
        ],
        barre: { fret: 6, strings: [3, 4, 5] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 8],
          [2, 8],
          [1, 9],
          [0, 7],
        ],
        barre: null,
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 1],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 1],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [3, 10],
          [2, 8],
          [1, 9],
          [0, 7],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [3, 10],
          [2, 13],
          [1, 12],
          [0, 11],
        ],
        barre: null,
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 1],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [2, 13],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 3] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 8],
          [1, 9],
          [0, 7],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 5],
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 5],
          [3, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 2],
          [1, 4],
          [0, 4],
        ],
        barre: { fret: 1, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 2],
          [3, 1],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 6],
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 2],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 1],
          [1, 0],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 1],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [3, 6],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [3, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [4, 2],
          [1, 4],
          [0, 4],
        ],
        barre: { fret: 1, strings: [2, 3, 5] },
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 2],
          [3, 1],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 3],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 2],
          [3, 1],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 2],
        ],
        barre: { fret: 1, strings: [2, 3] },
      },
      {
        region: "fret-4",
        positions: [],
        barre: { fret: 4, strings: [0, 1, 2, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [3, 9],
          [2, 8],
          [1, 9],
        ],
        barre: null,
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 2],
          [3, 1],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 2],
          [3, 1],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 5],
        ],
        barre: { fret: 4, strings: [0, 1, 2] },
      },
    ],
  },
  m9: {
    "F#": [
      {
        region: "fret-6",
        positions: [
          [4, 9],
          [2, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 3] },
      },
      {
        region: "fret-11",
        positions: [
          [5, 14],
          [3, 13],
        ],
        barre: { fret: 11, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [5, 14],
          [3, 13],
          [2, 13],
        ],
        barre: { fret: 11, strings: [0, 1, 4] },
      },
      {
        region: "fret-11",
        positions: [
          [5, 14],
          [3, 13],
        ],
        barre: { fret: 11, strings: [1, 2, 4] },
      },
    ],
    B: [
      {
        region: "fret-6",
        positions: [
          [5, 7],
          [2, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 3, 4] },
      },
      {
        region: "fret-6",
        positions: [
          [5, 7],
          [2, 8],
          [1, 7],
        ],
        barre: { fret: 6, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
