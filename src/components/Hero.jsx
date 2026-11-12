import { useEffect, useRef } from "react";

export default function Hero() {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const play = () => {
      const p = v.play();
      if (p && p.catch) p.catch(() => {});
    };
    play();
    v.addEventListener("canplay", play, { once: true });
    return () => v.removeEventListener("canplay", play);
  }, []);

  return (
    <section className="hero-v2" id="top">
      <div className="hero-v2-copy">
        <span className="hero-v2-pill">
          <span className="hero-v2-dot" />
          Open now · 82 Lady Musgrave Rd
        </span>

        <h1 className="hero-v2-title">
          <span className="hero-v2-line">TRINI</span>
          <span className="hero-v2-line hero-v2-line-2">YAAD</span>
        </h1>

        <p className="hero-v2-sub">
          Doubles, curry and jerk straight off the grill — served hot in the Dubwise Reggae Courtyard.
        </p>

        <div className="hero-v2-actions">
          <a className="hero-v2-cta" href="#menu">Order now · from $500</a>
          <a className="hero-v2-call" href="tel:+18763520139">Call the kitchen</a>
        </div>
      </div>

      <div className="hero-v2-card">
        <video
          ref={videoRef}
          className="hero-video"
          src="/hero-vibe.mp4"
          poster="/images/courtyard.jpg"
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
        />
      </div>
    </section>
  );
}