// Italian "Sounds & Spelling" track. Italian spelling is very regular:
// learn ~10 rules and you can pronounce (and write) almost any word you hear.
// Each group: rule explanation, examples [word, english, note?], and minimal
// pairs [a, b] used for "which did you hear?" discrimination drills.

export const SOUND_GROUPS = [
  {
    id: 'p1', title: 'The five vowels', icon: 'A',
    rule: `<p>Italian has 5 vowel letters and they are <b>always pronounced</b> — clear and short, never “swallowed” like in English.</p>
<table><tr><td><b>a</b></td><td>as in “f<b>a</b>ther”</td><td>c<b>a</b>s<b>a</b></td></tr>
<tr><td><b>e</b></td><td>as in “b<b>e</b>d” or “th<b>e</b>y”</td><td>s<b>e</b>tt<b>e</b></td></tr>
<tr><td><b>i</b></td><td>as in “mach<b>i</b>ne”</td><td>v<b>i</b>no</td></tr>
<tr><td><b>o</b></td><td>as in “p<b>o</b>t” or “n<b>o</b>te” (pure)</td><td>n<b>o</b>tt<b>e</b></td></tr>
<tr><td><b>u</b></td><td>as in “r<b>u</b>le”</td><td>l<b>u</b>na</td></tr></table>
<p>Every vowel at the end of a word is pronounced: <em>notte</em> = “NOT-teh”, not “not”.</p>`,
    examples: [['casa', 'house'], ['vino', 'wine'], ['luna', 'moon'], ['notte', 'night'], ['sole', 'sun'], ['amore', 'love'], ['uva', 'grapes'], ['idea', 'idea']],
    pairs: [['pasta', 'pesto'], ['vino', 'vano'], ['luna', 'lana'], ['caro', 'cura']],
  },
  {
    id: 'p2', title: 'C & G: hard or soft?', icon: 'C',
    rule: `<p><b>C</b> and <b>G</b> are “soft” before <b>e</b> and <b>i</b>, “hard” everywhere else.</p>
<table><tr><th></th><th>hard (k / g)</th><th>soft (ch / j)</th></tr>
<tr><td>C</td><td><b>ca co cu</b> — casa, cosa, cuore</td><td><b>ce ci</b> — cena, ciao</td></tr>
<tr><td>G</td><td><b>ga go gu</b> — gatto, gola, gusto</td><td><b>ge gi</b> — gelato, giorno</td></tr></table>
<p>To make a hard sound before e/i, add <b>h</b>: <b>che, chi</b> (k) — <em>che, chiesa</em>; <b>ghe, ghi</b> (g) — <em>spaghetti</em>.</p>
<p>To make a soft sound before a/o/u, add a silent <b>i</b>: <b>cia, cio, ciu</b> — <em>ciao</em>; <b>gia, gio, giu</b> — <em>giorno, giusto</em>.</p>`,
    examples: [['ciao', 'hi'], ['cena', 'dinner'], ['casa', 'house'], ['chiesa', 'church'], ['gelato', 'ice cream'], ['gatto', 'cat'], ['spaghetti', 'spaghetti'], ['giorno', 'day'], ['amiche', 'female friends'], ['funghi', 'mushrooms']],
    pairs: [['ceci', 'chechi'], ['gelo', 'ghelo'], ['cena', 'china'], ['caro', 'ciao'], ['gente', 'ghente']],
  },
  {
    id: 'p3', title: 'SC: “sh” or “sk”?', icon: 'S',
    rule: `<p>The same logic applies to <b>sc</b>:</p>
<table><tr><td><b>sce, sci</b></td><td>“sh”</td><td><em>scena, sciare, pesce</em></td></tr>
<tr><td><b>sca, sco, scu</b></td><td>“sk”</td><td><em>scala, scuola, scusa</em></td></tr>
<tr><td><b>sche, schi</b></td><td>“sk”</td><td><em>scherzo, schiena</em></td></tr>
<tr><td><b>scia, scio, sciu</b></td><td>“sh”</td><td><em>sciopero, lasciare</em></td></tr></table>`,
    examples: [['pesce', 'fish'], ['scuola', 'school'], ['scusa', 'sorry'], ['uscita', 'exit'], ['scena', 'scene'], ['schiena', 'back (body)'], ['sciarpa', 'scarf'], ['scarpe', 'shoes']],
    pairs: [['scena', 'schena'], ['scala', 'sciala'], ['pesce', 'pesche'], ['sci', 'schi']],
  },
  {
    id: 'p4', title: 'GLI & GN', icon: 'GN',
    rule: `<p>Two sounds that English doesn't spell:</p>
<table><tr><td><b>gn</b></td><td>like “ny” in “ca<b>ny</b>on”</td><td><em>gnocchi, bagno, signora</em></td></tr>
<tr><td><b>gli</b></td><td>like “lli” in “mi<b>lli</b>on”, but with the tongue flat against the palate</td><td><em>figlio, famiglia, aglio</em></td></tr></table>
<p>The <b>g</b> is not pronounced separately in either one.</p>`,
    examples: [['bagno', 'bathroom'], ['signora', 'madam'], ['gnocchi', 'gnocchi'], ['lasagne', 'lasagna'], ['figlio', 'son'], ['famiglia', 'family'], ['aglio', 'garlic'], ['moglie', 'wife']],
    pairs: [['olio', 'oglio'], ['nono', 'gnomo'], ['figlio', 'filo'], ['sogno', 'sono']],
  },
  {
    id: 'p5', title: 'Double consonants', icon: 'TT',
    rule: `<p>Double consonants are <b>held longer</b> — and they change meaning! Pause slightly on the consonant, like “bookcase” vs “books”.</p>
<table><tr><td>pala (shovel)</td><td>pa<b>ll</b>a (ball)</td></tr>
<tr><td>caro (dear)</td><td>ca<b>rr</b>o (cart)</td></tr>
<tr><td>sete (thirst)</td><td>se<b>tt</b>e (seven)</td></tr>
<tr><td>nono (ninth)</td><td>no<b>nn</b>o (grandfather)</td></tr>
<tr><td>pena (pity)</td><td>pe<b>nn</b>a (pen)</td></tr></table>
<p>This is the #1 thing that makes foreigners sound foreign — exaggerate it at first!</p>`,
    examples: [['palla', 'ball'], ['nonno', 'grandfather'], ['sette', 'seven'], ['penna', 'pen'], ['mamma', 'mum'], ['cappuccino', 'cappuccino'], ['pizza', 'pizza'], ['tutto', 'everything']],
    pairs: [['pala', 'palla'], ['caro', 'carro'], ['sete', 'sette'], ['nono', 'nonno'], ['pena', 'penna'], ['capello', 'cappello']],
  },
  {
    id: 'p6', title: 'Z, S and the rolled R', icon: 'R',
    rule: `<p><b>z</b> is never like English “z”: it sounds like <b>ts</b> (<em>pizza, grazie</em>) or <b>dz</b> (<em>zero, zanzara</em>).</p>
<p><b>s</b> is usually “s” (<em>sole</em>), but between vowels often sounds like “z” (<em>rosa, casa</em> in the North).</p>
<p><b>r</b> is tapped or rolled with the tip of the tongue — like the “tt” in American “bu<b>tt</b>er”. <b>rr</b> is a longer roll: <em>terra, birra</em>.</p>`,
    examples: [['grazie', 'thank you'], ['zero', 'zero'], ['pizza', 'pizza'], ['ragazzo', 'boy'], ['rosa', 'rose'], ['sole', 'sun'], ['birra', 'beer'], ['treno', 'train']],
    pairs: [['caro', 'carro'], ['rosa', 'rossa'], ['pero', 'però'], ['mezzo', 'messo']],
  },
  {
    id: 'p7', title: 'Silent H & QU', icon: 'H',
    rule: `<p><b>h</b> is always <b>silent</b>. It only appears in <em>ch/gh</em> and in four forms of <em>avere</em>: <b>ho, hai, ha, hanno</b> (to tell them apart from <em>o</em> “or”, <em>ai</em> “to the”, <em>a</em> “to”, <em>anno</em> “year”).</p>
<p><b>qu</b> is always “kw”: <em>quando, quattro, acqua</em>. Italian has no “q” without “u”.</p>`,
    examples: [['ho', 'I have'], ['hanno', 'they have'], ['hotel', 'hotel'], ['quando', 'when'], ['quattro', 'four'], ['acqua', 'water'], ['questo', 'this'], ['qui', 'here']],
    pairs: [['hanno', 'anno'], ['ha', 'a'], ['ho', 'o'], ['quanto', 'canto']],
  },
  {
    id: 'p8', title: 'Accents & stress', icon: 'À',
    rule: `<p>Most words are stressed on the <b>second-to-last syllable</b>: <em>ra-GAZ-zo, pa-RO-la</em>.</p>
<p>When the stress falls on the <b>last</b> syllable, it is <b>written with an accent</b>: <em>città, perché, caffè, più, però</em>. The accent is part of the spelling!</p>
<p><b>è</b> (is) vs <b>e</b> (and) — <em>Lui è alto e simpatico.</em><br>
<b>è</b> = open “e” (as in “bed”), <b>é</b> = closed “e” (as in “they”) — mostly in <em>perché, benché</em>.</p>
<p>Can't type accents? Use the accent buttons under the input box.</p>`,
    examples: [['città', 'city'], ['perché', 'why / because'], ['caffè', 'coffee'], ['più', 'more'], ['però', 'but / however'], ['università', 'university'], ['lunedì', 'Monday'], ['tè', 'tea']],
    pairs: [['e', 'è'], ['papa', 'papà'], ['pero', 'però'], ['te', 'tè']],
  },
];

export const ITALIAN_ACCENTS = ['à', 'è', 'é', 'ì', 'ò', 'ù'];
