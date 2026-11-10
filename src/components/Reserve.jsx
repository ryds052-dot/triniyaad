import { useState } from 'react';
import { wa, site } from '../data/site.js';

const sizes = ['1–2', '3–4', '5–6', '7+'];

const Reserve = () => {
  const [name, setName] = useState('');
  const [size, setSize] = useState('3–4');
  const [when, setWhen] = useState('');
  const [note, setNote] = useState('');
  const valid = name.trim() && when;

  const text = [
    'Hi Trini-Yaad! Table request in the courtyard.',
    `Name: ${name}`,
    `Party: ${size}`,
    `When: ${when}`,
    note && `Note: ${note}`,
    'Sent from trini-yaad.vercel.app',
  ].filter(Boolean).join('\n');

  return (
    <section id="reserve" className="reserve-section">
      <div className="reserve-copy">
        <p className="eyebrow">Courtyard tables</p>
        <h2>Hold a table <em>for the session.</em></h2>
        <p>Tables are first-come on normal nights. For Friday Shellingz and Saturday Yard Lime, send a request and we&apos;ll hold space near the stage.</p>
        <p className="reserve-note">Requests are confirmed on WhatsApp — this isn&apos;t a live booking system.</p>
      </div>
      <form className="reserve-form" onSubmit={(event) => event.preventDefault()}>
        <label>Name<input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required /></label>
        <fieldset>
          <legend>Party size</legend>
          <div className="chips">
            {sizes.map((option) => (
              <button key={option} type="button" className={size === option ? 'active' : ''} aria-pressed={size === option} onClick={() => setSize(option)}>{option}</button>
            ))}
          </div>
        </fieldset>
        <label>Date and time<input value={when} onChange={(event) => setWhen(event.target.value)} placeholder="Fri 8pm" required /></label>
        <label>Note (optional)<textarea value={note} onChange={(event) => setNote(event.target.value)} rows={2} /></label>
        <a className={valid ? 'button button-primary' : 'button button-primary disabled'} href={valid ? wa(text) : undefined} target="_blank" rel="noopener noreferrer" aria-disabled={!valid}>
          Send table request <span aria-hidden="true">↗</span>
        </a>
        <small className="field-note">Or call {site.phoneDisplay}.</small>
      </form>
    </section>
  );
};

export default Reserve;