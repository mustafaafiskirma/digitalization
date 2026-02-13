/* ============================================
   APP.JS - Core application logic
   Theme, Navigation, Presentation Mode
   ============================================ */

// ── Theme Management ──
const themeToggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('mid-theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('mid-theme', next);
  });
}

// ── Mobile Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// ── Presentation Mode ──
const btnPresentation = document.getElementById('btnPresentation');
const presExit = document.getElementById('presExit');

if (btnPresentation) {
  btnPresentation.addEventListener('click', () => {
    document.body.classList.add('presentation-mode');
    document.documentElement.requestFullscreen?.();
  });
}

if (presExit) {
  presExit.addEventListener('click', () => {
    document.body.classList.remove('presentation-mode');
    document.exitFullscreen?.();
  });
}

// Arrow key navigation in presentation mode
document.addEventListener('keydown', (e) => {
  if (!document.body.classList.contains('presentation-mode')) return;
  if (e.key === 'Escape') {
    document.body.classList.remove('presentation-mode');
    document.exitFullscreen?.();
  }
  const sections = document.querySelectorAll('.section, .hero, .bulletins-section');
  const scrollY = window.scrollY;
  let currentIdx = 0;
  sections.forEach((sec, i) => {
    if (sec.offsetTop - 100 <= scrollY) currentIdx = i;
  });
  if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
    const next = sections[Math.min(currentIdx + 1, sections.length - 1)];
    next.scrollIntoView({ behavior: 'smooth' });
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
    const prev = sections[Math.max(currentIdx - 1, 0)];
    prev.scrollIntoView({ behavior: 'smooth' });
  }
});

// ── Modal Utilities ──
const modalOverlay = document.getElementById('modalOverlay');
const modalContent = document.getElementById('modalContent');

function openModal(html) {
  if (!modalOverlay || !modalContent) return;
  modalContent.innerHTML = html;
  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Close handlers
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  const closeBtn = modalContent.querySelector('.modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
}

function closeModal() {
  if (!modalOverlay) return;
  // Stop any playing video/audio inside the modal
  const video = modalContent?.querySelector('video');
  if (video) {
    video.pause();
    video.removeAttribute('src');
    video.load();
  }
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) closeModal();
});

// ── Scroll Animations ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.metric-card, .panel, .fan-container').forEach(el => {
    observer.observe(el);
  });

  // ── Hero Floating Keywords ──
  const floatContainer = document.getElementById('heroFloatingWords');
  if (floatContainer) {
    const keywords = [
      'Agent', 'Copilot', 'S/4HANA', 'Dashboard', 'Verimlilik',
      'Bülten', 'RPA', 'Power BI', 'Otomasyon', 'SAP', 'Python',
      'Machine Learning', 'Fatura', 'Rapor', 'Dijital İkiz', 'IoT',
      'Analitik', 'Workflow', 'ERP', 'API', 'Cloud', 'Data Lake',
      'GenAI', 'NLP', 'Chatbot', 'Fiori', 'ABAP', 'VBA', 'Excel',
      'Mutabakat', 'Risk Analizi', 'Konsolidasyon', 'Blockchain',
      'Deep Learning', 'Tahsilat', 'E-Fatura', 'Real-Time'
    ];

    function spawnWord() {
      const word = document.createElement('span');
      word.className = 'hero-floating-word';
      word.textContent = keywords[Math.floor(Math.random() * keywords.length)];

      const size = 0.8 + Math.random() * 2.2; // 0.8rem - 3rem
      const top = 5 + Math.random() * 85;      // 5% - 90% vertical
      const duration = 12 + Math.random() * 20; // 12s - 32s speed
      const opacity = 0.10 + Math.random() * 0.08; // visible opacity

      word.style.fontSize = size + 'rem';
      word.style.top = top + '%';
      word.style.animationDuration = duration + 's';
      word.style.opacity = opacity;

      floatContainer.appendChild(word);

      // Remove after animation completes
      setTimeout(() => {
        word.remove();
      }, duration * 1000);
    }

    // Spawn initial batch
    for (let i = 0; i < 12; i++) {
      setTimeout(() => spawnWord(), i * 600);
    }

    // Keep spawning
    setInterval(spawnWord, 1800);
  }
});
