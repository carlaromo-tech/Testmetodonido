/* ============================================================
   script.js — GSAP 3 + ScrollTrigger + Lenis
   5 movimientos definidos en el briefing de diseño
   ============================================================ */

/* ------------------------------------------------------------
   SMOOTH SCROLL — Lenis
   ------------------------------------------------------------ */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* Conectar Lenis con GSAP ScrollTrigger */
lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* ------------------------------------------------------------
   NAV — fondo al hacer scroll 100px
   ------------------------------------------------------------ */
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('nav--scrolled');
  } else {
    nav.classList.remove('nav--scrolled');
  }
}, { passive: true });

/* ------------------------------------------------------------
   GSAP — registrar plugin
   ------------------------------------------------------------ */
gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------
   MOVIMIENTO 1: Hero — blob respirando
   EDITAR: ajustar scale y duration si se desea más/menos movimiento
   ------------------------------------------------------------ */
gsap.to('.hero__blob', {
  scale: 1.03,
  duration: 3,
  ease: 'sine.inOut',
  yoyo: true,
  repeat: -1,
  transformOrigin: 'center center',
});

/* ------------------------------------------------------------
   MOVIMIENTO 2: Pensamientos — reveal escalonado
   4 citas: opacity 0→1, translateY 8px→0, stagger 200ms
   Trigger: sección a 80% del viewport
   ------------------------------------------------------------ */
gsap.from('.b2__cita', {
  opacity: 0,
  y: 8,
  duration: 0.7,
  ease: 'power2.out',
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.b2-pensamientos',
    start: 'top 80%',
    toggleActions: 'play none none none',
  },
});

/* Reveal del cierre del bloque 2 */
gsap.from('.b2__cierre', {
  opacity: 0,
  y: 8,
  duration: 0.7,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.b2__cierre',
    start: 'top 85%',
    toggleActions: 'play none none none',
  },
});

/* Corregir opacity al completar (GSAP from no la fija a 1 en todos los browsers) */
ScrollTrigger.create({
  trigger: '.b2-pensamientos',
  start: 'top 80%',
  onEnter: () => {
    gsap.set('.b2__cita', { clearProps: 'opacity,transform' });
  },
  once: true,
});

/* ------------------------------------------------------------
   MOVIMIENTO 4: Sesiones — números con trazado SVG
   Línea vertical coral se "dibuja" al scroll (stroke-dashoffset)
   Stagger entre sesiones: 0.15s
   EDITAR: ajustar duration si se quiere más lento/rápido
   ------------------------------------------------------------ */
document.querySelectorAll('.b5__linea line').forEach((line, i) => {
  gsap.to(line, {
    strokeDashoffset: 0,
    duration: 1,
    ease: 'power2.inOut',
    delay: i * 0.15,
    scrollTrigger: {
      trigger: line.closest('.b5__sesion'),
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });
});

/* Reveal suave de cada sesión */
gsap.utils.toArray('.b5__sesion').forEach((sesion, i) => {
  gsap.from(sesion, {
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: 'power2.out',
    delay: i * 0.1,
    scrollTrigger: {
      trigger: sesion,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  });
});

/* ------------------------------------------------------------
   MOVIMIENTO 3 (CSS): transición de fondos entre bloques
   Implementado en CSS con padding-top extra y gradientes.
   No requiere JS adicional.
   ------------------------------------------------------------ */

/* ------------------------------------------------------------
   MOVIMIENTO 5 (CSS): CTA final — gradiente animado
   Implementado íntegramente en CSS (.b8-cta animation).
   No requiere JS adicional.
   ------------------------------------------------------------ */
