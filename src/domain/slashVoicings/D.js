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
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 4],
          [2, 2],
          [1, 3],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 7],
          [2, 7],
          [1, 7],
          [0, 5],
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
          [3, 0],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 0],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 6],
          [2, 7],
          [1, 7],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [3, 12],
          [2, 11],
        ],
        barre: { fret: 10, strings: [0, 1] },
      },
    ],
    B: [
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [1, 3],
          [0, 5],
        ],
        barre: { fret: 2, strings: [2, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 9],
          [0, 10],
        ],
        barre: { fret: 7, strings: [1, 2, 3, 5] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 9],
          [1, 10],
          [0, 10],
        ],
        barre: { fret: 7, strings: [2, 3, 5] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [3, 8],
          [2, 7],
          [1, 7],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [3, 8],
          [2, 11],
          [1, 10],
          [0, 10],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [4, 13],
          [3, 12],
          [2, 11],
        ],
        barre: { fret: 10, strings: [0, 1] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [5, 8],
          [4, 9],
          [0, 10],
        ],
        barre: { fret: 7, strings: [1, 2, 3] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [5, 9],
          [4, 9],
          [0, 10],
        ],
        barre: { fret: 7, strings: [1, 2, 3] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 0],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 5],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2, 3] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 2],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [4, 6],
        ],
        barre: { fret: 7, strings: [1, 2, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 13],
          [2, 11],
        ],
        barre: { fret: 10, strings: [0, 1] },
      },
      {
        region: "fret-11",
        positions: [
          [4, 12],
          [3, 12],
        ],
        barre: { fret: 11, strings: [2, 5] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 0],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 0],
          [3, 4],
          [2, 2],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [3, 3],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [0, 10],
        ],
        barre: { fret: 7, strings: [1, 2, 3] },
      },
    ],
    "F#": [
      {
        region: "fret-2",
        positions: [
          [4, 5],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2, 5] },
      },
      {
        region: "fret-2",
        positions: [
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2, 5] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 4],
          [2, 2],
          [1, 3],
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
          [3, 0],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [3, 5],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [2, 7],
          [1, 7],
        ],
        barre: { fret: 5, strings: [0, 3] },
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
          [2, 2],
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
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 7],
          [2, 7],
          [1, 6],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [3, 7],
          [2, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 4, 5] },
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 0],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [3, 6],
          [2, 7],
          [1, 6],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [3, 12],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [4, 11],
          [3, 12],
          [0, 13],
        ],
        barre: { fret: 10, strings: [1, 2] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [1, 10],
          [0, 10],
        ],
        barre: { fret: 7, strings: [2, 3, 5] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 9],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 2],
          [1, 3],
        ],
        barre: { fret: 1, strings: [0, 4] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 8],
          [2, 7],
          [1, 6],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-8",
        positions: [
          [3, 8],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [4, 13],
          [3, 12],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 3],
          [2, 2],
          [1, 3],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [5, 8],
          [4, 8],
        ],
        barre: { fret: 7, strings: [2, 3] },
      },
      {
        region: "fret-10",
        positions: [],
        barre: { fret: 10, strings: [0, 1, 2, 3] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [5, 9],
          [4, 8],
          [3, 7],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 11],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 3],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [3, 7],
          [2, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 4] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [2, 2],
          [1, 3],
        ],
        barre: { fret: 1, strings: [0, 3] },
      },
      {
        region: "fret-6",
        positions: [
          [3, 7],
          [2, 7],
        ],
        barre: { fret: 6, strings: [1, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [5, 11],
          [4, 12],
          [3, 12],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 13],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [1, 10],
          [0, 10],
        ],
        barre: { fret: 7, strings: [2, 3] },
      },
      {
        region: "fret-7",
        positions: [
          [4, 8],
          [3, 7],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
      {
        region: "fret-10",
        positions: [
          [5, 13],
          [4, 12],
          [3, 12],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 0],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 4],
          [2, 7],
          [1, 6],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [4, 9],
          [3, 7],
        ],
        barre: { fret: 10, strings: [0, 1, 2] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 1],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [2, 7],
          [1, 6],
        ],
        barre: { fret: 5, strings: [0, 3] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 12],
        ],
        barre: { fret: 10, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-10",
        positions: [
          [3, 12],
          [0, 13],
        ],
        barre: { fret: 10, strings: [1, 2, 4] },
      },
    ],
  },
  m9: {
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [5, 8],
          [3, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-5",
        positions: [
          [5, 8],
          [3, 7],
          [2, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 4] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 0],
          [3, 0],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 3],
          [3, 0],
          [2, 2],
          [1, 3],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [3, 0],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
    ],
  },
};

export default slashVoicings;
