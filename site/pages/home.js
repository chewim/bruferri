import { html } from '../../src/lib/dom.js';
import { getData } from '../../src/lib/api.js';
import { upcoming, present, todayISO } from '../../src/lib/dates.js';
import { PlayerBar } from '../../src/components/player-bar.js';
import { ContactSheet } from '../../src/components/contact-sheet.js';
import { Document } from './layout.js';
import { Hero } from '../sections/hero.js';
import { About } from '../sections/about.js';
import { Concerts } from '../sections/concerts.js';
import { Footer } from '../sections/footer.js';

// Inicio
export default async function home() {
  const { profile, concerts, albums } = await getData();
  const today = todayISO();
  const items = upcoming(concerts, today).map((c, i) => ({ ...present(c, profile.projects, today), isFirst: i === 0 }));
  const years = [...new Set(upcoming(concerts, today).map((c) => (c.date_start || c.date_end || c.date_tba).slice(0, 4)))];
  const album = albums.list.find((a) => a.slug === albums.default) || albums.list[0];
  const year = today.slice(0, 4);
  const body = html`${Hero({ profile, next: items[0] })}${About({ profile, albums })}${Concerts({ items, projects: profile.projects, year: years.join(' — ') })}${Footer({ profile, year })}`;
  const dock = html`<div class="bf-player-spacer"></div><div class="bf-dock-bottom" data-mount="player">${PlayerBar({ albums: albums.list, album })}</div>
  <div data-mount="contact">${ContactSheet({ booking: profile.booking, reasons: profile.contactReasons })}</div>`;
  return Document({
    title: `${profile.name} — ${profile.roles.join(', ').toLowerCase()}`,
    description: profile.description,
    image: profile.hero.src,
    profile,
    body,
    dock,
    data: { profile, concerts, albums }
  });
}
