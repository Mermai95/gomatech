# GOMATECH — contexto del proyecto

Sitio estático de GOMATECH (membrana líquida con caucho reciclado, Argentina).
Reescrito desde un archivo único (`gomatech_v9.html`, 15MB con imágenes/PDF en base64)
a una estructura multipágina real y liviana.

## Stack
HTML + CSS + JS vanilla. Sin frameworks, sin build step. Deploy en Netlify
(`gomatech-arg.netlify.app`), subida manual o vía Netlify CLI/drag&drop.

## Estructura
```
index.html          → Inicio
conocenos.html       → Quiénes somos
mayorista.html       → Página para revendedores + catálogo descargable
productos.html       → Fichas 4L y 20L
contacto.html        → Formulario + canales de contacto
css/styles.css       → Todo el CSS del sitio (dark theme, verde #3aad58, acento lima #c8f53a)
js/main.js           → Menú móvil, sanitización de form, animaciones scroll
assets/img/          → Fotos reales (jpg), nombradas img-01 a img-14
assets/catalogo-mayorista.pdf → Catálogo real para descarga en Mayorista
```

## Reglas de edición
- **No volver a embeber imágenes ni PDFs en base64.** Todo va como archivo real en `assets/`.
- Cada página repite el mismo `<header>` y `<footer>` (sitio estático puro, sin includes).
  Si se cambia el nav o el footer, hay que replicarlo en las 5 páginas.
- Precios están hardcodeados inline en cada HTML (`$18.900`, `$69.900`). Buscar y reemplazar
  en `index.html` y `productos.html` cuando cambien.
- Colores del sistema: verde `#3aad58`, acento lima `#c8f53a`, amarillo ML `#FFE600`,
  fondo negro `#000`/`#0d0d0d`/`#141414`. Fuente: Montserrat.
- El bloqueo de clic derecho / F12 de la versión anterior fue removido a propósito
  (no aporta seguridad real, rompe accesibilidad). No reagregar salvo pedido explícito.

## Pendientes conocidos
- Falta Google Analytics / Meta Pixel.
- Conectar dominio `gomatechargentina.com` a Netlify.
- Agregar productos nuevos cuando el cliente los suba a Tienda Nube (agregar tarjeta en
  `index.html` catálogo + ficha completa en `productos.html`).
- El PDF del catálogo pesa ~10MB — si crece, considerar comprimirlo (herramienta como
  Ghostscript o similar) para no inflar el repo.

## Links reales
- Tienda: https://gomatech.mitiendanube.com/
- WhatsApp: https://wa.link/ivrslh
- Email: gomatechargentina@gmail.com
- Instagram: @gomatech.argentina
