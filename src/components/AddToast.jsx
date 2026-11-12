import { useEffect, useRef, useState } from "react";

export default function AddToast({ cart }) {
  const [item, setItem] = useState(null);
  const prev = useRef(cart.count);
  const timer = useRef(null);

  useEffect(() => {
    if (cart.count > prev.current) {
      const last = cart.lines[cart.lines.length - 1];
      setItem({ name: (last && last.name) || "Item", count: cart.count });
      if (navigator.vibrate) navigator.vibrate(14);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setItem(null), 3800);
    }
    prev.current = cart.count;
  }, [cart.count, cart.lines]);

  useEffect(() => () => clearTimeout(timer.current), []);

  const close = () => { clearTimeout(timer.current); setItem(null); };
  const open = () => { close(); cart.setOpen(true); };

  return (
    <div className={"add-toast" + (item ? " is-on" : "")} role="status" aria-live="polite">
      <button type="button" className="add-toast-body" onClick={open}>
        <span className="add-toast-tick" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <span className="add-toast-text">
          <b>{item ? item.name : ""} added</b>
          <i>{item ? item.count : 0} in your tray · tap to view</i>
        </span>
        <span className="add-toast-go" aria-hidden="true">View tray</span>
      </button>
      <button type="button" className="add-toast-x" onClick={close} aria-label="Dismiss">×</button>
      <span className="add-toast-bar" aria-hidden="true" />
    </div>
  );
}