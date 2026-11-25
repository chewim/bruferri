import { html } from '../../src/lib/dom.js';
import { Button } from '../../src/components/button.js';

// Footer · booking, contacto y créditos
export function Footer({ profile, year }) {
  const b = profile.booking;
  const credit = profile.hero.credit ? ` · Foto: ${profile.hero.credit}` : '';
  return html`<footer class="bf-footer">
    <div class="bf-container bf-footer__inner">
      <div class="bf-stack bf-stack--s">
        <p class="t-caption t-muted">${b.label}</p>
        <p class="t-title">${b.name}</p>
        <a class="t-body" href="mailto:${b.email}">${b.email}</a>
      </div>
      <div class="bf-row">
        ${Button({ label: 'Escríbele a Bru', variant: 'primary', a: { 'data-action': 'contact-open' } })}
        ${Button({ label: 'Trayectoria', variant: 'ghost', href: 'trayectoria/' })}
      </div>
      <p class="t-caption t-muted bf-span-all">© ${year} ${profile.name}${credit}</p>
    </div>
  </footer>`;
}
