// XP, levels, achievements and progression rules.
import { masteryLevel } from './srs.js';
import { today } from './state.js';

export const XP = {
  correct: 10,
  hard: 6,
  speak: 12,
  lessonBonus: 15,
  perfectBonus: 10,
  comboStep: 5, // extra XP every 5 in a row
};

export function levelFromXp(xp) {
  const level = Math.floor(Math.sqrt(xp / 25)) + 1;
  const cur = 25 * (level - 1) ** 2;
  const next = 25 * level ** 2;
  return { level, cur, next, progress: (xp - cur) / (next - cur) };
}

export const LEVEL_TITLES = ['Curious', 'Beginner', 'Explorer', 'Talker', 'Conversationalist', 'Storyteller', 'Fluent-ish', 'Polyglot', 'Master', 'Legend'];
export function levelTitle(level) {
  return LEVEL_TITLES[Math.min(LEVEL_TITLES.length - 1, Math.floor((level - 1) / 3))];
}

export function unitProgress(langState, unit) {
  const done = unit.lessons.filter((l) => (langState.lessons[l.id]?.done || 0) > 0).length;
  const ids = [...unit.wordIds, ...unit.phraseIds];
  const mastery = ids.reduce((s, id) => s + masteryLevel(langState.cards[id]), 0) / (ids.length * 5);
  // Crowns 0..5: completing all lessons = 1; then strengthened by spaced reviews.
  let crowns = done === unit.lessons.length ? 1 : 0;
  if (crowns) crowns += Math.min(4, Math.floor(mastery * 5));
  return { done, total: unit.lessons.length, mastery, crowns };
}

export function isUnitUnlocked(state, course, unitIndex) {
  if (unitIndex === 0 || state.settings.unlockAll) return true;
  const L = state.langs[course.lang];
  const prev = course.units[unitIndex - 1];
  // Unlock after finishing the previous unit's first three lessons
  // (the conversation lesson can be done later).
  return prev.lessons.slice(0, 3).every((l) => (L.lessons[l.id]?.done || 0) > 0);
}

export function isLessonUnlocked(state, course, unit, lessonIdx) {
  if (!isUnitUnlocked(state, course, unit.index)) return false;
  if (lessonIdx === 0 || state.settings.unlockAll) return true;
  const L = state.langs[course.lang];
  return (L.lessons[unit.lessons[lessonIdx - 1].id]?.done || 0) > 0;
}

export function isScriptUnlocked(state, lang, gi, groups) {
  if (gi === 0 || state.settings.unlockAll) return true;
  return (state.langs[lang].script[groups[gi - 1].id]?.done || 0) > 0;
}

/** Fraction of the Arabic alphabet track completed (0..1). */
export function scriptProgress(state, lang, groups) {
  const done = groups.filter((g) => (state.langs[lang].script[g.id]?.done || 0) > 0).length;
  return done / groups.length;
}

export const ACHIEVEMENTS = [
  { id: 'first_lesson', icon: '🌱', title: 'First steps', desc: 'Finish your first lesson.', test: (s) => s.profile.stats.lessons >= 1 },
  { id: 'ten_lessons', icon: '📚', title: 'Dedicated', desc: 'Finish 10 lessons.', test: (s) => s.profile.stats.lessons >= 10 },
  { id: 'fifty_lessons', icon: '🏛️', title: 'Scholar', desc: 'Finish 50 lessons.', test: (s) => s.profile.stats.lessons >= 50 },
  { id: 'perfect', icon: '💎', title: 'Flawless', desc: 'Finish a lesson without mistakes.', test: (s) => s.profile.stats.perfect >= 1 },
  { id: 'streak3', icon: '🔥', title: 'On fire', desc: 'Reach a 3-day streak.', test: (s) => s.profile.bestStreak >= 3 },
  { id: 'streak7', icon: '📅', title: 'Week warrior', desc: 'Reach a 7-day streak.', test: (s) => s.profile.bestStreak >= 7 },
  { id: 'streak30', icon: '🏆', title: 'Unstoppable', desc: 'Reach a 30-day streak.', test: (s) => s.profile.bestStreak >= 30 },
  { id: 'speaker', icon: '🎤', title: 'Found my voice', desc: 'Complete 25 speaking exercises.', test: (s) => s.profile.stats.spoken >= 25 },
  { id: 'orator', icon: '📣', title: 'Orator', desc: 'Complete 250 speaking exercises.', test: (s) => s.profile.stats.spoken >= 250 },
  { id: 'roleplayer', icon: '🎭', title: 'Method actor', desc: 'Complete 5 role-plays.', test: (s) => s.profile.stats.roleplays >= 5 },
  { id: 'scribe', icon: '✍️', title: 'Scribe', desc: 'Trace or write 30 letters.', test: (s) => s.profile.stats.traced >= 30 },
  { id: 'alphabet', icon: 'أ', title: 'Alphabet unlocked', desc: 'Finish the whole Arabic alphabet track.', test: (s) => Object.values(s.langs.ar.script).filter((x) => x.done).length >= 10 },
  { id: 'sounds', icon: '🎶', title: 'Golden ear', desc: 'Finish the whole Italian sounds track.', test: (s) => Object.values(s.langs.it.script).filter((x) => x.done).length >= 8 },
  { id: 'reviewer', icon: '🧠', title: 'Memory palace', desc: 'Complete 10 review sessions.', test: (s) => s.profile.stats.reviews >= 10 },
  { id: 'xp1000', icon: '⭐', title: 'Rising star', desc: 'Earn 1,000 XP.', test: (s) => s.profile.xp >= 1000 },
  { id: 'bilingual', icon: '🌍', title: 'Two worlds', desc: 'Earn XP in both Arabic and Italian.', test: (s) => s.langs.ar.xp > 0 && s.langs.it.xp > 0 },
  { id: 'words100', icon: '🗂️', title: 'Word hoard', desc: 'Learn 100 words and phrases.', test: (s) => Object.keys(s.langs.ar.cards).length + Object.keys(s.langs.it.cards).length >= 100 },
  { id: 'ai_chat', icon: '🤖', title: 'Real conversation', desc: 'Have 10 exchanges with the AI partner.', test: (s) => s.profile.stats.aiTurns >= 10 },
];

/** Returns newly unlocked achievements (and records them). */
export function checkAchievements(state, now = Date.now()) {
  const fresh = [];
  for (const a of ACHIEVEMENTS) {
    if (!state.profile.achievements[a.id] && a.test(state)) {
      state.profile.achievements[a.id] = now;
      fresh.push(a);
    }
  }
  return fresh;
}

export function todayXp(state, d = new Date()) {
  return state.profile.xpByDay[today(d)] || 0;
}

/** Last n days of XP for the activity chart. */
export function xpHistory(state, n = 7, d = new Date()) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const day = new Date(d);
    day.setDate(d.getDate() - i);
    const key = today(day);
    out.push({ day: key, label: day.toLocaleDateString(undefined, { weekday: 'narrow' }), xp: state.profile.xpByDay[key] || 0 });
  }
  return out;
}
