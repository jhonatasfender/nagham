import { useMemo, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ChordBuilderSection } from "../components/ChordBuilderSection";
import { useSelectedNote } from "../context/useSelectedNote";
import {
  getChordLabel,
  getChordNotes,
  getNoteForDisplay,
} from "../domain/chord";
import { createMatrixFromChord } from "../domain/notationMatrix";
import { getStaffChordVoicing } from "../domain/staffVoicings";
import { GuitarView } from "../views/Guitar/GuitarView";
import { PianoView } from "../views/Piano/PianoView";
import { StaffView } from "../views/Staff/StaffView";

const initialChordState = {
  root: "C",
  quality: "Maj",
  bass: null,
  useFlats: false,
};

function chordReducer(state, action) {
  switch (action.type) {
    case "SET_ROOT":
      return { ...state, root: action.payload };
    case "SET_QUALITY":
      return { ...state, quality: action.payload };
    case "SET_BASS":
      return { ...state, bass: action.payload };
    case "SET_USE_FLATS":
      return { ...state, useFlats: action.payload };
    default:
      return state;
  }
}

export function Home() {
  const { t } = useTranslation();
  const { selectedNote, setSelectedNote } = useSelectedNote();
  const [chordState, dispatchChord] = useReducer(
    chordReducer,
    initialChordState
  );
  const { root, quality, bass, useFlats } = chordState;

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
      if (voicing) {
        return voicing;
      }
    }
    return chordNotes;
  }, [chordNotes, root, quality]);
  const scoreMatrix = useMemo(
    () => createMatrixFromChord(notesForStaff),
    [notesForStaff]
  );

  const noteLabel = useMemo(() => {
    if (!selectedNote) return "—";
    const displayName = getNoteForDisplay(selectedNote.name, useFlats);
    return selectedNote.octave != null
      ? `${displayName}${selectedNote.octave}`
      : displayName;
  }, [selectedNote, useFlats]);

  return (
    <div className="flex gap-8">
      <aside className="shrink-0 w-96 min-w-80">
        <ChordBuilderSection
          root={root}
          quality={quality}
          bass={bass}
          useFlats={useFlats}
          chordLabel={chordLabel}
          chordNotes={chordNotes}
          onRootChange={(name) => {
            dispatchChord({ type: "SET_ROOT", payload: name });
            setSelectedNote({ name, octave: null });
          }}
          onQualityChange={(q) =>
            dispatchChord({ type: "SET_QUALITY", payload: q })
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
          <p className="text-zinc-400">
            {t("home.currentNote")}{" "}
            <span className="font-medium text-zinc-200">{noteLabel}</span>
          </p>
        </div>

        <section className="space-y-8">
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              {t("app.sections.staff")}
            </h3>
            <StaffView
              selectedNote={selectedNote}
              onSelectNote={setSelectedNote}
              scoreMatrix={scoreMatrix}
            />
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              {t("app.sections.piano")}
            </h3>
            <PianoView
              selectedNote={selectedNote}
              onSelectNote={setSelectedNote}
              chordNotes={chordNotes}
              root={root}
              quality={quality}
            />
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              {t("app.sections.guitar")}
            </h3>
            <GuitarView
              selectedNote={selectedNote}
              onSelectNote={setSelectedNote}
              chordNotes={chordNotes}
              root={root}
              quality={quality}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
