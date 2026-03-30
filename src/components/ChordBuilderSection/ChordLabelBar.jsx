import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiClipboardCopy, HiCheck } from "react-icons/hi";
import { cn } from "../../utils/cn";

export function ChordLabelBar({ chordLabel }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const canCopy = chordLabel && chordLabel !== "—";

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

  return (
    <div className="flex items-center justify-between gap-2 rounded border border-zinc-600 bg-zinc-800/80 px-3 py-2">
      <div className="flex items-center gap-2">
        <span className="text-xs text-zinc-500">
          {t("chordBuilder.chordLabel")}
        </span>
        <span className="font-mono font-medium text-zinc-200">
          {chordLabel ?? "—"}
        </span>
      </div>
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
  );
}
