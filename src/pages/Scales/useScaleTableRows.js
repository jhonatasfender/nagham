import { useMemo } from "react";
import {
  buildScaleNotes,
  buildScalesTableTriads,
  buildStepPattern,
  scaleRoots,
} from "../../domain/scales";
import { AUTO_ROOTS, isFlatRoot, simplifyHardEnharmonics } from "./enharmonics";

export function useScaleTableRows(definition, notationMode) {
  const semitones = definition?.semitones ?? null;
  const letterSteps = definition?.letterSteps;
  const scaleId = definition?.id;

  const selectedSteps = useMemo(
    () => buildStepPattern(semitones),
    [semitones]
  );

  const showTriadsColumn = useMemo(
    () => Array.isArray(semitones) && semitones.length === 7,
    [semitones]
  );

  const tableRows = useMemo(() => {
    if (!Array.isArray(semitones) || semitones.length === 0) return [];
    const roots =
      notationMode === "auto"
        ? AUTO_ROOTS
        : scaleRoots(notationMode === "flats");
    return roots.map((root) => {
      const useFlats =
        notationMode === "auto" ? isFlatRoot(root) : notationMode === "flats";
      const rawNotes = buildScaleNotes(root, semitones, useFlats, {
        letterSteps,
      });
      const rawTriads = buildScalesTableTriads(root, {
        showTriadsColumn,
        scaleId,
        semitones,
        useFlats,
        letterSteps,
      });
      const shouldSimplify = notationMode !== "auto";
      return {
        root,
        notes: shouldSimplify
          ? rawNotes.map(simplifyHardEnharmonics)
          : rawNotes,
        triads: shouldSimplify
          ? rawTriads.map(simplifyHardEnharmonics)
          : rawTriads,
      };
    });
  }, [semitones, notationMode, scaleId, letterSteps, showTriadsColumn]);

  return { tableRows, selectedSteps, showTriadsColumn };
}
