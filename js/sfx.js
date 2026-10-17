// Tiny synthesised sound effects (no audio files) and confetti.
import { plugin } from './native.js';

let ctx;
let enabled = true;

// Vibration feedback in the native app.
const Haptics = plugin('Haptics');
function buzz(type) {
  if (!Haptics || !enabled) return;
  Promise.resolve(type === 'tap' ? Haptics.impact({ style: 'LIGHT' }) : Haptics.notification({ type })).catch(() => {});
}

export function setSfx(on) { enabled = on; }

function tone(freq, start, dur, type = 'sine', gain = 0.12) {
  ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(0, ctx.currentTime + start);
  g.gain.linearRampToValueAtTime(gain, ctx.currentTime + start + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + dur);
  o.connect(g).connect(ctx.destination);
  o.start(ctx.currentTime + start);
  o.stop(ctx.currentTime + start + dur + 0.05);
}

export const sfx = {
  correct() { buzz('SUCCESS'); if (!enabled) return; try { tone(660, 0, 0.12); tone(880, 0.09, 0.18); } catch { /* audio blocked */ } },
  wrong() { buzz('ERROR'); if (!enabled) return; try { tone(220, 0, 0.18, 'triangle'); tone(180, 0.12, 0.22, 'triangle'); } catch { /* audio blocked */ } },
  tap() { buzz('tap'); if (!enabled) return; try { tone(520, 0, 0.05, 'sine', 0.05); } catch { /* audio blocked */ } },
  complete() { if (!enabled) return; try { [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.11, 0.25)); } catch { /* audio blocked */ } },
  combo() { if (!enabled) return; try { tone(988, 0, 0.08); tone(1318, 0.07, 0.12); } catch { /* audio blocked */ } },
};

export function confetti(durationMs = 2200) {
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
  const c = document.createElement('canvas');
  c.className = 'confetti';
  document.body.appendChild(c);
  const dpr = window.devicePixelRatio || 1;
  c.width = innerWidth * dpr; c.height = innerHeight * dpr;
  const g = c.getContext('2d');
  g.scale(dpr, dpr);
  const colors = ['#ff6b6b', '#ffd93d', '#6bcB77', '#4d96ff', '#c77dff', '#ff9f1c'];
  const parts = Array.from({ length: 140 }, () => ({
    x: innerWidth / 2 + (Math.random() - 0.5) * 120, y: innerHeight / 3,
    vx: (Math.random() - 0.5) * 12, vy: Math.random() * -12 - 4,
    r: Math.random() * 6 + 4, c: colors[Math.floor(Math.random() * colors.length)],
    a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.3,
  }));
  const t0 = performance.now();
  (function frame(t) {
    g.clearRect(0, 0, innerWidth, innerHeight);
    for (const p of parts) {
      p.vy += 0.35; p.x += p.vx; p.y += p.vy; p.a += p.va;
      g.save(); g.translate(p.x, p.y); g.rotate(p.a); g.fillStyle = p.c;
      g.fillRect(-p.r / 2, -p.r / 4, p.r, p.r / 2); g.restore();
    }
    if (t - t0 < durationMs) requestAnimationFrame(frame); else c.remove();
  })(t0);
}
