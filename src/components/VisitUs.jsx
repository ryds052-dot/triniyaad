import { dayNames, hours, site } from '../data/site.js';

const toLabel = (mins) => {
  const h = Math.floor(mins / 60);
  const suffix = h >= 12 ? 'pm' : 'am';
  return `${h % 12 === 0 ? 12 : h % 12}${mins % 60 ? `:${String(mins % 60).padStart(2, '0')}` : ''}${suffix}`;
};

const VisitUs = () => (
  <section id="visit" className="visit-section">
    <div className="visit-photo"><img src="/images/courtyard.jpg?v=1" width="1200" height="680" loading="lazy" decoding="async" alt="Dubwise Cafe courtyard stall" /></div>
    <div className="visit-card">
      <p className="eyebrow">Visit us at Dubwise Cafe</p>
      <h2>{site.street}</h2>
      <p className="visit-address">Behind Kaya · {site.area}, Jamaica</p>

      <div className="visit-hours">
        <b>Hours</b>
        <dl>
          {[1, 2, 3, 4, 5, 6, 0].map((day) => {
            const entry = hours.find((row) => row.day === day);
            return (
              <div key={day}>
                <dt>{dayNames[day]}</dt>
                <dd>{entry ? `${toLabel(entry.open)} – ${toLabel(entry.close)}` : 'Closed'}</dd>
              </div>
            );
          })}
        </dl>
      </div>

        <figure className="visit-board">
          <a href="/images/board.jpg?v=1" target="_blank" rel="noopener">
            <img src="/images/board.jpg?v=1" width="1600" height="1200" loading="lazy" decoding="async" alt="Hand-painted Trini-Yaad menu board outside the Dubwise courtyard" />
          </a>
          <figcaption>The board, hand-painted outside the courtyard.</figcaption>
        </figure>
        <div className="visit-order">
        <b>How to order</b>
        <p><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp / call {site.phoneDisplay}</a></p>
        <p><a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">Instagram DM @{site.instagram.toUpperCase()}</a></p>
        <p>Also available on <a href="https://www.7krave.com/" target="_blank" rel="noopener">7Krave</a> &amp; <a href="https://www.google.com/search?q=QuickCart+Jamaica+delivery" target="_blank" rel="noopener">QuickCart</a></p>
        <p className="visit-delivery">{site.delivery.areas.join(' · ')} — minimum {site.delivery.minimum.toLocaleString('en-US')} JMD</p>
      </div>

      <a className="button button-primary" href={`https://www.google.com/maps/search/?api=1&query=${site.mapsQuery}`} target="_blank" rel="noopener noreferrer">Get directions <span aria-hidden="true">↗</span></a>
    </div>
  </section>
);

export default VisitUs;