// App shell: onboarding, home tabs (Learn, Script, Practice, Speak, Profile) and AI chat.
import { h, clear, tl, modal, toast } from './ui/dom.js';
import { createStore } from './state.js';
import { COURSES, LANGS, ARABIC_SCRIPT, ITALIAN_SOUNDS } from './data/index.js';
import { buildLesson, buildReview, buildSpeakingDrill, buildListeningDrill, buildScriptLesson, buildSoundLesson } from './session.js';
import { runSession } from './ui/player.js';
import { dueQueue, masteryLevel, retrievability } from './srs.js';
import {
  levelFromXp, levelTitle, unitProgress, isUnitUnlocked, isLessonUnlocked, isScriptUnlocked,
  scriptProgress, ACHIEVEMENTS, todayXp, xpHistory, checkAchievements,
} from './gamify.js';
import { speak, voicesFor, ttsSupported, asrSupported, listen, stopSpeaking, isNative as nativeSpeech } from './speech.js';
import { isNative, plugin, platform } from './native.js';
import { setSfx } from './sfx.js';
import { arabicForms, shuffle } from './text.js';
import { createTracer } from './ui/tracer.js';
import { AI_MODELS, SCENARIOS, partnerReply } from './ai.js';
import { ITALIAN_ACCENTS } from './data/it/sounds.js';

const store = createStore();
const root = document.getElementById('app');
let tab = 'learn';

function S() { return store.state; }
function lang() { return S().activeLang; }
function course() { return COURSES[lang()]; }

function showTranslit() {
  const mode = S().settings.translit;
  if (mode !== 'auto') return mode;
  return scriptProgress(S(), 'ar', ARABIC_SCRIPT.GROUPS) < 0.5 ? 'always' : 'tap';
}

function say(text, { slow = false, l = lang() } = {}) {
  return speak(text, { langs: COURSES[l].meta.tts, rate: (slow ? 0.6 : 1) * S().settings.rate, voice: S().settings.voices[l] });
}

function audioBtn(text, opts = {}) {
  return h('button.audio-btn', { type: 'button', 'aria-label': 'Play', onclick: (e) => { e.stopPropagation(); say(text, opts); } }, opts.slow ? '🐢' : '🔊');
}

function appCtx() {
  return { root, store, course: course(), lang: lang(), showTranslit };
}

function applyTheme() {
  const t = S().settings.theme;
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  setSfx(S().settings.sfx);
}

// ---------------------------------------------------------------- onboarding

function renderOnboarding() {
  const choice = { lang: null, goal: S().settings.dailyGoal };
  const langBtns = Object.values(LANGS).map((L) => h('button.lang-card', { type: 'button', onclick: (e) => {
    choice.lang = L.code;
    langBtns.forEach((b) => b.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
    go.disabled = false;
  } }, h('span.flag', L.flag), h('b', L.name), h('span.native', { lang: L.code }, L.native)));
  const goals = [[20, 'Casual', '~5 min/day'], [50, 'Regular', '~10 min/day'], [100, 'Serious', '~20 min/day'], [150, 'Intense', '~30 min/day']];
  const goalBtns = goals.map(([v, name, sub]) => h(`button.goal-card${v === choice.goal ? '.selected' : ''}`, { type: 'button', onclick: (e) => {
    choice.goal = v;
    goalBtns.forEach((b) => b.classList.remove('selected'));
    e.currentTarget.classList.add('selected');
  } }, h('b', name), h('small', `${v} XP · ${sub}`)));
  const go = h('button.btn.primary.wide', { type: 'button', disabled: true, onclick: () => {
    store.update((s) => { s.activeLang = choice.lang; s.settings.dailyGoal = choice.goal; if (!s.langs[choice.lang].started) s.langs[choice.lang].started = Date.now(); });
    tab = choice.lang === 'ar' && !Object.keys(S().langs.ar.script).length ? 'script' : 'learn';
    render();
    if (choice.lang === 'ar') toast('Tip: start with the Alphabet track — you\'ll read your first words in minutes!', 'info', 5000);
  } }, 'Start learning');
  const warnings = [];
  if (!ttsSupported()) warnings.push('Your browser has no text-to-speech — audio exercises will be silent.');
  if (!asrSupported()) warnings.push('Your browser has no speech recognition (try Chrome, Edge or Safari). Speaking exercises will use record-and-compare instead.');
  clear(root).appendChild(h('div.onboarding',
    h('div.logo-big', '🗣️'),
    h('h1', 'Lingua Path'),
    h('p.lead', 'Learn to speak, listen, read and write Arabic and Italian — one conversation at a time.'),
    h('h3', 'What do you want to learn?'),
    h('div.lang-grid', langBtns),
    h('p.muted.small', 'You can switch languages anytime — progress is kept separately.'),
    h('h3', 'Daily goal'),
    h('div.goal-grid', goalBtns),
    warnings.length ? h('div.warn-box', warnings.map((w) => h('p', '⚠️ ', w))) : null,
    go));
}

// ---------------------------------------------------------------- home shell

function header() {
  const p = S().profile;
  const goal = S().settings.dailyGoal;
  const tXp = todayXp(S());
  const pct = Math.min(1, tXp / goal);
  const ring = h('div.goal-ring', { style: { '--p': pct }, title: `Daily goal: ${tXp}/${goal} XP` }, h('span', pct >= 1 ? '✓' : `${Math.round(pct * 100)}%`));
  const lvl = levelFromXp(p.xp);
  const otherLang = lang() === 'ar' ? 'it' : 'ar';
  return h('header.topbar',
    h('button.lang-switch', { type: 'button', title: `Switch to ${LANGS[otherLang].name}`, onclick: () => {
      store.update((s) => { s.activeLang = otherLang; if (!s.langs[otherLang].started) s.langs[otherLang].started = Date.now(); });
      render();
    } }, h('span.flag', LANGS[lang()].flag), h('span.lang-name', LANGS[lang()].name), h('span.swap', '⇄')),
    h('div.top-stats',
      h('span.pill.streak', { title: `${p.freezes} streak freeze(s)` }, '🔥 ', String(store.liveStreak()), p.freezes ? h('small', ` ❄️${p.freezes}`) : null),
      h('span.pill.xp', { title: `Level ${lvl.level}` }, '⭐ ', String(p.xp)),
      ring));
}

function nav() {
  const L = LANGS[lang()];
  const due = dueQueue(S().langs[lang()].cards, Date.now(), 999).length;
  const items = [
    ['learn', '🧭', 'Learn'],
    ['script', L.code === 'ar' ? 'أ' : 'Àà', L.scriptName.split(' ')[0]],
    ['practice', '🧠', 'Practice', due],
    ['speak', '🎤', 'Speak'],
    ['profile', '👤', 'Profile'],
  ];
  return h('nav.bottom-nav', items.map(([id, icon, label, badge]) => h(`button.nav-btn${tab === id ? '.active' : ''}`, {
    type: 'button', onclick: () => { tab = id; render(); }, 'aria-current': tab === id ? 'page' : null,
  }, h('span.nav-icon', { lang: id === 'script' ? lang() : null }, icon), h('span.nav-label', label), badge ? h('span.nav-badge', badge > 99 ? '99+' : String(badge)) : null)));
}

function render() {
  stopSpeaking();
  applyTheme();
  if (!lang()) return renderOnboarding();
  document.documentElement.lang = 'en';
  const content = { learn: learnTab, script: scriptTab, practice: practiceTab, speak: speakTab, profile: profileTab }[tab]();
  clear(root).append(header(), h('main.content', content), nav());
  window.scrollTo(0, 0);
}

function startSession(title, exercises, record) {
  if (!exercises.length) { toast('Nothing to practise here yet.', 'info'); return; }
  runSession(appCtx(), { title, exercises, record, onExit: render });
}

// ---------------------------------------------------------------- Learn

function learnTab() {
  const c = course();
  const L = S().langs[c.lang];
  const intro = c.lang === 'ar' && scriptProgress(S(), 'ar', ARABIC_SCRIPT.GROUPS) < 0.3
    ? h('div.callout', { onclick: () => { tab = 'script'; render(); } },
      h('b', '✍️ New to the Arabic alphabet? '), 'Do a few Alphabet lessons alongside these units. Transliteration is shown until you can read comfortably.')
    : null;
  // First unlocked-but-unfinished lesson = "continue" target.
  let next = null;
  for (const u of c.units) {
    if (!isUnitUnlocked(S(), c, u.index)) break;
    const li = u.lessons.findIndex((l) => !(L.lessons[l.id]?.done));
    if (li >= 0) { next = { u, li }; break; }
  }
  const continueCard = next ? h('button.continue-card', { type: 'button', onclick: () => startLesson(next.u, next.li) },
    h('span.cc-icon', next.u.icon),
    h('div', h('small', 'Continue'), h('b', `${next.u.subtitle} · ${next.u.lessons[next.li].title}`)),
    h('span.cc-go', '▶')) : null;

  return h('div.learn',
    h('p.variety', c.meta.variety),
    intro,
    continueCard,
    h('div.path', c.units.map((u) => unitCard(u))));
}

function unitCard(u) {
  const c = course();
  const L = S().langs[c.lang];
  const unlocked = isUnitUnlocked(S(), c, u.index);
  const prog = unitProgress(L, u);
  const crowns = h('div.crowns', { title: `Mastery ${prog.crowns}/5` }, Array.from({ length: 5 }, (_, i) => h(`span${i < prog.crowns ? '.on' : ''}`, '★')));
  const lessons = u.lessons.map((les, i) => {
    const ok = isLessonUnlocked(S(), c, u, i);
    const done = L.lessons[les.id]?.done || 0;
    return h(`button.lesson-btn${done ? '.done' : ''}${ok ? '' : '.locked'}`, {
      type: 'button', disabled: !ok, onclick: () => startLesson(u, i), title: ok ? les.title : 'Finish the previous lesson first',
    }, h('span.l-icon', ok ? (done ? '✓' : les.icon) : '🔒'), h('span.l-title', les.title), done > 1 ? h('small', `×${done}`) : null);
  });
  return h(`section.unit${unlocked ? '' : '.locked'}`,
    h('div.unit-head',
      h('div.unit-icon', u.icon),
      h('div.unit-titles',
        h('small', `Unit ${u.index + 1}`),
        h('h3', tl(u.title, c.lang), ' ', h('span.sub', u.subtitle)),
        h('p.goal', '🎯 ', u.goal)),
      crowns),
    h('div.progress.thin', h('div.progress-fill', { style: { width: `${(prog.done / prog.total) * 100}%` } })),
    unlocked ? h('div.lesson-row', lessons) : h('p.muted.small', '🔒 Finish the first three lessons of the previous unit to unlock.'),
    unlocked ? h('div.unit-actions',
      h('button.btn.ghost.small', { type: 'button', onclick: () => grammarModal(u) }, '📖 Grammar & tips'),
      h('button.btn.ghost.small', { type: 'button', onclick: () => wordListModal(u) }, '🗂️ Word list'),
      prog.done === prog.total ? h('button.btn.ghost.small', { type: 'button', onclick: () => {
        const ids = shuffle([...u.wordIds, ...u.phraseIds]).slice(0, 15);
        startSession(`${u.subtitle} — strengthen`, buildReview(c, ids, L.cards, { speaking: S().settings.speaking }), () => {});
      } }, '💪 Strengthen') : null) : null);
}

function startLesson(u, li) {
  const c = course();
  const L = S().langs[c.lang];
  // Interleave a few due items from previous units (spaced retrieval).
  const earlier = new Set(c.units.slice(0, u.index).flatMap((x) => [...x.wordIds, ...x.phraseIds]));
  const reviewIds = dueQueue(L.cards, Date.now(), 50).filter((id) => earlier.has(id)).slice(0, 3);
  const ex = buildLesson(c, u, li, { speaking: S().settings.speaking, reviewIds });
  const les = u.lessons[li];
  startSession(`${u.subtitle} · ${les.title}`, ex, (sum) => {
    const rec = L.lessons[les.id] || { done: 0, best: 0 };
    rec.done += 1;
    rec.best = Math.max(rec.best, sum.accuracy);
    rec.last = Date.now();
    L.lessons[les.id] = rec;
  });
}

function grammarModal(u) {
  const c = course();
  modal(h('div.grammar-modal',
    h('h2', u.grammar.title),
    h('div.grammar', { html: u.grammar.body, lang: 'en' }),
    h('h3', 'Conversation'),
    h('p.muted', u.dialogue.scene),
    h('div.chat.compact', u.dialogue.lines.map((l, i) => h(`div.bubble.${i % 2 ? 'right' : 'left'}`, { onclick: () => say(l.t) },
      h('div.who', l.who), tl(l.t, c.lang, 'md'), l.tr && showTranslit() !== 'never' ? h('div.translit', l.tr) : null, h('div.bubble-en', l.en))))), { className: 'wide' });
}

function wordListModal(u) {
  const c = course();
  const L = S().langs[c.lang];
  const row = (id) => {
    const it = c.items[id];
    const lvl = masteryLevel(L.cards[id]);
    return h('div.word-row', { onclick: () => say(it.t) },
      h('span.emoji.sm', it.e || '•'),
      h('div.word-main', tl(it.t, c.lang, 'md'), it.tr ? h('div.translit', it.tr) : null),
      h('div.word-en', it.en),
      h('div.strength', { title: `Strength ${lvl}/5` }, Array.from({ length: 5 }, (_, i) => h(`i${i < lvl ? '.on' : ''}`))));
  };
  modal(h('div',
    h('h2', `${u.icon} ${u.subtitle}`),
    h('h3', 'Words'), h('div.word-list', u.wordIds.map(row)),
    h('h3', 'Phrases'), h('div.word-list', u.phraseIds.map(row))), { className: 'wide' });
}

// ---------------------------------------------------------------- Script / Sounds

function scriptTab() {
  return lang() === 'ar' ? arabicScriptTab() : italianSoundsTab();
}

function arabicScriptTab() {
  const G = ARABIC_SCRIPT.GROUPS;
  const Ls = S().langs.ar.script;
  const pct = scriptProgress(S(), 'ar', G);
  return h('div.script',
    h('div.callout',
      h('b', 'How Arabic writing works: '),
      'right-to-left · 28 letters · most letters connect to the next one and change shape (start, middle, end) · short vowels are small marks, usually left out in everyday texts but always shown here.'),
    h('div.progress', h('div.progress-fill', { style: { width: `${pct * 100}%` } })),
    h('div.group-list', G.map((g, gi) => {
      const ok = isScriptUnlocked(S(), 'ar', gi, G);
      const done = Ls[g.id]?.done || 0;
      return h(`button.group-card${done ? '.done' : ''}${ok ? '' : '.locked'}`, { type: 'button', disabled: !ok, onclick: () => {
        startSession(`Alphabet · ${g.title}`, buildScriptLesson(ARABIC_SCRIPT, gi, { speaking: S().settings.speaking }), () => {
          const r = Ls[g.id] || { done: 0 }; r.done++; r.last = Date.now(); Ls[g.id] = r;
        });
      } },
      h('span.g-icon', { lang: 'ar' }, g.icon),
      h('div.g-main', h('b', `${gi + 1}. ${g.title}`), h('div.g-letters', { lang: 'ar', dir: 'rtl' }, g.letters.join(' '))),
      h('span.g-state', ok ? (done ? '✓' : '▶') : '🔒'));
    })),
    h('h3', 'Letter chart'),
    h('p.muted.small', 'Tap a letter to hear it, see its forms and practise writing it.'),
    h('div.letter-chart', { dir: 'rtl' }, Object.entries(ARABIC_SCRIPT.LETTERS).map(([ch, L]) => h('button.letter-tile', { type: 'button', onclick: () => letterModal(ch) },
      h('span.glyph', { lang: 'ar' }, ch), h('small', L.name)))),
    h('h3', 'Vowel marks'),
    h('div.letter-chart', { dir: 'rtl' }, ARABIC_SCRIPT.VOWELS.map((v) => h('button.letter-tile', { type: 'button', onclick: () => say(v.sample, { l: 'ar' }) },
      h('span.glyph', { lang: 'ar' }, v.sample), h('small', `${v.name} · ${v.sampleTr}`)))));
}

function letterModal(ch) {
  const L = ARABIC_SCRIPT.LETTERS[ch];
  const f = arabicForms(ch, L.connects);
  let tracer = createTracer({ glyph: ch, guide: true });
  const pad = h('div.center', tracer.el);
  const result = h('p.center');
  say(L.ar, { l: 'ar' });
  modal(h('div.letter-modal',
    h('div.big-glyph', { lang: 'ar' }, ch),
    h('div.target-row', h('b', L.name), ' ', tl(L.ar, 'ar'), audioBtn(L.ar, { l: 'ar' })),
    h('p', h('b', `/${L.tr}/ `), L.sound),
    L.standalone ? null : h('div.forms', [['isolated', 'alone'], ['final', 'end'], ['medial', 'middle'], ['initial', 'start']].map(([k, lab]) => h('div.form-cell', h('span.glyph', { lang: 'ar' }, f[k]), h('small', lab)))),
    h('p', h('span.muted', 'Example: '), tl(L.ex[0], 'ar', 'lg'), audioBtn(L.ex[0], { l: 'ar' }), ` ${L.ex[1]} — ${L.ex[2]}`),
    h('p.note', '✍️ ', L.tip),
    pad, result,
    h('div.row.center',
      h('button.btn.ghost.small', { type: 'button', onclick: () => { tracer.clear(); result.textContent = ''; } }, '🗑 Clear'),
      h('button.btn.ghost.small', { type: 'button', onclick: () => {
        const memory = !tracer._memory;
        tracer = createTracer({ glyph: ch, guide: !memory });
        tracer._memory = memory;
        clear(pad).appendChild(tracer.el);
        result.textContent = memory ? 'Write it from memory, then press Check.' : '';
      } }, '🧠 Memory mode'),
      h('button.btn.small', { type: 'button', onclick: () => {
        if (!tracer.hasInk()) return;
        const s = tracer.score();
        tracer.reveal();
        S().profile.stats.traced++;
        store.save();
        result.textContent = s >= 0.55 ? `✅ ${Math.round(s * 100)}% — beautiful!` : `${Math.round(s * 100)}% — compare with the model and try again.`;
      } }, 'Check'))));
}

function italianSoundsTab() {
  const G = ITALIAN_SOUNDS.GROUPS;
  const Ls = S().langs.it.script;
  return h('div.script',
    h('div.callout', h('b', 'Italian is (almost) written as it sounds. '), 'Learn these ~10 rules and you can read aloud — and spell — nearly any word you hear.'),
    h('div.group-list', G.map((g, gi) => {
      const ok = isScriptUnlocked(S(), 'it', gi, G);
      const done = Ls[g.id]?.done || 0;
      return h(`button.group-card${done ? '.done' : ''}${ok ? '' : '.locked'}`, { type: 'button', disabled: !ok, onclick: () => {
        startSession(`Sounds · ${g.title}`, buildSoundLesson(ITALIAN_SOUNDS, gi, { speaking: S().settings.speaking }), () => {
          const r = Ls[g.id] || { done: 0 }; r.done++; r.last = Date.now(); Ls[g.id] = r;
        });
      } }, h('span.g-icon', g.icon), h('div.g-main', h('b', `${gi + 1}. ${g.title}`), h('div.g-letters', g.examples.slice(0, 4).map((e) => e[0]).join(' · '))), h('span.g-state', ok ? (done ? '✓' : '▶') : '🔒'));
    })),
    h('h3', 'Alphabet'),
    h('p.muted.small', 'The Italian alphabet has 21 letters; j, k, w, x, y appear only in foreign words. Tap to hear the letter names.'),
    h('div.letter-chart', [['a', 'a'], ['b', 'bi'], ['c', 'ci'], ['d', 'di'], ['e', 'e'], ['f', 'effe'], ['g', 'gi'], ['h', 'acca'], ['i', 'i'], ['l', 'elle'], ['m', 'emme'], ['n', 'enne'], ['o', 'o'], ['p', 'pi'], ['q', 'cu'], ['r', 'erre'], ['s', 'esse'], ['t', 'ti'], ['u', 'u'], ['v', 'vu'], ['z', 'zeta']]
      .map(([l, n]) => h('button.letter-tile', { type: 'button', onclick: () => say(n, { l: 'it' }) }, h('span.glyph', l.toUpperCase() + l), h('small', n)))),
    h('h3', 'Accented letters'),
    h('div.letter-chart', ITALIAN_ACCENTS.map((a) => h('div.letter-tile', h('span.glyph', a)))));
}

// ---------------------------------------------------------------- Practice

function learnedIds() {
  const c = course();
  return Object.keys(S().langs[c.lang].cards).filter((id) => c.items[id]);
}

function practiceTab() {
  const c = course();
  const L = S().langs[c.lang];
  const due = dueQueue(L.cards, Date.now(), 999).filter((id) => c.items[id]);
  const learned = learnedIds();
  const weakest = learned.slice().sort((a, b) => retrievability(L.cards[a]) - retrievability(L.cards[b])).slice(0, 12);
  const sp = { speaking: S().settings.speaking };
  const card = (icon, title, desc, action, disabled, cls = '') => h(`button.practice-card${cls}`, { type: 'button', onclick: action, disabled }, h('span.p-icon', icon), h('div', h('b', title), h('small', desc)));
  const reviewRec = () => { S().profile.stats.reviews++; };

  return h('div.practice',
    h('div.review-hero',
      h('div', h('h2', due.length ? `${due.length} to review` : 'All caught up! 🎉'),
        h('p.muted', due.length ? 'Spaced repetition: these are fading from memory right now — the best moment to review them.' : `You know ${learned.length} words & phrases. Come back later, or practise below.`)),
      h('button.btn.primary', { type: 'button', disabled: !due.length, onclick: () => startSession('Review', buildReview(c, due.slice(0, 20), L.cards, sp), reviewRec) }, 'Review now')),
    h('div.practice-grid',
      card('🎧', 'Listening', 'Understand and transcribe what you hear', () => startSession('Listening practice', buildListeningDrill(c, shuffle(learned).slice(0, 12)), reviewRec), learned.length < 4),
      card('🎤', 'Speaking', 'Say words & phrases out loud', () => startSession('Speaking practice', buildSpeakingDrill(c, shuffle(learned).slice(0, 10)), reviewRec), learned.length < 4 || !S().settings.speaking),
      card('✍️', 'Writing', 'Type answers from memory', () => startSession('Writing practice', shuffle(learned).slice(0, 10).map((id) => ({ type: 'type', mode: Math.random() < 0.5 ? 'translate' : 'dictation', item: c.items[id] })), reviewRec), learned.length < 4),
      card('🩹', 'Weak spots', 'Your 12 weakest items', () => startSession('Weak spots', buildReview(c, weakest, L.cards, sp), reviewRec), weakest.length < 4)),
    learned.length < 4 ? h('p.muted.center', 'Finish your first lesson to unlock practice modes.') : null,
    h('h3', `Word bank (${learned.length})`),
    h('div.word-list', learned.slice().sort((a, b) => masteryLevel(L.cards[a]) - masteryLevel(L.cards[b])).map((id) => {
      const it = c.items[id];
      const lvl = masteryLevel(L.cards[id]);
      return h('div.word-row', { onclick: () => say(it.t) },
        h('span.emoji.sm', it.e || '•'),
        h('div.word-main', tl(it.t, c.lang, 'md'), it.tr && showTranslit() !== 'never' ? h('div.translit', it.tr) : null),
        h('div.word-en', it.en),
        h('div.strength', { title: `Strength ${lvl}/5` }, Array.from({ length: 5 }, (_, i) => h(`i${i < lvl ? '.on' : ''}`))));
    })));
}

// ---------------------------------------------------------------- Speak

function speakTab() {
  const c = course();
  const unlocked = c.units.filter((u) => isUnitUnlocked(S(), c, u.index));
  const hasKey = !!S().settings.apiKey;
  return h('div.speak',
    h('div.callout', h('b', '🗣️ Speaking is the goal. '), 'Talk out loud every day — even alone. Shadow the conversations (repeat right after the speaker), then try the role-plays without hints.'),
    !asrSupported() ? h('div.warn-box', h('p', '⚠️ Speech recognition is not available in this browser. Role-plays will use typing; try Chrome, Edge or Safari for full speaking practice.')) : null,
    h('h3', '🤖 AI conversation partner'),
    hasKey
      ? h('div.scenario-grid', SCENARIOS.map((sc) => h('button.scenario', { type: 'button', onclick: () => aiChat(sc) }, h('span.p-icon', sc.icon), h('b', sc.title), h('small', sc.brief.replace(/^You are /, 'Partner: ')))))
      : h('div.practice-card.static', h('span.p-icon', '🔑'), h('div', h('b', 'Free conversation with Claude'),
        h('small', 'Have open-ended spoken conversations with gentle corrections. Add your Anthropic API key in Profile → Settings to enable it (stored only in this browser).'))),
    h('h3', '🎭 Role-plays'),
    h('div.scenario-grid', unlocked.map((u) => h('button.scenario', { type: 'button', onclick: () =>
      startSession(`Role-play: ${u.subtitle}`, [{ type: S().settings.speaking && asrSupported() ? 'roleplay' : 'roleplay_text', unit: u }], () => {}) },
    h('span.p-icon', u.icon), h('b', u.subtitle), h('small', u.roleplay.scene)))),
    h('h3', '🎧 Shadow a conversation'),
    h('div.scenario-grid', unlocked.map((u) => h('button.scenario', { type: 'button', onclick: () => shadowSession(u) },
      h('span.p-icon', '🔁'), h('b', u.subtitle), h('small', u.dialogue.scene)))));
}

function shadowSession(u) {
  const ex = [{ type: 'dialogue', unit: u }];
  if (S().settings.speaking) {
    for (const l of u.dialogue.lines) ex.push({ type: 'speak', mode: 'repeat', item: { id: null, lang: lang(), kind: 'line', t: l.t, tr: l.tr, en: l.en, e: '', n: '', alt: [] } });
  }
  startSession(`Shadowing: ${u.subtitle}`, ex, () => {});
}

function levelGuess() {
  const c = course();
  const L = S().langs[c.lang];
  const done = c.units.filter((u) => unitProgress(L, u).done === u.lessons.length).length;
  return done < 3 ? 'A1 absolute beginner — use very simple words' : done < 8 ? 'A1' : 'A1-A2';
}

function aiChat(scenario) {
  const c = course();
  const history = [];
  const chat = h('div.chat');
  const status = h('div.mic-status');
  let busy = false;

  const bubbleFor = (data) => {
    const en = h('div.bubble-en', data.reply_en); en.hidden = true;
    const b = h('div.bubble.left', { onclick: () => { say(data.reply); en.hidden = false; } },
      tl(data.reply, c.lang, 'md'), data.reply_translit && c.lang === 'ar' && showTranslit() !== 'never' ? h('div.translit', data.reply_translit) : null, en);
    return b;
  };

  async function turn(userText) {
    if (busy) return;
    busy = true;
    if (userText) {
      history.push({ role: 'user', content: userText });
      chat.appendChild(h('div.bubble.right', tl(userText, c.lang, 'md')));
    }
    status.textContent = '…thinking';
    try {
      const { data, raw } = await partnerReply({ apiKey: S().settings.apiKey, model: S().settings.aiModel, lang: c.lang, scenario, level: levelGuess(), history });
      if (!history.length) history.push({ role: 'user', content: '(Start the conversation.)' });
      history.push({ role: 'assistant', content: raw });
      if (data.correction && userText) {
        chat.appendChild(h('div.correction', h('div.small', '✏️ More natural:'), h('div.target-row', tl(data.correction, c.lang, 'md'), audioBtn(data.correction)), data.tip ? h('div.small', data.tip) : null));
      }
      chat.appendChild(bubbleFor(data));
      chat.lastChild.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      status.textContent = '';
      if (userText) {
        S().profile.stats.aiTurns++;
        store.addXp(5, c.lang);
        checkAchievements(S()).forEach((a) => toast(`${a.icon} ${a.title}`, 'good'));
        store.save();
      }
      await say(data.reply);
    } catch (err) {
      status.textContent = '⚠️ ' + err.message;
      if (userText) history.pop();
    }
    busy = false;
  }

  const input = h('input.type-input', { type: 'text', dir: c.lang === 'ar' ? 'rtl' : 'ltr', lang: c.lang, placeholder: 'Type or tap the mic…' });
  const send = () => { const v = input.value.trim(); if (v) { input.value = ''; turn(v); } };
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') send(); });
  let ctrl = null;
  const mic = h('button.mic.small', { type: 'button', disabled: !asrSupported(), onclick: async () => {
    if (ctrl) { ctrl.stop(); return; }
    mic.classList.add('rec');
    status.textContent = 'Listening…';
    ctrl = listen(c.meta.asr, { onInterim: (t) => { input.value = t; } });
    const { transcripts } = await ctrl.promise;
    ctrl = null;
    mic.classList.remove('rec');
    status.textContent = '';
    if (transcripts[0]) { input.value = ''; turn(transcripts[0]); }
  } }, '🎤');

  clear(root).appendChild(h('div.player',
    h('header.player-head', h('button.icon-btn', { type: 'button', 'aria-label': 'Close', onclick: () => { stopSpeaking(); render(); } }, '✕'), h('b', `${scenario.icon} ${scenario.title}`), h('span')),
    h('main.player-body', h('p.muted.center.small', 'Tap a bubble to hear it again and see the translation.'), chat, status),
    h('footer.player-footer.chat-input', mic, input, h('button.btn', { type: 'button', onclick: send }, 'Send'))));
  turn(null);
}

// ---------------------------------------------------------------- Profile & settings

function profileTab() {
  const s = S();
  const p = s.profile;
  const lvl = levelFromXp(p.xp);
  const hist = xpHistory(s, 7);
  const max = Math.max(s.settings.dailyGoal, ...hist.map((d) => d.xp));
  const learnedAr = Object.keys(s.langs.ar.cards).length;
  const learnedIt = Object.keys(s.langs.it.cards).length;
  return h('div.profile',
    h('div.level-card',
      h('div.level-badge', String(lvl.level)),
      h('div', h('b', `Level ${lvl.level} · ${levelTitle(lvl.level)}`), h('div.progress', h('div.progress-fill', { style: { width: `${lvl.progress * 100}%` } })), h('small.muted', `${p.xp - lvl.cur} / ${lvl.next - lvl.cur} XP to level ${lvl.level + 1}`))),
    h('div.stat-row',
      h('div.stat', h('b', `${store.liveStreak()}🔥`), h('small', 'streak')),
      h('div.stat', h('b', String(p.bestStreak)), h('small', 'best streak')),
      h('div.stat', h('b', String(p.stats.lessons)), h('small', 'lessons')),
      h('div.stat', h('b', String(p.stats.spoken)), h('small', 'things said'))),
    h('div.stat-row',
      h('div.stat', h('b', `🇸🇦 ${learnedAr}`), h('small', 'Arabic items')),
      h('div.stat', h('b', `🇮🇹 ${learnedIt}`), h('small', 'Italian items')),
      h('div.stat', h('b', String(p.stats.traced)), h('small', 'letters written')),
      h('div.stat', h('b', String(p.stats.roleplays)), h('small', 'role-plays'))),
    h('h3', 'This week'),
    h('div.week-chart', { role: 'img', 'aria-label': 'XP earned over the last 7 days' }, hist.map((d) => h('div.bar-col', { title: `${d.day}: ${d.xp} XP` },
      h('div.bar', { style: { height: `${(d.xp / max) * 100}%` }, class: d.xp >= s.settings.dailyGoal ? 'met' : '' }),
      h('small', d.label)))),
    h('h3', 'Achievements'),
    h('div.ach-grid', ACHIEVEMENTS.map((a) => h(`div.ach${p.achievements[a.id] ? '.unlocked' : ''}`, { title: a.desc }, h('span.ach-icon', a.icon), h('div', h('b', a.title), h('small', a.desc))))),
    settingsPanel());
}

function settingsPanel() {
  const s = S().settings;
  const field = (label, control, help) => h('label.field', h('span.f-label', label), control, help ? h('small.muted', help) : null);
  const select = (val, opts, onchange) => h('select', { onchange: (e) => onchange(e.target.value) }, opts.map(([v, l]) => h('option', { value: v, selected: String(v) === String(val) }, l)));
  const set = (fn) => { store.update((st) => fn(st.settings)); applyTheme(); };
  const toggle = (val, onchange) => h('input', { type: 'checkbox', checked: val, onchange: (e) => onchange(e.target.checked) });

  const voiceSel = (code) => {
    if (nativeSpeech) return h('small.muted', `Uses your phone's ${LANGS[code].name} voice. No sound? Install it in your phone's text-to-speech settings.`);
    const vs = voicesFor(COURSES[code].meta.tts);
    if (!vs.length) return h('small.warn', `No ${LANGS[code].name} voice found on this device. Install one in your OS speech settings for audio.`);
    return select(s.voices[code] || '', [['', 'Automatic'], ...vs.map((v) => [v.name, `${v.name} (${v.lang})`])], (v) => set((x) => { x.voices[code] = v; }));
  };

  const keyInput = h('input', { type: 'password', value: s.apiKey, placeholder: 'sk-ant-…', autocomplete: 'off', onchange: (e) => set((x) => { x.apiKey = e.target.value.trim(); }) });
  const fileIn = h('input', { type: 'file', accept: 'application/json', hidden: true, onchange: async (e) => {
    const f = e.target.files[0];
    if (!f) return;
    try { store.import(await f.text()); toast('Progress restored!', 'good'); render(); } catch (err) { toast(err.message, 'bad'); }
  } });

  return h('div.settings',
    h('h3', 'Settings'),
    field('Daily goal', select(s.dailyGoal, [[20, 'Casual · 20 XP'], [50, 'Regular · 50 XP'], [100, 'Serious · 100 XP'], [150, 'Intense · 150 XP']], (v) => set((x) => { x.dailyGoal = Number(v); }))),
    field('Arabic transliteration', select(s.translit, [['auto', 'Auto (fade out as you learn the alphabet)'], ['always', 'Always show'], ['tap', 'Hidden — tap to reveal'], ['never', 'Never (read the script!)']], (v) => set((x) => { x.translit = v; })),
      'Transliteration helps at first, but reading the real script is the goal.'),
    field('Speech speed', select(s.rate, [[0.7, 'Slow'], [0.8, 'Relaxed'], [0.9, 'Normal'], [1, 'Native']], (v) => set((x) => { x.rate = Number(v); }))),
    field('Arabic voice', voiceSel('ar')),
    field('Italian voice', voiceSel('it')),
    h('div.row',
      h('button.btn.ghost.small', { type: 'button', onclick: () => say('مَرْحَبًا! كَيْفَ حَالُكَ؟', { l: 'ar' }) }, '🔊 Test Arabic'),
      h('button.btn.ghost.small', { type: 'button', onclick: () => say('Ciao! Come stai?', { l: 'it' }) }, '🔊 Test Italian')),
    field('Speaking exercises', toggle(s.speaking, (v) => set((x) => { x.speaking = v; })), 'Turn off when you can\'t talk out loud. Your speaking practice is the most valuable part, though!'),
    field('Sound effects', toggle(s.sfx, (v) => set((x) => { x.sfx = v; }))),
    field('Theme', select(s.theme, [['auto', 'Match system'], ['light', 'Light'], ['dark', 'Dark']], (v) => { set((x) => { x.theme = v; }); render(); })),
    field('Unlock all units', toggle(s.unlockAll, (v) => set((x) => { x.unlockAll = v; })), 'For learners who already know some of the language.'),
    h('h3', 'AI conversation partner (optional)'),
    field('Anthropic API key', keyInput, 'Stored only on this device and sent only to api.anthropic.com. Each conversation turn is billed to your API account.'),
    field('Model', select(s.aiModel, AI_MODELS.map((m) => [m.id, m.label]), (v) => set((x) => { x.aiModel = v; }))),
    h('h3', 'Your data'),
    h('div.row',
      h('button.btn.ghost.small', { type: 'button', onclick: async () => {
        if (isNative) {
          // File downloads don't work inside the app, so copy the backup instead.
          try { await navigator.clipboard.writeText(store.export()); toast('Backup copied — paste it into a note or email to keep it safe.', 'good', 4000); } catch { toast('Could not copy the backup.', 'bad'); }
          return;
        }
        const blob = new Blob([store.export()], { type: 'application/json' });
        const a = h('a', { href: URL.createObjectURL(blob), download: `lingua-path-backup-${new Date().toISOString().slice(0, 10)}.json` });
        a.click();
      } }, '⬇️ Export progress'),
      h('button.btn.ghost.small', { type: 'button', onclick: () => {
        if (!isNative) return fileIn.click();
        const text = window.prompt('Paste your backup text here:');
        if (!text) return;
        try { store.import(text); toast('Progress restored!', 'good'); render(); } catch (err) { toast(err.message, 'bad'); }
      } }, '⬆️ Import progress'), fileIn,
      h('button.btn.danger.small', { type: 'button', onclick: () => {
        const m = modal(h('div.center', h('h3', 'Reset all progress?'), h('p.muted', 'This deletes XP, streaks and all learned words for both languages. Export a backup first if unsure.'),
          h('div.row.center', h('button.btn.ghost', { type: 'button', onclick: () => m.close() }, 'Cancel'),
            h('button.btn.danger', { type: 'button', onclick: () => { m.close(); store.reset(); tab = 'learn'; render(); } }, 'Reset everything'))));
      } }, '🗑 Reset')),
    h('p.muted.small', 'Progress is saved automatically on this device. Use Export/Import to move it to another device.'));
}

// ---------------------------------------------------------------- boot

render();

if (isNative) {
  setupNativeShell();
} else if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

/** Native app chrome: Android back button and status bar colours. */
function setupNativeShell() {
  const App = plugin('App');
  const StatusBar = plugin('StatusBar');
  document.documentElement.classList.add('native');

  App?.addListener('backButton', () => {
    const modalClose = document.querySelector('.modal-wrap .modal-close');
    if (modalClose) return modalClose.click();
    const quit = document.querySelector('.player-head .icon-btn');
    if (quit) return quit.click();
    if (tab !== 'learn') { tab = 'learn'; render(); return; }
    App.minimizeApp?.().catch(() => {});
  });
  // A new day may have started while the app sat in the background.
  App?.addListener('resume', () => { if (lang() && !document.querySelector('.player, .modal-wrap')) render(); });

  const paintStatusBar = () => {
    if (!StatusBar) return;
    const bg = getComputedStyle(document.body).backgroundColor;
    const dark = document.documentElement.dataset.theme === 'dark'
      || (!document.documentElement.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
    StatusBar.setStyle({ style: dark ? 'DARK' : 'LIGHT' }).catch(() => {});
    if (platform() === 'android') StatusBar.setBackgroundColor({ color: rgbToHex(bg) }).catch(() => {});
  };
  paintStatusBar();
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', paintStatusBar);
  store.subscribe(() => setTimeout(paintStatusBar, 0));
}

function rgbToHex(rgb) {
  const m = rgb.match(/\d+/g) || [247, 248, 252];
  return '#' + m.slice(0, 3).map((n) => Number(n).toString(16).padStart(2, '0')).join('');
}
