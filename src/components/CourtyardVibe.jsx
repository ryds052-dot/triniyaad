import { useState } from 'react';
import { sessions, nights } from '../data/events.js';
import { dayNames } from '../data/site.js';

const CourtyardVibe = () => {
  const [active, setActive] = useState(sessions.find((entry) => entry.featured) || sessions[0]);
  const [playing, setPlaying] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);

  const pick = (session) => { setActive(session); setPlaying(false); setPosterFailed(false); };

  return (
    <section id="courtyard" className="courtyard-culture">
      <div className="culture-heading">
        <p className="eyebrow">82 Lady Musgrave Road · Sound system heritage</p>
        <h2>Come for the doubles.<br /><em>Stay for the dub.</em></h2>
        <p className="culture-subcopy">Tucked behind Kaya in Kingston 6, Trini-Yaad cooks inside the legendary Dubwise Cafe courtyard — where wooden speaker stacks, string lights, vinyl selectors and Jamaica&apos;s heaviest voices meet after dark.</p>
      </div>
      <div className="founder-callout">
        <span>FOUNDER STORY</span>
        <p>Misir Ramberran brought &quot;a little piece of Trinidad in the heart of Kingston&quot; to Lady Musgrave Road: vegan-friendly bases, optional chicken, shrimp, fish or curried goat, house-made shado beni and tamarind sauces, no preservatives.</p>
      </div>

      <div className="live-stage-layout">
        <div className="live-stage">
          {playing ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={`${active.artist} — ${active.title}`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              className="live-stage-iframe"
            />
          ) : (
            <>
              <img
                className="live-stage-poster"
                src={`https://i.ytimg.com/vi/${active.id}/${posterFailed ? 'hqdefault' : 'maxresdefault'}.jpg`}
                width="1280" height="720" loading="lazy" decoding="async"
                alt={`${active.artist} — ${active.title}`}
                onError={() => setPosterFailed(true)}
              />
              <div className="live-stage-vignette" aria-hidden="true" />
              <div className="live-badge"><span aria-hidden="true" /> LIVE ARCHIVE</div>
              <div className="live-stage-copy"><small>{active.tag}</small><h3>{active.artist}</h3><p>{active.title}</p></div>
              <button type="button" className="stage-play" aria-label={`Play ${active.title}`} onClick={() => setPlaying(true)}>
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
              </button>
            </>
          )}
        </div>
        <div className="session-selector" aria-label="Dubwise session archive">
          {sessions.map((session, index) => (
            <button type="button" key={session.id} className={session.id === active.id ? 'active' : ''} aria-pressed={session.id === active.id} onClick={() => pick(session)}>
              <span className="session-index">{String(index + 1).padStart(2, '0')}</span>
              <span><small>{session.tag}</small><b>{session.artist}</b><em>{session.title}</em></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourtyardVibe;