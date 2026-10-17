// Builds exercise sequences for lessons, reviews and script practice.
// Pure: depends only on data + rng, so it is unit-tested.
//
// Ordering follows a receptive → productive progression for each item:
//   1. meet it (intro: hear + see + say)
//   2. recognise it (listen/read and choose meaning)
//   3. recall it (choose/build the target form)
//   4. produce it (type it, say it from English)
// New items are introduced in small batches (2–3) and interleaved with
// practice of earlier ones, and a few already-learned items are mixed in.

import { shuffle, sample, tokenize, seededRng } from './text.js';
import { masteryLevel } from './srs.js';

const MAX_OPTIONS = 4;

function distractors(item, pool, n, rng, key = 'en') {
  const seen = new Set([item[key].toLowerCase()]);
  const sameKind = pool.filter((p) => p.id !== item.id && p.kind === item.kind);
  const others = pool.filter((p) => p.id !== item.id && p.kind !== item.kind);
  const out = [];
  for (const p of [...shuffle(sameKind, rng), ...shuffle(others, rng)]) {
    const k = p[key].toLowerCase();
    if (seen.has(k)) continue;
    seen.add(k);
    out.push(p);
    if (out.length >= n) break;
  }
  return out;
}

function options(item, pool, rng, key = 'en') {
  return shuffle([item, ...distractors(item, pool, MAX_OPTIONS - 1, rng, key)], rng);
}

/** Tiles for the sentence builder: the words of the answer + a few distractor words. */
export function buildTiles(item, pool, rng = Math.random, extra = 3) {
  const words = tokenize(item.t);
  const clean = (w) => w.replace(/[.,!?؟،]/g, '');
  const have = new Set(words.map(clean));
  const extras = [];
  for (const p of shuffle(pool, rng)) {
    for (const w of tokenize(p.t)) {
      const c = clean(w);
      if (!have.has(c) && c.length > 1) { have.add(c); extras.push(c); }
      if (extras.length >= extra) break;
    }
    if (extras.length >= extra) break;
  }
  return shuffle([...words, ...extras], rng);
}

function isShort(item) {
  return item.t.replace(/[ً-ْ]/g, '').length <= 14;
}

function practiceFor(item, stage, pool, rng, opts) {
  const speakOK = opts.speaking !== false;
  const multiWord = tokenize(item.t).length > 1;
  switch (stage) {
    case 'recognise':
      return rng() < 0.5
        ? { type: 'listen_choose', item, options: options(item, pool, rng) }
        : { type: 'read_choose', item, options: options(item, pool, rng) };
    case 'recall':
      if (multiWord && tokenize(item.t).length <= 9) return { type: 'build', mode: rng() < 0.5 ? 'translate' : 'listen', item, tiles: buildTiles(item, pool, rng) };
      return { type: 'choose_target', item, options: options(item, pool, rng, 't') };
    case 'produce': {
      const choices = [];
      if (speakOK) choices.push({ type: 'speak', mode: 'translate', item });
      if (isShort(item)) choices.push({ type: 'type', mode: rng() < 0.5 ? 'translate' : 'dictation', item });
      if (!choices.length) choices.push({ type: 'build', mode: 'translate', item, tiles: buildTiles(item, pool, rng) });
      return choices[Math.floor(rng() * choices.length)];
    }
    case 'shadow':
      return speakOK ? { type: 'speak', mode: 'repeat', item } : { type: 'listen_choose', item, options: options(item, pool, rng) };
    default:
      throw new Error(`unknown stage ${stage}`);
  }
}

/**
 * @param {object} course   COURSES[lang]
 * @param {object} unit     unit object
 * @param {number} lessonIdx 0..3
 * @param {object} opts     { rng, speaking, reviewIds: [] }
 */
export function buildLesson(course, unit, lessonIdx, opts = {}) {
  const rng = opts.rng || Math.random;
  const lesson = unit.lessons[lessonIdx];
  const pool = Object.values(course.items);
  const items = lesson.itemIds.map((id) => course.items[id]);
  const reviewItems = (opts.reviewIds || []).map((id) => course.items[id]).filter(Boolean).filter((it) => !lesson.itemIds.includes(it.id));
  const ex = [];

  if (lesson.kind === 'conversation') {
    ex.push({ type: 'dialogue', unit });
    const lines = sample(unit.dialogue.lines.filter((l) => tokenize(l.t).length <= 10), 2, rng);
    for (const l of lines) {
      const item = { id: null, lang: course.lang, kind: 'line', t: l.t, tr: l.tr, en: l.en, e: '', n: '', alt: [] };
      ex.push(opts.speaking !== false ? { type: 'speak', mode: 'repeat', item } : { type: 'build', mode: 'listen', item, tiles: buildTiles(item, pool, rng) });
    }
    for (const it of sample(items, 2, rng)) ex.push(practiceFor(it, 'recall', pool, rng, opts));
    ex.push({ type: opts.speaking !== false ? 'roleplay' : 'roleplay_text', unit });
    return ex;
  }

  // Introduce in batches of 2–3 with immediate recognition practice.
  const batches = [];
  for (let i = 0; i < items.length; i += 3) batches.push(items.slice(i, i + 3));
  const introduced = [];
  for (const batch of batches) {
    for (const it of batch) ex.push({ type: 'intro', item: it });
    for (const it of shuffle(batch, rng)) ex.push(practiceFor(it, 'recognise', pool, rng, opts));
    introduced.push(...batch);
    if (introduced.length >= 4 && introduced.length - batch.length > 0) {
      // Interleave a recall item from an earlier batch.
      const prev = introduced[Math.floor(rng() * (introduced.length - batch.length))];
      ex.push(practiceFor(prev, 'recall', pool, rng, opts));
    }
  }
  if (items.length >= 4 && lesson.kind === 'words') {
    ex.push({ type: 'match', pairs: sample(items, Math.min(5, items.length), rng) });
  }
  for (const it of shuffle(items, rng)) ex.push(practiceFor(it, 'recall', pool, rng, opts));
  for (const it of reviewItems.slice(0, 3)) ex.push(practiceFor(it, 'recall', pool, rng, opts));
  if (lesson.kind === 'phrases') {
    for (const it of sample(items, 3, rng)) ex.push(practiceFor(it, 'shadow', pool, rng, opts));
  }
  for (const it of shuffle(items, rng)) ex.push(practiceFor(it, 'produce', pool, rng, opts));
  return ex;
}

/** Review session from SRS: exercise difficulty scales with item mastery. */
export function buildReview(course, ids, cards, opts = {}) {
  const rng = opts.rng || Math.random;
  const pool = Object.values(course.items);
  const ex = [];
  for (const id of ids) {
    const item = course.items[id];
    if (!item) continue;
    const lvl = masteryLevel(cards[id]);
    const stage = lvl <= 1 ? (rng() < 0.6 ? 'recognise' : 'recall') : lvl <= 3 ? (rng() < 0.5 ? 'recall' : 'produce') : 'produce';
    ex.push(practiceFor(item, stage, pool, rng, opts));
  }
  return ex;
}

/** Speaking-only drill: shadowing then translation-to-speech. */
export function buildSpeakingDrill(course, ids, opts = {}) {
  const rng = opts.rng || Math.random;
  const items = ids.map((id) => course.items[id]).filter(Boolean);
  const ex = [];
  for (const it of shuffle(items, rng)) ex.push({ type: 'speak', mode: rng() < 0.4 ? 'repeat' : 'translate', item: it });
  return ex;
}

/** Listening-only drill. */
export function buildListeningDrill(course, ids, opts = {}) {
  const rng = opts.rng || Math.random;
  const pool = Object.values(course.items);
  return ids.map((id) => course.items[id]).filter(Boolean).map((it) => {
    const r = rng();
    if (r < 0.4) return { type: 'listen_choose', item: it, options: options(it, pool, rng) };
    if (r < 0.7 && tokenize(it.t).length > 1) return { type: 'build', mode: 'listen', item: it, tiles: buildTiles(it, pool, rng) };
    return { type: 'type', mode: 'dictation', item: it };
  });
}

// ---------- Arabic script ----------

/**
 * @param {object} script  ARABIC_SCRIPT
 * @param {number} gi      group index
 */
export function buildScriptLesson(script, gi, opts = {}) {
  const rng = opts.rng || Math.random;
  const g = script.GROUPS[gi];
  const known = script.GROUPS.slice(0, gi + 1).flatMap((x) => x.letters);
  const letterPool = Object.keys(script.LETTERS);
  const ex = [];

  for (const ch of g.letters) {
    ex.push({ type: 'letter_intro', letter: ch });
    ex.push({ type: 'trace', letter: ch, form: 'isolated' });
  }
  for (const vid of g.vowels) ex.push({ type: 'vowel_intro', vowel: script.VOWELS.find((v) => v.id === vid) });

  // Recognition: sound -> letter, letter -> name
  for (const ch of shuffle(g.letters, rng)) {
    const opts4 = shuffle([ch, ...sample(known.filter((k) => k !== ch), 2, rng), ...sample(letterPool.filter((k) => !known.includes(k)), 1, rng)], rng).slice(0, 4);
    ex.push({ type: 'letter_listen', letter: ch, options: opts4 });
    ex.push({ type: 'letter_name', letter: ch, options: shuffle([ch, ...sample(letterPool.filter((k) => k !== ch), 3, rng)], rng) });
  }
  // Positional forms (skip letters that only appear standalone/final)
  for (const ch of g.letters.filter((c) => !script.LETTERS[c].standalone && !script.LETTERS[c].final)) {
    ex.push({ type: 'letter_forms', letter: ch, form: ['initial', 'medial', 'final'][Math.floor(rng() * 3)] });
  }
  // Decoding: syllables and words
  const sylPool = script.GROUPS.slice(0, gi + 1).flatMap((x) => x.syllables);
  for (const s of sample(g.syllables, Math.min(4, g.syllables.length), rng)) {
    ex.push({ type: 'read_syllable', syl: s, options: shuffle([s, ...sample(sylPool.filter((x) => x[1] !== s[1]), 3, rng)], rng) });
  }
  const wordPool = script.GROUPS.slice(0, gi + 1).flatMap((x) => x.words);
  for (const w of shuffle(g.words, rng)) {
    ex.push({ type: 'read_word', word: w, options: shuffle([w, ...sample(wordPool.filter((x) => x[1] !== w[1]), 3, rng)], rng) });
  }
  // Find the letter inside a word
  for (const ch of g.letters) {
    const host = wordPool.find((w) => w[0].includes(ch));
    if (host) ex.push({ type: 'spot_letter', letter: ch, word: host });
  }
  // Writing: from memory, then a word dictation with the keyboard
  for (const ch of sample(g.letters, Math.min(2, g.letters.length), rng)) ex.push({ type: 'write_memory', letter: ch });
  for (const w of sample(g.words, Math.min(2, g.words.length), rng)) ex.push({ type: 'script_dictation', word: w });
  // Say it
  if (opts.speaking !== false) for (const w of sample(g.words, 1, rng)) ex.push({ type: 'speak', mode: 'repeat', item: { id: null, lang: 'ar', kind: 'line', t: w[0], tr: w[1], en: w[2], e: '', n: '', alt: [] } });
  return ex;
}

// ---------- Italian sounds ----------

export function buildSoundLesson(sounds, gi, opts = {}) {
  const rng = opts.rng || Math.random;
  const g = sounds.GROUPS[gi];
  const ex = [{ type: 'rule', group: g }];
  for (const e of sample(g.examples, 4, rng)) {
    ex.push({ type: 'speak', mode: 'repeat', item: { id: null, lang: 'it', kind: 'line', t: e[0], tr: '', en: e[1], e: '', n: '', alt: [] } });
  }
  for (const p of shuffle(g.pairs, rng)) {
    const target = p[Math.floor(rng() * 2)];
    ex.push({ type: 'minimal_pair', pair: p, target });
  }
  for (const e of sample(g.examples, 4, rng)) {
    ex.push({ type: 'type', mode: 'dictation', item: { id: null, lang: 'it', kind: 'line', t: e[0], tr: '', en: e[1], e: '', n: '', alt: [] } });
  }
  if (opts.speaking === false) return ex.filter((x) => x.type !== 'speak');
  return ex;
}

export { seededRng };
