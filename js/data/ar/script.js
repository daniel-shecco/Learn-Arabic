// Arabic script course: letters grouped by shape family so each new letter
// differs from a known one by dots only. Every group ends with decodable
// words that use ONLY letters already taught (reading success from day one).

export const LETTERS = {
  'ا': { name: 'alif', ar: 'أَلِف', tr: 'ā / a', sound: 'Long “aa” as in “father”; also a seat for the glottal stop (hamza).', connects: false, ex: ['بَاب', 'bāb', 'door'], tip: 'One vertical stroke, written top to bottom. Never joins the letter after it.' },
  'ب': { name: 'bāʾ', ar: 'بَاء', tr: 'b', sound: '“b” as in “bed”.', connects: true, ex: ['بَيْت', 'bayt', 'house'], tip: 'A shallow boat from right to left, then one dot BELOW.' },
  'ت': { name: 'tāʾ', ar: 'تَاء', tr: 't', sound: '“t” as in “tea” (tongue touching the teeth).', connects: true, ex: ['تَمْر', 'tamr', 'dates'], tip: 'Same boat as ب, with two dots ABOVE.' },
  'ث': { name: 'thāʾ', ar: 'ثَاء', tr: 'th', sound: '“th” as in “think”.', connects: true, ex: ['ثَلْج', 'thalj', 'snow / ice'], tip: 'Same boat as ب, with three dots ABOVE (a little triangle).' },
  'ن': { name: 'nūn', ar: 'نُون', tr: 'n', sound: '“n” as in “noon”.', connects: true, ex: ['نُور', 'nūr', 'light'], tip: 'A deeper, rounder bowl than ب that dips below the line, one dot above.' },
  'ي': { name: 'yāʾ', ar: 'يَاء', tr: 'y / ī', sound: '“y” as in “yes”, or long “ee” as in “see”.', connects: true, ex: ['يَد', 'yad', 'hand'], tip: 'An “s”-like curve swinging back to the right, two dots below.' },
  'ج': { name: 'jīm', ar: 'جِيم', tr: 'j', sound: '“j” as in “jam” (“g” as in “go” in Egypt).', connects: true, ex: ['جَمَل', 'jamal', 'camel'], tip: 'A short stroke right-to-left, then a big curved belly; dot inside the belly.' },
  'ح': { name: 'ḥāʾ', ar: 'حَاء', tr: 'ḥ', sound: 'A strong breathy “h” from the throat — like fogging up a mirror, but tighter.', connects: true, ex: ['حُبّ', 'ḥubb', 'love'], tip: 'Same shape as ج but with NO dot.' },
  'خ': { name: 'khāʾ', ar: 'خَاء', tr: 'kh', sound: 'Rough “ch” as in Scottish “loch” or German “Bach”.', connects: true, ex: ['خُبْز', 'khubz', 'bread'], tip: 'Same shape as ح with one dot ABOVE.' },
  'د': { name: 'dāl', ar: 'دَال', tr: 'd', sound: '“d” as in “door”.', connects: false, ex: ['دَار', 'dār', 'home'], tip: 'A small angle sitting on the line. Never joins the next letter.' },
  'ذ': { name: 'dhāl', ar: 'ذَال', tr: 'dh', sound: '“th” as in “this” (voiced).', connects: false, ex: ['ذَهَب', 'dhahab', 'gold'], tip: 'Same as د with one dot above.' },
  'ر': { name: 'rāʾ', ar: 'رَاء', tr: 'r', sound: 'A tapped or rolled “r” as in Spanish or Italian.', connects: false, ex: ['رَمْل', 'raml', 'sand'], tip: 'A short curve that drops BELOW the line. Never joins the next letter.' },
  'ز': { name: 'zāy', ar: 'زَاي', tr: 'z', sound: '“z” as in “zoo”.', connects: false, ex: ['زَيْت', 'zayt', 'oil'], tip: 'Same as ر with one dot above.' },
  'و': { name: 'wāw', ar: 'وَاو', tr: 'w / ū', sound: '“w” as in “water”, or long “oo” as in “moon”.', connects: false, ex: ['وَرْد', 'ward', 'roses'], tip: 'A small loop on the line with a tail curving down below. Never joins the next letter.' },
  'س': { name: 'sīn', ar: 'سِين', tr: 's', sound: '“s” as in “sun”.', connects: true, ex: ['سَمَك', 'samak', 'fish'], tip: 'Three little teeth, then a bowl like ن (without the dot).' },
  'ش': { name: 'shīn', ar: 'شِين', tr: 'sh', sound: '“sh” as in “shoe”.', connects: true, ex: ['شَمْس', 'shams', 'sun'], tip: 'Same as س with three dots above.' },
  'ص': { name: 'ṣād', ar: 'صَاد', tr: 'ṣ', sound: 'A “heavy” s: tongue low, back of the tongue raised. Makes vowels sound darker.', connects: true, ex: ['صَبَاح', 'ṣabāḥ', 'morning'], tip: 'A flat oval loop, a tiny tooth, then the bowl.' },
  'ض': { name: 'ḍād', ar: 'ضَاد', tr: 'ḍ', sound: 'A “heavy” d. Arabic is called “the language of ḍād” because this sound is so rare!', connects: true, ex: ['ضَيْف', 'ḍayf', 'guest'], tip: 'Same as ص with one dot above.' },
  'ط': { name: 'ṭāʾ', ar: 'طَاء', tr: 'ṭ', sound: 'A “heavy” t.', connects: true, ex: ['طَبِيب', 'ṭabīb', 'doctor'], tip: 'A flat oval loop with a tall vertical stroke added last.' },
  'ظ': { name: 'ẓāʾ', ar: 'ظَاء', tr: 'ẓ', sound: 'A “heavy” th as in “this”.', connects: true, ex: ['ظُهْر', 'ẓuhr', 'noon'], tip: 'Same as ط with one dot to the right of the stroke.' },
  'ع': { name: 'ʿayn', ar: 'عَيْن', tr: 'ʿ', sound: 'A squeezed sound from deep in the throat — no English equivalent. Try saying “ah” while tightening your throat.', connects: true, ex: ['عَيْن', 'ʿayn', 'eye'], tip: 'An open “c” shape on top, then a big tail curve below.' },
  'غ': { name: 'ghayn', ar: 'غَيْن', tr: 'gh', sound: 'A gargled “r” like French “Paris”.', connects: true, ex: ['غُرْفَة', 'ghurfa', 'room'], tip: 'Same as ع with one dot above.' },
  'ف': { name: 'fāʾ', ar: 'فَاء', tr: 'f', sound: '“f” as in “fish”.', connects: true, ex: ['فِيل', 'fīl', 'elephant'], tip: 'A small round head with a flat tail, one dot above.' },
  'ق': { name: 'qāf', ar: 'قَاف', tr: 'q', sound: 'A “k” made further back, at the uvula.', connects: true, ex: ['قَلَم', 'qalam', 'pen'], tip: 'A round head with a deep round tail, two dots above.' },
  'ك': { name: 'kāf', ar: 'كَاف', tr: 'k', sound: '“k” as in “king”.', connects: true, ex: ['كِتَاب', 'kitāb', 'book'], tip: 'A tall stroke with a flat base and a small “hamza-like” squiggle inside.' },
  'ل': { name: 'lām', ar: 'لَام', tr: 'l', sound: '“l” as in “lemon”.', connects: true, ex: ['لَيْل', 'layl', 'night'], tip: 'A tall stroke like alif that curves into a bowl below the line.' },
  'م': { name: 'mīm', ar: 'مِيم', tr: 'm', sound: '“m” as in “moon”.', connects: true, ex: ['مَاء', 'māʾ', 'water'], tip: 'A small round loop with a tail dropping straight down.' },
  'ه': { name: 'hāʾ', ar: 'هَاء', tr: 'h', sound: 'A light “h” as in “hello” — even at the end of a word.', connects: true, ex: ['هِلَال', 'hilāl', 'crescent'], tip: 'Changes a lot: a loop when alone (ه), “two eyes” at the start (هـ).' },
  'ة': { name: 'tāʾ marbūṭa', ar: 'تَاء مَرْبُوطَة', tr: '-a / -at', sound: 'Pronounced “a” at the end of a word (“at” when another word follows closely). Marks most feminine nouns.', connects: false, ex: ['مَدْرَسَة', 'madrasa', 'school'], tip: 'A ه with the two dots of ت on top. Only appears at the END of words.', final: true },
  'ء': { name: 'hamza', ar: 'هَمْزَة', tr: 'ʾ', sound: 'A glottal stop — the catch in your throat in “uh-oh”.', connects: false, ex: ['سَمَاء', 'samāʾ', 'sky'], tip: 'A small “c”-like squiggle. It often sits on a “seat”: أ إ ؤ ئ.', standalone: true },
  'ى': { name: 'alif maqṣūra', ar: 'أَلِف مَقْصُورَة', tr: 'ā', sound: 'A long “aa” at the end of a word.', connects: false, ex: ['مُسْتَشْفَى', 'mustashfā', 'hospital'], tip: 'Looks like ي without dots. Only appears at the END of words.', final: true },
};

export const VOWELS = [
  { id: 'fatha', mark: 'َ', name: 'fatḥa', ar: 'فَتْحَة', tr: 'a', desc: 'A small slash ABOVE the letter = short “a”.', sample: 'بَ', sampleTr: 'ba' },
  { id: 'kasra', mark: 'ِ', name: 'kasra', ar: 'كَسْرَة', tr: 'i', desc: 'A small slash BELOW the letter = short “i”.', sample: 'بِ', sampleTr: 'bi' },
  { id: 'damma', mark: 'ُ', name: 'ḍamma', ar: 'ضَمَّة', tr: 'u', desc: 'A tiny wāw ABOVE the letter = short “u”.', sample: 'بُ', sampleTr: 'bu' },
  { id: 'sukun', mark: 'ْ', name: 'sukūn', ar: 'سُكُون', tr: '∅', desc: 'A small circle ABOVE = no vowel: the consonant closes the syllable.', sample: 'بَنْت', sampleTr: 'bant' },
  { id: 'shadda', mark: 'ّ', name: 'shadda', ar: 'شَدَّة', tr: 'double', desc: 'A small “w” ABOVE = the consonant is doubled (held longer).', sample: 'جَدّ', sampleTr: 'jadd' },
  { id: 'tanween', mark: 'ً', name: 'tanwīn', ar: 'تَنْوِين', tr: '-an / -in / -un', desc: 'A doubled vowel mark at the end of a word adds “n”: ـًا -an, ـٍ -in, ـٌ -un. It marks an indefinite word (“a …”).', sample: 'كِتَابٌ', sampleTr: 'kitābun' },
];

// Lessons. `letters` are introduced; `vowels` are introduced; `syllables` and `words` are read.
export const SCRIPT_GROUPS = [
  {
    id: 's1', title: 'First letters & short vowels', icon: 'ب',
    intro: 'Arabic is written right-to-left, and most letters join to the next one. Short vowels are small marks above or below the letter. Beginner texts (like this course) always show them.',
    letters: ['ا', 'ب', 'ت', 'ث'], vowels: ['fatha', 'kasra', 'damma'],
    syllables: [['بَ', 'ba'], ['بِ', 'bi'], ['بُ', 'bu'], ['تَ', 'ta'], ['تِ', 'ti'], ['ثُ', 'thu'], ['بَا', 'bā'], ['تَا', 'tā']],
    words: [['بَاب', 'bāb', 'door'], ['تَابَ', 'tāba', 'he repented'], ['ثَبَتَ', 'thabata', 'it stood firm']],
  },
  {
    id: 's2', title: 'Nūn, yāʾ & sukūn', icon: 'ن',
    intro: 'ي does double duty: a consonant “y” or a long “ī”. The sukūn ( ْ ) means “no vowel here”.',
    letters: ['ن', 'ي'], vowels: ['sukun'],
    syllables: [['نَ', 'na'], ['نِي', 'nī'], ['يَ', 'ya'], ['بِي', 'bī'], ['بَيْ', 'bay'], ['تِين', 'tīn']],
    words: [['بَيْت', 'bayt', 'house'], ['بِنْت', 'bint', 'girl'], ['تِين', 'tīn', 'figs'], ['بَنَات', 'banāt', 'girls'], ['نَبَات', 'nabāt', 'plant']],
  },
  {
    id: 's3', title: 'The “cup” family: ج ح خ', icon: 'ج',
    intro: 'Three letters, one shape — only the dot changes. ح is a sound English doesn\'t have: whisper a strong “h” from the throat.',
    letters: ['ج', 'ح', 'خ'], vowels: [],
    syllables: [['جَا', 'jā'], ['حَا', 'ḥā'], ['خَا', 'khā'], ['حِي', 'ḥī'], ['خِي', 'khī']],
    words: [['تَاج', 'tāj', 'crown'], ['جَيْب', 'jayb', 'pocket'], ['بَحْث', 'baḥth', 'research'], ['نَجَاح', 'najāḥ', 'success'], ['جَنَاح', 'janāḥ', 'wing']],
  },
  {
    id: 's4', title: 'Non-connectors: د ذ ر ز', icon: 'د',
    intro: 'Six letters (ا د ذ ر ز و) never join to the letter AFTER them. That\'s why you see little gaps inside words.',
    letters: ['د', 'ذ', 'ر', 'ز'], vowels: [],
    syllables: [['دَا', 'dā'], ['ذِي', 'dhī'], ['رَا', 'rā'], ['زَيْ', 'zay']],
    words: [['خُبْز', 'khubz', 'bread'], ['زَيْت', 'zayt', 'oil'], ['بَرْد', 'bard', 'cold'], ['دَجَاج', 'dajāj', 'chicken'], ['رِيح', 'rīḥ', 'wind'], ['ذَنْب', 'dhanb', 'fault']],
  },
  {
    id: 's5', title: 'Wāw, long vowels & shadda', icon: 'و',
    intro: 'Long vowels use letters: ا = ā, و = ū, ي = ī. The shadda ( ّ ) doubles a consonant.',
    letters: ['و'], vowels: ['shadda'],
    syllables: [['وَ', 'wa'], ['بُو', 'bū'], ['نُو', 'nū'], ['بَّ', 'bba']],
    words: [['نُور', 'nūr', 'light'], ['وَرْد', 'ward', 'roses'], ['زَوْج', 'zawj', 'husband'], ['ثَوْب', 'thawb', 'garment'], ['حُوت', 'ḥūt', 'whale'], ['جَدّ', 'jadd', 'grandfather'], ['بُنّ', 'bunn', 'coffee beans']],
  },
  {
    id: 's6', title: 'Teeth & loops: س ش ص ض', icon: 'س',
    intro: 'ص and ض are “emphatic” — pronounced with the back of the tongue raised, giving a deep, dark sound.',
    letters: ['س', 'ش', 'ص', 'ض'], vowels: [],
    syllables: [['سَا', 'sā'], ['شِي', 'shī'], ['صَا', 'ṣā'], ['ضُو', 'ḍū']],
    words: [['سَرِير', 'sarīr', 'bed'], ['شَيْخ', 'shaykh', 'elder'], ['صَوْت', 'ṣawt', 'voice'], ['حِسَاب', 'ḥisāb', 'account / bill'], ['ضِرْس', 'ḍirs', 'molar tooth']],
  },
  {
    id: 's7', title: 'ط ظ ع غ', icon: 'ع',
    intro: 'ع (ʿayn) is the most famous Arabic sound. Don\'t worry about perfection — listen and imitate a lot.',
    letters: ['ط', 'ظ', 'ع', 'غ'], vowels: [],
    syllables: [['طَا', 'ṭā'], ['ظِي', 'ẓī'], ['عَا', 'ʿā'], ['غُو', 'ghū']],
    words: [['طَبِيب', 'ṭabīb', 'doctor'], ['عَيْن', 'ʿayn', 'eye'], ['غُبَار', 'ghubār', 'dust'], ['حَظّ', 'ḥaẓẓ', 'luck'], ['عَرَبِيّ', 'ʿarabiyy', 'Arabic / Arab']],
  },
  {
    id: 's8', title: 'ف ق ك ل', icon: 'ك',
    intro: 'ق is a “k” from far back in the throat. Compare قَلْب (qalb, heart) with كَلْب (kalb, dog) — the difference matters!',
    letters: ['ف', 'ق', 'ك', 'ل'], vowels: [],
    syllables: [['فَا', 'fā'], ['قِي', 'qī'], ['كُو', 'kū'], ['لَا', 'lā']],
    words: [['فِيل', 'fīl', 'elephant'], ['قَلْب', 'qalb', 'heart'], ['كَلْب', 'kalb', 'dog'], ['كِتَاب', 'kitāb', 'book'], ['لَيْل', 'layl', 'night'], ['صَدِيق', 'ṣadīq', 'friend']],
  },
  {
    id: 's9', title: 'م ه & tanwīn', icon: 'م',
    intro: 'ه changes shape a lot depending on its position. Tanwīn (doubled vowel marks) adds an “n” and means “a/an”.',
    letters: ['م', 'ه'], vowels: ['tanween'],
    syllables: [['مَا', 'mā'], ['مِي', 'mī'], ['هُو', 'hū'], ['هَا', 'hā']],
    words: [['شَمْس', 'shams', 'sun'], ['قَمَر', 'qamar', 'moon'], ['هُوَ', 'huwa', 'he'], ['هِيَ', 'hiya', 'she'], ['يَوْم', 'yawm', 'day'], ['كِتَابٌ', 'kitābun', 'a book']],
  },
  {
    id: 's10', title: 'Special letters & “the”', icon: 'ة',
    intro: 'ة marks feminine nouns, ء is a glottal stop, ى is a final “ā”. And الـ (al-) means “the” — before a sun letter, the ل goes silent and the next letter doubles.',
    letters: ['ة', 'ء', 'ى'], vowels: [],
    syllables: [['لَا', 'lā'], ['ـَة', '-a'], ['اءَ', 'āʾa']],
    words: [['مَدْرَسَة', 'madrasa', 'school'], ['سَمَاء', 'samāʾ', 'sky'], ['مُسْتَشْفَى', 'mustashfā', 'hospital'], ['الْقَمَر', 'al-qamar', 'the moon'], ['الشَّمْس', 'ash-shams', 'the sun'], ['سَيَّارَة', 'sayyāra', 'car'], ['السَّلَامُ عَلَيْكُمْ', 'as-salāmu ʿalaykum', 'peace be upon you']],
  },
];

/** All letters introduced up to and including group index `gi`. */
export function lettersUpTo(gi) {
  return SCRIPT_GROUPS.slice(0, gi + 1).flatMap((g) => g.letters);
}
