import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { HiCheck, HiClipboardCopy, HiX } from "react-icons/hi";
import { cn } from "../utils/cn";

function formatPayload(data) {
  if (typeof data === "string") return data;
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
}

export function DebugModal({ open, onClose, title, data }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const payload = formatPayload(data);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy debug payload:", err);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label={t("debug.close")}
        className="absolute inset-0 bg-zinc-950/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900 shadow-2xl">
        <header className="flex items-center justify-between gap-2 border-b border-zinc-700 px-4 py-3">
          <h3 className="text-sm font-medium text-zinc-200">{title}</h3>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors",
                copied
                  ? "bg-green-500/20 text-green-400"
                  : "bg-zinc-700/80 text-zinc-300 hover:bg-zinc-600 hover:text-zinc-100"
              )}
              title={copied ? t("debug.copied") : t("debug.copy")}
            >
              {copied ? (
                <>
                  <HiCheck className="h-3.5 w-3.5" />
                  <span>{t("debug.copied")}</span>
                </>
              ) : (
                <>
                  <HiClipboardCopy className="h-3.5 w-3.5" />
                  <span>{t("debug.copy")}</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("debug.close")}
              title={t("debug.close")}
              className="inline-flex items-center justify-center rounded-md p-1.5 text-zinc-400 hover:bg-zinc-700/60 hover:text-zinc-100"
            >
              <HiX className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>
        <pre className="overflow-auto bg-zinc-950/60 px-4 py-3 text-xs leading-relaxed text-zinc-200 select-text">
          {payload}
        </pre>
      </div>
    </div>
  );
}
