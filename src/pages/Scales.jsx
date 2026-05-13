import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  buildScalesTableTriads,
  buildScaleNotes,
  buildStepPattern,
  getScaleDefinition,
  scaleRoots,
  SCALE_DEFINITIONS,
} from "../domain/scales";
import { cn } from "../utils/cn";

function notationToggleButtonClassName(isActive) {
  return cn(
    "rounded px-3 py-1.5 text-sm transition-colors",
    isActive
      ? "bg-amber-500/20 text-amber-300"
      : "text-zinc-400 hover:text-zinc-200"
  );
}

const AUTO_ROOTS = [
  "C",
  "Db",
  "D",
  "Eb",
  "E",
  "F",
  "F#",
  "G",
  "Ab",
  "A",
  "Bb",
  "B",
];

function isFlatRoot(root) {
  return root.includes("b");
}

const HARD_ENHARMONIC_MAP = {
  Cbb: "Bb",
  Fbb: "Eb",
  "C##": "D",
  "D##": "E",
  "F##": "G",
  "G##": "A",
  "A##": "B",
  "E##": "F#",
  "B##": "C#",
  "E#": "F",
  "B#": "C",
  Cb: "B",
  Fb: "E",
};

const HARD_ENHARMONIC_RE =
  /Cbb|Fbb|C##|D##|F##|G##|A##|E##|B##|E#|B#|Cb|Fb/g;

function simplifyHardEnharmonics(text) {
  return text.replace(HARD_ENHARMONIC_RE, (m) => HARD_ENHARMONIC_MAP[m] ?? m);
}

export function Scales() {
  const { t } = useTranslation();
  const [notationMode, setNotationMode] = useState("auto");
  const [selectedScale, setSelectedScale] = useState(SCALE_DEFINITIONS[0]?.id);
  const selectedDefinition = useMemo(
    () => getScaleDefinition(selectedScale),
    [selectedScale]
  );
  const selectedSemitones = selectedDefinition?.semitones ?? null;
  const showNaturalMinorTriadHint = selectedDefinition?.id === "natural-minor";
  const selectedSteps = useMemo(
    () => buildStepPattern(selectedSemitones),
    [selectedSemitones]
  );
  const showTriadsColumn = useMemo(
    () => Array.isArray(selectedSemitones) && selectedSemitones.length === 7,
    [selectedSemitones]
  );
  const roots = useMemo(() => {
    if (notationMode === "auto") return AUTO_ROOTS;
    return scaleRoots(notationMode === "flats");
  }, [notationMode]);
  const flatsForRoot = (root) => {
    if (notationMode === "auto") return isFlatRoot(root);
    return notationMode === "flats";
  };
  const selectedLetterSteps = selectedDefinition?.letterSteps;
  const tableRows = useMemo(() => {
    if (!Array.isArray(selectedSemitones) || selectedSemitones.length === 0) {
      return [];
    }

    return roots.map((root) => {
      const rowUseFlats = flatsForRoot(root);
      const rawNotes = buildScaleNotes(root, selectedSemitones, rowUseFlats, {
        letterSteps: selectedLetterSteps,
      });
      const rawTriads = buildScalesTableTriads(root, {
        showTriadsColumn,
        scaleId: selectedDefinition?.id,
        semitones: selectedSemitones,
        useFlats: rowUseFlats,
        letterSteps: selectedLetterSteps,
      });
      const shouldSimplify = notationMode !== "auto";
      return {
        root,
        notes: shouldSimplify ? rawNotes.map(simplifyHardEnharmonics) : rawNotes,
        triads: shouldSimplify ? rawTriads.map(simplifyHardEnharmonics) : rawTriads,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    roots,
    selectedSemitones,
    notationMode,
    selectedDefinition?.id,
    selectedLetterSteps,
    showTriadsColumn,
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-10 select-none">
      <div className="select-text">
        <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
          {t("scales.title")}
        </h2>
        <p className="text-lg text-zinc-300 leading-relaxed">
          {t("scales.intro")}
        </p>
      </div>

      <section className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex w-full min-w-0 flex-col gap-1.5 sm:min-w-64">
            <span className="text-xs font-medium text-zinc-400">
              {t("scales.table.scaleType")}
            </span>
            <select
              value={selectedScale}
              onChange={(event) => setSelectedScale(event.target.value)}
              className="select-text rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            >
              {SCALE_DEFINITIONS.map((definition) => (
                <option key={definition.id} value={definition.id}>
                  {t(`scales.scaleLabels.${definition.id}`, {
                    defaultValue: definition.id,
                  })}
                </option>
              ))}
            </select>
          </label>

          <div className="rounded-md border border-zinc-600 bg-zinc-900 p-1">
            <button
              type="button"
              onClick={() => setNotationMode("auto")}
              className={notationToggleButtonClassName(
                notationMode === "auto"
              )}
            >
              {t("scales.table.auto", { defaultValue: "Auto" })}
            </button>
            <button
              type="button"
              onClick={() => setNotationMode("sharps")}
              className={notationToggleButtonClassName(
                notationMode === "sharps"
              )}
            >
              {t("scales.table.sharps")}
            </button>
            <button
              type="button"
              onClick={() => setNotationMode("flats")}
              className={notationToggleButtonClassName(
                notationMode === "flats"
              )}
            >
              {t("scales.table.flats")}
            </button>
          </div>
        </div>

        {selectedSteps.length > 0 ? (
          <div className="select-text space-y-2">
            <p className="text-xs text-zinc-400">
              {t("scales.table.stepPattern")}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {selectedSteps.map((step, index) => (
                <span
                  key={`${step}-${index}`}
                  className="rounded-md border border-zinc-600 bg-zinc-900 px-2 py-1 text-xs text-zinc-300"
                >
                  {step}
                </span>
              ))}
            </div>
          </div>
        ) : null}

        {selectedDefinition?.approximate12Tet ? (
          <p className="select-text rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            {t("scales.table.approximationWarning")}
          </p>
        ) : null}

        {selectedDefinition?.conceptualOnly ? (
          <p className="select-text rounded-md border border-zinc-600 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-300">
            {t("scales.table.conceptOnly")}
          </p>
        ) : null}

        {showNaturalMinorTriadHint ? (
          <p className="select-text rounded-md border border-zinc-600 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 leading-relaxed">
            {t("scales.table.triadsNaturalMinorHybridHint")}
          </p>
        ) : null}

        {tableRows.length > 0 && !showTriadsColumn ? (
          <p className="select-text rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400 leading-relaxed">
            {t("scales.table.triadsHeptatonicOnly")}
          </p>
        ) : null}

        {tableRows.length > 0 ? (
          <div className="select-text grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {tableRows.map((row) => (
              <article
                key={row.root}
                className="flex flex-col gap-3 rounded-md border border-zinc-700 bg-zinc-900/60 p-4"
              >
                <header className="flex items-baseline gap-2">
                  <span className="text-xs uppercase tracking-wide text-zinc-500">
                    {t("scales.table.root")}
                  </span>
                  <span className="text-2xl font-semibold text-zinc-100">
                    {row.root}
                  </span>
                </header>

                <div className="space-y-1.5">
                  <p className="text-xs font-medium text-zinc-400">
                    {t("scales.table.notes")}
                  </p>
                  <ul className="flex flex-wrap gap-1.5">
                    {row.notes.map((note, index) => (
                      <li
                        key={`${row.root}-note-${index}`}
                        className="rounded border border-zinc-700 bg-zinc-800/70 px-2 py-0.5 text-sm text-zinc-200"
                      >
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>

                {showTriadsColumn && row.triads.length > 0 ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-zinc-400">
                      {t("scales.table.triads")}
                    </p>
                    <ul className="flex flex-wrap gap-1.5">
                      {row.triads.map((triad, index) => (
                        <li
                          key={`${row.root}-triad-${index}`}
                          className="rounded border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-sm text-amber-200"
                        >
                          {triad}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="select-text text-sm text-zinc-400">
            {t("scales.table.noFixedTable")}
          </p>
        )}
      </section>
    </div>
  );
}
