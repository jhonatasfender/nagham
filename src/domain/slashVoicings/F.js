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
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 3],
          [2, 5],
          [1, 6],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 7],
          [2, 5],
          [1, 6],
          [0, 8],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 0],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 0],
          [3, 3],
          [2, 2],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [3, 6],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [0, 13],
        ],
        barre: { fret: 10, strings: [1, 2, 3] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 3],
          [2, 2],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [5, 7],
          [4, 8],
        ],
        barre: { fret: 10, strings: [1, 2, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 9],
          [2, 10],
          [1, 10],
          [0, 8],
        ],
        barre: null,
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1, 4] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [1, 4] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 8],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [2, 10],
          [1, 10],
        ],
        barre: { fret: 8, strings: [0, 3] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [2, 5],
          [1, 6],
          [0, 5],
        ],
        barre: { fret: 3, strings: [3, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
          [2, 10],
          [1, 10],
        ],
        barre: { fret: 8, strings: [0, 4, 5] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
          [2, 10],
          [1, 10],
          [0, 8],
        ],
        barre: null,
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 3],
          [2, 2],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [3, 11],
          [2, 10],
          [1, 10],
          [0, 8],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [3, 11],
          [2, 14],
          [1, 13],
          [0, 13],
        ],
        barre: null,
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 2, 4] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 7],
          [1, 6],
          [0, 8],
        ],
        barre: { fret: 5, strings: [2, 4] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [2, 5],
          [1, 6],
          [0, 5],
        ],
        barre: { fret: 3, strings: [3, 4] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [5, 11],
          [4, 12],
          [0, 13],
        ],
        barre: { fret: 10, strings: [1, 2, 3] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 0],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 0],
          [3, 3],
          [2, 2],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 4],
          [2, 5],
          [1, 6],
          [0, 5],
        ],
        barre: null,
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 3],
          [2, 2],
        ],
        barre: { fret: 1, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [2, 5],
          [1, 6],
          [0, 5],
        ],
        barre: { fret: 3, strings: [3, 4, 5] },
      },
      {
        region: "fret-5",
        positions: [
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 2, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [0, 13],
        ],
        barre: { fret: 10, strings: [1, 2, 3, 4] },
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
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 3],
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 6],
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 3],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [1, 13],
          [0, 13],
        ],
        barre: { fret: 10, strings: [2, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [3, 10],
        ],
        barre: { fret: 13, strings: [0, 1, 2] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 3],
        ],
        barre: { fret: 1, strings: [1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 9],
          [2, 10],
          [1, 9],
          [0, 8],
        ],
        barre: null,
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2, 4] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2, 4] },
      },
      {
        region: "open",
        positions: [
          [3, 3],
        ],
        barre: { fret: 1, strings: [1, 2, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [2, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 3] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: { fret: 3, strings: [3, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
          [2, 10],
          [1, 9],
        ],
        barre: { fret: 8, strings: [0, 4, 5] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 5],
          [1, 6],
        ],
        barre: { fret: 4, strings: [0, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 11],
          [2, 10],
          [1, 9],
          [0, 8],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [3, 11],
        ],
        barre: { fret: 13, strings: [0, 1, 2] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 5],
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
          [1, 9],
          [0, 8],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [1, 13],
          [0, 13],
        ],
        barre: { fret: 10, strings: [2, 3, 5] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [3, 3],
          [0, 4],
        ],
        barre: { fret: 1, strings: [1, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 2],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: { fret: 3, strings: [3, 4] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [],
        barre: { fret: 1, strings: [0, 1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 6],
          [2, 5],
          [1, 6],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [5, 11],
          [4, 11],
        ],
        barre: { fret: 10, strings: [2, 3] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 3],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 4],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 3],
          [3, 3],
        ],
        barre: { fret: 1, strings: [1, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [2, 5],
          [1, 6],
        ],
        barre: { fret: 4, strings: [0, 3] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 3],
          [3, 3],
        ],
        barre: { fret: 1, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: { fret: 3, strings: [3, 4, 5] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 5],
          [2, 5],
          [1, 6],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [2, 13],
          [1, 13],
          [0, 13],
        ],
        barre: { fret: 10, strings: [3, 4] },
      },
    ],
  },
  m9: {
    Eb: [
      {
        region: "fret-3",
        positions: [
          [4, 6],
          [2, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 3] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 11],
          [3, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 11],
          [3, 10],
          [2, 10],
        ],
        barre: { fret: 8, strings: [0, 1, 4] },
      },
      {
        region: "fret-8",
        positions: [
          [5, 11],
          [3, 10],
        ],
        barre: { fret: 8, strings: [1, 2, 4] },
      },
    ],
    Ab: [
      {
        region: "fret-3",
        positions: [
          [5, 4],
          [2, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 3, 4] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 4],
          [2, 5],
          [1, 4],
        ],
        barre: { fret: 3, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
