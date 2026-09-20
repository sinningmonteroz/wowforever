let currentLang = detectLang();
let currentClassId = null;
let currentSpecId = null;
let currentMode = 'pvp';

const el = {
  title: document.getElementById('siteTitle'),
  tagline: document.getElementById('tagline'),
  langToggle: document.getElementById('langToggle'),
  pickerSection: document.getElementById('pickerSection'),
  pickerHeading: document.getElementById('pickerHeading'),
  classGrid: document.getElementById('classGrid'),
  topTenTitle: document.getElementById('topTenTitle'),
  worstTenTitle: document.getElementById('worstTenTitle'),
  topTenList: document.getElementById('topTenList'),
  worstTenList: document.getElementById('worstTenList'),
  combosNote: document.getElementById('combosNote'),
  resultsSection: document.getElementById('resultsSection'),
  backBtn: document.getElementById('backBtn'),
  resultsHeading: document.getElementById('resultsHeading'),
  resultsSub: document.getElementById('resultsSub'),
  specTabs: document.getElementById('specTabs'),
  modePvpBtn: document.getElementById('modePvpBtn'),
  modePveBtn: document.getElementById('modePveBtn'),
  specSummary: document.getElementById('specSummary'),
  raceList: document.getElementById('raceList'),
  methodologySummary: document.getElementById('methodologySummary'),
  methodologyText: document.getElementById('methodologyText'),
  sourceNote: document.getElementById('sourceNote'),
  skyborneNote: document.getElementById('skyborneNote')
};

function renderStaticText() {
  document.documentElement.lang = currentLang;
  document.title = t('siteTitle', currentLang);
  el.title.textContent = t('siteTitle', currentLang);
  el.tagline.textContent = t('tagline', currentLang);
  el.langToggle.textContent = t('langToggle', currentLang);
  el.pickerHeading.textContent = t('chooseClass', currentLang);
  el.topTenTitle.textContent = t('topTenTitle', currentLang);
  el.worstTenTitle.textContent = t('worstTenTitle', currentLang);
  el.combosNote.textContent = t('combosNote', currentLang);
  el.backBtn.textContent = '← ' + t('changeClass', currentLang);
  el.modePvpBtn.textContent = t('modePvp', currentLang);
  el.modePveBtn.textContent = t('modePve', currentLang);
  el.methodologySummary.textContent = t('methodologyTitle', currentLang);
  el.methodologyText.textContent = t('methodologyText', currentLang);
  el.sourceNote.textContent = t('sourceNote', currentLang);
  el.skyborneNote.textContent = t('skyborneNote', currentLang);
}

function renderClassGrid() {
  el.classGrid.innerHTML = '';
  CLASSES.forEach((cls) => {
    const count = (COMBO_MATRIX[cls.id] || []).length;
    const card = document.createElement('div');
    card.className = 'class-card';
    card.innerHTML = `
      <span class="icon">${cls.icon}</span>
      <span class="name">${cls.name[currentLang]}</span>
      <span class="count">${count} ${t('availableClasses', currentLang)}</span>
    `;
    card.addEventListener('click', () => selectClass(cls.id));
    el.classGrid.appendChild(card);
  });
}

function factionLabel(faction) {
  return faction === 'alliance' ? t('factionAlliance', currentLang) : t('factionHorde', currentLang);
}

function renderComboMini(container, rows, specHintKey) {
  container.innerHTML = '';
  rows.forEach((row, idx) => {
    const item = document.createElement('div');
    item.className = 'combo-mini';

    const specName = row.specHint.name[currentLang];
    const newBadge = row.isNew ? `<span class="new-badge">${t('newBadge', currentLang)}</span>` : '';

    item.innerHTML = `
      <span class="mini-rank">#${idx + 1}</span>
      <span class="mini-main">
        <span class="mini-names">${row.race.icon} ${row.race.name[currentLang]} · ${row.cls.icon} ${row.cls.name[currentLang]}</span>
        <span class="mini-sub">
          <span class="faction-pill ${row.race.faction}">${factionLabel(row.race.faction)}</span>
          <span>${t(specHintKey, currentLang)}: ${specName}</span>
          ${newBadge}
        </span>
      </span>
      <span class="mini-score sc-${row.tier}">${row.score.toFixed(1)}</span>
    `;
    item.addEventListener('click', () => selectClass(row.cls.id));
    container.appendChild(item);
  });
}

function renderCombinationLists() {
  renderComboMini(el.topTenList, getTopCombinations(10), 'bestInSpec');
  renderComboMini(el.worstTenList, getWorstCombinations(10), 'worstInSpec');
}

function renderSpecTabs(cls) {
  el.specTabs.innerHTML = '';
  cls.specs.forEach((spec) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'spec-btn' + (spec.id === currentSpecId ? ' active' : '');
    btn.textContent = spec.name[currentLang];
    btn.addEventListener('click', () => {
      currentSpecId = spec.id;
      renderResults();
    });
    el.specTabs.appendChild(btn);
  });
}

function renderModeToggle() {
  el.modePvpBtn.classList.toggle('active', currentMode === 'pvp');
  el.modePveBtn.classList.toggle('active', currentMode === 'pve');
}

function classNameList(ids) {
  return ids.map((id) => getClass(id).name[currentLang]).join(', ');
}

function renderSpecSummary(spec, mode) {
  const profile = spec[mode];
  let html = `<p class="playstyle">${profile.limitation[currentLang]}</p>`;

  if (mode === 'pvp') {
    const good = spec.matchup.good;
    const bad = spec.matchup.bad;
    const goodText = good.length ? classNameList(good) : t('noStrength', currentLang);
    const badText = bad.length ? classNameList(bad) : t('noWeakness', currentLang);
    html += `
      <div class="matchup-row">
        <span class="matchup good">🟢 ${t('goodAgainst', currentLang)}: ${goodText}</span>
        <span class="matchup bad">🔴 ${t('badAgainst', currentLang)}: ${badText}</span>
      </div>
      <p class="matchup-disclaimer">${t('matchupDisclaimer', currentLang)}</p>
    `;
  } else {
    html += `<p class="matchup-disclaimer">${t('pveDisclaimer', currentLang)}</p>`;
  }

  el.specSummary.innerHTML = html;
}

function renderResults() {
  const cls = getClass(currentClassId);
  renderSpecTabs(cls);
  renderModeToggle();

  const spec = cls.specs.find((s) => s.id === currentSpecId) || cls.specs[0];
  renderSpecSummary(spec, currentMode);

  const ranked = getRankedRacesForSpec(currentClassId, spec.id, currentMode, currentLang);

  el.resultsHeading.innerHTML = `<span>${cls.icon}</span> ${t('rankingTitle', currentLang)} ${cls.name[currentLang]} · ${spec.name[currentLang]}`;
  el.resultsSub.textContent = t('rankingSubtitle', currentLang);

  el.raceList.innerHTML = '';

  const hasSkyborne = ranked.some((r) => r.race.isSkyborne);

  ranked.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'race-card' + (row.rank === 1 ? ' rank-1' : '');

    const newBadge = row.isNew ? `<span class="new-badge">${t('newBadge', currentLang)}</span>` : '';

    card.innerHTML = `
      <div class="race-rank">#${row.rank}</div>
      <div>
        <div class="race-title-row">
          <span class="race-icon">${row.race.icon}</span>
          <span class="race-name">${row.race.name[currentLang]}</span>
          <span class="faction-pill ${row.race.faction}">${factionLabel(row.race.faction)}</span>
          ${newBadge}
        </div>
        <div class="reasoning">${row.reasoning}</div>
      </div>
      <div class="score-block">
        <div class="score-num">${row.score.toFixed(1)}</div>
        <span class="tier-chip tier-${row.tier}">${t('tierLabel', currentLang)} ${row.tier}</span>
        <span class="tier-label-text">${TIER_LABEL[row.tier][currentLang]}</span>
      </div>
    `;
    el.raceList.appendChild(card);
  });

  el.skyborneNote.style.display = hasSkyborne ? 'block' : 'none';
}

function selectClass(classId) {
  currentClassId = classId;
  currentSpecId = getClass(classId).specs[0].id;
  currentMode = 'pvp';
  location.hash = classId;
  el.pickerSection.style.display = 'none';
  el.resultsSection.style.display = 'block';
  renderResults();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showPicker() {
  currentClassId = null;
  location.hash = '';
  el.resultsSection.style.display = 'none';
  el.pickerSection.style.display = 'block';
}

function toggleLang() {
  currentLang = currentLang === 'es' ? 'en' : 'es';
  saveLang(currentLang);
  renderStaticText();
  renderClassGrid();
  renderCombinationLists();
  if (currentClassId) renderResults();
}

function init() {
  renderStaticText();
  renderClassGrid();
  renderCombinationLists();

  el.langToggle.addEventListener('click', toggleLang);
  el.backBtn.addEventListener('click', showPicker);
  el.modePvpBtn.addEventListener('click', () => {
    currentMode = 'pvp';
    renderResults();
  });
  el.modePveBtn.addEventListener('click', () => {
    currentMode = 'pve';
    renderResults();
  });

  const hashClass = location.hash.replace('#', '');
  if (hashClass && CLASSES.some((c) => c.id === hashClass)) {
    selectClass(hashClass);
  } else {
    showPicker();
  }
}

init();
