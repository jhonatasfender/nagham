import { useTranslation } from "react-i18next";
import { cn } from "../../utils/cn";
import { noteToMidi } from "../../domain/notes";
import {
  getNoteAtFret,
  getAllPositionsForChordTones,
  TABLE_FRET_COUNT,
} from "../../domain/guitar";

const DEFAULT_STRING_LABELS = [
  { order: "1ª", name: "Mi" },
  { order: "2ª", name: "Si" },
  { order: "3ª", name: "Sol" },
  { order: "4ª", name: "Ré" },
  { order: "5ª", name: "Lá" },
  { order: "6ª", name: "Mi" },
];

function getChordPositionSet(chordNotes) {
  const set = new Set();
  if (!chordNotes?.length) return set;
  for (const p of getAllPositionsForChordTones(chordNotes)) {
    set.add(`${p.stringIndex}-${p.fret}`);
  }
  return set;
}

export function FretboardTable({ selectedNote, onSelectNote, chordNotes }) {
  const { t } = useTranslation();
  const raw = t("fretboard.strings", { returnObjects: true });
  const stringLabels =
    Array.isArray(raw) && raw.length >= 6 ? raw : DEFAULT_STRING_LABELS;
  const frets = Array.from({ length: TABLE_FRET_COUNT + 1 }, (_, i) => i);
  const stringDisplayOrder = [0, 1, 2, 3, 4, 5];
  const chordPositions = getChordPositionSet(chordNotes ?? []);

  function isSelected(stringIndex, fret) {
    if (!selectedNote || selectedNote.octave == null) return false;
    const note = getNoteAtFret(stringIndex, fret);
    return (
      noteToMidi(note.name, note.octave) ===
      noteToMidi(selectedNote.name, selectedNote.octave)
    );
  }

  function isChordCell(stringIndex, fret) {
    return chordPositions.has(`${stringIndex}-${fret}`);
  }

  function handleCellClick(stringIndex, fret) {
    const note = getNoteAtFret(stringIndex, fret);
    onSelectNote?.(note);
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-center text-sm">
        <thead>
          <tr className="border-b border-zinc-600">
            <th className="border border-zinc-600 bg-zinc-700/80 px-2 py-1.5 font-medium text-zinc-300">
              {t("fretboard.string")}
            </th>
            <th className="border border-zinc-600 bg-zinc-700/80 px-1.5 py-1.5 font-medium text-zinc-300">
              {t("fretboard.open")}
            </th>
            {frets.slice(1).map((f) => (
              <th
                key={f}
                className="border border-zinc-600 bg-zinc-700/80 px-1 py-1.5 font-medium text-zinc-300"
              >
                {f}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {stringDisplayOrder.map((stringIndex) => (
            <tr key={stringIndex} className="border-b border-zinc-700">
              <td className="border border-zinc-600 bg-zinc-800/80 px-2 py-1 font-medium text-zinc-300">
                {stringLabels[stringIndex].order} (
                {stringLabels[stringIndex].name})
              </td>
              {frets.map((fret) => {
                const note = getNoteAtFret(stringIndex, fret);
                const selected = isSelected(stringIndex, fret);
                const chord = isChordCell(stringIndex, fret);
                return (
                  <td
                    key={fret}
                    className={cn(
                      "cursor-pointer border border-zinc-600 px-1 py-1 transition-colors",
                      selected
                        ? "bg-amber-500/30 text-amber-100"
                        : chord
                          ? "bg-amber-500/20 text-amber-200"
                          : "bg-zinc-800/50 text-zinc-200 hover:bg-zinc-700/50"
                    )}
                    onClick={() => handleCellClick(stringIndex, fret)}
                  >
                    {note.name}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
