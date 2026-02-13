/* ============================================
   BULLETINS – FAN / ARC CARD LAYOUT
   ============================================ */
(function () {

  // ── Data ──
  // coverImage: path to image in assets/bulletins/ (jpg/png)
  // pdfFile   : path to PDF in assets/bulletins/
  const bulletins = [
    {
      id: 1,
      month: 'Ocak',
      year: 2026,
      title: 'Toplantılarda Copilot',
      topic: 'AI',
      coverImage: 'assets/bulletins/ocak-2026.jpg',
      pdfFile: 'assets/bulletins/ocak-2026.pdf',
      icon: '🤖',
      mostRead: true,
      summary: 'Teams Copilot ile toplantı özetleri ve aksiyon yönetimi.'
    },
    {
      id: 6,
      month: 'Eylül',
      year: 2026,
      title: 'Tüketici Yolculuğu',
      topic: 'Pazarlama',
      coverImage: 'assets/bulletins/tuketici-yolculugu.jpg',
      pdfFile: 'assets/bulletins/tuketici-yolculugu.pdf',
      icon: '🛣️',
      mostRead: false,
      summary: 'Müşteri deneyimini iyileştirmek için tüketici yolculuğu.'
    },
    {
      id: 2,
      month: 'Şubat',
      year: 2026,
      title: 'Yapay Zeka',
      topic: 'AI',
      coverImage: 'assets/bulletins/yapay-zeka.jpg',
      pdfFile: 'assets/bulletins/yapay-zeka.pdf',
      icon: '🧠',
      mostRead: false,
      summary: 'Yapay zeka teknolojilerindeki son gelişmeler.'
    },
    {
      id: 3,
      month: 'Aralık',
      year: 2026,
      title: 'Blockchain',
      topic: 'Teknoloji',
      coverImage: 'assets/bulletins/blockchain.jpg',
      pdfFile: 'assets/bulletins/blockchain.pdf',
      icon: '🔗',
      mostRead: false,
      summary: 'Blokzincir teknolojisi ve iş dünyasındaki uygulamaları.'
    },
    {
      id: 4,
      month: 'Kasım',
      year: 2026,
      title: 'MS To-Do',
      topic: 'Verimlilik',
      coverImage: 'assets/bulletins/ms-to-do.jpg',
      pdfFile: 'assets/bulletins/ms-to-do.pdf',
      icon: '✅',
      mostRead: false,
      summary: 'Microsoft To-Do ile işlerinizi daha iyi organize edin.'
    },
    {
      id: 5,
      month: 'Ekim',
      year: 2026,
      title: 'SAP Analizi',
      topic: 'SAP',
      coverImage: 'assets/bulletins/sap-analysis.jpg',
      pdfFile: 'assets/bulletins/sap-analysis.pdf',
      icon: '�',
      mostRead: false,
      summary: 'SAP sistemleri üzerine detaylı analizler.'
    },
    {
      id: 7,
      month: 'Ağustos',
      year: 2026,
      title: 'Kahvaltı',
      topic: 'Yaşam',
      coverImage: 'assets/bulletins/kahvaltı.jpg',
      pdfFile: 'assets/bulletins/kahvaltı.pdf',
      icon: '🥐',
    }
  ];

  const topics = ['Tümü', ...new Set(bulletins.map(b => b.topic))];
  let activeIndex = 0;
  let filteredBulletins = [...bulletins];

  // ── DOM ──
  const fanContainer = document.getElementById('fanContainer');
  const detailPanel = document.getElementById('activeBulletinDetail');
  const filtersEl = document.getElementById('bulletinFilters');
  const btnPrev = document.getElementById('fanPrev');
  const btnNext = document.getElementById('fanNext');

  if (!fanContainer) return;

  // ── Render Filters ──
  function renderFilters() {
    filtersEl.innerHTML = topics.map((t, i) =>
      `<button class="filter-btn${i === 0 ? ' active' : ''}" data-topic="${t}">${t}</button>`
    ).join('');

    filtersEl.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        filtersEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const topic = btn.dataset.topic;
        filteredBulletins = topic === 'Tümü' ? [...bulletins] : bulletins.filter(b => b.topic === topic);
        activeIndex = 0;
        renderFan();
      });
    });
  }

  // ── Position cards in a fan/arc ──
  function renderFan() {
    // Remove existing cards (keep nav buttons)
    fanContainer.querySelectorAll('.fan-card').forEach(c => c.remove());

    const total = filteredBulletins.length;
    if (total === 0) {
      detailPanel.innerHTML = '<p style="color:var(--text-muted)">Bu kategoride bülten bulunmuyor.</p>';
      return;
    }

    // Clamp activeIndex
    if (activeIndex < 0) activeIndex = 0;
    if (activeIndex >= total) activeIndex = total - 1;

    // Create cards
    filteredBulletins.forEach((b, i) => {
      const card = document.createElement('div');
      card.className = 'fan-card' + (i === activeIndex ? ' active' : '');
      card.dataset.index = i;

      const coverHTML = b.coverImage
        ? `<img class="card-cover" src="${b.coverImage}" alt="${b.title}" onerror="this.outerHTML='<div class=\\'card-cover-placeholder\\'>${b.icon}</div>'">`
        : `<div class="card-cover-placeholder">${b.icon}</div>`;

      card.innerHTML = `
        ${b.mostRead ? '<span class="most-read">⭐ En Çok Okunan</span>' : ''}
        ${coverHTML}
        <div class="card-info">
          <div class="card-month">${b.month}</div>
          <div class="card-year">${b.year}</div>
          <div class="card-title-sm">${b.title}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (i === activeIndex) {
          // Already active — open detail modal
          openBulletinModal(b);
        } else {
          activeIndex = i;
          layoutCards();
          updateDetail();
        }
      });

      fanContainer.appendChild(card);
    });

    layoutCards();
    updateDetail();
  }

  // ── Open Bulletin Detail Modal ──
  function openBulletinModal(b) {
    const coverHTML = b.coverImage
      ? `<img src="${b.coverImage}" alt="${b.title}" style="width:100%;max-height:300px;object-fit:cover;border-radius:var(--radius-md);margin-bottom:var(--space-lg);" onerror="this.style.display='none'">`
      : `<div style="width:100%;height:160px;display:flex;align-items:center;justify-content:center;font-size:4rem;background:linear-gradient(135deg,var(--navy),var(--navy-light));border-radius:var(--radius-md);margin-bottom:var(--space-lg);color:rgba(255,255,255,0.5);">${b.icon}</div>`;

    const html = `
      <button class="modal-close">✕</button>
      ${coverHTML}
      <div class="modal-header">
        <h2>${b.icon} ${b.title}</h2>
        <div class="modal-status">${b.month} ${b.year} • ${b.topic}</div>
      </div>

      <div class="modal-section">
        <h3>📝 İçerik Özeti</h3>
        <p class="modal-description">${b.summary}</p>
      </div>

      ${b.highlights ? `
      <div class="modal-section">
        <h3>🔑 Öne Çıkanlar</h3>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:var(--space-sm);">
          ${b.highlights.map(h => `<li style="display:flex;align-items:center;gap:var(--space-sm);font-size:0.9rem;color:var(--text-secondary);">✦ ${h}</li>`).join('')}
        </ul>
      </div>
      ` : ''}

      <div class="modal-section">
        <h3>📊 Bilgiler</h3>
        <div class="modal-meta">
          <span>📅 ${b.month} ${b.year}</span>
          <span>🏷️ ${b.topic}</span>
          ${b.mostRead ? '<span class="most-read">⭐ En Çok Okunan</span>' : ''}
        </div>
      </div>

      <div class="modal-actions">
        <button class="btn btn-primary" onclick="window.open('${b.pdfFile}', '_blank')">📄 PDF Görüntüle</button>
        <button class="btn btn-secondary" onclick="navigator.clipboard.writeText('${b.title} - ${b.month} ${b.year}'); alert('Kopyalandı!')">📋 Paylaş</button>
      </div>
    `;

    // Use global openModal from app.js
    if (typeof openModal === 'function') {
      openModal(html);
    }
  }

  // ── Position cards with fan transforms ──
  function layoutCards() {
    const cards = fanContainer.querySelectorAll('.fan-card');
    const total = cards.length;

    cards.forEach((card, i) => {
      const offset = i - activeIndex; // -N..0..+N distance from center
      const absOffset = Math.abs(offset);

      // Toggle active class
      card.classList.toggle('active', i === activeIndex);

      // Fan spread: rotation and horizontal offset
      const rotation = offset * 8;   // degrees of tilt
      const xShift = offset * 120;   // horizontal spread pixels
      const yShift = absOffset * 12; // slight downward for non-center
      const scale = i === activeIndex ? 1.15 : Math.max(0.7, 1 - absOffset * 0.08);
      const zIndex = 20 - absOffset;

      // Hide cards that are too far away
      if (absOffset > 4) {
        card.style.opacity = '0';
        card.style.pointerEvents = 'none';
        card.style.transform = `translateX(${xShift}px) translateY(${yShift}px) rotate(${rotation}deg) scale(${scale})`;
        card.style.zIndex = zIndex;
      } else {
        card.style.opacity = '';
        card.style.pointerEvents = '';
        card.style.transform = `translateX(${xShift}px) translateY(${yShift}px) rotate(${rotation}deg) scale(${scale})`;
        card.style.zIndex = zIndex;
      }
    });
  }

  // ── Update detail panel ──
  function updateDetail() {
    const b = filteredBulletins[activeIndex];
    if (!b) return;

    detailPanel.innerHTML = `
      <h3>${b.title}</h3>
      <div class="detail-meta">${b.month} ${b.year}  •  ${b.topic}  •  ${b.summary}</div>
      <div class="detail-actions">
        <button class="btn btn-primary" onclick="window.open('${b.pdfFile}', '_blank')">📄 PDF Görüntüle</button>
        <button class="btn btn-secondary" onclick="navigator.clipboard.writeText('${b.title} - ${b.month} ${b.year}'); alert('Kopyalandı!')">📋 Paylaş</button>
      </div>
    `;
  }

  // ── Nav buttons ──
  btnPrev.addEventListener('click', () => {
    if (activeIndex > 0) {
      activeIndex--;
      layoutCards();
      updateDetail();
    }
  });

  btnNext.addEventListener('click', () => {
    if (activeIndex < filteredBulletins.length - 1) {
      activeIndex++;
      layoutCards();
      updateDetail();
    }
  });

  // ── Init ──
  renderFilters();
  renderFan();

})();
