import { useEffect, useState } from 'react';
import { hours, dayNames, site } from '../data/site.js';

const nowInKingston = () => {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: site.tz, weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
  }).formatToParts(new Date());
  const map = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(map.weekday);
  return { day, minutes: Number(map.hour) * 60 + Number(map.minute), clock: `${map.hour}:${map.minute}` };
};

const label = (mins) => {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}${m ? `:${String(m).padStart(2, '0')}` : ''}${suffix}`;
};

export const useOpenStatus = () => {
  const [state, setState] = useState({ open: false, text: '', clock: '' });

  useEffect(() => {
    const evaluate = () => {
      const { day, minutes, clock } = nowInKingston();
      const today = hours.find((entry) => entry.day === day);
      if (today && minutes >= today.open && minutes <= today.close) {
        setState({ open: true, text: `Open now · closes ${label(today.close)}`, clock });
        return;
      }
      if (today && minutes < today.open) {
        setState({ open: false, text: `Opens today ${label(today.open)}`, clock });
        return;
      }
      const next = hours.find((entry) => entry.day === (day + 1) % 7) || hours.find((entry) => entry.day === (day + 2) % 7);
      setState({ open: false, text: next ? `Closed · ${dayNames[next.day]} ${label(next.open)}` : 'Closed', clock });
    };
    evaluate();
    const timer = window.setInterval(evaluate, 30000);
    return () => window.clearInterval(timer);
  }, []);

  return state;
};