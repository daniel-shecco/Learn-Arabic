// Speech: text-to-speech (listening), speech recognition (speaking),
// and a recorder fallback so learners can compare themselves with the model.

// Inside the Capacitor app (Android / iOS), the WebView's speech APIs are
// missing or unreliable, so we use the native speech engines via plugins.
import { isNative as inApp, plugin } from './native.js';

const NativeTTS = plugin('TextToSpeech');
const NativeASR = plugin('SpeechRecognition');
// Use native speech only when both plugins are really there.
export const isNative = inApp && !!NativeTTS && !!NativeASR;

const synth = typeof window !== 'undefined' ? window.speechSynthesis : null;
let voices = [];

function loadVoices() {
  if (!synth) return;
  voices = synth.getVoices();
}
if (synth) {
  loadVoices();
  synth.addEventListener?.('voiceschanged', loadVoices);
}

export function ttsSupported() {
  return isNative || !!synth;
}

export function voicesFor(langCodes) {
  const prefixes = langCodes.map((c) => c.toLowerCase());
  return voices.filter((v) => prefixes.some((p) => v.lang.toLowerCase().replace('_', '-').startsWith(p)));
}

export function hasVoice(langCodes) {
  return voicesFor(langCodes).length > 0;
}

function pickVoice(langCodes, preferredName) {
  const list = voicesFor(langCodes);
  if (preferredName) {
    const v = list.find((x) => x.name === preferredName);
    if (v) return v;
  }
  // Prefer higher-quality (natural / online / premium) voices.
  const score = (v) => (/natural|neural|premium|enhanced|google/i.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1);
  return list.sort((a, b) => score(b) - score(a))[0] || null;
}

/**
 * Speak text. Resolves when finished (or on error / timeout).
 * @param {string} text
 * @param {{langs: string[], rate?: number, voice?: string}} opts
 */
export function speak(text, { langs, rate = 0.9, voice } = {}) {
  if (isNative) return nativeSpeak(text, langs, rate);
  return new Promise((resolve) => {
    if (!synth || !text) return resolve(false);
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    const v = pickVoice(langs, voice);
    if (v) u.voice = v;
    u.lang = v ? v.lang : langs[0];
    u.rate = rate;
    let done = false;
    const finish = (ok) => { if (!done) { done = true; resolve(ok); } };
    u.onend = () => finish(true);
    u.onerror = () => finish(false);
    // Some engines never fire onend; cap by estimated duration.
    setTimeout(() => finish(true), Math.max(2500, text.length * 180 / rate));
    synth.speak(u);
  });
}

async function nativeSpeak(text, langs, rate) {
  if (!text) return false;
  try {
    await NativeTTS.stop().catch(() => {});
    // Prefer the most specific supported locale (e.g. ar-SA, then ar).
    let lang = langs[0];
    for (const l of langs) {
      const { supported } = await NativeTTS.isLanguageSupported({ lang: l }).catch(() => ({ supported: false }));
      if (supported) { lang = l; break; }
    }
    await NativeTTS.speak({ text, lang, rate, pitch: 1, volume: 1, category: 'playback' });
    return true;
  } catch {
    return false;
  }
}

export function stopSpeaking() {
  if (isNative) { NativeTTS.stop().catch(() => {}); return; }
  synth?.cancel();
}

// ---------- Speech recognition ----------

const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

export function asrSupported() {
  return isNative || !!SR;
}

/**
 * Listen once. Resolves { transcripts: string[], error?: string }.
 * Returns a controller with .stop() to end early.
 */
export function listen(lang, opts = {}) {
  if (isNative) return nativeListen(lang, opts);
  return webListen(lang, opts);
}

function nativeListen(lang, { onInterim, maxMs = 8000 } = {}) {
  let stopFn = () => {};
  const promise = (async () => {
    try {
      const { available } = await NativeASR.available();
      if (!available) return { transcripts: [], error: 'unsupported' };
      let perm = await NativeASR.checkPermissions();
      if (perm.speechRecognition !== 'granted') perm = await NativeASR.requestPermissions();
      if (perm.speechRecognition !== 'granted') return { transcripts: [], error: 'not-allowed' };
    } catch {
      return { transcripts: [], error: 'unsupported' };
    }
    return new Promise((resolve) => {
      let matches = [];
      let settled = false;
      let silence;
      const handles = [];
      const finish = async (error) => {
        if (settled) return;
        settled = true;
        clearTimeout(maxTimer);
        clearTimeout(silence);
        await NativeASR.stop().catch(() => {});
        handles.forEach((h) => Promise.resolve(h.remove?.()).catch(() => {}));
        resolve({ transcripts: matches, error: matches.length ? undefined : error });
      };
      stopFn = () => finish('no-speech');
      const maxTimer = setTimeout(() => finish('no-speech'), maxMs);
      Promise.all([
        NativeASR.addListener('partialResults', (d) => {
          if (d?.matches?.length) {
            matches = d.matches.map((m) => m.trim()).filter(Boolean);
            onInterim?.(matches[0]);
            // Stop shortly after the learner stops talking.
            clearTimeout(silence);
            silence = setTimeout(() => finish(), 1400);
          }
        }),
        NativeASR.addListener('listeningState', (d) => { if (d?.status === 'stopped') setTimeout(() => finish('no-speech'), 300); }),
      ]).then((hs) => handles.push(...hs));
      NativeASR.start({ language: lang, maxResults: 5, partialResults: true, popup: false })
        .then((r) => { if (r?.matches?.length) { matches = r.matches; finish(); } })
        .catch(() => finish('start-failed'));
    });
  })();
  return { promise, stop: () => stopFn() };
}

function webListen(lang, { onInterim, maxMs = 8000 } = {}) {
  let rec;
  let stop = () => {};
  const promise = new Promise((resolve) => {
    if (!SR) return resolve({ transcripts: [], error: 'unsupported' });
    rec = new SR();
    rec.lang = lang;
    rec.interimResults = true;
    rec.maxAlternatives = 5;
    rec.continuous = false;
    const finals = [];
    let lastInterim = '';
    let settled = false;
    const finish = (error) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      const transcripts = finals.length ? finals : lastInterim ? [lastInterim] : [];
      resolve({ transcripts, error: transcripts.length ? undefined : error });
    };
    rec.onresult = (e) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const r = e.results[i];
        if (r.isFinal) {
          for (let j = 0; j < r.length; j++) finals.push(r[j].transcript.trim());
        } else {
          lastInterim = r[0].transcript.trim();
          onInterim?.(lastInterim);
        }
      }
    };
    rec.onerror = (e) => finish(e.error || 'error');
    rec.onend = () => finish('no-speech');
    const timer = setTimeout(() => { try { rec.stop(); } catch { /* already stopped */ } }, maxMs);
    stop = () => { try { rec.stop(); } catch { /* already stopped */ } };
    try { rec.start(); } catch (err) { finish('start-failed'); }
  });
  return { promise, stop: () => stop() };
}

// ---------- Recorder (fallback & self-comparison) ----------

export function recorderSupported() {
  return typeof navigator !== 'undefined' && !!navigator.mediaDevices?.getUserMedia && typeof MediaRecorder !== 'undefined';
}

export async function record(maxMs = 6000) {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const rec = new MediaRecorder(stream);
  const chunks = [];
  rec.ondataavailable = (e) => chunks.push(e.data);
  let stopFn;
  const done = new Promise((resolve) => {
    rec.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      resolve(URL.createObjectURL(new Blob(chunks, { type: rec.mimeType || 'audio/webm' })));
    };
  });
  rec.start();
  const timer = setTimeout(() => rec.state !== 'inactive' && rec.stop(), maxMs);
  stopFn = () => { clearTimeout(timer); if (rec.state !== 'inactive') rec.stop(); };
  return { done, stop: stopFn };
}
