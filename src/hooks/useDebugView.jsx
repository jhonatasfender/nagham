import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiCode } from "react-icons/hi";
import { DebugModal } from "../components/DebugModal";

export function useDebugView({ title, data }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const trigger = (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label={t("debug.trigger")}
      title={t("debug.trigger")}
      className="inline-flex items-center justify-center rounded p-1 text-zinc-500 opacity-50 transition-opacity hover:text-zinc-200 hover:opacity-100 focus-visible:opacity-100"
    >
      <HiCode className="h-3.5 w-3.5" aria-hidden="true" />
    </button>
  );

  const modal = (
    <DebugModal
      open={open}
      onClose={() => setOpen(false)}
      title={title}
      data={data}
    />
  );

  return { trigger, modal };
}
