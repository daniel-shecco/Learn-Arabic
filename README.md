# Lingua Path — learn Arabic 🇸🇦 & Italian 🇮🇹

An interactive, gamified, **speaking-first** language course for Arabic (Modern Standard) and Italian. It covers all four skills (speaking, listening, reading, writing) and teaches the **writing systems**: a full Arabic alphabet track with handwriting practice, and an Italian sounds-and-spelling track.

It's a static web app: no build step, no backend, no dependencies. It works on desktop and mobile, can be installed as a PWA, and works offline once loaded.

## Features

**Course content (CEFR A1)**
- 12 parallel units per language (greetings, survival phrases, numbers, family, café, directions, time, shopping, descriptions, daily routine, travel, health). Each unit has a can-do goal, ~13 words, ~7 phrases, a grammar card, an audio dialogue with comprehension questions, and a role-play. That's 240+ items per language.
- **Arabic alphabet track** in 10 lessons: letters grouped by shape family, short vowels, sukūn, shadda, tanwīn, ة ء ى, al- and sun letters. Includes positional forms, decodable reading, tracing, writing from memory, and keyboard dictation, plus a tappable letter chart.
- **Italian sounds & spelling track** in 8 lessons: rules, minimal-pair listening, dictation and read-aloud.

**Exercise types:** new-item cards, listen & choose, read & choose, choose the translation, match pairs, build the sentence (from English or from audio), type the translation, dictation, repeat after me (speech recognition), say it from English, dialogues, role-plays, letter tracing, write from memory, letter/sound recognition, positional forms, syllable and word decoding, minimal pairs.

**Learning engine:** per-item spaced repetition (SM-2 family), mistakes re-queued within a lesson, interleaved review of earlier units, and a Practice hub (due reviews, listening, speaking, writing, weak spots, word bank with strength bars).

**Gamification:** XP, levels, combos, daily goal ring, streaks with freezes, unit mastery stars, 18 achievements, weekly activity chart, sound effects and confetti.

**Speaking:** browser speech recognition with per-word feedback. If recognition isn't available, there's a record-and-compare fallback. A “Can't speak now” mode turns speaking off for a lesson. There's also an optional **AI conversation partner** (Claude) with 7 scenarios and gentle corrections.

**Other:** fading transliteration for Arabic, an alphabetical on-screen Arabic keyboard, an Italian accent bar, voice and speed settings, light/dark theme, progress export/import, keyboard shortcuts (Enter, 1–4).

The reasoning behind the design is in [`docs/PEDAGOGY.md`](docs/PEDAGOGY.md).

## Run it

```bash
npm start            # = python3 -m http.server 8080
# open http://localhost:8080
```

Any static file server works (ES modules don't load from `file://`). To publish it, enable **GitHub Pages** for this repository (Settings → Pages → deploy from branch, root folder). The app is entirely static.

### Browser support
- **Best:** Chrome, Edge, or Safari (desktop or mobile). These have both speech synthesis and speech recognition.
- **Firefox:** everything works, except that speaking exercises use record-and-compare instead of automatic recognition.
- **Audio** uses the system's text-to-speech voices. If you hear nothing in Arabic or Italian, install that language's voice in your OS speech settings (on iOS/macOS: Settings → Accessibility → Spoken Content → Voices). You can pick a voice in *Profile → Settings*.

### Optional AI conversation partner
Under *Profile → Settings*, paste an Anthropic API key and choose a model. The key is stored only in your browser's localStorage and is sent only to `api.anthropic.com`. Usage is billed to your API account. The partner replies in simple target-language sentences (fully vowelled for Arabic) with a translation, and suggests a more natural version of what you said.

## Tests

```bash
npm test
```

The tests (Node's built-in runner) cover answer checking, speech scoring, Arabic normalisation, the SRS scheduler, streak and freeze logic, persistence and backup import, unlocking rules, **content integrity** (every unit is complete, every Arabic item is vowelled and has a transliteration, each Arabic reading word uses only letters already taught), and that **every lesson in both courses builds valid exercises**.

## Project layout

```
index.html, css/app.css, sw.js, manifest.webmanifest
js/app.js            app shell & screens (Learn, Alphabet/Sounds, Practice, Speak, Profile, AI chat)
js/ui/player.js      lesson runner (check → feedback → continue, re-queue, XP, summary)
js/ui/exercises.js   all exercise renderers
js/ui/tracer.js      handwriting pad + shape scoring
js/ui/keyboard.js    Arabic keyboard, Italian accent bar
js/session.js        lesson / review / drill generation (pure, tested)
js/srs.js            spaced-repetition scheduler
js/state.js          persistence, XP, streaks
js/gamify.js         levels, unlocking, mastery, achievements
js/speech.js         TTS, speech recognition, recorder
js/text.js           normalisation, answer checking, similarity
js/ai.js             optional Claude conversation partner
js/data/ar/*.js      Arabic units + alphabet track
js/data/it/*.js      Italian units + sounds track
```

### Adding content
Units live in `js/data/{ar,it}/units.js` as compact tuples (see the comment at the top of each file). Item IDs come from the normalised text, so reordering items keeps learners' progress. Run `npm test` after editing. The content tests catch missing fields, missing transliteration or vowel marks, and lessons that fail to build.
