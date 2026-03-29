import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiClipboardCopy, HiCheck } from "react-icons/hi";
import { getNoteForDisplay } from "../domain/chord";
import { NOTE_NAMES, NOTE_NAMES_FLATS } from "../domain/notes";

const CHORD_QUALITIES = [
  "Maj",
  "m",
  "5",
  "dim",
  "aug",
  "sus2",
  "sus4",
  "2",
  "6",
  "m6",
  "7",
  "maj7",
  "m7",
  "m7(b5)",
  "dim7",
  "add9",
  "9",
  "maj9",
  "m9",
  "11",
  "13",
];

export function ChordBuilderSection({
  root,
  quality,
  bass,
  useFlats,
  chordLabel,
  chordNotes,
  onRootChange,
  onQualityChange,
  onBassChange,
  onUseFlatsChange,
}) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const noteNames = useFlats ? NOTE_NAMES_FLATS : NOTE_NAMES;
  const rootDisplay = getNoteForDisplay(root ?? "C", useFlats);
  const bassDisplay = bass != null ? getNoteForDisplay(bass, useFlats) : null;

  const handleCopyChord = async () => {
    if (!chordLabel || chordLabel === "—") return;

    try {
      await navigator.clipboard.writeText(chordLabel);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy chord:", err);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
      <h2 className="mb-3 text-sm font-medium text-zinc-400">
        {t("chordBuilder.title")}
      </h2>

      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-medium text-zinc-500">
            {t("chordBuilder.notation")}
          </span>
          <div className="flex rounded-md border border-zinc-600 bg-zinc-800/80 p-0.5">
            <button
              type="button"
              onClick={() => onUseFlatsChange?.(false)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                !useFlats
                  ? "bg-amber-500/20 text-amber-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {t("chordBuilder.sharps")}
            </button>
            <button
              type="button"
              onClick={() => onUseFlatsChange?.(true)}
              className={`rounded px-2 py-1 text-xs font-medium transition-colors ${
                useFlats
                  ? "bg-amber-500/20 text-amber-400"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {t("chordBuilder.flats")}
            </button>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            {t("chordBuilder.root")}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {noteNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onRootChange?.(name)}
                className={`rounded px-2.5 py-1 text-sm font-medium transition-colors ${
                  name === rootDisplay
                    ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50"
                    : "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            {t("chordBuilder.quality")}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {CHORD_QUALITIES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onQualityChange?.(q)}
                className={`rounded px-2.5 py-1 text-sm font-medium transition-colors ${
                  q === quality
                    ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50"
                    : "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600"
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-500">
            {t("chordBuilder.bassOptional")}
          </label>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => onBassChange?.(null)}
              className={`rounded px-2.5 py-1 text-sm font-medium transition-colors ${
                bass == null
                  ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50"
                  : "bg-zinc-700/80 text-zinc-400 hover:bg-zinc-600"
              }`}
            >
              —
            </button>
            {noteNames.map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => onBassChange?.(name)}
                className={`rounded px-2.5 py-1 text-sm font-medium transition-colors ${
                  name === bassDisplay
                    ? "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50"
                    : "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 rounded border border-zinc-600 bg-zinc-800/80 px-3 py-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500">
              {t("chordBuilder.chordLabel")}
            </span>
            <span className="font-mono font-medium text-zinc-200">
              {chordLabel ?? "—"}
            </span>
          </div>
          {chordLabel && chordLabel !== "—" && (
            <button
              type="button"
              onClick={handleCopyChord}
              className={`flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-colors ${
                copied
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zinc-700/80 text-zinc-400 hover:bg-zinc-600 hover:text-zinc-200"
              }`}
              title={copied ? t("chordBuilder.copied") : t("chordBuilder.copy")}
            >
              {copied ? (
                <>
                  <HiCheck className="h-3.5 w-3.5" />
                  <span>{t("chordBuilder.copied") || "Copiado!"}</span>
                </>
              ) : (
                <>
                  <HiClipboardCopy className="h-3.5 w-3.5" />
                  <span>{t("chordBuilder.copy") || "Copiar"}</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-zinc-700 pt-4">
        <h3 className="mb-2 text-xs font-medium text-zinc-500">
          {t("chordBuilder.formationTitle")}
        </h3>
        <p className="mb-3 text-xs text-zinc-500">
          {t("chordBuilder.formationDescription")}
        </p>
        <div className="flex flex-wrap gap-2">
          {(chordNotes ?? []).map(({ name, octave }, i) => (
            <span
              key={`${name}-${octave}-${i}`}
              className="inline-flex items-center gap-1.5 rounded-md bg-zinc-700/80 px-2.5 py-1 font-mono text-sm"
            >
              <span className="text-zinc-200">
                {name}
                {octave}
              </span>
              <span
                className="text-zinc-500 text-xs"
                title={t("chordBuilder.degree")}
              >
                {i + 1}º
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
