// Arabic course — Modern Standard Arabic (فُصْحَى), CEFR A1 communicative syllabus.
// Fully vowelled (with harakat) so the learner can read every word they hear.
// Item tuples: [arabic, transliteration, english, emoji?, note?, alternatives?]
// Dialogue lines: [speaker, arabic, transliteration, english]
// Roleplay turns: { p: [arabic, translit, english], cue, a: [accepted arabic], atr: translit of a[0] }

export default [
  {
    id: 'greetings',
    title: 'مَرْحَبًا',
    subtitle: 'Greetings & introductions',
    icon: '👋',
    goal: 'I can greet people, say my name and ask how someone is.',
    words: [
      ['مَرْحَبًا', 'marḥaban', 'hello', '👋'],
      ['أَهْلًا', 'ahlan', 'hi / welcome', '🙂'],
      ['صَبَاحُ الْخَيْرِ', 'ṣabāḥu l-khayr', 'good morning', '🌅', 'Reply: صَبَاحُ النُّورِ (ṣabāḥu n-nūr) — “morning of light”.'],
      ['مَسَاءُ الْخَيْرِ', 'masāʾu l-khayr', 'good evening', '🌆', 'Reply: مَسَاءُ النُّورِ (masāʾu n-nūr).'],
      ['مَعَ السَّلَامَةِ', 'maʿa s-salāma', 'goodbye', '🚶', 'Literally “with safety”.'],
      ['نَعَمْ', 'naʿam', 'yes', '✅'],
      ['لَا', 'lā', 'no', '❌'],
      ['شُكْرًا', 'shukran', 'thank you', '🙏'],
      ['عَفْوًا', 'ʿafwan', "you're welcome / excuse me", '😊'],
      ['أَنَا', 'anā', 'I', '🙋'],
      ['أَنْتَ', 'anta', 'you (to a man)', '👉', 'To a woman: أَنْتِ (anti).'],
      ['أَنْتِ', 'anti', 'you (to a woman)', '👉'],
      ['اِسْم', 'ism', 'name', '📛'],
    ],
    phrases: [
      ['السَّلَامُ عَلَيْكُمْ', 'as-salāmu ʿalaykum', 'Peace be upon you (hello)', '🕊️', 'The universal greeting across the Arab world.', ['السلام عليكم']],
      ['وَعَلَيْكُمُ السَّلَامُ', 'wa-ʿalaykumu s-salām', 'And upon you peace (the reply)', '🕊️'],
      ['مَا اسْمُكَ؟', 'mā smuka?', "What's your name? (to a man)", '❓', 'To a woman: مَا اسْمُكِ؟ (mā smuki?)', ['ما اسمك']],
      ['اِسْمِي سَامِي.', 'ismī Sāmī.', 'My name is Sami.', '📛', '-ī at the end means “my”.'],
      ['تَشَرَّفْنَا!', 'tasharrafnā!', 'Nice to meet you!', '🤝', 'Literally “we are honoured”.'],
      ['كَيْفَ حَالُكَ؟', 'kayfa ḥāluka?', 'How are you? (to a man)', '💬', 'To a woman: كَيْفَ حَالُكِ؟ (kayfa ḥāluki?)', ['كيف حالك']],
      ['أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ.', 'anā bi-khayr, al-ḥamdu li-llāh.', "I'm well, thank God.", '😊', 'Arabs very often add الْحَمْدُ لِلَّهِ — “praise be to God”.', ['بخير الحمد لله', 'انا بخير']],
      ['وَأَنْتَ؟', 'wa-anta?', 'And you? (to a man)', '↩️', 'To a woman: وَأَنْتِ؟ (wa-anti?)', ['وانت']],
    ],
    grammar: {
      title: 'Talking to a man or a woman — and no "am/is/are"',
      body: `<p>Arabic marks whether you're speaking <b>to a man or a woman</b>:</p>
<table><tr><th></th><th>to a man</th><th>to a woman</th></tr>
<tr><td>you</td><td>أَنْتَ <i>anta</i></td><td>أَنْتِ <i>anti</i></td></tr>
<tr><td>your name</td><td>اسْمُكَ <i>-ka</i></td><td>اسْمُكِ <i>-ki</i></td></tr>
<tr><td>how are you?</td><td>كَيْفَ حَالُكَ؟</td><td>كَيْفَ حَالُكِ؟</td></tr></table>
<p>The difference is just the short vowel: <b>fatḥa</b> ( َ = a) for men, <b>kasra</b> ( ِ = i) for women.</p>
<p><b>No verb “to be” in the present:</b> أَنَا بِخَيْرٍ = “I [am] well”, أَنَا سَامِي = “I [am] Sami”.</p>`,
    },
    dialogue: {
      scene: 'Layla meets Karim at a conference.',
      lines: [
        ['Layla', 'السَّلَامُ عَلَيْكُمْ!', 'as-salāmu ʿalaykum!', 'Hello! (Peace be upon you)'],
        ['Karim', 'وَعَلَيْكُمُ السَّلَامُ!', 'wa-ʿalaykumu s-salām!', 'And upon you peace!'],
        ['Layla', 'مَا اسْمُكَ؟', 'mā smuka?', "What's your name?"],
        ['Karim', 'اِسْمِي كَرِيم. وَأَنْتِ؟', 'ismī Karīm. wa-anti?', "My name is Karim. And you?"],
        ['Layla', 'اِسْمِي لَيْلَى. تَشَرَّفْنَا!', 'ismī Laylā. tasharrafnā!', 'My name is Layla. Nice to meet you!'],
        ['Karim', 'تَشَرَّفْنَا! كَيْفَ حَالُكِ؟', 'tasharrafnā! kayfa ḥāluki?', 'Nice to meet you! How are you?'],
        ['Layla', 'بِخَيْرٍ، الْحَمْدُ لِلَّهِ.', 'bi-khayr, al-ḥamdu li-llāh.', 'Well, thank God.'],
      ],
      questions: [
        { q: "What is the man's name?", options: ['Karim', 'Sami', 'Adam'], a: 0 },
        { q: 'Why does Karim say “wa-anti” and not “wa-anta”?', options: ['He is speaking to a woman', 'It is more polite', 'It is a question'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You meet Omar in a café in Amman.',
      turns: [
        { p: ['السَّلَامُ عَلَيْكُمْ!', 'as-salāmu ʿalaykum!', 'Peace be upon you!'], cue: 'Reply to the greeting.', a: ['وَعَلَيْكُمُ السَّلَامُ'], atr: 'wa-ʿalaykumu s-salām' },
        { p: ['مَا اسْمُكَ؟', 'mā smuka?', "What's your name?"], cue: 'Say: My name is Adam.', a: ['اِسْمِي آدَم', 'أَنَا آدَم'], atr: 'ismī Ādam' },
        { p: ['تَشَرَّفْنَا! كَيْفَ حَالُكَ؟', 'tasharrafnā! kayfa ḥāluka?', 'Nice to meet you! How are you?'], cue: "Say you're well, thank God.", a: ['أَنَا بِخَيْرٍ، الْحَمْدُ لِلَّهِ', 'بِخَيْرٍ، الْحَمْدُ لِلَّهِ', 'بِخَيْرٍ'], atr: 'anā bi-khayr, al-ḥamdu li-llāh' },
        { p: ['مَعَ السَّلَامَةِ!', 'maʿa s-salāma!', 'Goodbye!'], cue: 'Say goodbye.', a: ['مَعَ السَّلَامَةِ'], atr: 'maʿa s-salāma' },
      ],
    },
  },
  {
    id: 'survival',
    title: 'لَا أَفْهَمُ',
    subtitle: 'Survival phrases',
    icon: '🛟',
    goal: "I can manage when I don't understand: ask to repeat, slow down, or explain.",
    words: [
      ['مِنْ فَضْلِكَ', 'min faḍlika', 'please (to a man)', '🙏', 'To a woman: مِنْ فَضْلِكِ (min faḍliki).'],
      ['آسِف', 'āsif', 'sorry (said by a man)', '😔', 'A woman says آسِفَة (āsifa).'],
      ['طَيِّب', 'ṭayyib', 'okay / good', '👍'],
      ['طَبْعًا', 'ṭabʿan', 'of course', '👌'],
      ['رُبَّمَا', 'rubbamā', 'maybe', '🤔'],
      ['جِدًّا', 'jiddan', 'very', '➕'],
      ['قَلِيلًا', 'qalīlan', 'a little', '🤏'],
      ['فَقَطْ', 'faqaṭ', 'only', '☝️'],
      ['هُنَا', 'hunā', 'here', '📍'],
      ['هُنَاكَ', 'hunāka', 'there', '👉'],
      ['لُغَة', 'lugha', 'language', '🗣️'],
      ['لَكِنْ', 'lākin', 'but', '↔️', 'Written with a “hidden” long ā: lā-kin.'],
      ['أَيْضًا', 'ayḍan', 'also', '➕'],
    ],
    phrases: [
      ['لَا أَفْهَمُ.', 'lā afham.', "I don't understand.", '🤷'],
      ['أَعِدْ مِنْ فَضْلِكَ.', 'aʿid min faḍlika.', 'Repeat, please.', '🔁'],
      ['بِبُطْءٍ مِنْ فَضْلِكَ.', 'bi-buṭʾ min faḍlika.', 'Slowly, please.', '🐢'],
      ['هَلْ تَتَكَلَّمُ الْإِنْجِلِيزِيَّةَ؟', 'hal tatakallamu l-injilīziyya?', 'Do you speak English?', '🇬🇧'],
      ['مَاذَا يَعْنِي هَذَا؟', 'mādhā yaʿnī hādhā?', 'What does this mean?', '📖'],
      ['كَيْفَ تَقُولُ هَذَا بِالْعَرَبِيَّةِ؟', 'kayfa taqūlu hādhā bil-ʿarabiyya?', 'How do you say this in Arabic?', '💭'],
      ['لَا أَعْرِفُ.', 'lā aʿrif.', "I don't know.", '🤷‍♀️'],
      ['أَتَكَلَّمُ الْعَرَبِيَّةَ قَلِيلًا.', 'atakallamu l-ʿarabiyya qalīlan.', 'I speak Arabic a little.', '🤏'],
    ],
    grammar: {
      title: 'Saying "not" and asking yes/no questions',
      body: `<p><b>Negation:</b> put <b>لَا</b> (lā) before a present-tense verb.</p>
<table><tr><td>أَفْهَمُ</td><td><i>afham</i></td><td>I understand</td></tr>
<tr><td><b>لَا</b> أَفْهَمُ</td><td><i>lā afham</i></td><td>I don't understand</td></tr>
<tr><td>أَعْرِفُ</td><td><i>aʿrif</i></td><td>I know</td></tr>
<tr><td><b>لَا</b> أَعْرِفُ</td><td><i>lā aʿrif</i></td><td>I don't know</td></tr></table>
<p><b>Yes/no questions:</b> start the sentence with <b>هَلْ</b> (hal): <span lang="ar">هَلْ تَتَكَلَّمُ الْعَرَبِيَّةَ؟</span> — “Do you speak Arabic?”</p>
<p>Notice the Arabic question mark <b>؟</b> faces the other way, because Arabic is written right-to-left.</p>`,
    },
    dialogue: {
      scene: 'A visitor asks a shopkeeper for help.',
      lines: [
        ['Visitor', 'عَفْوًا، هَلْ تَتَكَلَّمُ الْإِنْجِلِيزِيَّةَ؟', 'ʿafwan, hal tatakallamu l-injilīziyya?', 'Excuse me, do you speak English?'],
        ['Shopkeeper', 'لَا، آسِف. الْعَرَبِيَّةُ فَقَطْ.', 'lā, āsif. al-ʿarabiyyatu faqaṭ.', "No, sorry. Arabic only."],
        ['Visitor', 'طَيِّب. أَتَكَلَّمُ الْعَرَبِيَّةَ قَلِيلًا.', 'ṭayyib. atakallamu l-ʿarabiyya qalīlan.', 'Okay. I speak Arabic a little.'],
        ['Shopkeeper', 'مُمْتَاز! أَهْلًا وَسَهْلًا!', 'mumtāz! ahlan wa-sahlan!', 'Excellent! Welcome!'],
        ['Visitor', 'بِبُطْءٍ مِنْ فَضْلِكَ.', 'bi-buṭʾ min faḍlika.', 'Slowly, please.'],
        ['Shopkeeper', 'طَبْعًا! أَهْ-لًا وَ-سَهْ-لًا!', 'ṭabʿan! ah-lan wa-sah-lan!', 'Of course! Wel-come!'],
      ],
      questions: [
        { q: 'Does the shopkeeper speak English?', options: ['No, only Arabic', 'Yes, a little', 'Yes, fluently'], a: 0 },
        { q: 'What does the visitor ask for?', options: ['To speak slowly', 'The price', 'Directions'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A station employee answers you very fast.',
      turns: [
        { p: ['الْقِطَارُ يَصِلُ فِي السَّاعَةِ التَّاسِعَةِ وَالرُّبْعِ.', 'al-qiṭāru yaṣilu fī s-sāʿati t-tāsiʿati wa-r-rubʿ.', 'The train arrives at quarter past nine.'], cue: "Say sorry, you don't understand.", a: ['آسِف، لَا أَفْهَمُ', 'لَا أَفْهَمُ', 'آسِفَة، لَا أَفْهَمُ'], atr: 'āsif, lā afham' },
        { p: ['آه، آسِف!', 'āh, āsif!', 'Oh, sorry!'], cue: 'Ask them to repeat slowly, please.', a: ['أَعِدْ بِبُطْءٍ مِنْ فَضْلِكَ', 'بِبُطْءٍ مِنْ فَضْلِكَ', 'أَعِدْ مِنْ فَضْلِكَ'], atr: 'aʿid bi-buṭʾ min faḍlika' },
        { p: ['الْقِطَارُ... فِي السَّاعَةِ... التَّاسِعَةِ.', 'al-qiṭār… fī s-sāʿa… at-tāsiʿa.', 'The train… at… nine.'], cue: 'Say thank you very much.', a: ['شُكْرًا جَزِيلًا', 'شُكْرًا'], atr: 'shukran jazīlan' },
      ],
    },
  },
  {
    id: 'numbers',
    title: 'الْأَرْقَام',
    subtitle: 'Numbers, age & phone numbers',
    icon: '🔢',
    goal: 'I can count, read Arabic numerals, and say my age.',
    words: [
      ['صِفْر', 'ṣifr', 'zero', '٠', 'English “cipher” and “zero” come from this word!'],
      ['وَاحِد', 'wāḥid', 'one', '١'],
      ['اِثْنَان', 'ithnān', 'two', '٢'],
      ['ثَلَاثَة', 'thalātha', 'three', '٣'],
      ['أَرْبَعَة', 'arbaʿa', 'four', '٤'],
      ['خَمْسَة', 'khamsa', 'five', '٥'],
      ['سِتَّة', 'sitta', 'six', '٦'],
      ['سَبْعَة', 'sabʿa', 'seven', '٧'],
      ['ثَمَانِيَة', 'thamāniya', 'eight', '٨'],
      ['تِسْعَة', 'tisʿa', 'nine', '٩'],
      ['عَشَرَة', 'ʿashara', 'ten', '١٠'],
      ['عِشْرُون', 'ʿishrūn', 'twenty', '٢٠'],
      ['ثَلَاثُون', 'thalāthūn', 'thirty', '٣٠'],
      ['مِئَة', 'miʾa', 'one hundred', '١٠٠'],
    ],
    phrases: [
      ['كَمْ عُمْرُكَ؟', 'kam ʿumruka?', 'How old are you? (to a man)', '🎂', 'Literally “how much is your age?” To a woman: كَمْ عُمْرُكِ؟'],
      ['عُمْرِي ثَلَاثُونَ سَنَةً.', 'ʿumrī thalāthūna sana.', "I'm thirty years old.", '🎉'],
      ['مَا رَقْمُ هَاتِفِكَ؟', 'mā raqmu hātifika?', "What's your phone number?", '📱'],
      ['رَقْمِي...', 'raqmī…', 'My number is…', '☎️', null, ['رقمي']],
      ['كَمْ؟', 'kam?', 'How many? / How much?', '🧮'],
    ],
    grammar: {
      title: 'Arabic numerals ٠١٢٣٤٥٦٧٨٩',
      body: `<p>Much of the Arab world (especially the Middle East and Gulf) writes numbers with <b>Eastern Arabic numerals</b>:</p>
<table class="numerals"><tr><td>٠</td><td>١</td><td>٢</td><td>٣</td><td>٤</td><td>٥</td><td>٦</td><td>٧</td><td>٨</td><td>٩</td></tr>
<tr><td>0</td><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td><td>6</td><td>7</td><td>8</td><td>9</td></tr></table>
<p>Surprise: although Arabic words run right-to-left, <b>numbers are written left-to-right</b>: ٢٠٢٦ = 2026.</p>
<p><b>Tip:</b> ٥ (5) looks like a zero to Western eyes, and the real zero ٠ is just a dot!</p>
<p>Age uses عُمْر (<i>ʿumr</i>, “age”) + possessive: عُمْرِي “my age”, عُمْرُكَ “your age”.</p>`,
    },
    dialogue: {
      scene: 'Two classmates exchange numbers.',
      lines: [
        ['Huda', 'مَا رَقْمُ هَاتِفِكَ؟', 'mā raqmu hātifika?', "What's your phone number?"],
        ['Sami', 'رَقْمِي: صِفْر، خَمْسَة، ثَلَاثَة، سَبْعَة، تِسْعَة.', 'raqmī: ṣifr, khamsa, thalātha, sabʿa, tisʿa.', 'My number is: 0, 5, 3, 7, 9.'],
        ['Huda', 'شُكْرًا! كَمْ عُمْرُكَ يَا سَامِي؟', 'shukran! kam ʿumruka yā Sāmī?', 'Thanks! How old are you, Sami?'],
        ['Sami', 'عُمْرِي عِشْرُونَ سَنَةً. وَأَنْتِ؟', 'ʿumrī ʿishrūna sana. wa-anti?', "I'm twenty. And you?"],
        ['Huda', 'عُمْرِي ثَلَاثُونَ سَنَةً.', 'ʿumrī thalāthūna sana.', "I'm thirty."],
      ],
      questions: [
        { q: 'How old is Sami?', options: ['20', '30', '13'], a: 0 },
        { q: 'Which digit comes first in Sami\'s number?', options: ['0', '5', '9'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A new friend wants your number.',
      turns: [
        { p: ['كَمْ عُمْرُكَ؟', 'kam ʿumruka?', 'How old are you?'], cue: "Say you're twenty years old.", a: ['عُمْرِي عِشْرُونَ سَنَةً', 'عِشْرُونَ سَنَةً', 'عُمْرِي عِشْرُون'], atr: 'ʿumrī ʿishrūna sana' },
        { p: ['وَمَا رَقْمُ هَاتِفِكَ؟', 'wa-mā raqmu hātifika?', 'And what is your phone number?'], cue: 'Say: My number is five, three, one.', a: ['رَقْمِي خَمْسَة ثَلَاثَة وَاحِد', 'خَمْسَة ثَلَاثَة وَاحِد'], atr: 'raqmī khamsa, thalātha, wāḥid' },
        { p: ['شُكْرًا!', 'shukran!', 'Thanks!'], cue: "Say “you're welcome”.", a: ['عَفْوًا'], atr: 'ʿafwan' },
      ],
    },
  },
  {
    id: 'family',
    title: 'الْعَائِلَة',
    subtitle: 'Family & people',
    icon: '👨‍👩‍👧',
    goal: "I can talk about my family and ask about someone else's.",
    words: [
      ['عَائِلَة', 'ʿāʾila', 'family', '👨‍👩‍👧'],
      ['أُمّ', 'umm', 'mother', '👩'],
      ['أَب', 'ab', 'father', '👨', '“My father” is أَبِي (abī).'],
      ['أَخ', 'akh', 'brother', '👦', '“My brother” is أَخِي (akhī).'],
      ['أُخْت', 'ukht', 'sister', '👧'],
      ['اِبْن', 'ibn', 'son', '👶'],
      ['بِنْت', 'bint', 'daughter / girl', '👧'],
      ['زَوْج', 'zawj', 'husband', '🤵'],
      ['زَوْجَة', 'zawja', 'wife', '👰'],
      ['جَدّ', 'jadd', 'grandfather', '👴'],
      ['جَدَّة', 'jadda', 'grandmother', '👵'],
      ['صَدِيق', 'ṣadīq', 'friend (m)', '🧑‍🤝‍🧑', 'Female friend: صَدِيقَة (ṣadīqa).'],
      ['طِفْل', 'ṭifl', 'child', '🧒'],
    ],
    phrases: [
      ['هَذَا أَبِي.', 'hādhā abī.', 'This is my father.', '👨'],
      ['هَذِهِ أُمِّي.', 'hādhihi ummī.', 'This is my mother.', '👩', 'هَذِهِ (hādhihi) is “this” for feminine nouns.'],
      ['هَلْ عِنْدَكَ إِخْوَة؟', 'hal ʿindaka ikhwa?', 'Do you have siblings?', '👫'],
      ['عِنْدِي أُخْتٌ وَاحِدَةٌ.', 'ʿindī ukhtun wāḥida.', 'I have one sister.', '👧'],
      ['هَلْ أَنْتَ مُتَزَوِّجٌ؟', 'hal anta mutazawwij?', 'Are you married? (to a man)', '💍', 'To a woman: هَلْ أَنْتِ مُتَزَوِّجَةٌ؟'],
      ['عِنْدِي وَلَدَانِ.', 'ʿindī waladān.', 'I have two children (boys).', '👦👦', 'The ending -ān means exactly two — Arabic has a special dual form!'],
    ],
    grammar: {
      title: 'My, your… and "to have" (عِنْدَ)',
      body: `<p>Possession is a <b>suffix</b> on the noun:</p>
<table><tr><td>أُمّ<b>ِي</b></td><td>umm<b>ī</b></td><td>my mother</td></tr>
<tr><td>أُمّ<b>ُكَ</b></td><td>umm<b>uka</b></td><td>your mother (m)</td></tr>
<tr><td>أُمّ<b>ُكِ</b></td><td>umm<b>uki</b></td><td>your mother (f)</td></tr>
<tr><td>أُمّ<b>ُهُ</b></td><td>umm<b>uhu</b></td><td>his mother</td></tr>
<tr><td>أُمّ<b>ُهَا</b></td><td>umm<b>uhā</b></td><td>her mother</td></tr></table>
<p><b>“To have”</b> isn't a verb in Arabic: you say “at me (is)…” — <b>عِنْدِي</b> (ʿindī) = I have, <b>عِنْدَكَ</b> (ʿindaka) = you have.</p>
<p><b>This:</b> هَذَا (hādhā) for masculine, هَذِهِ (hādhihi) for feminine.</p>`,
    },
    dialogue: {
      scene: 'Mona shows Tom a family photo.',
      lines: [
        ['Mona', 'اُنْظُرْ، هَذِهِ عَائِلَتِي.', 'unẓur, hādhihi ʿāʾilatī.', 'Look, this is my family.'],
        ['Tom', 'مَا شَاءَ اللَّهُ! مَنْ هَذَا؟', 'mā shāʾa llāh! man hādhā?', 'How wonderful! Who is this?'],
        ['Mona', 'هَذَا أَبِي، وَهَذِهِ أُمِّي.', 'hādhā abī, wa-hādhihi ummī.', 'This is my father, and this is my mother.'],
        ['Tom', 'هَلْ عِنْدَكِ إِخْوَة؟', 'hal ʿindaki ikhwa?', 'Do you have siblings?'],
        ['Mona', 'نَعَمْ، عِنْدِي أُخْتٌ وَاحِدَةٌ، اِسْمُهَا سَلْمَى.', 'naʿam, ʿindī ukhtun wāḥida, ismuhā Salmā.', 'Yes, I have one sister, her name is Salma.'],
        ['Tom', 'وَأَنَا عِنْدِي أَخَوَانِ.', 'wa-anā ʿindī akhawān.', 'And I have two brothers.'],
      ],
      questions: [
        { q: "What is Mona's sister's name?", options: ['Salma', 'Layla', 'Huda'], a: 0 },
        { q: 'How many brothers does Tom have?', options: ['Two', 'One', 'Three'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A neighbour asks about your family.',
      turns: [
        { p: ['هَلْ عِنْدَكَ إِخْوَة؟', 'hal ʿindaka ikhwa?', 'Do you have siblings?'], cue: 'Say: yes, I have one sister.', a: ['نَعَمْ، عِنْدِي أُخْتٌ وَاحِدَةٌ', 'عِنْدِي أُخْتٌ وَاحِدَةٌ', 'نَعَمْ، عِنْدِي أُخْت'], atr: 'naʿam, ʿindī ukhtun wāḥida' },
        { p: ['هَلْ أَنْتَ مُتَزَوِّجٌ؟', 'hal anta mutazawwij?', 'Are you married?'], cue: 'Say: no.', a: ['لَا', 'لَا، أَنَا لَسْتُ مُتَزَوِّجًا'], atr: 'lā' },
        { p: ['وَمَا اسْمُ أُمِّكَ؟', 'wa-mā smu ummika?', "And what is your mother's name?"], cue: 'Say: My mother\'s name is Maryam.', a: ['اِسْمُ أُمِّي مَرْيَم', 'أُمِّي اِسْمُهَا مَرْيَم', 'مَرْيَم'], atr: 'ismu ummī Maryam' },
      ],
    },
  },
  {
    id: 'cafe',
    title: 'فِي الْمَقْهَى',
    subtitle: 'Food, drink & ordering',
    icon: '☕',
    goal: 'I can order food and drinks, and ask for the bill.',
    words: [
      ['قَهْوَة', 'qahwa', 'coffee', '☕', 'English “coffee” comes from this word (via Turkish).'],
      ['شَاي', 'shāy', 'tea', '🍵'],
      ['مَاء', 'māʾ', 'water', '💧'],
      ['حَلِيب', 'ḥalīb', 'milk', '🥛'],
      ['عَصِير', 'ʿaṣīr', 'juice', '🧃'],
      ['خُبْز', 'khubz', 'bread', '🫓'],
      ['سُكَّر', 'sukkar', 'sugar', '🍬', 'Source of the English word “sugar”.'],
      ['لَحْم', 'laḥm', 'meat', '🥩'],
      ['دَجَاج', 'dajāj', 'chicken', '🍗'],
      ['أَرُزّ', 'aruzz', 'rice', '🍚'],
      ['فَاكِهَة', 'fākiha', 'fruit', '🍎'],
      ['لَذِيذ', 'ladhīdh', 'delicious', '😋'],
      ['الْحِسَاب', 'al-ḥisāb', 'the bill', '🧾'],
    ],
    phrases: [
      ['أُرِيدُ قَهْوَةً مِنْ فَضْلِكَ.', 'urīdu qahwatan min faḍlika.', "I'd like a coffee, please.", '☕', null, ['اريد قهوة']],
      ['بِدُونِ سُكَّرٍ.', 'bi-dūni sukkar.', 'Without sugar.', '🚫🍬'],
      ['أَنَا جَائِعٌ.', 'anā jāʾiʿ.', "I'm hungry. (man)", '🍽️', 'A woman says: أَنَا جَائِعَةٌ (jāʾiʿa).', ['انا جائعة']],
      ['أَنَا عَطْشَانُ.', 'anā ʿaṭshān.', "I'm thirsty. (man)", '🥤', 'A woman says: أَنَا عَطْشَى (ʿaṭshā).'],
      ['الْحِسَابُ مِنْ فَضْلِكَ.', 'al-ḥisābu min faḍlika.', 'The bill, please.', '🧾'],
      ['الطَّعَامُ لَذِيذٌ!', 'aṭ-ṭaʿāmu ladhīdh!', 'The food is delicious!', '😋'],
      ['تَفَضَّلْ.', 'tafaḍḍal.', 'Here you are / Please (go ahead).', '🤲', 'Said when offering something. To a woman: تَفَضَّلِي (tafaḍḍalī).'],
    ],
    grammar: {
      title: 'The word "the" (الـ) and the sun letters',
      body: `<p>“The” is the prefix <b>الـ</b> (<i>al-</i>), joined to the word: قَهْوَة → <b>الْ</b>قَهْوَة (<i>al-qahwa</i>).</p>
<p>Before 14 “<b>sun letters</b>” (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), the <i>l</i> is not pronounced — it assimilates, and the sun letter is doubled (shadda):</p>
<table><tr><td>الشَّاي</td><td><i>a<b>sh-sh</b>āy</i></td><td>the tea (sun)</td></tr>
<tr><td>الطَّعَام</td><td><i>a<b>ṭ-ṭ</b>aʿām</i></td><td>the food (sun)</td></tr>
<tr><td>الْقَهْوَة</td><td><i>a<b>l-q</b>ahwa</i></td><td>the coffee (moon)</td></tr>
<tr><td>الْخُبْز</td><td><i>a<b>l-kh</b>ubz</i></td><td>the bread (moon)</td></tr></table>
<p><b>أُرِيدُ</b> (urīdu, “I want”) + noun is the normal, polite way to order — just add مِنْ فَضْلِكَ.</p>`,
    },
    dialogue: {
      scene: 'Ordering at a café in Beirut.',
      lines: [
        ['Waiter', 'أَهْلًا وَسَهْلًا! مَاذَا تُرِيدُ؟', 'ahlan wa-sahlan! mādhā turīd?', 'Welcome! What would you like?'],
        ['Customer', 'أُرِيدُ شَايًا مِنْ فَضْلِكَ.', 'urīdu shāyan min faḍlika.', "I'd like a tea, please."],
        ['Waiter', 'بِالسُّكَّرِ؟', 'bis-sukkar?', 'With sugar?'],
        ['Customer', 'لَا، بِدُونِ سُكَّرٍ. وَخُبْزًا أَيْضًا.', 'lā, bi-dūni sukkar. wa-khubzan ayḍan.', 'No, without sugar. And bread too.'],
        ['Waiter', 'تَفَضَّلْ.', 'tafaḍḍal.', 'Here you are.'],
        ['Customer', 'شُكْرًا! الْحِسَابُ مِنْ فَضْلِكَ.', 'shukran! al-ḥisābu min faḍlika.', 'Thanks! The bill, please.'],
      ],
      questions: [
        { q: 'What does the customer drink?', options: ['Tea without sugar', 'Coffee with sugar', 'Juice'], a: 0 },
        { q: 'What else does the customer order?', options: ['Bread', 'Chicken', 'Rice'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A waiter greets you in a café.',
      turns: [
        { p: ['أَهْلًا! مَاذَا تُرِيدُ؟', 'ahlan! mādhā turīd?', 'Hi! What would you like?'], cue: "Say you'd like a coffee, please.", a: ['أُرِيدُ قَهْوَةً مِنْ فَضْلِكَ', 'قَهْوَة مِنْ فَضْلِكَ', 'أُرِيدُ قَهْوَةً'], atr: 'urīdu qahwatan min faḍlika' },
        { p: ['بِالسُّكَّرِ؟', 'bis-sukkar?', 'With sugar?'], cue: 'Say: without sugar.', a: ['بِدُونِ سُكَّرٍ', 'لَا، بِدُونِ سُكَّرٍ'], atr: 'bi-dūni sukkar' },
        { p: ['تَفَضَّلْ!', 'tafaḍḍal!', 'Here you are!'], cue: 'Say thanks, and ask for the bill.', a: ['شُكْرًا، الْحِسَابُ مِنْ فَضْلِكَ', 'الْحِسَابُ مِنْ فَضْلِكَ'], atr: 'shukran, al-ḥisābu min faḍlika' },
      ],
    },
  },
  {
    id: 'town',
    title: 'فِي الْمَدِينَةِ',
    subtitle: 'Places & directions',
    icon: '🗺️',
    goal: 'I can ask where places are and understand simple directions.',
    words: [
      ['مَدِينَة', 'madīna', 'city', '🏙️'],
      ['شَارِع', 'shāriʿ', 'street', '🛣️'],
      ['مَحَطَّة', 'maḥaṭṭa', 'station', '🚉'],
      ['فُنْدُق', 'funduq', 'hotel', '🏨'],
      ['مَطْعَم', 'maṭʿam', 'restaurant', '🍽️', 'From the root ط-ع-م (food) — “place of eating”.'],
      ['صَيْدَلِيَّة', 'ṣaydaliyya', 'pharmacy', '💊'],
      ['مَسْجِد', 'masjid', 'mosque', '🕌', 'English “mosque” comes from this word.'],
      ['سُوق', 'sūq', 'market', '🧺'],
      ['حَمَّام', 'ḥammām', 'bathroom', '🚻'],
      ['يَمِين', 'yamīn', 'right', '➡️'],
      ['يَسَار', 'yasār', 'left', '⬅️'],
      ['قَرِيب', 'qarīb', 'near', '📍'],
      ['بَعِيد', 'baʿīd', 'far', '🔭'],
    ],
    phrases: [
      ['أَيْنَ الْمَحَطَّةُ؟', 'ayna l-maḥaṭṭa?', 'Where is the station?', '🚉'],
      ['أَيْنَ الْحَمَّامُ؟', 'ayna l-ḥammām?', 'Where is the bathroom?', '🚻'],
      ['عَلَى الْيَمِينِ.', 'ʿalā l-yamīn.', 'On the right.', '➡️'],
      ['عَلَى الْيَسَارِ.', 'ʿalā l-yasār.', 'On the left.', '⬅️'],
      ['اِذْهَبْ مُبَاشَرَةً.', 'idhhab mubāsharatan.', 'Go straight ahead.', '⬆️'],
      ['هَلْ هُوَ بَعِيدٌ؟', 'hal huwa baʿīd?', 'Is it far?', '🔭'],
      ['هُنَاكَ صَيْدَلِيَّةٌ قَرِيبَةٌ.', 'hunāka ṣaydaliyyatun qarība.', "There's a pharmacy nearby.", '💊'],
    ],
    grammar: {
      title: 'Masculine and feminine: the ة ending',
      body: `<p>Most feminine nouns end in <b>ة</b> (<i>tāʾ marbūṭa</i>, pronounced “-a”): مَحَطَّة، صَيْدَلِيَّة، مَدِينَة.</p>
<p>Adjectives come <b>after</b> the noun and <b>agree</b> — add ة for feminine:</p>
<table><tr><td>فُنْدُقٌ قَرِيبٌ</td><td><i>funduqun qarīb</i></td><td>a nearby hotel</td></tr>
<tr><td>صَيْدَلِيَّةٌ قَرِيبَ<b>ة</b>ٌ</td><td><i>ṣaydaliyyatun qarība</i></td><td>a nearby pharmacy</td></tr></table>
<p><b>أَيْنَ</b> (ayna) = where. <b>هُنَاكَ</b> (hunāka) = there is / there.</p>
<p><b>Roots:</b> مَطْعَم (restaurant) shares its root ط-ع-م with طَعَام (food). Learning roots multiplies your vocabulary!</p>`,
    },
    dialogue: {
      scene: 'A tourist in Cairo looks for the station.',
      lines: [
        ['Tourist', 'عَفْوًا، أَيْنَ الْمَحَطَّةُ؟', 'ʿafwan, ayna l-maḥaṭṭa?', 'Excuse me, where is the station?'],
        ['Local', 'اِذْهَبْ مُبَاشَرَةً، ثُمَّ عَلَى الْيَسَارِ.', 'idhhab mubāsharatan, thumma ʿalā l-yasār.', 'Go straight ahead, then on the left.'],
        ['Tourist', 'هَلْ هِيَ بَعِيدَةٌ؟', 'hal hiya baʿīda?', 'Is it far?'],
        ['Local', 'لَا، قَرِيبَةٌ جِدًّا. خَمْسُ دَقَائِقَ.', 'lā, qarībatun jiddan. khamsu daqāʾiq.', 'No, very near. Five minutes.'],
        ['Tourist', 'وَهَلْ هُنَاكَ صَيْدَلِيَّةٌ قَرِيبَةٌ؟', 'wa-hal hunāka ṣaydaliyyatun qarība?', 'And is there a pharmacy nearby?'],
        ['Local', 'نَعَمْ، عَلَى الْيَمِينِ، بِجَانِبِ الْمَسْجِدِ.', 'naʿam, ʿalā l-yamīn, bi-jānibi l-masjid.', 'Yes, on the right, next to the mosque.'],
      ],
      questions: [
        { q: 'How far is the station?', options: ['Five minutes', 'Fifteen minutes', 'Very far'], a: 0 },
        { q: 'Where is the pharmacy?', options: ['Next to the mosque', 'Next to the hotel', 'In the market'], a: 0 },
      ],
    },
    roleplay: {
      scene: "You're looking for your hotel.",
      turns: [
        { p: ['نَعَمْ؟ تَفَضَّلْ.', 'naʿam? tafaḍḍal.', 'Yes? Go ahead.'], cue: 'Ask where the hotel is.', a: ['أَيْنَ الْفُنْدُقُ؟', 'عَفْوًا، أَيْنَ الْفُنْدُقُ؟'], atr: 'ayna l-funduq?' },
        { p: ['اِذْهَبْ مُبَاشَرَةً، ثُمَّ عَلَى الْيَمِينِ.', 'idhhab mubāsharatan, thumma ʿalā l-yamīn.', 'Go straight ahead, then on the right.'], cue: 'Ask: is it far?', a: ['هَلْ هُوَ بَعِيدٌ؟'], atr: 'hal huwa baʿīd?' },
        { p: ['لَا، قَرِيبٌ جِدًّا.', 'lā, qarībun jiddan.', 'No, very near.'], cue: 'Say thank you very much.', a: ['شُكْرًا جَزِيلًا', 'شُكْرًا'], atr: 'shukran jazīlan' },
      ],
    },
  },
  {
    id: 'time',
    title: 'كَمِ السَّاعَةُ؟',
    subtitle: 'Time & days',
    icon: '🕒',
    goal: 'I can tell the time, name the days and make a simple plan.',
    words: [
      ['الْيَوْم', 'al-yawm', 'today (lit. the day)', '📅'],
      ['غَدًا', 'ghadan', 'tomorrow', '➡️'],
      ['أَمْس', 'ams', 'yesterday', '⬅️'],
      ['الْأَحَد', 'al-aḥad', 'Sunday', '1️⃣', 'From أَحَد “one” — the first day.'],
      ['الِاثْنَيْن', 'al-ithnayn', 'Monday', '2️⃣', 'From “two”.'],
      ['الثُّلَاثَاء', 'ath-thulāthāʾ', 'Tuesday', '3️⃣', 'From “three”.'],
      ['الْأَرْبِعَاء', 'al-arbiʿāʾ', 'Wednesday', '4️⃣', 'From “four”.'],
      ['الْخَمِيس', 'al-khamīs', 'Thursday', '5️⃣', 'From “five”.'],
      ['الْجُمُعَة', 'al-jumuʿa', 'Friday', '🕌', 'The day of “gathering” for congregational prayer.'],
      ['السَّبْت', 'as-sabt', 'Saturday', '6️⃣'],
      ['صَبَاح', 'ṣabāḥ', 'morning', '🌄'],
      ['مَسَاء', 'masāʾ', 'evening', '🌇'],
      ['الْآن', 'al-ān', 'now', '⏰'],
    ],
    phrases: [
      ['كَمِ السَّاعَةُ؟', 'kami s-sāʿa?', 'What time is it?', '🕒'],
      ['السَّاعَةُ الثَّالِثَةُ.', 'as-sāʿatu th-thālitha.', "It's three o'clock.", '🕒'],
      ['الْيَوْمَ الْجُمُعَةُ.', 'al-yawma l-jumuʿa.', 'Today is Friday.', '📅'],
      ['فِي أَيِّ سَاعَةٍ؟', 'fī ayyi sāʿa?', 'At what time?', '⏰'],
      ['أَرَاكَ غَدًا!', 'arāka ghadan!', 'See you tomorrow! (to a man)', '👋', 'To a woman: أَرَاكِ غَدًا (arāki).', ['اراك غدا']],
      ['أَنَا مَشْغُولٌ الْآنَ.', 'anā mashghūlun al-ān.', "I'm busy now. (man)", '📵', 'A woman says مَشْغُولَةٌ (mashghūla).', ['انا مشغولة الآن']],
    ],
    grammar: {
      title: 'Telling the time with ordinal numbers',
      body: `<p>Arabic tells time with “the <b>third</b> hour”, “the <b>fifth</b> hour”… using ordinal numbers:</p>
<table><tr><td>1:00</td><td>السَّاعَةُ الْوَاحِدَةُ</td><td><i>as-sāʿatu l-wāḥida</i></td></tr>
<tr><td>2:00</td><td>السَّاعَةُ الثَّانِيَةُ</td><td><i>as-sāʿatu th-thāniya</i></td></tr>
<tr><td>3:00</td><td>السَّاعَةُ الثَّالِثَةُ</td><td><i>as-sāʿatu th-thālitha</i></td></tr>
<tr><td>+ ¼</td><td>وَالرُّبْعُ</td><td><i>wa-r-rubʿ</i></td></tr>
<tr><td>+ ½</td><td>وَالنِّصْفُ</td><td><i>wa-n-niṣf</i></td></tr>
<tr><td>− ¼</td><td>إِلَّا رُبْعًا</td><td><i>illā rubʿan</i></td></tr></table>
<p><b>Culture:</b> in most Arab countries the weekend is <b>Friday–Saturday</b>, and the week starts on Sunday — which is why Sunday is “day one”.</p>`,
    },
    dialogue: {
      scene: 'Two friends make plans.',
      lines: [
        ['Ali', 'هَلْ أَنْتِ مَشْغُولَةٌ الْيَوْمَ؟', 'hal anti mashghūlatun al-yawm?', 'Are you busy today?'],
        ['Rana', 'نَعَمْ، أَنَا مَشْغُولَةٌ الْآنَ. وَغَدًا؟', 'naʿam, anā mashghūlatun al-ān. wa-ghadan?', "Yes, I'm busy now. What about tomorrow?"],
        ['Ali', 'غَدًا السَّبْتُ. طَيِّب!', 'ghadan as-sabt. ṭayyib!', "Tomorrow is Saturday. Okay!"],
        ['Rana', 'فِي أَيِّ سَاعَةٍ؟', 'fī ayyi sāʿa?', 'At what time?'],
        ['Ali', 'فِي السَّاعَةِ الْخَامِسَةِ.', 'fī s-sāʿati l-khāmisa.', "At five o'clock."],
        ['Rana', 'مُمْتَاز! أَرَاكَ غَدًا!', 'mumtāz! arāka ghadan!', 'Excellent! See you tomorrow!'],
      ],
      questions: [
        { q: 'When will they meet?', options: ['Saturday at 5', 'Friday at 5', 'Saturday at 3'], a: 0 },
        { q: 'Why can\'t Rana meet today?', options: ['She is busy', 'She is ill', 'She is travelling'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A friend wants to meet up.',
      turns: [
        { p: ['هَلْ أَنْتَ مَشْغُولٌ الْيَوْمَ؟', 'hal anta mashghūlun al-yawm?', 'Are you busy today?'], cue: "Say: yes, I'm busy now.", a: ['نَعَمْ، أَنَا مَشْغُولٌ الْآنَ', 'نَعَمْ، أَنَا مَشْغُولَةٌ الْآنَ', 'أَنَا مَشْغُولٌ'], atr: 'naʿam, anā mashghūlun al-ān' },
        { p: ['وَغَدًا؟ فِي السَّاعَةِ الرَّابِعَةِ؟', 'wa-ghadan? fī s-sāʿati r-rābiʿa?', "And tomorrow? At four o'clock?"], cue: 'Say: okay!', a: ['طَيِّب', 'نَعَمْ، طَيِّب'], atr: 'ṭayyib' },
        { p: ['مُمْتَاز!', 'mumtāz!', 'Excellent!'], cue: 'Say: see you tomorrow!', a: ['أَرَاكَ غَدًا', 'أَرَاكِ غَدًا'], atr: 'arāka ghadan' },
      ],
    },
  },
  {
    id: 'shopping',
    title: 'فِي السُّوقِ',
    subtitle: 'Shopping & prices',
    icon: '🛍️',
    goal: 'I can ask prices, bargain politely and pay.',
    words: [
      ['مَحَلّ', 'maḥall', 'shop', '🏬'],
      ['سِعْر', 'siʿr', 'price', '🏷️'],
      ['غَالٍ', 'ghālin', 'expensive', '💸', 'Often said غَالِي (ghālī) in speech.', ['غالي']],
      ['رَخِيص', 'rakhīṣ', 'cheap', '🪙'],
      ['نُقُود', 'nuqūd', 'money', '💰'],
      ['دِرْهَم', 'dirham', 'dirham (currency)', '💵'],
      ['قَمِيص', 'qamīṣ', 'shirt', '👔'],
      ['حِذَاء', 'ḥidhāʾ', 'shoe(s)', '👟'],
      ['فُسْتَان', 'fustān', 'dress', '👗'],
      ['حَقِيبَة', 'ḥaqība', 'bag', '👜'],
      ['هَذَا', 'hādhā', 'this (m)', '👇'],
      ['هَذِهِ', 'hādhihi', 'this (f)', '👇'],
      ['بِطَاقَة', 'biṭāqa', 'card', '💳'],
    ],
    phrases: [
      ['بِكَمْ هَذَا؟', 'bi-kam hādhā?', 'How much is this?', '🏷️'],
      ['هَذَا غَالٍ جِدًّا!', 'hādhā ghālin jiddan!', "This is very expensive!", '💸', null, ['هذا غالي جدا']],
      ['هَلْ عِنْدَكَ مَقَاسٌ أَكْبَرُ؟', 'hal ʿindaka maqāsun akbar?', 'Do you have a bigger size?', '📏'],
      ['سَآخُذُهُ.', 'saʾākhudhuhu.', "I'll take it.", '🛍️', 'For a feminine item (حَقِيبَة): سَآخُذُهَا (saʾākhudhuhā).', ['سآخذها']],
      ['هَلْ أَسْتَطِيعُ الدَّفْعَ بِالْبِطَاقَةِ؟', 'hal astaṭīʿu d-dafʿa bil-biṭāqa?', 'Can I pay by card?', '💳'],
      ['أَنَا أَتَفَرَّجُ فَقَطْ.', 'anā atafarraju faqaṭ.', "I'm just looking.", '👀'],
    ],
    grammar: {
      title: 'Bargaining culture & "how much?"',
      body: `<p><b>بِكَمْ؟</b> (<i>bi-kam?</i>) = “for how much?” — the standard way to ask a price. Add هَذَا/هَذِهِ: <span lang="ar">بِكَمْ هَذِهِ الْحَقِيبَةُ؟</span></p>
<p>In traditional markets (سُوق), bargaining is expected and friendly. Useful moves:</p>
<table><tr><td>غَالٍ جِدًّا!</td><td><i>ghālin jiddan!</i></td><td>Very expensive!</td></tr>
<tr><td>آخِرُ سِعْرٍ؟</td><td><i>ākhiru siʿr?</i></td><td>Your last (best) price?</td></tr>
<tr><td>سَآخُذُهُ</td><td><i>saʾākhudhuhu</i></td><td>I'll take it</td></tr></table>
<p><b>Future:</b> the prefix <b>سَـ</b> (sa-) turns a present verb into a future: آخُذُ (I take) → <b>سَ</b>آخُذُ (I will take).</p>`,
    },
    dialogue: {
      scene: 'In a souk in Marrakesh.',
      lines: [
        ['Seller', 'أَهْلًا وَسَهْلًا! تَفَضَّلْ.', 'ahlan wa-sahlan! tafaḍḍal.', 'Welcome! Come in.'],
        ['Buyer', 'شُكْرًا. بِكَمْ هَذِهِ الْحَقِيبَةُ؟', 'shukran. bi-kam hādhihi l-ḥaqība?', 'Thanks. How much is this bag?'],
        ['Seller', 'مِئَتَا دِرْهَمٍ.', 'miʾatā dirham.', 'Two hundred dirhams.'],
        ['Buyer', 'هَذَا غَالٍ جِدًّا!', 'hādhā ghālin jiddan!', "That's very expensive!"],
        ['Seller', 'طَيِّب، مِئَةٌ وَخَمْسُونَ.', 'ṭayyib, miʾatun wa-khamsūn.', 'Okay, one hundred and fifty.'],
        ['Buyer', 'سَآخُذُهَا!', 'saʾākhudhuhā!', "I'll take it!"],
      ],
      questions: [
        { q: 'What was the first price?', options: ['200 dirhams', '150 dirhams', '100 dirhams'], a: 0 },
        { q: 'Did the buyer get a discount?', options: ['Yes, 50 dirhams', 'No', 'Yes, 100 dirhams'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'Buying a shirt at a market stall.',
      turns: [
        { p: ['أَهْلًا وَسَهْلًا!', 'ahlan wa-sahlan!', 'Welcome!'], cue: 'Ask how much this is.', a: ['بِكَمْ هَذَا؟', 'بِكَمْ هَذَا الْقَمِيصُ؟'], atr: 'bi-kam hādhā?' },
        { p: ['خَمْسُونَ دِرْهَمًا.', 'khamsūna dirhaman.', 'Fifty dirhams.'], cue: "Say it's very expensive.", a: ['هَذَا غَالٍ جِدًّا', 'غَالٍ جِدًّا'], atr: 'hādhā ghālin jiddan' },
        { p: ['طَيِّب، أَرْبَعُونَ.', 'ṭayyib, arbaʿūn.', 'Okay, forty.'], cue: "Say: I'll take it.", a: ['سَآخُذُهُ', 'طَيِّب، سَآخُذُهُ'], atr: 'saʾākhudhuhu' },
      ],
    },
  },
  {
    id: 'describing',
    title: 'الْأَلْوَان',
    subtitle: 'Colours & descriptions',
    icon: '🎨',
    goal: 'I can describe people and things using colours and adjectives.',
    words: [
      ['أَحْمَر', 'aḥmar', 'red', '🟥', 'Feminine: حَمْرَاء (ḥamrāʾ).'],
      ['أَزْرَق', 'azraq', 'blue', '🟦', 'Feminine: زَرْقَاء (zarqāʾ).'],
      ['أَخْضَر', 'akhḍar', 'green', '🟩', 'Feminine: خَضْرَاء (khaḍrāʾ).'],
      ['أَصْفَر', 'aṣfar', 'yellow', '🟨'],
      ['أَبْيَض', 'abyaḍ', 'white', '⬜', 'Feminine: بَيْضَاء (bayḍāʾ).'],
      ['أَسْوَد', 'aswad', 'black', '⬛'],
      ['كَبِير', 'kabīr', 'big', '🐘'],
      ['صَغِير', 'ṣaghīr', 'small', '🐭'],
      ['جَدِيد', 'jadīd', 'new', '✨'],
      ['قَدِيم', 'qadīm', 'old (things)', '🏚️'],
      ['جَمِيل', 'jamīl', 'beautiful', '🌸'],
      ['طَوِيل', 'ṭawīl', 'tall / long', '🦒'],
      ['لَطِيف', 'laṭīf', 'nice / kind', '😄'],
    ],
    phrases: [
      ['الْبَيْتُ كَبِيرٌ.', 'al-baytu kabīr.', 'The house is big.', '🏠'],
      ['السَّيَّارَةُ جَدِيدَةٌ.', 'as-sayyāratu jadīda.', 'The car is new.', '🚗'],
      ['مَا لَوْنُهُ؟', 'mā lawnuhu?', 'What colour is it? (m)', '🎨'],
      ['لَوْنُهُ أَحْمَرُ.', 'lawnuhu aḥmar.', 'It is red. (lit. its colour is red)', '🟥'],
      ['صَدِيقِي لَطِيفٌ جِدًّا.', 'ṣadīqī laṭīfun jiddan.', 'My friend is very nice.', '😄'],
      ['هِيَ طَوِيلَةٌ.', 'hiya ṭawīla.', 'She is tall.', '🦒'],
    ],
    grammar: {
      title: '"The house is big" vs "a big house"',
      body: `<p>The definite article changes the meaning:</p>
<table><tr><td><b>الْ</b>بَيْتُ كَبِيرٌ</td><td><i>al-baytu kabīr</i></td><td>The house <b>is</b> big (a sentence)</td></tr>
<tr><td>بَيْتٌ كَبِيرٌ</td><td><i>baytun kabīr</i></td><td>a big house</td></tr>
<tr><td><b>الْ</b>بَيْتُ <b>الْ</b>كَبِيرُ</td><td><i>al-baytu l-kabīr</i></td><td>the big house</td></tr></table>
<p>Adjectives agree in gender: سَيَّارَةٌ جَدِيدَ<b>ةٌ</b> (a new car). Basic colours have a special feminine pattern: أَحْمَر → <b>حَمْرَاء</b>, أَبْيَض → <b>بَيْضَاء</b>.</p>
<p>هُوَ (<i>huwa</i>) = he/it (m), هِيَ (<i>hiya</i>) = she/it (f). Objects use the same words!</p>`,
    },
    dialogue: {
      scene: 'Talking about a new flat.',
      lines: [
        ['Nour', 'كَيْفَ بَيْتُكَ الْجَدِيدُ؟', 'kayfa baytuka l-jadīd?', "How is your new house?"],
        ['Yusuf', 'صَغِيرٌ، لَكِنْ جَمِيلٌ جِدًّا.', 'ṣaghīrun, lākin jamīlun jiddan.', "Small, but very beautiful."],
        ['Nour', 'وَمَا لَوْنُ الْمَطْبَخِ؟', 'wa-mā lawnu l-maṭbakh?', 'And what colour is the kitchen?'],
        ['Yusuf', 'أَبْيَضُ وَأَزْرَقُ.', 'abyaḍu wa-azraq.', 'White and blue.'],
        ['Nour', 'جَمِيلٌ! وَالْجِيرَانُ؟', 'jamīl! wal-jīrān?', 'Lovely! And the neighbours?'],
        ['Yusuf', 'لُطَفَاءُ جِدًّا.', 'luṭafāʾu jiddan.', 'Very nice.'],
      ],
      questions: [
        { q: "How is Yusuf's house?", options: ['Small but beautiful', 'Big and old', 'New and ugly'], a: 0 },
        { q: 'What colour is the kitchen?', options: ['White and blue', 'Red and black', 'Green'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A friend asks about your new car.',
      turns: [
        { p: ['عِنْدَكَ سَيَّارَةٌ جَدِيدَةٌ؟ كَيْفَ هِيَ؟', 'ʿindaka sayyāratun jadīda? kayfa hiya?', 'You have a new car? How is it?'], cue: "Say it's small but beautiful.", a: ['صَغِيرَةٌ لَكِنْ جَمِيلَةٌ', 'هِيَ صَغِيرَةٌ لَكِنْ جَمِيلَةٌ'], atr: 'ṣaghīratun lākin jamīla' },
        { p: ['مَا لَوْنُهَا؟', 'mā lawnuhā?', 'What colour is it?'], cue: "Say: its colour is red.", a: ['لَوْنُهَا أَحْمَرُ', 'حَمْرَاء', 'أَحْمَر'], atr: 'lawnuhā aḥmar' },
        { p: ['مَا شَاءَ اللَّهُ!', 'mā shāʾa llāh!', 'How wonderful!'], cue: 'Say: thank you!', a: ['شُكْرًا'], atr: 'shukran' },
      ],
    },
  },
  {
    id: 'routine',
    title: 'يَوْمِي',
    subtitle: 'Daily routine & verbs',
    icon: '⏰',
    goal: 'I can describe my day and ask others about theirs.',
    words: [
      ['أَسْتَيْقِظُ', 'astayqiẓu', 'I wake up', '⏰'],
      ['آكُلُ', 'ākulu', 'I eat', '🍽️'],
      ['أَشْرَبُ', 'ashrabu', 'I drink', '🥤'],
      ['أَنَامُ', 'anāmu', 'I sleep', '😴'],
      ['أَعْمَلُ', 'aʿmalu', 'I work', '💼'],
      ['أَدْرُسُ', 'adrusu', 'I study', '📚'],
      ['أَذْهَبُ', 'adhhabu', 'I go', '🚶'],
      ['أَقْرَأُ', 'aqraʾu', 'I read', '📖'],
      ['أَكْتُبُ', 'aktubu', 'I write', '✍️', 'Root ك-ت-ب (writing).'],
      ['كِتَاب', 'kitāb', 'book', '📕', 'Root ك-ت-ب: “a written thing”.'],
      ['مَكْتَب', 'maktab', 'office / desk', '🏢', 'Root ك-ت-ب: “place of writing”.'],
      ['بَيْت', 'bayt', 'house / home', '🏠'],
      ['كُلَّ يَوْمٍ', 'kulla yawm', 'every day', '🔁'],
    ],
    phrases: [
      ['أَسْتَيْقِظُ فِي السَّاعَةِ السَّابِعَةِ.', 'astayqiẓu fī s-sāʿati s-sābiʿa.', 'I wake up at seven.', '⏰'],
      ['أَشْرَبُ الْقَهْوَةَ كُلَّ صَبَاحٍ.', 'ashrabu l-qahwata kulla ṣabāḥ.', 'I drink coffee every morning.', '☕'],
      ['أَعْمَلُ فِي مَكْتَبٍ.', 'aʿmalu fī maktab.', 'I work in an office.', '🏢'],
      ['أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ.', 'adrusu l-lughata l-ʿarabiyya.', "I'm studying Arabic.", '📚'],
      ['أَذْهَبُ إِلَى الْبَيْتِ.', 'adhhabu ilā l-bayt.', "I'm going home.", '🏠'],
      ['مَاذَا تَفْعَلُ فِي الْمَسَاءِ؟', 'mādhā tafʿalu fī l-masāʾ?', 'What do you do in the evening?', '🌇'],
    ],
    grammar: {
      title: 'Present tense prefixes & the magic of roots',
      body: `<p>Present-tense verbs change mainly at the <b>front</b>:</p>
<table><tr><td><b>أَ</b>كْتُبُ</td><td><i><b>a</b>ktubu</i></td><td>I write</td></tr>
<tr><td><b>تَ</b>كْتُبُ</td><td><i><b>ta</b>ktubu</i></td><td>you (m) write / she writes</td></tr>
<tr><td><b>يَ</b>كْتُبُ</td><td><i><b>ya</b>ktubu</i></td><td>he writes</td></tr>
<tr><td><b>نَ</b>كْتُبُ</td><td><i><b>na</b>ktubu</i></td><td>we write</td></tr></table>
<p><b>Roots:</b> most Arabic words are built from 3 consonants. <b>ك-ت-ب</b> (k-t-b) = writing:</p>
<table><tr><td>كِتَاب</td><td>kitāb</td><td>book</td></tr><tr><td>كَاتِب</td><td>kātib</td><td>writer</td></tr>
<tr><td>مَكْتَب</td><td>maktab</td><td>office, desk</td></tr><tr><td>مَكْتَبَة</td><td>maktaba</td><td>library, bookshop</td></tr></table>
<p>Spotting the root is one of the most powerful tools for guessing new words.</p>`,
    },
    dialogue: {
      scene: 'Chatting about daily life.',
      lines: [
        ['Salma', 'مَتَى تَسْتَيْقِظُ؟', 'matā tastayqiẓ?', 'When do you wake up?'],
        ['Ben', 'أَسْتَيْقِظُ فِي السَّاعَةِ السَّابِعَةِ، ثُمَّ أَشْرَبُ الْقَهْوَةَ.', 'astayqiẓu fī s-sāʿati s-sābiʿa, thumma ashrabu l-qahwa.', 'I wake up at seven, then I drink coffee.'],
        ['Salma', 'هَلْ تَعْمَلُ فِي مَكْتَبٍ؟', 'hal taʿmalu fī maktab?', 'Do you work in an office?'],
        ['Ben', 'نَعَمْ. وَفِي الْمَسَاءِ أَدْرُسُ الْعَرَبِيَّةَ.', 'naʿam. wa-fī l-masāʾ adrusu l-ʿarabiyya.', 'Yes. And in the evening I study Arabic.'],
        ['Salma', 'مُمْتَاز! وَمَاذَا تَفْعَلُ يَوْمَ الْجُمُعَةِ؟', 'mumtāz! wa-mādhā tafʿalu yawma l-jumuʿa?', 'Excellent! And what do you do on Friday?'],
        ['Ben', 'أَقْرَأُ كِتَابًا وَأَنَامُ كَثِيرًا!', 'aqraʾu kitāban wa-anāmu kathīran!', 'I read a book and sleep a lot!'],
      ],
      questions: [
        { q: 'When does Ben study Arabic?', options: ['In the evening', 'In the morning', 'On Friday'], a: 0 },
        { q: 'What does Ben do on Fridays?', options: ['Reads and sleeps', 'Works', 'Goes to the market'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A language partner asks about your routine.',
      turns: [
        { p: ['مَتَى تَسْتَيْقِظُ؟', 'matā tastayqiẓ?', 'When do you wake up?'], cue: 'Say you wake up at seven.', a: ['أَسْتَيْقِظُ فِي السَّاعَةِ السَّابِعَةِ', 'فِي السَّاعَةِ السَّابِعَةِ'], atr: 'astayqiẓu fī s-sāʿati s-sābiʿa' },
        { p: ['أَيْنَ تَعْمَلُ؟', 'ayna taʿmal?', 'Where do you work?'], cue: 'Say you work in an office.', a: ['أَعْمَلُ فِي مَكْتَبٍ'], atr: 'aʿmalu fī maktab' },
        { p: ['وَمَاذَا تَفْعَلُ فِي الْمَسَاءِ؟', 'wa-mādhā tafʿalu fī l-masāʾ?', 'And what do you do in the evening?'], cue: 'Say you study Arabic.', a: ['أَدْرُسُ اللُّغَةَ الْعَرَبِيَّةَ', 'أَدْرُسُ الْعَرَبِيَّةَ'], atr: 'adrusu l-lughata l-ʿarabiyya' },
      ],
    },
  },
  {
    id: 'travel',
    title: 'السَّفَر',
    subtitle: 'Travel & transport',
    icon: '✈️',
    goal: 'I can buy a ticket, ask about departures and check in.',
    words: [
      ['سَفَر', 'safar', 'travel', '🧳', 'English “safari” comes from this root.'],
      ['طَائِرَة', 'ṭāʾira', 'plane', '✈️', 'Root ط-ي-ر (to fly) — “the flying one”.'],
      ['قِطَار', 'qiṭār', 'train', '🚆'],
      ['سَيَّارَة', 'sayyāra', 'car', '🚗'],
      ['حَافِلَة', 'ḥāfila', 'bus', '🚌'],
      ['تَاكْسِي', 'tāksī', 'taxi', '🚕'],
      ['تَذْكِرَة', 'tadhkira', 'ticket', '🎫'],
      ['مَطَار', 'maṭār', 'airport', '🛫', 'Root ط-ي-ر again — “place of flying”.'],
      ['جَوَازُ سَفَرٍ', 'jawāzu safar', 'passport', '🛂'],
      ['أَمْتِعَة', 'amtiʿa', 'luggage', '🧳'],
      ['غُرْفَة', 'ghurfa', 'room', '🛏️'],
      ['حَجْز', 'ḥajz', 'reservation', '📋'],
    ],
    phrases: [
      ['تَذْكِرَةٌ إِلَى الْقَاهِرَةِ مِنْ فَضْلِكَ.', 'tadhkiratun ilā l-qāhira min faḍlika.', 'A ticket to Cairo, please.', '🎫'],
      ['مَتَى يُغَادِرُ الْقِطَارُ؟', 'matā yughādiru l-qiṭār?', 'When does the train leave?', '🕘'],
      ['ذَهَابٌ وَعَوْدَةٌ.', 'dhahābun wa-ʿawda.', 'Return (round trip).', '🔁'],
      ['عِنْدِي حَجْزٌ.', 'ʿindī ḥajz.', 'I have a reservation.', '📋'],
      ['أَيْنَ مَوْقِفُ الْحَافِلَةِ؟', 'ayna mawqifu l-ḥāfila?', 'Where is the bus stop?', '🚏'],
      ['خُذْنِي إِلَى الْفُنْدُقِ مِنْ فَضْلِكَ.', 'khudhnī ilā l-funduq min faḍlika.', 'Take me to the hotel, please.', '🚕'],
      ['الْقِطَارُ مُتَأَخِّرٌ.', 'al-qiṭāru mutaʾakhkhir.', 'The train is late.', '⌛'],
    ],
    grammar: {
      title: 'Prepositions: إِلَى، مِنْ، بِـ، فِي',
      body: `<table><tr><td><b>إِلَى</b></td><td><i>ilā</i></td><td>to</td><td>إِلَى الْقَاهِرَةِ — to Cairo</td></tr>
<tr><td><b>مِنْ</b></td><td><i>min</i></td><td>from</td><td>مِنْ دُبَي — from Dubai</td></tr>
<tr><td><b>بِـ</b></td><td><i>bi-</i></td><td>by, with</td><td>بِالْقِطَارِ — by train</td></tr>
<tr><td><b>فِي</b></td><td><i>fī</i></td><td>in, at</td><td>فِي الْمَطَارِ — at the airport</td></tr></table>
<p><b>بِـ</b> is a one-letter word, so it is <b>written joined</b> to the next word.</p>
<p><b>Question words:</b> مَتَى (<i>matā</i>) when · أَيْنَ (<i>ayna</i>) where · كَمْ (<i>kam</i>) how much · مَاذَا (<i>mādhā</i>) what · كَيْفَ (<i>kayfa</i>) how.</p>`,
    },
    dialogue: {
      scene: 'At the ticket office in Alexandria.',
      lines: [
        ['Traveller', 'تَذْكِرَةٌ إِلَى الْقَاهِرَةِ مِنْ فَضْلِكَ.', 'tadhkiratun ilā l-qāhira min faḍlika.', 'A ticket to Cairo, please.'],
        ['Clerk', 'ذَهَابٌ فَقَطْ أَمْ ذَهَابٌ وَعَوْدَةٌ؟', 'dhahābun faqaṭ am dhahābun wa-ʿawda?', 'One way or return?'],
        ['Traveller', 'ذَهَابٌ وَعَوْدَةٌ. مَتَى يُغَادِرُ الْقِطَارُ؟', 'dhahābun wa-ʿawda. matā yughādiru l-qiṭār?', 'Return. When does the train leave?'],
        ['Clerk', 'فِي السَّاعَةِ الْعَاشِرَةِ وَالنِّصْفِ.', 'fī s-sāʿati l-ʿāshirati wa-n-niṣf.', 'At half past ten.'],
        ['Traveller', 'بِكَمِ التَّذْكِرَةُ؟', 'bi-kami t-tadhkira?', 'How much is the ticket?'],
        ['Clerk', 'مِئَةُ جُنَيْهٍ.', 'miʾatu junayh.', 'One hundred pounds.'],
      ],
      questions: [
        { q: 'When does the train leave?', options: ['10:30', '10:00', '11:30'], a: 0 },
        { q: 'What kind of ticket does the traveller buy?', options: ['Return', 'One way', 'First class'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You get into a taxi at the airport.',
      turns: [
        { p: ['أَهْلًا! إِلَى أَيْنَ؟', 'ahlan! ilā ayna?', 'Hi! Where to?'], cue: 'Say: Take me to the hotel, please.', a: ['خُذْنِي إِلَى الْفُنْدُقِ مِنْ فَضْلِكَ', 'إِلَى الْفُنْدُقِ مِنْ فَضْلِكَ'], atr: 'khudhnī ilā l-funduq min faḍlika' },
        { p: ['طَيِّب. هَلْ عِنْدَكَ أَمْتِعَة؟', 'ṭayyib. hal ʿindaka amtiʿa?', 'Okay. Do you have luggage?'], cue: 'Say: yes, one bag.', a: ['نَعَمْ، حَقِيبَةٌ وَاحِدَةٌ', 'نَعَمْ'], atr: 'naʿam, ḥaqībatun wāḥida' },
        { p: ['وَصَلْنَا! هَذَا هُوَ الْفُنْدُقُ.', 'waṣalnā! hādhā huwa l-funduq.', "We've arrived! This is the hotel."], cue: 'Ask: how much?', a: ['بِكَمْ؟', 'كَمْ؟', 'كَمِ الْحِسَابُ؟'], atr: 'bi-kam?' },
      ],
    },
  },
  {
    id: 'health',
    title: 'الصِّحَّة',
    subtitle: 'Feelings & health',
    icon: '🩺',
    goal: 'I can say how I feel and explain a simple health problem.',
    words: [
      ['سَعِيد', 'saʿīd', 'happy', '😊'],
      ['حَزِين', 'ḥazīn', 'sad', '😢'],
      ['مُتْعَب', 'mutʿab', 'tired', '🥱'],
      ['مَرِيض', 'marīḍ', 'ill / sick', '🤒'],
      ['غَاضِب', 'ghāḍib', 'angry', '😠'],
      ['خَائِف', 'khāʾif', 'afraid', '😨'],
      ['رَأْس', 'raʾs', 'head', '🧠'],
      ['بَطْن', 'baṭn', 'stomach / belly', '🤢'],
      ['طَبِيب', 'ṭabīb', 'doctor', '🧑‍⚕️'],
      ['دَوَاء', 'dawāʾ', 'medicine', '💊'],
      ['أَلَم', 'alam', 'pain', '🤕'],
      ['حُمَّى', 'ḥummā', 'fever', '🌡️'],
    ],
    phrases: [
      ['كَيْفَ تَشْعُرُ؟', 'kayfa tashʿur?', 'How do you feel? (to a man)', '❓', 'To a woman: كَيْفَ تَشْعُرِينَ؟ (tashʿurīn)'],
      ['أَنَا مَرِيضٌ.', 'anā marīḍ.', "I'm ill. (man)", '🤒', 'Woman: أَنَا مَرِيضَةٌ (marīḍa).', ['انا مريضة']],
      ['عِنْدِي صُدَاعٌ.', 'ʿindī ṣudāʿ.', 'I have a headache.', '🤕'],
      ['بَطْنِي يُؤْلِمُنِي.', 'baṭnī yuʾlimunī.', 'My stomach hurts.', '🤢'],
      ['أَحْتَاجُ إِلَى طَبِيبٍ.', 'aḥtāju ilā ṭabīb.', 'I need a doctor.', '🧑‍⚕️'],
      ['اُطْلُبُوا الْإِسْعَافَ!', 'uṭlubū l-isʿāf!', 'Call an ambulance!', '🚑'],
      ['سَلَامَتُكَ!', 'salāmatuk!', 'Get well soon!', '💐', 'Literally “your safety”. Reply: اللَّهُ يُسَلِّمُكَ (allāhu yusallimuk).'],
    ],
    grammar: {
      title: 'Feelings, illness and "it hurts me"',
      body: `<p>Feelings: <b>أَنَا</b> + adjective (+ <b>ة</b> if you're a woman):</p>
<table><tr><td>أَنَا مُتْعَبٌ</td><td><i>anā mutʿab</i></td><td>I'm tired (m)</td></tr>
<tr><td>أَنَا مُتْعَبَ<b>ةٌ</b></td><td><i>anā mutʿaba</i></td><td>I'm tired (f)</td></tr></table>
<p>Illnesses use <b>عِنْدِي</b> (“I have”): عِنْدِي صُدَاعٌ (headache), عِنْدِي حُمَّى (fever).</p>
<p><b>It hurts me:</b> body part + <b>يُؤْلِمُنِي</b> (m) / <b>تُؤْلِمُنِي</b> (f): رَأْسِي يُؤْلِمُنِي — “my head hurts me”.</p>`,
    },
    dialogue: {
      scene: 'At the pharmacy.',
      lines: [
        ['Pharmacist', 'أَهْلًا، كَيْفَ أُسَاعِدُكَ؟', 'ahlan, kayfa usāʿiduka?', 'Hello, how can I help you?'],
        ['Customer', 'أَنَا مَرِيضٌ. عِنْدِي صُدَاعٌ.', 'anā marīḍ. ʿindī ṣudāʿ.', "I'm ill. I have a headache."],
        ['Pharmacist', 'هَلْ عِنْدَكَ حُمَّى؟', 'hal ʿindaka ḥummā?', 'Do you have a fever?'],
        ['Customer', 'لَا، لَكِنْ بَطْنِي يُؤْلِمُنِي.', 'lā, lākin baṭnī yuʾlimunī.', 'No, but my stomach hurts.'],
        ['Pharmacist', 'خُذْ هَذَا الدَّوَاءَ ثَلَاثَ مَرَّاتٍ فِي الْيَوْمِ.', 'khudh hādhā d-dawāʾa thalātha marrātin fī l-yawm.', 'Take this medicine three times a day.'],
        ['Customer', 'شُكْرًا جَزِيلًا.', 'shukran jazīlan.', 'Thank you very much.'],
        ['Pharmacist', 'سَلَامَتُكَ!', 'salāmatuk!', 'Get well soon!'],
      ],
      questions: [
        { q: 'What hurts besides the head?', options: ['The stomach', 'The throat', 'The back'], a: 0 },
        { q: 'How often should the medicine be taken?', options: ['Three times a day', 'Once a day', 'Twice a day'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You visit a doctor.',
      turns: [
        { p: ['أَهْلًا. كَيْفَ تَشْعُرُ؟', 'ahlan. kayfa tashʿur?', 'Hello. How do you feel?'], cue: "Say you're ill and have a headache.", a: ['أَنَا مَرِيضٌ. عِنْدِي صُدَاعٌ', 'عِنْدِي صُدَاعٌ', 'أَنَا مَرِيضَةٌ، عِنْدِي صُدَاعٌ'], atr: 'anā marīḍ. ʿindī ṣudāʿ' },
        { p: ['هَلْ عِنْدَكَ حُمَّى؟', 'hal ʿindaka ḥummā?', 'Do you have a fever?'], cue: 'Say: no, but my stomach hurts.', a: ['لَا، لَكِنْ بَطْنِي يُؤْلِمُنِي', 'بَطْنِي يُؤْلِمُنِي'], atr: 'lā, lākin baṭnī yuʾlimunī' },
        { p: ['خُذْ هَذَا الدَّوَاءَ. سَلَامَتُكَ!', 'khudh hādhā d-dawāʾ. salāmatuk!', 'Take this medicine. Get well soon!'], cue: 'Say thank you very much.', a: ['شُكْرًا جَزِيلًا', 'شُكْرًا'], atr: 'shukran jazīlan' },
      ],
    },
  },
];
