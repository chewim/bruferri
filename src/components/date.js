import { html } from '../lib/dom.js';

// DateBadge · día + mes. variant: next (acento) | outline (sobre foto)
export function DateBadge({ day, month, variant = '' }) {
  return html`<div class="bf-date${variant ? ` bf-date--${variant}` : ''}"><span class="bf-date__day">${day}</span><span class="bf-date__month">${month}</span></div>`;
}
