const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export const trapFocus = (node) => {
  if (!node) return () => {};
  const previous = document.activeElement;
  const first = node.querySelector(FOCUSABLE);
  if (first) first.focus();
  const onKey = (event) => {
    if (event.key !== 'Tab') return;
    const items = [...node.querySelectorAll(FOCUSABLE)].filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const head = items[0];
    const tail = items[items.length - 1];
    if (event.shiftKey && document.activeElement === head) { event.preventDefault(); tail.focus(); }
    else if (!event.shiftKey && document.activeElement === tail) { event.preventDefault(); head.focus(); }
  };
  node.addEventListener('keydown', onKey);
  return () => {
    node.removeEventListener('keydown', onKey);
    if (previous && previous.focus) previous.focus();
  };
};

export const lockScroll = () => {
  const scrollbar = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = 'hidden';
  if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
  return () => {
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };
};