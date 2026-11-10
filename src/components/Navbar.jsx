import { useEffect, useState } from 'react';
import { navLinks } from '../data/site.js';
import { scrollToSection } from '../utils/navigation.js';

const Navbar = ({ cartCount, onOpenCart }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-35% 0px -55%', threshold: 0 });
    ['hero', ...navLinks.map((link) => link.id)].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => { window.removeEventListener('scroll', onScroll); observer.disconnect(); };
  }, []);

  const go = (event, id) => { event.preventDefault(); setOpen(false); scrollToSection(id); };

  return (
    <header className={scrolled ? 'site-nav scrolled' : 'site-nav'}>
      <button className="brand" type="button" onClick={(event) => go(event, 'hero')} aria-label="Trini-Yaad home">
        <img className="navbar-logo" src="/images/logo-clean.webp?v=3" width="240" height="96" fetchPriority="high" decoding="async" alt="Trini-Yaad at Dubwise Cafe" />
      </button>
      <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>
        <span /><span /><span className="sr-only">Menu</span>
      </button>
      <nav id="primary-nav" className={open ? 'nav-links open' : 'nav-links'} aria-label="Main navigation">
        {navLinks.map((link) => (
          <button key={link.id} className={active === link.id ? 'active' : ''} type="button" aria-current={active === link.id ? 'true' : undefined} onClick={(event) => go(event, link.id)}>
            {link.label}<span />
          </button>
        ))}
        <button className="nav-order" type="button" onClick={(event) => go(event, 'menu')}>Order food</button>
        <button className="nav-cart" type="button" onClick={onOpenCart} aria-label={`Open order tray, ${cartCount} items`}>
          Tray{cartCount > 0 && <b>{cartCount}</b>}
        </button>
      </nav>
    </header>
  );
};

export default Navbar;