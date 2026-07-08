// GOMATECH — main.js
// Menú móvil, sanitización de formulario y animaciones de scroll.
// Nota: se sacó el bloqueo de clic derecho / F12 de la versión anterior.
// No aporta seguridad real (cualquiera ve el código fuente igual) y sólo
// generaba fricción con usuarios legítimos y accesibilidad.

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

// Animaciones de entrada al hacer scroll
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.style.opacity = '1';
      e.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: .08 });

document.querySelectorAll('.prod-card,.big-prod-card,.val-card,.may-ben-card').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = `opacity .5s ${i * .07}s ease, transform .5s ${i * .07}s ease, border-color .3s, background .3s`;
  obs.observe(el);
});
