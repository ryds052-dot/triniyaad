import { wa } from '../data/site.js';

const reviews = [
  { quote: 'The food was amazing and very affordable for so much food. This spot is definitely worth checking out!', author: 'Mellionie N · Google', stars: 5 },
  { quote: 'This is the place to be in Kingston. Good music, food and drinks. We loved it sooo much!', author: 'Tabita G · Google', stars: 5 },
    { quote: 'Don\'t waste your time anywhere else. Best place I visited for food, drinks and music in Kingston. The vibes are immaculate.', author: 'Jose L · Google', stars: 5 },
];

const GuestLove = () => (
  <section className="guest-love" aria-label="Guest reviews">
    <div className="guest-rating"><span>4.7★</span><small>KINGSTON FAVOURITE</small></div>
    <div className="guest-quotes">
      {reviews.map((review) => (
        <blockquote key={review.quote}>
          <p>“{review.quote}”</p>
          <cite>{review.author} · {'★'.repeat(review.stars)}</cite>
        </blockquote>
      ))}
    </div>
  </section>
);

export default GuestLove;
