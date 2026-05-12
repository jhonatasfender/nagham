import { useCallback, useEffect, useState } from "react";
import { noteToMidi } from "../domain/notes";
import {
  getMuted,
  isAudioSupported,
  playChord as playChordRaw,
  playNote as playNoteRaw,
  setMuted as setMutedRaw,
} from "./player";

export function useAudio() {
  const [muted, setMutedState] = useState(() => getMuted());

  useEffect(() => {
    setMutedRaw(muted);
  }, [muted]);

  const toggleMuted = useCallback(() => {
    setMutedState((prev) => !prev);
  }, []);

  const playNote = useCallback((note) => {
    if (!note || note.octave == null) return;
    playNoteRaw(noteToMidi(note.name, note.octave));
  }, []);

  const playChord = useCallback((notes, options) => {
    if (!notes?.length) return;
    const midis = notes
      .filter((n) => typeof n.octave === "number")
      .map((n) => noteToMidi(n.name, n.octave));
    playChordRaw(midis, options);
  }, []);

  return {
    muted,
    toggleMuted,
    supported: isAudioSupported(),
    playNote,
    playChord,
  };
}
