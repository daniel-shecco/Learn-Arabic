import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeArabic, checkTyped, scoreSpeech, sameSentence, levenshtein, arabicForms, seededRng } from '../js/text.js';
import { newCard, review, GRADE, DAY, isDue, masteryLevel, dueQueue, retrievability } from '../js/srs.js';
import { createStore, today } from '../js/state.js';
import { levelFromXp, isUnitUnlocked, unitProgress } from '../js/gamify.js';
import { COURSES } from '../js/data/index.js';

test('Arabic normalisation strips harakat and unifies letter variants', () => {
  assert.equal(normalizeArabic('مَرْحَبًا'), 'مرحبا');
  assert.equal(normalizeArabic('أَنَا'), 'انا');
  assert.equal(normalizeArabic('مَدْرَسَة'), normalizeArabic('مدرسه'));
  assert.equal(normalizeArabic('لَيْلَى'), 'ليلي');
  assert.equal(normalizeArabic('مَا اسْمُكَ؟'), 'ما اسمك');
});

test('typed answers: exact, accents, typos and wrong', () => {
  assert.equal(checkTyped('Ciao!', 'ciao', 'it').result, 'correct');
  assert.equal(checkTyped('caffe', 'il caffè', 'it').result, 'wrong');
  assert.equal(checkTyped('il caffe', 'il caffè', 'it').result, 'accent');
  assert.equal(checkTyped('arrivederchi', 'arrivederci', 'it').result, 'typo');
  assert.equal(checkTyped('pane', 'pasta', 'it').result, 'wrong');
  assert.equal(checkTyped('مرحبا', 'مَرْحَبًا', 'ar').result, 'correct');
  assert.equal(checkTyped('sono anna', ['Mi chiamo Anna.', 'Sono Anna'], 'it').result, 'correct');
});

test('speech scoring is lenient with punctuation and diacritics', () => {
  const r = scoreSpeech(['come ti chiami'], 'Come ti chiami?', 'it');
  assert.ok(r.score > 0.99);
  const a = scoreSpeech(['السلام عليكم'], 'السَّلَامُ عَلَيْكُمْ', 'ar');
  assert.ok(a.score > 0.99);
  const bad = scoreSpeech(['buonasera'], 'Grazie mille', 'it');
  assert.ok(bad.score < 0.5);
  assert.deepEqual(scoreSpeech(['sto bene'], 'Sto bene, grazie.', 'it').wordDiff.map((w) => w.ok), [true, true, false]);
});

test('sentence builder comparison ignores punctuation and case', () => {
  assert.ok(sameSentence('come stai', 'Come stai?', 'it'));
  assert.ok(sameSentence('كيف حالك', 'كَيْفَ حَالُكَ؟', 'ar'));
  assert.ok(!sameSentence('stai come', 'Come stai?', 'it'));
});

test('levenshtein & arabic forms', () => {
  assert.equal(levenshtein('kitten', 'sitting'), 3);
  const f = arabicForms('ب');
  assert.equal(f.initial, 'ب‍');
  assert.equal(arabicForms('د', false).initial, 'د');
});

test('SRS: intervals grow on success and reset on failure', () => {
  const t = Date.UTC(2026, 0, 1);
  let c = review(newCard(t), GRADE.GOOD, t);
  assert.equal(c.interval, 1);
  c = review(c, GRADE.GOOD, t + DAY);
  assert.equal(c.interval, 4);
  c = review(c, GRADE.GOOD, t + 5 * DAY);
  assert.ok(c.interval >= 9);
  const failed = review(c, GRADE.AGAIN, t + 20 * DAY);
  assert.equal(failed.interval, 0);
  assert.equal(failed.lapses, 1);
  assert.ok(failed.ease < c.ease);
  assert.equal(masteryLevel(c), 3);
});

test('SRS: same-day repetition does not inflate the interval', () => {
  const t = Date.UTC(2026, 0, 1);
  let c = review(newCard(t), GRADE.GOOD, t);
  c = review(c, GRADE.GOOD, t + 60_000);
  c = review(c, GRADE.EASY, t + 120_000);
  assert.equal(c.interval, 1);
});

test('SRS: due queue orders weakest first', () => {
  const t = Date.UTC(2026, 0, 10);
  const strong = { ...review(newCard(t - 30 * DAY), GRADE.GOOD, t - 30 * DAY) };
  strong.interval = 20; strong.last = t - 21 * DAY; strong.due = t - DAY;
  const weak = review(newCard(t - 5 * DAY), GRADE.GOOD, t - 5 * DAY);
  const notDue = review(newCard(t), GRADE.GOOD, t);
  const q = dueQueue({ strong, weak, notDue }, t);
  assert.deepEqual(q, ['weak', 'strong']);
  assert.ok(!isDue(notDue, t));
  assert.ok(retrievability(weak, t) < retrievability(strong, t));
});

function memStorage() {
  const m = new Map();
  return { getItem: (k) => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) };
}

test('state: streaks, freezes and persistence', () => {
  const storage = memStorage();
  const s = createStore(storage);
  s.addXp(10, 'it', new Date(2026, 0, 1, 10));
  s.addXp(10, 'it', new Date(2026, 0, 1, 18));
  assert.equal(s.state.profile.streak, 1);
  s.addXp(10, 'it', new Date(2026, 0, 2));
  assert.equal(s.state.profile.streak, 2);
  s.addXp(10, 'it', new Date(2026, 0, 5));
  assert.equal(s.state.profile.streak, 1);
  for (let d = 6; d <= 11; d++) s.addXp(5, 'ar', new Date(2026, 0, d));
  assert.equal(s.state.profile.streak, 7);
  assert.equal(s.state.profile.freezes, 1);
  s.addXp(5, 'ar', new Date(2026, 0, 13)); // missed the 12th: freeze used
  assert.equal(s.state.profile.streak, 8);
  assert.equal(s.state.profile.freezes, 0);
  s.save();
  const reloaded = createStore(storage);
  assert.equal(reloaded.state.profile.streak, 8);
  assert.equal(reloaded.state.langs.ar.xp, 35);
  assert.equal(reloaded.state.profile.xpByDay[today(new Date(2026, 0, 1))], 20);
});

test('state: survives corrupt storage and imports backups', () => {
  const storage = memStorage();
  storage.setItem('lingua-path.v1', '{not json');
  const s = createStore(storage);
  assert.equal(s.state.profile.xp, 0);
  const backup = JSON.stringify({ version: 1, activeLang: 'ar', profile: { xp: 99 } });
  s.import(backup);
  assert.equal(s.state.profile.xp, 99);
  assert.equal(s.state.settings.dailyGoal, 50); // defaults filled in
  assert.throws(() => s.import('{"version": 7}'));
});

test('levels and unlocking', () => {
  assert.equal(levelFromXp(0).level, 1);
  assert.equal(levelFromXp(100).level, 3);
  const s = createStore(memStorage());
  const c = COURSES.it;
  assert.ok(isUnitUnlocked(s.state, c, 0));
  assert.ok(!isUnitUnlocked(s.state, c, 1));
  for (const l of c.units[0].lessons.slice(0, 3)) s.state.langs.it.lessons[l.id] = { done: 1 };
  assert.ok(isUnitUnlocked(s.state, c, 1));
  assert.equal(unitProgress(s.state.langs.it, c.units[0]).done, 3);
});

test('seeded rng is deterministic', () => {
  const a = seededRng(42), b = seededRng(42);
  assert.equal(a(), b());
});
