// GOMATECH — main.js
// Menú móvil, slider del hero, reveal al scroll (IntersectionObserver) y
// resaltado del link de nav activo. Todo vanilla JS, sin librerías externas.

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Cerrar el menú móvil al tocar un link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
  });
});

// ── Hero slider ──
(function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  let current = 0;
  let timer;

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startAutoplay() {
    timer = setInterval(next, 5000);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startAutoplay();
    });
  });

  startAutoplay();
})();

// ── Reveal al hacer scroll ──
(function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .1, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
})();

// ── Link de nav activo según la sección visible ──
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[data-section]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { threshold: 0, rootMargin: '-45% 0px -50% 0px' });

  sections.forEach(section => observer.observe(section));
})();
