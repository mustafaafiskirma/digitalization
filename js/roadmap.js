/* ============================================
   ROADMAP.JS - Timeline / Kanban / List Views
   ============================================ */

const roadmapData = [
  { name: 'Fatura Agent v1.0', category: 'Agent', quarter: '2025 Q3', status: 'completed' },
  { name: 'Rapor Agent v1.0', category: 'Agent', quarter: '2025 Q3', status: 'completed' },
  { name: 'KDV Agent v1.0', category: 'Agent', quarter: '2025 Q3', status: 'completed' },
  { name: 'Tahsilat Agent v1.0', category: 'Agent', quarter: '2025 Q3', status: 'completed' },
  { name: 'SAP FI Raporlama', category: 'SAP', quarter: '2025 Q4', status: 'completed' },
  { name: 'Masraf RPA Botu', category: 'RPA', quarter: '2025 Q4', status: 'completed' },
  { name: 'Ödeme Agent v1.0', category: 'Agent', quarter: '2025 Q4', status: 'completed' },
  { name: 'Finansal Dashboard', category: 'Power BI', quarter: '2025 Q4', status: 'completed' },
  { name: 'Stok Agent v1.0', category: 'Agent', quarter: '2025 Q4', status: 'completed' },
  { name: 'Onay Agent v1.0', category: 'Agent', quarter: '2025 Q4', status: 'completed' },
  { name: 'Bütçe Agent v1.0', category: 'Agent', quarter: '2026 Q1', status: 'completed' },
  { name: 'Denetim Agent v1.0', category: 'Agent', quarter: '2026 Q1', status: 'completed' },
  { name: 'SAP FI Güncelleme', category: 'SAP', quarter: '2026 Q1', status: 'in-progress' },
  { name: 'SAP HR Portalı', category: 'SAP', quarter: '2026 Q1', status: 'in-progress' },
  { name: 'Mutabakat Agent', category: 'Agent', quarter: '2026 Q1', status: 'in-progress' },
  { name: 'Fatura RPA Botu', category: 'RPA', quarter: '2026 Q1', status: 'in-progress' },
  { name: 'Portal Lansmanı', category: 'Diğer', quarter: '2026 Q1', status: 'in-progress' },
  { name: 'Arşiv Agent v1.0', category: 'Agent', quarter: '2026 Q2', status: 'planned' },
  { name: 'Raporlama Agent', category: 'Agent', quarter: '2026 Q2', status: 'planned' },
  { name: 'SAP MM Enteg.', category: 'SAP', quarter: '2026 Q2', status: 'planned' },
  { name: 'Stok Analizi', category: 'Power BI', quarter: '2026 Q2', status: 'planned' },
  { name: 'Güvenlik Agent', category: 'Agent', quarter: '2026 Q2', status: 'planned' },
  { name: 'Uyum Agent v1.0', category: 'Agent', quarter: '2026 Q3', status: 'planned' },
  { name: 'SAP BW Raporlama', category: 'SAP', quarter: '2026 Q3', status: 'planned' },
  { name: 'AI Portal v2.0', category: 'Diğer', quarter: '2026 Q3', status: 'planned' }
];

const roadmapCategories = ['Tümü', 'Agent', 'SAP', 'RPA', 'Power BI', 'Diğer'];
let activeRoadmapFilter = 'Tümü';
let activeView = 'timeline';

function getFilteredData() {
  return activeRoadmapFilter === 'Tümü'
    ? roadmapData
    : roadmapData.filter(d => d.category === activeRoadmapFilter);
}

function renderRoadmapFilters() {
  const bar = document.getElementById('roadmapFilters');
  if (!bar) return;

  bar.innerHTML = roadmapCategories.map(cat =>
    `<button class="filter-btn ${cat === activeRoadmapFilter ? 'active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');

  bar.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeRoadmapFilter = btn.dataset.cat;
      renderRoadmapFilters();
      renderSummary();
      renderView();
    });
  });
}

function renderSummary() {
  const el = document.getElementById('roadmapSummary');
  if (!el) return;
  const data = getFilteredData();
  const completed = data.filter(d => d.status === 'completed').length;
  const inProgress = data.filter(d => d.status === 'in-progress').length;
  const planned = data.filter(d => d.status === 'planned').length;

  el.innerHTML = `
    <span class="summary-item"><span style="color: var(--status-active);">✅</span> Tamamlandı: ${completed}</span>
    <span class="summary-item"><span style="color: var(--status-dev);">🔄</span> Devam Eden: ${inProgress}</span>
    <span class="summary-item"><span style="color: var(--status-planned);">📋</span> Planlanan: ${planned}</span>
  `;
}

function renderView() {
  const container = document.getElementById('roadmapView');
  if (!container) return;

  if (activeView === 'timeline') renderTimeline(container);
  else if (activeView === 'kanban') renderKanban(container);
  else renderList(container);
}

function renderTimeline(container) {
  const data = getFilteredData();
  const quarters = [...new Set(data.map(d => d.quarter))];

  const itemsHTML = quarters.map(q => {
    const qItems = data.filter(d => d.quarter === q);
    const statusIcon = qItems.every(d => d.status === 'completed') ? 'completed'
      : qItems.some(d => d.status === 'in-progress') ? 'in-progress' : 'planned';

    return `
      <div class="timeline-item">
        <div class="quarter-label">${q}</div>
        <div class="timeline-dot ${statusIcon}"></div>
        <div class="timeline-card">
          ${qItems.map(item => `
            <div class="card-name">${item.name}</div>
            <div class="card-status-icon">${item.status === 'completed' ? '✅' : item.status === 'in-progress' ? '🔄' : '📋'}</div>
          `).join('<hr style="border:none;border-top:1px solid var(--border-color);margin:8px 0;">')}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="timeline-container">
      <div class="timeline-line"></div>
      <div class="timeline-items">${itemsHTML}</div>
    </div>
  `;
}

function renderKanban(container) {
  const data = getFilteredData();
  const cols = [
    { key: 'planned', title: '📋 Planlanan', items: data.filter(d => d.status === 'planned') },
    { key: 'in-progress', title: '🔄 Devam Eden', items: data.filter(d => d.status === 'in-progress') },
    { key: 'completed', title: '✅ Tamamlandı', items: data.filter(d => d.status === 'completed') }
  ];

  container.innerHTML = `
    <div class="kanban-container">
      ${cols.map(col => `
        <div class="kanban-column">
          <h3>${col.title} (${col.items.length})</h3>
          ${col.items.map(item => `
            <div class="kanban-card">
              <div class="card-title">${item.name}</div>
              <div class="card-cat">${item.category}</div>
              <div class="card-quarter">${item.quarter}</div>
            </div>
          `).join('')}
        </div>
      `).join('')}
    </div>
  `;
}

function renderList(container) {
  const data = getFilteredData();
  const statusLabel = { completed: '✅ Tamamlandı', 'in-progress': '🔄 Devam', planned: '📋 Plan' };

  container.innerHTML = `
    <div class="list-container">
      <table class="list-table">
        <thead>
          <tr>
            <th>Proje</th>
            <th>Kategori</th>
            <th>Çeyrek</th>
            <th>Durum</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(item => `
            <tr>
              <td><strong>${item.name}</strong></td>
              <td><span class="filter-btn" style="pointer-events:none; font-size:0.75rem; padding:2px 10px;">${item.category}</span></td>
              <td>${item.quarter}</td>
              <td>${statusLabel[item.status]}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `;
}

// View Toggle
function initViewToggle() {
  const toggle = document.getElementById('viewToggle');
  if (!toggle) return;

  toggle.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      toggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeView = btn.dataset.view;
      renderView();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderRoadmapFilters();
  renderSummary();
  initViewToggle();
  renderView();
});
