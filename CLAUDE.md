# GOMATECH — contexto del proyecto

Sitio estático de GOMATECH (membrana líquida con caucho reciclado, Argentina).
Reescrito desde un archivo único (`gomatech_v9.html`, 15MB con imágenes/PDF en base64)
a una estructura liviana. Pasó por una etapa multipágina y hoy es **single-page**
con secciones ancla (ver "Estructura" abajo).

## Stack
HTML + CSS + JS vanilla, sin build step. Única dependencia con build/paquete es
GSAP + ScrollTrigger, **self-hosted** (no CDN) en `assets/js/vendor/` — ver
"Animaciones" abajo. Deploy en Netlify (`gomatech-arg.netlify.app`), subida
manual o vía Netlify CLI/drag&drop.

## Estructura
Sitio **single-page** (todo vive en `index.html`, con secciones ancla — no hay
páginas separadas ni includes):
```
index.html    → Header + hero slider + #quienes (incluye bloque de Valores)
                + #productos + #vender (formulario de distribuidores)
                + #contacto + footer + botón flotante de WhatsApp
css/styles.css → Todo el CSS del sitio, mobile-first (dark theme, verde #3aad58, lima #c8f53a)
js/main.js    → Menú móvil, slider del hero, formulario de distribuidores (placeholder),
                nav activo según sección visible, animaciones GSAP/ScrollTrigger.
assets/img/   → Fotos reales (jpg), nombradas img-01 a img-14 (algunas son duplicados
                casi idénticos entre sí: 03≈09, 04≈06, 08≈12)
assets/banner-latas/ → Imágenes de las latas de producto (lata-1.png a lata-5.png),
                usadas en el grid de la sección #productos (sin texto, sin precio).
assets/catalogo-mayorista.pdf → Catálogo real, botón de descarga dentro de #productos.
assets/js/vendor/ → GSAP + ScrollTrigger self-hosted (gsap.min.js, ScrollTrigger.min.js).
```
Los íconos (WhatsApp, Instagram, email, etc.) son un sprite de `<symbol>` SVG inline
al principio del `<body>` — no hay Font Awesome ni ninguna librería de íconos externa.

## Animaciones (GSAP + ScrollTrigger)
El sitio usa GSAP y ScrollTrigger para las animaciones de entrada al scroll
(reemplaza el IntersectionObserver que se usaba antes). Los archivos están
self-hosted en `assets/js/vendor/` — no se cargan desde un CDN externo, para
que el sitio siga sin depender de servicios de terceros en producción.
- Elementos con clase `reveal` se animan (fade + slide up) vía
  `ScrollTrigger.batch` en `js/main.js`. La clase `reveal` es sólo un hook
  para JS — no tiene reglas CSS propias, GSAP controla opacidad/transform.
- Todo corre dentro de `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`:
  si el usuario prefiere movimiento reducido, ese callback no corre y el
  contenido queda visible sin animar (no hay CSS que lo oculte por default).
- Si se agregan nuevos elementos animados, sumarles la clase `reveal` alcanza
  para que entren al sistema existente; no hace falta tocar el JS.

## Reglas de edición
- **No volver a embeber imágenes ni PDFs en base64.** Todo va como archivo real en `assets/`.
- **No traer librerías externas por CDN.** GSAP/ScrollTrigger son la única excepción
  y van self-hosted en `assets/js/vendor/` (ver "Animaciones"). Nada de Font Awesome
  ni jQuery. Si hace falta un ícono nuevo, agregar un `<symbol>` más al sprite SVG
  del `<body>`, no traer una librería de íconos.
- El sitio es **single-page con secciones ancla** (`#inicio`, `#quienes`, `#productos`,
  `#vender`, `#contacto`). No recrear páginas HTML separadas salvo pedido explícito.
- CTA principal en **todo** el sitio es WhatsApp (`wa.link/ivrslh`). La sección
  `#vender` ("Quiero Vender") está orientada a comercios/distribuidores (formulario
  propio), no a consumidor final — no reagregar links de compra directa ahí.
- **Sin precios en el sitio.** Es puramente informativo; la info de precio se maneja
  por WhatsApp. No reagregar montos en pesos salvo pedido explícito.
- Los cards de la grilla de `#productos` (`.product-item`, imágenes de
  `assets/banner-latas/`) todavía no linkean a ninguna ficha de producto
  (`data-product` como placeholder). Cuando existan fichas individuales, ese es
  el lugar para agregar el link.
- CSS escrito **mobile-first**: reglas base sin media query = mobile; `@media (min-width: …)`
  agrega layout de tablet/desktop. No volver al patrón desktop-first con `max-width`.
- Colores del sistema: verde `#3aad58`, acento lima `#c8f53a`, amarillo `#FFE600`,
  fondo negro `#000`/`#0d0d0d`/`#141414`. Fuente: Montserrat.
- El bloqueo de clic derecho / F12 de versiones anteriores fue removido a propósito
  (no aporta seguridad real, rompe accesibilidad). No reagregar salvo pedido explícito.

## Pendientes conocidos
- Falta Google Analytics / Meta Pixel.
- Conectar dominio `gomatechargentina.com` a Netlify.
- El formulario de `#vender` todavía no tiene backend real (el submit sólo hace
  `console.log` + `alert` en `js/main.js`). Falta conectarlo a algún servicio
  (Netlify Forms, un endpoint propio, etc.) cuando el cliente lo defina.
- Los cards de `#productos` no linkean a fichas de producto individuales todavía
  (ver "Reglas de edición").
- El PDF del catálogo pesa ~10MB — si crece, considerar comprimirlo (herramienta como
  Ghostscript o similar) para no inflar el repo.

## Links reales
- Tienda: https://gomatech.mitiendanube.com/
- WhatsApp: https://wa.link/ivrslh
- Email: gomatechargentina@gmail.com
- Instagram: @gomatech.argentina
