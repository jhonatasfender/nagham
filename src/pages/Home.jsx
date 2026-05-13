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
  getBarreFromVoicing,
  getChordVariations,
  getChordVoicing,
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
  const variationCode = useMemo(() => {
    const positions = getChordVoicing(root, quality, variationIndex) ?? [];
    const barre = getBarreFromVoicing(root, quality, variationIndex);
    if (positions.length === 0 && !barre) return null;
    const lines = ["  ["];
    for (const p of positions) {
      lines.push(`    [${p.stringIndex}, ${p.fret}],`);
    }
    if (barre && barre.strings && barre.strings.length > 0) {
      lines.push(
        `    { barre: ${barre.fret}, strings: [${barre.strings.join(", ")}] },`
      );
    }
    lines.push("  ],");
    return lines.join("\n");
  }, [root, quality, variationIndex]);
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
              {variationCode && (
                <div className="rounded border border-zinc-700 bg-zinc-900/50 p-3 font-mono text-xs text-zinc-300 relative">
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(variationCode)}
                    className="absolute top-2 right-2 rounded px-2 py-1 text-xs font-medium text-amber-400 bg-amber-500/20 hover:bg-amber-500/30 transition-colors"
                  >
                    {t("home.code.copy", { defaultValue: "Copiar" })}
                  </button>
                  <div className="text-[10px] uppercase tracking-wide text-zinc-500 mb-1">
                    {t("home.code.title", {
                      defaultValue: "Código da variação",
                    })}
                  </div>
                  <pre className="select-text whitespace-pre font-mono text-xs text-zinc-300 overflow-x-auto pr-16">
                    {variationCode}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
