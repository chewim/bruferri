import { getData } from '../src/lib/api.js';
import { initPlayer } from './features/player/index.js';
import { initShelf } from './features/shelf/index.js';
import { initAgenda } from './features/agenda/index.js';
import { initContact } from './features/contact/index.js';
import { initLang } from './features/lang/index.js';

// Arranca solo las features presentes en la página
const data = await getData();
const $ = (s) => document.querySelector(s);

if ($('[data-feature="lang"]')) initLang($('[data-feature="lang"]'));
const contact = $('[data-feature="contact"]') ? initContact($('[data-feature="contact"]'), data) : null;
if ($('[data-mount="player"]')) initPlayer($('[data-mount="player"]'), data);
if ($('[data-mount="shelf"]')) initShelf($('[data-mount="shelf"]'), data);
if ($('#conciertos')) initAgenda($('#conciertos'), data, { onInfo: (subject) => contact?.open(subject) });
