import { html } from '../../src/lib/dom.js';
import { getData } from '../../src/lib/api.js';
import { Button } from '../../src/components/button.js';
import { Document } from './layout.js';

// 404 · siempre con salida
export default async function notFound() {
  const { profile } = await getData();
  const body = html`<section class="bf-section"><div class="bf-container bf-stack">
    <p class="t-caption t-accent">Error 404</p>
    <h1 class="t-heading">Esta página no existe (todavía).</h1>
    <p class="t-body-l t-muted t-measure">Puede que la dirección haya cambiado con la nueva web.</p>
    <div class="bf-row">${Button({ label: 'Volver al inicio', variant: 'primary', href: './' })}${Button({ label: 'Próximos conciertos', variant: 'ghost', href: './#conciertos' })}</div>
  </div></section>`;
  return Document({ title: `Página no encontrada — ${profile.name}`, description: profile.description, profile, body, data: { profile } });
}
