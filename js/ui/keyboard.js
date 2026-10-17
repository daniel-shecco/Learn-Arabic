// On-screen keyboards: alphabetical Arabic keyboard (learner-friendly) and
// an Italian accent bar. Both insert at the caret of a target input.
import { h } from './dom.js';
import { ITALIAN_ACCENTS } from '../data/it/sounds.js';

const AR_ROWS = [
  ['ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر'],
  ['ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف'],
  ['ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي', 'ة', 'ى'],
  ['ء', 'أ', 'إ', 'آ', 'ؤ', 'ئ', '؟', '،'],
];
const AR_MARKS = [['َ', 'a'], ['ِ', 'i'], ['ُ', 'u'], ['ْ', '∅'], ['ّ', 'double'], ['ً', 'an']];

function insertAt(input, text) {
  const s = input.selectionStart ?? input.value.length;
  const e = input.selectionEnd ?? input.value.length;
  input.value = input.value.slice(0, s) + text + input.value.slice(e);
  const pos = s + text.length;
  input.setSelectionRange?.(pos, pos);
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

function backspace(input) {
  const s = input.selectionStart ?? input.value.length;
  const e = input.selectionEnd ?? input.value.length;
  if (s !== e) { input.value = input.value.slice(0, s) + input.value.slice(e); input.setSelectionRange?.(s, s); }
  else if (s > 0) {
    // Remove a whole code point (Arabic marks are separate code points, that's fine).
    input.value = input.value.slice(0, s - 1) + input.value.slice(s);
    input.setSelectionRange?.(s - 1, s - 1);
  }
  input.dispatchEvent(new Event('input', { bubbles: true }));
}

export function arabicKeyboard(input, { showMarks = false } = {}) {
  const key = (ch, label) => h('button.key', {
    type: 'button', lang: 'ar',
    onpointerdown: (e) => { e.preventDefault(); insertAt(input, ch); },
  }, label || ch);
  const marksRow = h('div.kb-row.marks', AR_MARKS.map(([m, t]) => h('button.key.mark', {
    type: 'button', title: t, onpointerdown: (e) => { e.preventDefault(); insertAt(input, m); },
  }, h('span', { lang: 'ar' }, '◌' + m))));
  marksRow.hidden = !showMarks;
  const kb = h('div.keyboard.ar', { dir: 'rtl' },
    AR_ROWS.map((row) => h('div.kb-row', row.map((c) => key(c)))),
    marksRow,
    h('div.kb-row',
      h('button.key.wide', { type: 'button', onpointerdown: (e) => { e.preventDefault(); backspace(input); }, 'aria-label': 'Backspace' }, '⌫'),
      h('button.key.space', { type: 'button', onpointerdown: (e) => { e.preventDefault(); insertAt(input, ' '); } }, 'space'),
      h('button.key.wide.small', { type: 'button', onpointerdown: (e) => { e.preventDefault(); marksRow.hidden = !marksRow.hidden; } }, 'ـَ vowels'),
    ));
  return kb;
}

export function italianAccentBar(input) {
  return h('div.accent-bar', ITALIAN_ACCENTS.map((c) => h('button.key', {
    type: 'button', onpointerdown: (e) => { e.preventDefault(); insertAt(input, c); },
  }, c)));
}
