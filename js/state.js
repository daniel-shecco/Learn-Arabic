// Persistent app state (localStorage), with migration-safe defaults.
import { newCard, review } from './srs.js';

const KEY = 'lingua-path.v1';

export function today(d = new Date()) {
  const z = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
}

export function dayDiff(a, b) {
  const pa = new Date(a + 'T00:00:00');
  const pb = new Date(b + 'T00:00:00');
  return Math.round((pb - pa) / 86400000);
}

function langDefaults() {
  return { lessons: {}, script: {}, cards: {}, xp: 0, spoken: 0, started: null };
}

export function defaults() {
  return {
    version: 1,
    activeLang: null,
    settings: {
      dailyGoal: 50,
      translit: 'auto', // auto | always | tap | never
      rate: 0.9,
      sfx: true,
      speaking: true,
      unlockAll: false,
      voices: {},
      apiKey: '',
      aiModel: 'claude-opus-5-5',
      theme: 'auto',
    },
    profile: {
      xp: 0, streak: 0, bestStreak: 0, lastDay: null, freezes: 0,
      xpByDay: {}, achievements: {},
      stats: { lessons: 0, perfect: 0, spoken: 0, typed: 0, traced: 0, roleplays: 0, reviews: 0, aiTurns: 0 },
    },
    langs: { ar: langDefaults(), it: langDefaults() },
  };
}

function merge(base, saved) {
  if (!saved || typeof saved !== 'object') return base;
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const k of Object.keys(saved)) {
    if (base[k] && typeof base[k] === 'object' && !Array.isArray(base[k]) && saved[k] && typeof saved[k] === 'object') {
      out[k] = merge(base[k], saved[k]);
    } else {
      out[k] = saved[k];
    }
  }
  return out;
}

export function createStore(storage = globalThis.localStorage) {
  let state = defaults();
  try {
    const raw = storage && storage.getItem(KEY);
    if (raw) state = merge(defaults(), JSON.parse(raw));
  } catch { /* corrupt or unavailable storage: start fresh */ }

  const listeners = new Set();
  const save = () => {
    try { storage && storage.setItem(KEY, JSON.stringify(state)); } catch { /* quota / private mode */ }
    listeners.forEach((fn) => fn(state));
  };

  const api = {
    get state() { return state; },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
    save,
    update(fn) { fn(state); save(); },
    lang(code = state.activeLang) { return state.langs[code]; },

    /** Record an answer for an SRS item. */
    grade(lang, itemId, quality, now = Date.now()) {
      if (!itemId) return;
      const L = state.langs[lang];
      L.cards[itemId] = review(L.cards[itemId] || newCard(now), quality, now);
    },

    /** Mark an item as seen (introduced) without grading it. */
    touch(lang, itemId, now = Date.now()) {
      const L = state.langs[lang];
      if (itemId && !L.cards[itemId]) L.cards[itemId] = { ...newCard(now) };
    },

    /** Add XP; update daily log and streak. Returns { streakExtended }. */
    addXp(amount, lang = state.activeLang, now = new Date()) {
      const p = state.profile;
      const d = today(now);
      p.xp += amount;
      p.xpByDay[d] = (p.xpByDay[d] || 0) + amount;
      if (lang) state.langs[lang].xp += amount;
      let streakExtended = false;
      if (p.lastDay !== d) {
        const gap = p.lastDay ? dayDiff(p.lastDay, d) : null;
        if (gap === 1) p.streak += 1;
        else if (gap === 2 && p.freezes > 0) { p.freezes -= 1; p.streak += 1; }
        else p.streak = 1;
        p.lastDay = d;
        streakExtended = true;
        if (p.streak > 0 && p.streak % 7 === 0) p.freezes = Math.min(2, p.freezes + 1);
        p.bestStreak = Math.max(p.bestStreak, p.streak);
      }
      return { streakExtended };
    },

    /** Streak as displayed today (0 if broken). */
    liveStreak(now = new Date()) {
      const p = state.profile;
      if (!p.lastDay) return 0;
      const gap = dayDiff(p.lastDay, today(now));
      if (gap <= 1) return p.streak;
      if (gap === 2 && p.freezes > 0) return p.streak;
      return 0;
    },

    export() { return JSON.stringify(state, null, 2); },
    import(json) {
      const parsed = JSON.parse(json);
      if (!parsed || parsed.version !== 1) throw new Error('Not a valid backup file');
      state = merge(defaults(), parsed);
      save();
    },
    reset() { state = defaults(); save(); },
  };
  return api;
}
