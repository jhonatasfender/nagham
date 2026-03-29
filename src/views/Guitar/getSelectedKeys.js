import { getNoteForDisplay } from "../../domain/chord";
import { getAllPositionsForNote } from "../../domain/guitar";

export function getSelectedKeys(selectedNote, VISIBLE_FRETS) {
  const selectedKeys = new Set();
  if (selectedNote && selectedNote.octave != null) {
    const sharpName = getNoteForDisplay(selectedNote.name, false);
    const visibleFretSet = new Set(VISIBLE_FRETS);
    getAllPositionsForNote(sharpName, selectedNote.octave).forEach((p) => {
      if (visibleFretSet.has(p.fret)) {
        selectedKeys.add(`${p.stringIndex}-${p.fret}`);
      }
    });
  }
  return selectedKeys;
}
