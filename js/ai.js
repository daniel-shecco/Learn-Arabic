// Optional AI conversation partner (bring-your-own Anthropic API key).
// The SDK is loaded lazily from a CDN only when this feature is used, so the
// rest of the app keeps working offline and without a key.

const SDK_URL = 'https://cdn.jsdelivr.net/npm/@anthropic-ai/sdk@0.130.0/+esm';

export const AI_MODELS = [
  { id: 'claude-haiku-5-5', label: 'Claude Haiku 5.5 (fastest, cheapest)' },
  { id: 'claude-sonnet-5-5', label: 'Claude Sonnet 5.5 (better Arabic, mid price)' },
  { id: 'claude-opus-5-5', label: 'Claude Opus 5.5 (best quality, most expensive)' },
];

export const SCENARIOS = [
  { id: 'free', icon: '💬', title: 'Free chat', brief: 'Chat about anything — your day, hobbies, plans.' },
  { id: 'cafe', icon: '☕', title: 'At the café', brief: 'You are a waiter in a café; the learner is a customer ordering.' },
  { id: 'directions', icon: '🗺️', title: 'Asking directions', brief: 'You are a friendly local; the learner is a lost tourist.' },
  { id: 'market', icon: '🛍️', title: 'Shopping', brief: 'You are a shopkeeper at a market stall; the learner wants to buy something and may bargain.' },
  { id: 'meeting', icon: '🤝', title: 'Meeting someone new', brief: 'You meet the learner at a party; get to know each other (name, origin, job, family).' },
  { id: 'doctor', icon: '🩺', title: 'At the doctor', brief: 'You are a doctor; the learner explains how they feel.' },
  { id: 'travel', icon: '🚆', title: 'Train station', brief: 'You work at the ticket office; the learner buys a ticket.' },
];

const REPLY_SCHEMA = {
  type: 'object',
  additionalProperties: false,
  required: ['reply', 'reply_translit', 'reply_en', 'correction', 'tip'],
  properties: {
    reply: { type: 'string', description: 'Your next line in the target language (1-2 short sentences).' },
    reply_translit: { type: 'string', description: 'Latin transliteration of reply (Arabic only; empty string otherwise).' },
    reply_en: { type: 'string', description: 'English translation of reply.' },
    correction: { type: 'string', description: "Corrected version of the learner's last message in the target language, or empty string if it was correct/natural." },
    tip: { type: 'string', description: 'One short, encouraging English tip about the correction (empty if none).' },
  },
};

function systemPrompt(lang, scenario, level) {
  const language = lang === 'ar'
    ? 'Modern Standard Arabic (fuṣḥā). Always write Arabic with full vowel marks (harakat) so the beginner can read it'
    : 'standard Italian';
  return `You are a patient, warm conversation partner helping an English-speaking beginner practise speaking ${language}.
Learner level: ${level} (CEFR). Keep every reply to 1-2 short sentences using common, high-frequency words, and end with a simple question so the conversation keeps going.
Scenario: ${scenario.brief} Stay in role.
The learner's messages usually come from speech recognition, so ignore missing punctuation, accents or vowel marks — only correct real grammar or word-choice errors. If the learner writes in English, gently model how to say it in the target language.
Respond only with the JSON object described by the schema.`;
}

let sdkPromise;
async function client(apiKey) {
  sdkPromise = sdkPromise || import(SDK_URL);
  const { default: Anthropic } = await sdkPromise;
  return new Anthropic({ apiKey, dangerouslyAllowBrowser: true });
}

/**
 * @param {{apiKey: string, model: string, lang: 'ar'|'it', scenario: object, level: string, history: Array<{role: 'user'|'assistant', content: string}>}} opts
 * history: alternating turns; assistant turns are the raw JSON we got back.
 */
export async function partnerReply({ apiKey, model, lang, scenario, level, history }) {
  const anthropic = await client(apiKey);
  const messages = history.length ? history : [{ role: 'user', content: '(The learner has just arrived. Start the conversation with a greeting.)' }];
  const params = {
    model,
    max_tokens: 2000,
    system: systemPrompt(lang, scenario, level),
    messages,
    output_config: { effort: 'low', format: { type: 'json_schema', schema: REPLY_SCHEMA } },
  };
  // Server-side refusal fallback (Claude API) for the Opus / Sonnet 5.5 models.
  const useFallback = model === 'claude-opus-5-5' || model === 'claude-sonnet-5-5';
  let response;
  try {
    response = useFallback
      ? await anthropic.beta.messages.create({ ...params, betas: ['server-side-fallback-2026-07-01'], fallbacks: 'default' })
      : await anthropic.messages.create(params);
  } catch (err) {
    if (err?.status === 401) throw new Error('Your API key was rejected. Check it in Profile → Settings.');
    if (err?.status === 429) throw new Error('Rate limited — wait a moment and try again.');
    throw new Error(err?.message || 'Could not reach the AI partner.');
  }
  if (response.stop_reason === 'refusal') throw new Error("The partner couldn't answer that. Try saying something else.");
  const text = response.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  let data;
  try { data = JSON.parse(text); } catch { throw new Error('Unexpected reply format — please try again.'); }
  return { data, raw: text };
}
