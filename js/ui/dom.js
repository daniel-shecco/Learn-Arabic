// Minimal DOM helpers.

/**
 * h('div.card#id', {onclick, class, style, ...attrs}, ...children)
 * Children may be strings, nodes, arrays, or null/false (skipped).
 */
export function h(tag, attrs, ...children) {
  const [, name = 'div', rest = ''] = tag.match(/^([a-z0-9-]*)(.*)$/i);
  const el = document.createElement(name || 'div');
  for (const part of rest.match(/[.#][^.#]+/g) || []) {
    if (part[0] === '.') el.classList.add(part.slice(1));
    else el.id = part.slice(1);
  }
  if (attrs && (typeof attrs !== 'object' || attrs instanceof Node || Array.isArray(attrs))) {
    children.unshift(attrs);
    attrs = null;
  }
  for (const [k, v] of Object.entries(attrs || {})) {
    if (v == null || v === false) continue;
    if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'class') el.className += ' ' + v;
    else if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k === 'html') el.innerHTML = v;
    else if (k in el && typeof v !== 'string') el[k] = v;
    else el.setAttribute(k, v === true ? '' : v);
  }
  append(el, children);
  return el;
}

function append(el, children) {
  for (const c of children) {
    if (c == null || c === false) continue;
    if (Array.isArray(c)) append(el, c);
    else el.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  }
}

export function clear(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
  return el;
}

export function toast(msg, kind = 'info', ms = 2600) {
  let host = document.querySelector('.toasts');
  if (!host) { host = h('div.toasts', { role: 'status', 'aria-live': 'polite' }); document.body.appendChild(host); }
  const t = h(`div.toast.${kind}`, msg);
  host.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 400); }, ms);
}

export function modal(content, { onClose, className = '' } = {}) {
  const close = () => { wrap.remove(); onClose?.(); };
  const wrap = h('div.modal-wrap', { onclick: (e) => { if (e.target === wrap) close(); } },
    h(`div.modal ${className}`.trim().replace(' ', '.'), { role: 'dialog', 'aria-modal': 'true' },
      h('button.icon-btn.modal-close', { onclick: close, 'aria-label': 'Close' }, '✕'),
      content));
  document.body.appendChild(wrap);
  return { close, el: wrap };
}

/** Text in the target language with proper direction and font. */
export function tl(text, lang, cls = '') {
  return h(`span.tl${cls ? '.' + cls : ''}`, { lang, dir: lang === 'ar' ? 'rtl' : 'ltr' }, text);
}
