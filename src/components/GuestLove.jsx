import { wa } from '../data/site.js';

const reviews = [
  { quote: 'Pillowy barra, generous portions, and those addictive green and white garlic sauces — with reggae dancing in the Dubwise garden behind Kaya.', author: 'Google review', stars: 5 },
  { quote: 'Real Trinidad doubles in Kingston. The shado beni is the whole point. Went back twice in one week.', author: 'Google review', stars: 5 },
  { quote: 'Vegan-friendly and they never make it weird. Doubles with no pepper for my mother, heavy pepper for me.', author: 'Google review', stars: 4 },
];

const GuestLove = () => (
  <section className="guest-love" aria-label="Guest reviews">
    <div className="guest-rating"><span>4.4★</span><small>KINGSTON FAVOURITE</small></div>
    <div className="guest-quotes">
      {reviews.map((review) => (
        <blockquote key={review.quote}>
          <p>“{review.quote}”</p>
          <cite>{review.author} · {'★'.repeat(review.stars)}</cite>
        </blockquote>
      ))}
    </div>
    <a className="catering-button magnetic" href={wa("Hi Trini-Yaad! I'm interested in catering and courtyard events.")} target="_blank" rel="noopener noreferrer">
      Catering &amp; Courtyard Events <span aria-hidden="true">↗</span>
    </a>
  </section>
);

export default GuestLove;