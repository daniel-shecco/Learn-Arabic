// Spaced repetition scheduler (SM-2 family, tuned for short language items).
// A card's interval is scheduled so predicted recall at review time is ~90%.

export const DAY = 24 * 60 * 60 * 1000;

/** Outcome of a single practice attempt -> SM-2 style quality (0..5). */
export const GRADE = {
  AGAIN: 1, // wrong
  HARD: 3, // right with a hint / typo / after a retry
  GOOD: 4, // right first time
  EASY: 5, // right first time on a productive (typing / speaking) task
};

export function newCard(now = Date.now()) {
  return { ease: 2.5, interval: 0, reps: 0, lapses: 0, due: now, last: 0, seen: 0, correct: 0 };
}

/**
 * Return a new card after a review with the given quality.
 * Intervals are in days. Multiple reviews on the same day only nudge the card,
 * so cramming within a session does not inflate the interval.
 */
export function review(card, quality, now = Date.now()) {
  const c = { ...(card || newCard(now)) };
  c.seen += 1;
  const sameDay = c.last && now - c.last < DAY / 2 && c.reps > 0;
  c.last = now;

  if (quality < 3) {
    c.lapses += c.reps > 0 ? 1 : 0;
    c.reps = 0;
    c.interval = 0;
    c.ease = Math.max(1.3, c.ease - 0.2);
    c.due = now + 10 * 60 * 1000; // see it again soon
    return c;
  }

  c.correct += 1;
  if (sameDay) {
    // Already reviewed today: keep schedule, small ease adjustment only.
    c.ease = clampEase(c.ease + (quality - 4) * 0.03);
    return c;
  }

  c.ease = clampEase(c.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  c.reps += 1;
  if (c.reps === 1) c.interval = quality === 5 ? 2 : 1;
  else if (c.reps === 2) c.interval = quality === 3 ? 3 : 4;
  else c.interval = Math.round(c.interval * c.ease * (quality === 3 ? 0.8 : quality === 5 ? 1.15 : 1));
  c.interval = Math.min(c.interval, 365);
  c.due = now + c.interval * DAY;
  return c;
}

function clampEase(e) {
  return Math.min(3.2, Math.max(1.3, e));
}

/** Predicted probability of recall now (1 right after review, 0.9 at due date). */
export function retrievability(card, now = Date.now()) {
  if (!card || !card.last) return 0;
  if (!card.interval) return card.reps === 0 && card.correct === 0 ? 0 : 0.5;
  const elapsed = (now - card.last) / DAY;
  return Math.exp((Math.log(0.9) * elapsed) / card.interval);
}

export function isDue(card, now = Date.now()) {
  return !!card && card.seen > 0 && card.due <= now;
}

/** Mastery level 0..5 used for the UI (crown/strength bars). */
export function masteryLevel(card) {
  if (!card || !card.seen) return 0;
  if (card.interval >= 30) return 5;
  if (card.interval >= 14) return 4;
  if (card.interval >= 6) return 3;
  if (card.interval >= 2) return 2;
  return 1;
}

/** Order due cards: most overdue (relative to interval) and weakest first. */
export function dueQueue(cards, now = Date.now(), limit = 20) {
  return Object.entries(cards)
    .filter(([, c]) => isDue(c, now))
    .map(([id, c]) => ({ id, r: retrievability(c, now) - c.lapses * 0.02 }))
    .sort((a, b) => a.r - b.r)
    .slice(0, limit)
    .map((x) => x.id);
}
