import { useEffect, useMemo, useRef, useState } from 'react';
import { money } from '../data/menu.js';
import { site } from '../data/site.js';
import { pickupSlots } from '../utils/slots.js';
import { lockScroll, trapFocus } from '../utils/focus.js';

const CartDrawer = ({ cart }) => {
  const panel = useRef(null);
  const [mode, setMode] = useState('pickup');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [slot, setSlot] = useState('');
  const [note, setNote] = useState('');
  const slots = useMemo(() => pickupSlots(), []);

  useEffect(() => {
    if (!cart.open) return;
    if (!slot && slots.length) setSlot(slots[0].value);
    const releaseScroll = lockScroll();
    const releaseFocus = trapFocus(panel.current);
    const onKey = (event) => { if (event.key === 'Escape') cart.setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { releaseScroll(); releaseFocus(); document.removeEventListener('keydown', onKey); };
  }, [cart.open, slot, slots, cart]);

  if (!cart.open) return null;

  const slotLabel = slots.find((entry) => entry.value === slot)?.label || '';
  const belowMinimum = mode === 'delivery' && cart.subtotal < site.delivery.minimum;
  const valid = name.trim() && cart.count > 0 && (mode === 'pickup' ? slot : address.trim()) && !belowMinimum;
  const href = cart.sendHref({ mode, name, phone, slot: slotLabel, address, note });

  return (
    <div className="drawer-backdrop" onMouseDown={() => cart.setOpen(false)}>
      <aside className="order-drawer" ref={panel} role="dialog" aria-modal="true" aria-label="Your order" onMouseDown={(event) => event.stopPropagation()}>
        <div className="drawer-head">
          <div><p>Your tray</p><h3>Checkout</h3></div>
          <button onClick={() => cart.setOpen(false)} aria-label="Close order drawer">×</button>
        </div>

        {cart.count === 0 ? <p className="empty-order">Tray&apos;s empty. Add something from the menu.</p> : (
          <>
            <div className="order-list">
              {cart.items.map((item) => (
                <div className="order-item" key={item.id}>
                  <div>
                    <b>{item.qty} × {item.name}</b>
                    {item.pepper && <small>{item.pepper}</small>}
                    {item.sauces?.length > 0 && <small>Sauce: {item.sauces.join(', ')}</small>}
                    <div className="order-item-stepper">
                      <button type="button" onClick={() => cart.bump(item.id, -1)} aria-label={`One fewer ${item.name}`}>−</button>
                      <button type="button" onClick={() => cart.bump(item.id, 1)} aria-label={`One more ${item.name}`}>+</button>
                    </div>
                  </div>
                  <strong>{money(item.price * item.qty)}</strong>
                </div>
              ))}
            </div>
            <div className="order-total"><span>Subtotal</span><strong>{money(cart.subtotal)} <small>JMD</small></strong></div>

            <div className="mode-switch" role="group" aria-label="Pickup or delivery">
              <button type="button" className={mode === 'pickup' ? 'active' : ''} aria-pressed={mode === 'pickup'} onClick={() => setMode('pickup')}>Pickup</button>
              <button type="button" className={mode === 'delivery' ? 'active' : ''} aria-pressed={mode === 'delivery'} onClick={() => setMode('delivery')}>Delivery</button>
            </div>

            <div className="order-form">
              <label>Name<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" /></label>
              <label>Phone<input value={phone} onChange={(event) => setPhone(event.target.value)} inputMode="tel" autoComplete="tel" /></label>
              {mode === 'pickup' ? (
                <label>Pickup time
                  <select value={slot} onChange={(event) => setSlot(event.target.value)}>
                    {slots.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}
                  </select>
                </label>
              ) : (
                <label>Address
                  <textarea value={address} onChange={(event) => setAddress(event.target.value)} rows={2} placeholder="Street, area, landmark" />
                  <small className="field-note">We deliver to {site.delivery.areas.join(', ')}. {site.delivery.note}</small>
                  {belowMinimum && <small className="field-warn">Minimum {money(site.delivery.minimum)} for delivery.</small>}
                </label>
              )}
              <label>Note (optional)<textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} /></label>
            </div>

            <a className={valid ? 'whatsapp-button' : 'whatsapp-button disabled'} href={valid ? href : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!valid}>
              Send order on WhatsApp <span aria-hidden="true">↗</span>
            </a>
            <button type="button" className="clear-cart" onClick={cart.clear}>Clear tray</button>
            <div className="order-channels">
              <a href={`tel:${site.phone}`}>Call {site.phoneDisplay}</a>
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">Instagram DM @{site.instagram.toUpperCase()}</a>
              <p>Also on 7Krave &amp; QuickCart</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;