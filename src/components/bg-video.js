import { html } from '../lib/dom.js';
import { Icon } from './icon.js';

// BgVideo · vídeo de fondo decorativo, sin sonido y en bucle, con botón de pausa (WCAG 2.2.2).
// Con `src` usa un <video> propio; con `youtube` (provisional) la feature inserta el iframe al acercarse.
// Con "reducir movimiento" se queda el póster.
export function BgVideo({ src = null, youtube = null, poster = '', label = '' }) {
  return html`<div class="bf-bgvideo" data-feature="bgvideo"${youtube ? html` data-youtube="${youtube}"` : ''}>
    ${poster ? html`<img class="bf-bgvideo__poster" src="${poster}" alt="" aria-hidden="true" loading="lazy">` : ''}
    ${src ? html`<video class="bf-bgvideo__media" src="${src}"${poster ? html` poster="${poster}"` : ''} muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>` : ''}
    <div class="bf-bgvideo__shade"></div>
    <button class="bf-icon-btn bf-icon-btn--s bf-bgvideo__toggle" type="button" aria-label="Pausar el vídeo de fondo: ${label}" aria-pressed="false" data-action="bgvideo-toggle" hidden>${Icon('pause', 's')}</button>
  </div>`;
}
