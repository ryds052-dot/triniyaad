import { scrollToSection } from '../utils/navigation.js';
import { site } from '../data/site.js';

const Footer = () => (
  <footer className="site-footer">
    <div className="footer-brand">
      <img src="/images/photo-1.webp?v=5" width="240" height="180" loading="lazy" decoding="async" alt="Trini-Yaad at Dubwise Cafe" />
    </div>
    <div className="footer-copy">
      <p>TRINI-YAAD × DUBWISE</p>
      <h2>Kingston, taste the islands.</h2>
      <button type="button" className="footer-top" onClick={() => scrollToSection('hero')}>Back to top ↑</button>
    </div>
    <div className="footer-meta">
      <p>Visit us at Dubwise Cafe — {site.street}, {site.area}</p>
      <p><a href={`tel:${site.phone}`}>{site.phoneDisplay}</a> · <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></p>
      <p><a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">@{site.instagram.toUpperCase()}</a></p>
      <p>Also available on <a href="https://www.7krave.com/" target="_blank" rel="noopener">7Krave</a> &amp; <a href="https://www.google.com/search?q=QuickCart+Jamaica+delivery" target="_blank" rel="noopener">QuickCart</a></p>
    </div>
  </footer>
);

export default Footer;