import { lazy, Suspense, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import { useCart } from './hooks/useCart.js';

const MenuSection = lazy(() => import('./components/MenuSection.jsx'));
const GuestLove = lazy(() => import('./components/GuestLove.jsx'));
const CourtyardVibe = lazy(() => import('./components/CourtyardVibe.jsx'));
const Reserve = lazy(() => import('./components/Reserve.jsx'));
const VisitUs = lazy(() => import('./components/VisitUs.jsx'));
const Footer = lazy(() => import('./components/Footer.jsx'));
const CartDrawer = lazy(() => import('./components/CartDrawer.jsx'));

const Fallback = () => <div aria-hidden="true" style={{ minHeight: '420px' }} />;

const App = () => {
  const cart = useCart();

  useEffect(() => {
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  return (
    <>
      <a className="skip-link" href="#menu">Skip to menu</a>
      <main>
        <div className="grain-overlay" aria-hidden="true" />
        <div className="court-yard-glow glow-amber" aria-hidden="true" />
        <div className="court-yard-glow glow-red" aria-hidden="true" />
        <div className="court-yard-glow glow-green" aria-hidden="true" />
        <Navbar cartCount={cart.count} onOpenCart={() => cart.setOpen(true)} />
        <Hero />
        <Suspense fallback={<Fallback />}><MenuSection cart={cart} /></Suspense>
        <Suspense fallback={<Fallback />}><GuestLove /></Suspense>
        <Suspense fallback={<Fallback />}><CourtyardVibe /></Suspense>
        <Suspense fallback={<Fallback />}></Suspense>
        <Suspense fallback={<Fallback />}><Reserve /></Suspense>
        <Suspense fallback={<Fallback />}><VisitUs /></Suspense>
        <Suspense fallback={<Fallback />}><Footer /></Suspense>
      </main>

      {cart.count > 0 && (
        <div className="mobile-checkout-dock">
          <button type="button" className="mobile-checkout-summary" onClick={() => cart.setOpen(true)}>
            <span>{cart.count} {cart.count === 1 ? 'item' : 'items'}</span>
            <strong>${cart.subtotal.toLocaleString('en-US')} JMD</strong>
          </button>
          <button type="button" className="dock-checkout" onClick={() => cart.setOpen(true)}>Checkout</button>
        </div>
      )}
      {cart.count > 0 && (
        <button className="cart-fab" type="button" onClick={() => cart.setOpen(true)} aria-label={`Open tray, ${cart.count} items`}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h2l2 9h9l2-6H7M10 20h.01M17 20h.01" /></svg>
          Tray <span>{cart.count}</span>
        </button>
      )}
      {cart.open && <Suspense fallback={null}><CartDrawer cart={cart} /></Suspense>}
    </>
  );
};

export default App;