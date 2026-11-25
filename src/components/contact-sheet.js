import { html } from '../lib/dom.js';
import { Icon } from './icon.js';
import { IconButton } from './icon-btn.js';
import { Chip } from './chip.js';

// ContactSheet · hasta tener la función de envío (Supabase + Resend), "Enviar" abre el correo con el mensaje listo.
export function ContactSheet({ booking, reasons, reason = 'programacion', subject = '' }) {
  return html`<div class="bf-sheet-scrim" data-feature="contact" hidden>
    <section class="bf-sheet" role="dialog" aria-modal="true" aria-labelledby="contact-title">
      <div class="bf-sheet__head">
        <div class="bf-stack bf-stack--s"><p class="t-caption t-accent">Contacta</p><h2 id="contact-title" class="bf-sheet__title">¿Hablamos?</h2></div>
        ${IconButton({ icon: 'close', label: 'Cerrar', a: { 'data-action': 'contact-close' } })}
      </div>
      <form class="bf-sheet__form" data-action="contact-send">
        <div class="bf-booking">
          <p class="t-caption t-muted">${booking.label}</p>
          <p class="t-title">${booking.name}</p>
          <a class="t-body" href="mailto:${booking.email}">${booking.email}</a>
        </div>
        <fieldset class="bf-field">
          <legend>Motivo</legend>
          <div class="bf-chips" role="group" aria-label="Motivo">
            ${reasons.map((r) => Chip({ label: r.label, pressed: r.id === reason, a: { 'data-action': 'contact-reason', 'data-reason': r.id } }))}
          </div>
        </fieldset>
        <div class="bf-field"><label for="cf-name">Nombre</label><input id="cf-name" name="name" class="bf-input" type="text" autocomplete="name" placeholder="Tu nombre" required></div>
        <div class="bf-field"><label for="cf-email">Email</label><input id="cf-email" name="email" class="bf-input" type="email" autocomplete="email" placeholder="tu@email.com" required></div>
        <div class="bf-field">
          <label for="cf-msg">Mensaje</label>
          ${subject ? html`<p class="t-label t-accent bf-sheet__subject">Asunto: ${subject}</p>` : ''}
          <textarea id="cf-msg" name="message" class="bf-input bf-input--area" placeholder="Cuéntale qué necesitas: fecha, lugar, formato…" required></textarea>
        </div>
        <button class="bf-btn bf-btn--primary bf-btn--block" type="submit">Enviar${Icon('send')}</button>
        <p class="t-caption t-muted bf-sheet__note">Se abrirá tu programa de correo con el mensaje listo para enviar a ${booking.name}.</p>
      </form>
    </section>
  </div>`;
}
