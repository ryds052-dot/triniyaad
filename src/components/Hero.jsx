import { useEffect, useRef } from 'react';
import { scrollToSection } from '../utils/navigation.js';
import { useOpenStatus } from '../hooks/useOpenStatus.js';

const Hero = () => {
  const root = useRef(null);
  const visual = useRef(null);
  const status = useOpenStatus();

  useEffect(() => {
    let context;
    if (window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches) return;
    const frame = window.requestAnimationFrame(() => {
      const idle = window.requestIdleCallback || ((cb) => window.setTimeout(cb, 180));
      idle(() => {
        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
          gsap.registerPlugin(ScrollTrigger);
          if (!root.current) return;
          context = gsap.context(() => {
            gsap.to('.hero-image', {
              yPercent: -10, scale: 1.08, ease: 'none',
              scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
            });
            gsap.to('.hero-orbit', {
              rotate: 12, y: -30,
              scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1 },
            });
          }, root);
        });
      });
    });
    return () => { window.cancelAnimationFrame(frame); if (context) context.revert(); };
  }, []);

  const tilt = (event) => {
    if (!visual.current || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = visual.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    visual.current.style.transform = `perspective(900px) rotateX(${y * -6}deg) rotateY(${x * 6}deg)`;
  };
  const resetTilt = () => {
    if (visual.current) visual.current.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <section id="hero" className="hero" ref={root}>
      <div className="hero-ambient ambient-red" aria-hidden="true" />
      <div className="hero-ambient ambient-green" aria-hidden="true" />
      <div className="hero-grid">
        <div className="hero-copy-column">
          <div className={status.open ? 'courtyard-status is-open' : 'courtyard-status'}>
            <span className="status-dot" aria-hidden="true" />
            <b>{status.text || 'Live at Dubwise Courtyard'}</b>
            <small>{status.clock} KINGSTON</small>
          </div>
          <h1 className="hero-title"><span className="line">TRINI</span><span className="line gold">YAAD</span></h1>
          <p className="hero-copy">Street food with island soul. Doubles, buss up shut, fried bake and bold Trini flavours in the heart of Kingston.</p>
          <div className="hero-actions">
            <button type="button" className="button button-primary magnetic" onClick={() => scrollToSection('menu')}>Explore the menu <span aria-hidden="true">↗</span></button>
            <button type="button" className="button button-ghost magnetic" onClick={() => scrollToSection('visit')}>Find the courtyard</button>
          </div>
        </div>
        <div className="hero-visual" ref={visual} onMouseMove={tilt} onMouseLeave={resetTilt}>
          <div className="hero-orbit" aria-hidden="true"><span>TRINI</span><span>YAAD</span></div>
          <div className="hero-frame">
            <img className="hero-image" src="/images/photo-3.webp?v=3" width="520" height="684" fetchPriority="high" decoding="async" alt="Authentic Trini doubles with channa, cucumber and Shado Beni" />
            <video className="hero-video" poster="/images/photo-3.webp?v=3" autoPlay muted loop playsInline preload="metadata">
          <source src="/hero-vibe.mp4?v=2" type="video/mp4" />
        </video>
            <span className="hero-image-vignette" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="kinetic-ribbon" role="note">
        <div className="kinetic-track">
          <span>DOUBLES • BUSS UP SHUT • BAKE & SHARK • CORN SOUP • ALOO PIE • SAHEENA • SHADO BENI SAUCE • DUBWISE REGGAE COURTYARD • 82 LADY MUSGRAVE RD • </span>
          <span aria-hidden="true">DOUBLES • BUSS UP SHUT • BAKE & SHARK • CORN SOUP • ALOO PIE • SAHEENA • SHADO BENI SAUCE • DUBWISE REGGAE COURTYARD • 82 LADY MUSGRAVE RD • </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;