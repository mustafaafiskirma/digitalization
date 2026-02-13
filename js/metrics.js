/* ============================================
   METRICS.JS - Count-up Animation Dashboard
   ============================================ */

const metricsData = [
    {
        icon: '📈',
        value: 23,
        prefix: '%',
        suffix: '',
        label: 'Verimlilik Artışı',
        change: '+%5',
        changeLabel: 'geçen aya göre',
        positive: true
    },
    {
        icon: '⏱️',
        value: 1240,
        prefix: '',
        suffix: ' saat',
        label: 'Kazanılan Zaman',
        change: '+%8',
        changeLabel: 'geçen aya göre',
        positive: true
    },
    {
        icon: '💰',
        value: 2.1,
        prefix: '₺',
        suffix: 'M',
        label: 'Yıllık Tasarruf',
        change: '+%12',
        changeLabel: 'geçen aya göre',
        positive: true
    },
    {
        icon: '🎯',
        value: 47,
        prefix: '',
        suffix: '',
        label: 'Tamamlanan Proje',
        change: '+3',
        changeLabel: 'geçen aya göre',
        positive: true
    }
];

function renderMetrics() {
    const grid = document.getElementById('metricsGrid');
    if (!grid) return;

    grid.innerHTML = metricsData.map((m, i) => `
    <div class="metric-card" data-index="${i}">
      <div class="metric-icon">${m.icon}</div>
      <div class="metric-value">
        <span class="prefix">${m.prefix}</span>
        <span class="count" data-target="${m.value}" data-decimals="${m.value % 1 !== 0 ? 1 : 0}">0</span>
        <span class="suffix">${m.suffix}</span>
      </div>
      <div class="metric-label">${m.label}</div>
      <div class="metric-change ${m.positive ? 'positive' : 'negative'}">
        ${m.positive ? '↑' : '↓'} ${m.change}
      </div>
      <div class="metric-change-label">${m.changeLabel}</div>
    </div>
  `).join('');

    // Count-up animation on scroll
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.count');
                counters.forEach(counter => animateCount(counter));
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    metricsObserver.observe(grid);
}

function animateCount(el) {
    const target = parseFloat(el.dataset.target);
    const decimals = parseInt(el.dataset.decimals) || 0;
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = eased * target;
        el.textContent = currentValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', renderMetrics);
