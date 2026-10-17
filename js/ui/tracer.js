// Handwriting pad: trace a faint model letter, or write from memory and compare.
// Scoring rasterises the model glyph and compares it with the learner's ink
// (F1 of coverage and precision with a tolerance radius).
import { h } from './dom.js';

const GRID = 96; // scoring resolution
const FONT = '"Noto Naskh Arabic", "Amiri", "Geeza Pro", "Arial", serif';

function glyphMask(glyph, size) {
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d');
  drawGlyph(g, glyph, size, '#000');
  const data = g.getImageData(0, 0, size, size).data;
  const mask = new Uint8Array(size * size);
  for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] > 60 ? 1 : 0;
  return mask;
}

function drawGlyph(g, glyph, size, color) {
  let fontPx = size * 0.62;
  g.font = `${fontPx}px ${FONT}`;
  let m = g.measureText(glyph);
  const w = (m.actualBoundingBoxLeft || 0) + (m.actualBoundingBoxRight || m.width);
  const hgt = (m.actualBoundingBoxAscent || fontPx) + (m.actualBoundingBoxDescent || 0);
  const scale = Math.min(1, (size * 0.8) / Math.max(w, hgt, 1));
  fontPx *= scale;
  g.font = `${fontPx}px ${FONT}`;
  m = g.measureText(glyph);
  const left = m.actualBoundingBoxLeft || 0;
  const right = m.actualBoundingBoxRight || m.width;
  const asc = m.actualBoundingBoxAscent || fontPx * 0.7;
  const desc = m.actualBoundingBoxDescent || fontPx * 0.3;
  g.fillStyle = color;
  g.textAlign = 'left';
  g.textBaseline = 'alphabetic';
  g.direction = 'rtl';
  const x = (size - (left + right)) / 2 + left;
  const y = (size - (asc + desc)) / 2 + asc;
  g.fillText(glyph, x, y);
}

function dilate(mask, size, r) {
  const out = new Uint8Array(mask.length);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if (!mask[y * size + x]) continue;
    for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const nx = x + dx, ny = y + dy;
      if (nx >= 0 && ny >= 0 && nx < size && ny < size && dx * dx + dy * dy <= r * r) out[ny * size + nx] = 1;
    }
  }
  return out;
}

export function scoreInk(target, ink, size = GRID, tol = 4) {
  const tSum = target.reduce((a, b) => a + b, 0);
  const iSum = ink.reduce((a, b) => a + b, 0);
  if (!tSum || !iSum) return 0;
  const tD = dilate(target, size, tol);
  const iD = dilate(ink, size, tol);
  let covered = 0, inside = 0;
  for (let i = 0; i < target.length; i++) {
    if (target[i] && iD[i]) covered++;
    if (ink[i] && tD[i]) inside++;
  }
  const recall = covered / tSum;
  const precision = inside / iSum;
  return recall + precision ? (2 * recall * precision) / (recall + precision) : 0;
}

/**
 * @param {{glyph: string, guide?: boolean, onStroke?: () => void}} opts
 */
export function createTracer({ glyph, guide = true, onStroke } = {}) {
  const css = 260;
  const dpr = window.devicePixelRatio || 1;
  const bg = h('canvas.trace-bg', { width: css * dpr, height: css * dpr });
  const fg = h('canvas.trace-fg', { width: css * dpr, height: css * dpr, 'aria-label': 'Drawing area' });
  const wrap = h('div.tracer', bg, fg);
  const bgc = bg.getContext('2d');
  const fgc = fg.getContext('2d');
  fgc.scale(dpr, dpr);
  let strokes = [];
  let current = null;

  function paintGuide(show, color) {
    bgc.setTransform(1, 0, 0, 1, 0, 0);
    bgc.clearRect(0, 0, bg.width, bg.height);
    // baseline + mid guides
    bgc.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--line') || '#ddd';
    bgc.setLineDash([6 * dpr, 6 * dpr]);
    bgc.lineWidth = dpr;
    for (const f of [0.5]) { bgc.beginPath(); bgc.moveTo(0, bg.height * f); bgc.lineTo(bg.width, bg.height * f); bgc.stroke(); }
    bgc.setLineDash([]);
    if (show) drawGlyph(bgc, glyph, bg.width, color);
  }
  const guideColor = () => getComputedStyle(document.documentElement).getPropertyValue('--guide').trim() || 'rgba(120,120,160,.25)';
  // Fonts may still be loading; repaint once ready.
  paintGuide(guide, guideColor());
  document.fonts?.ready.then(() => paintGuide(guide, guideColor()));

  function redraw() {
    fgc.clearRect(0, 0, css, css);
    fgc.lineCap = fgc.lineJoin = 'round';
    fgc.lineWidth = 11;
    fgc.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim() || '#3b5bdb';
    for (const s of strokes) {
      fgc.beginPath();
      s.forEach(([x, y], i) => (i ? fgc.lineTo(x, y) : fgc.moveTo(x, y)));
      if (s.length === 1) fgc.lineTo(s[0][0] + 0.1, s[0][1]);
      fgc.stroke();
    }
  }
  const pos = (e) => {
    const r = fg.getBoundingClientRect();
    return [((e.clientX - r.left) / r.width) * css, ((e.clientY - r.top) / r.height) * css];
  };
  fg.addEventListener('pointerdown', (e) => { e.preventDefault(); fg.setPointerCapture(e.pointerId); current = [pos(e)]; strokes.push(current); redraw(); });
  fg.addEventListener('pointermove', (e) => { if (!current) return; current.push(pos(e)); redraw(); });
  const end = () => { if (current) { current = null; onStroke?.(); } };
  fg.addEventListener('pointerup', end);
  fg.addEventListener('pointercancel', end);

  return {
    el: wrap,
    clear() { strokes = []; redraw(); },
    undo() { strokes.pop(); redraw(); },
    hasInk() { return strokes.length > 0; },
    reveal(color = 'rgba(46, 160, 67, .35)') { paintGuide(true, color); },
    score() {
      const target = glyphMask(glyph, GRID);
      const c = document.createElement('canvas');
      c.width = c.height = GRID;
      const g = c.getContext('2d');
      g.scale(GRID / css, GRID / css);
      g.lineCap = g.lineJoin = 'round';
      g.lineWidth = 11;
      g.strokeStyle = '#000';
      for (const s of strokes) { g.beginPath(); s.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); if (s.length === 1) g.lineTo(s[0][0] + 0.1, s[0][1]); g.stroke(); }
      const d = g.getImageData(0, 0, GRID, GRID).data;
      const ink = new Uint8Array(GRID * GRID);
      for (let i = 0; i < ink.length; i++) ink[i] = d[i * 4 + 3] > 60 ? 1 : 0;
      return scoreInk(target, ink);
    },
  };
}
