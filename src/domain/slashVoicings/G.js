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
          [2, 0],
          [1, 0],
          [0, 3],
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
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 0],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 5],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 2],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 2],
          [3, 0],
          [2, 0],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 6],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 6],
          [2, 7],
          [1, 8],
          [0, 7],
        ],
        barre: null,
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 0],
          [2, 0],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 0],
          [2, 4],
          [1, 3],
          [0, 3],
        ],
        barre: null,
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 0],
          [2, 0],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [3, 8],
          [1, 8],
        ],
        barre: { fret: 7, strings: [0, 2] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 10],
          [1, 8],
        ],
        barre: { fret: 7, strings: [0, 2] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [3, 5],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [3, 5],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 2],
          [3, 0],
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
          [4, 2],
          [3, 0],
          [2, 0],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 2],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 2],
          [3, 0],
          [2, 4],
          [1, 3],
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
          [2, 4],
          [1, 3],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [4, 6],
          [3, 5],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 6],
          [3, 5],
          [2, 4],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [3, 13],
          [2, 12],
          [1, 12],
          [0, 10],
        ],
        barre: null,
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 2],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 2],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1, 3] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [3, 9],
          [1, 8],
        ],
        barre: { fret: 7, strings: [0, 2] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 2],
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 2],
          [3, 0],
          [2, 0],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 2],
          [3, 0],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 4],
          [2, 4],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
    ],
  },
  m: {
    A: [
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 0],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 5],
          [4, 5],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 1],
          [3, 0],
          [2, 0],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [5, 4],
          [4, 5],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 6],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [2, 7],
          [1, 8],
        ],
        barre: { fret: 6, strings: [0, 3] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 0],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 9],
          [2, 7],
          [1, 8],
          [0, 6],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [4, 10],
          [3, 8],
        ],
        barre: { fret: 7, strings: [2, 5] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 9],
          [2, 12],
          [1, 11],
          [0, 10],
        ],
        barre: null,
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 0],
          [2, 0],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [5, 6],
          [4, 5],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [5, 6],
          [4, 5],
          [3, 5],
        ],
        barre: { fret: 3, strings: [1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 7],
          [1, 8],
          [0, 6],
        ],
        barre: null,
      },
    ],
    C: [
      {
        region: "fret-3",
        positions: [
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2, 4] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
        ],
        barre: { fret: 3, strings: [1, 2, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [2, 12],
          [1, 11],
        ],
        barre: { fret: 10, strings: [0, 3] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 4],
          [3, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 11],
          [2, 12],
          [1, 11],
          [0, 10],
        ],
        barre: null,
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 5],
          [3, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [2, 7],
          [1, 8],
          [0, 6],
        ],
        barre: { fret: 5, strings: [3, 4] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 5],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 5],
          [3, 5],
          [0, 6],
        ],
        barre: { fret: 3, strings: [1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [2, 7],
          [1, 8],
          [0, 6],
        ],
        barre: { fret: 5, strings: [3, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 2],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-3",
        positions: [
          [4, 6],
          [3, 5],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 8],
          [2, 7],
          [1, 8],
        ],
        barre: { fret: 6, strings: [0, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 13],
          [2, 12],
          [1, 11],
          [0, 10],
        ],
        barre: null,
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 1],
          [3, 0],
          [2, 0],
        ],
        barre: { fret: 3, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 1],
          [3, 0],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 1],
          [3, 0],
          [2, 0],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [],
        barre: { fret: 3, strings: [0, 1, 2, 3] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 1],
          [3, 0],
          [2, 0],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 1],
          [3, 0],
          [2, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 4],
        ],
        barre: { fret: 3, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 9],
          [3, 8],
          [2, 7],
          [1, 8],
        ],
        barre: null,
      },
    ],
  },
  m9: {
    F: [
      {
        region: "fret-5",
        positions: [
          [4, 8],
          [2, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [5, 13],
          [3, 12],
        ],
        barre: { fret: 10, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [5, 13],
          [3, 12],
          [2, 12],
        ],
        barre: { fret: 10, strings: [0, 1, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [5, 13],
          [3, 12],
        ],
        barre: { fret: 10, strings: [1, 2, 4] },
      },
    ],
    Bb: [
      {
        region: "fret-5",
        positions: [
          [5, 6],
          [2, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 3, 4] },
      },
      {
        region: "fret-5",
        positions: [
          [5, 6],
          [2, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
