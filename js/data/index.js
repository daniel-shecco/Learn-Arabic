// Normalises raw course data into a uniform shape used by the app.
import arUnits from './ar/units.js';
import itUnits from './it/units.js';
import { LETTERS, VOWELS, SCRIPT_GROUPS } from './ar/script.js';
import { SOUND_GROUPS } from './it/sounds.js';
import { normalize } from '../text.js';

export const LANGS = {
  ar: {
    code: 'ar', name: 'Arabic', native: 'العربية', flag: '🇸🇦', dir: 'rtl',
    tts: ['ar-SA', 'ar-EG', 'ar-AE', 'ar'], asr: 'ar-SA',
    hasTranslit: true, scriptName: 'Alphabet', scriptIcon: 'أ',
    variety: 'Modern Standard Arabic (فُصْحَى) — understood across the whole Arab world.',
  },
  it: {
    code: 'it', name: 'Italian', native: 'Italiano', flag: '🇮🇹', dir: 'ltr',
    tts: ['it-IT', 'it'], asr: 'it-IT',
    hasTranslit: false, scriptName: 'Sounds & Spelling', scriptIcon: 'Àà',
    variety: 'Standard Italian.',
  },
};

export function itemId(lang, text) {
  return `${lang}:${normalize(text, lang).replace(/\s+/g, '_')}`;
}

function toItem(lang, unitId, kind, tuple) {
  if (lang === 'ar') {
    const [t, tr, en, e, n, alt] = tuple;
    return { id: itemId(lang, t), lang, unit: unitId, kind, t, tr, en, e: e || '', n: n || '', alt: alt || [] };
  }
  const [t, en, e, n, alt] = tuple;
  return { id: itemId(lang, t), lang, unit: unitId, kind, t, tr: '', en, e: e || '', n: n || '', alt: alt || [] };
}

function buildCourse(lang, rawUnits) {
  const items = {};
  const units = rawUnits.map((u, idx) => {
    const words = u.words.map((w) => toItem(lang, u.id, 'word', w));
    const phrases = u.phrases.map((p) => toItem(lang, u.id, 'phrase', p));
    for (const it of [...words, ...phrases]) if (!items[it.id]) items[it.id] = it;
    const lines = u.dialogue.lines.map((l) =>
      lang === 'ar' ? { who: l[0], t: l[1], tr: l[2], en: l[3] } : { who: l[0], t: l[1], tr: '', en: l[2] });
    const turns = u.roleplay.turns.map((t) => ({
      partner: lang === 'ar' ? { t: t.p[0], tr: t.p[1], en: t.p[2] } : { t: t.p[0], tr: '', en: t.p[1] },
      cue: t.cue, answers: t.a, answerTr: t.atr || '',
    }));
    return {
      ...u, index: idx, lang,
      wordIds: words.map((w) => w.id),
      phraseIds: phrases.map((p) => p.id),
      dialogue: { ...u.dialogue, lines },
      roleplay: { ...u.roleplay, turns },
      // Each unit = 4 lessons in a deliberate order (see docs/PEDAGOGY.md).
      lessons: [
        { id: `${u.id}.1`, kind: 'words', title: 'New words', icon: '🧩', itemIds: words.slice(0, Math.ceil(words.length / 2)).map((w) => w.id) },
        { id: `${u.id}.2`, kind: 'words', title: 'More words', icon: '🧱', itemIds: words.slice(Math.ceil(words.length / 2)).map((w) => w.id) },
        { id: `${u.id}.3`, kind: 'phrases', title: 'Key phrases', icon: '💬', itemIds: phrases.map((p) => p.id) },
        { id: `${u.id}.4`, kind: 'conversation', title: 'Conversation', icon: '🎭', itemIds: phrases.map((p) => p.id) },
      ],
    };
  });
  return { lang, meta: LANGS[lang], units, items };
}

export const COURSES = {
  ar: buildCourse('ar', arUnits),
  it: buildCourse('it', itUnits),
};

// Script / sound tracks
export const ARABIC_SCRIPT = { LETTERS, VOWELS, GROUPS: SCRIPT_GROUPS };
export const ITALIAN_SOUNDS = { GROUPS: SOUND_GROUPS };

export function getItem(lang, id) {
  return COURSES[lang].items[id];
}
