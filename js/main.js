// GOMATECH — main.js
// Menú móvil, slider del hero, formulario de distribuidores (placeholder),
// nav activo según sección visible y animaciones con GSAP + ScrollTrigger
// (self-hosted en assets/js/vendor, ver CLAUDE.md).

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

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

// ── Formulario "Quiero Vender" (placeholder, todavía sin backend) ──
(function initVenderForm() {
  const form = document.getElementById('venderForm');
  if (!form) return;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    console.log('Formulario de distribuidores (placeholder, sin backend):', data);
    alert('¡Gracias! Recibimos tus datos y te vamos a contactar pronto.');
    form.reset();
  });
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

// ── Animaciones (GSAP + ScrollTrigger) ──
if (window.gsap && window.ScrollTrigger) {
  const mm = gsap.matchMedia();

  // Sólo anima si el usuario no pidió movimiento reducido. Si prefiere
  // reduced-motion, este callback nunca corre y el contenido queda visible
  // tal cual (no hay CSS que lo oculte por default).
  mm.add('(prefers-reduced-motion: no-preference)', () => {
    const revealTargets = gsap.utils.toArray('.reveal');
    let batchTriggers = [];

    if (revealTargets.length) {
      gsap.set(revealTargets, { autoAlpha: 0, y: 30 });
      batchTriggers = ScrollTrigger.batch(revealTargets, {
        start: 'top 88%',
        onEnter: els => gsap.to(els, {
          autoAlpha: 1, y: 0, duration: .7, stagger: .08, ease: 'power2.out', overwrite: true
        })
      });
    }

    // Hero: entrada al cargar la página (arriba del fold, no depende de scroll)
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.hero-kicker', { autoAlpha: 0, y: 24, duration: .7 })
      .from('.hero h1', { autoAlpha: 0, y: 30, duration: .8 }, '-=.45')
      .from('.hero-sub', { autoAlpha: 0, y: 24, duration: .7 }, '-=.5')
      .from('.hero-content .btn-wa-lg', { autoAlpha: 0, y: 20, duration: .6 }, '-=.4');

    return () => {
      heroTl.kill();
      batchTriggers.forEach(st => st.kill());
    };
  });
}
