// Slash chord voicings importados de tombatossals/chords-db (GitHub).
// Veja docs/adr/0012-chords-db-as-slash-voicings-source.md.
// Variações com `manual: true` são editorialmente curadas e imunes à
// sobrescrita por scripts/slash-voicings/apply.mjs.

const slashVoicings = {
  Maj: {
    Ab: [
      {
        region: "fret-2",
        positions: [
          [5, 4],
          [4, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 6],
          [2, 6],
        ],
        barre: { fret: 5, strings: [0, 1] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 11],
          [3, 11],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 2] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 3, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [2, 9],
          [1, 10],
          [0, 9],
        ],
        barre: { fret: 7, strings: [3, 4, 5] },
      },
      {
        region: "fret-9",
        positions: [
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 2, 3] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 1],
        ],
        barre: { fret: 2, strings: [1, 2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 8],
          [2, 6],
        ],
        barre: { fret: 5, strings: [0, 1] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 8],
          [2, 9],
          [1, 10],
          [0, 9],
        ],
        barre: null,
      },
    ],
    C: [
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 3] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
        ],
        barre: { fret: 2, strings: [1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [3, 10],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 2] },
      },
    ],
    "C#": [
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 3] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [1, 5],
          [0, 5],
        ],
        barre: { fret: 2, strings: [2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 12],
          [3, 11],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 2, 5] },
      },
      {
        region: "fret-9",
        positions: [
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 2, 5] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 2],
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
        ],
        barre: { fret: 5, strings: [0, 1] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 10],
        ],
        barre: { fret: 9, strings: [0, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 7],
          [2, 6],
        ],
        barre: { fret: 5, strings: [0, 1, 4] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 4],
          [1, 5],
          [0, 5],
        ],
        barre: { fret: 2, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 7],
          [2, 6],
        ],
        barre: { fret: 5, strings: [0, 1] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 7],
          [2, 6],
          [1, 5],
        ],
        barre: null,
      },
      {
        region: "fret-11",
        positions: [
          [5, 11],
          [4, 12],
        ],
        barre: { fret: 14, strings: [1, 2, 3] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 3],
          [2, 6],
          [1, 5],
          [0, 5],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [4, 8],
          [3, 7],
          [2, 6],
        ],
        barre: { fret: 5, strings: [0, 1] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 3, 5] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [1, 5],
          [0, 5],
        ],
        barre: { fret: 2, strings: [2, 3, 5] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 2],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [5, 3],
          [4, 4],
          [0, 5],
        ],
        barre: { fret: 2, strings: [1, 2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [2, 6],
        ],
        barre: { fret: 5, strings: [0, 1, 3] },
      },
    ],
  },
  m: {
    Ab: [
      {
        region: "fret-2",
        positions: [
          [5, 4],
          [4, 3],
          [3, 2],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-2",
        positions: [
          [5, 4],
          [4, 3],
          [1, 5],
        ],
        barre: { fret: 2, strings: [2, 3] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 6],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
    ],
    B: [
      {
        region: "open",
        positions: [
          [4, 2],
          [3, 2],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [2, 5],
          [1, 5],
          [0, 5],
        ],
        barre: { fret: 2, strings: [3, 4] },
      },
      {
        region: "fret-5",
        positions: [
          [5, 7],
          [4, 7],
          [3, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-7",
        positions: [
          [2, 9],
          [1, 10],
          [0, 8],
        ],
        barre: { fret: 7, strings: [3, 4, 5] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 2],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [5, 6],
          [4, 7],
          [3, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 8],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [2, 9],
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
          [3, 2],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [1, 5],
          [0, 5],
        ],
        barre: { fret: 2, strings: [2, 3] },
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [3, 2],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [5, 8],
          [4, 7],
          [3, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
    ],
    "C#": [
      {
        region: "fret-2",
        positions: [
          [4, 4],
          [3, 2],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 11],
          [2, 9],
          [1, 10],
          [0, 8],
        ],
        barre: null,
      },
      {
        region: "fret-9",
        positions: [
          [4, 12],
          [3, 10],
        ],
        barre: { fret: 9, strings: [2, 5] },
      },
      {
        region: "fret-11",
        positions: [
          [3, 11],
          [2, 14],
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
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-5",
        positions: [
          [3, 7],
          [0, 8],
        ],
        barre: { fret: 5, strings: [1, 2, 4] },
      },
    ],
    E: [
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 0],
          [3, 2],
          [2, 2],
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
          [2, 2],
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
          [1, 5],
          [0, 5],
        ],
        barre: { fret: 2, strings: [2, 3] },
      },
      {
        region: "open",
        positions: [
          [5, 0],
          [4, 3],
          [3, 2],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 7],
          [0, 8],
        ],
        barre: { fret: 5, strings: [1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 6],
          [3, 7],
        ],
        barre: { fret: 5, strings: [1, 2] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 3],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-5",
        positions: [
          [4, 8],
          [3, 7],
        ],
        barre: { fret: 5, strings: [0, 1, 2] },
      },
      {
        region: "fret-8",
        positions: [
          [3, 10],
          [2, 9],
          [1, 10],
        ],
        barre: { fret: 8, strings: [0, 4] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [4, 3],
          [1, 5],
          [0, 5],
        ],
        barre: { fret: 2, strings: [2, 3, 5] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 1],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 1],
        ],
        barre: null,
      },
      {
        region: "fret-5",
        positions: [],
        barre: { fret: 5, strings: [0, 1, 2, 3] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [3, 10],
          [2, 9],
          [1, 10],
        ],
        barre: null,
      },
    ],
  },
  m9: {
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 2],
          [2, 0],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 2],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 2],
          [2, 2],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 0],
          [3, 2],
          [2, 4],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
    ],
    C: [
      {
        region: "fret-7",
        positions: [
          [5, 8],
          [2, 9],
          [1, 8],
        ],
        barre: { fret: 7, strings: [0, 3, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [5, 8],
          [2, 9],
          [1, 8],
        ],
        barre: { fret: 7, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
