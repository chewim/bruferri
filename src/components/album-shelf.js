import { html } from '../lib/dom.js';
import { Icon } from './icon.js';
import { IconButton } from './icon-btn.js';
import { Track } from './track.js';

// Posición de cada funda (múltiplos de --sl): abanico en reposo; con uno elegido, al frente y los otros apilados.
const IDLE = [{ x: -0.62, y: 0.05, r: -8, s: 0.9, z: 1 }, { x: 0, y: 0, r: 0, s: 1, z: 3 }, { x: 0.62, y: 0.05, r: 8, s: 0.9, z: 2 }];

function place(i, active, side) {
  if (active === null) return { ...IDLE[i], vx: 0, vy: -0.24 };
  if (i === active) return { x: -0.3, y: 0, r: 0, s: 1.08, z: 5, vx: 0.4, vy: 0 };
  const top = side === 0;
  return { x: 0.92, y: top ? -0.34 : 0.34, r: top ? -4 : 4, s: 0.48, z: 2, vx: 0, vy: -0.2 };
}

// AlbumShelf · colección coleccionable; tocar un disco lo trae al frente con sus pistas
export function AlbumShelf({ albums, active = null, now = null }) {
  let side = 0;
  const al = active === null ? albums[1] : albums[active];
  const total = String(albums.length).padStart(2, '0');
  return html`<div class="bf-shelf" role="region" aria-label="Colección de discos" data-feature="shelf">
    <div class="bf-shelf__stage">
      <img class="bf-shelf__glow" src="${al.cover}" alt="" aria-hidden="true">
      ${albums.map((a, i) => {
        const p = place(i, active, i === active || active === null ? 0 : side++);
        return html`<button class="bf-shelf__item" type="button" style="--x: ${p.x}; --y: ${p.y}; --r: ${p.r}deg; --s: ${p.s}; --vx: ${p.vx}; --vy: ${p.vy}; --d: ${-i * 1.7}s; --z: ${p.z}" aria-pressed="${i === active ? 'true' : 'false'}" aria-label="${i === active ? '' : 'Ver '}${a.title}, ${a.year}" data-action="shelf-pick" data-index="${i}"${now && now.album === a.slug ? html` data-state="playing"` : ''}>
          <span class="bf-shelf__float">
            <span class="bf-shelf__vinyl" aria-hidden="true"><span class="bf-shelf__disc"><img class="bf-shelf__label" src="${a.cover}" alt=""></span></span>
            <img class="bf-shelf__cover" src="${a.cover}" alt="" width="208" height="208" loading="lazy">
            <span class="bf-shelf__num" aria-hidden="true">Nº ${a.num} · ${a.year}</span>
            ${a.isNew ? html`<span class="bf-shelf__new" aria-hidden="true">Nuevo</span>` : ''}
          </span>
        </button>`;
      })}
    </div>
    ${active === null
      ? html`<p class="t-caption t-muted bf-shelf__hint">Colección · ${albums.length} álbumes · toca un disco para escucharlo</p>`
      : html`<div class="bf-shelf__detail" aria-live="polite">
        <div class="bf-shelf__head">
          <div class="bf-shelf__titles"><p class="t-caption t-accent">Nº ${al.num} de ${total} · ${al.year}</p><p class="t-title">${al.title}</p></div>
          <div class="bf-shelf__actions">
            <button class="bf-btn bf-btn--primary bf-btn--s" type="button" data-action="shelf-play" data-index="0">${Icon('play', 's')}Escuchar</button>
            ${IconButton({ icon: 'close', label: 'Volver a la colección', size: 's', iconSize: 's', a: { 'data-action': 'shelf-back' } })}
          </div>
        </div>
        <div class="bf-tracks">
          ${al.tracks.map((t, i) => {
            const on = !!(now && now.album === al.slug && now.index === i);
            return Track({ n: String(i + 1).padStart(2, '0'), title: t.title, meta: on ? 'Sonando' : t.dur, current: on, a: { 'data-action': 'shelf-play', 'data-index': i } });
          })}
        </div>
        ${al.sample ? html`<p class="t-caption t-muted bf-shelf__note">Pistas de muestra hasta tener el listado real.</p>` : ''}
      </div>`}
  </div>`;
}
