import { useCallback, useMemo, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ChordBuilderSection } from "../components/ChordBuilderSection";
import { useSelectedNote } from "../context/useSelectedNote";
import { useAudio } from "../audio/useAudio";
import {
  effectiveChordQuality,
  getChordLabel,
  getChordNotes,
} from "../domain/chord";
import { createMatrixFromChord } from "../domain/notationMatrix";
import { getStaffChordVoicing } from "../domain/pianoVoicings";
import { chordReducer, initialChordState } from "./Home/chordReducer.js";
import { StaffSection } from "./Home/StaffSection.jsx";
import { PianoSection } from "./Home/PianoSection.jsx";
import { GuitarSection } from "./Home/GuitarSection.jsx";

export function Home() {
  const { t } = useTranslation();
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const { playNote } = useAudio();
  const [chordState, dispatchChord] = useReducer(
    chordReducer,
    initialChordState
  );
  const { root, triad, extension, bass, useFlats, variationIndex } = chordState;

  const handleSelectNote = useCallback(
    (note) => {
      setSelectedNote(note);
      if (note && note.octave != null) playNote(note);
    },
    [setSelectedNote, playNote]
  );

  const quality = useMemo(
    () => effectiveChordQuality({ triad, extension }),
    [triad, extension]
  );

  const chordLabel = useMemo(
    () => getChordLabel(root, quality, useFlats, bass),
    [root, quality, useFlats, bass]
  );
  const chordNotes = useMemo(
    () => getChordNotes(root, quality, { bass, useFlats }),
    [root, quality, bass, useFlats]
  );
  const notesForStaff = useMemo(() => {
    if (chordNotes?.length && root && quality) {
      const voicing = getStaffChordVoicing(root, quality);
      if (voicing) return voicing;
    }
    return chordNotes;
  }, [chordNotes, root, quality]);
  const scoreMatrix = useMemo(
    () => createMatrixFromChord(notesForStaff),
    [notesForStaff]
  );

  return (
    <div className="home-layout select-none">
      <aside className="home-sidebar">
        <ChordBuilderSection
          root={root}
          triad={triad}
          extension={extension}
          bass={bass}
          useFlats={useFlats}
          chordLabel={chordLabel}
          chordNotes={chordNotes}
          onRootChange={(name) => {
            dispatchChord({ type: "SET_ROOT", payload: name });
            setSelectedNote({ name, octave: null });
          }}
          onTriadChange={(value) =>
            dispatchChord({ type: "SET_TRIAD", payload: value })
          }
          onExtensionChange={(payload) =>
            dispatchChord({ type: "SET_EXTENSION", payload })
          }
          onBassChange={(name) => {
            dispatchChord({ type: "SET_BASS", payload: name });
            if (name) {
              setSelectedNote({ name, octave: null });
            }
          }}
          onUseFlatsChange={(value) =>
            dispatchChord({ type: "SET_USE_FLATS", payload: value })
          }
        />
      </aside>
      <div className="min-w-0 flex-1 space-y-8">
        <div>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-2">
            {t("home.title")}
          </h2>
        </div>

        <section className="space-y-8">
          <StaffSection
            selectedNote={selectedNote}
            onSelectNote={handleSelectNote}
            scoreMatrix={scoreMatrix}
          />
          <PianoSection
            selectedNote={selectedNote}
            onSelectNote={handleSelectNote}
            chordNotes={chordNotes}
            root={root}
            quality={quality}
          />
          <GuitarSection
            selectedNote={selectedNote}
            onSelectNote={handleSelectNote}
            chordNotes={chordNotes}
            root={root}
            quality={quality}
            variationIndex={variationIndex}
            onSelectVariation={(idx) =>
              dispatchChord({ type: "SET_VARIATION_INDEX", payload: idx })
            }
          />
        </section>
      </div>
    </div>
  );
}
