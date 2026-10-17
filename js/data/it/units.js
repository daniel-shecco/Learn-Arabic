// Italian course — CEFR A1 communicative syllabus.
// Item tuples: [italian, english, emoji?, note?, alternatives?]
// Dialogue lines: [speaker, italian, english]
// Roleplay turns: { p: [partner italian, english], cue: what the learner should say, a: [accepted answers] }

export default [
  {
    id: 'greetings',
    title: 'Ciao!',
    subtitle: 'Greetings & introductions',
    icon: '👋',
    goal: 'I can greet people, say my name and ask how someone is.',
    words: [
      ['ciao', 'hi / bye (informal)', '👋'],
      ['buongiorno', 'good morning / hello', '🌅'],
      ['buonasera', 'good evening', '🌆'],
      ['buonanotte', 'good night', '🌙'],
      ['arrivederci', 'goodbye', '🚶'],
      ['salve', 'hello (neutral, polite)', '🙂'],
      ['sì', 'yes', '✅'],
      ['no', 'no', '❌'],
      ['grazie', 'thank you', '🙏'],
      ['prego', "you're welcome", '😊'],
      ['io', 'I', '🙋'],
      ['tu', 'you (informal)', '👉'],
      ['signore', 'sir / Mr', '🧔'],
      ['signora', 'madam / Mrs', '👩'],
    ],
    phrases: [
      ['Come ti chiami?', "What's your name? (informal)", '❓'],
      ['Mi chiamo Anna.', 'My name is Anna.', '📛', 'Literally "I call myself Anna".', ['Mi chiamo Anna', 'Sono Anna']],
      ['Piacere!', 'Nice to meet you!', '🤝'],
      ['Come stai?', 'How are you? (informal)', '💬'],
      ['Sto bene, grazie.', "I'm fine, thanks.", '👍', null, ['Bene, grazie', 'Sto bene grazie']],
      ['E tu?', 'And you?', '↩️'],
      ['Come sta?', 'How are you? (formal)', '🎩', 'Use with strangers, older people and in shops.'],
      ['A presto!', 'See you soon!', '⏳'],
    ],
    grammar: {
      title: 'Tu or Lei? Informal vs formal "you"',
      body: `<p>Italian has two ways to say <em>you</em>:</p>
<ul><li><b>tu</b> — friends, family, children, people your age in casual settings.</li>
<li><b>Lei</b> — strangers, shop staff, older people, officials. It uses the <em>she/he</em> verb form.</li></ul>
<table><tr><th></th><th>informal (tu)</th><th>formal (Lei)</th></tr>
<tr><td>How are you?</td><td>Come <b>stai</b>?</td><td>Come <b>sta</b>?</td></tr>
<tr><td>What's your name?</td><td>Come ti <b>chiami</b>?</td><td>Come si <b>chiama</b>?</td></tr></table>
<p><b>Tip:</b> when in doubt, start with <b>Lei</b> — Italians will invite you to switch: <em>“Diamoci del tu!”</em></p>`,
    },
    dialogue: {
      scene: 'Luca and Sara meet at a party.',
      lines: [
        ['Sara', 'Ciao! Come ti chiami?', "Hi! What's your name?"],
        ['Luca', 'Ciao! Mi chiamo Luca. E tu?', "Hi! My name's Luca. And you?"],
        ['Sara', 'Mi chiamo Sara. Piacere!', "My name's Sara. Nice to meet you!"],
        ['Luca', 'Piacere! Come stai?', 'Nice to meet you! How are you?'],
        ['Sara', 'Sto bene, grazie. E tu?', "I'm fine, thanks. And you?"],
        ['Luca', 'Benissimo! A presto!', 'Very well! See you soon!'],
      ],
      questions: [
        { q: "What is the man's name?", options: ['Luca', 'Marco', 'Sara'], a: 0 },
        { q: 'How is Sara?', options: ['Fine', 'Tired', 'Sad'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You meet Giulia at a friend\'s party.',
      turns: [
        { p: ['Ciao! Come ti chiami?', "Hi! What's your name?"], cue: 'Say hi and that your name is Alex.', a: ['Ciao, mi chiamo Alex.', 'Mi chiamo Alex.', 'Ciao, sono Alex.', 'Sono Alex.'] },
        { p: ['Piacere! Io sono Giulia. Come stai?', "Nice to meet you! I'm Giulia. How are you?"], cue: "Say you're fine, thanks — and ask “and you?”", a: ['Sto bene, grazie. E tu?', 'Bene, grazie. E tu?', 'Bene grazie, e tu?'] },
        { p: ['Bene! Ciao, a presto!', 'Good! Bye, see you soon!'], cue: 'Say goodbye: “See you soon!”', a: ['A presto!', 'Ciao, a presto!', 'Ciao!'] },
      ],
    },
  },
  {
    id: 'survival',
    title: 'Non capisco',
    subtitle: 'Survival phrases',
    icon: '🛟',
    goal: 'I can manage a conversation when I don\'t understand: ask to repeat, slow down, or explain.',
    words: [
      ['per favore', 'please', '🙏'],
      ['scusi', 'excuse me (formal)', '🙇'],
      ['scusa', 'sorry / excuse me (informal)', '😅'],
      ['certo', 'of course', '👌'],
      ['va bene', 'okay / all right', '👍'],
      ['forse', 'maybe', '🤔'],
      ['molto', 'very / a lot', '➕'],
      ['bene', 'well / good', '😀'],
      ['male', 'badly / bad', '😕'],
      ['non', 'not', '🚫'],
      ['anche', 'also / too', '➕'],
      ['ma', 'but', '↔️'],
      ['e', 'and', '➕'],
    ],
    phrases: [
      ['Non capisco.', "I don't understand.", '🤷'],
      ['Può ripetere, per favore?', 'Can you repeat, please? (formal)', '🔁', null, ['Può ripetere?', 'Puoi ripetere, per favore?']],
      ['Più lentamente, per favore.', 'More slowly, please.', '🐢'],
      ['Parla inglese?', 'Do you speak English? (formal)', '🇬🇧'],
      ['Come si dice?', 'How do you say it?', '💭'],
      ['Cosa significa?', 'What does it mean?', '📖'],
      ['Mi dispiace.', "I'm sorry.", '😔'],
      ['Non lo so.', "I don't know.", '🤷‍♀️'],
      ['Parlo un po\' di italiano.', 'I speak a little Italian.', '🤏', null, ["Parlo un po' italiano"]],
    ],
    grammar: {
      title: 'Saying "not" and asking questions',
      body: `<p><b>Negation:</b> put <b>non</b> right before the verb.</p>
<table><tr><td>Capisco.</td><td>I understand.</td></tr><tr><td><b>Non</b> capisco.</td><td>I don't understand.</td></tr>
<tr><td>Parlo inglese.</td><td>I speak English.</td></tr><tr><td><b>Non</b> parlo inglese.</td><td>I don't speak English.</td></tr></table>
<p><b>Questions:</b> word order usually stays the same — just raise your voice at the end.<br>
<em>Parla inglese.</em> (He speaks English.) → <em>Parla inglese?</em> (Does he speak English?)</p>
<p>These “rescue phrases” are your most valuable tools: they keep the conversation going, and conversation is where you learn.</p>`,
    },
    dialogue: {
      scene: 'A tourist asks a passer-by for help.',
      lines: [
        ['Tourist', 'Scusi, parla inglese?', 'Excuse me, do you speak English?'],
        ['Passer-by', 'No, mi dispiace. Solo italiano.', "No, I'm sorry. Only Italian."],
        ['Tourist', 'Va bene. Parlo un po\' di italiano.', 'Okay. I speak a little Italian.'],
        ['Passer-by', 'Benissimo! Allora, la stazione è lì.', 'Great! So, the station is over there.'],
        ['Tourist', 'Più lentamente, per favore.', 'More slowly, please.'],
        ['Passer-by', 'Certo! La sta-zio-ne è lì.', 'Of course! The sta-tion is there.'],
        ['Tourist', 'Ah, ho capito! Grazie mille!', 'Ah, I understand! Thanks a lot!'],
      ],
      questions: [
        { q: 'Does the passer-by speak English?', options: ['No, only Italian', 'Yes, a little', 'Yes, very well'], a: 0 },
        { q: 'What does the tourist ask for?', options: ['To speak more slowly', 'A map', 'A taxi'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'At the train station, an employee speaks very fast.',
      turns: [
        { p: ['Allora, il treno parte dal binario tre alle nove e un quarto, va bene?', 'So, the train leaves from platform three at quarter past nine, okay?'], cue: "Say you're sorry, you don't understand.", a: ['Mi dispiace, non capisco.', 'Scusi, non capisco.', 'Non capisco.'] },
        { p: ['Ah, scusi!', 'Oh, sorry!'], cue: 'Ask them to repeat more slowly, please.', a: ['Può ripetere più lentamente, per favore?', 'Più lentamente, per favore.', 'Può ripetere, per favore?'] },
        { p: ['Il treno parte alle nove.', 'The train leaves at nine.'], cue: 'Say: Okay, thanks a lot!', a: ['Va bene, grazie mille!', 'Va bene, grazie!', 'Grazie mille!'] },
      ],
    },
  },
  {
    id: 'numbers',
    title: 'I numeri',
    subtitle: 'Numbers, age & phone numbers',
    icon: '🔢',
    goal: 'I can count, say my age and give my phone number.',
    words: [
      ['zero', 'zero', '0️⃣'],
      ['uno', 'one', '1️⃣'],
      ['due', 'two', '2️⃣'],
      ['tre', 'three', '3️⃣'],
      ['quattro', 'four', '4️⃣'],
      ['cinque', 'five', '5️⃣'],
      ['sei', 'six', '6️⃣'],
      ['sette', 'seven', '7️⃣'],
      ['otto', 'eight', '8️⃣'],
      ['nove', 'nine', '9️⃣'],
      ['dieci', 'ten', '🔟'],
      ['venti', 'twenty', '2️⃣0️⃣'],
      ['trenta', 'thirty', '3️⃣0️⃣'],
      ['cento', 'one hundred', '💯'],
    ],
    phrases: [
      ['Quanti anni hai?', 'How old are you? (informal)', '🎂'],
      ['Ho trent\'anni.', "I'm thirty.", '🎉', 'Literally "I have thirty years".', ['Ho trenta anni']],
      ['Qual è il tuo numero?', "What's your number?", '📱'],
      ['Il mio numero è...', 'My number is...', '☎️', null, ['Il mio numero è']],
      ['Quanto fa?', 'How much does it come to?', '🧮'],
      ['Fa dieci euro.', "It's ten euros.", '💶'],
    ],
    grammar: {
      title: 'Age uses "to have" (avere)',
      body: `<p>Italians don't <em>are</em> an age — they <b>have</b> it: <em>Ho trent'anni</em> = “I have thirty years”.</p>
<table><tr><th colspan="2">avere — to have</th></tr>
<tr><td>io <b>ho</b></td><td>I have</td></tr><tr><td>tu <b>hai</b></td><td>you have</td></tr>
<tr><td>lui/lei <b>ha</b></td><td>he/she has</td></tr><tr><td>noi <b>abbiamo</b></td><td>we have</td></tr>
<tr><td>voi <b>avete</b></td><td>you (pl.) have</td></tr><tr><td>loro <b>hanno</b></td><td>they have</td></tr></table>
<p>The <b>h</b> is always silent: <em>ho</em> sounds like “o”.</p>
<p>Teens: <em>undici, dodici, tredici, quattordici, quindici, sedici, diciassette, diciotto, diciannove</em>. Tens: <em>venti, trenta, quaranta, cinquanta…</em> — then just add: <em>ventidue</em> (22), <em>trentacinque</em> (35). Drop the final vowel before <em>uno/otto</em>: <em>ventuno, ventotto</em>.</p>`,
    },
    dialogue: {
      scene: 'Two new colleagues swap numbers.',
      lines: [
        ['Marco', 'Qual è il tuo numero?', "What's your number?"],
        ['Elena', 'Tre, tre, otto, cinque, due, nove, sette.', 'Three, three, eight, five, two, nine, seven.'],
        ['Marco', 'Perfetto, grazie. Quanti anni hai, Elena?', 'Perfect, thanks. How old are you, Elena?'],
        ['Elena', 'Ho ventisei anni. E tu?', "I'm twenty-six. And you?"],
        ['Marco', 'Io ho trent\'anni.', "I'm thirty."],
      ],
      questions: [
        { q: 'How old is Elena?', options: ['26', '30', '36'], a: 0 },
        { q: 'How old is Marco?', options: ['30', '13', '20'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A new friend wants to stay in touch.',
      turns: [
        { p: ['Quanti anni hai?', 'How old are you?'], cue: "Say you're twenty.", a: ['Ho vent\'anni.', 'Ho venti anni.'] },
        { p: ['Anch\'io! Qual è il tuo numero?', "Me too! What's your number?"], cue: 'Say: My number is three, two, five, zero.', a: ['Il mio numero è tre, due, cinque, zero.', 'Tre due cinque zero.'] },
        { p: ['Grazie! A presto!', 'Thanks! See you soon!'], cue: 'Say: See you soon!', a: ['A presto!', 'Ciao, a presto!'] },
      ],
    },
  },
  {
    id: 'family',
    title: 'La famiglia',
    subtitle: 'Family & people',
    icon: '👨‍👩‍👧',
    goal: 'I can talk about my family and ask about someone else\'s.',
    words: [
      ['la famiglia', 'the family', '👨‍👩‍👧'],
      ['la madre', 'the mother', '👩'],
      ['il padre', 'the father', '👨'],
      ['il fratello', 'the brother', '👦'],
      ['la sorella', 'the sister', '👧'],
      ['il figlio', 'the son', '👶'],
      ['la figlia', 'the daughter', '👧'],
      ['il marito', 'the husband', '🤵'],
      ['la moglie', 'the wife', '👰'],
      ['il nonno', 'the grandfather', '👴'],
      ['la nonna', 'the grandmother', '👵'],
      ["l'amico", 'the friend (m)', '🧑‍🤝‍🧑'],
      ["l'amica", 'the friend (f)', '👭'],
    ],
    phrases: [
      ['Hai fratelli?', 'Do you have brothers or sisters?', '👫', '“fratelli” covers siblings of both sexes.'],
      ['Ho una sorella.', 'I have a sister.', '👧'],
      ['Questo è mio padre.', 'This is my father.', '👨'],
      ['Questa è mia madre.', 'This is my mother.', '👩'],
      ['Sei sposato?', 'Are you married? (to a man)', '💍', 'To a woman: Sei sposata?', ['Sei sposata?']],
      ['Ho due figli.', 'I have two children.', '👶👶'],
    ],
    grammar: {
      title: 'Gender and "the": il, la, l\', lo',
      body: `<p>Every noun is masculine or feminine. Usually: <b>-o</b> = masculine, <b>-a</b> = feminine; <b>-e</b> can be either.</p>
<table><tr><th>article</th><th>used before</th><th>example</th></tr>
<tr><td><b>il</b></td><td>masc. + consonant</td><td>il padre</td></tr>
<tr><td><b>lo</b></td><td>masc. + s+consonant, z, gn</td><td>lo zio (uncle)</td></tr>
<tr><td><b>la</b></td><td>fem. + consonant</td><td>la madre</td></tr>
<tr><td><b>l'</b></td><td>any + vowel</td><td>l'amico, l'amica</td></tr></table>
<p><b>Family exception:</b> with <em>mio/mia</em> + a <em>singular</em> family member, drop the article: <em>mio padre, mia sorella</em> (but <em>i miei fratelli</em>).</p>`,
    },
    dialogue: {
      scene: 'Chiara shows Tom a family photo.',
      lines: [
        ['Chiara', 'Guarda, questa è la mia famiglia.', 'Look, this is my family.'],
        ['Tom', 'Che bella! Chi è questo?', 'How lovely! Who is this?'],
        ['Chiara', 'Questo è mio padre, e questa è mia madre.', 'This is my father, and this is my mother.'],
        ['Tom', 'Hai fratelli?', 'Do you have brothers or sisters?'],
        ['Chiara', 'Sì, ho una sorella. Si chiama Paola.', 'Yes, I have a sister. Her name is Paola.'],
        ['Tom', 'Io ho due fratelli.', 'I have two brothers.'],
      ],
      questions: [
        { q: "What is Chiara's sister called?", options: ['Paola', 'Anna', 'Maria'], a: 0 },
        { q: 'How many brothers does Tom have?', options: ['Two', 'One', 'None'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A colleague asks about your family.',
      turns: [
        { p: ['Hai fratelli?', 'Do you have brothers or sisters?'], cue: 'Say you have a sister.', a: ['Sì, ho una sorella.', 'Ho una sorella.'] },
        { p: ['Che bello! Sei sposato?', 'How nice! Are you married?'], cue: 'Say: no, but I have a girlfriend… or keep it simple: “No.”', a: ['No, non sono sposato.', 'No, non sono sposata.', 'No.'] },
        { p: ['E i tuoi genitori?', 'And your parents?'], cue: 'Say: My mother is called Maria.', a: ['Mia madre si chiama Maria.'] },
      ],
    },
  },
  {
    id: 'cafe',
    title: 'Al bar',
    subtitle: 'Food, drink & ordering',
    icon: '☕',
    goal: 'I can order food and drinks, and ask for the bill.',
    words: [
      ['il caffè', 'the coffee (espresso)', '☕'],
      ['il cappuccino', 'the cappuccino', '☕'],
      ["l'acqua", 'the water', '💧'],
      ['il tè', 'the tea', '🍵'],
      ['il vino', 'the wine', '🍷'],
      ['la birra', 'the beer', '🍺'],
      ['il pane', 'the bread', '🍞'],
      ['il cornetto', 'the croissant', '🥐'],
      ['la pizza', 'the pizza', '🍕'],
      ['la pasta', 'the pasta', '🍝'],
      ['il gelato', 'the ice cream', '🍨'],
      ['il conto', 'the bill', '🧾'],
      ['buono', 'good / tasty', '😋'],
    ],
    phrases: [
      ['Vorrei un caffè, per favore.', "I'd like a coffee, please.", '☕', null, ['Vorrei un caffè', 'Un caffè, per favore']],
      ['Un cappuccino e un cornetto.', 'A cappuccino and a croissant.', '🥐'],
      ['Quanto costa?', 'How much is it?', '💶'],
      ['Il conto, per favore.', 'The bill, please.', '🧾'],
      ['Ho fame.', "I'm hungry.", '🍽️', 'Literally "I have hunger".'],
      ['Ho sete.', "I'm thirsty.", '🥤'],
      ['Buon appetito!', 'Enjoy your meal!', '🍴'],
      ['È buonissimo!', "It's delicious!", '😋'],
    ],
    grammar: {
      title: 'Vorrei and "a/an": un, una, un\', uno',
      body: `<p><b>Vorrei</b> (“I would like”) is the polite way to order. <em>Voglio</em> (“I want”) sounds blunt.</p>
<table><tr><th>a / an</th><th>used before</th><th>example</th></tr>
<tr><td><b>un</b></td><td>masculine</td><td>un caffè, un amico</td></tr>
<tr><td><b>uno</b></td><td>masc. + s+consonant, z</td><td>uno spritz, uno zucchero</td></tr>
<tr><td><b>una</b></td><td>feminine + consonant</td><td>una birra</td></tr>
<tr><td><b>un'</b></td><td>feminine + vowel</td><td>un'acqua, un'aranciata</td></tr></table>
<p><b>Culture:</b> in Italy <em>un caffè</em> is an espresso, and cappuccino is a morning drink!</p>`,
    },
    dialogue: {
      scene: 'Ordering breakfast at a bar.',
      lines: [
        ['Barista', 'Buongiorno! Cosa prende?', 'Good morning! What will you have?'],
        ['Customer', 'Vorrei un cappuccino e un cornetto, per favore.', "I'd like a cappuccino and a croissant, please."],
        ['Barista', 'Certo. Altro?', 'Sure. Anything else?'],
        ['Customer', "Anche un'acqua, grazie. Quanto costa?", 'A water too, thanks. How much is it?'],
        ['Barista', 'Quattro euro.', 'Four euros.'],
        ['Customer', 'Ecco a lei. Grazie!', 'Here you are. Thanks!'],
      ],
      questions: [
        { q: 'What does the customer eat?', options: ['A croissant', 'A pizza', 'Bread'], a: 0 },
        { q: 'How much does it cost?', options: ['€4', '€14', '€40'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You walk into a busy Roman café.',
      turns: [
        { p: ['Buongiorno! Cosa prende?', 'Good morning! What will you have?'], cue: "Say you'd like a coffee, please.", a: ['Vorrei un caffè, per favore.', 'Un caffè, per favore.'] },
        { p: ['Ecco a lei. Altro?', 'Here you are. Anything else?'], cue: 'Ask for a croissant too.', a: ['Anche un cornetto, per favore.', 'Un cornetto, per favore.', 'Vorrei anche un cornetto.'] },
        { p: ['Va bene!', 'Okay!'], cue: 'Ask how much it is.', a: ['Quanto costa?', 'Quanto fa?'] },
        { p: ['Due euro e cinquanta.', 'Two euros fifty.'], cue: 'Say thank you, goodbye.', a: ['Grazie, arrivederci!', 'Grazie, buongiorno!', 'Grazie!'] },
      ],
    },
  },
  {
    id: 'town',
    title: 'In città',
    subtitle: 'Places & directions',
    icon: '🗺️',
    goal: 'I can ask where places are and understand simple directions.',
    words: [
      ['la stazione', 'the station', '🚉'],
      ['la piazza', 'the square', '⛲'],
      ['la chiesa', 'the church', '⛪'],
      ['il museo', 'the museum', '🏛️'],
      ["l'albergo", 'the hotel', '🏨'],
      ['la farmacia', 'the pharmacy', '💊'],
      ['il ristorante', 'the restaurant', '🍽️'],
      ['il bagno', 'the bathroom', '🚻'],
      ['la strada', 'the road / street', '🛣️'],
      ['a destra', 'to the right', '➡️'],
      ['a sinistra', 'to the left', '⬅️'],
      ['dritto', 'straight on', '⬆️'],
      ['vicino', 'near', '📍'],
      ['lontano', 'far', '🔭'],
    ],
    phrases: [
      ["Dov'è la stazione?", 'Where is the station?', '🚉', null, ['Dove è la stazione?']],
      ["Scusi, dov'è il bagno?", 'Excuse me, where is the bathroom?', '🚻', null, ["Dov'è il bagno?"]],
      ['Giri a destra.', 'Turn right. (formal)', '➡️'],
      ['Vada sempre dritto.', 'Keep going straight. (formal)', '⬆️', null, ['Vada dritto']],
      ['È lontano?', 'Is it far?', '🔭'],
      ["C'è una farmacia qui vicino?", 'Is there a pharmacy near here?', '💊'],
      ['È a cinque minuti.', "It's five minutes away.", '⏱️'],
    ],
    grammar: {
      title: "Dov'è…? and C'è…? (Where is…? / Is there…?)",
      body: `<p><b>Dov'è</b> = dove + è (“where is”) — for a specific place: <em>Dov'è il museo?</em><br>
<b>Dove sono</b> = “where are”: <em>Dove sono i bagni?</em></p>
<p><b>C'è</b> = “there is” — for <em>any</em> one: <em>C'è un bancomat?</em> (Is there a cash machine?)<br>
<b>Ci sono</b> = “there are”: <em>Ci sono molti ristoranti.</em></p>
<p><b>Commands:</b> directions are given as polite commands: <em>giri</em> (turn), <em>vada</em> (go), <em>prenda</em> (take). Informal: <em>gira, vai, prendi</em>.</p>`,
    },
    dialogue: {
      scene: 'A visitor looks for the museum.',
      lines: [
        ['Visitor', "Scusi, dov'è il museo?", 'Excuse me, where is the museum?'],
        ['Local', 'Vada sempre dritto, poi giri a sinistra.', 'Keep going straight, then turn left.'],
        ['Visitor', 'È lontano?', 'Is it far?'],
        ['Local', 'No, è vicino. È a cinque minuti.', "No, it's near. It's five minutes away."],
        ['Visitor', "C'è anche una farmacia qui vicino?", 'Is there a pharmacy near here too?'],
        ['Local', 'Sì, in piazza, a destra della chiesa.', 'Yes, in the square, to the right of the church.'],
      ],
      questions: [
        { q: 'How far is the museum?', options: ['Five minutes', 'Fifteen minutes', 'Very far'], a: 0 },
        { q: 'Where is the pharmacy?', options: ['In the square', 'At the station', 'Next to the hotel'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You are lost in Florence and stop a local.',
      turns: [
        { p: ['Sì? Mi dica.', 'Yes? How can I help?'], cue: 'Ask where the station is.', a: ["Dov'è la stazione?", "Scusi, dov'è la stazione?"] },
        { p: ['Vada dritto e poi giri a destra.', 'Go straight and then turn right.'], cue: 'Ask if it is far.', a: ['È lontano?'] },
        { p: ['No, è a dieci minuti.', "No, it's ten minutes away."], cue: 'Say thank you very much.', a: ['Grazie mille!', 'Grazie!', 'Molte grazie!'] },
      ],
    },
  },
  {
    id: 'time',
    title: 'Che ore sono?',
    subtitle: 'Time & days',
    icon: '🕒',
    goal: 'I can tell the time, name the days and make a simple plan.',
    words: [
      ['lunedì', 'Monday', '1️⃣'],
      ['martedì', 'Tuesday', '2️⃣'],
      ['mercoledì', 'Wednesday', '3️⃣'],
      ['giovedì', 'Thursday', '4️⃣'],
      ['venerdì', 'Friday', '5️⃣'],
      ['sabato', 'Saturday', '6️⃣'],
      ['domenica', 'Sunday', '7️⃣'],
      ['oggi', 'today', '📅'],
      ['domani', 'tomorrow', '➡️'],
      ['ieri', 'yesterday', '⬅️'],
      ['la mattina', 'the morning', '🌄'],
      ['la sera', 'the evening', '🌇'],
      ['adesso', 'now', '⏰'],
    ],
    phrases: [
      ['Che ore sono?', 'What time is it?', '🕒', null, ["Che ora è?"]],
      ['Sono le tre.', "It's three o'clock.", '🕒'],
      ["È l'una.", "It's one o'clock.", '🕐'],
      ['A che ora?', 'At what time?', '⏰'],
      ['Oggi è lunedì.', 'Today is Monday.', '📅'],
      ['Ci vediamo domani!', 'See you tomorrow!', '👋'],
      ['Sei libero stasera?', 'Are you free tonight? (to a man)', '🌃', 'To a woman: Sei libera stasera?', ['Sei libera stasera?']],
    ],
    grammar: {
      title: 'Telling the time',
      body: `<p>Use <b>sono le</b> + hour (plural, because hours are many): <em>Sono le due, sono le dieci.</em></p>
<p>Exceptions (singular): <em><b>È l'una</b></em> (1:00), <em><b>È mezzogiorno</b></em> (noon), <em><b>È mezzanotte</b></em> (midnight).</p>
<table><tr><td>3:15</td><td>Sono le tre <b>e un quarto</b></td></tr><tr><td>3:30</td><td>Sono le tre <b>e mezza</b></td></tr>
<tr><td>3:45</td><td>Sono le quattro <b>meno un quarto</b></td></tr><tr><td>at 8</td><td><b>alle</b> otto</td></tr></table>
<p>Days are <b>not capitalised</b>, and <em>il lunedì</em> = “on Mondays” (habit).</p>`,
    },
    dialogue: {
      scene: 'Two friends make plans.',
      lines: [
        ['Paolo', 'Ciao Giulia! Sei libera stasera?', 'Hi Giulia! Are you free tonight?'],
        ['Giulia', 'No, mi dispiace. Oggi lavoro fino a tardi.', "No, sorry. Today I'm working late."],
        ['Paolo', 'E domani?', 'And tomorrow?'],
        ['Giulia', 'Domani sì! A che ora?', 'Tomorrow, yes! At what time?'],
        ['Paolo', 'Alle otto, in piazza?', 'At eight, in the square?'],
        ['Giulia', 'Perfetto. Ci vediamo domani!', 'Perfect. See you tomorrow!'],
      ],
      questions: [
        { q: 'When will they meet?', options: ['Tomorrow at 8', 'Tonight at 8', 'Tomorrow at 7'], a: 0 },
        { q: 'Why is Giulia busy tonight?', options: ['She is working', 'She is ill', 'She is travelling'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A friend calls to make plans.',
      turns: [
        { p: ['Ciao! Sei libero stasera?', 'Hi! Are you free tonight?'], cue: "Say no, sorry — but tomorrow yes.", a: ['No, mi dispiace. Domani sì.', 'No, mi dispiace, ma domani sì.'] },
        { p: ['Va bene. A che ora?', 'Okay. What time?'], cue: 'Say: at seven.', a: ['Alle sette.', 'Domani alle sette.'] },
        { p: ['Perfetto!', 'Perfect!'], cue: 'Say: see you tomorrow!', a: ['Ci vediamo domani!', 'A domani!'] },
      ],
    },
  },
  {
    id: 'shopping',
    title: 'Fare spese',
    subtitle: 'Shopping & prices',
    icon: '🛍️',
    goal: 'I can ask prices, try things on and pay in a shop.',
    words: [
      ['il negozio', 'the shop', '🏬'],
      ['il mercato', 'the market', '🧺'],
      ['i soldi', 'the money', '💰'],
      ['il prezzo', 'the price', '🏷️'],
      ['caro', 'expensive', '💸'],
      ['economico', 'cheap', '🪙'],
      ['la taglia', 'the size (clothes)', '📏'],
      ['la camicia', 'the shirt', '👔'],
      ['le scarpe', 'the shoes', '👟'],
      ['il vestito', 'the dress / suit', '👗'],
      ['la borsa', 'the bag', '👜'],
      ['questo', 'this (one)', '👇'],
      ['quello', 'that (one)', '👉'],
    ],
    phrases: [
      ['Quanto costa questo?', 'How much is this?', '🏷️'],
      ['Costa venti euro.', 'It costs twenty euros.', '💶'],
      ['È troppo caro.', "It's too expensive.", '💸'],
      ['Posso provare?', 'Can I try it on?', '🪞'],
      ['Lo prendo.', "I'll take it.", '🛍️', '“La prendo” for a feminine item (la borsa).', ['La prendo.']],
      ['Posso pagare con la carta?', 'Can I pay by card?', '💳'],
      ['Sto solo guardando.', "I'm just looking.", '👀'],
    ],
    grammar: {
      title: 'Plurals and this/that',
      body: `<table><tr><th>singular</th><th>plural</th><th>example</th></tr>
<tr><td>-o</td><td>-i</td><td>il negozi<b>o</b> → i negoz<b>i</b></td></tr>
<tr><td>-a</td><td>-e</td><td>la bors<b>a</b> → le bors<b>e</b></td></tr>
<tr><td>-e</td><td>-i</td><td>il prezz<b>o</b>, la chiav<b>e</b> → le chiav<b>i</b></td></tr></table>
<p>Words ending in an accented vowel don't change: <em>il caffè → i caffè</em>.</p>
<p><b>questo</b> (this) and <b>quello</b> (that) agree like adjectives: <em>questa borsa, queste scarpe</em>.</p>`,
    },
    dialogue: {
      scene: 'In a clothes shop in Milan.',
      lines: [
        ['Assistant', 'Buongiorno! Posso aiutarla?', 'Good morning! Can I help you?'],
        ['Customer', 'Sto solo guardando, grazie. Quanto costa questa camicia?', "I'm just looking, thanks. How much is this shirt?"],
        ['Assistant', 'Costa trenta euro.', 'It costs thirty euros.'],
        ['Customer', 'Posso provare?', 'Can I try it on?'],
        ['Assistant', 'Certo, il camerino è lì.', 'Of course, the fitting room is there.'],
        ['Customer', 'Mi sta bene. La prendo! Posso pagare con la carta?', 'It fits me. I\'ll take it! Can I pay by card?'],
      ],
      questions: [
        { q: 'How much is the shirt?', options: ['€30', '€13', '€3'], a: 0 },
        { q: 'Does the customer buy it?', options: ['Yes', 'No', "We don't know"], a: 0 },
      ],
    },
    roleplay: {
      scene: 'At a market stall selling bags.',
      turns: [
        { p: ['Buongiorno! Desidera?', 'Good morning! What would you like?'], cue: 'Ask how much this bag is (or just "how much is this?").', a: ['Quanto costa questa borsa?', 'Quanto costa questo?', 'Quanto costa?'] },
        { p: ['Cinquanta euro.', 'Fifty euros.'], cue: "Say it's too expensive.", a: ['È troppo caro.', 'È troppo cara.'] },
        { p: ['Va bene, quaranta.', 'All right, forty.'], cue: "Say: I'll take it!", a: ['La prendo!', 'Lo prendo!', 'Va bene, la prendo!'] },
      ],
    },
  },
  {
    id: 'describing',
    title: 'Com\'è?',
    subtitle: 'Colours & descriptions',
    icon: '🎨',
    goal: 'I can describe people and things using colours and adjectives.',
    words: [
      ['rosso', 'red', '🟥'],
      ['blu', 'blue', '🟦'],
      ['verde', 'green', '🟩'],
      ['giallo', 'yellow', '🟨'],
      ['bianco', 'white', '⬜'],
      ['nero', 'black', '⬛'],
      ['grande', 'big', '🐘'],
      ['piccolo', 'small', '🐭'],
      ['nuovo', 'new', '✨'],
      ['vecchio', 'old', '🏚️'],
      ['bello', 'beautiful / nice', '🌸'],
      ['alto', 'tall / high', '🦒'],
      ['simpatico', 'nice / friendly (person)', '😄'],
    ],
    phrases: [
      ['La casa è grande.', 'The house is big.', '🏠'],
      ['Di che colore è?', 'What colour is it?', '🎨'],
      ['È rossa.', "It's red. (feminine thing)", '🟥', 'Masculine thing: È rosso.', ['È rosso.']],
      ['Il mio amico è simpatico.', 'My friend is nice.', '😄'],
      ['Lei è molto alta.', 'She is very tall.', '🦒'],
      ['Che bello!', 'How lovely!', '😍'],
    ],
    grammar: {
      title: 'Adjectives agree — and usually come after',
      body: `<p>Adjectives match the noun's gender and number, and usually go <b>after</b> the noun.</p>
<table><tr><th></th><th>singular</th><th>plural</th></tr>
<tr><td>masc.</td><td>il gatto ner<b>o</b></td><td>i gatti ner<b>i</b></td></tr>
<tr><td>fem.</td><td>la casa bianc<b>a</b></td><td>le case bianch<b>e</b></td></tr></table>
<p>Adjectives in <b>-e</b> have one form per number: <em>il libro verd<b>e</b>, la mela verd<b>e</b></em>. <em>Blu</em> never changes.</p>
<table><tr><th colspan="2">essere — to be</th></tr><tr><td>io sono</td><td>noi siamo</td></tr><tr><td>tu sei</td><td>voi siete</td></tr><tr><td>lui/lei è</td><td>loro sono</td></tr></table>`,
    },
    dialogue: {
      scene: 'Describing a new flat.',
      lines: [
        ['Anna', 'Com\'è la tua casa nuova?', "What's your new house like?"],
        ['Davide', 'È piccola, ma molto bella.', "It's small, but very nice."],
        ['Anna', 'Di che colore è la cucina?', 'What colour is the kitchen?'],
        ['Davide', 'È gialla e bianca.', "It's yellow and white."],
        ['Anna', 'Che bello! E i vicini?', 'How lovely! And the neighbours?'],
        ['Davide', 'Sono molto simpatici.', "They're very nice."],
      ],
      questions: [
        { q: "How is Davide's house?", options: ['Small but nice', 'Big and old', 'New and ugly'], a: 0 },
        { q: 'What colour is the kitchen?', options: ['Yellow and white', 'Red and black', 'Green'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A friend asks about your new car.',
      turns: [
        { p: ['Hai una macchina nuova? Com\'è?', 'You have a new car? What\'s it like?'], cue: "Say it's small but beautiful.", a: ['È piccola ma bella.', 'È piccola, ma molto bella.'] },
        { p: ['Di che colore è?', 'What colour is it?'], cue: "Say it's red.", a: ['È rossa.', 'È rosso.'] },
        { p: ['Che bello!', 'How lovely!'], cue: 'Say: Thanks! It\'s very nice.', a: ['Grazie! È molto bella.', 'Grazie!'] },
      ],
    },
  },
  {
    id: 'routine',
    title: 'La giornata',
    subtitle: 'Daily routine & verbs',
    icon: '⏰',
    goal: 'I can describe my day and ask others about theirs.',
    words: [
      ['parlare', 'to speak', '🗣️'],
      ['mangiare', 'to eat', '🍽️'],
      ['bere', 'to drink', '🥤'],
      ['dormire', 'to sleep', '😴'],
      ['lavorare', 'to work', '💼'],
      ['studiare', 'to study', '📚'],
      ['andare', 'to go', '🚶'],
      ['fare', 'to do / make', '🛠️'],
      ['leggere', 'to read', '📖'],
      ['scrivere', 'to write', '✍️'],
      ['la casa', 'the house / home', '🏠'],
      ["l'ufficio", 'the office', '🏢'],
      ['ogni giorno', 'every day', '🔁'],
    ],
    phrases: [
      ['Mi sveglio alle sette.', 'I wake up at seven.', '⏰'],
      ['Lavoro in ufficio.', 'I work in an office.', '🏢'],
      ["Studio l'italiano.", "I'm studying Italian.", '📚'],
      ['Vado a casa.', "I'm going home.", '🏠'],
      ['La sera leggo un libro.', 'In the evening I read a book.', '📖'],
      ['Cosa fai nel tempo libero?', 'What do you do in your free time?', '🎮'],
    ],
    grammar: {
      title: 'Present tense: -are, -ere, -ire verbs',
      body: `<p>Remove the ending and add the person ending. The ending tells you <em>who</em>, so <b>io/tu</b> are usually dropped.</p>
<table><tr><th></th><th>parl<b>are</b></th><th>legg<b>ere</b></th><th>dorm<b>ire</b></th></tr>
<tr><td>io</td><td>parl<b>o</b></td><td>legg<b>o</b></td><td>dorm<b>o</b></td></tr>
<tr><td>tu</td><td>parl<b>i</b></td><td>legg<b>i</b></td><td>dorm<b>i</b></td></tr>
<tr><td>lui/lei</td><td>parl<b>a</b></td><td>legg<b>e</b></td><td>dorm<b>e</b></td></tr>
<tr><td>noi</td><td>parl<b>iamo</b></td><td>legg<b>iamo</b></td><td>dorm<b>iamo</b></td></tr>
<tr><td>voi</td><td>parl<b>ate</b></td><td>legg<b>ete</b></td><td>dorm<b>ite</b></td></tr>
<tr><td>loro</td><td>parl<b>ano</b></td><td>legg<b>ono</b></td><td>dorm<b>ono</b></td></tr></table>
<p>Irregular must-knows: <em>vado</em> (I go), <em>faccio</em> (I do), <em>bevo</em> (I drink).</p>`,
    },
    dialogue: {
      scene: 'Chatting about daily life.',
      lines: [
        ['Sofia', 'A che ora ti svegli?', 'What time do you wake up?'],
        ['Ben', 'Mi sveglio alle sette. Poi bevo un caffè.', 'I wake up at seven. Then I drink a coffee.'],
        ['Sofia', 'Lavori in ufficio?', 'Do you work in an office?'],
        ['Ben', 'Sì, lavoro in ufficio. La sera studio l\'italiano.', 'Yes, I work in an office. In the evening I study Italian.'],
        ['Sofia', 'Bravo! E cosa fai nel tempo libero?', 'Well done! And what do you do in your free time?'],
        ['Ben', 'Leggo e vado al cinema.', 'I read and go to the cinema.'],
      ],
      questions: [
        { q: 'When does Ben study Italian?', options: ['In the evening', 'In the morning', 'At lunch'], a: 0 },
        { q: 'What does Ben do after waking up?', options: ['Drinks a coffee', 'Goes running', 'Reads'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'A language-exchange partner asks about your routine.',
      turns: [
        { p: ['A che ora ti svegli?', 'What time do you wake up?'], cue: 'Say you wake up at seven.', a: ['Mi sveglio alle sette.'] },
        { p: ['E dove lavori?', 'And where do you work?'], cue: 'Say you work in an office.', a: ['Lavoro in ufficio.'] },
        { p: ['Cosa fai la sera?', 'What do you do in the evening?'], cue: 'Say you study Italian.', a: ["Studio l'italiano.", "La sera studio l'italiano."] },
      ],
    },
  },
  {
    id: 'travel',
    title: 'In viaggio',
    subtitle: 'Travel & transport',
    icon: '🚆',
    goal: 'I can buy a ticket, ask about departures and check in.',
    words: [
      ['il treno', 'the train', '🚆'],
      ["l'autobus", 'the bus', '🚌'],
      ["l'aereo", 'the plane', '✈️'],
      ['la macchina', 'the car', '🚗'],
      ['il biglietto', 'the ticket', '🎫'],
      ['il binario', 'the platform', '🛤️'],
      ['la valigia', 'the suitcase', '🧳'],
      ['il passaporto', 'the passport', '🛂'],
      ["l'aeroporto", 'the airport', '🛫'],
      ['partire', 'to leave / depart', '🛫'],
      ['arrivare', 'to arrive', '🛬'],
      ['la prenotazione', 'the booking', '📋'],
    ],
    phrases: [
      ['Un biglietto per Roma, per favore.', 'A ticket to Rome, please.', '🎫'],
      ['A che ora parte il treno?', 'What time does the train leave?', '🕘'],
      ['Da quale binario?', 'From which platform?', '🛤️'],
      ['Andata e ritorno.', 'Return (round trip).', '🔁'],
      ['Solo andata.', 'One way.', '➡️'],
      ['Ho una prenotazione.', 'I have a booking.', '📋'],
      ['Il treno è in ritardo.', 'The train is late.', '⌛'],
    ],
    grammar: {
      title: 'Going places: a, in, da',
      body: `<table><tr><td><b>a</b> + city</td><td>Vado <b>a</b> Roma.</td></tr>
<tr><td><b>in</b> + country/region</td><td>Vado <b>in</b> Italia, <b>in</b> Toscana.</td></tr>
<tr><td><b>in</b> + transport</td><td><b>in</b> treno, <b>in</b> aereo, <b>in</b> macchina — but <b>a</b> piedi (on foot)</td></tr>
<tr><td><b>da</b> = from</td><td>Il treno parte <b>da</b> Milano.</td></tr></table>
<p>Prepositions merge with “the”: <em>a + il = <b>al</b></em> (al museo), <em>da + il = <b>dal</b></em> (dal binario tre), <em>in + la = <b>nella</b></em>.</p>`,
    },
    dialogue: {
      scene: 'At the ticket office.',
      lines: [
        ['Traveller', 'Buongiorno. Un biglietto per Roma, per favore.', 'Good morning. A ticket to Rome, please.'],
        ['Clerk', 'Solo andata o andata e ritorno?', 'One way or return?'],
        ['Traveller', 'Andata e ritorno. A che ora parte il treno?', 'Return. What time does the train leave?'],
        ['Clerk', 'Alle dieci e mezza, dal binario quattro.', 'At half past ten, from platform four.'],
        ['Traveller', 'Quanto costa?', 'How much is it?'],
        ['Clerk', 'Quarantadue euro.', 'Forty-two euros.'],
      ],
      questions: [
        { q: 'What time is the train?', options: ['10:30', '10:00', '4:30'], a: 0 },
        { q: 'Which platform?', options: ['4', '2', '10'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'Buying a train ticket in Naples.',
      turns: [
        { p: ['Buongiorno, dove va?', 'Good morning, where are you going?'], cue: 'Ask for a ticket to Rome, please.', a: ['Un biglietto per Roma, per favore.', 'Vorrei un biglietto per Roma.'] },
        { p: ['Solo andata?', 'One way?'], cue: 'Say: no, return.', a: ['No, andata e ritorno.', 'Andata e ritorno.'] },
        { p: ['Ecco. Sono trenta euro.', "Here you go. That's thirty euros."], cue: 'Ask what time the train leaves.', a: ['A che ora parte il treno?', 'A che ora parte?'] },
      ],
    },
  },
  {
    id: 'health',
    title: 'Come ti senti?',
    subtitle: 'Feelings & health',
    icon: '🩺',
    goal: 'I can say how I feel and explain a simple health problem.',
    words: [
      ['felice', 'happy', '😊'],
      ['triste', 'sad', '😢'],
      ['stanco', 'tired', '🥱'],
      ['malato', 'ill / sick', '🤒'],
      ['arrabbiato', 'angry', '😠'],
      ['la testa', 'the head', '🧠'],
      ['lo stomaco', 'the stomach', '🤢'],
      ['la gola', 'the throat', '🗣️'],
      ['il medico', 'the doctor', '🧑‍⚕️'],
      ['la medicina', 'the medicine', '💊'],
      ['la febbre', 'the fever', '🌡️'],
      ['aiuto', 'help!', '🆘'],
    ],
    phrases: [
      ['Come ti senti?', 'How do you feel?', '❓'],
      ['Mi sento bene.', 'I feel good.', '👍'],
      ['Ho mal di testa.', 'I have a headache.', '🤕'],
      ['Mi fa male la gola.', 'My throat hurts.', '🗣️'],
      ['Ho bisogno di un medico.', 'I need a doctor.', '🧑‍⚕️'],
      ['Sono stanco.', "I'm tired. (man)", '🥱', 'Woman: Sono stanca.', ['Sono stanca.']],
      ['Chiamate un\'ambulanza!', 'Call an ambulance!', '🚑'],
    ],
    grammar: {
      title: 'Avere for feelings, and "it hurts"',
      body: `<p>Many physical states use <b>avere</b> (to have):</p>
<table><tr><td>ho fame</td><td>I'm hungry</td></tr><tr><td>ho sete</td><td>I'm thirsty</td></tr>
<tr><td>ho freddo / caldo</td><td>I'm cold / hot</td></tr><tr><td>ho sonno</td><td>I'm sleepy</td></tr>
<tr><td>ho mal di testa</td><td>I have a headache</td></tr><tr><td>ho la febbre</td><td>I have a fever</td></tr></table>
<p><b>It hurts:</b> <em>Mi fa male</em> + singular, <em>Mi fanno male</em> + plural: <em>Mi fanno male i piedi</em> (My feet hurt).</p>
<p>Emotions use <b>essere</b> and agree: <em>sono stanco / stanca</em>.</p>`,
    },
    dialogue: {
      scene: 'At the pharmacy.',
      lines: [
        ['Pharmacist', 'Buongiorno, mi dica.', 'Good morning, how can I help?'],
        ['Customer', 'Buongiorno. Non mi sento bene. Ho mal di testa.', "Good morning. I don't feel well. I have a headache."],
        ['Pharmacist', 'Ha anche la febbre?', 'Do you also have a fever?'],
        ['Customer', 'No, ma mi fa male la gola.', 'No, but my throat hurts.'],
        ['Pharmacist', 'Prenda questa medicina tre volte al giorno.', 'Take this medicine three times a day.'],
        ['Customer', 'Grazie mille.', 'Thank you very much.'],
      ],
      questions: [
        { q: 'What hurts besides the head?', options: ['The throat', 'The stomach', 'The back'], a: 0 },
        { q: 'How often should the medicine be taken?', options: ['Three times a day', 'Once a day', 'Twice a day'], a: 0 },
      ],
    },
    roleplay: {
      scene: 'You visit a doctor.',
      turns: [
        { p: ['Buongiorno. Come si sente?', 'Good morning. How do you feel?'], cue: "Say you don't feel well — you have a headache.", a: ['Non mi sento bene. Ho mal di testa.', 'Ho mal di testa.'] },
        { p: ['Ha la febbre?', 'Do you have a fever?'], cue: 'Say: no, but my throat hurts.', a: ['No, ma mi fa male la gola.', 'Mi fa male la gola.'] },
        { p: ['Ecco una medicina.', 'Here is a medicine.'], cue: 'Say thank you very much.', a: ['Grazie mille.', 'Grazie.'] },
      ],
    },
  },
];
