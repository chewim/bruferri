import { html } from '../lib/dom.js';
import { Icon } from './icon.js';
import { IconButton } from './icon-btn.js';
import { MusicPanel } from './music-panel.js';

// PlayerBar · en pausa al cargar, nunca autoplay. El panel de música se abre hacia arriba.
export function PlayerBar({ albums, album, index = 0, playing = false, open = false, elapsed = '0:00', pct = 0, announce = '' }) {
  const track = album.tracks[index];
  return html`<div class="bf-player" role="region" aria-label="Reproductor">
    ${open ? MusicPanel({ albums, album, index, playing }) : ''}
    <div class="bf-player__bar">
      <button class="bf-player__left" type="button" aria-haspopup="dialog" aria-expanded="${open ? 'true' : 'false'}" aria-label="Cambiar de disco o de pista. Disco actual: ${album.title}" data-action="music-toggle">
        <span class="bf-player__cover" aria-hidden="true"><img src="${album.cover}" alt="" width="56" height="56"></span>
        <span class="bf-player__meta">
          <span class="bf-player__track">${track.title}</span>
          <span class="bf-player__album">${album.title} · ${album.year}${Icon('chevronUp', 's', 'bf-player__chev')}</span>
        </span>
      </button>
      <div class="bf-player__center">
        <div class="bf-player__controls">
          <span class="bf-player__skip">${IconButton({ icon: 'prev', label: 'Anterior', variant: 'bare', a: { 'data-action': 'prev' } })}</span>
          ${IconButton({ icon: playing ? 'pause' : 'play', label: playing ? 'Pausar' : 'Reproducir', variant: 'accent', a: { 'data-action': 'play-pause', 'aria-pressed': playing ? 'true' : 'false' } })}
          <span class="bf-player__skip">${IconButton({ icon: 'next', label: 'Siguiente', variant: 'bare', a: { 'data-action': 'next' } })}</span>
        </div>
        <div class="bf-progress" role="progressbar" aria-label="Progreso" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct}">
          <span>${elapsed}</span>
          <div class="bf-progress__track"><div class="bf-progress__fill" style="--pct: ${pct}%"></div></div>
          <span>${track.dur}</span>
        </div>
      </div>
      <div class="bf-player__end">${IconButton({ icon: 'list', label: 'Discos y pistas', variant: 'bare', a: { 'data-action': 'music-toggle' } })}</div>
    </div>
    <p class="bf-sr" aria-live="polite">${announce}</p>
  </div>`;
}
