const VOICING_QUALITY_ALIAS = {
  m5: "5",
};

export function resolveVoicingQuality(quality) {
  return VOICING_QUALITY_ALIAS[quality] ?? quality;
}
