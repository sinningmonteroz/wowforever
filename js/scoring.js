/*
 * Motor de puntuación PvP / PvE.
 * score = 5.0 (base neutra) + Σ(need_peso × race_tag_valor) × ESCALA
 *         − 0.5 por cada "need crítico" (peso 3) que la raza deje en 0
 * Todo transparente y ajustable: cambia SCALE, PENALTY o los arquetipos en
 * data.js si crees que una combinación concreta debería puntuar distinto.
 *
 * A partir de la especialización: cada clase tiene 3 specs, y cada spec
 * tiene un perfil de PvP y otro de PvE (needs + critical + limitation)
 * calculados con el mismo motor de abajo, solo cambia qué perfil se le pasa.
 */

const SCALE = 0.25;
const CRITICAL_PENALTY = 0.5;

const TIERS = [
  { min: 7.4, id: 'S' },
  { min: 6.3, id: 'A' },
  { min: 5.3, id: 'B' },
  { min: 4.8, id: 'C' },
  { min: -Infinity, id: 'D' }
];

function getTier(score) {
  return TIERS.find((t) => score >= t.min).id;
}

const TIER_LABEL = {
  S: { es: 'Excelente', en: 'Excellent' },
  A: { es: 'Muy buena', en: 'Very good' },
  B: { es: 'Viable', en: 'Viable' },
  C: { es: 'Mejorable', en: 'Middling' },
  D: { es: 'Débil', en: 'Weak' }
};

const TAG_LABELS = {
  antiStun: { es: 'las cadenas de aturdimiento', en: 'stun-lock chains' },
  antiRoot: { es: 'que te enraícen o te kiteen', en: 'being rooted or kited' },
  antiFear: { es: 'el miedo', en: 'fear' },
  burstCooldown: { es: 'no tener una ventana de burst propia potente', en: 'lacking a strong burst window of its own' },
  manaRegen: { es: 'los apuros de maná en peleas largas', en: 'mana droughts in long fights' },
  sustain: { es: 'la falta de supervivencia extra', en: 'its lack of extra survivability' },
  weaponCrit: { es: 'la falta de crítico extra por arma', en: 'the lack of extra weapon-based crit' },
  hitChance: { es: 'los fallos por no llegar al tope de golpe', en: 'whiffs from missing the hit cap' }
};

function computeScore(race, profile) {
  let dot = 0;
  Object.entries(profile.needs).forEach(([tag, weight]) => {
    dot += weight * (race.tags[tag] || 0);
  });

  let score = 5 + dot * SCALE;

  (profile.critical || []).forEach((tag) => {
    if (!race.tags[tag]) score -= CRITICAL_PENALTY;
  });

  score = Math.max(1, Math.min(10, score));
  return Math.round(score * 10) / 10;
}

function topContributingRacials(race, profile, limit = 2) {
  return race.racials
    .map((r) => {
      let contribution = 0;
      Object.entries(r.tags).forEach(([tag, val]) => {
        contribution += (profile.needs[tag] || 0) * val;
      });
      return { racial: r, contribution };
    })
    .filter((x) => x.contribution > 0)
    .sort((a, b) => b.contribution - a.contribution)
    .slice(0, limit);
}

function buildReasoning(lang, profile, race, score, tier, rank, total) {
  const parts = [];

  const top = topContributingRacials(race, profile);
  if (top.length === 0) {
    parts.push(
      lang === 'es'
        ? 'Ninguna de sus raciales aporta algo realmente relevante para esta especialización: es una elección más estética o de rol que competitiva.'
        : "None of its racials bring anything particularly relevant to this spec — it's more of a flavor or roleplay pick than a competitive one."
    );
  } else {
    const joiner = lang === 'es' ? ' y ' : ' and ';
    const names = top.map((x) => `${x.racial.name[lang]} (${x.racial.desc[lang]})`).join(joiner);
    parts.push(
      (lang === 'es'
        ? 'Destaca sobre todo gracias a '
        : 'It stands out mainly thanks to ') + names + '.'
    );
  }

  const gaps = (profile.critical || []).filter((tag) => !race.tags[tag]);
  if (gaps.length) {
    const joiner = lang === 'es' ? ' ni ' : ' or ';
    const labels = gaps.map((tag) => (TAG_LABELS[tag] ? TAG_LABELS[tag][lang] : tag)).join(joiner);
    parts.push((lang === 'es' ? 'Eso sí, no soluciona ' : 'That said, it does nothing to solve ') + labels + '.');
  }

  const tierLabel = TIER_LABEL[tier][lang];
  parts.push(
    lang === 'es'
      ? `Puntuación: ${score.toFixed(1)}/10 (Tier ${tier} · ${tierLabel}) — puesto ${rank} de ${total} razas disponibles para esta clase.`
      : `Score: ${score.toFixed(1)}/10 (Tier ${tier} · ${tierLabel}) — ranked ${rank} of ${total} available races for this class.`
  );

  return parts.join(' ');
}

/**
 * Puntuación "global" de una combinación raza+clase para el Top 10 / Peores
 * 10 de la portada. En vez de promediar las 3 especializaciones (eso puede
 * hacer que una combo gane solo por ser mediocre-pero-pareja en las tres),
 * se usa la MEJOR spec en PvP de esa raza para el Top 10 y la PEOR spec para
 * el Peores 10. Así el número que ves en la portada es el mismo que verás si
 * entras a esa clase y seleccionas la spec indicada en "mejor/peor en".
 */
function getCombinationExtremes(raceId, classId) {
  const race = getRace(raceId);
  const cls = getClass(classId);

  let best = null;
  let worst = null;

  cls.specs.forEach((spec) => {
    const s = computeScore(race, spec.pvp);
    if (!best || s > best.score) best = { spec, score: s };
    if (!worst || s < worst.score) worst = { spec, score: s };
  });

  return { race, cls, isNew: isNewCombo(classId, raceId), best, worst };
}

function getAllCombinationExtremes() {
  const rows = [];
  Object.entries(COMBO_MATRIX).forEach(([classId, raceIds]) => {
    raceIds.forEach((raceId) => {
      rows.push(getCombinationExtremes(raceId, classId));
    });
  });
  return rows;
}

function getTopCombinations(n) {
  return getAllCombinationExtremes()
    .sort((a, b) => b.best.score - a.best.score)
    .slice(0, n)
    .map((row) => ({
      race: row.race,
      cls: row.cls,
      isNew: row.isNew,
      score: row.best.score,
      tier: getTier(row.best.score),
      specHint: row.best.spec
    }));
}

function getWorstCombinations(n) {
  return getAllCombinationExtremes()
    .sort((a, b) => a.worst.score - b.worst.score)
    .slice(0, n)
    .map((row) => ({
      race: row.race,
      cls: row.cls,
      isNew: row.isNew,
      score: row.worst.score,
      tier: getTier(row.worst.score),
      specHint: row.worst.spec
    }));
}

/**
 * classId: id de la clase
 * specId: id de la especialización (uno de cls.specs[].id)
 * mode: 'pvp' | 'pve'
 */
function getRankedRacesForSpec(classId, specId, mode, lang) {
  const cls = getClass(classId);
  const spec = cls.specs.find((s) => s.id === specId) || cls.specs[0];
  const profile = spec[mode];
  const raceIds = COMBO_MATRIX[classId] || [];

  const rows = raceIds.map((raceId) => {
    const race = getRace(raceId);
    const score = computeScore(race, profile);
    return { race, score, isNew: isNewCombo(classId, raceId) };
  });

  rows.sort((a, b) => b.score - a.score);

  const total = rows.length;
  return rows.map((row, idx) => {
    const rank = idx + 1;
    const tier = getTier(row.score);
    return {
      race: row.race,
      score: row.score,
      tier,
      isNew: row.isNew,
      rank,
      total,
      reasoning: buildReasoning(lang, profile, row.race, row.score, tier, rank, total)
    };
  });
}
