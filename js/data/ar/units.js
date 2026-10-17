// Arabic course — spoken Levantine Arabic (شامي: Lebanon, Syria, Jordan, Palestine)
// with Modern Standard Arabic (فُصْحَى) shown alongside for reading and writing.
// CEFR A1 communicative syllabus.
//
// Item tuples: [levantine, transliteration, english, emoji?, note?, extra?]
//   extra = { msa: [standard arabic, transliteration], alt: [other accepted answers] }
//   The MSA form is always accepted as a correct answer too.
// Dialogue lines: [speaker, levantine, transliteration, english]
// Roleplay turns: { p: [levantine, translit, english], cue, a: [accepted answers], atr: translit of a[0] }
//
// Pronunciation: in everyday Levantine speech ق is a glottal stop (ʾ), ث is t/s and
// ذ is d/z. Spellings follow common Levantine usage; transliteration shows the sound.

export default [
  {
    id: 'greetings',
    title: 'مَرْحَبا',
    subtitle: 'Greetings & introductions',
    icon: '👋',
    goal: 'I can greet people, say my name and ask how someone is.',
    words: [
      ['مَرْحَبا', 'marḥaba', 'hello', '👋', null, { msa: ['مَرْحَبًا', 'marḥaban'] }],
      ['أَهْلا', 'ahla', 'hi / welcome', '🙂', null, { msa: ['أَهْلًا', 'ahlan'] }],
      ['صَباح الخَير', 'ṣabāḥ il-khēr', 'good morning', '🌅', 'Reply: صَباح النّور (ṣabāḥ in-nūr), “morning of light”.', { msa: ['صَبَاحُ الْخَيْرِ', 'ṣabāḥu l-khayr'] }],
      ['مَسا الخَير', 'masa l-khēr', 'good evening', '🌆', 'Reply: مَسا النّور (masa n-nūr).', { msa: ['مَسَاءُ الْخَيْرِ', 'masāʾu l-khayr'] }],
      ['مَعَ السَّلامة', 'maʿ is-salāme', 'goodbye', '🚶', 'Literally “with safety”. Very casual: باي (bāy)!', { msa: ['مَعَ السَّلَامَةِ', 'maʿa s-salāma'] }],
      ['إي', 'ē', 'yes', '✅', 'Also أَيْوَا (aywa). Formal: نَعَم.', { msa: ['نَعَمْ', 'naʿam'], alt: ['أيوا'] }],
      ['لَأ', 'laʾ', 'no', '❌', null, { msa: ['لَا', 'lā'], alt: ['لا'] }],
      ['شُكْرًا', 'shukran', 'thank you', '🙏', 'In Lebanon you will also hear مِرسي (merci).', { alt: ['مرسي'] }],
      ['عَفْوًا', 'ʿafwan', "you're welcome / excuse me", '😊', 'Also: وَلَو (walaw), “don’t mention it”.', { alt: ['ولو'] }],
      ['أَنا', 'ana', 'I', '🙋', null, { msa: ['أَنَا', 'anā'] }],
      ['إِنْتَ', 'inte', 'you (to a man)', '👉', null, { msa: ['أَنْتَ', 'anta'] }],
      ['إِنْتِ', 'inti', 'you (to a woman)', '👉', null, { msa: ['أَنْتِ', 'anti'] }],
      ['اِسِم', 'ism', 'name', '📛', null, { msa: ['اِسْم', 'ism'], alt: ['اسم'] }],
    ],
    phrases: [
      ['السَّلامُ عَلَيكُم', 'as-salāmu ʿalēkum', 'Peace be upon you (hello)', '🕊️', 'Used everywhere, in any register.', { msa: ['السَّلَامُ عَلَيْكُمْ', 'as-salāmu ʿalaykum'] }],
      ['وعَلَيكُم السَّلام', 'w ʿalēkum is-salām', 'And upon you peace (the reply)', '🕊️', null, { msa: ['وَعَلَيْكُمُ السَّلَامُ', 'wa-ʿalaykumu s-salām'] }],
      ['شو اسْمَك؟', 'shu ismak?', "What's your name? (to a man)", '❓', 'To a woman: شو اسْمِك؟ (shu ismik?)', { msa: ['مَا اسْمُكَ؟', 'mā smuka?'], alt: ['شو اسمك'] }],
      ['اِسْمي سامي.', 'ismi Sāmi.', 'My name is Sami.', '📛', '-i at the end means “my”.', { msa: ['اِسْمِي سَامِي', 'ismī Sāmī'], alt: ['أنا سامي'] }],
      ['تْشَرَّفْنا!', 'tsharrafna!', 'Nice to meet you!', '🤝', 'Literally “we are honoured”.', { msa: ['تَشَرَّفْنَا', 'tasharrafnā'] }],
      ['كِيفَك؟', 'kīfak?', 'How are you? (to a man)', '💬', 'To a woman: كِيفِك؟ (kīfik?)', { msa: ['كَيْفَ حَالُكَ؟', 'kayfa ḥāluka?'], alt: ['كيفك'] }],
      ['مْنيح، الحَمْدِلله.', 'mnīḥ, il-ḥamdilla.', "I'm good, thank God.", '😊', 'A woman says مْنيحة (mnīḥa). Also very common: تَمام (tamām), “fine”.', { msa: ['أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ', 'anā bi-khayr, al-ḥamdu li-llāh'], alt: ['منيحة الحمدلله', 'تمام', 'منيح'] }],
      ['وإِنْتَ؟', 'w inte?', 'And you? (to a man)', '↩️', 'To a woman: وإِنْتِ؟ (w inti?)', { msa: ['وَأَنْتَ؟', 'wa-anta?'], alt: ['وانت'] }],
      ['أَهْلا وسَهْلا!', 'ahla w sahla!', 'Welcome!', '🤗', null, { msa: ['أَهْلًا وَسَهْلًا', 'ahlan wa-sahlan'] }],
    ],
    grammar: {
      title: 'Spoken vs standard Arabic — and talking to a man or a woman',
      body: `<p>Arabs speak a <b>dialect</b> at home and on the street, and read and write <b>Modern Standard Arabic</b> (فُصْحَى). This course teaches <b>Levantine</b> (شامي) for speaking, and shows the standard form under each item (📜) so your reading keeps growing.</p>
<table><tr><th></th><th>spoken (Levantine)</th><th>standard</th></tr>
<tr><td>How are you?</td><td>كِيفَك؟ <i>kīfak</i></td><td>كَيْفَ حَالُكَ؟</td></tr>
<tr><td>What's your name?</td><td>شو اسْمَك؟ <i>shu ismak</i></td><td>مَا اسْمُكَ؟</td></tr>
<tr><td>yes</td><td>إي <i>ē</i></td><td>نَعَمْ</td></tr></table>
<p><b>To a man or a woman:</b> the ending changes — <b>-ak</b> for a man, <b>-ik</b> for a woman: كِيفَك <i>kīfak</i> / كِيفِك <i>kīfik</i>; إِنْتَ <i>inte</i> / إِنْتِ <i>inti</i>.</p>
<p><b>No “am / is / are”</b> in the present: أَنا مْنيح = “I [am] good”.</p>`,
    },
    dialogue: {
      scene: 'Layla meets Karim at a party in Beirut.',
      lines: [
        ['Layla', 'مَرْحَبا!', 'marḥaba!', 'Hello!'],
        ['Karim', 'أَهْلا! شو اسْمِك؟', 'ahla! shu ismik?', "Hi! What's your name?"],
        ['Layla', 'اِسْمي لَيلى. وإِنْتَ؟', 'ismi Layla. w inte?', 'My name is Layla. And you?'],
        ['Karim', 'أَنا كَريم. تْشَرَّفْنا!', 'ana Karīm. tsharrafna!', "I'm Karim. Nice to meet you!"],
        ['Layla', 'تْشَرَّفْنا. كِيفَك؟', 'tsharrafna. kīfak?', 'Nice to meet you. How are you?'],
        ['Karim', 'مْنيح، الحَمْدِلله. وإِنْتِ؟', 'mnīḥ, il-ḥamdilla. w inti?', "Good, thank God. And you?"],
        ['Layla', 'تَمام! أَهْلا وسَهْلا.', 'tamām! ahla w sahla.', 'Fine! Welcome.'],
      ],
      questions: [
        { q: "What is the man's name?", options: ['Karim', 'Sami', 'Adam'], a: 0 },
        { q: 'Why does Karim say “shu ismik” and not “shu ismak”?', options: ['He is speaking to a woman', 'It is more polite', 'It is a question'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You meet Omar in a café in Amman.',
      turns: [
        { p: ['السَّلامُ عَلَيكُم!', 'as-salāmu ʿalēkum!', 'Peace be upon you!'], cue: 'Reply to the greeting.', a: ['وعَلَيكُم السَّلام', 'وَعَلَيْكُمُ السَّلَامُ'], atr: 'w ʿalēkum is-salām' },
        { p: ['شو اسْمَك؟', 'shu ismak?', "What's your name?"], cue: 'Say: My name is Adam.', a: ['اِسْمي آدَم', 'أَنا آدَم', 'اِسْمِي آدَم'], atr: 'ismi Ādam' },
        { p: ['تْشَرَّفْنا! كِيفَك؟', 'tsharrafna! kīfak?', 'Nice to meet you! How are you?'], cue: "Say you're good, thank God.", a: ['مْنيح، الحَمْدِلله', 'تَمام، الحَمْدِلله', 'مْنيح', 'تَمام', 'أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ'], atr: 'mnīḥ, il-ḥamdilla' },
        { p: ['يَلّا، مَعَ السَّلامة!', 'yalla, maʿ is-salāme!', 'Right then, goodbye!'], cue: 'Say goodbye.', a: ['مَعَ السَّلامة', 'باي', 'مَعَ السَّلَامَةِ'], atr: 'maʿ is-salāme' },
      ],
    },
  },
  {
    id: 'survival',
    title: 'ما فْهِمْت',
    subtitle: 'Survival phrases',
    icon: '🛟',
    goal: "I can manage when I don't understand: ask to repeat, slow down, or explain.",
    words: [
      ['لَو سَمَحْت', 'law samaḥt', 'please (to a man)', '🙏', 'To a woman: لَو سَمَحْتي (law samaḥti). Also مِن فَضْلَك (min faḍlak).', { msa: ['مِنْ فَضْلِكَ', 'min faḍlika'], alt: ['من فضلك', 'لو سمحتي'] }],
      ['آسِف', 'āsif', 'sorry (said by a man)', '😔', 'A woman says آسْفة (āsfe).', { msa: ['آسِف', 'āsif'] }],
      ['مَعْلِش', 'maʿlesh', "never mind / it's okay / sorry", '🤷', 'One of the most useful words in the Levant.', { msa: ['لَا بَأْسَ', 'lā baʾs'] }],
      ['طَيِّب', 'ṭayyeb', 'okay', '👍', null, { msa: ['طَيِّب', 'ṭayyib'] }],
      ['أَكيد', 'akīd', 'of course / sure', '👌', null, { msa: ['طَبْعًا', 'ṭabʿan'] }],
      ['يِمْكِن', 'yimkin', 'maybe', '🤔', null, { msa: ['رُبَّمَا', 'rubbamā'] }],
      ['كْتير', 'ktīr', 'very / a lot', '➕', 'Comes AFTER adjectives: مْنيح كْتير, “very good”.', { msa: ['جِدًّا', 'jiddan'] }],
      ['شْوَيّ', 'shwayy', 'a little', '🤏', null, { msa: ['قَلِيلًا', 'qalīlan'], alt: ['شوي'] }],
      ['بَسّ', 'bass', 'only / but / enough!', '☝️', null, { msa: ['فَقَطْ', 'faqaṭ'], alt: ['بس'] }],
      ['هَون', 'hōn', 'here', '📍', null, { msa: ['هُنَا', 'hunā'] }],
      ['هونيك', 'hōnīk', 'there', '👉', null, { msa: ['هُنَاكَ', 'hunāka'] }],
      ['لُغَة', 'lugha', 'language', '🗣️', null, { msa: ['لُغَة', 'lugha'] }],
      ['كَمان', 'kamān', 'also / again', '➕', null, { msa: ['أَيْضًا', 'ayḍan'] }],
    ],
    phrases: [
      ['ما فْهِمْت.', 'mā fhimt.', "I didn't understand.", '🤷', 'Levantine uses the past tense here.', { msa: ['لَا أَفْهَمُ', 'lā afham'], alt: ['ما فهمت عليك'] }],
      ['عيد لَو سَمَحْت.', 'ʿīd law samaḥt.', 'Repeat, please.', '🔁', null, { msa: ['أَعِدْ مِنْ فَضْلِكَ', 'aʿid min faḍlika'], alt: ['عيد'] }],
      ['شْوَيّ شْوَيّ لَو سَمَحْت.', 'shwayy shwayy law samaḥt.', 'Slowly, please.', '🐢', null, { msa: ['بِبُطْءٍ مِنْ فَضْلِكَ', 'bi-buṭʾ min faḍlika'], alt: ['شوي شوي'] }],
      ['بْتِحْكي إِنْجْليزي؟', 'btiḥki inglīzi?', 'Do you speak English?', '🇬🇧', 'حَكى (ḥaka) = to speak, in Levantine.', { msa: ['هَلْ تَتَكَلَّمُ الْإِنْجِلِيزِيَّةَ؟', 'hal tatakallamu l-injilīziyya?'] }],
      ['شو يَعْني هاد؟', 'shu yaʿni hād?', 'What does this mean?', '📖', null, { msa: ['مَاذَا يَعْنِي هَذَا؟', 'mādhā yaʿnī hādhā?'] }],
      ['كِيف بِتْقول هاد بالعَرَبي؟', 'kīf bitʾūl hād bil-ʿarabi?', 'How do you say this in Arabic?', '💭', null, { msa: ['كَيْفَ تَقُولُ هَذَا بِالْعَرَبِيَّةِ؟', 'kayfa taqūlu hādhā bil-ʿarabiyya?'] }],
      ['ما بَعْرِف.', 'mā baʿrif.', "I don't know.", '🤷‍♀️', null, { msa: ['لَا أَعْرِفُ', 'lā aʿrif'] }],
      ['بَحْكي عَرَبي شْوَيّ.', 'baḥki ʿarabi shwayy.', 'I speak a little Arabic.', '🤏', null, { msa: ['أَتَكَلَّمُ الْعَرَبِيَّةَ قَلِيلًا', 'atakallamu l-ʿarabiyya qalīlan'] }],
    ],
    grammar: {
      title: '“Not”, questions, and the b- prefix',
      body: `<p><b>Not:</b> put <b>ما</b> (mā) before a verb, and <b>مِش</b> (mish) before everything else:</p>
<table><tr><td>ما بَعْرِف</td><td><i>mā baʿrif</i></td><td>I don't know</td></tr>
<tr><td>ما فْهِمْت</td><td><i>mā fhimt</i></td><td>I didn't understand</td></tr>
<tr><td>مِش مْنيح</td><td><i>mish mnīḥ</i></td><td>not good</td></tr></table>
<p><b>Questions:</b> just raise your voice — no question word needed: بْتِحْكي عَرَبي؟ “You speak Arabic?” (Standard Arabic starts with هَلْ.)</p>
<p><b>b- = present:</b> spoken verbs add <b>b-</b> for things you do (in general / habitually): بَحْكي <i>baḥki</i> “I speak”, بْتِحْكي <i>btiḥki</i> “you speak”. Standard Arabic has no b-: أَتَكَلَّمُ.</p>`,
    },
    dialogue: {
      scene: 'A visitor asks a shopkeeper for help in Damascus.',
      lines: [
        ['Visitor', 'عَفْوًا، بْتِحْكي إِنْجْليزي؟', 'ʿafwan, btiḥki inglīzi?', 'Excuse me, do you speak English?'],
        ['Shopkeeper', 'لَأ، آسِف. بَسّ عَرَبي.', 'laʾ, āsif. bass ʿarabi.', "No, sorry. Only Arabic."],
        ['Visitor', 'مَعْلِش. بَحْكي عَرَبي شْوَيّ.', 'maʿlesh. baḥki ʿarabi shwayy.', "No problem. I speak a little Arabic."],
        ['Shopkeeper', 'بْتِجْنِن! أَهْلا وسَهْلا!', 'btijnin! ahla w sahla!', "Amazing! Welcome!"],
        ['Visitor', 'شْوَيّ شْوَيّ لَو سَمَحْت.', 'shwayy shwayy law samaḥt.', 'Slowly, please.'],
        ['Shopkeeper', 'أَكيد! أَهْ-لا وسَهْ-لا!', 'akīd! ah-la w sah-la!', 'Of course! Wel-come!'],
      ],
      questions: [
        { q: 'Does the shopkeeper speak English?', options: ['No, only Arabic', 'Yes, a little', 'Yes, fluently'], a: 0 },
        { q: 'What does the visitor ask for?', options: ['To speak slowly', 'The price', 'Directions'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A bus driver answers you very fast.',
      turns: [
        { p: ['الباص بْيِطْلَع السّاعة تِسْعة ورُبْع مِن عِنْد الدَّوّار.', 'il-bāṣ byiṭlaʿ is-sāʿa tisʿa w rubʿ min ʿind id-dawwār.', 'The bus leaves at quarter past nine from the roundabout.'], cue: "Say sorry, you didn't understand.", a: ['آسِف، ما فْهِمْت', 'ما فْهِمْت', 'آسْفة، ما فْهِمْت', 'لَا أَفْهَمُ'], atr: 'āsif, mā fhimt' },
        { p: ['آه، مَعْلِش!', 'āh, maʿlesh!', 'Oh, sorry!'], cue: 'Ask them to repeat slowly, please.', a: ['عيد شْوَيّ شْوَيّ لَو سَمَحْت', 'شْوَيّ شْوَيّ لَو سَمَحْت', 'عيد لَو سَمَحْت', 'أَعِدْ مِنْ فَضْلِكَ'], atr: 'ʿīd shwayy shwayy law samaḥt' },
        { p: ['الباص... السّاعة... تِسْعة.', 'il-bāṣ… is-sāʿa… tisʿa.', 'The bus… at… nine.'], cue: 'Say thank you very much.', a: ['شُكْرًا كْتير', 'شُكْرًا', 'شُكْرًا جَزِيلًا'], atr: 'shukran ktīr' },
      ],
    },
  },
  {
    id: 'numbers',
    title: 'الأَرْقام',
    subtitle: 'Numbers, age & phone numbers',
    icon: '🔢',
    goal: 'I can count, read Arabic numerals, and say my age.',
    words: [
      ['صِفِر', 'ṣifir', 'zero', '٠', 'English “cipher” and “zero” come from this word!', { msa: ['صِفْر', 'ṣifr'], alt: ['صفر'] }],
      ['واحَد', 'wāḥad', 'one', '١', null, { msa: ['وَاحِد', 'wāḥid'] }],
      ['تْنين', 'tnēn', 'two', '٢', null, { msa: ['اِثْنَان', 'ithnān'], alt: ['اتنين'] }],
      ['تْلاتة', 'tlēte', 'three', '٣', 'Spoken Arabic turns ث into ت: ثَلَاثَة → تْلاتة.', { msa: ['ثَلَاثَة', 'thalātha'] }],
      ['أَرْبْعة', 'arbʿa', 'four', '٤', null, { msa: ['أَرْبَعَة', 'arbaʿa'], alt: ['اربعة'] }],
      ['خَمْسة', 'khamse', 'five', '٥', null, { msa: ['خَمْسَة', 'khamsa'] }],
      ['سِتّة', 'sitte', 'six', '٦', null, { msa: ['سِتَّة', 'sitta'] }],
      ['سَبْعة', 'sabʿa', 'seven', '٧', null, { msa: ['سَبْعَة', 'sabʿa'] }],
      ['تْمانْية', 'tmēnye', 'eight', '٨', null, { msa: ['ثَمَانِيَة', 'thamāniya'], alt: ['تمانية'] }],
      ['تِسْعة', 'tisʿa', 'nine', '٩', null, { msa: ['تِسْعَة', 'tisʿa'] }],
      ['عَشْرة', 'ʿashra', 'ten', '١٠', null, { msa: ['عَشَرَة', 'ʿashara'] }],
      ['عِشْرين', 'ʿishrīn', 'twenty', '٢٠', null, { msa: ['عِشْرُون', 'ʿishrūn'] }],
      ['تْلاتين', 'tlētīn', 'thirty', '٣٠', null, { msa: ['ثَلَاثُون', 'thalāthūn'] }],
      ['مِيّة', 'miyye', 'one hundred', '١٠٠', null, { msa: ['مِئَة', 'miʾa'], alt: ['مية'] }],
    ],
    phrases: [
      ['قَدّيش عُمْرَك؟', 'ʾaddēsh ʿumrak?', 'How old are you? (to a man)', '🎂', 'قَدّيش (ʾaddēsh) = how much / how many. To a woman: عُمْرِك (ʿumrik).', { msa: ['كَمْ عُمْرُكَ؟', 'kam ʿumruka?'], alt: ['قديش عمرك'] }],
      ['عُمْري تْلاتين سَنة.', 'ʿumri tlētīn sane.', "I'm thirty years old.", '🎉', null, { msa: ['عُمْرِي ثَلَاثُونَ سَنَةً', 'ʿumrī thalāthūna sana'], alt: ['عمري تلاتين'] }],
      ['شو رَقْم تَلَفونَك؟', 'shu raʾm talafōnak?', "What's your phone number?", '📱', null, { msa: ['مَا رَقْمُ هَاتِفِكَ؟', 'mā raqmu hātifika?'], alt: ['شو رقمك'] }],
      ['رَقْمي...', 'raʾmi…', 'My number is…', '☎️', null, { msa: ['رَقْمِي', 'raqmī'], alt: ['رقمي'] }],
      ['قَدّيش؟', 'ʾaddēsh?', 'How much? / How many?', '🧮', null, { msa: ['كَمْ؟', 'kam?'] }],
    ],
    grammar: {
      title: 'Arabic numerals ٠١٢٣٤٥٦٧٨٩',
      body: `<p>In the Levant, numbers are often written with <b>Eastern Arabic numerals</b>:</p>
<table class="numerals"><tr><td>٠</td><td>١</td><td>٢</td><td>٣</td><td>٤</td><td>٥</td><td>٦</td><td>٧</td><td>٨</td><td>٩</td></tr>
<tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr></table>
<p>Numbers are written <b>left-to-right</b> even inside right-to-left text: ٢٠٢٦ = 2026. Watch out: ٥ is 5, and zero ٠ is just a dot.</p>
<p><b>Spoken vs standard:</b> spoken Arabic simplifies sounds — ث becomes ت (ثَلَاثَة → تْلاتة) and endings drop (عِشْرُون → عِشْرين).</p>
<p>Age: عُمْري <i>ʿumri</i> “my age”, عُمْرَك <i>ʿumrak</i> “your age”.</p>`,
    },
    dialogue: {
      scene: 'Two classmates exchange numbers.',
      lines: [
        ['Huda', 'شو رَقْم تَلَفونَك؟', 'shu raʾm talafōnak?', "What's your phone number?"],
        ['Sami', 'رَقْمي: صِفِر، خَمْسة، تْلاتة، سَبْعة، تِسْعة.', 'raʾmi: ṣifir, khamse, tlēte, sabʿa, tisʿa.', 'My number is: 0, 5, 3, 7, 9.'],
        ['Huda', 'شُكْرًا! قَدّيش عُمْرَك يا سامي؟', 'shukran! ʾaddēsh ʿumrak yā Sāmi?', 'Thanks! How old are you, Sami?'],
        ['Sami', 'عُمْري عِشْرين سَنة. وإِنْتِ؟', 'ʿumri ʿishrīn sane. w inti?', "I'm twenty. And you?"],
        ['Huda', 'عُمْري تْلاتين.', 'ʿumri tlētīn.', "I'm thirty."],
      ],
      questions: [
        { q: 'How old is Sami?', options: ['20', '30', '13'], a: 0 },
        { q: "Which digit comes first in Sami's number?", options: ['0', '5', '9'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A new friend wants your number.',
      turns: [
        { p: ['قَدّيش عُمْرَك؟', 'ʾaddēsh ʿumrak?', 'How old are you?'], cue: "Say you're twenty years old.", a: ['عُمْري عِشْرين سَنة', 'عُمْري عِشْرين', 'عِشْرين', 'عُمْرِي عِشْرُونَ سَنَةً'], atr: 'ʿumri ʿishrīn sane' },
        { p: ['وشو رَقْم تَلَفونَك؟', 'w shu raʾm talafōnak?', 'And what is your phone number?'], cue: 'Say: My number is five, three, one.', a: ['رَقْمي خَمْسة تْلاتة واحَد', 'خَمْسة تْلاتة واحَد'], atr: 'raʾmi khamse, tlēte, wāḥad' },
        { p: ['شُكْرًا!', 'shukran!', 'Thanks!'], cue: "Say “you're welcome”.", a: ['عَفْوًا', 'وَلَو'], atr: 'ʿafwan' },
      ],
    },
  },
  {
    id: 'family',
    title: 'العيلة',
    subtitle: 'Family & people',
    icon: '👨‍👩‍👧',
    goal: "I can talk about my family and ask about someone else's.",
    words: [
      ['عيلة', 'ʿēle', 'family', '👨‍👩‍👧', null, { msa: ['عَائِلَة', 'ʿāʾila'] }],
      ['إِمّ', 'imm', 'mother', '👩', 'Also ماما (māma).', { msa: ['أُمّ', 'umm'], alt: ['ماما'] }],
      ['بَيّ', 'bayy', 'father', '👨', 'Also بابا (bāba). “My father” = بَيّي (bayyi).', { msa: ['أَب', 'ab'], alt: ['بابا'] }],
      ['خَيّ', 'khayy', 'brother', '👦', '“My brother” = خَيّي (khayyi).', { msa: ['أَخ', 'akh'] }],
      ['أُخْت', 'ukht', 'sister', '👧', null, { msa: ['أُخْت', 'ukht'] }],
      ['اِبِن', 'ibin', 'son', '👶', null, { msa: ['اِبْن', 'ibn'], alt: ['ابن'] }],
      ['بِنْت', 'binit', 'daughter / girl', '👧', null, { msa: ['بِنْت', 'bint'] }],
      ['جوز', 'jōz', 'husband', '🤵', null, { msa: ['زَوْج', 'zawj'] }],
      ['مَرا', 'mara', 'wife / woman', '👰', '“My wife” = مَرْتي (marti).', { msa: ['زَوْجَة', 'zawja'] }],
      ['جِدّ', 'jidd', 'grandfather', '👴', 'Also جِدّو (jiddo), “grandpa”.', { msa: ['جَدّ', 'jadd'], alt: ['جدو'] }],
      ['تيتا', 'tēta', 'grandmother', '👵', null, { msa: ['جَدَّة', 'jadda'] }],
      ['صاحِب', 'ṣāḥeb', 'friend (m)', '🧑‍🤝‍🧑', 'Female friend: صاحْبة (ṣāḥbe).', { msa: ['صَدِيق', 'ṣadīq'] }],
      ['وَلَد', 'walad', 'child / boy', '🧒', 'Plural: وْلاد (wlād), “kids”.', { msa: ['طِفْل', 'ṭifl'] }],
    ],
    phrases: [
      ['هاد بَيّي.', 'hād bayyi.', 'This is my father.', '👨', null, { msa: ['هَذَا أَبِي', 'hādhā abī'] }],
      ['هاي إِمّي.', 'hāy immi.', 'This is my mother.', '👩', 'هاي (hāy) is “this” for feminine nouns.', { msa: ['هَذِهِ أُمِّي', 'hādhihi ummī'] }],
      ['عِنْدَك إِخْوة؟', 'ʿindak ikhwe?', 'Do you have siblings?', '👫', null, { msa: ['هَلْ عِنْدَكَ إِخْوَة؟', 'hal ʿindaka ikhwa?'] }],
      ['عِنْدي أُخْت وِحْدة.', 'ʿindi ukht wiḥde.', 'I have one sister.', '👧', null, { msa: ['عِنْدِي أُخْتٌ وَاحِدَةٌ', 'ʿindī ukhtun wāḥida'], alt: ['عندي أخت'] }],
      ['إِنْتَ مِتْجَوِّز؟', 'inte mitjawwiz?', 'Are you married? (to a man)', '💍', 'To a woman: إِنْتِ مِتْجَوّْزة؟ (inti mitjawwze?)', { msa: ['هَلْ أَنْتَ مُتَزَوِّجٌ؟', 'hal anta mutazawwij?'] }],
      ['عِنْدي وَلَدين.', 'ʿindi waladēn.', 'I have two children.', '👦👦', 'The ending -ēn means exactly two — Arabic has a special “dual” form!', { msa: ['عِنْدِي وَلَدَانِ', 'ʿindī waladān'] }],
    ],
    grammar: {
      title: 'My, your… and “to have” (عِنْد)',
      body: `<p>Possession is a <b>suffix</b> on the noun:</p>
<table><tr><td>إِمّ<b>ي</b></td><td>imm<b>i</b></td><td>my mother</td></tr>
<tr><td>إِمّ<b>َك</b></td><td>imm<b>ak</b></td><td>your mother (m)</td></tr>
<tr><td>إِمّ<b>ِك</b></td><td>imm<b>ik</b></td><td>your mother (f)</td></tr>
<tr><td>إِمّ<b>و</b></td><td>imm<b>o</b></td><td>his mother</td></tr>
<tr><td>إِمّ<b>ا</b></td><td>imm<b>a</b></td><td>her mother</td></tr></table>
<p><b>“To have”</b> isn't a verb: you say “at me (is)…” — <b>عِنْدي</b> <i>ʿindi</i> = I have, <b>عِنْدَك</b> <i>ʿindak</i> = you have, <b>ما عِنْدي</b> = I don't have.</p>
<p><b>This:</b> هاد (hād) masculine, هاي (hāy) feminine. Standard: هَذَا / هَذِهِ.</p>`,
    },
    dialogue: {
      scene: 'Mona shows Tom a family photo.',
      lines: [
        ['Mona', 'شوف، هاي عيلْتي.', 'shūf, hāy ʿēlti.', 'Look, this is my family.'],
        ['Tom', 'ما شاء الله! مين هاد؟', 'mā shāʾ alla! mīn hād?', 'How wonderful! Who is this?'],
        ['Mona', 'هاد بَيّي، وهاي إِمّي.', 'hād bayyi, w hāy immi.', 'This is my father, and this is my mother.'],
        ['Tom', 'عِنْدِك إِخْوة؟', 'ʿindik ikhwe?', 'Do you have siblings?'],
        ['Mona', 'إي، عِنْدي أُخْت وِحْدة، اِسْما سَلْمى.', 'ē, ʿindi ukht wiḥde, isma Salma.', 'Yes, I have one sister, her name is Salma.'],
        ['Tom', 'وأَنا عِنْدي خَيّين.', 'w ana ʿindi khayyēn.', 'And I have two brothers.'],
      ],
      questions: [
        { q: "What is Mona's sister's name?", options: ['Salma', 'Layla', 'Huda'], a: 0 },
        { q: 'How many brothers does Tom have?', options: ['Two', 'One', 'Three'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A neighbour asks about your family.',
      turns: [
        { p: ['عِنْدَك إِخْوة؟', 'ʿindak ikhwe?', 'Do you have siblings?'], cue: 'Say: yes, I have one sister.', a: ['إي، عِنْدي أُخْت وِحْدة', 'عِنْدي أُخْت وِحْدة', 'إي، عِنْدي أُخْت', 'عِنْدِي أُخْتٌ وَاحِدَةٌ'], atr: 'ē, ʿindi ukht wiḥde' },
        { p: ['إِنْتَ مِتْجَوِّز؟', 'inte mitjawwiz?', 'Are you married?'], cue: 'Say: no.', a: ['لَأ', 'لَأ، مِش مِتْجَوِّز', 'لا'], atr: 'laʾ' },
        { p: ['وشو اسِم إِمَّك؟', 'w shu ism immak?', "And what's your mother's name?"], cue: "Say: My mother's name is Maryam.", a: ['إِمّي اسْما مَرْيَم', 'اِسِم إِمّي مَرْيَم', 'مَرْيَم', 'اِسْمُ أُمِّي مَرْيَم'], atr: 'immi isma Maryam' },
      ],
    },
  },
  {
    id: 'cafe',
    title: 'بالقَهْوة',
    subtitle: 'Food, drink & ordering',
    icon: '☕',
    goal: 'I can order food and drinks, and ask for the bill.',
    words: [
      ['قَهْوة', 'ʾahwe', 'coffee / café', '☕', 'Spoken ق is a glottal stop: “ʾahwe”, not “qahwa”. Also means “café”.', { msa: ['قَهْوَة', 'qahwa'] }],
      ['شاي', 'shāy', 'tea', '🍵', null, { msa: ['شَاي', 'shāy'] }],
      ['مَيّ', 'mayy', 'water', '💧', null, { msa: ['مَاء', 'māʾ'], alt: ['مي'] }],
      ['حَليب', 'ḥalīb', 'milk', '🥛', null, { msa: ['حَلِيب', 'ḥalīb'] }],
      ['عَصير', 'ʿaṣīr', 'juice', '🧃', null, { msa: ['عَصِير', 'ʿaṣīr'] }],
      ['خِبِز', 'khibiz', 'bread', '🫓', null, { msa: ['خُبْز', 'khubz'], alt: ['خبز'] }],
      ['سُكَّر', 'sukkar', 'sugar', '🍬', 'Source of the English word “sugar”.', { msa: ['سُكَّر', 'sukkar'] }],
      ['لَحْمة', 'laḥme', 'meat', '🥩', null, { msa: ['لَحْم', 'laḥm'] }],
      ['جاج', 'jāj', 'chicken', '🍗', null, { msa: ['دَجَاج', 'dajāj'] }],
      ['رِزّ', 'rizz', 'rice', '🍚', null, { msa: ['أَرُزّ', 'aruzz'], alt: ['رز'] }],
      ['فَواكِه', 'fawākeh', 'fruit', '🍎', null, { msa: ['فَاكِهَة', 'fākiha'] }],
      ['طَيِّب', 'ṭayyeb', 'tasty / delicious', '😋', 'Same word as “okay” — context tells you which. Also زاكي (zāki).', { msa: ['لَذِيذ', 'ladhīdh'], alt: ['زاكي'] }],
      ['الحْساب', 'il-ḥsāb', 'the bill', '🧾', null, { msa: ['الْحِسَاب', 'al-ḥisāb'], alt: ['الحساب'] }],
    ],
    phrases: [
      ['بَدّي قَهْوة لَو سَمَحْت.', 'biddi ʾahwe law samaḥt.', "I'd like a coffee, please.", '☕', 'بَدّي (biddi) = I want — the key word for ordering anything.', { msa: ['أُرِيدُ قَهْوَةً مِنْ فَضْلِكَ', 'urīdu qahwatan min faḍlika'], alt: ['بدي قهوة'] }],
      ['بَلا سُكَّر.', 'bala sukkar.', 'Without sugar.', '🚫🍬', null, { msa: ['بِدُونِ سُكَّرٍ', 'bi-dūni sukkar'] }],
      ['أَنا جوعان.', 'ana jūʿān.', "I'm hungry. (man)", '🍽️', 'A woman says جوعانة (jūʿāne).', { msa: ['أَنَا جَائِعٌ', 'anā jāʾiʿ'], alt: ['أنا جوعانة'] }],
      ['أَنا عَطْشان.', 'ana ʿaṭshān.', "I'm thirsty. (man)", '🥤', 'A woman says عَطْشانة (ʿaṭshāne).', { msa: ['أَنَا عَطْشَانُ', 'anā ʿaṭshān'], alt: ['أنا عطشانة'] }],
      ['الحْساب لَو سَمَحْت.', 'il-ḥsāb law samaḥt.', 'The bill, please.', '🧾', null, { msa: ['الْحِسَابُ مِنْ فَضْلِكَ', 'al-ḥisābu min faḍlika'] }],
      ['الأَكِل كْتير طَيِّب!', 'il-akil ktīr ṭayyeb!', 'The food is really delicious!', '😋', null, { msa: ['الطَّعَامُ لَذِيذٌ جِدًّا', 'aṭ-ṭaʿāmu ladhīdhun jiddan'] }],
      ['تْفَضَّل.', 'tfaḍḍal.', 'Here you are / Please, go ahead.', '🤲', 'Said when offering something. To a woman: تْفَضَّلي (tfaḍḍali).', { msa: ['تَفَضَّلْ', 'tafaḍḍal'] }],
      ['صَحْتين!', 'ṣaḥtēn!', 'Enjoy your meal! (lit. “two healths”)', '🍴', 'Reply: عَلى قَلْبَك (ʿala ʾalbak), “on your heart”.', { msa: ['بِالْهَنَاءِ وَالشِّفَاءِ', 'bil-hanāʾ wa-sh-shifāʾ'] }],
    ],
    grammar: {
      title: 'بَدّي “I want” — and the word for “the”',
      body: `<p><b>بَدّ-</b> + suffix = “want”. It's the most useful word for ordering:</p>
<table><tr><td>بَدّي</td><td><i>biddi</i></td><td>I want</td></tr>
<tr><td>بَدَّك</td><td><i>biddak</i></td><td>you want (m)</td></tr>
<tr><td>شو بَدَّك؟</td><td><i>shu biddak?</i></td><td>What do you want?</td></tr>
<tr><td>ما بَدّي</td><td><i>mā biddi</i></td><td>I don't want</td></tr></table>
<p>Standard Arabic uses أُرِيدُ (urīdu) instead.</p>
<p><b>“The”</b> is ال (il- / al-). Before “sun letters” (ت ث د ذ ر ز س ش ص ض ط ظ ل ن) the l disappears and the letter doubles: الشّاي <i>ish-shāy</i>, but الحَليب <i>il-ḥalīb</i>.</p>`,
    },
    dialogue: {
      scene: 'Ordering at a café in Beirut.',
      lines: [
        ['Waiter', 'أَهْلا وسَهْلا! شو بَدَّك؟', 'ahla w sahla! shu biddak?', 'Welcome! What would you like?'],
        ['Customer', 'بَدّي شاي لَو سَمَحْت.', 'biddi shāy law samaḥt.', "I'd like a tea, please."],
        ['Waiter', 'مَعْ سُكَّر؟', 'maʿ sukkar?', 'With sugar?'],
        ['Customer', 'لَأ، بَلا سُكَّر. وخِبِز كَمان.', 'laʾ, bala sukkar. w khibiz kamān.', 'No, without sugar. And bread too.'],
        ['Waiter', 'تْفَضَّل. صَحْتين!', 'tfaḍḍal. ṣaḥtēn!', 'Here you are. Enjoy!'],
        ['Customer', 'شُكْرًا! الحْساب لَو سَمَحْت.', 'shukran! il-ḥsāb law samaḥt.', 'Thanks! The bill, please.'],
      ],
      questions: [
        { q: 'What does the customer drink?', options: ['Tea without sugar', 'Coffee with sugar', 'Juice'], a: 0 },
        { q: 'What else does the customer order?', options: ['Bread', 'Chicken', 'Rice'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A waiter greets you in a café.',
      turns: [
        { p: ['أَهْلا! شو بَدَّك؟', 'ahla! shu biddak?', 'Hi! What would you like?'], cue: "Say you'd like a coffee, please.", a: ['بَدّي قَهْوة لَو سَمَحْت', 'قَهْوة لَو سَمَحْت', 'بَدّي قَهْوة', 'أُرِيدُ قَهْوَةً مِنْ فَضْلِكَ'], atr: 'biddi ʾahwe law samaḥt' },
        { p: ['مَعْ سُكَّر؟', 'maʿ sukkar?', 'With sugar?'], cue: 'Say: without sugar.', a: ['بَلا سُكَّر', 'لَأ، بَلا سُكَّر', 'بِدُونِ سُكَّرٍ'], atr: 'bala sukkar' },
        { p: ['تْفَضَّل!', 'tfaḍḍal!', 'Here you are!'], cue: 'Say thanks, and ask for the bill.', a: ['شُكْرًا، الحْساب لَو سَمَحْت', 'الحْساب لَو سَمَحْت', 'الْحِسَابُ مِنْ فَضْلِكَ'], atr: 'shukran, il-ḥsāb law samaḥt' },
      ],
    },
  },
  {
    id: 'town',
    title: 'بالمَدينة',
    subtitle: 'Places & directions',
    icon: '🗺️',
    goal: 'I can ask where places are and understand simple directions.',
    words: [
      ['مَدينة', 'madīne', 'city', '🏙️', null, { msa: ['مَدِينَة', 'madīna'] }],
      ['شارِع', 'shāreʿ', 'street', '🛣️', null, { msa: ['شَارِع', 'shāriʿ'] }],
      ['مَحَطّة', 'maḥaṭṭa', 'station', '🚉', null, { msa: ['مَحَطَّة', 'maḥaṭṭa'] }],
      ['أوتيل', 'ōtēl', 'hotel', '🏨', 'From French “hôtel”. Standard Arabic: فُنْدُق.', { msa: ['فُنْدُق', 'funduq'], alt: ['فندق'] }],
      ['مَطْعَم', 'maṭʿam', 'restaurant', '🍽️', 'Root ط-ع-م (food): “place of eating”.', { msa: ['مَطْعَم', 'maṭʿam'] }],
      ['صَيْدَلِيّة', 'ṣaydaliyye', 'pharmacy', '💊', null, { msa: ['صَيْدَلِيَّة', 'ṣaydaliyya'] }],
      ['جامِع', 'jāmeʿ', 'mosque', '🕌', 'Also مَسْجِد (masjid), source of English “mosque”.', { msa: ['مَسْجِد', 'masjid'], alt: ['مسجد'] }],
      ['سوق', 'sūʾ', 'market', '🧺', null, { msa: ['سُوق', 'sūq'] }],
      ['حَمّام', 'ḥammām', 'bathroom', '🚻', null, { msa: ['حَمَّام', 'ḥammām'] }],
      ['يَمين', 'yamīn', 'right', '➡️', null, { msa: ['يَمِين', 'yamīn'] }],
      ['شْمال', 'shmāl', 'left', '⬅️', 'Standard Arabic says يَسَار (yasār); شَمال there means “north”.', { msa: ['يَسَار', 'yasār'] }],
      ['قَريب', 'ʾarīb', 'near', '📍', null, { msa: ['قَرِيب', 'qarīb'] }],
      ['بْعيد', 'bʿīd', 'far', '🔭', null, { msa: ['بَعِيد', 'baʿīd'], alt: ['بعيد'] }],
    ],
    phrases: [
      ['وَين المَحَطّة؟', 'wēn il-maḥaṭṭa?', 'Where is the station?', '🚉', 'وَين (wēn) = where. Standard: أَيْنَ.', { msa: ['أَيْنَ الْمَحَطَّةُ؟', 'ayna l-maḥaṭṭa?'] }],
      ['وَين الحَمّام؟', 'wēn il-ḥammām?', 'Where is the bathroom?', '🚻', null, { msa: ['أَيْنَ الْحَمَّامُ؟', 'ayna l-ḥammām?'] }],
      ['عاليَمين.', 'ʿal-yamīn.', 'On the right.', '➡️', null, { msa: ['عَلَى الْيَمِينِ', 'ʿalā l-yamīn'], alt: ['عَلى اليمين'] }],
      ['عالشْمال.', 'ʿash-shmāl.', 'On the left.', '⬅️', null, { msa: ['عَلَى الْيَسَارِ', 'ʿalā l-yasār'], alt: ['عَلى الشمال'] }],
      ['دُغْري.', 'dughri.', 'Straight ahead.', '⬆️', 'From Turkish “doğru”. Very common for directions.', { msa: ['مُبَاشَرَةً', 'mubāsharatan'], alt: ['على طول'] }],
      ['بْعيد؟', 'bʿīd?', 'Is it far?', '🔭', 'A question is just rising intonation.', { msa: ['هَلْ هُوَ بَعِيدٌ؟', 'hal huwa baʿīd?'] }],
      ['في صَيْدَلِيّة قَريبة؟', 'fī ṣaydaliyye ʾarībe?', 'Is there a pharmacy nearby?', '💊', 'في (fī) = there is / is there?', { msa: ['هَلْ هُنَاكَ صَيْدَلِيَّةٌ قَرِيبَةٌ؟', 'hal hunāka ṣaydaliyyatun qarība?'] }],
    ],
    grammar: {
      title: 'وَين؟ في…? — and feminine ة',
      body: `<p><b>وَين</b> (wēn) = where? &nbsp; <b>في</b> (fī) = there is / is there? &nbsp; <b>ما في</b> (mā fī) = there isn't.</p>
<p>Most feminine nouns end in <b>ة</b>, pronounced “-e” or “-a” in speech: مَحَطّة <i>maḥaṭṭa</i>, صَيْدَلِيّة <i>ṣaydaliyye</i>.</p>
<p>Adjectives come <b>after</b> the noun and agree — add ة for feminine:</p>
<table><tr><td>أوتيل قَريب</td><td><i>ōtēl ʾarīb</i></td><td>a nearby hotel</td></tr>
<tr><td>صَيْدَلِيّة قَريب<b>ة</b></td><td><i>ṣaydaliyye ʾarībe</i></td><td>a nearby pharmacy</td></tr></table>
<p><b>Spoken shortcuts:</b> عَلى ال… becomes عال… : عاليَمين <i>ʿal-yamīn</i> “on the right”.</p>`,
    },
    dialogue: {
      scene: 'A tourist in Amman looks for the station.',
      lines: [
        ['Tourist', 'عَفْوًا، وَين المَحَطّة؟', 'ʿafwan, wēn il-maḥaṭṭa?', 'Excuse me, where is the station?'],
        ['Local', 'روح دُغْري، وبَعْدين عالشْمال.', 'rūḥ dughri, w baʿdēn ʿash-shmāl.', 'Go straight, then on the left.'],
        ['Tourist', 'بْعيدة؟', 'bʿīde?', 'Is it far?'],
        ['Local', 'لَأ، قَريبة كْتير. خَمِس دَقايِق.', 'laʾ, ʾarībe ktīr. khamis daʾāyeʾ.', 'No, very near. Five minutes.'],
        ['Tourist', 'وفي صَيْدَلِيّة قَريبة؟', 'w fī ṣaydaliyye ʾarībe?', 'And is there a pharmacy nearby?'],
        ['Local', 'إي، عاليَمين، جَنْب الجامِع.', 'ē, ʿal-yamīn, janb ij-jāmeʿ.', 'Yes, on the right, next to the mosque.'],
      ],
      questions: [
        { q: 'How far is the station?', options: ['Five minutes', 'Fifteen minutes', 'Very far'], a: 0 },
        { q: 'Where is the pharmacy?', options: ['Next to the mosque', 'Next to the hotel', 'In the market'], a: 0 },
      ],
    },
    roleplay: {
      scene: "You're looking for your hotel.",
      turns: [
        { p: ['إي؟ تْفَضَّل.', 'ē? tfaḍḍal.', 'Yes? Go ahead.'], cue: 'Ask where the hotel is.', a: ['وَين الأوتيل؟', 'عَفْوًا، وَين الأوتيل؟', 'أَيْنَ الْفُنْدُقُ؟'], atr: 'wēn il-ōtēl?' },
        { p: ['روح دُغْري، وبَعْدين عاليَمين.', 'rūḥ dughri, w baʿdēn ʿal-yamīn.', 'Go straight, then on the right.'], cue: 'Ask: is it far?', a: ['بْعيد؟', 'هَلْ هُوَ بَعِيدٌ؟'], atr: 'bʿīd?' },
        { p: ['لَأ، قَريب كْتير.', 'laʾ, ʾarīb ktīr.', 'No, very near.'], cue: 'Say thank you very much.', a: ['شُكْرًا كْتير', 'شُكْرًا', 'يِسْلَمو'], atr: 'shukran ktīr' },
      ],
    },
  },
  {
    id: 'time',
    title: 'قَدّيش السّاعة؟',
    subtitle: 'Time & days',
    icon: '🕒',
    goal: 'I can tell the time, name the days and make a simple plan.',
    words: [
      ['اليَوم', 'il-yōm', 'today', '📅', null, { msa: ['الْيَوْم', 'al-yawm'] }],
      ['بُكْرا', 'bukra', 'tomorrow', '➡️', null, { msa: ['غَدًا', 'ghadan'], alt: ['بكره'] }],
      ['مْبارِح', 'mbēreḥ', 'yesterday', '⬅️', null, { msa: ['أَمْس', 'ams'] }],
      ['الأَحَد', 'il-aḥad', 'Sunday', '1️⃣', 'From أَحَد “one” — the first day of the week.', { msa: ['الْأَحَد', 'al-aḥad'] }],
      ['التَّنين', 'it-tanēn', 'Monday', '2️⃣', 'From “two”.', { msa: ['الِاثْنَيْن', 'al-ithnayn'] }],
      ['التَّلاتا', 'it-talāta', 'Tuesday', '3️⃣', 'From “three”.', { msa: ['الثُّلَاثَاء', 'ath-thulāthāʾ'] }],
      ['الأَرْبْعا', 'il-arbʿa', 'Wednesday', '4️⃣', 'From “four”.', { msa: ['الْأَرْبِعَاء', 'al-arbiʿāʾ'] }],
      ['الخَميس', 'il-khamīs', 'Thursday', '5️⃣', 'From “five”.', { msa: ['الْخَمِيس', 'al-khamīs'] }],
      ['الجُمْعة', 'ij-jumʿa', 'Friday', '🕌', 'The day of “gathering” for congregational prayer.', { msa: ['الْجُمُعَة', 'al-jumuʿa'] }],
      ['السَّبْت', 'is-sabt', 'Saturday', '6️⃣', null, { msa: ['السَّبْت', 'as-sabt'] }],
      ['الصُّبِح', 'iṣ-ṣubiḥ', 'the morning', '🌄', null, { msa: ['الصَّبَاح', 'aṣ-ṣabāḥ'], alt: ['الصبح'] }],
      ['المَسا', 'il-masa', 'the evening', '🌇', null, { msa: ['الْمَسَاء', 'al-masāʾ'] }],
      ['هَلَّق', 'hallaʾ', 'now', '⏰', 'Also written هلأ. In Jordan/Palestine: هَلْقَيْت or هَسّا (hassa).', { msa: ['الْآن', 'al-ān'], alt: ['هلأ', 'هسا'] }],
    ],
    phrases: [
      ['قَدّيش السّاعة؟', 'ʾaddēsh is-sāʿa?', 'What time is it?', '🕒', null, { msa: ['كَمِ السَّاعَةُ؟', 'kami s-sāʿa?'] }],
      ['السّاعة تْلاتة.', 'is-sāʿa tlēte.', "It's three o'clock.", '🕒', 'Spoken Arabic just uses the normal number. Standard uses “the third hour”.', { msa: ['السَّاعَةُ الثَّالِثَةُ', 'as-sāʿatu th-thālitha'] }],
      ['اليَوم الجُمْعة.', 'il-yōm ij-jumʿa.', 'Today is Friday.', '📅', null, { msa: ['الْيَوْمَ الْجُمُعَةُ', 'al-yawma l-jumuʿa'] }],
      ['أَيّا ساعة؟', 'ayya sāʿa?', 'At what time?', '⏰', 'Also: عَ قَدّيش؟ (ʿa ʾaddēsh?)', { msa: ['فِي أَيِّ سَاعَةٍ؟', 'fī ayyi sāʿa?'], alt: ['ع قديش'] }],
      ['مِنْشوفَك بُكْرا!', 'minshūfak bukra!', 'See you tomorrow! (to a man)', '👋', 'Literally “we see you tomorrow”. To a woman: مِنْشوفِك (minshūfik).', { msa: ['أَرَاكَ غَدًا', 'arāka ghadan'], alt: ['منشوفك بكرا'] }],
      ['أَنا مَشْغول هَلَّق.', 'ana mashghūl hallaʾ.', "I'm busy now. (man)", '📵', 'A woman says مَشْغولة (mashghūle).', { msa: ['أَنَا مَشْغُولٌ الْآنَ', 'anā mashghūlun al-ān'], alt: ['أنا مشغولة هلق'] }],
    ],
    grammar: {
      title: 'Telling the time the spoken way',
      body: `<p>Spoken Arabic is simpler than standard here: <b>السّاعة + number</b>.</p>
<table><tr><td>1:00</td><td>السّاعة وِحْدة</td><td><i>is-sāʿa wiḥde</i></td></tr>
<tr><td>3:00</td><td>السّاعة تْلاتة</td><td><i>is-sāʿa tlēte</i></td></tr>
<tr><td>+ ¼</td><td>ورُبْع</td><td><i>w rubʿ</i></td></tr>
<tr><td>+ ½</td><td>ونُصّ</td><td><i>w nuṣṣ</i></td></tr>
<tr><td>− ¼</td><td>إِلّا رُبْع</td><td><i>illa rubʿ</i></td></tr></table>
<p>Standard Arabic uses ordinals instead: السَّاعَةُ الثَّالِثَةُ — “the third hour”.</p>
<p><b>Culture:</b> the weekend is <b>Friday</b> (and Saturday in Jordan); in Lebanon it's Saturday–Sunday.</p>`,
    },
    dialogue: {
      scene: 'Two friends make plans.',
      lines: [
        ['Ali', 'إِنْتِ مَشْغولة اليَوم؟', 'inti mashghūle il-yōm?', 'Are you busy today?'],
        ['Rana', 'إي، مَشْغولة هَلَّق. وبُكْرا؟', 'ē, mashghūle hallaʾ. w bukra?', "Yes, I'm busy now. What about tomorrow?"],
        ['Ali', 'بُكْرا السَّبْت. ماشي!', 'bukra is-sabt. māshi!', "Tomorrow is Saturday. Okay!"],
        ['Rana', 'أَيّا ساعة؟', 'ayya sāʿa?', 'At what time?'],
        ['Ali', 'السّاعة خَمْسة؟', 'is-sāʿa khamse?', "At five?"],
        ['Rana', 'تَمام! مِنْشوفَك بُكْرا!', 'tamām! minshūfak bukra!', 'Great! See you tomorrow!'],
      ],
      questions: [
        { q: 'When will they meet?', options: ['Saturday at 5', 'Friday at 5', 'Saturday at 3'], a: 0 },
        { q: "Why can't Rana meet today?", options: ['She is busy', 'She is ill', 'She is travelling'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A friend wants to meet up.',
      turns: [
        { p: ['إِنْتَ مَشْغول اليَوم؟', 'inte mashghūl il-yōm?', 'Are you busy today?'], cue: "Say: yes, I'm busy now.", a: ['إي، أَنا مَشْغول هَلَّق', 'إي، مَشْغول هَلَّق', 'أَنا مَشْغولة هَلَّق', 'أَنا مَشْغول'], atr: 'ē, ana mashghūl hallaʾ' },
        { p: ['وبُكْرا؟ السّاعة أَرْبْعة؟', 'w bukra? is-sāʿa arbʿa?', 'And tomorrow? At four?'], cue: 'Say: okay!', a: ['ماشي', 'تَمام', 'طَيِّب', 'أَكيد'], atr: 'māshi' },
        { p: ['تَمام!', 'tamām!', 'Great!'], cue: 'Say: see you tomorrow!', a: ['مِنْشوفَك بُكْرا', 'مِنْشوفِك بُكْرا', 'أَرَاكَ غَدًا'], atr: 'minshūfak bukra' },
      ],
    },
  },
  {
    id: 'shopping',
    title: 'بالسّوق',
    subtitle: 'Shopping & prices',
    icon: '🛍️',
    goal: 'I can ask prices, bargain politely and pay.',
    words: [
      ['مَحَلّ', 'maḥall', 'shop', '🏬', null, { msa: ['مَحَلّ', 'maḥall'] }],
      ['سِعِر', 'siʿir', 'price', '🏷️', null, { msa: ['سِعْر', 'siʿr'], alt: ['سعر'] }],
      ['غالي', 'ghāli', 'expensive', '💸', null, { msa: ['غَالٍ', 'ghālin'] }],
      ['رْخيص', 'rkhīṣ', 'cheap', '🪙', null, { msa: ['رَخِيص', 'rakhīṣ'], alt: ['رخيص'] }],
      ['مَصاري', 'maṣāri', 'money', '💰', null, { msa: ['نُقُود', 'nuqūd'] }],
      ['ليرة', 'līra', 'lira / pound (currency)', '💵', 'Lebanon and Syria use the lira; Jordan the dinar (دينار).', { msa: ['لِيرَة', 'līra'] }],
      ['قَميص', 'ʾamīṣ', 'shirt', '👔', null, { msa: ['قَمِيص', 'qamīṣ'] }],
      ['صَبّاط', 'ṣabbāṭ', 'shoe(s)', '👟', null, { msa: ['حِذَاء', 'ḥidhāʾ'] }],
      ['فُسْتان', 'fustān', 'dress', '👗', null, { msa: ['فُسْتَان', 'fustān'] }],
      ['شَنْطة', 'shanṭa', 'bag', '👜', null, { msa: ['حَقِيبَة', 'ḥaqība'] }],
      ['هاد', 'hād', 'this (m)', '👇', null, { msa: ['هَذَا', 'hādhā'] }],
      ['هاي', 'hāy', 'this (f)', '👇', null, { msa: ['هَذِهِ', 'hādhihi'] }],
      ['كَرْت', 'kart', 'card', '💳', null, { msa: ['بِطَاقَة', 'biṭāqa'] }],
    ],
    phrases: [
      ['بِقَدّيش هاد؟', 'b-ʾaddēsh hād?', 'How much is this?', '🏷️', 'Also: قَدّيش حَقّو؟ (ʾaddēsh ḥaʾʾo?), “how much is its price?”', { msa: ['بِكَمْ هَذَا؟', 'bi-kam hādhā?'], alt: ['قديش حقو'] }],
      ['هاد كْتير غالي!', 'hād ktīr ghāli!', "This is too expensive!", '💸', null, { msa: ['هَذَا غَالٍ جِدًّا', 'hādhā ghālin jiddan'] }],
      ['عِنْدَك قْياس أَكْبَر؟', 'ʿindak ʾyās akbar?', 'Do you have a bigger size?', '📏', null, { msa: ['هَلْ عِنْدَكَ مَقَاسٌ أَكْبَرُ؟', 'hal ʿindaka maqāsun akbar?'] }],
      ['رَح آخْدو.', 'raḥ ākhdo.', "I'll take it.", '🛍️', 'رَح (raḥ) = will. For a feminine item (شَنْطة): رَح آخْدا (ākhda).', { msa: ['سَآخُذُهُ', 'saʾākhudhuhu'], alt: ['رح آخدا', 'باخدو'] }],
      ['فيني إِدْفَع بالكَرْت؟', 'fīni idfaʿ bil-kart?', 'Can I pay by card?', '💳', 'فيني (fīni) = I can.', { msa: ['هَلْ أَسْتَطِيعُ الدَّفْعَ بِالْبِطَاقَةِ؟', 'hal astaṭīʿu d-dafʿa bil-biṭāqa?'] }],
      ['عَم إِتْفَرَّج بَسّ.', 'ʿam itfarraj bass.', "I'm just looking.", '👀', 'عَم (ʿam) = “-ing”, an action happening now.', { msa: ['أَنَا أَتَفَرَّجُ فَقَطْ', 'anā atafarraju faqaṭ'] }],
    ],
    grammar: {
      title: 'Bargaining, “can” and “will”',
      body: `<p>In a سوق, friendly bargaining is expected:</p>
<table><tr><td>بِقَدّيش؟</td><td><i>b-ʾaddēsh?</i></td><td>How much?</td></tr>
<tr><td>كْتير غالي!</td><td><i>ktīr ghāli!</i></td><td>Too expensive!</td></tr>
<tr><td>آخِر سِعِر؟</td><td><i>ākhir siʿir?</i></td><td>Your best price?</td></tr>
<tr><td>رَح آخْدو</td><td><i>raḥ ākhdo</i></td><td>I'll take it</td></tr></table>
<p><b>رَح</b> (raḥ) + verb = future “will”. Standard Arabic uses the prefix سَـ: سَآخُذُهُ.</p>
<p><b>فيني</b> (fīni) = I can, <b>فيك</b> (fīk) = you can.</p>`,
    },
    dialogue: {
      scene: 'In the old souk in Damascus.',
      lines: [
        ['Seller', 'أَهْلا وسَهْلا! تْفَضَّل.', 'ahla w sahla! tfaḍḍal.', 'Welcome! Come in.'],
        ['Buyer', 'شُكْرًا. بِقَدّيش هاي الشَّنْطة؟', 'shukran. b-ʾaddēsh hāy ish-shanṭa?', 'Thanks. How much is this bag?'],
        ['Seller', 'مِيتين ليرة.', 'mītēn līra.', 'Two hundred lira.'],
        ['Buyer', 'كْتير غالي!', 'ktīr ghāli!', "That's too expensive!"],
        ['Seller', 'كِرْمالَك، مِيّة وخَمْسين.', 'kirmālak, miyye w khamsīn.', 'For you, one hundred and fifty.'],
        ['Buyer', 'ماشي، رَح آخْدا!', 'māshi, raḥ ākhda!', "Okay, I'll take it!"],
      ],
      questions: [
        { q: 'What was the first price?', options: ['200 lira', '150 lira', '100 lira'], a: 0 },
        { q: 'Did the buyer get a discount?', options: ['Yes, 50 lira', 'No', 'Yes, 100 lira'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'Buying a shirt at a market stall.',
      turns: [
        { p: ['أَهْلا وسَهْلا!', 'ahla w sahla!', 'Welcome!'], cue: 'Ask how much this is.', a: ['بِقَدّيش هاد؟', 'قَدّيش حَقّو؟', 'بِقَدّيش هاد القَميص؟', 'بِكَمْ هَذَا؟'], atr: 'b-ʾaddēsh hād?' },
        { p: ['خَمْسين ليرة.', 'khamsīn līra.', 'Fifty lira.'], cue: "Say it's too expensive.", a: ['هاد كْتير غالي', 'كْتير غالي', 'هَذَا غَالٍ جِدًّا'], atr: 'hād ktīr ghāli' },
        { p: ['ماشي، أَرْبْعين.', 'māshi, arbʿīn.', 'Okay, forty.'], cue: "Say: I'll take it.", a: ['رَح آخْدو', 'ماشي، رَح آخْدو', 'سَآخُذُهُ'], atr: 'raḥ ākhdo' },
      ],
    },
  },
  {
    id: 'describing',
    title: 'الأَلْوان',
    subtitle: 'Colours & descriptions',
    icon: '🎨',
    goal: 'I can describe people and things using colours and adjectives.',
    words: [
      ['أَحْمَر', 'aḥmar', 'red', '🟥', 'Feminine: حَمْرا (ḥamra).', { msa: ['أَحْمَر', 'aḥmar'] }],
      ['أَزْرَق', 'azraʾ', 'blue', '🟦', 'Feminine: زَرْقا (zarʾa).', { msa: ['أَزْرَق', 'azraq'] }],
      ['أَخْضَر', 'akhḍar', 'green', '🟩', 'Feminine: خَضْرا (khaḍra).', { msa: ['أَخْضَر', 'akhḍar'] }],
      ['أَصْفَر', 'aṣfar', 'yellow', '🟨', null, { msa: ['أَصْفَر', 'aṣfar'] }],
      ['أَبْيَض', 'abyaḍ', 'white', '⬜', 'Feminine: بَيْضا (bayḍa).', { msa: ['أَبْيَض', 'abyaḍ'] }],
      ['أَسْوَد', 'aswad', 'black', '⬛', null, { msa: ['أَسْوَد', 'aswad'] }],
      ['كْبير', 'kbīr', 'big', '🐘', null, { msa: ['كَبِير', 'kabīr'], alt: ['كبير'] }],
      ['زْغير', 'zghīr', 'small', '🐭', 'Standard ص becomes ز in speech: صَغِير → زْغير.', { msa: ['صَغِير', 'ṣaghīr'], alt: ['زغير'] }],
      ['جْديد', 'jdīd', 'new', '✨', null, { msa: ['جَدِيد', 'jadīd'], alt: ['جديد'] }],
      ['قَديم', 'ʾadīm', 'old (things)', '🏚️', null, { msa: ['قَدِيم', 'qadīm'] }],
      ['حِلو', 'ḥilu', 'nice / beautiful / sweet', '🌸', 'Used for everything nice — people, places, food, ideas.', { msa: ['جَمِيل', 'jamīl'] }],
      ['طَويل', 'ṭawīl', 'tall / long', '🦒', null, { msa: ['طَوِيل', 'ṭawīl'] }],
      ['لَطيف', 'laṭīf', 'kind / nice', '😄', null, { msa: ['لَطِيف', 'laṭīf'] }],
    ],
    phrases: [
      ['البَيت كْبير.', 'il-bēt kbīr.', 'The house is big.', '🏠', null, { msa: ['الْبَيْتُ كَبِيرٌ', 'al-baytu kabīr'] }],
      ['السَّيّارة جْديدة.', 'is-sayyāra jdīde.', 'The car is new.', '🚗', null, { msa: ['السَّيَّارَةُ جَدِيدَةٌ', 'as-sayyāratu jadīda'] }],
      ['شو لَوْنو؟', 'shu lōno?', 'What colour is it? (m)', '🎨', 'For a feminine thing: شو لَوْنا؟ (shu lōna?)', { msa: ['مَا لَوْنُهُ؟', 'mā lawnuhu?'] }],
      ['لَوْنو أَحْمَر.', 'lōno aḥmar.', "It's red. (lit. its colour is red)", '🟥', null, { msa: ['لَوْنُهُ أَحْمَرُ', 'lawnuhu aḥmar'] }],
      ['صاحْبي كْتير لَطيف.', 'ṣāḥbi ktīr laṭīf.', 'My friend is very kind.', '😄', null, { msa: ['صَدِيقِي لَطِيفٌ جِدًّا', 'ṣadīqī laṭīfun jiddan'] }],
      ['هِيّ طَويلة.', 'hiyye ṭawīle.', 'She is tall.', '🦒', 'هُوّ (huwwe) = he, هِيّ (hiyye) = she.', { msa: ['هِيَ طَوِيلَةٌ', 'hiya ṭawīla'] }],
      ['كْتير حِلو!', 'ktīr ḥilu!', 'Really nice! / So beautiful!', '😍', null, { msa: ['جَمِيلٌ جِدًّا', 'jamīlun jiddan'] }],
    ],
    grammar: {
      title: '“The house is big” vs “a big house”',
      body: `<p>The word for “the” changes the meaning:</p>
<table><tr><td><b>ال</b>بَيت كْبير</td><td><i>il-bēt kbīr</i></td><td>The house <b>is</b> big</td></tr>
<tr><td>بَيت كْبير</td><td><i>bēt kbīr</i></td><td>a big house</td></tr>
<tr><td><b>ال</b>بَيت <b>ال</b>كْبير</td><td><i>il-bēt il-kbīr</i></td><td>the big house</td></tr></table>
<p>Adjectives agree: سَيّارة جْديد<b>ة</b> (a new car). Colours have special feminine forms: أَحْمَر → <b>حَمْرا</b>, أَبْيَض → <b>بَيْضا</b>.</p>
<p><b>Very:</b> كْتير comes <b>after</b> the adjective or before it for emphasis: حِلو كْتير / كْتير حِلو.</p>`,
    },
    dialogue: {
      scene: 'Talking about a new flat.',
      lines: [
        ['Nour', 'كِيف بَيْتَك الجْديد؟', 'kīf bētak il-jdīd?', 'How is your new house?'],
        ['Yusuf', 'زْغير، بَسّ كْتير حِلو.', 'zghīr, bass ktīr ḥilu.', 'Small, but really nice.'],
        ['Nour', 'وشو لَوْن المَطْبَخ؟', 'w shu lōn il-maṭbakh?', 'And what colour is the kitchen?'],
        ['Yusuf', 'أَبْيَض وأَزْرَق.', 'abyaḍ w azraʾ.', 'White and blue.'],
        ['Nour', 'حِلو! والجيران؟', 'ḥilu! w ij-jīrān?', 'Nice! And the neighbours?'],
        ['Yusuf', 'كْتير لُطَفا.', 'ktīr luṭafa.', 'Very kind.'],
      ],
      questions: [
        { q: "How is Yusuf's house?", options: ['Small but nice', 'Big and old', 'New and ugly'], a: 0 },
        { q: 'What colour is the kitchen?', options: ['White and blue', 'Red and black', 'Green'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A friend asks about your new car.',
      turns: [
        { p: ['عِنْدَك سَيّارة جْديدة؟ كِيفا؟', 'ʿindak sayyāra jdīde? kīfa?', 'You have a new car? How is it?'], cue: "Say it's small but really nice.", a: ['زْغيرة بَسّ كْتير حِلْوة', 'زْغيرة بَسّ حِلْوة', 'صَغِيرَةٌ لَكِنْ جَمِيلَةٌ'], atr: 'zghīre bass ktīr ḥilwe' },
        { p: ['شو لَوْنا؟', 'shu lōna?', 'What colour is it?'], cue: "Say: it's red.", a: ['لَوْنا أَحْمَر', 'حَمْرا', 'أَحْمَر'], atr: 'lōna aḥmar' },
        { p: ['ما شاء الله!', 'mā shāʾ alla!', 'How wonderful!'], cue: 'Say: thank you!', a: ['شُكْرًا', 'مِرسي', 'يِسْلَمو'], atr: 'shukran' },
      ],
    },
  },
  {
    id: 'routine',
    title: 'نْهاري',
    subtitle: 'Daily routine & verbs',
    icon: '⏰',
    goal: 'I can describe my day and ask others about theirs.',
    words: [
      ['بْفيق', 'bfīʾ', 'I wake up', '⏰', null, { msa: ['أَسْتَيْقِظُ', 'astayqiẓu'] }],
      ['باكُل', 'bākul', 'I eat', '🍽️', null, { msa: ['آكُلُ', 'ākulu'] }],
      ['بِشْرَب', 'bishrab', 'I drink', '🥤', null, { msa: ['أَشْرَبُ', 'ashrabu'] }],
      ['بْنام', 'bnām', 'I sleep', '😴', null, { msa: ['أَنَامُ', 'anāmu'] }],
      ['بِشْتِغِل', 'bishtighil', 'I work', '💼', null, { msa: ['أَعْمَلُ', 'aʿmalu'] }],
      ['بِدْرُس', 'bidrus', 'I study', '📚', null, { msa: ['أَدْرُسُ', 'adrusu'] }],
      ['بْروح', 'brūḥ', 'I go', '🚶', null, { msa: ['أَذْهَبُ', 'adhhabu'] }],
      ['بِقْرا', 'biʾra', 'I read', '📖', null, { msa: ['أَقْرَأُ', 'aqraʾu'] }],
      ['بِكْتُب', 'biktub', 'I write', '✍️', 'Root ك-ت-ب (writing).', { msa: ['أَكْتُبُ', 'aktubu'] }],
      ['كْتاب', 'ktāb', 'book', '📕', 'Root ك-ت-ب: “a written thing”.', { msa: ['كِتَاب', 'kitāb'], alt: ['كتاب'] }],
      ['مَكْتَب', 'maktab', 'office / desk', '🏢', 'Root ك-ت-ب: “place of writing”.', { msa: ['مَكْتَب', 'maktab'] }],
      ['بَيت', 'bēt', 'house / home', '🏠', null, { msa: ['بَيْت', 'bayt'] }],
      ['كِلّ يَوم', 'kill yōm', 'every day', '🔁', null, { msa: ['كُلَّ يَوْمٍ', 'kulla yawm'], alt: ['كل يوم'] }],
    ],
    phrases: [
      ['بْفيق السّاعة سَبْعة.', 'bfīʾ is-sāʿa sabʿa.', 'I wake up at seven.', '⏰', null, { msa: ['أَسْتَيْقِظُ فِي السَّاعَةِ السَّابِعَةِ', 'astayqiẓu fī s-sāʿati s-sābiʿa'] }],
      ['بِشْرَب قَهْوة كِلّ يَوم الصُّبِح.', 'bishrab ʾahwe kill yōm iṣ-ṣubiḥ.', 'I drink coffee every morning.', '☕', null, { msa: ['أَشْرَبُ الْقَهْوَةَ كُلَّ صَبَاحٍ', 'ashrabu l-qahwata kulla ṣabāḥ'] }],
      ['بِشْتِغِل بْمَكْتَب.', 'bishtighil b-maktab.', 'I work in an office.', '🏢', null, { msa: ['أَعْمَلُ فِي مَكْتَبٍ', 'aʿmalu fī maktab'] }],
      ['عَم إِدْرُس عَرَبي.', 'ʿam idrus ʿarabi.', "I'm studying Arabic.", '📚', 'عَم = “-ing”, happening now.', { msa: ['أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ', 'adrusu l-lughata l-ʿarabiyya'] }],
      ['رايِح عالبَيت.', 'rāyeḥ ʿal-bēt.', "I'm going home. (man)", '🏠', 'A woman says رايْحة (rāyḥa).', { msa: ['أَذْهَبُ إِلَى الْبَيْتِ', 'adhhabu ilā l-bayt'], alt: ['رايحة عالبيت'] }],
      ['شو بْتَعْمِل بالمَسا؟', 'shu btaʿmil bil-masa?', 'What do you do in the evening?', '🌇', null, { msa: ['مَاذَا تَفْعَلُ فِي الْمَسَاءِ؟', 'mādhā tafʿalu fī l-masāʾ?'] }],
    ],
    grammar: {
      title: 'b- (habit), ʿam (now), raḥ (future) — and roots',
      body: `<p>Spoken verbs use small markers in front:</p>
<table><tr><td><b>ب</b>ِكْتُب</td><td><i><b>b</b>iktub</i></td><td>I write (habitually)</td></tr>
<tr><td><b>عَم</b> إِكْتُب</td><td><i><b>ʿam</b> iktub</i></td><td>I'm writing (now)</td></tr>
<tr><td><b>رَح</b> إِكْتُب</td><td><i><b>raḥ</b> iktub</i></td><td>I will write</td></tr></table>
<p>Person prefixes: <b>b-</b>iktub (I), <b>bti</b>ktub (you), <b>byi</b>ktub (he), <b>bni</b>ktub (we). Standard Arabic: أَكْتُبُ، تَكْتُبُ، يَكْتُبُ، نَكْتُبُ.</p>
<p><b>Roots:</b> ك-ت-ب (k-t-b) = writing → كْتاب (book), كاتِب (writer), مَكْتَب (office), مَكْتَبة (library). Roots work the same in spoken and standard Arabic!</p>`,
    },
    dialogue: {
      scene: 'Chatting about daily life.',
      lines: [
        ['Salma', 'أَيّا ساعة بْتِفيق؟', 'ayya sāʿa btifīʾ?', 'What time do you wake up?'],
        ['Ben', 'بْفيق السّاعة سَبْعة، وبَعْدين بِشْرَب قَهْوة.', 'bfīʾ is-sāʿa sabʿa, w baʿdēn bishrab ʾahwe.', 'I wake up at seven, then I drink coffee.'],
        ['Salma', 'بْتِشْتِغِل بْمَكْتَب؟', 'btishtighil b-maktab?', 'Do you work in an office?'],
        ['Ben', 'إي. وبالمَسا عَم إِدْرُس عَرَبي.', 'ē. w bil-masa ʿam idrus ʿarabi.', "Yes. And in the evenings I'm studying Arabic."],
        ['Salma', 'بْرافو! وشو بْتَعْمِل يَوم الجُمْعة؟', 'brāvo! w shu btaʿmil yōm ij-jumʿa?', 'Well done! And what do you do on Fridays?'],
        ['Ben', 'بِقْرا كْتاب وبْنام كْتير!', 'biʾra ktāb w bnām ktīr!', 'I read a book and sleep a lot!'],
      ],
      questions: [
        { q: 'When does Ben study Arabic?', options: ['In the evening', 'In the morning', 'On Friday'], a: 0 },
        { q: 'What does Ben do on Fridays?', options: ['Reads and sleeps', 'Works', 'Goes to the market'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A language partner asks about your routine.',
      turns: [
        { p: ['أَيّا ساعة بْتِفيق؟', 'ayya sāʿa btifīʾ?', 'What time do you wake up?'], cue: 'Say you wake up at seven.', a: ['بْفيق السّاعة سَبْعة', 'السّاعة سَبْعة', 'أَسْتَيْقِظُ فِي السَّاعَةِ السَّابِعَةِ'], atr: 'bfīʾ is-sāʿa sabʿa' },
        { p: ['وَين بْتِشْتِغِل؟', 'wēn btishtighil?', 'Where do you work?'], cue: 'Say you work in an office.', a: ['بِشْتِغِل بْمَكْتَب', 'بْمَكْتَب', 'أَعْمَلُ فِي مَكْتَبٍ'], atr: 'bishtighil b-maktab' },
        { p: ['وشو بْتَعْمِل بالمَسا؟', 'w shu btaʿmil bil-masa?', 'And what do you do in the evening?'], cue: "Say you're studying Arabic.", a: ['عَم إِدْرُس عَرَبي', 'بِدْرُس عَرَبي', 'أَدْرُسُ الْعَرَبِيَّةَ'], atr: 'ʿam idrus ʿarabi' },
      ],
    },
  },
  {
    id: 'travel',
    title: 'السَّفَر',
    subtitle: 'Travel & transport',
    icon: '✈️',
    goal: 'I can buy a ticket, ask about departures and get a taxi.',
    words: [
      ['سَفَر', 'safar', 'travel', '🧳', 'English “safari” comes from this root.', { msa: ['سَفَر', 'safar'] }],
      ['طَيّارة', 'ṭayyāra', 'plane', '✈️', 'Root ط-ي-ر (to fly).', { msa: ['طَائِرَة', 'ṭāʾira'] }],
      ['سَيّارة', 'sayyāra', 'car', '🚗', null, { msa: ['سَيَّارَة', 'sayyāra'] }],
      ['باص', 'bāṣ', 'bus', '🚌', 'Also سِرْفيس (servīs), a shared minibus taxi.', { msa: ['حَافِلَة', 'ḥāfila'] }],
      ['تاكْسي', 'tāksi', 'taxi', '🚕', null, { msa: ['سَيَّارَةُ أُجْرَة', 'sayyāratu ujra'] }],
      ['تَذْكَرة', 'tazkara', 'ticket', '🎫', 'Spoken ذ often becomes ز: تَذْكِرَة → tazkara.', { msa: ['تَذْكِرَة', 'tadhkira'] }],
      ['مَطار', 'maṭār', 'airport', '🛫', 'Root ط-ي-ر again: “place of flying”.', { msa: ['مَطَار', 'maṭār'] }],
      ['باسْبور', 'basbōr', 'passport', '🛂', null, { msa: ['جَوَازُ سَفَرٍ', 'jawāzu safar'] }],
      ['شَنَط', 'shanaṭ', 'bags / luggage', '🧳', null, { msa: ['أَمْتِعَة', 'amtiʿa'] }],
      ['أوضة', 'ʾōḍa', 'room', '🛏️', 'From Turkish “oda”.', { msa: ['غُرْفَة', 'ghurfa'], alt: ['غرفة'] }],
      ['حَجِز', 'ḥajiz', 'reservation', '📋', null, { msa: ['حَجْز', 'ḥajz'], alt: ['حجز'] }],
      ['إِيمْتى', 'ēmta', 'when?', '🕘', null, { msa: ['مَتَى', 'matā'], alt: ['امتى'] }],
    ],
    phrases: [
      ['بَدّي تَذْكَرة عَ عَمّان لَو سَمَحْت.', 'biddi tazkara ʿa ʿAmmān law samaḥt.', 'A ticket to Amman, please.', '🎫', 'عَ (ʿa) = to, a short form of عَلى.', { msa: ['تَذْكِرَةٌ إِلَى عَمَّانَ مِنْ فَضْلِكَ', 'tadhkiratun ilā ʿAmmān min faḍlika'] }],
      ['إِيمْتى بْيِطْلَع الباص؟', 'ēmta byiṭlaʿ il-bāṣ?', 'When does the bus leave?', '🕘', null, { msa: ['مَتَى تُغَادِرُ الْحَافِلَةُ؟', 'matā tughādiru l-ḥāfila?'] }],
      ['رايِح جايي.', 'rāyeḥ jāye.', 'Return (round trip).', '🔁', 'Literally “going, coming”.', { msa: ['ذَهَابٌ وَعَوْدَةٌ', 'dhahābun wa-ʿawda'] }],
      ['عِنْدي حَجِز.', 'ʿindi ḥajiz.', 'I have a reservation.', '📋', null, { msa: ['عِنْدِي حَجْزٌ', 'ʿindī ḥajz'] }],
      ['وَين مَوْقَف الباص؟', 'wēn mawʾaf il-bāṣ?', 'Where is the bus stop?', '🚏', null, { msa: ['أَيْنَ مَوْقِفُ الْحَافِلَةِ؟', 'ayna mawqifu l-ḥāfila?'] }],
      ['وَدّيني عالأوتيل لَو سَمَحْت.', 'waddīni ʿal-ōtēl law samaḥt.', 'Take me to the hotel, please.', '🚕', null, { msa: ['خُذْنِي إِلَى الْفُنْدُقِ مِنْ فَضْلِكَ', 'khudhnī ilā l-funduq min faḍlika'] }],
      ['الباص مِتْأَخِّر.', 'il-bāṣ mitʾakhkhir.', 'The bus is late.', '⌛', null, { msa: ['الْحَافِلَةُ مُتَأَخِّرَةٌ', 'al-ḥāfilatu mutaʾakhkhira'] }],
    ],
    grammar: {
      title: 'Going places: عَ، مِن، بـ',
      body: `<table><tr><td><b>عَ / عَلى</b></td><td><i>ʿa / ʿala</i></td><td>to</td><td>عَ بَيْروت — to Beirut</td></tr>
<tr><td><b>مِن</b></td><td><i>min</i></td><td>from</td><td>مِن الشّام — from Damascus</td></tr>
<tr><td><b>بـ</b></td><td><i>b-</i></td><td>in / by</td><td>بالباص — by bus</td></tr></table>
<p>Standard Arabic says إِلَى (ilā) for “to” and فِي (fī) for “in”.</p>
<p><b>Question words:</b> وَين (wēn) where · إِيمْتى (ēmta) when · قَدّيش (ʾaddēsh) how much · شو (shu) what · كِيف (kīf) how · مين (mīn) who · لَيش (lēsh) why.</p>
<p><b>Taxis:</b> agree on the price first: قَدّيش لَعَ الأوتيل؟ (ʾaddēsh la-ʿal-ōtēl?)</p>`,
    },
    dialogue: {
      scene: 'At the bus station in Amman.',
      lines: [
        ['Traveller', 'بَدّي تَذْكَرة عَ إِرْبِد لَو سَمَحْت.', 'biddi tazkara ʿa Irbid law samaḥt.', 'A ticket to Irbid, please.'],
        ['Clerk', 'رايِح بَسّ ولّا رايِح جايي؟', 'rāyeḥ bass walla rāyeḥ jāye?', 'One way or return?'],
        ['Traveller', 'رايِح جايي. إِيمْتى بْيِطْلَع الباص؟', 'rāyeḥ jāye. ēmta byiṭlaʿ il-bāṣ?', 'Return. When does the bus leave?'],
        ['Clerk', 'السّاعة عَشْرة ونُصّ.', 'is-sāʿa ʿashra w nuṣṣ.', 'At half past ten.'],
        ['Traveller', 'قَدّيش التَّذْكَرة؟', 'ʾaddēsh it-tazkara?', 'How much is the ticket?'],
        ['Clerk', 'تْلات دَنانير.', 'tlat danānīr.', 'Three dinars.'],
      ],
      questions: [
        { q: 'When does the bus leave?', options: ['10:30', '10:00', '11:30'], a: 0 },
        { q: 'What kind of ticket does the traveller buy?', options: ['Return', 'One way', 'First class'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You get into a taxi at the airport.',
      turns: [
        { p: ['أَهْلا! لَوَين؟', 'ahla! la-wēn?', 'Hi! Where to?'], cue: 'Say: Take me to the hotel, please.', a: ['وَدّيني عالأوتيل لَو سَمَحْت', 'عالأوتيل لَو سَمَحْت', 'خُذْنِي إِلَى الْفُنْدُقِ مِنْ فَضْلِكَ'], atr: 'waddīni ʿal-ōtēl law samaḥt' },
        { p: ['ماشي. عِنْدَك شَنَط؟', 'māshi. ʿindak shanaṭ?', 'Okay. Do you have bags?'], cue: 'Say: yes, one bag.', a: ['إي، شَنْطة وِحْدة', 'إي', 'نَعَمْ، حَقِيبَةٌ وَاحِدَةٌ'], atr: 'ē, shanṭa wiḥde' },
        { p: ['وْصِلْنا! هاد الأوتيل.', 'wṣilna! hād il-ōtēl.', "We've arrived! This is the hotel."], cue: 'Ask: how much?', a: ['قَدّيش؟', 'بِقَدّيش؟', 'قَدّيش الحْساب؟', 'بِكَمْ؟'], atr: 'ʾaddēsh?' },
      ],
    },
  },
  {
    id: 'health',
    title: 'الصِّحّة',
    subtitle: 'Feelings & health',
    icon: '🩺',
    goal: 'I can say how I feel and explain a simple health problem.',
    words: [
      ['مَبْسوط', 'mabsūṭ', 'happy', '😊', 'Also means “pleased / doing well”.', { msa: ['سَعِيد', 'saʿīd'] }],
      ['زَعْلان', 'zaʿlān', 'sad / upset', '😢', null, { msa: ['حَزِين', 'ḥazīn'] }],
      ['تَعْبان', 'taʿbān', 'tired / unwell', '🥱', null, { msa: ['مُتْعَب', 'mutʿab'] }],
      ['مَريض', 'marīḍ', 'ill / sick', '🤒', null, { msa: ['مَرِيض', 'marīḍ'] }],
      ['مْعَصِّب', 'mʿaṣṣib', 'angry', '😠', null, { msa: ['غَاضِب', 'ghāḍib'] }],
      ['خايِف', 'khāyef', 'afraid', '😨', null, { msa: ['خَائِف', 'khāʾif'] }],
      ['راس', 'rās', 'head', '🧠', null, { msa: ['رَأْس', 'raʾs'] }],
      ['بَطِن', 'baṭin', 'stomach / belly', '🤢', null, { msa: ['بَطْن', 'baṭn'], alt: ['بطن'] }],
      ['دُكْتور', 'doktōr', 'doctor', '🧑‍⚕️', null, { msa: ['طَبِيب', 'ṭabīb'] }],
      ['دَوا', 'dawa', 'medicine', '💊', null, { msa: ['دَوَاء', 'dawāʾ'] }],
      ['وَجَع', 'wajaʿ', 'pain / ache', '🤕', null, { msa: ['أَلَم', 'alam'] }],
      ['سُخونة', 'skhūne', 'fever', '🌡️', 'Also حَرارة (ḥarāra).', { msa: ['حُمَّى', 'ḥummā'], alt: ['حرارة'] }],
    ],
    phrases: [
      ['كِيفَك هَلَّق؟', 'kīfak hallaʾ?', 'How are you feeling now?', '❓', null, { msa: ['كَيْفَ تَشْعُرُ الْآنَ؟', 'kayfa tashʿuru l-ān?'] }],
      ['أَنا تَعْبان.', 'ana taʿbān.', "I'm not feeling well. (man)", '🤒', 'A woman says تَعْبانة (taʿbāne).', { msa: ['أَنَا مَرِيضٌ', 'anā marīḍ'], alt: ['أنا تعبانة', 'أنا مريض'] }],
      ['عِنْدي وَجَع راس.', 'ʿindi wajaʿ rās.', 'I have a headache.', '🤕', null, { msa: ['عِنْدِي صُدَاعٌ', 'ʿindī ṣudāʿ'] }],
      ['بَطْني عَم يوجَعْني.', 'baṭni ʿam yūjaʿni.', 'My stomach hurts.', '🤢', null, { msa: ['بَطْنِي يُؤْلِمُنِي', 'baṭnī yuʾlimunī'] }],
      ['بَدّي دُكْتور.', 'biddi doktōr.', 'I need a doctor.', '🧑‍⚕️', null, { msa: ['أَحْتَاجُ إِلَى طَبِيبٍ', 'aḥtāju ilā ṭabīb'] }],
      ['اِتْصْلوا بالإِسْعاف!', 'itṣlu bil-isʿāf!', 'Call an ambulance!', '🚑', null, { msa: ['اُطْلُبُوا الْإِسْعَافَ', 'uṭlubū l-isʿāf'] }],
      ['سَلامْتَك!', 'salāmtak!', 'Get well soon!', '💐', 'Literally “your safety”. Reply: الله يْسَلْمَك (alla ysalmak).', { msa: ['سَلَامَتُكَ', 'salāmatuk'] }],
    ],
    grammar: {
      title: 'Feelings, illness and “it hurts me”',
      body: `<p>Feelings: <b>أَنا</b> + adjective (+ <b>ة</b> if you're a woman):</p>
<table><tr><td>أَنا تَعْبان</td><td><i>ana taʿbān</i></td><td>I'm unwell / tired (m)</td></tr>
<tr><td>أَنا تَعْبان<b>ة</b></td><td><i>ana taʿbāne</i></td><td>(f)</td></tr>
<tr><td>أَنا مَبْسوط</td><td><i>ana mabsūṭ</i></td><td>I'm happy</td></tr></table>
<p>Illness uses <b>عِنْدي</b> (“I have”): عِنْدي سُخونة (fever), عِنْدي وَجَع راس (headache).</p>
<p><b>It hurts me:</b> body part + <b>عَم يوجَعْني</b> (m) / <b>عَم توجَعْني</b> (f): راسي عَم يوجَعْني — “my head is hurting me”. Standard: يُؤْلِمُنِي.</p>`,
    },
    dialogue: {
      scene: 'At the pharmacy.',
      lines: [
        ['Pharmacist', 'أَهْلا، كِيف فيني ساعْدَك؟', 'ahla, kīf fīni sāʿdak?', 'Hello, how can I help you?'],
        ['Customer', 'أَنا تَعْبان. عِنْدي وَجَع راس.', 'ana taʿbān. ʿindi wajaʿ rās.', "I'm not well. I have a headache."],
        ['Pharmacist', 'عِنْدَك سُخونة؟', 'ʿindak skhūne?', 'Do you have a fever?'],
        ['Customer', 'لَأ، بَسّ بَطْني عَم يوجَعْني.', 'laʾ, bass baṭni ʿam yūjaʿni.', 'No, but my stomach hurts.'],
        ['Pharmacist', 'خود هاد الدَّوا تْلات مَرّات باليَوم.', 'khōd hād id-dawa tlat marrāt bil-yōm.', 'Take this medicine three times a day.'],
        ['Customer', 'شُكْرًا كْتير.', 'shukran ktīr.', 'Thank you very much.'],
        ['Pharmacist', 'سَلامْتَك!', 'salāmtak!', 'Get well soon!'],
      ],
      questions: [
        { q: 'What hurts besides the head?', options: ['The stomach', 'The throat', 'The back'], a: 0 },
        { q: 'How often should the medicine be taken?', options: ['Three times a day', 'Once a day', 'Twice a day'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You visit a doctor.',
      turns: [
        { p: ['أَهْلا. شو في؟ كِيفَك؟', 'ahla. shu fī? kīfak?', "Hello. What's wrong? How are you?"], cue: "Say you're not well and have a headache.", a: ['أَنا تَعْبان، عِنْدي وَجَع راس', 'عِنْدي وَجَع راس', 'أَنا تَعْبانة، عِنْدي وَجَع راس', 'عِنْدِي صُدَاعٌ'], atr: 'ana taʿbān, ʿindi wajaʿ rās' },
        { p: ['عِنْدَك سُخونة؟', 'ʿindak skhūne?', 'Do you have a fever?'], cue: 'Say: no, but my stomach hurts.', a: ['لَأ، بَسّ بَطْني عَم يوجَعْني', 'بَطْني عَم يوجَعْني', 'بَطْنِي يُؤْلِمُنِي'], atr: 'laʾ, bass baṭni ʿam yūjaʿni' },
        { p: ['خود هاد الدَّوا. سَلامْتَك!', 'khōd hād id-dawa. salāmtak!', 'Take this medicine. Get well soon!'], cue: 'Say thank you very much.', a: ['شُكْرًا كْتير', 'شُكْرًا', 'الله يْسَلْمَك'], atr: 'shukran ktīr' },
      ],
    },
  },
];
