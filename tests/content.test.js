// Validates course content and that every lesson builds without errors.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { COURSES, ARABIC_SCRIPT, ITALIAN_SOUNDS } from '../js/data/index.js';
import { buildLesson, buildReview, buildScriptLesson, buildSoundLesson, buildListeningDrill, buildSpeakingDrill } from '../js/session.js';
import { seededRng, isArabic, stripArabicDiacritics } from '../js/text.js';

const RENDERED_TYPES = new Set(['intro', 'listen_choose', 'read_choose', 'choose_target', 'match', 'build', 'type', 'speak', 'dialogue',
  'roleplay', 'roleplay_text', 'letter_intro', 'vowel_intro', 'trace', 'write_memory', 'letter_listen', 'letter_name', 'letter_forms',
  'read_syllable', 'read_word', 'spot_letter', 'script_dictation', 'rule', 'minimal_pair']);

for (const lang of ['ar', 'it']) {
  const c = COURSES[lang];

  test(`${lang}: units are complete and well-formed`, () => {
    assert.equal(c.units.length, 12);
    const ids = new Set();
    for (const u of c.units) {
      assert.ok(u.title && u.subtitle && u.goal && u.icon, `${u.id} metadata`);
      assert.ok(u.wordIds.length >= 10, `${u.id} has enough words`);
      assert.ok(u.phraseIds.length >= 5, `${u.id} has enough phrases`);
      assert.ok(u.grammar.title && u.grammar.body.length > 100, `${u.id} grammar`);
      assert.ok(u.dialogue.lines.length >= 5, `${u.id} dialogue`);
      assert.ok(u.dialogue.questions.length >= 2, `${u.id} questions`);
      for (const q of u.dialogue.questions) assert.ok(q.a >= 0 && q.a < q.options.length);
      assert.ok(u.roleplay.turns.length >= 3, `${u.id} roleplay`);
      for (const t of u.roleplay.turns) {
        assert.ok(t.partner.t && t.partner.en && t.cue && t.answers.length, `${u.id} roleplay turn`);
        if (lang === 'ar') {
          assert.ok(t.partner.tr && t.answerTr, `${u.id} roleplay translit`);
          for (const a of t.answers) assert.ok(isArabic(a), `${u.id} answer is Arabic: ${a}`);
        }
      }
      for (const id of [...u.wordIds, ...u.phraseIds]) {
        const it = c.items[id];
        assert.ok(it.t && it.en, `${id} text`);
        if (lang === 'ar') {
          assert.ok(it.tr, `${id} translit`);
          assert.ok(isArabic(it.t), `${id} is Arabic`);
        }
        ids.add(id);
      }
      for (const l of u.dialogue.lines) if (lang === 'ar') assert.ok(l.tr, `${u.id} dialogue translit`);
    }
    assert.ok(ids.size >= 200, `${lang} has ${ids.size} items`);
    if (lang === 'ar') {
      // Vowel marks wherever short vowels occur. Words made only of consonants and
      // long vowels (شاي shāy, باص bāṣ) are fully readable without them.
      const items = [...ids].map((id) => c.items[id]);
      const vowelled = items.filter((it) => stripArabicDiacritics(it.t) !== it.t).length;
      assert.ok(vowelled / items.length >= 0.9, `only ${vowelled}/${items.length} Arabic items are vowelled`);
      for (const it of items) {
        if (it.msa) assert.ok(isArabic(it.msa.t) && it.msa.tr, `${it.id} standard form`);
        assert.ok(it.alt.includes(it.msa?.t ?? it.alt[0]) || !it.msa, `${it.id} accepts the standard form`);
      }
      assert.ok(items.filter((it) => it.msa).length >= 120, 'most items show a different standard Arabic form');
    }
  });

  test(`${lang}: every lesson builds with valid exercises (with and without speaking)`, () => {
    for (const speaking of [true, false]) {
      for (const u of c.units) {
        for (let li = 0; li < u.lessons.length; li++) {
          const ex = buildLesson(c, u, li, { rng: seededRng(li + u.index * 10), speaking, reviewIds: Object.keys(c.items).slice(0, 3) });
          assert.ok(ex.length >= 4, `${u.id}.${li} length ${ex.length}`);
          for (const e of ex) {
            assert.ok(RENDERED_TYPES.has(e.type), `unknown type ${e.type}`);
            if (!speaking) assert.notEqual(e.type, 'speak');
            if (e.options) {
              assert.ok(e.options.some((o) => o.id === e.item.id), 'answer among options');
              assert.equal(new Set(e.options.map((o) => o.id)).size, e.options.length, 'options unique');
            }
            if (e.type === 'build') {
              const tiles = [...e.tiles];
              for (const w of e.item.t.split(/\s+/)) {
                const i = tiles.indexOf(w);
                assert.ok(i >= 0, `tile ${w} available for "${e.item.t}"`);
                tiles.splice(i, 1);
              }
            }
          }
        }
      }
    }
  });

  test(`${lang}: reviews and drills build`, () => {
    const ids = Object.keys(c.items).slice(0, 20);
    assert.equal(buildReview(c, ids, {}, { rng: seededRng(3) }).length, 20);
    assert.equal(buildListeningDrill(c, ids, { rng: seededRng(4) }).length, 20);
    assert.equal(buildSpeakingDrill(c, ids, { rng: seededRng(5) }).length, 20);
  });
}

test('Arabic script track covers all letters and words are decodable', () => {
  const taught = ARABIC_SCRIPT.GROUPS.flatMap((g) => g.letters);
  assert.deepEqual(new Set(taught), new Set(Object.keys(ARABIC_SCRIPT.LETTERS)));
  assert.equal(new Set(taught).size, taught.length, 'no letter taught twice');
  const extra = new Set(['أ', 'إ', 'آ', 'ؤ', 'ئ', ' ', 'ـ']);
  ARABIC_SCRIPT.GROUPS.forEach((g, gi) => {
    const known = new Set(ARABIC_SCRIPT.GROUPS.slice(0, gi + 1).flatMap((x) => x.letters));
    for (const [w] of [...g.words, ...g.syllables]) {
      for (const ch of stripArabicDiacritics(w)) {
        if (extra.has(ch) && gi === ARABIC_SCRIPT.GROUPS.length - 1) continue;
        assert.ok(known.has(ch), `group ${g.id}: "${w}" uses untaught letter ${ch}`);
      }
    }
  });
});

test('Arabic script lessons build', () => {
  ARABIC_SCRIPT.GROUPS.forEach((g, gi) => {
    const ex = buildScriptLesson(ARABIC_SCRIPT, gi, { rng: seededRng(gi) });
    assert.ok(ex.length > 8);
    for (const e of ex) assert.ok(RENDERED_TYPES.has(e.type), e.type);
    for (const e of ex.filter((x) => x.type === 'letter_listen' || x.type === 'letter_name')) assert.ok(e.options.includes(e.letter));
  });
});

test('Italian sound lessons build', () => {
  ITALIAN_SOUNDS.GROUPS.forEach((g, gi) => {
    const ex = buildSoundLesson(ITALIAN_SOUNDS, gi, { rng: seededRng(gi) });
    assert.equal(ex[0].type, 'rule');
    assert.ok(ex.some((e) => e.type === 'minimal_pair'));
    assert.ok(!buildSoundLesson(ITALIAN_SOUNDS, gi, { speaking: false }).some((e) => e.type === 'speak'));
  });
});

test('lessons rebuild identically from the same seed (needed to resume a saved lesson)', () => {
  const same = (build) => assert.equal(JSON.stringify(build(seededRng(1234))), JSON.stringify(build(seededRng(1234))));
  same((rng) => buildScriptLesson(ARABIC_SCRIPT, 3, { rng }));
  same((rng) => buildSoundLesson(ITALIAN_SOUNDS, 2, { rng }));
  for (const lang of ['ar', 'it']) {
    const c = COURSES[lang];
    for (let li = 0; li < 4; li++) same((rng) => buildLesson(c, c.units[4], li, { rng, reviewIds: [] }));
  }
});
