/* ============================================
   TRAINING.JS - Training Corner Logic
   ============================================ */

const trainingData = {
  videos: [
    { title: 'Nomex Fatura Süreci', desc: 'Nomex fatura sürecinin detaylı anlatımı.', duration: '', icon: '🎬', videoFile: 'assets/videos/Nomex_Fatura_Sureci.mp4' },
    { title: 'Agent Kullanım Rehberi', desc: 'Agentları nasıl kullanacağınızı adım adım öğrenin.', duration: '5:32', icon: '🎬', videoFile: '' },
    { title: 'SAP Rapor Oluşturma', desc: 'SAP üzerinde özel rapor oluşturma eğitimi.', duration: '8:15', icon: '🎬', videoFile: '' },
    { title: 'Power BI Temelleri', desc: 'Power BI ile dashboard oluşturma temelleri.', duration: '12:45', icon: '🎬', videoFile: '' },
    { title: 'RPA Bot Geliştirme', desc: 'UiPath ile basit bir RPA botu geliştirin.', duration: '15:20', icon: '🎬', videoFile: '' },
    { title: 'Python ile Veri Analizi', desc: 'Pandas kütüphanesi ile veri analizi.', duration: '18:30', icon: '🎬', videoFile: '' },
    { title: 'Portal Kullanım Eğitimi', desc: 'Bu portal nasıl kullanılır?', duration: '3:45', icon: '🎬', videoFile: '' }
  ],
  docs: [
    { title: 'Fatura Agent Kılavuzu', desc: 'Fatura Agent kullanım kılavuzu.', format: 'PDF', icon: '📄' },
    { title: 'RPA Bot Kullanım Dökümanı', desc: 'RPA botlarının teknik dökümanı.', format: 'PDF', icon: '📄' },
    { title: 'Genel Portal Rehberi', desc: 'Portal kullanım rehberi.', format: 'PDF', icon: '📄' },
    { title: 'SAP FI Modül Rehberi', desc: 'SAP Finansal muhasebe modül rehberi.', format: 'PDF', icon: '📄' },
    { title: 'Veri Güvenliği Politikası', desc: 'Dijital veri güvenliği kuralları.', format: 'PDF', icon: '📄' },
    { title: 'API Entegrasyon Rehberi', desc: 'Dış sistemlerle entegrasyon rehberi.', format: 'PDF', icon: '📄' }
  ],
  quickstart: [
    { title: 'Hızlı Başlangıç: Agent', desc: '5 dakikada ilk agentınızı çalıştırın.', time: '5 dk', icon: '⚡' },
    { title: 'Hızlı Başlangıç: RPA', desc: 'İlk RPA botunuzu 10 dakikada kurun.', time: '10 dk', icon: '⚡' },
    { title: 'Hızlı Başlangıç: Power BI', desc: 'İlk dashboardunuzu oluşturun.', time: '15 dk', icon: '⚡' },
    { title: 'Hızlı Başlangıç: Portal', desc: 'Portalı etkili kullanmanın yolları.', time: '3 dk', icon: '⚡' }
  ],
  faq: [
    { q: 'Agent nedir ve nasıl çalışır?', a: 'Agent, belirli bir iş sürecini otomatik olarak yürüten yapay zeka destekli yazılım bileşenidir. Tanımlanan kurallara göre verileri işler, kararlar verir ve işlemleri gerçekleştirir.' },
    { q: 'Nasıl yeni bir proje talebi oluşturabilirim?', a: 'Footer bölümündeki "Talep Formu" linkine tıklayarak veya Teams kanalı üzerinden ekibimizle iletişime geçebilirsiniz.' },
    { q: 'Dark mode ayarı nerede?', a: 'Sağ üst köşedeki güneş/ay ikonuna tıklayarak dark ve light mod arasında geçiş yapabilirsiniz. Tercihiniz otomatik olarak kaydedilir.' },
    { q: 'Sunum modunu nasıl kullanırım?', a: 'Üst menüdeki "📺 Sunum" butonuna tıklayın. Tam ekran görünüme geçecektir. Ok tuşları ile bölümler arasında gezinebilir, ESC tuşu ile çıkabilirsiniz.' },
    { q: 'Verileri nasıl dışa aktarabilirim?', a: 'Her sayfa ve kartta export seçenekleri bulunmaktadır. PPT, PDF, PNG ve Excel formatlarında dışa aktarım yapabilirsiniz.' },
    { q: 'Bülten aboneliği nasıl yapılır?', a: 'Ana sayfadaki Bültenler bölümünde "📧 Abone Ol" butonuna tıklayarak aylık bültenlerimize abone olabilirsiniz.' },
    { q: 'Bir hata bulursam kime bildirmeliyim?', a: 'Teams kanalımız üzerinden veya Mustafa.Fiskirma@tupras.com.tr adresine mail göndererek hataları bildirebilirsiniz.' }
  ]
};

const tabNames = [
  { key: 'videos', label: '🎬 Video Eğitimler' },
  { key: 'docs', label: '📄 Dökümanlar' },
  { key: 'quickstart', label: '⚡ Quick Start' },
  { key: 'faq', label: '❓ SSS' }
];

let activeTab = 'videos';
let searchQuery = '';

function renderTrainingTabs() {
  const el = document.getElementById('trainingTabs');
  if (!el) return;

  el.innerHTML = tabNames.map(t =>
    `<button class="tab-btn ${t.key === activeTab ? 'active' : ''}" data-tab="${t.key}">${t.label}</button>`
  ).join('');

  el.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      renderTrainingTabs();
      renderTrainingContent();
    });
  });
}

function renderTrainingContent() {
  const container = document.getElementById('trainingContent');
  if (!container) return;

  if (activeTab === 'faq') {
    renderFAQ(container);
    return;
  }

  const items = trainingData[activeTab];
  const filtered = searchQuery
    ? items.filter(i => i.title.toLowerCase().includes(searchQuery) || i.desc.toLowerCase().includes(searchQuery))
    : items;

  if (filtered.length === 0) {
    container.innerHTML = '<div style="text-align:center; color: var(--text-muted); padding: 48px;">Sonuç bulunamadı.</div>';
    return;
  }

  container.innerHTML = `
    <div class="training-grid">
      ${filtered.map(item => {
    let meta = '';
    if (item.duration) meta = `${item.duration}`;
    else if (item.format) meta = `${item.format}`;
    else if (item.time) meta = `${item.time}`;

    const hasVideo = item.videoFile ? 'data-video="' + item.videoFile + '"' : '';
    const clickHint = item.videoFile ? '<div style="margin-top:8px;font-size:0.75rem;color:var(--neon-blue);">▶ Tıkla ve izle</div>' : '';

    return `
          <div class="training-card" ${hasVideo} style="${item.videoFile ? 'cursor:pointer;' : ''}">
            <div class="card-type-icon">${item.icon}</div>
            <div class="card-title">${item.title}</div>
            <div class="card-desc">${item.desc}</div>
            <div class="card-meta">${meta}</div>
            ${clickHint}
          </div>
        `;
  }).join('')}
    </div>
  `;

  // Attach click handlers for video cards
  container.querySelectorAll('.training-card[data-video]').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.video;
      const title = card.querySelector('.card-title').textContent;
      const html = `
          <button class="modal-close">✕</button>
          <div class="modal-header"><h2>🎬 ${title}</h2></div>
          <div style="margin-top:var(--space-lg);">
            <video controls autoplay style="width:100%;max-height:70vh;border-radius:var(--radius-md);background:#000;">
              <source src="${src}" type="video/mp4">
              Tarayıcınız video etiketini desteklemiyor.
            </video>
          </div>
        `;
      if (typeof openModal === 'function') openModal(html);
    });
  });
}

function renderFAQ(container) {
  const filtered = searchQuery
    ? trainingData.faq.filter(f => f.q.toLowerCase().includes(searchQuery) || f.a.toLowerCase().includes(searchQuery))
    : trainingData.faq;

  container.innerHTML = `
    <div class="faq-list">
      ${filtered.map((f, i) => `
        <div class="faq-item" id="faq-${i}">
          <button class="faq-question" onclick="toggleFAQ(${i})">
            ${f.q}
            <span class="arrow" style="transition: transform 0.3s;">▼</span>
          </button>
          <div class="faq-answer">${f.a}</div>
        </div>
      `).join('')}
    </div>
  `;
}

function toggleFAQ(index) {
  const item = document.getElementById(`faq-${index}`);
  if (item) item.classList.toggle('open');
}

// Search
function initSearch() {
  const input = document.getElementById('trainingSearch');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.toLowerCase();
    renderTrainingContent();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTrainingTabs();
  renderTrainingContent();
  initSearch();
});
