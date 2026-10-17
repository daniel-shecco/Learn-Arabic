// Text utilities: normalisation, tokenisation and answer checking.
// Pure functions only — safe to unit-test in Node.

// Arabic short vowels, tanween, shadda, sukun, superscript alif, Quranic marks.
const AR_DIACRITICS = /[ؐ-ًؚ-ٰٟۖ-ۭ]/g;
const TATWEEL = /ـ/g;
const PUNCT = /[.,!?;:¿¡"“”«»()\[\]{}…\-–—،؟؛]/g;
const ZW = /[‌‍‎‏]/g;

export function isArabic(str) {
  return /[؀-ۿ]/.test(str || '');
}

export function stripArabicDiacritics(str) {
  return (str || '').replace(AR_DIACRITICS, '').replace(TATWEEL, '');
}

/** Lenient Arabic normalisation used for comparing learner input. */
export function normalizeArabic(str) {
  return stripArabicDiacritics(str)
    .replace(ZW, '')
    .replace(/[أإآٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[ؤئ]/g, 'ء')
    .replace(PUNCT, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function stripLatinAccents(str) {
  return (str || '').normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
}

/** Normalise Latin-script text; accents are kept unless `keepAccents` is false. */
export function normalizeLatin(str, { keepAccents = true } = {}) {
  let s = (str || '').toLowerCase().normalize('NFC')
    .replace(/[’‘`´]/g, "'")
    .replace(ZW, '')
    .replace(PUNCT, ' ');
  if (!keepAccents) s = stripLatinAccents(s);
  return s.replace(/\s+/g, ' ').trim();
}

export function normalize(str, lang) {
  return lang === 'ar' ? normalizeArabic(str) : normalizeLatin(str);
}

export function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
    }
    prev = cur;
  }
  return prev[b.length];
}

/** 0..1 similarity based on edit distance. */
export function similarity(a, b) {
  if (!a && !b) return 1;
  const d = levenshtein(a, b);
  return 1 - d / Math.max(a.length, b.length);
}

/**
 * Check a typed answer against one or more accepted answers.
 * Returns { result: 'correct' | 'accent' | 'typo' | 'wrong', best, score }.
 *  - correct: exact after normalisation
 *  - accent:  only accents differ (Italian) — accepted, with a reminder
 *  - typo:    one small slip on a longer answer — accepted, with a reminder
 */
export function checkTyped(input, accepted, lang) {
  const answers = Array.isArray(accepted) ? accepted : [accepted];
  const inp = normalize(input, lang);
  let best = answers[0];
  let bestScore = -1;
  for (const ans of answers) {
    const target = normalize(ans, lang);
    if (inp === target) return { result: 'correct', best: ans, score: 1 };
    const sc = similarity(inp, target);
    if (sc > bestScore) { bestScore = sc; best = ans; }
  }
  if (lang !== 'ar') {
    for (const ans of answers) {
      if (normalizeLatin(input, { keepAccents: false }) === normalizeLatin(ans, { keepAccents: false })) {
        return { result: 'accent', best: ans, score: 0.95 };
      }
    }
  }
  const target = normalize(best, lang);
  if (target.length >= 6 && levenshtein(inp, target) === 1) {
    return { result: 'typo', best, score: bestScore };
  }
  return { result: 'wrong', best, score: Math.max(0, bestScore) };
}

/** Arabic comparison for speech: Levantine ق (ʾ) and hamza/alif spellings match. */
function speechNormArabic(s) {
  return normalizeArabic(s).replace(/[قء]/g, 'ا');
}

/**
 * Score a speech-recognition transcript against target sentence(s).
 * Recognisers drop accents/diacritics and punctuation, so compare leniently.
 */
export function scoreSpeech(transcripts, accepted, lang) {
  const heard = (Array.isArray(transcripts) ? transcripts : [transcripts]).filter(Boolean);
  const answers = Array.isArray(accepted) ? accepted : [accepted];
  const norm = (s) => lang === 'ar' ? speechNormArabic(s) : normalizeLatin(s, { keepAccents: false });
  let best = { score: 0, heard: heard[0] || '', target: answers[0] };
  for (const h of heard) {
    for (const a of answers) {
      const hn = norm(h).replace(/\s/g, '');
      const an = norm(a).replace(/\s/g, '');
      const sc = similarity(hn, an);
      if (sc > best.score) best = { score: sc, heard: h, target: a };
    }
  }
  return { ...best, wordDiff: wordDiff(best.heard, best.target, lang) };
}

/** Mark each target word as heard or missed (for feedback chips). */
export function wordDiff(heard, target, lang) {
  const norm = (s) => lang === 'ar' ? speechNormArabic(s) : normalizeLatin(s, { keepAccents: false });
  const hw = norm(heard).split(' ').filter(Boolean);
  return tokenize(target).map((w) => {
    const n = norm(w);
    const ok = !n || hw.some((x) => x === n || (n.length > 3 && similarity(x, n) >= 0.75));
    return { word: w, ok };
  });
}

/** Split a sentence into word tiles, keeping punctuation attached. */
export function tokenize(str) {
  return (str || '').split(/\s+/).filter(Boolean);
}

/** Compare a tile-built answer with the target, ignoring punctuation/case/diacritics. */
export function sameSentence(a, b, lang) {
  const n = (s) => (lang === 'ar' ? normalizeArabic(s) : normalizeLatin(s, { keepAccents: false }));
  return n(a) === n(b);
}

export function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sample(arr, n, rng = Math.random) {
  return shuffle(arr, rng).slice(0, n);
}

/** Small deterministic PRNG (mulberry32) for reproducible tests. */
export function seededRng(seed = 1) {
  let t = seed >>> 0;
  return function () {
    t += 0x6d2b79f5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

// Arabic contextual forms via zero-width joiner.
const ZWJ = '‍';
export function arabicForms(letter, connectsLeft = true) {
  return {
    isolated: letter,
    initial: connectsLeft ? letter + ZWJ : letter,
    medial: connectsLeft ? ZWJ + letter + ZWJ : ZWJ + letter,
    final: ZWJ + letter,
  };
}

export function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
