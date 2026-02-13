/* ============================================
   AGENTS.JS - Agent Cards & Detail Modal
   ============================================ */

const agentsData = [
  {
    name: 'Fatura Agent',
    icon: '🧾',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 4,
    description: 'Fatura işlemlerini otomatik olarak işleyen, kontrol eden ve raporlayan agent.',
    launchDate: 'Ocak 2026',
    before: { time: '4 saat/gün', error: '%12 hata', staff: '3 kişi' },
    after: { time: '15 dakika/gün', error: '%0.1 hata', staff: 'Tam otomatik' },
    savings: '₺840,000',
    timeSaved: '960 saat/yıl',
    chartData: [30, 45, 42, 55, 60, 58, 65, 70, 68, 75, 72, 78, 80, 82, 85, 88, 84, 90, 92, 88, 91, 93, 95, 94, 96, 93, 95, 97, 96, 98],
    versions: [
      { tag: 'v2.3', date: '01.02.2026', note: 'Hata düzeltmeleri' },
      { tag: 'v2.2', date: '15.01.2026', note: 'Yeni özellik eklendi' },
      { tag: 'v2.0', date: '01.01.2026', note: 'Major güncelleme' }
    ],
    owner: 'Ahmet Yılmaz'
  },
  {
    name: 'Rapor Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 5,
    description: 'Günlük, haftalık ve aylık raporları otomatik oluşturan ve dağıtan agent.',
    launchDate: 'Kasım 2025',
    before: { time: '3 saat/gün', error: '%8 hata', staff: '2 kişi' },
    after: { time: '10 dakika/gün', error: '%0.2 hata', staff: 'Tam otomatik' },
    savings: '₺620,000',
    timeSaved: '720 saat/yıl',
    chartData: [25, 35, 40, 45, 50, 55, 58, 60, 62, 65, 68, 70, 72, 75, 78, 80, 82, 85, 87, 88, 90, 92, 93, 94, 95, 95, 96, 97, 97, 98],
    versions: [
      { tag: 'v3.1', date: '05.02.2026', note: 'Dashboard entegrasyonu' },
      { tag: 'v3.0', date: '01.12.2025', note: 'Yeni rapor türleri' }
    ],
    owner: 'Mehmet Demir'
  },
  {
    name: 'Mutabakat Agent',
    icon: '',
    status: 'dev',
    statusLabel: 'Test',
    progress: 3,
    description: 'Banka ve SAP mutabakat işlemlerini otomatik karşılaştıran agent.',
    launchDate: 'Mart 2026',
    before: { time: '6 saat/gün', error: '%15 hata', staff: '4 kişi' },
    after: { time: '20 dakika/gün', error: '%0.3 hata', staff: '1 kişi (kontrol)' },
    savings: '₺950,000',
    timeSaved: '1,400 saat/yıl',
    chartData: [10, 15, 20, 25, 30, 35, 38, 42, 45, 50, 52, 55, 58, 60, 62, 65, 68, 70, 72, 73, 75, 76, 78, 79, 80, 82, 83, 84, 85, 86],
    versions: [
      { tag: 'v0.9', date: '10.02.2026', note: 'Beta test sürümü' },
      { tag: 'v0.5', date: '15.01.2026', note: 'İlk prototip' }
    ],
    owner: 'Elif Kaya'
  },
  {
    name: 'Ödeme Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 4,
    description: 'Ödeme emirlerini hazırlayan ve onay sürecini yöneten agent.',
    launchDate: 'Aralık 2025',
    before: { time: '5 saat/gün', error: '%10 hata', staff: '3 kişi' },
    after: { time: '30 dakika/gün', error: '%0.5 hata', staff: '1 kişi (onay)' },
    savings: '₺720,000',
    timeSaved: '1,100 saat/yıl',
    chartData: [20, 30, 35, 40, 42, 48, 52, 55, 60, 62, 65, 68, 70, 73, 75, 78, 80, 82, 84, 85, 87, 88, 90, 91, 92, 93, 94, 95, 95, 96],
    versions: [
      { tag: 'v2.1', date: '01.02.2026', note: 'Performans iyileştirme' },
      { tag: 'v2.0', date: '01.01.2026', note: 'Yeni ödeme türleri' }
    ],
    owner: 'Ali Özkan'
  },
  {
    name: 'Tahsilat Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 5,
    description: 'Tahsilat takibini ve vade yönetimini otomatik gerçekleştiren agent.',
    launchDate: 'Ekim 2025',
    before: { time: '4 saat/gün', error: '%7 hata', staff: '2 kişi' },
    after: { time: '15 dakika/gün', error: '%0.1 hata', staff: 'Tam otomatik' },
    savings: '₺580,000',
    timeSaved: '920 saat/yıl',
    chartData: [35, 40, 45, 50, 55, 58, 62, 65, 68, 72, 75, 78, 80, 82, 85, 87, 88, 90, 91, 92, 93, 94, 95, 95, 96, 96, 97, 97, 98, 98],
    versions: [
      { tag: 'v4.0', date: '01.02.2026', note: 'AI destekli tahmin' }
    ],
    owner: 'Zeynep Arslan'
  },
  {
    name: 'Bütçe Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 4,
    description: 'Bütçe planlama ve sapma analizlerini yürüten agent.',
    launchDate: 'Ocak 2026',
    before: { time: '8 saat/hafta', error: '%5 hata', staff: '2 kişi' },
    after: { time: '30 dakika/hafta', error: '%0.2 hata', staff: 'Tam otomatik' },
    savings: '₺340,000',
    timeSaved: '380 saat/yıl',
    chartData: [15, 20, 28, 35, 40, 45, 50, 55, 58, 62, 65, 68, 72, 75, 78, 80, 82, 85, 87, 88, 90, 91, 92, 93, 94, 94, 95, 96, 96, 97],
    versions: [
      { tag: 'v1.2', date: '08.02.2026', note: 'Dashboard eklendi' }
    ],
    owner: 'Can Yıldız'
  },
  {
    name: 'Denetim Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 4,
    description: 'İç denetim süreçlerini destekleyen ve anomali tespiti yapan agent.',
    launchDate: 'Şubat 2026',
    before: { time: '10 saat/hafta', error: '%20 kaçak', staff: '3 kişi' },
    after: { time: '1 saat/hafta', error: '%2 kaçak', staff: '1 kişi (kontrol)' },
    savings: '₺450,000',
    timeSaved: '460 saat/yıl',
    chartData: [10, 15, 22, 30, 35, 40, 45, 50, 55, 58, 62, 65, 68, 70, 73, 75, 78, 80, 82, 84, 85, 87, 88, 90, 91, 92, 93, 94, 95, 95],
    versions: [
      { tag: 'v1.0', date: '01.02.2026', note: 'İlk sürüm yayında' }
    ],
    owner: 'Deniz Çelik'
  },
  {
    name: 'KDV Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 5,
    description: 'KDV hesaplama ve beyanname hazırlık süreçlerini otomatize eden agent.',
    launchDate: 'Kasım 2025',
    before: { time: '6 saat/gün', error: '%10 hata', staff: '2 kişi' },
    after: { time: '20 dakika/gün', error: '%0.05 hata', staff: 'Tam otomatik' },
    savings: '₺780,000',
    timeSaved: '1,400 saat/yıl',
    chartData: [30, 38, 45, 52, 58, 62, 68, 72, 75, 78, 82, 85, 87, 89, 90, 92, 93, 94, 95, 95, 96, 96, 97, 97, 97, 98, 98, 98, 99, 99],
    versions: [
      { tag: 'v3.0', date: '01.02.2026', note: 'Yeni mevzuat uyumu' }
    ],
    owner: 'Selin Aydın'
  },
  {
    name: 'Masraf Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 4,
    description: 'Masraf taleplerini kontrol eden ve onay akışını yöneten agent.',
    launchDate: 'Aralık 2025',
    before: { time: '3 saat/gün', error: '%8 hata', staff: '2 kişi' },
    after: { time: '15 dakika/gün', error: '%0.3 hata', staff: '1 kişi (onay)' },
    savings: '₺290,000',
    timeSaved: '680 saat/yıl',
    chartData: [20, 28, 35, 42, 48, 55, 60, 65, 68, 72, 75, 78, 80, 82, 85, 87, 88, 90, 91, 92, 93, 94, 94, 95, 95, 96, 96, 97, 97, 98],
    versions: [
      { tag: 'v2.0', date: '15.01.2026', note: 'Mobil onay desteği' }
    ],
    owner: 'Burak Koç'
  },
  {
    name: 'Varlık Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 4,
    description: 'Duran varlık kayıtlarını ve amortisman hesaplamalarını yöneten agent.',
    launchDate: 'Ocak 2026',
    before: { time: '5 saat/hafta', error: '%6 hata', staff: '1 kişi' },
    after: { time: '20 dakika/hafta', error: '%0.1 hata', staff: 'Tam otomatik' },
    savings: '₺210,000',
    timeSaved: '240 saat/yıl',
    chartData: [15, 22, 30, 38, 45, 50, 55, 60, 65, 68, 72, 75, 78, 80, 82, 84, 86, 88, 89, 90, 91, 92, 93, 94, 94, 95, 95, 96, 96, 97],
    versions: [
      { tag: 'v1.1', date: '05.02.2026', note: 'Raporlama geliştirmesi' }
    ],
    owner: 'Gökhan Şahin'
  },
  {
    name: 'Stok Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 5,
    description: 'Stok sayımı ve envanter doğrulamasını otomatik yapan agent.',
    launchDate: 'Ekim 2025',
    before: { time: '8 saat/hafta', error: '%15 hata', staff: '4 kişi' },
    after: { time: '1 saat/hafta', error: '%1 hata', staff: '1 kişi (kontrol)' },
    savings: '₺520,000',
    timeSaved: '360 saat/yıl',
    chartData: [25, 32, 40, 48, 55, 60, 65, 70, 72, 75, 78, 80, 83, 85, 87, 88, 90, 91, 92, 93, 94, 94, 95, 95, 96, 96, 97, 97, 98, 98],
    versions: [
      { tag: 'v3.2', date: '01.02.2026', note: 'Gerçek zamanlı izleme' }
    ],
    owner: 'Ayşe Polat'
  },
  {
    name: 'Onay Agent',
    icon: '',
    status: 'active',
    statusLabel: 'Aktif',
    progress: 4,
    description: 'Tüm mali onay süreçlerini takip eden ve hızlandıran agent.',
    launchDate: 'Aralık 2025',
    before: { time: '2 saat/gün', error: '%5 gecikme', staff: '1 kişi' },
    after: { time: '10 dakika/gün', error: '%0.5 gecikme', staff: 'Tam otomatik' },
    savings: '₺180,000',
    timeSaved: '460 saat/yıl',
    chartData: [20, 28, 35, 42, 50, 55, 60, 65, 70, 73, 76, 78, 80, 82, 85, 87, 88, 90, 91, 92, 93, 94, 94, 95, 95, 96, 96, 97, 97, 97],
    versions: [
      { tag: 'v2.0', date: '10.01.2026', note: 'Çoklu onay desteği' }
    ],
    owner: 'Hakan Eren'
  },
  {
    name: 'Arşiv Agent',
    icon: '',
    status: 'dev',
    statusLabel: 'Geliştirmede',
    progress: 2,
    description: 'Dijital arşivleme ve belge yönetimini otomatize eden agent.',
    launchDate: 'Nisan 2026',
    before: { time: '4 saat/gün', error: '%20 kayıp', staff: '2 kişi' },
    after: { time: '30 dakika/gün', error: '%0.1 kayıp', staff: '1 kişi (kontrol)' },
    savings: '₺320,000',
    timeSaved: '860 saat/yıl',
    chartData: [5, 8, 12, 18, 22, 28, 32, 35, 38, 42, 45, 48, 50, 52, 55, 58, 60, 62, 64, 65, 67, 68, 70, 71, 72, 73, 74, 75, 76, 77],
    versions: [
      { tag: 'v0.3', date: '01.02.2026', note: 'Geliştirme aşamasında' }
    ],
    owner: 'Merve Aktaş'
  },
  {
    name: 'Raporlama Agent',
    icon: '',
    status: 'dev',
    statusLabel: 'Geliştirmede',
    progress: 2,
    description: 'Yönetim raporlarını otomatik hazırlayan ve dağıtan agent.',
    launchDate: 'Mayıs 2026',
    before: { time: '6 saat/hafta', error: '%10 hata', staff: '2 kişi' },
    after: { time: '30 dakika/hafta', error: '%0.2 hata', staff: 'Tam otomatik' },
    savings: '₺280,000',
    timeSaved: '280 saat/yıl',
    chartData: [5, 10, 15, 20, 25, 28, 32, 35, 38, 42, 45, 48, 50, 52, 54, 56, 58, 60, 62, 63, 65, 66, 68, 69, 70, 71, 72, 73, 74, 75],
    versions: [
      { tag: 'v0.2', date: '05.02.2026', note: 'Prototip' }
    ],
    owner: 'Kerem Yıldırım'
  },
  {
    name: 'Güvenlik Agent',
    icon: '',
    status: 'dev',
    statusLabel: 'Geliştirmede',
    progress: 1,
    description: 'Finansal işlem güvenliğini izleyen ve şüpheli aktiviteleri tespit eden agent.',
    launchDate: 'Haziran 2026',
    before: { time: '8 saat/gün', error: '%25 kaçak', staff: '3 kişi' },
    after: { time: '1 saat/gün', error: '%1 kaçak', staff: '1 kişi (kontrol)' },
    savings: '₺1,200,000',
    timeSaved: '1,700 saat/yıl',
    chartData: [3, 5, 8, 12, 15, 18, 22, 25, 28, 30, 33, 35, 38, 40, 42, 45, 47, 48, 50, 52, 53, 55, 56, 58, 59, 60, 61, 62, 63, 64],
    versions: [
      { tag: 'v0.1', date: '01.02.2026', note: 'Konsept aşaması' }
    ],
    owner: 'Emre Öztürk'
  },
  {
    name: 'Uyum Agent',
    icon: '',
    status: 'dev',
    statusLabel: 'Geliştirmede',
    progress: 2,
    description: 'Yasal uyumluluk ve mevzuat takibi yapan agent.',
    launchDate: 'Temmuz 2026',
    before: { time: '5 saat/gün', error: '%8 hata', staff: '2 kişi' },
    after: { time: '30 dakika/gün', error: '%0.1 hata', staff: '1 kişi (kontrol)' },
    savings: '₺380,000',
    timeSaved: '1,100 saat/yıl',
    chartData: [2, 5, 8, 12, 16, 20, 24, 28, 32, 35, 38, 40, 42, 45, 48, 50, 52, 54, 56, 58, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    versions: [
      { tag: 'v0.2', date: '01.02.2026', note: 'Geliştirme aşamasında' }
    ],
    owner: 'Fatma Güneş'
  },
  {
    name: 'Yedekleme Agent',
    icon: '',
    status: 'maint',
    statusLabel: 'Bakımda',
    progress: 3,
    description: 'Veri yedekleme ve felaket kurtarma süreçlerini yöneten agent.',
    launchDate: 'Eylül 2025',
    before: { time: '3 saat/gün', error: '%5 hata', staff: '1 kişi' },
    after: { time: '15 dakika/gün', error: '%0.01 hata', staff: 'Tam otomatik' },
    savings: '₺190,000',
    timeSaved: '700 saat/yıl',
    chartData: [40, 45, 50, 55, 60, 65, 70, 72, 75, 78, 80, 82, 85, 87, 88, 90, 60, 55, 58, 62, 65, 68, 70, 72, 75, 78, 80, 82, 84, 85],
    versions: [
      { tag: 'v2.5', date: '01.02.2026', note: 'Bakım güncellemesi' }
    ],
    owner: 'Oğuz Kıran'
  },
  {
    name: 'Mail Agent',
    icon: '',
    status: 'maint',
    statusLabel: 'Bakımda',
    progress: 3,
    description: 'Mail tabanlı belge toplama ve sınıflandırma agenti.',
    launchDate: 'Ağustos 2025',
    before: { time: '2 saat/gün', error: '%12 hata', staff: '1 kişi' },
    after: { time: '10 dakika/gün', error: '%0.5 hata', staff: 'Tam otomatik' },
    savings: '₺150,000',
    timeSaved: '460 saat/yıl',
    chartData: [35, 40, 48, 55, 60, 65, 70, 75, 78, 80, 82, 85, 87, 88, 90, 85, 70, 65, 68, 72, 75, 78, 80, 82, 83, 84, 85, 86, 87, 88],
    versions: [
      { tag: 'v3.1', date: '08.02.2026', note: 'Hata düzeltme' }
    ],
    owner: 'Pınar Tekin'
  }
];

function renderAgents() {
  const grid = document.getElementById('agentGrid');
  const statusEl = document.getElementById('agentStatus');
  if (!grid || !statusEl) return;

  const counts = { active: 0, dev: 0, maint: 0 };
  agentsData.forEach(a => counts[a.status]++);

  statusEl.innerHTML = `
    <span class="status-badge"><span class="status-dot active"></span> Aktif: ${counts.active}</span>
    <span class="status-badge"><span class="status-dot dev"></span> Geliştirmede: ${counts.dev}</span>
    <span class="status-badge"><span class="status-dot maint"></span> Bakımda: ${counts.maint}</span>
  `;

  grid.innerHTML = agentsData.map((a, i) => `
    <div class="agent-card" data-index="${i}">
      <div class="card-icon">${a.icon}</div>
      <div class="card-name">${a.name}</div>
      <span class="card-status ${a.status}">
        <span class="status-dot ${a.status}"></span>
        ${a.statusLabel}
      </span>
      <div class="progress-dots">
        ${Array.from({ length: 5 }, (_, j) => `<span class="dot ${j < a.progress ? 'filled' : ''}"></span>`).join('')}
      </div>
    </div>
  `).join('');

  // Click handlers
  grid.querySelectorAll('.agent-card').forEach(card => {
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.index);
      showAgentModal(agentsData[idx]);
    });
  });
}

function showAgentModal(agent) {
  const maxChart = Math.max(...agent.chartData);
  const barsHTML = agent.chartData.map(v =>
    `<div class="bar" style="height: ${(v / maxChart) * 100}%"></div>`
  ).join('');

  const html = `
    <button class="modal-close">✕</button>
    <div class="modal-header">
      <span class="modal-icon">${agent.icon}</span>
      <div>
        <h2>${agent.name}</h2>
        <div class="modal-status">
          <span class="card-status ${agent.status}">
            <span class="status-dot ${agent.status}"></span>
            ${agent.statusLabel}
          </span>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <h3>📋 Genel Bilgi</h3>
      <p class="modal-description">${agent.description}</p>
      <div class="modal-meta">
        <span>📅 Devreye Alma: ${agent.launchDate}</span>
        <span>👤 Sorumlu: ${agent.owner}</span>
      </div>
    </div>

    <div class="modal-section">
      <h3>📊 Öncesi / Sonrası</h3>
      <div class="comparison-table">
        <div class="comparison-col before">
          <h4>Öncesi</h4>
          <div class="comparison-item">⏱️ ${agent.before.time}</div>
          <div class="comparison-item">❌ ${agent.before.error}</div>
          <div class="comparison-item">👥 ${agent.before.staff}</div>
        </div>
        <div class="comparison-col after">
          <h4>Sonrası</h4>
          <div class="comparison-item">⏱️ ${agent.after.time}</div>
          <div class="comparison-item">✅ ${agent.after.error}</div>
          <div class="comparison-item">🤖 ${agent.after.staff}</div>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <h3>💰 Kazanımlar</h3>
      <div class="savings-grid">
        <div class="savings-card">
          <div class="value">${agent.savings}</div>
          <div class="label">Yıllık Tasarruf</div>
        </div>
        <div class="savings-card">
          <div class="value">${agent.timeSaved}</div>
          <div class="label">Kazanılan Zaman</div>
        </div>
      </div>
    </div>

    <div class="modal-section">
      <h3>📈 Performans (Son 30 Gün)</h3>
      <div class="mini-chart">${barsHTML}</div>
    </div>

    <div class="modal-section">
      <h3>📜 Versiyon Geçmişi</h3>
      <ul class="version-list">
        ${agent.versions.map(v => `
          <li class="version-item">
            <span class="version-tag">${v.tag}</span>
            <span class="version-date">${v.date}</span>
            <span>${v.note}</span>
          </li>
        `).join('')}
      </ul>
    </div>

    <div class="modal-actions">
      <button class="btn btn-secondary" onclick="navigator.clipboard.writeText('${agent.name} - ${agent.statusLabel} - Tasarruf: ${agent.savings}'); alert('Kopyalandı!')">📋 Bilgileri Kopyala</button>
    </div>
  `;

  openModal(html);
}

document.addEventListener('DOMContentLoaded', renderAgents);
