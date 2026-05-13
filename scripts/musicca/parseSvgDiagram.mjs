// Pure parser: musicca SVG fragment → variation object.
//
// API: parseSvgDiagram($, $svg)
//   $    — cheerio root function (from `load(html)`).
//   $svg — cheerio Selection wrapping a single <svg> element.
//   returns: { region, positions, barre } in our domain format.
//
// Coordinate contract (musicca standard, viewBox 235x271):
//   - String x: 30, 65, 100, 135, 170, 205
//     Mapping: x=30 → stringIndex 5 (low E), x=205 → stringIndex 0 (high E).
//   - Fret row centers: 79.5, 128.5, 177.5, 226.5 (relative to fret 1..4
//     of the displayed window).
//   - Above-grid markers: ○ at cy ≈ 35.4, × at translate-y ≈ 24.13.

const STRING_X = [205, 170, 135, 100, 65, 30]; // by stringIndex 0..5
const FRET_ROW_Y = [79.5, 128.5, 177.5, 226.5]; // displayed frets 1..4
const ABOVE_GRID_MAX_Y = 50; // anything cy < 50 is a marker, not a fingering
const TOLERANCE = 6; // px tolerance for coordinate matching

function nearestIndex(value, candidates) {
  let bestIdx = -1;
  let bestDist = Infinity;
  for (let i = 0; i < candidates.length; i++) {
    const d = Math.abs(candidates[i] - value);
    if (d < bestDist) {
      bestDist = d;
      bestIdx = i;
    }
  }
  return bestDist <= TOLERANCE ? bestIdx : -1;
}

function xToStringIndex(x) {
  return nearestIndex(x, STRING_X);
}

function yToDisplayFret(y) {
  const idx = nearestIndex(y, FRET_ROW_Y);
  return idx === -1 ? -1 : idx + 1;
}

export function parseSvgDiagram($, $svg) {
  // 1. startFret from fret-number label (text at x < 30).
  let startFret = 1;
  $svg.find("text").each((_, el) => {
    const $el = $(el);
    const x = parseFloat($el.attr("x") ?? "0");
    const txt = $el.text().trim();
    if (x < 30 && /^\d+$/.test(txt) && startFret === 1) {
      const n = parseInt(txt, 10);
      if (Number.isFinite(n) && n > 0) startFret = n;
    }
  });

  const positions = [];
  const xOpen = new Set();

  // 2. Open-string markers above the grid (cy ≈ 35.4, fill="transparent").
  $svg.find("circle").each((_, el) => {
    const $el = $(el);
    const fill = ($el.attr("fill") ?? "").toLowerCase();
    const cy = parseFloat($el.attr("cy") ?? "NaN");
    const cx = parseFloat($el.attr("cx") ?? "NaN");
    if (fill === "transparent" && cy < ABOVE_GRID_MAX_Y) {
      const s = xToStringIndex(cx);
      if (s !== -1) xOpen.add(s);
    }
  });

  // 3. Finger dots: <g class="note-hover" fill="#72ac51"> <circle class="note">.
  $svg.find("g.note-hover").each((_, el) => {
    const $el = $(el);
    if (($el.attr("fill") ?? "").toLowerCase() !== "#72ac51") return;
    const $circle = $el.find("circle.note").first();
    if ($circle.length === 0) return;
    const cx = parseFloat($circle.attr("cx") ?? "NaN");
    const cy = parseFloat($circle.attr("cy") ?? "NaN");
    if (cy < ABOVE_GRID_MAX_Y) return;
    const stringIndex = xToStringIndex(cx);
    const displayFret = yToDisplayFret(cy);
    if (stringIndex === -1 || displayFret === -1) return;
    positions.push([stringIndex, startFret + displayFret - 1]);
  });

  // 4. Barre: rect with green fill.
  let barre = null;
  $svg.find("rect").each((_, el) => {
    const $el = $(el);
    if (($el.attr("fill") ?? "").toLowerCase() !== "#72ac51") return;
    const x = parseFloat($el.attr("x") ?? "NaN");
    const y = parseFloat($el.attr("y") ?? "NaN");
    const w = parseFloat($el.attr("width") ?? "NaN");
    const h = parseFloat($el.attr("height") ?? "NaN");
    if (!Number.isFinite(x) || !Number.isFinite(y) || !Number.isFinite(w)) return;
    const cy = y + h / 2;
    const displayFret = yToDisplayFret(cy);
    if (displayFret === -1) return;
    const strings = [];
    for (let s = 0; s < 6; s++) {
      const sx = STRING_X[s];
      if (sx >= x - 3 && sx <= x + w + 3) strings.push(s);
    }
    if (strings.length === 0) return;
    barre = {
      fret: startFret + displayFret - 1,
      strings: strings.sort((a, b) => a - b),
    };
  });

  // 5. Add open strings as fret-0 positions.
  for (const s of xOpen) positions.push([s, 0]);

  // 6. Dedupe + sort.
  const seen = new Set();
  const deduped = [];
  for (const p of positions) {
    const k = `${p[0]}-${p[1]}`;
    if (!seen.has(k)) {
      seen.add(k);
      deduped.push(p);
    }
  }
  deduped.sort((a, b) => (a[0] - b[0] !== 0 ? a[0] - b[0] : a[1] - b[1]));

  // 7. Region.
  const hasOpenFret = deduped.some(([, f]) => f === 0);
  const allFrets = deduped.map(([, f]) => f).filter((f) => f > 0);
  if (barre) allFrets.push(barre.fret);
  const minFret = allFrets.length ? Math.min(...allFrets) : 1;
  const region = hasOpenFret || minFret <= 1 ? "open" : `fret-${minFret}`;

  return { region, positions: deduped, barre };
}

// Used internally by the smoke test in Task 3 step 2.
export const __test_internals = { xToStringIndex, yToDisplayFret, STRING_X, FRET_ROW_Y };
