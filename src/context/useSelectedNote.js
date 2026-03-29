import { useContext } from "react";
import { SelectedNoteContext } from "./selectedNoteContext";

export function useSelectedNote() {
  const ctx = useContext(SelectedNoteContext);
  if (!ctx)
    throw new Error("useSelectedNote must be used within SelectedNoteProvider");
  return ctx;
}
