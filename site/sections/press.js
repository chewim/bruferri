import { html } from '../../src/lib/dom.js';
import { PressQuote } from '../../src/components/press-quote.js';

// Press · prueba social justo después de la portada: primero la impresión, después quien la avala,
// luego el detalle (bio, discos, fechas). Sección propia y con aire para que la cita se recuerde.
export function Press({ profile }) {
  if (!profile.press?.length) return '';
  return html`<section class="bf-press" aria-label="Qué dicen de ${profile.name}">
    <div class="bf-container bf-grid">${profile.press.map((p) => PressQuote(p))}</div>
  </section>`;
}
