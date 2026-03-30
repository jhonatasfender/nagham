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

export function Scales() {
  const { t } = useTranslation();
  const [useFlats, setUseFlats] = useState(false);
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
  const roots = useMemo(() => scaleRoots(useFlats), [useFlats]);
  const tableRows = useMemo(() => {
    if (!Array.isArray(selectedSemitones) || selectedSemitones.length === 0) {
      return [];
    }

    return roots.map((root) => ({
      root,
      notes: buildScaleNotes(root, selectedSemitones, useFlats),
      triads: buildScalesTableTriads(root, {
        showTriadsColumn,
        scaleId: selectedDefinition?.id,
        semitones: selectedSemitones,
        useFlats,
      }),
    }));
  }, [
    roots,
    selectedSemitones,
    useFlats,
    selectedDefinition?.id,
    showTriadsColumn,
  ]);

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 className="text-3xl font-semibold text-zinc-100 mb-3">
          {t("scales.title")}
        </h2>
        <p className="text-lg text-zinc-300 leading-relaxed">
          {t("scales.intro")}
        </p>
      </div>

      <section className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-5 space-y-4">
        <div className="flex flex-wrap items-end gap-4">
          <label className="flex min-w-64 flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-400">
              {t("scales.table.scaleType")}
            </span>
            <select
              value={selectedScale}
              onChange={(event) => setSelectedScale(event.target.value)}
              className="rounded-md border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
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
              onClick={() => setUseFlats(false)}
              className={notationToggleButtonClassName(!useFlats)}
            >
              {t("scales.table.sharps")}
            </button>
            <button
              type="button"
              onClick={() => setUseFlats(true)}
              className={notationToggleButtonClassName(useFlats)}
            >
              {t("scales.table.flats")}
            </button>
          </div>
        </div>

        {selectedSteps.length > 0 ? (
          <div className="space-y-2">
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
          <p className="rounded-md border border-amber-500/30 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
            {t("scales.table.approximationWarning")}
          </p>
        ) : null}

        {selectedDefinition?.conceptualOnly ? (
          <p className="rounded-md border border-zinc-600 bg-zinc-900/70 px-3 py-2 text-xs text-zinc-300">
            {t("scales.table.conceptOnly")}
          </p>
        ) : null}

        {showNaturalMinorTriadHint ? (
          <p className="rounded-md border border-zinc-600 bg-zinc-900/60 px-3 py-2 text-xs text-zinc-300 leading-relaxed">
            {t("scales.table.triadsNaturalMinorHybridHint")}
          </p>
        ) : null}

        {tableRows.length > 0 && !showTriadsColumn ? (
          <p className="rounded-md border border-zinc-700 bg-zinc-900/50 px-3 py-2 text-xs text-zinc-400 leading-relaxed">
            {t("scales.table.triadsHeptatonicOnly")}
          </p>
        ) : null}

        {tableRows.length > 0 ? (
          <div className="overflow-x-auto rounded-md border border-zinc-700">
            <table className="min-w-full border-collapse text-sm">
              <thead className="bg-zinc-900/80 text-zinc-300">
                <tr>
                  <th className="border-b border-zinc-700 px-3 py-2 text-left font-medium">
                    {t("scales.table.root")}
                  </th>
                  <th className="border-b border-zinc-700 px-3 py-2 text-left font-medium">
                    {t("scales.table.notes")}
                  </th>
                  {showTriadsColumn ? (
                    <th className="border-b border-zinc-700 px-3 py-2 text-left font-medium">
                      {t("scales.table.triads")}
                    </th>
                  ) : null}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr key={row.root} className="odd:bg-zinc-800/20">
                    <td className="border-b border-zinc-800 px-3 py-2 font-semibold text-zinc-100">
                      {row.root}
                    </td>
                    <td className="border-b border-zinc-800 px-3 py-2 text-zinc-300">
                      {row.notes.join(" - ")}
                    </td>
                    {showTriadsColumn ? (
                      <td className="border-b border-zinc-800 px-3 py-2 text-zinc-300">
                        {row.triads.join(" - ")}
                      </td>
                    ) : null}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-zinc-400">
            {t("scales.table.noFixedTable")}
          </p>
        )}
      </section>
    </div>
  );
}
