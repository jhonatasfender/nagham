// Slash chord voicings importados de tombatossals/chords-db (GitHub).
// Veja docs/adr/0012-chords-db-as-slash-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/slash-voicings/apply.mjs.

const slashVoicings = {
  "7": {
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 1],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [5, 3],
          [4, 3],
          [3, 2],
          [2, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [1, 5],
        ],
        barre: { fret: 3, strings: [0, 2, 4, 5] },
      },
    ],
  },
  Maj: {
    A: [
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 5],
          [2, 5],
          [1, 5],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [0, 8],
        ],
        barre: { fret: 5, strings: [1, 2, 3] },
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
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
          [3, 6],
          [2, 5],
          [1, 5],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [3, 6],
          [2, 9],
          [1, 8],
          [0, 8],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [4, 11],
          [3, 10],
          [2, 9],
        ],
        barre: { fret: 8, strings: [0, 1] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [5, 7],
          [4, 7],
          [0, 8],
        ],
        barre: { fret: 5, strings: [1, 2, 3] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 2],
          [2, 0],
          [1, 1],
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
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [5, 6],
          [4, 7],
          [0, 8],
        ],
        barre: { fret: 5, strings: [1, 2, 3] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [3, 11],
          [2, 9],
        ],
        barre: { fret: 8, strings: [0, 1] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 11],
          [2, 12],
          [1, 13],
          [0, 12],
        ],
        barre: null,
      },
    ],
    D: [
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
          [2, 5],
          [1, 5],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 9],
        ],
        barre: { fret: 8, strings: [0, 1] },
      },
      {
        region: "fret-5",
        positions: [
          [0, 8],
        ],
        barre: { fret: 5, strings: [1, 2, 3, 4] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [0, 8],
        ],
        barre: { fret: 5, strings: [1, 2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
        ],
        barre: { fret: 5, strings: [1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [5, 11],
          [4, 10],
          [3, 10],
          [2, 9],
        ],
        barre: null,
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [2, 5],
          [1, 5],
        ],
        barre: { fret: 3, strings: [0, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 8],
        ],
        barre: { fret: 5, strings: [1, 2, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
          [2, 9],
        ],
        barre: { fret: 8, strings: [0, 1, 4] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 3],
          [3, 2],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 0],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 4],
          [2, 5],
          [1, 5],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [3, 10],
          [2, 9],
        ],
        barre: { fret: 8, strings: [0, 1] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
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
          [3, 5],
          [2, 5],
          [1, 5],
        ],
        barre: { fret: 3, strings: [0, 4, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
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
        ],
        barre: { fret: 5, strings: [1, 2, 3] },
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
          [2, 0],
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 5],
          [2, 5],
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
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [1, 8],
          [0, 8],
        ],
        barre: { fret: 5, strings: [2, 3, 5] },
      },
    ],
    Ab: [
      {
        region: "fret-3",
        positions: [
          [3, 6],
          [2, 5],
          [1, 4],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [3, 6],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 11],
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 13],
          [2, 12],
          [1, 13],
        ],
        barre: { fret: 11, strings: [0, 4] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 1],
          [2, 0],
          [1, 1],
          [0, 3],
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
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 9],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 1],
          [2, 0],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [5, 6],
          [4, 6],
        ],
        barre: { fret: 5, strings: [2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [5, 6],
          [3, 5],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [],
        barre: { fret: 8, strings: [0, 1, 2, 3] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 1],
          [2, 0],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [5, 9],
          [4, 10],
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 11],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-11",
        positions: [
          [2, 12],
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
          [1, 4],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [2, 8],
          [1, 8],
          [0, 8],
        ],
        barre: { fret: 5, strings: [3, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 10],
          [4, 10],
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 5],
          [2, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 6],
          [1, 8],
          [0, 8],
        ],
        barre: { fret: 5, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 6],
          [3, 5],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 2],
          [2, 5],
          [1, 4],
          [0, 3],
        ],
        barre: null,
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 0],
          [1, 1],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [1, 8],
          [0, 8],
        ],
        barre: { fret: 5, strings: [2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 5],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 11],
          [4, 10],
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
    ],
    F: [
      {
        region: "fret-3",
        positions: [
          [2, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
        ],
        barre: { fret: 8, strings: [1, 2, 4] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 3],
          [3, 1],
          [2, 0],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 4],
          [2, 5],
          [1, 4],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 9],
          [3, 10],
          [0, 11],
        ],
        barre: { fret: 8, strings: [1, 2] },
      },
    ],
    G: [
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [2, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 4, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [2, 5],
          [1, 4],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [3, 5],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [4, 10],
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2] },
      },
    ],
  },
  m9: {
    Bb: [
      {
        region: "fret-3",
        positions: [
          [5, 6],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 6],
          [3, 5],
          [2, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 4] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 6],
          [3, 5],
        ],
        barre: { fret: 3, strings: [1, 2, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [4, 13],
          [2, 12],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 3] },
      },
    ],
    Eb: [
      {
        region: "fret-10",
        positions: [
          [5, 11],
          [2, 12],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 3, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [5, 11],
          [2, 12],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
