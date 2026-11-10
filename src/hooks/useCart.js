import { useCallback, useEffect, useMemo, useState } from 'react';
import { dishById, money } from '../data/menu.js';
import { site, wa } from '../data/site.js';

const KEY = 'ty-cart-v1';

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
    return raw && typeof raw === 'object' ? raw : {};
  } catch {
    return {};
  }
};

export const useCart = () => {
  const [lines, setLines] = useState(load);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  const setQty = useCallback((id, qty, options = {}) => {
    setLines((current) => {
      const next = { ...current };
      if (qty <= 0) { delete next[id]; return next; }
      next[id] = { qty, pepper: options.pepper ?? current[id]?.pepper ?? '', sauces: options.sauces ?? current[id]?.sauces ?? [] };
      return next;
    });
  }, []);

  const bump = useCallback((id, delta, options) => {
    setLines((current) => {
      const qty = Math.max(0, (current[id]?.qty || 0) + delta);
      const next = { ...current };
      if (qty === 0) { delete next[id]; return next; }
      next[id] = { qty, pepper: options?.pepper ?? current[id]?.pepper ?? '', sauces: options?.sauces ?? current[id]?.sauces ?? [] };
      return next;
    });
  }, []);

  const setOptions = useCallback((id, field, value) => {
    setLines((current) => (current[id] ? { ...current, [id]: { ...current[id], [field]: value } } : current));
  }, []);

  const clear = useCallback(() => setLines({}), []);

  const items = useMemo(() => Object.entries(lines)
    .filter(([id]) => dishById[id])
    .map(([id, line]) => ({ ...dishById[id], ...line })), [lines]);

  const count = items.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = items.reduce((sum, item) => sum + item.qty * item.price, 0);

  const message = ({ mode, name, phone, slot, address, note }) => {
    const body = items.map((item) => {
      const extras = [item.pepper, item.sauces?.length ? `Sauce: ${item.sauces.join(', ')}` : ''].filter(Boolean).join(' · ');
      return `${item.qty} × ${item.name} — ${money(item.price * item.qty)}${extras ? ` (${extras})` : ''}`;
    }).join('\n');
    return [
      'Hi Trini-Yaad! New order.',
      mode === 'delivery' ? `DELIVERY to: ${address}` : `PICKUP at: ${slot}`,
      `Name: ${name}`,
      phone && `Phone: ${phone}`,
      '',
      body,
      '',
      `Subtotal: ${money(subtotal)} JMD`,
      mode === 'delivery' ? 'Delivery fee to be quoted.' : '',
      note && `Note: ${note}`,
      '',
      `Sent from trini-yaad.vercel.app · ${site.currency}`,
    ].filter(Boolean).join('\n');
  };

  const sendHref = (details) => wa(message(details));

  return { lines, items, count, subtotal, open, setOpen, setQty, bump, setOptions, clear, sendHref };
};