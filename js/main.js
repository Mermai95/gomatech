// GOMATECH — main.js
// Menú móvil, sanitización de formulario y animaciones con GSAP/ScrollTrigger.
// Nota: se sacó el bloqueo de clic derecho / F12 de la versión anterior.
// No aporta seguridad real (cualquiera ve el código fuente igual) y sólo
// generaba fricción con usuarios legítimos y accesibilidad.

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

function enviarFormulario() {
  const nombre = document.getElementById('nombre').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();
  if (!nombre || !email || !mensaje) {
    alert('Por favor completá nombre, email y mensaje.');
    return;
  }
  const subject = encodeURIComponent('Consulta web - ' + nombre);
  const body = encodeURIComponent('Nombre: ' + nombre + '\nEmail: ' + email + '\n\n' + mensaje);
  window.open('mailto:gomatechargentina@gmail.com?subject=' + subject + '&body=' + body);
  document.getElementById('contactForm').style.display = 'none';
  document.getElementById('formSuccess').style.display = 'block';
}

// Sanitizar inputs del formulario (evita inyección básica de HTML)
document.querySelectorAll('.form-input, .form-textarea').forEach(input => {
  input.addEventListener('input', function () {
    this.value = this.value.replace(/<[^>]*>/g, '').replace(/[<>'"]/g, '');
  });
});

// ── Animaciones (GSAP + ScrollTrigger) ──
if (window.gsap && window.ScrollTrigger) {

  const mm = gsap.matchMedia();

  // Reveal genérico al hacer scroll (reemplaza el IntersectionObserver anterior)
  const revealTargets = gsap.utils.toArray(
    '.prod-card,.big-prod-card,.val-card,.may-ben-card,.feature-item,.ch-item'
  );
  if (revealTargets.length) {
    gsap.set(revealTargets, { autoAlpha: 0, y: 24 });
    ScrollTrigger.batch(revealTargets, {
      start: 'top 88%',
      onEnter: batch => gsap.to(batch, {
        autoAlpha: 1, y: 0, duration: .6, stagger: .08, ease: 'power2.out', overwrite: true
      })
    });
  }

  // Marquee de la franja verde: velocidad reactiva al scroll
  const track = document.querySelector('.strip-track');
  if (track) {
    // el track se duplica en el HTML, así que -50% es un loop perfecto
    const marquee = gsap.to(track, { xPercent: -50, duration: 20, ease: 'none', repeat: -1 });
    ScrollTrigger.create({
      onUpdate: self => {
        const boost = gsap.utils.clamp(0, 3.5, Math.abs(self.getVelocity()) / 400);
        gsap.to(marquee, { timeScale: 1 + boost, duration: .35, overwrite: true });
      }
    });
  }

  // Hero: reveal tipo "sello" + ghost typography con parallax sutil
  const hero = document.querySelector('#hero');
  if (hero) {
    mm.add(
      { motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' },
      ctx => {
        if (ctx.conditions.reduce) {
          gsap.set('.hero-kicker,.h1-line,.hero-sub,.hero-actions,.hero-promo,.hero-card,.hero-ribbon,.tread-stat', { autoAlpha: 1, y: 0, rotation: 0, scale: 1 });
          const counter = hero.querySelector('[data-count]');
          if (counter) counter.textContent = counter.dataset.count + '%';
          return;
        }

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.from('.hero-kicker', { autoAlpha: 0, y: 14, duration: .6 })
          .from('.h1-line', { yPercent: 110, rotation: 2, transformOrigin: 'left bottom', stagger: .12, duration: .9 }, '-=.3')
          .from('.hero-sub', { autoAlpha: 0, y: 16, duration: .6 }, '-=.45')
          .from('.hero-actions > *', { autoAlpha: 0, y: 14, stagger: .08, duration: .5 }, '-=.35')
          .from('.hero-promo', { autoAlpha: 0, duration: .5 }, '-=.25')
          .from('.hero-card', { autoAlpha: 0, y: 30, rotation: -4, scale: .94, duration: 1, ease: 'back.out(1.5)' }, '-=.9')
          .from('.hero-ribbon', { autoAlpha: 0, x: -18, duration: .5 }, '-=.4')
          .from('.tread-stat', { autoAlpha: 0, y: 12, stagger: .1, duration: .5 }, '-=.5');

        const counter = hero.querySelector('[data-count]');
        if (counter) {
          const target = +counter.dataset.count;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 1.2, ease: 'power2.out', delay: .5,
            onUpdate: () => counter.textContent = Math.round(obj.val) + '%'
          });
        }

        return () => tl.kill();
      }
    );

    // Ghost typography: parallax vertical leve al scrollear el hero
    mm.add('(min-width: 901px)', () => {
      const parallax = gsap.to('.hero-ghost', {
        yPercent: 18, ease: 'none',
        scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true }
      });
      return () => parallax.scrollTrigger && parallax.scrollTrigger.kill();
    });
  }
}
