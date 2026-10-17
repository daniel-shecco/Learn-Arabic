// Speech: text-to-speech (listening), speech recognition (speaking),
// and a recorder fallback so learners can compare themselves with the model.

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
  return !!synth;
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

export function stopSpeaking() {
  synth?.cancel();
}

// ---------- Speech recognition ----------

const SR = typeof window !== 'undefined' ? (window.SpeechRecognition || window.webkitSpeechRecognition) : null;

export function asrSupported() {
  return !!SR;
}

/**
 * Listen once. Resolves { transcripts: string[], error?: string }.
 * Returns a controller with .stop() to end early.
 */
export function listen(lang, { onInterim, maxMs = 8000 } = {}) {
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
