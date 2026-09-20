/*
 * Base de datos local (WoW Forever - Classic+, beta 2026-09-17)
 * Fuente de los raciales y de la matriz de combinaciones: anuncio oficial de
 * Blizzard en BlizzCon 2026 y guías de la beta (ver README / footer de la web).
 * Los valores numéricos de los raciales son los de la beta y pueden cambiar.
 */

// ---------------------------------------------------------------------------
// RAZAS
// Cada racial lleva "tags" con su peso de utilidad PvP (0-3). Esos tags son
// los que usa el motor de puntuación (scoring.js) para comparar con las
// necesidades de cada clase.
// ---------------------------------------------------------------------------

const RACES = [
  {
    id: 'human',
    faction: 'alliance',
    icon: '👤',
    name: { es: 'Humano', en: 'Human' },
    racials: [
      {
        name: { es: 'Cada Uno por Su Cuenta', en: 'Every Man for Himself' },
        type: 'active',
        desc: {
          es: 'Elimina todos los efectos de aturdimiento activos sobre ti.',
          en: 'Removes all stun effects currently on you.'
        },
        tags: { antiStun: 3 }
      },
      {
        name: { es: 'Percepción', en: 'Perception' },
        type: 'active',
        desc: {
          es: 'Te permite detectar enemigos sigilosos durante 20 seg.',
          en: 'Lets you detect stealthed enemies for 20 sec.'
        },
        tags: { stealthDetect: 1 }
      },
      {
        name: { es: 'Especialización en Espadas', en: 'Sword Specialization' },
        type: 'passive',
        desc: {
          es: 'Las espadas aumentan un 2% tu probabilidad de golpe crítico con hechizos y habilidades.',
          en: 'Swords increase your spell and ability critical strike chance by 2%.'
        },
        tags: { weaponCrit: 1 }
      },
      {
        name: { es: 'Espíritu Humano', en: 'The Human Spirit' },
        type: 'passive',
        desc: { es: 'Aumenta tu Espíritu un 5%.', en: 'Increases Spirit by 5%.' },
        tags: { manaRegen: 1 }
      }
    ]
  },
  {
    id: 'dwarf',
    faction: 'alliance',
    icon: '⛏️',
    name: { es: 'Enano', en: 'Dwarf' },
    racials: [
      {
        name: { es: 'Forma de Piedra', en: 'Stoneform' },
        type: 'active',
        desc: {
          es: 'Inmunidad a sangrado, veneno y enfermedad, y reduce el daño físico recibido durante 8 seg.',
          en: 'Grants immunity to bleed, poison and disease effects and reduces physical damage taken for 8 sec.'
        },
        tags: { antiPhysicalBurst: 3, sustain: 1 }
      },
      {
        name: { es: 'Buscar Tesoro', en: 'Find Treasure' },
        type: 'active',
        desc: { es: 'Detecta cofres del tesoro cercanos.', en: 'Lets you track nearby treasure chests.' },
        tags: {}
      },
      {
        name: { es: 'Especialización en Mazas', en: 'Mace Specialization' },
        type: 'passive',
        desc: {
          es: 'Las mazas aumentan un 1% tu probabilidad de golpe crítico con hechizos y habilidades.',
          en: 'Maces increase your spell and ability critical strike chance by 1%.'
        },
        tags: { weaponCrit: 1 }
      },
      {
        name: { es: 'Cazador de Grandes Bestias', en: 'Big Game Hunter' },
        type: 'passive',
        desc: { es: 'Aumenta un 5% el daño hecho a bestias.', en: 'Increases damage dealt to beasts by 5%.' },
        tags: {}
      }
    ]
  },
  {
    id: 'nightelf',
    faction: 'alliance',
    icon: '🌙',
    name: { es: 'Elfo de la Noche', en: 'Night Elf' },
    racials: [
      {
        name: { es: 'Luz de Elune', en: "Elune's Light" },
        type: 'active',
        desc: {
          es: 'Aumenta tu probabilidad de golpe crítico un 10% durante 15 seg.',
          en: 'Increases your critical strike chance by 10% for 15 sec.'
        },
        tags: { burstCooldown: 2 }
      },
      {
        name: { es: 'Sigilo de las Sombras', en: 'Shadowmeld' },
        type: 'active',
        desc: {
          es: 'Te ocultas entre las sombras mientras permaneces inmóvil.',
          en: 'Lets you slip into the shadows while you remain stationary.'
        },
        tags: { escapeUtility: 2 }
      },
      {
        name: { es: 'Agilidad', en: 'Quickness' },
        type: 'passive',
        desc: {
          es: 'Aumenta un 1% tu probabilidad de esquivar y un 2% tu velocidad de movimiento.',
          en: 'Increases your dodge chance by 1% and your movement speed by 2%.'
        },
        tags: { mobility: 2 }
      },
      {
        name: { es: 'Espíritu Feérico', en: 'Wisp Spirit' },
        type: 'passive',
        desc: {
          es: 'Aumenta un 75% tu velocidad de movimiento tras morir.',
          en: 'Increases movement speed after death by 75%.'
        },
        tags: {}
      }
    ]
  },
  {
    id: 'gnome',
    faction: 'alliance',
    icon: '⚙️',
    name: { es: 'Gnomo', en: 'Gnome' },
    racials: [
      {
        name: { es: 'Artista del Escape', en: 'Escape Artist' },
        type: 'active',
        desc: {
          es: 'Te concede inmunidad breve a efectos de raíz y ralentización.',
          en: 'Briefly grants immunity to root and slow effects.'
        },
        tags: { antiRoot: 3 }
      },
      {
        name: { es: '¡Eureka!', en: 'Eureka!' },
        type: 'active',
        desc: {
          es: 'Reduce el coste y aumenta un 10% el daño o la sanación de tus próximos 3 hechizos o habilidades.',
          en: 'Reduces the cost and increases the damage or healing of your next 3 spells or abilities by 10%.'
        },
        tags: { burstCooldown: 2 }
      },
      {
        name: { es: 'Mente Expansiva', en: 'Expansive Mind' },
        type: 'passive',
        desc: {
          es: 'Aumenta un 5% tu maná, furia o energía máximos.',
          en: 'Increases your maximum mana, rage or energy by 5%.'
        },
        tags: { manaRegen: 1, sustain: 1 }
      },
      {
        name: { es: 'Especialización en Ingeniería', en: 'Engineering Specialization' },
        type: 'passive',
        desc: {
          es: 'Los artefactos de ingeniería se activan de forma más fiable.',
          en: 'Engineering devices trigger more reliably.'
        },
        tags: {}
      }
    ]
  },
  {
    id: 'skyborne_alliance',
    faction: 'alliance',
    icon: '🕊️',
    name: { es: 'Célico (Alto Orden)', en: 'Skyborne (High Order)' },
    isSkyborne: true,
    racials: [
      {
        name: { es: 'Caminar en el Aire', en: 'Walk on Air' },
        type: 'active',
        desc: { es: 'Planeas hacia abajo durante 10 seg.', en: 'Lets you glide downward through the air for 10 sec.' },
        tags: { mobility: 0.5 }
      },
      {
        name: { es: 'Leer Línea Ley', en: 'Read Ley Line' },
        type: 'active',
        desc: {
          es: 'Activa una línea ley cercana, duplicando tu regeneración de vida y maná.',
          en: 'Activates a ley line, increasing health and mana regeneration by 100%.'
        },
        tags: { manaRegen: 2 }
      },
      {
        name: { es: 'Bendecido por el Viento', en: 'Wind Blessed' },
        type: 'passive',
        desc: {
          es: 'Aumenta un 1% tu velocidad de ataque, distancia y lanzamiento.',
          en: 'Increases your melee, ranged and spell haste by 1%.'
        },
        tags: { hasteBoost: 1 }
      },
      {
        name: { es: 'Perspicacia Elemental', en: 'Elemental Insight' },
        type: 'passive',
        desc: { es: 'Aumenta un 5% el daño hecho a elementales.', en: 'Increases damage dealt to elementals by 5%.' },
        tags: {}
      }
    ]
  },
  {
    id: 'orc',
    faction: 'horde',
    icon: '💪',
    name: { es: 'Orco', en: 'Orc' },
    racials: [
      {
        name: { es: 'Furia Sangrienta', en: 'Blood Fury' },
        type: 'active',
        desc: {
          es: 'Aumenta un 10% tu poder de ataque y tu poder de hechizos durante 15 seg.',
          en: 'Increases your attack power and spell power by 10% for 15 sec.'
        },
        tags: { burstCooldown: 3 }
      },
      {
        name: { es: 'Ruptura de Maldiciones', en: 'Curse Breaking' },
        type: 'active',
        desc: {
          es: 'Inmunidad a maldiciones y aflicciones, y reduce el daño mágico recibido durante 8 seg.',
          en: 'Grants immunity to curses and afflictions and reduces magic damage taken for 8 sec.'
        },
        tags: { antiMagicBurst: 2 }
      },
      {
        name: { es: 'Especialización en Hachas', en: 'Axe Specialization' },
        type: 'passive',
        desc: {
          es: 'Las hachas aumentan un 1% tu probabilidad de golpe crítico con hechizos y habilidades.',
          en: 'Axes increase your spell and ability critical strike chance by 1%.'
        },
        tags: { weaponCrit: 1 }
      },
      {
        name: { es: 'Robustez', en: 'Hardiness' },
        type: 'passive',
        desc: { es: 'Reduce un 20% la duración de los efectos de aturdimiento.', en: 'Reduces the duration of stun effects by 20%.' },
        tags: { antiStun: 2 }
      }
    ]
  },
  {
    id: 'undead',
    faction: 'horde',
    icon: '☠️',
    name: { es: 'No-Muerto', en: 'Undead' },
    racials: [
      {
        name: { es: 'Voluntad de los Renegados', en: 'Will of the Forsaken' },
        type: 'active',
        desc: {
          es: 'Elimina los efectos de dominación mental, miedo y sueño. Comparte reutilización de 45 seg con hechizos similares.',
          en: 'Dispels Charm, Fear and Sleep effects. Shares a 45-second cooldown with other similar spells.'
        },
        tags: { antiFear: 3 }
      },
      {
        name: { es: 'Canibalizar', en: 'Cannibalize' },
        type: 'active',
        desc: {
          es: 'Restaura un 7% de tu vida y maná totales cada 2 seg durante 10 seg. Solo funciona sobre cadáveres humanoides o no-muertos a 5 m.',
          en: 'Restores 7% of your total health and mana every 2 sec for 10 sec. Works only on Humanoid and Undead corpses within 5 yd.'
        },
        tags: { sustain: 1 }
      },
      {
        name: { es: 'Respiración Subacuática', en: 'Underwater Breathing' },
        type: 'passive',
        desc: { es: 'Aguantas un 300% más de tiempo bajo el agua.', en: 'Lets you stay underwater 300% longer.' },
        tags: {}
      },
      {
        name: { es: 'Toque de la Tumba', en: 'Touch of the Grave' },
        type: 'passive',
        desc: {
          es: 'Tus ataques y hechizos tienen un 5% de probabilidad de drenar vida del objetivo, restaurando hasta un 5% de tu vida máxima.',
          en: 'Your attacks and spells have a 5% chance to drain health from the target, restoring up to 5% of your maximum health.'
        },
        tags: {}
      }
    ]
  },
  {
    id: 'tauren',
    faction: 'horde',
    icon: '🐂',
    name: { es: 'Tauren', en: 'Tauren' },
    racials: [
      {
        name: { es: 'Pisotón de Guerra', en: 'War Stomp' },
        type: 'active',
        desc: { es: 'Aturde a los enemigos a tu alrededor durante 2 seg.', en: 'Stuns enemies around you for 2 sec.' },
        tags: { openerStun: 2 }
      },
      {
        name: { es: 'Cultivo', en: 'Cultivation' },
        type: 'active',
        desc: {
          es: 'Hace crecer hierbas adicionales que no requieren habilidad de Herboristería para recolectarse.',
          en: 'Grows additional herbs that require no Herbalism skill to gather.'
        },
        tags: {}
      },
      {
        name: { es: 'Correr las Llanuras', en: 'Plainsrunning' },
        type: 'passive',
        desc: {
          es: 'Cuanto más tiempo llevas en movimiento, mayor es tu velocidad de movimiento.',
          en: 'The longer you stay in motion, the higher your movement speed becomes.'
        },
        tags: { mobility: 2 }
      },
      {
        name: { es: 'Resistencia', en: 'Endurance' },
        type: 'passive',
        desc: {
          es: 'Aumenta un 5% tu vida total y un 1% tu probabilidad de golpear.',
          en: 'Increases your total health by 5% and your hit chance by 1%.'
        },
        tags: { sustain: 2, hitChance: 1 }
      }
    ]
  },
  {
    id: 'troll',
    faction: 'horde',
    icon: '🗿',
    name: { es: 'Troll', en: 'Troll' },
    racials: [
      {
        name: { es: 'Berserking', en: 'Berserking' },
        type: 'active',
        desc: {
          es: 'Aumenta un 10% tu velocidad de lanzamiento y de ataque durante 10 seg.',
          en: 'Increases your spell casting speed and attack speed by 10% for 10 sec.'
        },
        tags: { burstCooldown: 3 }
      },
      {
        name: { es: 'Regeneración Rápida', en: 'Fast Regeneration' },
        type: 'active',
        desc: {
          es: 'Restaura un 50% de tu vida máxima en un corto periodo de tiempo.',
          en: 'Restores 50% of your maximum health over a short duration.'
        },
        tags: { sustain: 3 }
      },
      {
        name: { es: 'Cazador de Bestias', en: 'Beast Slaying' },
        type: 'passive',
        desc: { es: 'Aumenta un 5% el daño hecho a bestias.', en: 'Increases damage dealt to beasts by 5%.' },
        tags: {}
      },
      {
        name: { es: 'Regeneración', en: 'Regeneration' },
        type: 'passive',
        desc: {
          es: 'Un 10% de tu regeneración de vida sigue activa en combate.',
          en: '10% of your health regeneration continues while in combat.'
        },
        tags: { manaRegen: 1 }
      }
    ]
  },
  {
    id: 'skyborne_horde',
    faction: 'horde',
    icon: '🕊️',
    name: { es: 'Célico (Portavientos)', en: 'Skyborne (Windborne)' },
    isSkyborne: true,
    racials: [
      {
        name: { es: 'Caminar en el Aire', en: 'Walk on Air' },
        type: 'active',
        desc: { es: 'Planeas hacia abajo durante 10 seg.', en: 'Lets you glide downward through the air for 10 sec.' },
        tags: { mobility: 0.5 }
      },
      {
        name: { es: 'Vista del Cielo', en: 'Skysight' },
        type: 'active',
        desc: {
          es: 'Bendición de los elementos que aumenta un 10% tu velocidad de carrera.',
          en: 'Grants a blessing of the elements that increases your run speed by 10%.'
        },
        tags: { mobility: 1.5 }
      },
      {
        name: { es: 'Bendecido por el Viento', en: 'Wind Blessed' },
        type: 'passive',
        desc: {
          es: 'Aumenta un 1% tu velocidad de ataque, distancia y lanzamiento.',
          en: 'Increases your melee, ranged and spell haste by 1%.'
        },
        tags: { hasteBoost: 1 }
      },
      {
        name: { es: 'Perspicacia Elemental', en: 'Elemental Insight' },
        type: 'passive',
        desc: { es: 'Aumenta un 5% el daño hecho a elementales.', en: 'Increases damage dealt to elementals by 5%.' },
        tags: {}
      }
    ]
  }
];

// Agrega los tags de todas las raciales de una raza en un único objeto.
RACES.forEach((race) => {
  const tags = {};
  race.racials.forEach((r) => {
    Object.entries(r.tags).forEach(([k, v]) => {
      tags[k] = (tags[k] || 0) + v;
    });
  });
  race.tags = tags;
});

// ---------------------------------------------------------------------------
// ARQUETIPOS DE ESPECIALIZACIÓN
// Cada clase tiene 3 árboles de talentos y el racial ideal cambia mucho según
// cuál juegues (un Chamán Mejora no necesita lo mismo que uno Elemental o de
// sanación). En vez de repetir 27 tablas de pesos sueltas, cada spec parte de
// un arquetipo de rol y solo sobreescribe lo que la hace distinta.
// "pvp" usa la misma lógica que antes (CC, burst, movilidad). "pve" usa
// prioridades clásicas de banda/mazmorra: golpe (hit cap), crítico/arma,
// maná sostenido en peleas largas y amenaza/supervivencia para tanques.
// ---------------------------------------------------------------------------

const ARCHETYPES = {
  meleeDpsPvp: { needs: { antiRoot: 3, antiStun: 2, antiFear: 2, burstCooldown: 2, weaponCrit: 2, sustain: 1 }, critical: ['antiRoot'] },
  rangedDpsPvp: { needs: { antiRoot: 3, mobility: 2, antiSnare: 2, burstCooldown: 2, hasteBoost: 2 }, critical: ['antiRoot'] },
  casterDpsPvp: { needs: { burstCooldown: 3, manaRegen: 2, antiStun: 1, hasteBoost: 1, antiFear: 1 }, critical: ['burstCooldown'] },
  healerPvp: { needs: { antiFear: 3, manaRegen: 3, sustain: 1, burstCooldown: 1 }, critical: ['antiFear', 'manaRegen'] },
  tankPvp: { needs: { sustain: 3, antiStun: 2, antiFear: 1, openerStun: 1 }, critical: ['sustain'] },

  meleeDpsPve: { needs: { weaponCrit: 3, hitChance: 2, burstCooldown: 2 }, critical: ['weaponCrit'] },
  rangedDpsPve: { needs: { weaponCrit: 2, hitChance: 3, burstCooldown: 2, hasteBoost: 2 }, critical: ['hitChance'] },
  casterDpsPve: { needs: { weaponCrit: 3, manaRegen: 2, burstCooldown: 2, hitChance: 1 }, critical: ['weaponCrit'] },
  healerPve: { needs: { manaRegen: 3, sustain: 1, burstCooldown: 1 }, critical: ['manaRegen'] },
  tankPve: { needs: { sustain: 3, hitChance: 2, antiPhysicalBurst: 1 }, critical: ['sustain'] }
};

// Clona un arquetipo, aplica ajustes puntuales (needs y/o critical) y le
// cuelga el texto de limitación de esa especialización concreta.
function deriveProfile(archetypeId, overrides, limitation) {
  const base = ARCHETYPES[archetypeId];
  const needs = { ...base.needs, ...(overrides.needs || {}) };
  const critical = overrides.critical || base.critical;
  return { needs, critical, limitation };
}

// ---------------------------------------------------------------------------
// CLASES
// Cada clase trae sus 3 especializaciones, cada una con un perfil de PvP y
// uno de PvE independientes.
// ---------------------------------------------------------------------------

// Matchups de duelo 1c1 según la sabiduría clásica de PvP vanilla (a nivel de
// clase, sin tener en cuenta objeto/nivel de juego/spec del rival). Sirven de
// resumen rápido arriba del todo; "good"/"bad" pueden ir vacíos si la spec no
// tiene una ventaja o desventaja clara marcada contra nadie en concreto.
const CLASSES = [
  {
    id: 'warrior',
    icon: '⚔️',
    name: { es: 'Guerrero', en: 'Warrior' },
    specs: [
      {
        id: 'arms',
        name: { es: 'Armas', en: 'Arms' },
        matchup: { good: ['priest', 'warlock'], bad: ['mage', 'rogue'] },
        pvp: deriveProfile('meleeDpsPvp', {}, {
          es: 'Especialista en armas a dos manos con Overpower e interrupciones potentes, pero sigue siendo cuerpo a cuerpo puro: cadenas de aturdimiento y raíces lo anulan igual que a cualquier otro guerrero.',
          en: 'A 2H specialist with strong Overpower windows and interrupts, but still pure melee — stun chains and roots shut it down like any other warrior.'
        }),
        pve: deriveProfile('meleeDpsPve', { needs: { hitChance: 1 } }, {
          es: 'Su daño depende de crítico y de aprovechar cada golpe con una sola arma a dos manos; el golpe importa, pero no sufre la penalización extra de combatir con dos armas.',
          en: "Its damage rides on crit and landing every big 2H swing; hit chance matters, but a single weapon means it doesn't suffer the extra dual-wield miss penalty."
        })
      },
      {
        id: 'fury',
        name: { es: 'Furia', en: 'Fury' },
        matchup: { good: ['priest', 'warlock'], bad: ['mage', 'rogue'] },
        pvp: deriveProfile('meleeDpsPvp', { needs: { burstCooldown: 3 } }, {
          es: 'Todo su daño sale de mantener el objetivo a rango de golpe: sin nada que frene raíces o aturdimientos, el Furia se queda literalmente sin poder pegar.',
          en: 'All of its damage depends on staying in melee range: without something to shrug off roots or stuns, a Fury Warrior is left literally unable to swing.'
        }),
        pve: deriveProfile('meleeDpsPve', { needs: { hitChance: 3 }, critical: ['weaponCrit', 'hitChance'] }, {
          es: 'Con dos armas de una mano, el tope de golpe es mucho más exigente que con una sola arma a dos manos: cualquier punto extra de probabilidad de golpe vale mucho más aquí que en Armas o Protección.',
          en: 'Dual-wielding two one-handers makes the hit cap far harder to reach than with a 2H weapon: every extra point of hit chance is worth far more here than for Arms or Protection.'
        })
      },
      {
        id: 'protection',
        name: { es: 'Protección', en: 'Protection' },
        matchup: { good: [], bad: [] },
        pvp: deriveProfile('tankPvp', {}, {
          es: 'Su trabajo es aguantar, no esquivar: sin escape ni anti-CC propio, toda su supervivencia en PvP depende de vida, mitigación y del aturdimiento que abra hueco para golpear.',
          en: 'Its job is to endure, not to dodge: with no escape or built-in anti-CC, all of its PvP survivability comes from health, mitigation and the stun that creates an opening to swing.'
        }),
        pve: deriveProfile('tankPve', {}, {
          es: 'En banda tanquea de amenaza: la vida extra y la probabilidad de golpe (para no fallar provocaciones y golpes de amenaza) importan más que el daño puro.',
          en: "In a raid it tanks for threat: extra health and hit chance (so taunts and threat swings don't whiff) matter more than raw damage."
        })
      }
    ]
  },
  {
    id: 'paladin',
    icon: '🛡️',
    name: { es: 'Paladín', en: 'Paladin' },
    specs: [
      {
        id: 'holy',
        name: { es: 'Sagrado', en: 'Holy' },
        matchup: { good: [], bad: [] },
        pvp: deriveProfile('healerPvp', {}, {
          es: 'Sin interrupción y sin escape propio, el Paladín Sagrado sobrevive a base de maná y sanaciones grandes; si lo encierran en miedo o silencio no tiene ningún as en la manga.',
          en: 'With no interrupt and no escape of its own, a Holy Paladin survives on mana and big heals; if it gets locked down by fear or silence it has no ace up its sleeve.'
        }),
        pve: deriveProfile('healerPve', {}, {
          es: 'En banda todo gira en torno a la eficiencia de maná durante peleas largas: cuanto más aguante sin quedarse seco, más curación total aporta.',
          en: "In a raid it's all about mana efficiency over long fights: the longer it lasts without running dry, the more total healing it provides."
        })
      },
      {
        id: 'protection',
        name: { es: 'Protección', en: 'Protection' },
        matchup: { good: [], bad: [] },
        pvp: deriveProfile('tankPvp', {}, {
          es: 'Tanque con buena supervivencia pero sin CC propio ni forma de cerrar distancia: aguanta bien, pero no elige cuándo empieza la pelea.',
          en: "A tank with good survivability but no CC of its own and no way to close distance: it holds up well, but doesn't get to choose when the fight starts."
        }),
        pve: deriveProfile('tankPve', {}, {
          es: 'La amenaza y la probabilidad de golpe importan tanto como la vida extra para no fallar la rotación de provocación en banda.',
          en: "Threat and hit chance matter just as much as extra health, so its raid taunt rotation doesn't whiff."
        })
      },
      {
        id: 'retribution',
        name: { es: 'Reprensión', en: 'Retribution' },
        matchup: { good: ['warlock'], bad: ['hunter'] },
        pvp: deriveProfile('meleeDpsPvp', {}, {
          es: 'Buen burst cuerpo a cuerpo con sellos y bendiciones, pero comparte todas las debilidades de un guerrero cuerpo a cuerpo sin ninguna herramienta extra de movilidad.',
          en: "Good melee burst with seals and blessings, but it shares every weakness of a melee class with no extra mobility tool of its own."
        }),
        pve: deriveProfile('meleeDpsPve', {}, {
          es: 'El daño escala con crítico y con no fallar golpes: en una banda es un dps cuerpo a cuerpo más, así que el golpe y el crítico deciden su lugar en la tabla de daño.',
          en: "Its damage scales with crit and not whiffing: in a raid it's just another melee dps, so hit chance and crit decide where it lands on the damage meter."
        })
      }
    ]
  },
  {
    id: 'hunter',
    icon: '🏹',
    name: { es: 'Cazador', en: 'Hunter' },
    specs: [
      {
        id: 'beastmastery',
        name: { es: 'Bestias', en: 'Beast Mastery' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('rangedDpsPvp', {}, {
          es: 'Vive de mantener distancia y de que su mascota aguante mientras kitea: cualquier ayuda para moverse o librarse de raíces potencia toda la rotación.',
          en: "It lives by keeping distance and having its pet hold up while it kites: anything that helps it move or shake off roots powers the whole rotation."
        }),
        pve: deriveProfile('rangedDpsPve', {}, {
          es: 'El daño del pet y el propio dependen de golpear de forma constante: velocidad de ataque y golpe pesan más que cualquier cosa puramente defensiva.',
          en: "Both pet and personal damage depend on landing hits consistently: attack speed and hit chance matter more than anything purely defensive."
        })
      },
      {
        id: 'marksmanship',
        name: { es: 'Puntería', en: 'Marksmanship' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('rangedDpsPvp', {}, {
          es: 'Todo su burst sale de tiros a rango: si lo alcanzan cuerpo a cuerpo o lo enraízan, pierde toda la ventaja de jugar a distancia.',
          en: 'All of its burst comes from ranged shots: if it gets caught in melee or rooted, it loses the entire advantage of playing at range.'
        }),
        pve: deriveProfile('rangedDpsPve', {}, {
          es: 'El dps depende directamente de la velocidad de disparo y de no fallar: cualquier bonus de haste o de golpe se nota en cada pelea larga.',
          en: "DPS depends directly on shot speed and not missing: any haste or hit bonus shows up in every long fight."
        })
      },
      {
        id: 'survival',
        name: { es: 'Supervivencia', en: 'Survival' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('rangedDpsPvp', {}, {
          es: 'Mezcla trampas y golpes puntuales cuerpo a cuerpo con el arco: sigue necesitando distancia y movilidad para no acabar atrapado entre dos frentes.',
          en: "Mixes traps and the occasional melee hit with the bow: it still needs distance and mobility so it doesn't end up caught between two fronts."
        }),
        pve: deriveProfile('rangedDpsPve', {}, {
          es: 'Su daño combina golpes cuerpo a cuerpo puntuales con el arma a distancia, así que crítico y golpe siguen siendo la base del dps.',
          en: "Its damage mixes occasional melee hits with the ranged weapon, so both crit and hit chance remain the backbone of its dps."
        })
      }
    ]
  },
  {
    id: 'rogue',
    icon: '🗡️',
    name: { es: 'Pícaro', en: 'Rogue' },
    specs: [
      {
        id: 'assassination',
        name: { es: 'Asesinato', en: 'Assassination' },
        matchup: { good: ['warrior', 'mage'], bad: ['priest'] },
        pvp: deriveProfile('meleeDpsPvp', {}, {
          es: 'Depende de mantener venenos y puñaladas activos sobre el objetivo: cualquier raíz o miedo corta la rotación en seco.',
          en: 'Depends on keeping poisons and backstabs active on the target: any root or fear cuts the rotation dead.'
        }),
        pve: deriveProfile('meleeDpsPve', {}, {
          es: 'El veneno y el crítico escalan con no fallar golpes, así que el golpe decide cuánto sube realmente el dps sostenido.',
          en: "Poison and crit scale with landing hits, so hit chance decides how much sustained dps actually goes up."
        })
      },
      {
        id: 'combat',
        name: { es: 'Combate', en: 'Combat' },
        matchup: { good: ['warrior', 'mage'], bad: ['priest'] },
        pvp: deriveProfile('meleeDpsPvp', { needs: { weaponCrit: 3 } }, {
          es: 'El arma en mano manda: cualquier bonus de crítico por tipo de arma se nota mucho, pero sigue sin tener anti-CC propio más allá del trinket.',
          en: "The weapon in hand does the talking: any weapon-type crit bonus shows up a lot, but it still has no anti-CC of its own beyond the trinket."
        }),
        pve: deriveProfile('meleeDpsPve', { needs: { weaponCrit: 3, hitChance: 3 }, critical: ['weaponCrit', 'hitChance'] }, {
          es: 'Es la especialización de pícaro más dependiente del arma equipada, así que la especialización de arma y el golpe importan más aquí que en Asesinato o Sutileza.',
          en: "It's the rogue dps spec most dependent on the equipped weapon, so weapon specialization and hit chance matter more here than in Assassination or Subtlety."
        })
      },
      {
        id: 'subtlety',
        name: { es: 'Sutileza', en: 'Subtlety' },
        matchup: { good: ['warrior', 'mage'], bad: ['priest'] },
        pvp: deriveProfile('meleeDpsPvp', { needs: { escapeUtility: 2 } }, {
          es: 'Vive de abrir desde el sigilo: cualquier herramienta extra de escape o de reiniciar el combate alarga lo peligroso que es en una pelea 1c1.',
          en: 'It lives off opening from stealth: any extra escape or combat-reset tool extends how dangerous it is in a 1v1.'
        }),
        pve: deriveProfile('meleeDpsPve', {}, {
          es: 'En banda su ventana de apertura importa menos que en PvP; el dps sostenido sigue dependiendo del crítico y de no fallar golpes como cualquier pícaro.',
          en: "In a raid its opening window matters less than in PvP; sustained dps still comes down to crit and not missing, like any rogue."
        })
      }
    ]
  },
  {
    id: 'priest',
    icon: '✨',
    name: { es: 'Sacerdote', en: 'Priest' },
    specs: [
      {
        id: 'discipline',
        name: { es: 'Disciplina', en: 'Discipline' },
        matchup: { good: [], bad: ['warrior', 'rogue'] },
        pvp: deriveProfile('healerPvp', {}, {
          es: 'Sanador reactivo que necesita seguir lanzando sin interrupción: el miedo y el maná son sus dos mayores enemigos en cualquier pelea.',
          en: 'A reactive healer that needs to keep casting uninterrupted: fear and mana are its two biggest enemies in any fight.'
        }),
        pve: deriveProfile('healerPve', {}, {
          es: 'En banda cura y mitiga daño a la vez, así que aguantar sin quedarse sin maná en peleas largas es lo que más pesa.',
          en: 'In a raid it heals and mitigates damage at once, so lasting without running out of mana in long fights matters most.'
        })
      },
      {
        id: 'holy',
        name: { es: 'Sagrado', en: 'Holy' },
        matchup: { good: [], bad: ['warrior', 'rogue'] },
        pvp: deriveProfile('healerPvp', {}, {
          es: 'El sanador más puro: sin nada propio para escapar del cuerpo a cuerpo, depende totalmente de no ser interrumpido ni miedeado.',
          en: 'The purest healer: with nothing of its own to escape melee, it depends entirely on not being interrupted or feared.'
        }),
        pve: deriveProfile('healerPve', {}, {
          es: 'La sanación en banda es una carrera de maná a largo plazo: cuanto más dura sin secarse, más vidas salva de verdad.',
          en: "Raid healing is a long-mana race: the longer it lasts without running dry, the more lives it actually saves."
        })
      },
      {
        id: 'shadow',
        name: { es: 'Sombras', en: 'Shadow' },
        matchup: { good: ['warlock', 'mage'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', { needs: { antiFear: 2 } }, {
          es: 'Su daño depende de DoTs y de tiempo de casteo sin cortes; irónicamente es tan vulnerable al miedo como cualquier objetivo al que se lo aplica.',
          en: "Its damage depends on DoTs and uninterrupted cast time; ironically it's just as vulnerable to fear as any target it casts it on."
        }),
        pve: deriveProfile('casterDpsPve', {}, {
          es: 'El dps se acumula con hechizos periódicos, así que el crítico de hechizo y aguantar el maná durante toda la pelea son lo que más suma.',
          en: "DPS stacks up through periodic spells, so spell crit and lasting the whole fight on mana are what add up the most."
        })
      }
    ]
  },
  {
    id: 'shaman',
    icon: '🌊',
    name: { es: 'Chamán', en: 'Shaman' },
    specs: [
      {
        id: 'elemental',
        name: { es: 'Elemental', en: 'Elemental' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', {}, {
          es: 'Nuke a distancia con ventanas de burst muy marcadas: perder el maná o que lo interrumpan constantemente lo deja sin nada que hacer.',
          en: 'A ranged nuker with sharply defined burst windows: running out of mana or getting constantly interrupted leaves it with nothing to do.'
        }),
        pve: deriveProfile('casterDpsPve', {}, {
          es: 'El daño depende de crítico de hechizo y de aguantar toda la pelea con maná, igual que cualquier otro caster de banda.',
          en: "Its damage depends on spell crit and lasting the whole fight on mana, just like any other raid caster."
        })
      },
      {
        id: 'enhancement',
        name: { es: 'Mejora', en: 'Enhancement' },
        matchup: { good: ['priest'], bad: ['mage'] },
        pvp: deriveProfile('meleeDpsPvp', { needs: { weaponCrit: 2, antiRoot: 2 }, critical: [] }, {
          es: 'Depende de mantenerse pegado al objetivo para que Golpe de Tormenta y los encantamientos de arma hagan su trabajo: una raíz lo deja fuera de la pelea.',
          en: 'It depends on staying glued to the target so Stormstrike and weapon imbues can do their job: a single root takes it out of the fight.'
        }),
        pve: deriveProfile('meleeDpsPve', {}, {
          es: 'El dps depende directamente del arma equipada y de no fallar golpes, como cualquier híbrido cuerpo a cuerpo.',
          en: "Its dps depends directly on the equipped weapon and not missing hits, like any melee hybrid."
        })
      },
      {
        id: 'restoration',
        name: { es: 'Restauración', en: 'Restoration' },
        matchup: { good: [], bad: ['warrior', 'rogue'] },
        pvp: deriveProfile('healerPvp', { critical: ['manaRegen'] }, {
          es: 'Sanador de tótems que necesita mantenerlos vivos y su maná alto; sin ningún anti-CC propio, depende totalmente de no ser interrumpido.',
          en: 'A totem healer that needs to keep its totems up and its mana high; with no anti-CC of its own, it depends entirely on not being interrupted.'
        }),
        pve: deriveProfile('healerPve', {}, {
          es: 'La sanación en banda se mide en maná sostenido a lo largo de toda la pelea, más que en picos puntuales.',
          en: "Raid healing is measured in sustained mana across the whole fight, more than in single spikes."
        })
      }
    ]
  },
  {
    id: 'mage',
    icon: '🔮',
    name: { es: 'Mago', en: 'Mage' },
    specs: [
      {
        id: 'arcane',
        name: { es: 'Arcano', en: 'Arcane' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', {}, {
          es: 'El burst más alto de las tres especializaciones, pero también el que más maná quema: sin eficiencia extra, se queda sin combustible a mitad de pelea.',
          en: 'The highest burst of the three specs, but also the one that burns the most mana: without extra efficiency, it runs out of fuel mid-fight.'
        }),
        pve: deriveProfile('casterDpsPve', { needs: { manaRegen: 3 } }, {
          es: 'El dps depende de estirar el maná el mayor tiempo posible mientras aprovecha cada crítico, más que en las otras dos especializaciones de mago.',
          en: "Its dps depends on stretching mana as long as possible while capitalizing on every crit, more than the other two mage specs."
        })
      },
      {
        id: 'fire',
        name: { es: 'Fuego', en: 'Fire' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', {}, {
          es: 'Vive de los críticos y de las ventanas de burst: cualquier cosa que aumente la velocidad de lanzamiento o el crítico se traduce directamente en más daño antes de morir.',
          en: 'It lives off crits and burst windows: anything that boosts cast speed or crit translates directly into more damage before it dies.'
        }),
        pve: deriveProfile('casterDpsPve', { needs: { weaponCrit: 3, hitChance: 2 } }, {
          es: 'El crítico de hechizo es literalmente la base de toda la rotación de banda, así que cualquier racial que lo toque se nota más aquí que en Escarcha.',
          en: 'Spell crit is literally the backbone of the entire raid rotation, so any racial that touches it shows up more here than in Frost.'
        })
      },
      {
        id: 'frost',
        name: { es: 'Escarcha', en: 'Frost' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', { needs: { manaRegen: 3, burstCooldown: 2 }, critical: ['manaRegen'] }, {
          es: 'Menos burst que Fuego pero más control; sigue siendo de papel, así que la eficiencia de maná para sobrevivir peleas largas importa mucho.',
          en: "Less burst than Fire but more control; it's still paper-thin, so mana efficiency to survive long fights matters a lot."
        }),
        pve: deriveProfile('casterDpsPve', { needs: { manaRegen: 3, weaponCrit: 2 } }, {
          es: 'El dps es más constante y menos dependiente de rachas de crítico, pero el maná sostenido sigue siendo la base de toda la pelea.',
          en: "Its dps is steadier and less crit-streak-dependent, but sustained mana is still the backbone of the whole fight."
        })
      }
    ]
  },
  {
    id: 'warlock',
    icon: '💀',
    name: { es: 'Brujo', en: 'Warlock' },
    specs: [
      {
        id: 'affliction',
        name: { es: 'Aflicción', en: 'Affliction' },
        matchup: { good: ['priest'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', { needs: { antiFear: 2, manaRegen: 3 } }, {
          es: 'Todo el daño sale de DoTs que necesitan tiempo para hacer efecto: si lo interrumpen, lo miedean o lo matan rápido, pierde la mayor parte de su daño potencial.',
          en: "All of its damage comes from DoTs that need time to tick: if it's interrupted, feared, or killed fast, it loses most of its potential damage."
        }),
        pve: deriveProfile('casterDpsPve', { needs: { manaRegen: 3 } }, {
          es: 'El daño se acumula lentamente con los DoTs, así que aguantar toda la pelea con maná importa más que el crítico puntual.',
          en: "Damage accumulates slowly through DoTs, so lasting the whole fight on mana matters more than any single crit."
        })
      },
      {
        id: 'demonology',
        name: { es: 'Demonología', en: 'Demonology' },
        matchup: { good: ['priest'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', {}, {
          es: 'Reparte el riesgo entre él y su mascota, pero sigue siendo un lanzador de papel que depende de no ser interrumpido para sacarle partido al pet.',
          en: "It splits the risk between itself and its pet, but it's still a paper-thin caster that depends on not being interrupted to get value from the pet."
        }),
        pve: deriveProfile('casterDpsPve', { needs: { manaRegen: 3 } }, {
          es: 'El dps combina el propio con el de la mascota, así que el maná sostenido decide cuánto tiempo puede mantener a ambos atacando.',
          en: "Its dps blends its own with the pet's, so sustained mana decides how long it can keep both attacking."
        })
      },
      {
        id: 'destruction',
        name: { es: 'Destrucción', en: 'Destruction' },
        matchup: { good: ['priest'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', { needs: { burstCooldown: 3 } }, {
          es: 'El más directo de los tres: hechizos grandes y de casteo largo que dependen totalmente de no ser interrumpidos ni forzados a moverse.',
          en: 'The most straightforward of the three: big, long-cast spells that depend entirely on not being interrupted or forced to move.'
        }),
        pve: deriveProfile('casterDpsPve', {}, {
          es: 'El daño depende de aprovechar cada hechizo grande sin fallar, así que el crítico de hechizo pesa mucho en el resultado final de la pelea.',
          en: "Its damage depends on landing every big spell, so spell crit weighs heavily on the fight's final result."
        })
      }
    ]
  },
  {
    id: 'druid',
    icon: '🐾',
    name: { es: 'Druida', en: 'Druid' },
    specs: [
      {
        id: 'balance',
        name: { es: 'Equilibrio', en: 'Balance' },
        matchup: { good: ['warrior'], bad: ['rogue'] },
        pvp: deriveProfile('casterDpsPvp', { needs: { antiRoot: 1 } }, {
          es: 'Caster puro sin la robustez de las otras formas: necesita maná y una ventana de burst para competir con el resto de casters.',
          en: 'A pure caster without the sturdiness of its other forms: it needs mana and a burst window to compete with other casters.'
        }),
        pve: deriveProfile('casterDpsPve', {}, {
          es: 'El dps depende de crítico de hechizo y de aguantar el maná, igual que cualquier otro caster puro de banda.',
          en: "Its dps depends on spell crit and lasting on mana, just like any other pure raid caster."
        })
      },
      {
        id: 'feral',
        name: { es: 'Feral', en: 'Feral' },
        matchup: { good: ['rogue'], bad: ['mage'] },
        pvp: deriveProfile('meleeDpsPvp', { needs: { sustain: 2 } }, {
          es: 'En forma de gato depende de quedarse pegado al objetivo igual que un pícaro, y en forma de oso aguanta golpes pero sin ningún anti-CC propio más allá de sus formas.',
          en: 'In cat form it depends on staying stuck to the target just like a rogue, and in bear form it soaks hits but with no anti-CC beyond its own forms.'
        }),
        pve: deriveProfile('meleeDpsPve', { needs: { sustain: 1 } }, {
          es: 'Tanto tanqueando como haciendo dps cuerpo a cuerpo, el golpe y el crítico deciden si realmente aguanta o hace el daño esperado.',
          en: "Whether tanking or doing melee dps, hit chance and crit decide whether it actually holds up or does the expected damage."
        })
      },
      {
        id: 'restoration',
        name: { es: 'Restauración', en: 'Restoration' },
        matchup: { good: [], bad: ['warrior', 'rogue'] },
        pvp: deriveProfile('healerPvp', { needs: { sustain: 2 } }, {
          es: 'Curación fuerte a lo largo del tiempo, pero sin ninguna forma de escapar del cuerpo a cuerpo ni de librarse del miedo por sí mismo.',
          en: 'Strong healing over time, but with no way to escape melee or shake off fear on its own.'
        }),
        pve: deriveProfile('healerPve', {}, {
          es: 'La sanación en banda depende de mantener HoTs activos el mayor tiempo posible sin quedarse sin maná.',
          en: "Raid healing depends on keeping HoTs rolling for as long as possible without running out of mana."
        })
      }
    ]
  }
];

// ---------------------------------------------------------------------------
// MATRIZ DE COMBINACIONES PERMITIDAS (56 combos reales de la beta)
// classId -> lista de { race, isNew }
// ---------------------------------------------------------------------------

const COMBO_MATRIX = {
  warrior: ['human', 'dwarf', 'nightelf', 'gnome', 'skyborne_alliance', 'orc', 'undead', 'tauren', 'troll', 'skyborne_horde'],
  paladin: ['human', 'dwarf', 'undead'],
  hunter: ['human', 'dwarf', 'nightelf', 'skyborne_alliance', 'orc', 'tauren', 'troll', 'skyborne_horde'],
  rogue: ['human', 'dwarf', 'nightelf', 'gnome', 'skyborne_alliance', 'orc', 'undead', 'troll', 'skyborne_horde'],
  priest: ['human', 'dwarf', 'nightelf', 'gnome', 'undead', 'troll'],
  shaman: ['dwarf', 'orc', 'tauren', 'troll', 'skyborne_horde'],
  mage: ['human', 'gnome', 'skyborne_alliance', 'orc', 'undead', 'troll'],
  warlock: ['human', 'gnome', 'orc', 'undead', 'troll'],
  druid: ['nightelf', 'tauren', 'skyborne_alliance', 'skyborne_horde']
};

const NEW_COMBOS = new Set([
  'hunter:human',
  'shaman:dwarf',
  'priest:gnome',
  'mage:orc',
  'paladin:undead',
  'warlock:troll'
]);

function isNewCombo(classId, raceId) {
  const race = RACES.find((r) => r.id === raceId);
  if (race && race.isSkyborne) return true;
  return NEW_COMBOS.has(`${classId}:${raceId}`);
}

function getRace(id) {
  return RACES.find((r) => r.id === id);
}

function getClass(id) {
  return CLASSES.find((c) => c.id === id);
}
