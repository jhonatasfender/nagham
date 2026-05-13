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
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [2, 4],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [5, 5],
          [4, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
    ],
    Ab: [
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3, 5] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [1, 7],
          [0, 7],
        ],
        barre: { fret: 4, strings: [2, 3, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 6],
          [2, 8],
          [1, 7],
          [0, 7],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [3, 13],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 2, 4] },
      },
    ],
    Bb: [
      {
        region: "fret-4",
        positions: [
          [5, 6],
          [4, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 8],
          [2, 8],
        ],
        barre: { fret: 7, strings: [0, 1] },
      },
      {
        region: "fret-11",
        positions: [
          [4, 13],
          [3, 13],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 2] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 1],
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [4, 3],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 10],
          [2, 8],
        ],
        barre: { fret: 7, strings: [0, 1] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 10],
          [2, 11],
          [1, 12],
          [0, 11],
        ],
        barre: null,
      },
    ],
    "C#": [
      {
        region: "fret-4",
        positions: [
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-4",
        positions: [],
        barre: { fret: 4, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [2, 11],
          [1, 12],
          [0, 11],
        ],
        barre: { fret: 9, strings: [3, 4, 5] },
      },
      {
        region: "fret-11",
        positions: [
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 2, 3] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 4],
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
        ],
        barre: { fret: 7, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 5],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 4],
          [2, 4],
          [1, 4],
        ],
        barre: { fret: 2, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 6],
          [1, 7],
          [0, 7],
        ],
        barre: { fret: 4, strings: [2, 3] },
      },
      {
        region: "fret-2",
        positions: [
          [2, 4],
          [1, 4],
        ],
        barre: { fret: 2, strings: [0, 3] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [1, 7],
          [0, 7],
        ],
        barre: { fret: 4, strings: [2, 3] },
      },
      {
        region: "fret-11",
        positions: [
          [4, 14],
          [3, 13],
          [1, 12],
        ],
        barre: { fret: 11, strings: [0, 2, 5] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 2],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 3],
          [2, 4],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [3, 9],
          [2, 8],
        ],
        barre: { fret: 7, strings: [0, 1] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [3, 9],
          [2, 8],
          [1, 7],
        ],
        barre: null,
      },
    ],
    "F#": [
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 4],
          [1, 4],
        ],
        barre: { fret: 2, strings: [0, 4, 5] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 4],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [0, 7],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 9],
          [3, 9],
          [2, 8],
        ],
        barre: { fret: 7, strings: [0, 1] },
      },
    ],
    G: [
      {
        region: "fret-2",
        positions: [
          [3, 5],
          [2, 4],
          [1, 4],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [5, 3],
          [4, 2],
        ],
        barre: { fret: 4, strings: [1, 2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 5],
          [2, 8],
          [1, 7],
          [0, 7],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [4, 10],
          [3, 9],
          [2, 8],
        ],
        barre: { fret: 7, strings: [0, 1] },
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
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 0],
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
    ],
    Ab: [
      {
        region: "fret-3",
        positions: [
          [5, 4],
          [3, 4],
          [2, 4],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 5],
          [1, 7],
          [0, 7],
        ],
        barre: { fret: 4, strings: [2, 3, 5] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 6],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [5, 6],
          [4, 5],
          [3, 4],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 8],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 2],
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
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [5, 8],
          [4, 9],
          [3, 9],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 10],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [2, 7],
          [1, 7],
          [0, 7],
        ],
        barre: { fret: 4, strings: [3, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [5, 9],
          [4, 9],
          [3, 9],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 4],
        ],
        barre: { fret: 7, strings: [0, 1] },
      },
      {
        region: "fret-4",
        positions: [
          [4, 5],
          [1, 7],
          [0, 7],
        ],
        barre: { fret: 4, strings: [2, 3] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 2],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 4],
          [2, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 4] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 5],
          [1, 7],
          [0, 7],
        ],
        barre: { fret: 4, strings: [2, 3] },
      },
      {
        region: "fret-2",
        positions: [
          [2, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 3] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [3, 4],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 13],
          [2, 11],
          [1, 12],
          [0, 10],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [4, 14],
          [3, 12],
        ],
        barre: { fret: 11, strings: [2, 5] },
      },
    ],
    F: [
      {
        region: "fret-2",
        positions: [
          [3, 3],
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [3, 9],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [3, 9],
          [0, 10],
        ],
        barre: { fret: 7, strings: [1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [3, 9],
        ],
        barre: { fret: 7, strings: [1, 2] },
      },
    ],
    "F#": [
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 4, 5] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 4],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 9],
          [3, 9],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
    ],
    G: [
      {
        region: "fret-2",
        positions: [
          [3, 5],
          [2, 4],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [3, 5],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 10],
          [3, 9],
        ],
        barre: { fret: 7, strings: [0, 1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 12],
          [2, 11],
          [1, 12],
        ],
        barre: { fret: 10, strings: [0, 4] },
      },
    ],
  },
  m9: {
    A: [
      {
        region: "fret-2",
        positions: [
          [5, 5],
          [3, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [5, 5],
          [3, 4],
          [2, 4],
        ],
        barre: { fret: 2, strings: [0, 1, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [5, 5],
          [3, 4],
        ],
        barre: { fret: 2, strings: [1, 2, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 12],
          [2, 11],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 3] },
      },
    ],
    D: [
      {
        region: "fret-9",
        positions: [
          [5, 10],
          [2, 11],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 3, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [5, 10],
          [2, 11],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
