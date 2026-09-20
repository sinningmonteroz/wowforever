const UI_TEXT = {
  siteTitle: { es: 'WoW Forever · Puntos de Raza/Clase PvP', en: 'WoW Forever · Race/Class PvP Scores' },
  tagline: {
    es: 'Elige tu clase y descubre qué raza saca más partido en PvP, combo por combo — incluyendo las nuevas combinaciones y los Célicos de la beta.',
    en: 'Pick your class and see which race gets the most out of it in PvP, combo by combo — including the new combinations and the beta Skyborne.'
  },
  chooseClass: { es: '¿Qué clase quieres jugar?', en: 'Which class do you want to play?' },
  changeClass: { es: 'Cambiar de clase', en: 'Change class' },
  rankingTitle: { es: 'Ranking de razas para', en: 'Race ranking for' },
  rankingSubtitle: {
    es: 'De mejor a peor opción en PvP con los raciales actuales de la beta.',
    en: 'From best to worst PvP option with the current beta racials.'
  },
  newBadge: { es: 'COMBO NUEVA', en: 'NEW COMBO' },
  scoreLabel: { es: 'Puntuación', en: 'Score' },
  tierLabel: { es: 'Tier', en: 'Tier' },
  rankOf: { es: 'de', en: 'of' },
  factionAlliance: { es: 'Alianza', en: 'Alliance' },
  factionHorde: { es: 'Horda', en: 'Horde' },
  methodologyTitle: { es: '¿Cómo se calcula la puntuación?', en: 'How is the score calculated?' },
  methodologyText: {
    es: 'Cada clase tiene una lista de "necesidades" de PvP (anti-aturdimiento, anti-raíz, ventanas de burst, maná, etc.) con un peso del 0 al 3. Cada raza aporta esos mismos tags según sus raciales reales de la beta. La puntuación parte de una base neutra de 5/10 y sube o baja según cuánto encajen los raciales de la raza con las carencias reales de la clase; si una necesidad de peso máximo (3) queda completamente sin cubrir, se aplica una penalización. El resultado no es un dato oficial de Blizzard: es un modelo de análisis propio, pensado para razonar sobre PvP, no una verdad absoluta.',
    en: 'Every class has a list of PvP "needs" (anti-stun, anti-root, burst windows, mana, etc.) weighted 0-3. Every race contributes those same tags based on its actual beta racials. The score starts from a neutral 5/10 base and moves up or down depending on how well the race\'s racials match the class\'s real weaknesses; if a maximum-weight (3) need is left completely uncovered, a penalty is applied. This isn\'t official Blizzard data — it\'s an in-house analysis model meant to reason about PvP, not an absolute truth.'
  },
  sourceNote: {
    es: 'Datos de raciales y combinaciones basados en el anuncio oficial de World of Warcraft: Forever (BlizzCon 2026) y en la beta abierta el 17 de septiembre de 2026. Los valores pueden cambiar antes del lanzamiento final (4 de noviembre de 2026).',
    en: 'Racial and combination data based on the official World of Warcraft: Forever announcement (BlizzCon 2026) and the beta that opened on September 17, 2026. Values may change before the final launch (November 4, 2026).'
  },
  skyborneNote: {
    es: 'Los Célicos son una raza neutral: eliges bando al crear el personaje. Aquí se muestran por separado (Alto Orden / Portavientos) porque cada bando les da un abanico de clases distinto.',
    en: 'The Skyborne are a neutral race: you pick a side when you create the character. They\'re shown separately here (High Order / Windborne) because each side grants them a different class lineup.'
  },
  langToggle: { es: 'EN', en: 'ES' },
  modePvp: { es: '⚔️ PvP', en: '⚔️ PvP' },
  modePve: { es: '🛡️ PvE (banda/mazmorra)', en: '🛡️ PvE (raid/dungeon)' },
  pveDisclaimer: {
    es: 'El modo PvE todavía no tiene un meta propio de Forever, así que se calcula con la lógica clásica de vanilla: tope de golpe, crítico/arma y maná sostenido en peleas largas, aplicada a los raciales reales de la beta.',
    en: "PvE mode doesn't have its own established Forever meta yet, so it's calculated with classic vanilla logic — hit cap, weapon crit and sustained mana in long fights — applied to the beta's real racials."
  },
  bestPick: { es: 'Mejor elección', en: 'Best pick' },
  worstPick: { es: 'Opción más floja', en: 'Weakest pick' },
  availableClasses: { es: 'combinaciones disponibles', en: 'available combinations' },
  goodAgainst: { es: 'Bueno contra', en: 'Good against' },
  badAgainst: { es: 'Débil contra', en: 'Weak against' },
  noStrength: { es: 'sin una fortaleza clara marcada', en: 'no clearly marked strength' },
  noWeakness: { es: 'sin una debilidad clara marcada', en: 'no clearly marked weakness' },
  matchupDisclaimer: {
    es: 'Según el meta de duelos 1c1 del Classic original — no tiene en cuenta objeto, nivel de juego ni la especialización exacta del rival.',
    en: "Based on the original Classic 1v1 dueling meta — doesn't account for gear, skill level, or the opponent's exact spec."
  },
  topTenTitle: { es: 'Top 10 mejores combinaciones', en: 'Top 10 best combinations' },
  worstTenTitle: { es: 'Top 10 peores combinaciones', en: 'Top 10 worst combinations' },
  combosNote: {
    es: 'El Top 10 usa la mejor especialización en PvP de cada raza+clase; el Peores 10 usa la peor. El número coincide con el que verás al entrar en esa clase y elegir esa spec.',
    en: 'The Top 10 uses each race+class pair\'s best PvP spec; the Worst 10 uses its worst. The number matches what you\'ll see entering that class and picking that spec.'
  },
  bestInSpec: { es: 'mejor en', en: 'best in' },
  worstInSpec: { es: 'peor en', en: 'worst in' }
};

const LANG_KEY = 'wowforever_lang';

function detectLang() {
  const saved = localStorage.getItem(LANG_KEY);
  if (saved === 'es' || saved === 'en') return saved;
  const nav = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return nav.startsWith('es') ? 'es' : 'en';
}

function saveLang(lang) {
  localStorage.setItem(LANG_KEY, lang);
}

function t(key, lang) {
  const entry = UI_TEXT[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}
