# Pedagogical design

Lingua Path is built around one question: **what gets an adult beginner talking, with understanding, as fast as possible — and keeps them coming back?** Each design decision below links a feature to the research it rests on.

## 1. Speaking-first, communicative syllabus

| Principle | How the app applies it |
|---|---|
| **Communicative language teaching / task-based learning** — language is learned by using it to get things done. | Every unit is organised around a real-life *task* with a CEFR-style **“can-do” goal** (“I can order food and ask for the bill”), not a grammar topic. Units end in a **role-play** where you have to accomplish that task. |
| **Output hypothesis** (Swain) — producing language forces you to notice gaps that comprehension alone hides. | Every lesson ends in *production*: saying the item from English, typing it from memory. Speaking exercises award the most XP. A dedicated **Speak** tab holds role-plays, shadowing, and an optional open-ended AI conversation partner. |
| **Lexical approach / chunks** (Lewis) — fluent speakers rely on memorised multi-word chunks. | “Key phrases” lessons teach whole utterances (*Può ripetere, per favore?*, *أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ*) that are usable on day one, before their grammar is explained. |
| **Communication strategies** | Unit 2 in both languages is *survival phrases*: “I don't understand”, “slower please”, “how do you say…?”. These keep real conversations alive, and conversation is where acquisition happens. |
| **Shadowing** | Speaking exercises play the model first and ask you to copy rhythm and melody; “Shadow a conversation” lets you repeat a whole dialogue line by line. |

## 2. Input before output, receptive before productive

| Principle | How the app applies it |
|---|---|
| **Comprehensible input** (Krashen) — we acquire language by understanding messages slightly above our level. | Each unit has a short **dialogue** with audio. Translations are hidden until you tap a line, which nudges you to try understanding first. Comprehension questions check the gist. |
| **Receptive → productive sequencing** | Each new item goes through four stages in a lesson: **meet** (hear, see, say) → **recognise** (listen/read and choose the meaning) → **recall** (choose or build the target form) → **produce** (type it, or say it from English). Difficulty rises as memory strengthens. |
| **Dual coding** (Paivio) | Words come with an emoji image, audio and text together. |
| **Cognitive load** | New items arrive in **batches of 2–3**, each followed straight away by practice, rather than a long list up front. |

## 3. Memory: spaced, interleaved retrieval

| Principle | How the app applies it |
|---|---|
| **Retrieval practice / testing effect** | Almost every screen asks you to *recall*, not re-read. |
| **Spaced repetition** (Ebbinghaus, Pimsleur, Leitner, SM-2) | Every word and phrase has its own memory model (`js/srs.js`). Reviews are scheduled for when predicted recall drops to about 90%. Failed items come back within minutes, and reviewing the same item many times in one day doesn't inflate its interval. |
| **Desirable difficulty** | Review exercises get harder as an item's mastery grows (recognition → building → typing/speaking from memory). |
| **Interleaving** | Lessons quietly mix in due items from earlier units, and review sessions mix units and skills. |
| **Errors as learning events** | Wrong answers show the correct form *with audio* immediately, and the exercise comes back again at the end of the lesson. There are no “hearts” or lives: penalising mistakes raises anxiety (Krashen's *affective filter*) and discourages experimenting. |

## 4. Learning the writing systems

### Arabic: an alphabet-first track that runs in parallel

* **Shape-family grouping** — letters are taught in families that differ only by dots (ب ت ث ن ي, ج ح خ, د ذ, ر ز, س ش, ص ض, ط ظ, ع غ). This cuts the visual learning load roughly in half.
* **Short vowels from lesson 1**, then sukūn, shadda, tanwīn, tāʾ marbūṭa, hamza and the definite article (sun/moon letters).
* **Decodable words only** — each lesson's reading words use *only letters already taught*. An automated test (`tests/content.test.js`) enforces this, so learners read real words successfully from the first session.
* **Four positional forms** for every letter, plus explicit teaching of the six non-connecting letters.
* **Multi-sensory practice**: hear → recognise → read syllables → read words → find letters in words → **trace** (handwriting pad, scored by shape overlap) → **write from memory** (guide hidden, then revealed for comparison) → **spell words with an alphabetical on-screen keyboard** (dictation).
* **Transliteration scaffolding that fades.** In *Auto* mode, transliteration is shown until half the alphabet track is done. After that it's hidden behind a tap, to push you to read the real script. Every course item is **fully vowelled**.
* **Variety:** Modern Standard Arabic (فُصْحَى), understood across the Arab world and the form used in writing. Notes flag everyday-speech differences where useful.

### Italian: sounds and spelling

Italian uses the Latin alphabet, so “learning to write” Italian means learning its **sound-to-spelling rules**: c/g hard and soft, ch/gh, sc, gli/gn, double consonants, z, silent h, qu, written accents and stress. Each rule lesson combines:

* an explicit rule card with tappable examples (**noticing**, Schmidt),
* **minimal-pair discrimination** (*pala/palla*, *caro/carro*, *e/è*), which trains perception before production,
* **dictation** (hear → type, with an accent bar), linking sound to spelling,
* **read-aloud** speaking.

## 5. Grammar: explicit, but in service of communication

Each unit has a short **“Grammar & tips”** card that explains the patterns you have *already met* in its phrases. This is an inductive-then-explicit order (meet the chunk, then understand it). Key structures are chosen for how often they come up and how useful they are: tu/Lei and the man/woman addressee distinction, negation, avere/عِنْدَ for possession, articles and the Arabic sun letters, adjective agreement, present tense, and Arabic **roots** (ك-ت-ب) as a vocabulary multiplier.

## 6. Motivation and habit (gamification with a purpose)

The research on gamification is mixed. Features here are kept only where they support *regular practice* or *feedback*:

* **Daily goal + streak + streak freezes**: regular short practice beats cramming (spacing). A freeze, earned every 7 days, stops one missed day from wiping out a long streak, which is a common reason people quit.
* **XP, levels and combos** give immediate feedback. Speaking earns the most XP, to steer practice toward the hardest and most valuable skill.
* **Unit mastery stars** reflect *long-term memory strength* (SRS intervals), not just lessons completed, so they reward coming back.
* **Achievements** mark meaningful milestones (first role-play, alphabet finished, 250 utterances spoken).
* **Low-stakes environment**: no lives and no penalties. You can always skip, turn speaking off for now (“Can't speak now”), or mark a correct utterance yourself when speech recognition struggles with a learner accent.

## 7. The four skills in every unit

| Skill | Where |
|---|---|
| **Speaking** | intro “try saying it”, repeat-after-me, say-it-from-English, role-plays, shadowing, AI partner |
| **Listening** | listen-and-choose, tap-what-you-hear, dictation, dialogues, minimal pairs, role-play partner audio |
| **Reading** | read-and-choose, dialogues, decoding drills (Arabic), comprehension questions |
| **Writing** | sentence building, typing translations, dictation, Arabic tracing / writing from memory / keyboard spelling, Italian accent spelling |
