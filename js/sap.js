/* ============================================
   SAP.JS - SAP Development Cards
   ============================================ */

const sapData = [
  {
    title: 'SAP FI Güncelleme',
    module: 'FI/CO',
    steps: ['Analiz', 'Geliştirme', 'Test', 'Canlı'],
    currentStep: 2, // 0-indexed, 2 = Test
    completedSteps: [0, 1],
    target: '15 Mart 2026',
    description: 'Finansal muhasebe modülünde yeni raporlama altyapısı ve hesap planı güncellemesi.',
    owner: 'Ahmet Yılmaz',
    affected: ['FI', 'CO', 'MM']
  },
  {
    title: 'SAP MM Entegrasyonu',
    module: 'MM/SD',
    steps: ['Analiz', 'Geliştirme', 'Test', 'Canlı'],
    currentStep: 1,
    completedSteps: [0],
    target: '30 Nisan 2026',
    description: 'Malzeme yönetimi ve satış dağıtım modüllerinin entegrasyonu.',
    owner: 'Elif Kaya',
    affected: ['MM', 'SD', 'FI']
  },
  {
    title: 'SAP HR Portalı',
    module: 'HR',
    steps: ['Analiz', 'Geliştirme', 'Test', 'Canlı'],
    currentStep: 3,
    completedSteps: [0, 1, 2],
    target: '01 Mart 2026',
    description: 'İnsan kaynakları self-servis portal geliştirmesi.',
    owner: 'Zeynep Arslan',
    affected: ['HR', 'FI']
  },
  {
    title: 'SAP BW Raporlama',
    module: 'BW/BI',
    steps: ['Analiz', 'Geliştirme', 'Test', 'Canlı'],
    currentStep: 0,
    completedSteps: [],
    target: '15 Haziran 2026',
    description: 'Business Warehouse raporlama altyapısının modernizasyonu.',
    owner: 'Can Yıldız',
    affected: ['BW', 'FI', 'CO', 'MM']
  },
  {
    title: 'SAP PP Optimizasyonu',
    module: 'PP',
    steps: ['Analiz', 'Geliştirme', 'Test', 'Canlı'],
    currentStep: 2,
    completedSteps: [0, 1],
    target: '20 Mart 2026',
    description: 'Üretim planlama modülünde performans optimizasyonu.',
    owner: 'Ali Özkan',
    affected: ['PP', 'MM', 'QM']
  }
];

function renderSAP() {
  const list = document.getElementById('sapList');
  if (!list) return;

  list.innerHTML = sapData.map((s, i) => {
    const stepsHTML = s.steps.map((step, j) => {
      const isCompleted = s.completedSteps.includes(j);
      const isCurrent = j === s.currentStep && !isCompleted;
      const dotClass = isCompleted ? 'completed' : (isCurrent ? 'current' : '');
      const lineClass = j < s.steps.length - 1 ? (s.completedSteps.includes(j) ? 'completed' : '') : '';

      return `
        <div class="progress-step">
          <span class="step-dot ${dotClass}">${isCompleted ? '✓' : (isCurrent ? '🔄' : '')}</span>
          ${j < s.steps.length - 1 ? `<span class="step-line ${lineClass}"></span>` : ''}
        </div>
      `;
    }).join('');

    const labelsHTML = s.steps.map(step => `<span>${step}</span>`).join('');

    return `
      <div class="sap-card" data-index="${i}">
        <div class="card-title">📊 ${s.title}</div>
        <div class="card-module">Modül: ${s.module}</div>
        <div class="progress-tracker">${stepsHTML}</div>
        <div class="progress-labels">${labelsHTML}</div>
        <div class="card-target">🎯 Hedef: ${s.target}</div>
      </div>
    `;
  }).join('');

  // Click handlers for SAP modal
  list.querySelectorAll('.sap-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index);
      showSAPModal(sapData[idx]);
    });
  });
}

function showSAPModal(sap) {
  const html = `
    <button class="modal-close">✕</button>
    <div class="modal-header">
      <span class="modal-icon">📊</span>
      <div>
        <h2>${sap.title}</h2>
        <div class="modal-status" style="color: var(--text-secondary); font-size: 0.85rem;">Modül: ${sap.module}</div>
      </div>
    </div>

    <div class="modal-section">
      <h3>📋 Teknik Detaylar</h3>
      <p class="modal-description">${sap.description}</p>
    </div>

    <div class="modal-section">
      <h3>🔗 Etkilenen Modüller</h3>
      <div style="display: flex; gap: 8px; flex-wrap: wrap;">
        ${sap.affected.map(m => `<span class="status-badge">${m}</span>`).join('')}
      </div>
    </div>

    <div class="modal-section">
      <h3>📅 Timeline</h3>
      <p class="modal-description">Hedef Tarih: <strong>${sap.target}</strong></p>
      <div class="modal-meta" style="margin-top: 12px;">
        <span>👤 Sorumlu: ${sap.owner}</span>
      </div>
    </div>

    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="navigator.clipboard.writeText('${sap.title} - Modül: ${sap.module} - Hedef: ${sap.target}'); alert('Kopyalandı!')">📋 Bilgileri Kopyala</button>
    </div>
  `;

  openModal(html);
}

document.addEventListener('DOMContentLoaded', renderSAP);
