// Lesson player: runs a queue of exercises with check/feedback/continue flow,
// re-queues mistakes, awards XP and records SRS grades.
import { h, clear, tl, modal } from './dom.js';
import { RENDERERS, msaEl } from './exercises.js';
import { spokenForm } from '../data/index.js';
import { speak, stopSpeaking } from '../speech.js';
import { sfx, confetti } from '../sfx.js';
import { XP, checkAchievements } from '../gamify.js';
import { GRADE } from '../srs.js';

const NO_REQUEUE = new Set(['intro', 'letter_intro', 'vowel_intro', 'rule', 'dialogue', 'roleplay', 'roleplay_text', 'match', 'trace', 'write_memory']);
const SPEAK_TYPES = new Set(['speak', 'roleplay']);

/**
 * @param {object} app   { root, store, course, lang, showTranslit, voiceFor }
 * @param {object} opts  { title, exercises, onFinish(summary), record(summary) }
 */
export function runSession(app, { title, exercises, record, onExit }) {
  const { store, course, lang } = app;
  const settings = store.state.settings;
  const queue = exercises.slice();
  const requeued = new WeakSet();
  let idx = 0;
  let combo = 0, bestCombo = 0, xp = 0, graded = 0, correct = 0, mistakes = 0;
  let speakingOff = !settings.speaking;
  const t0 = Date.now();

  const progress = h('div.progress-fill');
  const comboEl = h('div.combo');
  const body = h('main.player-body');
  const footer = h('footer.player-footer');
  const screen = h('div.player', { dir: 'ltr' },
    h('header.player-head',
      h('button.icon-btn', { type: 'button', 'aria-label': 'Quit lesson', onclick: confirmQuit }, '✕'),
      h('div.progress', progress),
      comboEl),
    body, footer);
  clear(app.root).appendChild(screen);

  function confirmQuit() {
    if (idx === 0) return exit();
    const m = modal(h('div.center',
      h('h3', 'Quit this lesson?'),
      h('p.muted', 'Your progress in this lesson will be lost (words you practised are still saved).'),
      h('div.row.center',
        h('button.btn.ghost', { type: 'button', onclick: () => m.close() }, 'Keep learning'),
        h('button.btn.danger', { type: 'button', onclick: () => { m.close(); exit(); } }, 'Quit'))));
  }
  function exit() { stopSpeaking(); document.removeEventListener('keydown', onKey); onExit?.(); }

  let checkFn = null;
  let phase = 'answer'; // answer | feedback
  const mainBtn = h('button.btn.primary.wide', { type: 'button', onclick: () => onMain() }, 'Check');
  const skipBtn = h('button.btn.ghost', { type: 'button', onclick: () => skipCurrent() }, 'Skip');

  function onMain() {
    if (phase === 'feedback' || phase === 'continue') return advance();
    if (!checkFn) return;
    const fn = checkFn; checkFn = null;
    Promise.resolve(fn()).then(handleResult);
  }

  function onKey(e) {
    if (e.target.tagName === 'INPUT' && phase === 'answer') return; // input handles Enter itself
    if (e.key === 'Enter' && !mainBtn.disabled) { e.preventDefault(); onMain(); }
    if (phase === 'answer' && /^[1-9]$/.test(e.key)) {
      const btn = body.querySelectorAll('.choices .choice')[Number(e.key) - 1];
      btn?.click();
    }
  }
  document.addEventListener('keydown', onKey);

  const ctx = {
    lang, course, store,
    say: (text, { slow } = {}) => speak(spokenForm(lang, text), { langs: course.meta.tts, rate: (slow ? 0.6 : 1) * settings.rate, voice: settings.voices[lang] }),
    showTranslit: () => app.showTranslit(),
    ready(fn) { checkFn = fn; mainBtn.disabled = !fn; },
    submit() { onMain(); },
    done(result) { checkFn = null; handleResult(result); },
    next() { phase = 'continue'; mainBtn.textContent = 'Continue'; mainBtn.disabled = false; skipBtn.hidden = true; },
    skip() { skipCurrent(); },
    speakingOn: () => !speakingOff,
    disableSpeaking() {
      speakingOff = true;
      // Drop remaining speaking-only items from the queue (keep roleplay as typed version).
      for (let i = queue.length - 1; i > idx; i--) {
        if (queue[i].type === 'speak') queue.splice(i, 1);
        else if (queue[i].type === 'roleplay') queue[i] = { ...queue[i], type: 'roleplay_text' };
      }
      updateProgress();
    },
  };

  function updateProgress() {
    progress.style.width = `${Math.round((idx / queue.length) * 100)}%`;
    comboEl.textContent = combo >= 3 ? `🔥 ${combo}` : '';
    comboEl.classList.toggle('hot', combo >= 5);
  }

  function render() {
    if (idx >= queue.length) return finish();
    const ex = queue[idx];
    if (ex.type === 'speak' && speakingOff) { queue.splice(idx, 1); return render(); }
    phase = 'answer';
    checkFn = null;
    clear(body);
    clear(footer);
    mainBtn.textContent = 'Check';
    mainBtn.disabled = true;
    skipBtn.hidden = NO_REQUEUE.has(ex.type);
    footer.append(skipBtn, mainBtn);
    footer.className = 'player-footer';
    const fn = RENDERERS[ex.type];
    try {
      body.appendChild(fn(ex, ctx));
    } catch (err) {
      console.error('Exercise failed to render', ex, err);
      idx++;
      return render();
    }
    body.scrollTop = 0;
    if (ex.item?.id && ex.type === 'intro') store.touch(lang, ex.item.id);
    updateProgress();
  }

  function skipCurrent() {
    stopSpeaking();
    idx++;
    render();
  }

  function handleResult(r) {
    const ex = queue[idx];
    phase = 'feedback';
    for (const g of r.grades || []) store.grade(lang, g.id, g.q);
    const isSpeak = SPEAK_TYPES.has(ex.type) || r.kind === 'speak';
    if (isSpeak) { store.state.profile.stats.spoken++; store.state.langs[lang].spoken++; }
    if (r.kind === 'type') store.state.profile.stats.typed++;
    if (ex.type === 'roleplay' || ex.type === 'roleplay_text') store.state.profile.stats.roleplays++;

    if (!r.soft) graded++;
    if (r.correct) {
      if (!r.soft) correct++;
      combo++;
      bestCombo = Math.max(bestCombo, combo);
      const hard = (r.grades || []).some((g) => g.q === GRADE.HARD);
      let gain = isSpeak ? XP.speak : hard ? XP.hard : XP.correct;
      if (combo > 0 && combo % 5 === 0) { gain += XP.comboStep; sfx.combo(); }
      xp += gain;
      sfx.correct();
    } else {
      combo = 0;
      if (!r.soft) mistakes++;
      xp += r.soft ? 4 : 0;
      sfx.wrong();
      if (!NO_REQUEUE.has(ex.type) && !requeued.has(ex)) {
        const again = { ...ex };
        requeued.add(again);
        queue.push(again);
      }
    }
    store.save();
    showFeedback(r);
    updateProgress();
  }

  function showFeedback(r) {
    clear(footer);
    footer.className = `player-footer feedback ${r.correct ? 'good' : 'bad'}`;
    const praise = ['Great!', 'Excellent!', 'Nice!', 'Perfect!', 'Well done!', 'Bravo!', 'Mumtāz!'];
    const head = r.correct
      ? (r.message && r.kind !== 'dialogue' && r.kind !== 'roleplay' ? r.message : praise[Math.floor(Math.random() * praise.length)])
      : 'Not quite.';
    const sol = r.solution && (!r.correct || r.message || r.kind === 'read' || r.kind === 'script')
      ? h('div.solution',
        r.correct ? null : h('div.small', 'Correct answer:'),
        h('div.target-row', tl(r.solution.t, /[؀-ۿ]/.test(r.solution.t) ? 'ar' : lang, 'md'),
          h('button.audio-btn', { type: 'button', onclick: () => ctx.say(r.solution.t) }, '🔊')),
        r.solution.tr ? h('div.translit', r.solution.tr) : null,
        msaEl(ctx, r.solution.msa),
        r.solution.en ? h('div.small', r.solution.en) : null)
      : null;
    const extra = r.extra ? h('div.row', r.extra.map((w) => h('button.btn.ghost.small', { type: 'button', onclick: () => ctx.say(w) }, '🔊 ', w))) : null;
    footer.append(
      h('div.fb-text', h('div.fb-head', r.correct ? '✅ ' : '❌ ', head), r.correct ? null : r.message ? h('div.small', r.message) : null, sol, extra),
      mainBtn);
    mainBtn.textContent = 'Continue';
    mainBtn.disabled = false;
    mainBtn.focus({ preventScroll: true });
    if (r.solution && !r.correct) setTimeout(() => ctx.say(r.solution.t), 300);
  }

  function advance() {
    stopSpeaking();
    idx++;
    render();
  }

  function finish() {
    document.removeEventListener('keydown', onKey);
    const accuracy = graded ? correct / Math.max(graded, correct + mistakes) : 1;
    const perfect = mistakes === 0;
    xp += XP.lessonBonus + (perfect ? XP.perfectBonus : 0);
    const before = store.liveStreak();
    const { streakExtended } = store.addXp(xp, lang);
    store.state.profile.stats.lessons++;
    if (perfect) store.state.profile.stats.perfect++;
    const summary = { xp, accuracy, perfect, bestCombo, minutes: (Date.now() - t0) / 60000 };
    record?.(summary);
    const fresh = checkAchievements(store.state);
    store.save();
    sfx.complete();
    confetti();
    const streak = store.liveStreak();
    clear(screen);
    screen.appendChild(h('div.summary',
      h('div.summary-trophy', perfect ? '💎' : '🏆'),
      h('h1', perfect ? 'Flawless!' : 'Lesson complete!'),
      h('p.muted', title),
      h('div.stat-row',
        h('div.stat', h('b', `+${xp}`), h('small', 'XP')),
        h('div.stat', h('b', `${Math.round(accuracy * 100)}%`), h('small', 'accuracy')),
        h('div.stat', h('b', `${bestCombo}`), h('small', 'best combo')),
        h('div.stat', h('b', `${streak} 🔥`), h('small', streakExtended && streak > before ? 'streak extended!' : 'day streak'))),
      fresh.length ? h('div.new-achievements', h('h3', 'Achievement unlocked!'), fresh.map((a) => h('div.ach.unlocked', h('span.ach-icon', a.icon), h('div', h('b', a.title), h('small', a.desc))))) : null,
      h('button.btn.primary.wide', { type: 'button', onclick: exit, autofocus: true }, 'Continue')));
  }

  render();
}
