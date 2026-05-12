import { useCallback, useMemo, useReducer } from "react";
import { useTranslation } from "react-i18next";
import { ChordBuilderSection } from "../components/ChordBuilderSection";
import { useSelectedNote } from "../context/useSelectedNote";
import { useAudio } from "../audio/useAudio";
import {
  effectiveChordQuality,
  EXTENSION_COMPOSABLE_WITH_TRIAD,
  getChordLabel,
  getChordNotes,
} from "../domain/chord";
import { createMatrixFromChord } from "../domain/notationMatrix";
import { getStaffChordVoicing } from "../domain/pianoVoicings";
import {
  getChordVariations,
} from "../domain/voicings";
import { ChordVariationStrip } from "../views/Guitar/ChordVariationStrip.jsx";
import { GuitarView } from "../views/Guitar/GuitarView";
import { PianoView } from "../views/Piano/PianoView";
import { StaffView } from "../views/Staff/StaffView";

const initialChordState = {
  root: "C",
  triad: "Maj",
  extension: null,
  bass: null,
  useFlats: false,
  variationIndex: 0,
};

function chordReducer(state, action) {
  switch (action.type) {
    case "SET_ROOT":
      return { ...state, root: action.payload, variationIndex: 0 };
    case "SET_TRIAD": {
      if (action.payload === state.triad) return state;
      return {
        ...state,
        triad: action.payload,
        variationIndex: 0,
        extension: EXTENSION_COMPOSABLE_WITH_TRIAD.has(state.extension)
          ? state.extension
          : null,
      };
    }
    case "SET_EXTENSION": {
      const { ext, impliedTriad } = action.payload;
      if (ext == null)
        return { ...state, extension: null, variationIndex: 0 };
      return {
        ...state,
        extension: ext,
        variationIndex: 0,
        triad: impliedTriad != null ? impliedTriad : state.triad,
      };
    }
    case "SET_VARIATION_INDEX":
      return { ...state, variationIndex: action.payload };
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
  const variations = useMemo(
    () => getChordVariations(root, quality),
    [root, quality]
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
          onTriadChange={(t) =>
            dispatchChord({ type: "SET_TRIAD", payload: t })
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
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              {t("app.sections.staff")}
            </h3>
            <StaffView
              selectedNote={selectedNote}
              onSelectNote={handleSelectNote}
              scoreMatrix={scoreMatrix}
            />
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              {t("app.sections.piano")}
            </h3>
            <PianoView
              selectedNote={selectedNote}
              onSelectNote={handleSelectNote}
              chordNotes={chordNotes}
              root={root}
              quality={quality}
            />
          </div>
          <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
            <h3 className="mb-3 text-sm font-medium text-zinc-400">
              {t("app.sections.guitar")}
            </h3>
            <div className="space-y-6">
              <GuitarView
                selectedNote={selectedNote}
                onSelectNote={handleSelectNote}
                syncGlobalSelection={false}
                chordNotes={chordNotes}
                root={root}
                quality={quality}
                variationIndex={variationIndex}
              />
              <ChordVariationStrip
                variations={variations}
                selectedIndex={variationIndex}
                onSelect={(idx) =>
                  dispatchChord({ type: "SET_VARIATION_INDEX", payload: idx })
                }
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
