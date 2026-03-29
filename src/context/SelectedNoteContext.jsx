import { useState, useCallback } from "react";
import { DEFAULT_NOTE } from "../domain/notes";
import { SelectedNoteContext } from "./selectedNoteContext";

export function SelectedNoteProvider({ children }) {
  const [selectedNote, setSelectedNoteState] = useState(DEFAULT_NOTE);

  const setSelectedNote = useCallback((note) => {
    if (
      note &&
      typeof note === "object" &&
      "name" in note &&
      "octave" in note
    ) {
      setSelectedNoteState({ name: note.name, octave: note.octave });
    } else {
      setSelectedNoteState(note);
    }
  }, []);

  return (
    <SelectedNoteContext.Provider value={{ selectedNote, setSelectedNote }}>
      {children}
    </SelectedNoteContext.Provider>
  );
}
