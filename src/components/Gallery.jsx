import { useEffect, useRef, useState } from 'react';
import { galleryImages } from '../data/events.js';
import { lockScroll, trapFocus } from '../utils/focus.js';

const Gallery = () => {
  const [index, setIndex] = useState(-1);
  const modal = useRef(null);
  const open = index >= 0;

  useEffect(() => {
    if (!open) return;
    const releaseScroll = lockScroll();
    const releaseFocus = trapFocus(modal.current);
    const onKey = (event) => {
      if (event.key === 'Escape') setIndex(-1);
      if (event.key === 'ArrowRight') setIndex((i) => (i + 1) % galleryImages.length);
      if (event.key === 'ArrowLeft') setIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
    };
    document.addEventListener('keydown', onKey);
    return () => { releaseScroll(); releaseFocus(); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-heading">
        <p className="eyebrow">From the courtyard</p>
        <h2>The food, <em>the yard.</em></h2>
      </div>
      <ul className="gallery-grid">
        {galleryImages.map((image, i) => (
          <li key={image.src} className={i === 0 ? 'gallery-item wide' : 'gallery-item'}>
            <button type="button" onClick={() => setIndex(i)} aria-label={`View larger: ${image.caption}`}>
              <img src={image.src} alt={image.alt} loading="lazy" decoding="async" width="800" height="800" />
              <span>{image.caption}</span>
            </button>
          </li>
        ))}
      </ul>
      <a className="text-link gallery-cta" href="https://instagram.com/triniyaad" target="_blank" rel="noopener noreferrer">
        More on Instagram <b aria-hidden="true">↗</b>
      </a>

      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={modal} onMouseDown={() => setIndex(-1)}>
          <button className="modal-close" type="button" onClick={() => setIndex(-1)} aria-label="Close viewer">×</button>
          <figure onMouseDown={(event) => event.stopPropagation()}>
            <img src={galleryImages[index].src} alt={galleryImages[index].alt} />
            <figcaption>{galleryImages[index].caption}</figcaption>
          </figure>
          <div className="lightbox-nav" onMouseDown={(event) => event.stopPropagation()}>
            <button type="button" onClick={() => setIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length)} aria-label="Previous photo">←</button>
            <span>{index + 1} / {galleryImages.length}</span>
            <button type="button" onClick={() => setIndex((i) => (i + 1) % galleryImages.length)} aria-label="Next photo">→</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;