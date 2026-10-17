// Exercise renderers. Each takes (ex, ctx) and returns an element.
// ctx: { lang, course, store, say(text,{slow}), showTranslit(), ready(fn), done(result),
//        next(), speakingOn(), disableSpeaking(), grade constants }
import { h, clear, tl, toast } from './dom.js';
import { checkTyped, scoreSpeech, sameSentence, shuffle, arabicForms, similarity, normalize } from '../text.js';
import { GRADE } from '../srs.js';
import { listen, asrSupported, recorderSupported, record } from '../speech.js';
import { arabicKeyboard, italianAccentBar } from './keyboard.js';
import { createTracer } from './tracer.js';
import { ARABIC_SCRIPT } from '../data/index.js';
import { sfx } from '../sfx.js';

const { LETTERS } = ARABIC_SCRIPT;

// ---------- shared bits ----------

function audioBtn(ctx, text, { slow = false, big = false, auto = false } = {}) {
  const b = h(`button.audio-btn${big ? '.big' : ''}${slow ? '.slow' : ''}`, {
    type: 'button', 'aria-label': slow ? 'Play slowly' : 'Play audio',
    onclick: async (e) => { e.stopPropagation(); b.classList.add('playing'); await ctx.say(text, { slow }); b.classList.remove('playing'); },
  }, slow ? '🐢' : '🔊');
  if (auto) setTimeout(() => b.click(), 250);
  return b;
}

function translitEl(ctx, tr) {
  if (!tr || ctx.lang !== 'ar') return null;
  const mode = ctx.showTranslit();
  if (mode === 'never') return null;
  const el = h('div.translit', tr);
  if (mode === 'tap') {
    el.classList.add('hidden-tr');
    el.title = 'Tap to reveal transliteration';
    el.addEventListener('click', () => el.classList.remove('hidden-tr'));
  }
  return el;
}

function prompt(text, sub) {
  return h('div.ex-prompt', h('h2', text), sub ? h('p.muted', sub) : null);
}

function solutionOf(item) {
  return { t: item.t, tr: item.tr, en: item.en, msa: item.msa || null };
}

/** “📜 Standard Arabic: …” line shown under spoken (Levantine) items. */
export function msaEl(ctx, msa) {
  if (!msa) return null;
  return h('div.msa', { title: 'Modern Standard Arabic — the written / formal form', onclick: (e) => { e.stopPropagation(); ctx.say(msa.t); } },
    h('span.msa-label', '📜 Standard: '), tl(msa.t, 'ar'), ctx.showTranslit() !== 'never' ? h('span.msa-tr', ` ${msa.tr}`) : null);
}

function choiceGrid(options, render, onSelect, { cols = 1 } = {}) {
  let selected = null;
  const grid = h(`div.choices.cols-${cols}`);
  options.forEach((opt, i) => {
    const btn = h('button.choice', { type: 'button', onclick: () => {
      grid.querySelectorAll('.choice').forEach((c) => c.classList.remove('selected'));
      btn.classList.add('selected');
      selected = opt;
      sfx.tap();
      onSelect(opt, btn);
    } }, h('span.kbd-hint', String(i + 1)), render(opt));
    grid.appendChild(btn);
  });
  grid.selected = () => selected;
  grid.mark = (isRight) => {
    grid.querySelectorAll('.choice').forEach((c, i) => {
      c.disabled = true;
      if (isRight(options[i])) c.classList.add('right');
      else if (options[i] === selected) c.classList.add('wrong');
    });
  };
  return grid;
}

// ---------- vocabulary & phrases ----------

export function intro(ex, ctx) {
  const it = ex.item;
  ctx.next();
  return h('div.ex.intro',
    h('div.badge.new', ex.item.kind === 'phrase' ? 'New phrase' : 'New word'),
    h('div.intro-card',
      it.e ? h('div.emoji', it.e) : null,
      h('div.target-row', tl(it.t, ctx.lang, 'xl'), audioBtn(ctx, it.t, { auto: true }), audioBtn(ctx, it.t, { slow: true })),
      translitEl(ctx, it.tr),
      h('div.meaning', it.en),
      msaEl(ctx, it.msa),
      it.n ? h('div.note', '💡 ', it.n) : null),
    ctx.speakingOn() ? miniMic(ctx, it) : null);
}

/** Optional ungraded pronunciation try on intro cards. */
function miniMic(ctx, item) {
  if (!asrSupported()) return null;
  const out = h('div.mini-mic-out');
  const btn = h('button.btn.ghost', { type: 'button', onclick: async () => {
    btn.disabled = true; btn.textContent = '🎙️ Listening…';
    const { promise } = listen(ctx.course.meta.asr);
    const { transcripts } = await promise;
    btn.disabled = false; btn.textContent = '🎤 Try saying it';
    if (!transcripts.length) { out.textContent = "Didn't catch that — try again."; return; }
    const r = scoreSpeech(transcripts, [item.t, ...item.alt], ctx.lang);
    out.textContent = r.score >= 0.8 ? '✅ Great pronunciation!' : r.score >= 0.6 ? '👍 Close! Listen again and repeat.' : `🤔 I heard “${r.heard}”`;
  } }, '🎤 Try saying it');
  return h('div.mini-mic', btn, out);
}

export function listenChoose(ex, ctx) {
  const it = ex.item;
  const grid = choiceGrid(ex.options, (o) => h('span', o.en), () => ctx.ready(check), { cols: 2 });
  function check() {
    const right = grid.selected().id === it.id;
    grid.mark((o) => o.id === it.id);
    return { correct: right, grades: [{ id: it.id, q: right ? GRADE.GOOD : GRADE.AGAIN }], solution: solutionOf(it), kind: 'listen' };
  }
  return h('div.ex', prompt('What do you hear?'),
    h('div.center', audioBtn(ctx, it.t, { big: true, auto: true }), audioBtn(ctx, it.t, { slow: true })),
    grid);
}

export function readChoose(ex, ctx) {
  const it = ex.item;
  const grid = choiceGrid(ex.options, (o) => h('span', o.en), () => ctx.ready(check), { cols: 2 });
  function check() {
    const right = grid.selected().id === it.id;
    grid.mark((o) => o.id === it.id);
    ctx.say(it.t);
    return { correct: right, grades: [{ id: it.id, q: right ? GRADE.GOOD : GRADE.AGAIN }], solution: solutionOf(it), kind: 'read' };
  }
  return h('div.ex', prompt('What does this mean?'),
    h('div.read-card', it.e ? h('span.emoji.sm', it.e) : null, tl(it.t, ctx.lang, 'xl'), translitEl(ctx, it.tr)),
    grid);
}

export function chooseTarget(ex, ctx) {
  const it = ex.item;
  const grid = choiceGrid(ex.options, (o) => h('span.opt-target', tl(o.t, ctx.lang), ctx.showTranslit() === 'always' && o.tr ? h('small.translit', o.tr) : null),
    (o) => { ctx.say(o.t); ctx.ready(check); });
  function check() {
    const right = grid.selected().id === it.id;
    grid.mark((o) => o.id === it.id);
    return { correct: right, grades: [{ id: it.id, q: right ? GRADE.GOOD : GRADE.AGAIN }], solution: solutionOf(it), kind: 'recall' };
  }
  return h('div.ex', prompt(`How do you say “${it.en}”?`), grid);
}

export function match(ex, ctx) {
  const left = shuffle(ex.pairs);
  const right = shuffle(ex.pairs);
  const mistakes = new Set();
  let selL = null, selR = null, matched = 0;
  const colL = h('div.match-col');
  const colR = h('div.match-col');
  const tryMatch = () => {
    if (!selL || !selR) return;
    const a = selL, b = selR;
    if (a.dataset.id === b.dataset.id) {
      a.classList.add('matched'); b.classList.add('matched');
      a.disabled = b.disabled = true;
      sfx.correct();
      matched++;
      if (matched === ex.pairs.length) {
        ctx.done({
          correct: mistakes.size === 0,
          soft: true,
          grades: ex.pairs.map((p) => ({ id: p.id, q: mistakes.has(p.id) ? GRADE.HARD : GRADE.GOOD })),
          kind: 'match',
        });
      }
    } else {
      mistakes.add(a.dataset.id); mistakes.add(b.dataset.id);
      a.classList.add('shake'); b.classList.add('shake');
      sfx.wrong();
      setTimeout(() => { a.classList.remove('shake', 'sel'); b.classList.remove('shake', 'sel'); }, 400);
    }
    selL = selR = null;
  };
  left.forEach((p) => colL.appendChild(h('button.match-btn', { type: 'button', 'data-id': p.id, onclick: (e) => {
    colL.querySelectorAll('.sel').forEach((x) => x.classList.remove('sel'));
    selL = e.currentTarget; selL.classList.add('sel'); ctx.say(p.t); tryMatch();
  } }, tl(p.t, ctx.lang))));
  right.forEach((p) => colR.appendChild(h('button.match-btn', { type: 'button', 'data-id': p.id, onclick: (e) => {
    colR.querySelectorAll('.sel').forEach((x) => x.classList.remove('sel'));
    selR = e.currentTarget; selR.classList.add('sel'); tryMatch();
  } }, p.en)));
  return h('div.ex', prompt('Match the pairs'), h('div.match', colL, colR));
}

export function build(ex, ctx) {
  const it = ex.item;
  const answer = h('div.build-answer', { dir: ctx.lang === 'ar' ? 'rtl' : 'ltr', lang: ctx.lang });
  const bank = h('div.build-bank', { dir: ctx.lang === 'ar' ? 'rtl' : 'ltr', lang: ctx.lang });
  const chosen = [];
  const sync = () => (chosen.length ? ctx.ready(check) : ctx.ready(null));
  ex.tiles.forEach((w) => {
    const tile = h('button.tile', { type: 'button', onclick: () => {
      if (tile.parentNode === bank) {
        const ph = h('span.tile-ph'); bank.replaceChild(ph, tile); tile._ph = ph;
        answer.appendChild(tile); chosen.push(tile); ctx.say(w);
      } else {
        answer.removeChild(tile); bank.replaceChild(tile, tile._ph); chosen.splice(chosen.indexOf(tile), 1);
      }
      sfx.tap(); sync();
    } }, w);
    bank.appendChild(tile);
  });
  function check() {
    const given = chosen.map((t) => t.textContent).join(' ');
    const right = [it.t, ...it.alt].some((a) => sameSentence(given, a, ctx.lang));
    bank.querySelectorAll('.tile').forEach((t) => (t.disabled = true));
    answer.querySelectorAll('.tile').forEach((t) => (t.disabled = true));
    return { correct: right, grades: it.id ? [{ id: it.id, q: right ? GRADE.GOOD : GRADE.AGAIN }] : [], solution: solutionOf(it), kind: 'build' };
  }
  const head = ex.mode === 'listen'
    ? [prompt('Tap what you hear'), h('div.center', audioBtn(ctx, it.t, { big: true, auto: true }), audioBtn(ctx, it.t, { slow: true }))]
    : [prompt('Translate this sentence'), h('div.source', it.e ? h('span.emoji.sm', it.e) : null, it.en)];
  return h('div.ex', head, answer, bank);
}

function typingInput(ctx) {
  const input = h('input.type-input', {
    type: 'text', autocomplete: 'off', autocapitalize: 'off', spellcheck: false, autocorrect: 'off',
    dir: ctx.lang === 'ar' ? 'rtl' : 'ltr', lang: ctx.lang,
    placeholder: ctx.lang === 'ar' ? 'اُكْتُبْ هُنَا…' : 'Scrivi qui…',
  });
  let helper;
  if (ctx.lang === 'ar') {
    helper = arabicKeyboard(input);
    input.setAttribute('inputmode', 'none');
    const toggle = h('button.link-btn', { type: 'button', onclick: () => {
      const usingDevice = input.getAttribute('inputmode') !== 'none';
      input.setAttribute('inputmode', usingDevice ? 'none' : 'text');
      helper.hidden = !usingDevice;
      toggle.textContent = usingDevice ? '⌨️ Use my device keyboard' : '🔤 Use on-screen Arabic keyboard';
      input.focus();
    } }, '⌨️ Use my device keyboard');
    return { input, extras: [helper, toggle] };
  }
  helper = italianAccentBar(input);
  return { input, extras: [helper] };
}

export function typeAnswer(ex, ctx) {
  const it = ex.item;
  const { input, extras } = typingInput(ctx);
  input.addEventListener('input', () => ctx.ready(input.value.trim() ? check : null));
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && input.value.trim()) { e.preventDefault(); ctx.submit(); } });
  function check() {
    const r = checkTyped(input.value, [it.t, ...it.alt], ctx.lang);
    input.disabled = true;
    const ok = r.result !== 'wrong';
    const q = r.result === 'correct' ? GRADE.EASY : ok ? GRADE.HARD : GRADE.AGAIN;
    const msg = r.result === 'accent' ? 'Watch the accents!' : r.result === 'typo' ? 'Almost — small typo.' : '';
    return { correct: ok, grades: it.id ? [{ id: it.id, q }] : [], solution: solutionOf(it), message: msg, kind: 'type' };
  }
  setTimeout(() => input.focus({ preventScroll: true }), 50);
  const head = ex.mode === 'dictation'
    ? [prompt('Type what you hear'), h('div.center', audioBtn(ctx, it.t, { big: true, auto: true }), audioBtn(ctx, it.t, { slow: true }))]
    : [prompt(`Write this in ${ctx.course.meta.name}`), h('div.source', it.e ? h('span.emoji.sm', it.e) : null, it.en)];
  return h('div.ex', head, input, ...extras);
}

// ---------- speaking ----------

/**
 * Shared speech-check widget. Calls onResult({score, heard, wordDiff}) or onFallback.
 */
function micWidget(ctx, accepted, { onPass, onFail, attemptsBeforeHelp = 2 } = {}) {
  const status = h('div.mic-status', 'Tap the microphone and speak');
  const chips = h('div.word-chips');
  const helpRow = h('div.mic-help');
  let attempts = 0;
  let ctrl = null;
  const mic = h('button.mic', { type: 'button', 'aria-label': 'Speak', onclick: async () => {
    if (ctrl) { ctrl.stop(); return; }
    mic.classList.add('rec');
    status.textContent = 'Listening… speak now';
    ctrl = listen(ctx.course.meta.asr, { onInterim: (t) => { status.textContent = `“${t}”`; } });
    const { transcripts, error } = await ctrl.promise;
    ctrl = null;
    mic.classList.remove('rec');
    if (!transcripts.length) {
      status.textContent = error === 'not-allowed' ? '🔒 Microphone blocked — allow it in your browser settings.' : "I didn't hear anything. Try again, a bit louder.";
      if (error === 'not-allowed') showHelp(true);
      return;
    }
    attempts++;
    const r = scoreSpeech(transcripts, accepted, ctx.lang);
    clear(chips);
    r.wordDiff.forEach((w) => chips.appendChild(h(`span.chip.${w.ok ? 'ok' : 'miss'}`, { lang: ctx.lang }, w.word)));
    if (r.score >= 0.8) { status.textContent = '✅ Excellent!'; onPass(r, attempts); }
    else if (r.score >= 0.62) { status.textContent = '👍 Good enough — keep polishing it!'; onPass(r, attempts, true); }
    else {
      status.textContent = `I heard: “${r.heard}”. Listen and try again.`;
      sfx.wrong();
      if (attempts >= attemptsBeforeHelp) showHelp();
    }
  } }, '🎤');
  function showHelp(blocked) {
    clear(helpRow);
    helpRow.append(
      h('button.btn.ghost.small', { type: 'button', onclick: () => onPass({ score: 0.7, heard: '' }, attempts, true, true) }, '✋ I said it correctly'),
      h('button.btn.ghost.small', { type: 'button', onclick: () => onFail?.() }, blocked ? 'Skip' : 'Skip this one'));
  }
  return h('div.mic-wrap', mic, status, chips, helpRow);
}

/** Recorder-based self check when speech recognition is unavailable. */
function selfCheckWidget(ctx, item, onDone) {
  const out = h('div.selfcheck');
  if (!recorderSupported()) {
    out.append(h('p.muted', 'Say it out loud, then compare with the audio.'),
      h('div.row', h('button.btn.ghost', { type: 'button', onclick: () => onDone(true) }, '😊 I said it well'), h('button.btn.ghost', { type: 'button', onclick: () => onDone(false) }, '😬 Need more practice')));
    return out;
  }
  const recBtn = h('button.mic', { type: 'button', onclick: async () => {
    recBtn.classList.add('rec');
    try {
      const r = await record(5000);
      recBtn.onclick = () => r.stop();
      const url = await r.done;
      recBtn.classList.remove('rec');
      clear(out);
      out.append(h('p', 'Compare your recording with the model:'),
        h('div.row', h('button.btn.ghost', { type: 'button', onclick: () => new Audio(url).play() }, '▶️ Me'), audioBtn(ctx, item.t)),
        h('div.row', h('button.btn', { type: 'button', onclick: () => onDone(true) }, '😊 Sounded right'), h('button.btn.ghost', { type: 'button', onclick: () => onDone(false) }, '😬 Try again later')));
    } catch {
      recBtn.classList.remove('rec');
      toast('Microphone not available', 'warn');
      onDone(false);
    }
  } }, '⏺️');
  out.append(h('p.muted', 'Speech recognition isn\'t supported in this browser — record yourself and compare.'), recBtn);
  return out;
}

export function speakEx(ex, ctx) {
  const it = ex.item;
  const accepted = [it.t, ...(it.alt || [])];
  const repeat = ex.mode === 'repeat';
  const finish = (ok, quality) => ctx.done({ correct: ok, grades: it.id ? [{ id: it.id, q: quality }] : [], solution: solutionOf(it), kind: 'speak' });
  const reveal = h('div.speak-reveal');
  const showTarget = () => { clear(reveal); reveal.append(h('div.target-row', tl(it.t, ctx.lang, 'lg'), audioBtn(ctx, it.t)), translitEl(ctx, it.tr)); };

  const widget = asrSupported()
    ? micWidget(ctx, accepted, {
      onPass: (r, attempts, close, manual) => { if (!repeat) showTarget(); finish(true, manual || close || attempts > 1 ? GRADE.HARD : repeat ? GRADE.GOOD : GRADE.EASY); },
      onFail: () => { showTarget(); finish(false, GRADE.AGAIN); },
    })
    : selfCheckWidget(ctx, it, (ok) => finish(ok, ok ? GRADE.GOOD : GRADE.AGAIN));

  const skip = h('button.link-btn', { type: 'button', onclick: () => { ctx.disableSpeaking(); ctx.skip(); } }, "🔇 Can't speak now");
  if (repeat) {
    showTarget();
    setTimeout(() => ctx.say(it.t), 250);
    return h('div.ex', prompt('Say this out loud', 'Listen, then repeat — copy the rhythm and melody.'), reveal, h('div.meaning.small', it.en), widget, skip);
  }
  const hint = h('button.link-btn', { type: 'button', onclick: () => { showTarget(); ctx.say(it.t); hint.remove(); ctx.hinted = true; } }, '💡 Show me');
  return h('div.ex', prompt('Say this in ' + ctx.course.meta.name), h('div.source', it.e ? h('span.emoji.sm', it.e) : null, it.en), reveal, widget, h('div.row.center', hint, skip));
}

// ---------- dialogue & roleplay ----------

export function dialogue(ex, ctx) {
  const d = ex.unit.dialogue;
  const speakers = [...new Set(d.lines.map((l) => l.who))];
  const lines = d.lines.map((l) => {
    const trans = h('div.bubble-en', l.en);
    trans.hidden = true;
    const b = h(`div.bubble.${speakers.indexOf(l.who) === 0 ? 'left' : 'right'}`, { onclick: () => { ctx.say(l.t); trans.hidden = false; } },
      h('div.who', l.who), tl(l.t, ctx.lang, 'md'), translitEl(ctx, l.tr), trans);
    return b;
  });
  let playing = false;
  const playAll = h('button.btn.ghost', { type: 'button', onclick: async () => {
    if (playing) return;
    playing = true;
    for (const [i, l] of d.lines.entries()) {
      lines.forEach((x) => x.classList.remove('active'));
      lines[i].classList.add('active');
      lines[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      await ctx.say(l.t);
      await new Promise((r) => setTimeout(r, 350));
    }
    lines.forEach((x) => x.classList.remove('active'));
    playing = false;
  } }, '▶️ Play conversation');
  const showAll = h('button.btn.ghost', { type: 'button', onclick: () => lines.forEach((b) => (b.querySelector('.bubble-en').hidden = false)) }, '🔤 Show translations');

  const answers = new Array(d.questions.length).fill(null);
  const qs = d.questions.map((q, qi) => {
    const opts = shuffle(q.options.map((text, i) => ({ text, right: i === q.a })));
    const grid = choiceGrid(opts, (o) => h('span', o.text), (o) => { answers[qi] = { o, grid }; if (answers.every(Boolean)) ctx.ready(check); });
    return h('div.question', h('p.q', `${qi + 1}. ${q.q}`), grid);
  });
  function check() {
    const allRight = answers.every((a) => a.o.right);
    answers.forEach((a) => a.grid.mark((o) => o.right));
    return { correct: allRight, grades: [], kind: 'dialogue', message: allRight ? 'You understood the whole conversation!' : 'Re-read the conversation — tap lines to hear and translate them.' };
  }
  return h('div.ex.dialogue',
    prompt('Listen to the conversation', `${d.scene} Tap any line to hear it and see the translation.`),
    h('div.row.center', playAll, showAll),
    h('div.chat', lines),
    h('div.questions', h('h3', 'Did you understand?'), qs));
}

export function roleplay(ex, ctx, { typed = false } = {}) {
  const rp = ex.unit.roleplay;
  const chat = h('div.chat');
  const turnArea = h('div.turn-area');
  let i = 0, hints = 0, fails = 0;

  const bubble = (side, t, tr, en) => {
    const trans = h('div.bubble-en', en); trans.hidden = side === 'left';
    return h(`div.bubble.${side}`, { onclick: () => { ctx.say(t); trans.hidden = false; } }, tl(t, ctx.lang, 'md'), translitEl(ctx, tr), trans);
  };

  async function nextTurn() {
    if (i >= rp.turns.length) {
      clear(turnArea);
      ctx.done({ correct: true, soft: true, grades: [], kind: 'roleplay', message: hints === 0 && fails === 0 ? 'Flawless conversation! 🎉' : 'Conversation complete!' });
      return;
    }
    const turn = rp.turns[i];
    chat.appendChild(bubble('left', turn.partner.t, turn.partner.tr, turn.partner.en));
    chat.lastChild.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    await ctx.say(turn.partner.t);
    renderTurn(turn);
  }

  function accept(turn, said) {
    clear(turnArea);
    chat.appendChild(bubble('right', said || turn.answers[0], said ? '' : turn.answerTr, ''));
    sfx.correct();
    i++;
    setTimeout(nextTurn, 600);
  }

  function renderTurn(turn) {
    clear(turnArea);
    const hintBox = h('div.hint-box');
    const hintBtn = h('button.link-btn', { type: 'button', onclick: () => {
      hints++;
      clear(hintBox);
      hintBox.append(h('div.target-row', tl(turn.answers[0], ctx.lang, 'md'), audioBtn(ctx, turn.answers[0])), translitEl(ctx, turn.answerTr));
      ctx.say(turn.answers[0]);
    } }, '💡 Hint');
    const replay = h('button.link-btn', { type: 'button', onclick: () => ctx.say(turn.partner.t) }, '🔁 Hear again');
    if (typed || !asrSupported()) {
      const { input: inp, extras } = typingInput(ctx);
      const send = h('button.btn', { type: 'button', onclick: () => {
        const v = inp.value.trim();
        if (!v) return;
        const ok = turn.answers.some((a) => similarity(normalize(v, ctx.lang), normalize(a, ctx.lang)) >= 0.75);
        if (ok) accept(turn, v);
        else { fails++; sfx.wrong(); inp.classList.add('shake'); setTimeout(() => inp.classList.remove('shake'), 400); toast('Not quite — try the hint!', 'warn'); }
      } }, 'Send');
      inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') send.click(); });
      turnArea.append(h('div.cue', '🎯 ', turn.cue), hintBox, h('div.row', inp, send), ...extras, h('div.row.center', hintBtn, replay));
      setTimeout(() => inp.focus({ preventScroll: true }), 50);
      return;
    }
    const widget = micWidget(ctx, turn.answers, {
      attemptsBeforeHelp: 2,
      onPass: (r, attempts, close, manual) => { if (attempts > 1 || close) fails++; accept(turn, manual ? '' : r.heard); },
      onFail: () => { fails++; accept(turn, ''); },
    });
    turnArea.append(h('div.cue', '🎯 Your turn: ', turn.cue), hintBox, widget, h('div.row.center', hintBtn, replay,
      h('button.link-btn', { type: 'button', onclick: () => { typed = true; renderTurn(turn); } }, '⌨️ Type instead')));
  }

  setTimeout(nextTurn, 300);
  return h('div.ex.roleplay', prompt('Role-play', rp.scene), chat, turnArea);
}

// ---------- Arabic script ----------

function formsTable(ch) {
  const L = LETTERS[ch];
  if (L.standalone) return h('p.muted', 'Hamza usually sits on a “seat” letter: أ إ ؤ ئ — or alone on the line: ء');
  const f = arabicForms(ch, L.connects);
  const cells = [['isolated', 'alone'], ['final', 'end'], ['medial', 'middle'], ['initial', 'start']];
  return h('div.forms',
    cells.map(([k, label]) => h('div.form-cell', h('span.glyph', { lang: 'ar' }, f[k]), h('small', label))),
    !L.connects ? h('p.note', '⚠️ This letter never joins to the letter after it (on its left).') : null);
}

export function letterIntro(ex, ctx) {
  const L = LETTERS[ex.letter];
  ctx.next();
  setTimeout(() => ctx.say(L.ar), 250);
  return h('div.ex.letter-intro',
    h('div.badge.new', 'New letter'),
    h('div.big-glyph', { lang: 'ar' }, ex.letter),
    h('div.target-row', h('span.letter-name', `${L.name} `), tl(L.ar, 'ar'), audioBtn(ctx, L.ar)),
    h('div.sound', h('b', `/${L.tr}/ `), L.sound),
    formsTable(ex.letter),
    h('div.example', h('span.muted', 'Example: '), tl(L.ex[0], 'ar', 'lg'), audioBtn(ctx, L.ex[0]), h('span', ` ${L.ex[1]} — ${L.ex[2]}`)),
    h('div.note', '✍️ ', L.tip));
}

export function vowelIntro(ex, ctx) {
  const v = ex.vowel;
  ctx.next();
  setTimeout(() => ctx.say(v.sample), 250);
  return h('div.ex.letter-intro',
    h('div.badge.new', 'New mark'),
    h('div.big-glyph', { lang: 'ar' }, '◌' + v.mark),
    h('div.target-row', h('span.letter-name', `${v.name} `), tl(v.ar, 'ar')),
    h('div.sound', h('b', `/${v.tr}/ `), v.desc),
    h('div.example', h('span.muted', 'Example: '), tl(v.sample, 'ar', 'xl'), audioBtn(ctx, v.sample), h('span', ` = ${v.sampleTr}`)));
}

export function trace(ex, ctx, { memory = false } = {}) {
  const L = LETTERS[ex.letter];
  const tracer = createTracer({ glyph: ex.letter, guide: !memory, onStroke: () => ctx.ready(check) });
  function check() {
    const s = tracer.score();
    if (memory) tracer.reveal();
    const pass = s >= (memory ? 0.42 : 0.55);
    ctx.store.state.profile.stats.traced++;
    return {
      correct: pass, soft: true, grades: [], kind: 'write',
      message: `Shape match: ${Math.round(s * 100)}%` + (pass ? '' : memory ? ' — compare with the green model and try again next time.' : ' — trace over the grey letter more closely.'),
    };
  }
  return h('div.ex.trace',
    prompt(memory ? `Write ${L.name} from memory` : `Trace the letter ${L.name}`, memory ? `Sound: /${L.tr}/ — ${L.sound}` : L.tip),
    h('div.center', tracer.el),
    h('div.row.center',
      h('button.btn.ghost.small', { type: 'button', onclick: () => tracer.undo() }, '↶ Undo'),
      h('button.btn.ghost.small', { type: 'button', onclick: () => tracer.clear() }, '🗑 Clear'),
      audioBtn(ctx, L.ar)));
}

export function letterListen(ex, ctx) {
  const L = LETTERS[ex.letter];
  const sound = L.final || L.standalone ? L.ar : ex.letter + 'َا';
  const grid = choiceGrid(ex.options, (o) => h('span.glyph-opt', { lang: 'ar' }, o), () => ctx.ready(check), { cols: 4 });
  function check() {
    const right = grid.selected() === ex.letter;
    grid.mark((o) => o === ex.letter);
    return { correct: right, soft: false, grades: [], solution: { t: ex.letter, tr: `${L.name} /${L.tr}/`, en: L.sound }, kind: 'script' };
  }
  return h('div.ex', prompt('Which letter makes this sound?'), h('div.center', audioBtn(ctx, sound, { big: true, auto: true }), audioBtn(ctx, sound, { slow: true })), grid);
}

export function letterName(ex, ctx) {
  const grid = choiceGrid(ex.options, (o) => h('span', `${LETTERS[o].name}  /${LETTERS[o].tr}/`), () => ctx.ready(check), { cols: 2 });
  function check() {
    const right = grid.selected() === ex.letter;
    grid.mark((o) => o === ex.letter);
    ctx.say(LETTERS[ex.letter].ar);
    return { correct: right, grades: [], solution: { t: ex.letter, tr: LETTERS[ex.letter].name, en: LETTERS[ex.letter].sound }, kind: 'script' };
  }
  return h('div.ex', prompt('Which letter is this?'), h('div.big-glyph', { lang: 'ar' }, ex.letter), grid);
}

export function letterForms(ex, ctx) {
  const L = LETTERS[ex.letter];
  const others = shuffle(Object.keys(LETTERS).filter((k) => k !== ex.letter && !LETTERS[k].standalone && !LETTERS[k].final)).slice(0, 3);
  const opts = shuffle([ex.letter, ...others]);
  const label = { initial: 'at the START of a word', medial: 'in the MIDDLE of a word', final: 'at the END of a word' }[ex.form];
  const grid = choiceGrid(opts, (o) => h('span.glyph-opt', { lang: 'ar' }, arabicForms(o, LETTERS[o].connects)[ex.form]), () => ctx.ready(check), { cols: 4 });
  function check() {
    const right = grid.selected() === ex.letter;
    grid.mark((o) => o === ex.letter);
    return { correct: right, grades: [], solution: { t: arabicForms(ex.letter, L.connects)[ex.form], tr: L.name, en: `${L.name} ${label}` }, kind: 'script' };
  }
  return h('div.ex', prompt(`Find ${L.name} (${ex.letter}) ${label}`, 'Letters change shape depending on where they sit in a word.'), grid);
}

export function readSyllable(ex, ctx) {
  const [ar] = ex.syl;
  const grid = choiceGrid(ex.options, (o) => h('span', o[1]), () => ctx.ready(check), { cols: 2 });
  function check() {
    const right = grid.selected()[1] === ex.syl[1];
    grid.mark((o) => o[1] === ex.syl[1]);
    ctx.say(ar);
    return { correct: right, grades: [], solution: { t: ar, tr: ex.syl[1], en: '' }, kind: 'read' };
  }
  return h('div.ex', prompt('How do you read this?'), h('div.big-glyph', { lang: 'ar' }, ar), grid);
}

export function readWord(ex, ctx) {
  const [ar, tr, en] = ex.word;
  const grid = choiceGrid(ex.options, (o) => h('span', o[1]), () => ctx.ready(check), { cols: 2 });
  function check() {
    const right = grid.selected()[1] === tr;
    grid.mark((o) => o[1] === tr);
    ctx.say(ar);
    return { correct: right, grades: [], solution: { t: ar, tr, en }, kind: 'read' };
  }
  return h('div.ex', prompt('Read this word', 'Sound it out letter by letter, right to left.'), h('div.read-card', tl(ar, 'ar', 'xl')), grid);
}

export function spotLetter(ex, ctx) {
  const [ar, tr, en] = ex.word;
  const absent = shuffle(Object.keys(LETTERS).filter((k) => !ar.includes(k) && k !== 'ء')).slice(0, 3);
  const opts = shuffle([ex.letter, ...absent]);
  const grid = choiceGrid(opts, (o) => h('span.glyph-opt', { lang: 'ar' }, o), () => ctx.ready(check), { cols: 4 });
  function check() {
    const right = grid.selected() === ex.letter;
    grid.mark((o) => o === ex.letter);
    ctx.say(ar);
    return { correct: right, grades: [], solution: { t: ar, tr, en: `${en} — contains ${LETTERS[ex.letter].name}` }, kind: 'read' };
  }
  return h('div.ex', prompt('Which letter is hiding in this word?'), h('div.read-card', tl(ar, 'ar', 'xl')), grid);
}

export function scriptDictation(ex, ctx) {
  const [ar, tr, en] = ex.word;
  const el = typeAnswer({ mode: 'dictation', item: { id: null, t: ar, tr, en, alt: [], e: '' } }, ctx);
  el.querySelector('.ex-prompt h2').textContent = 'Write the word you hear';
  el.querySelector('.ex-prompt').appendChild(h('p.muted', `Sounds like: ${tr} (${en})`));
  return el;
}

// ---------- Italian sounds ----------

export function rule(ex, ctx) {
  const g = ex.group;
  ctx.next();
  return h('div.ex.rule',
    h('div.badge.new', 'Sound rule'),
    h('h2', g.title),
    h('div.grammar', { html: g.rule }),
    h('div.examples', g.examples.map(([w, en]) => h('button.example-chip', { type: 'button', onclick: () => ctx.say(w) }, h('b', w), h('small', en)))));
}

export function minimalPair(ex, ctx) {
  const grid = choiceGrid(ex.pair, (o) => h('span.lg', o), () => ctx.ready(check), { cols: 2 });
  function check() {
    const right = grid.selected() === ex.target;
    grid.mark((o) => o === ex.target);
    return { correct: right, grades: [], solution: { t: ex.target, tr: '', en: 'Listen to both: tap the buttons below.' }, kind: 'listen', extra: ex.pair };
  }
  return h('div.ex', prompt('Which word do you hear?', 'Listen carefully — the difference is small but important.'),
    h('div.center', audioBtn(ctx, ex.target, { big: true, auto: true }), audioBtn(ctx, ex.target, { slow: true })), grid);
}

export const RENDERERS = {
  intro, listen_choose: listenChoose, read_choose: readChoose, choose_target: chooseTarget, match, build,
  type: typeAnswer, speak: speakEx, dialogue, roleplay, roleplay_text: (ex, ctx) => roleplay(ex, ctx, { typed: true }),
  letter_intro: letterIntro, vowel_intro: vowelIntro, trace, write_memory: (ex, ctx) => trace(ex, ctx, { memory: true }),
  letter_listen: letterListen, letter_name: letterName, letter_forms: letterForms, read_syllable: readSyllable,
  read_word: readWord, spot_letter: spotLetter, script_dictation: scriptDictation, rule, minimal_pair: minimalPair,
};

