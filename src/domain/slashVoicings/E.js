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
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 2],
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
          [3, 2],
          [2, 4],
          [1, 0],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 2],
          [2, 4],
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
          [4, 7],
          [3, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2, 5] },
      },
      {
        region: "fret-4",
        positions: [
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2, 5] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [2, 4],
          [1, 5],
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
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [2, 4],
          [1, 5],
          [0, 4],
        ],
        barre: { fret: 2, strings: [3, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 9],
          [2, 9],
          [1, 9],
        ],
        barre: { fret: 7, strings: [0, 4, 5] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 9],
          [2, 9],
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
          [4, 1],
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 1],
          [3, 2],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-6",
        positions: [
          [5, 6],
          [4, 7],
        ],
        barre: { fret: 9, strings: [1, 2, 3] },
      },
      {
        region: "fret-7",
        positions: [
          [3, 8],
          [2, 9],
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
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 3],
          [3, 2],
          [2, 4],
          [1, 0],
          [0, 4],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [3, 10],
          [2, 9],
          [1, 9],
          [0, 7],
        ],
        barre: null,
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2, 4] },
      },
      {
        region: "fret-4",
        positions: [
          [3, 6],
          [1, 5],
          [0, 7],
        ],
        barre: { fret: 4, strings: [2, 4] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 11],
          [0, 12],
        ],
        barre: { fret: 9, strings: [1, 2, 3, 5] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2] },
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 9],
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
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2] },
      },
    ],
    Eb: [
      {
        region: "open",
        positions: [
          [3, 1],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [3, 6],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [5, 11],
          [4, 11],
          [0, 12],
        ],
        barre: { fret: 9, strings: [1, 2, 3] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 2],
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 3],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 2],
          [3, 2],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 3],
          [2, 4],
          [1, 5],
          [0, 4],
        ],
        barre: null,
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 2],
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 4],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [2, 4],
          [1, 5],
          [0, 4],
        ],
        barre: { fret: 2, strings: [3, 4, 5] },
      },
      {
        region: "fret-4",
        positions: [
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2, 3] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 2],
          [3, 2],
          [2, 1],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [5, 3],
          [4, 2],
          [3, 2],
          [2, 1],
          [1, 0],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [3, 5],
          [1, 5],
        ],
        barre: { fret: 4, strings: [0, 2] },
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [0, 12],
        ],
        barre: { fret: 9, strings: [1, 2, 3] },
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
          [2, 0],
          [1, 0],
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
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [4, 0],
          [3, 2],
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
          [3, 2],
          [2, 4],
          [1, 5],
          [0, 3],
        ],
        barre: null,
      },
    ],
    Ab: [
      {
        region: "open",
        positions: [
          [5, 4],
          [4, 2],
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
          [5, 4],
          [4, 2],
          [3, 2],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 6],
          [2, 4],
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
          [4, 2],
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
          [4, 2],
          [3, 2],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [2, 4],
          [1, 5],
          [0, 3],
        ],
        barre: { fret: 2, strings: [3, 4] },
      },
    ],
    Bb: [
      {
        region: "open",
        positions: [
          [4, 1],
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
          [4, 1],
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
          [4, 1],
          [3, 2],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-7",
        positions: [
          [3, 8],
          [2, 9],
          [1, 8],
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
          [4, 3],
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
          [4, 3],
          [3, 2],
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
          [1, 5],
        ],
        barre: { fret: 3, strings: [0, 4] },
      },
    ],
    "C#": [
      {
        region: "open",
        positions: [
          [4, 4],
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
          [4, 4],
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
          [4, 4],
          [3, 2],
          [2, 4],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-9",
        positions: [
          [4, 10],
          [1, 12],
          [0, 12],
        ],
        barre: { fret: 9, strings: [2, 3, 5] },
      },
    ],
    D: [
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 0],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "open",
        positions: [
          [3, 0],
          [2, 4],
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
          [1, 8],
          [0, 7],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 5],
          [3, 5],
          [2, 4],
          [1, 5],
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
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-4",
        positions: [
          [4, 6],
          [3, 5],
          [2, 4],
          [1, 5],
        ],
        barre: null,
      },
      {
        region: "fret-9",
        positions: [
          [5, 11],
          [4, 10],
          [3, 9],
        ],
        barre: { fret: 12, strings: [0, 1, 2] },
      },
    ],
    F: [
      {
        region: "open",
        positions: [
          [5, 1],
          [4, 2],
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
          [5, 1],
          [4, 2],
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
          [3, 3],
          [2, 0],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [2, 4],
          [1, 5],
        ],
        barre: { fret: 3, strings: [0, 3] },
      },
    ],
    "F#": [
      {
        region: "open",
        positions: [
          [5, 2],
          [4, 2],
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
          [5, 2],
          [4, 2],
          [3, 2],
          [2, 0],
          [1, 0],
          [0, 3],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [2, 4],
          [1, 5],
          [0, 3],
        ],
        barre: { fret: 2, strings: [3, 4, 5] },
      },
      {
        region: "fret-3",
        positions: [
          [3, 4],
          [2, 4],
          [1, 5],
          [0, 3],
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
          [4, 2],
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
          [4, 2],
          [3, 2],
          [2, 4],
          [1, 0],
          [0, 0],
        ],
        barre: null,
      },
      {
        region: "fret-3",
        positions: [
          [3, 5],
          [2, 4],
          [1, 5],
          [0, 3],
        ],
        barre: null,
      },
    ],
  },
  m9: {
    D: [
      {
        region: "fret-2",
        positions: [
          [4, 5],
          [2, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 3] },
      },
      {
        region: "fret-7",
        positions: [
          [5, 10],
          [3, 9],
        ],
        barre: { fret: 7, strings: [0, 1, 2, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [5, 10],
          [3, 9],
          [2, 9],
        ],
        barre: { fret: 7, strings: [0, 1, 4] },
      },
      {
        region: "fret-7",
        positions: [
          [5, 10],
          [3, 9],
        ],
        barre: { fret: 7, strings: [1, 2, 4] },
      },
    ],
    G: [
      {
        region: "open",
        positions: [
          [5, 3],
          [3, 2],
          [2, 0],
          [1, 3],
          [0, 2],
        ],
        barre: null,
      },
      {
        region: "fret-2",
        positions: [
          [5, 3],
          [2, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 3, 4] },
      },
      {
        region: "fret-2",
        positions: [
          [5, 3],
          [2, 4],
          [1, 3],
        ],
        barre: { fret: 2, strings: [0, 3] },
      },
    ],
  },
};

export default slashVoicings;
