import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  HiClipboardCopy,
  HiCheck,
  HiPlay,
  HiVolumeUp,
  HiVolumeOff,
} from "react-icons/hi";
import { cn } from "../../utils/cn";
import { useAudio } from "../../audio/useAudio";

export function ChordLabelBar({ chordLabel, chordNotes }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const canCopy = chordLabel && chordLabel !== "—";
  const canPlay = Array.isArray(chordNotes) && chordNotes.length > 0;
  const { muted, toggleMuted, playChord, supported } = useAudio();

  const handleCopy = async () => {
    if (!canCopy) return;
    try {
      await navigator.clipboard.writeText(chordLabel);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy chord:", err);
    }
  };

  const handlePlay = () => {
    if (!canPlay) return;
    playChord(chordNotes, { strumMs: 55 });
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded border border-zinc-600 bg-zinc-800/80 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">
          {t("chordBuilder.chordLabel")}
        </span>
        <span className="font-mono font-medium text-zinc-200">
          {chordLabel ?? "—"}
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        {supported && canPlay && (
          <button
            type="button"
            onClick={handlePlay}
            disabled={muted}
            className={cn(
              "flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-colors",
              muted
                ? "bg-zinc-800 text-zinc-600"
                : "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
            )}
            title={t("chordBuilder.playChord", { defaultValue: "Tocar acorde" })}
            aria-label={t("chordBuilder.playChord", {
              defaultValue: "Tocar acorde",
            })}
          >
            <HiPlay className="h-3.5 w-3.5" />
          </button>
        )}
        {supported && (
          <button
            type="button"
            onClick={toggleMuted}
            className={cn(
              "flex items-center rounded px-2 py-1 text-xs font-medium transition-colors",
              muted
                ? "bg-zinc-700/80 text-zinc-400 hover:bg-zinc-600 hover:text-zinc-200"
                : "bg-zinc-700/80 text-zinc-200 hover:bg-zinc-600"
            )}
            title={
              muted
                ? t("chordBuilder.unmute", { defaultValue: "Ativar som" })
                : t("chordBuilder.mute", { defaultValue: "Silenciar" })
            }
            aria-label={
              muted
                ? t("chordBuilder.unmute", { defaultValue: "Ativar som" })
                : t("chordBuilder.mute", { defaultValue: "Silenciar" })
            }
            aria-pressed={muted}
          >
            {muted ? (
              <HiVolumeOff className="h-3.5 w-3.5" />
            ) : (
              <HiVolumeUp className="h-3.5 w-3.5" />
            )}
          </button>
        )}
        {canCopy && (
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "flex items-center gap-1.5 rounded px-2 py-1 text-xs font-medium transition-colors",
              copied
                ? "bg-green-500/20 text-green-400"
                : "bg-zinc-700/80 text-zinc-400 hover:bg-zinc-600 hover:text-zinc-200"
            )}
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
  );
}
