import { hours, site } from '../data/site.js';

const toLabel = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? 'pm' : 'am';
  return `${h % 12 === 0 ? 12 : h % 12}${m ? `:${String(m).padStart(2, '0')}` : ''}${suffix}`;
};

const kingstonNow = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return {
    day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday),
    minutes: Number(map.hour) * 60 + Number(map.minute),
  };
};

export const pickupSlots = () => {
  const { day, minutes } = kingstonNow();
  const build = (dayIndex, from) => {
    const window = hours.find((entry) => entry.day === dayIndex);
    if (!window) return [];
    const start = Math.max(window.open, from);
    const end = window.close - site.pickup.lastOrderBeforeClose;
    const out = [];
    for (let at = start; at <= end; at += site.pickup.slotMinutes) {
      out.push({ value: String(at), label: `${toLabel(at)}${dayIndex !== day ? ' (tomorrow)' : ''}` });
    }
    return out;
  };
  const today = build(day, minutes + site.pickup.leadMinutes);
  return today.length >= 3 ? today.slice(0, 24) : [...today, ...build((day + 1) % 7, 0).slice(0, 16)];
};