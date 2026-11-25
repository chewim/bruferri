import { on } from '../../../src/lib/dom.js';
import { Icon } from '../../../src/components/icon.js';

// Opiniones: avanzan solas cuando la barra se llena (animationend), se pausan con el ratón encima,
// con el foco dentro, con el botón o fuera de la vista. Con "reducir movimiento" no avanzan solas.
export function initTestimonials(root) {
  const slides = [...root.querySelectorAll('.bf-testimonials__slide')];
  const steps = [...root.querySelectorAll('.bf-testimonials__step')];
  const btn = root.querySelector('[data-action="testimonial-toggle"]');
  if (slides.length < 2) { root.querySelector('.bf-testimonials__nav').hidden = true; return; }
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let i = 0;
  let userPaused = still;
  const holds = new Set();

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach((s, k) => { s.dataset.state = k === i ? 'on' : 'off'; s.toggleAttribute('aria-hidden', k !== i); });
    // reinicia la barra del tramo activo
    steps.forEach((b, k) => { b.setAttribute('aria-current', 'false'); if (k === i) { void b.offsetWidth; b.setAttribute('aria-current', 'true'); } });
  }
  function sync() {
    const paused = userPaused || holds.size > 0;
    root.dataset.paused = String(paused);
    root.dataset.static = String(still);
    btn.setAttribute('aria-pressed', String(userPaused));
    btn.setAttribute('aria-label', userPaused ? 'Reanudar las opiniones' : 'Pausar las opiniones');
    btn.innerHTML = String(Icon(userPaused ? 'play' : 'pause', 's'));
  }
  const hold = (k, on) => { on ? holds.add(k) : holds.delete(k); sync(); };

  steps.forEach((b) => b.querySelector('.bf-testimonials__fill').addEventListener('animationend', () => { if (b.getAttribute('aria-current') === 'true') show(i + 1); }));
  on(root, 'click', '[data-action="testimonial-go"]', (e, el) => show(Number(el.dataset.index)));
  on(root, 'click', '[data-action="testimonial-toggle"]', () => { userPaused = !userPaused; sync(); });
  root.addEventListener('mouseenter', () => hold('hover', true));
  root.addEventListener('mouseleave', () => hold('hover', false));
  root.addEventListener('focusin', () => hold('focus', true));
  root.addEventListener('focusout', (e) => { if (!root.contains(e.relatedTarget)) hold('focus', false); });
  new IntersectionObserver(([e]) => hold('offscreen', !e.isIntersecting)).observe(root);
  if (still) btn.hidden = true;
  show(0);
  sync();
}
