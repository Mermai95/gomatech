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

// ── Red de seguridad para saltos de ancla (#inicio, #productos, etc.) ──
// El salto de ancla nativo del browser es instantáneo (sin `scroll-behavior:
// smooth` de CSS acá — GSAP ScrollTrigger no lo detecta bien y las animaciones
// `.reveal` de la sección de destino pueden quedar trabadas en opacidad 0).
// Como el salto es instantáneo, ScrollTrigger.batch a veces no llega a
// "engancharlo": por eso, además, mostramos de una los `.reveal` que quedan
// por encima del punto de destino para que nunca se queden invisibles.
(function initAnchorRevealSafety() {
  function forceRevealUpTo(target) {
    if (!window.gsap) return;
    const header = document.querySelector('header');
    const headerH = header ? header.offsetHeight : 0;
    const limit = target.getBoundingClientRect().top + window.scrollY - headerH + window.innerHeight;
    document.querySelectorAll('.reveal').forEach(el => {
      const elDocTop = el.getBoundingClientRect().top + window.scrollY;
      if (elDocTop < limit) gsap.set(el, { autoAlpha: 1, y: 0 });
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    const id = link.getAttribute('href');
    if (id.length < 2) return;
    link.addEventListener('click', () => {
      const target = document.querySelector(id);
      if (target) forceRevealUpTo(target);
    });
  });

  // Si se entra directo con un hash en la URL (ej. link compartido a #productos)
  if (location.hash) {
    const target = document.querySelector(location.hash);
    if (target) window.addEventListener('load', () => forceRevealUpTo(target));
  }
})();

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

// ── Ficha de producto (modal) ──
(function initProductModal() {
  const modal = document.getElementById('productModal');
  if (!modal) return;

  const img = document.getElementById('productModalImg');
  const name = document.getElementById('productModalName');
  const sizes = document.getElementById('productModalSizes');
  const desc = document.getElementById('productModalDesc');
  let lastFocused = null;

  function openModal(card) {
    img.src = card.querySelector('img').src;
    img.alt = card.querySelector('img').alt;
    name.textContent = card.dataset.name || '';
    sizes.textContent = card.dataset.sizes || '';
    desc.textContent = card.dataset.desc || '';
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.product-modal-close').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  document.querySelectorAll('.product-item[data-product]').forEach(card => {
    card.addEventListener('click', () => openModal(card));
  });

  modal.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', closeModal);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
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
