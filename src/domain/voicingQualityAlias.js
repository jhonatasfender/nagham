const VOICING_QUALITY_ALIAS = {
  m5: "m",
  "9+": "9",
};

export function resolveVoicingQuality(quality) {
  return VOICING_QUALITY_ALIAS[quality] ?? quality;
}
