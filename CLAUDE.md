# GOMATECH — contexto del proyecto

Sitio estático de GOMATECH (membrana líquida con caucho reciclado, Argentina).
Reescrito desde un archivo único (`gomatech_v9.html`, 15MB con imágenes/PDF en base64)
a una estructura liviana. Pasó por una etapa multipágina y hoy es **single-page**
con secciones ancla (ver "Estructura" abajo).

## Stack
HTML + CSS + JS vanilla. Sin frameworks, sin build step. Deploy en Netlify
(`gomatech-arg.netlify.app`), subida manual o vía Netlify CLI/drag&drop.

## Estructura
Sitio **single-page** (todo vive en `index.html`, con secciones ancla — no hay
páginas separadas ni includes):
```
index.html    → Header + hero slider + #quienes + #productos + #donde + #catalogo
                + #contacto + footer + botón flotante de WhatsApp
css/styles.css → Todo el CSS del sitio, mobile-first (dark theme, verde #3aad58, lima #c8f53a)
js/main.js    → Menú móvil, slider del hero, reveal on-scroll (IntersectionObserver),
                nav activo según sección visible. Vanilla JS puro, sin librerías.
assets/img/   → Fotos reales (jpg), nombradas img-01 a img-14 (algunas son duplicados
                casi idénticos entre sí: 03≈09, 04≈06, 08≈12)
assets/catalogo-mayorista.pdf → Catálogo real, linkeado desde #catalogo
```
Los íconos (WhatsApp, Instagram, email, etc.) son un sprite de `<symbol>` SVG inline
al principio del `<body>` — no hay Font Awesome ni ninguna librería de íconos externa.

## Reglas de edición
- **No volver a embeber imágenes ni PDFs en base64.** Todo va como archivo real en `assets/`.
- **No usar frameworks ni librerías externas** (ni GSAP, ni Font Awesome, ni jQuery).
  La única dependencia externa son las Google Fonts (Montserrat). Si hace falta un ícono
  nuevo, agregar un `<symbol>` más al sprite SVG del `<body>`, no traer una librería.
- El sitio es **single-page con secciones ancla** (`#inicio`, `#quienes`, `#productos`,
  `#donde`, `#catalogo`, `#contacto`). No recrear páginas HTML separadas salvo pedido
  explícito del usuario.
- CTA principal en **todo** el sitio es WhatsApp (`wa.link/ivrslh`). Tienda Nube
  (`gomatech.mitiendanube.com`) es secundaria, sólo en la sección "Dónde Comprar".
- Precios están hardcodeados inline en `index.html` (`$18.900`, `$69.900`). Buscar y
  reemplazar ahí cuando cambien.
- CSS escrito **mobile-first**: reglas base sin media query = mobile; `@media (min-width: …)`
  agrega layout de tablet/desktop. No volver al patrón desktop-first con `max-width`.
- Colores del sistema: verde `#3aad58`, acento lima `#c8f53a`, amarillo `#FFE600`,
  fondo negro `#000`/`#0d0d0d`/`#141414`. Fuente: Montserrat.
- El bloqueo de clic derecho / F12 de versiones anteriores fue removido a propósito
  (no aporta seguridad real, rompe accesibilidad). No reagregar salvo pedido explícito.

## Pendientes conocidos
- Falta Google Analytics / Meta Pixel.
- Conectar dominio `gomatechargentina.com` a Netlify.
- Agregar productos nuevos cuando el cliente los suba a Tienda Nube (agregar tarjeta
  nueva en `.catalog-grid`, sección `#productos` de `index.html`).
- El PDF del catálogo pesa ~10MB — si crece, considerar comprimirlo (herramienta como
  Ghostscript o similar) para no inflar el repo.

## Links reales
- Tienda: https://gomatech.mitiendanube.com/
- WhatsApp: https://wa.link/ivrslh
- Email: gomatechargentina@gmail.com
- Instagram: @gomatech.argentina
