import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { GuitarView } from "../../views/Guitar/GuitarView";
import { ChordVariationStrip } from "../../views/Guitar/ChordVariationStrip.jsx";
import {
  getBarreFromVoicing,
  getChordVariations,
  getChordVoicing,
} from "../../domain/voicings";
import { VariationCodeBlock } from "./VariationCodeBlock.jsx";

export function GuitarSection({
  selectedNote,
  onSelectNote,
  chordNotes,
  root,
  quality,
  bass,
  variationIndex,
  onSelectVariation,
}) {
  const { t } = useTranslation();

  const variations = useMemo(
    () => getChordVariations(root, quality, bass),
    [root, quality, bass]
  );

  const variationCode = useMemo(() => {
    const positions =
      getChordVoicing(root, quality, variationIndex, bass) ?? [];
    const barre = getBarreFromVoicing(root, quality, variationIndex, bass);
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
  }, [root, quality, bass, variationIndex]);

  return (
    <div className="rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
      <h3 className="mb-3 text-sm font-medium text-zinc-400">
        {t("app.sections.guitar")}
      </h3>
      <div className="space-y-6">
        <GuitarView
          selectedNote={selectedNote}
          onSelectNote={onSelectNote}
          syncGlobalSelection={false}
          chordNotes={chordNotes}
          root={root}
          quality={quality}
          bass={bass}
          variationIndex={variationIndex}
        />
        <ChordVariationStrip
          variations={variations}
          selectedIndex={variationIndex}
          onSelect={onSelectVariation}
        />
        <VariationCodeBlock code={variationCode} />
      </div>
    </div>
  );
}
