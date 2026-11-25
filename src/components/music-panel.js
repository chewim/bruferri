import { html } from '../lib/dom.js';
import { IconButton } from './icon-btn.js';
import { Track } from './track.js';

// MusicPanel · discos y pistas del disco activo (spec docs/specs/player-albumes.md)
export function MusicPanel({ albums, album, index, playing }) {
  return html`<button class="bf-music-scrim" type="button" tabindex="-1" aria-hidden="true" data-action="music-close"></button>
  <div class="bf-music" role="dialog" aria-label="Música">
    <div class="bf-music__head"><p class="t-title">Música</p>${IconButton({ icon: 'close', label: 'Cerrar', size: 's', iconSize: 's', a: { 'data-action': 'music-close' } })}</div>
    <div class="bf-music__group" role="listbox" aria-label="Discos">
      <p class="t-caption t-muted bf-music__label">Discos</p>
      ${albums.map((a) => html`<button class="bf-album-item" type="button" role="option" aria-selected="${a.slug === album.slug ? 'true' : 'false'}" data-action="album-pick" data-album="${a.slug}">
        <img src="${a.cover}" alt="" width="40" height="40" loading="lazy">
        <span class="bf-album-item__text"><span class="bf-album-item__title">${a.title}</span><span class="t-caption t-muted">${a.year}</span></span>
        ${a.slug === album.slug && playing ? html`<span class="bf-eq" aria-label="Sonando"><span></span><span></span><span></span></span>` : ''}
      </button>`)}
    </div>
    <div class="bf-music__group" aria-label="Pistas">
      <p class="t-caption t-muted bf-music__label">Pistas · ${album.title}</p>
      ${album.tracks.map((t, i) => Track({ n: String(i + 1).padStart(2, '0'), title: t.title, meta: t.dur, current: i === index, a: { 'data-action': 'track-pick', 'data-index': i } }))}
      ${album.sample ? html`<p class="t-caption t-muted bf-music__note">Pistas de muestra hasta tener el listado real.</p>` : ''}
    </div>
  </div>`;
}
