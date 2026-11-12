import { useRef, useState } from 'react';
import { menuGroups, money, peppers, sauces } from '../data/menu.js';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'fish', label: 'Seafood' },
];

const MenuSection = ({ cart }) => {
  const [active, setActive] = useState(null);
  const [filter, setFilter] = useState('all');
  const [board, setBoard] = useState(false);
  const tabs = useRef(null);

  const shown = active ? menuGroups.filter((e) => e.id === active) : menuGroups;
  const group = shown[0] || menuGroups[0];




  const onTabKey = (event, index) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const buttons = [...tabs.current.querySelectorAll('button')];
    const target = event.key === 'Home' ? 0
      : event.key === 'End' ? buttons.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[target].focus();
    setActive(menuGroups[target].id);
  };

  return (
    <section id="menu" className="menu-section">
      <div className="section-heading">
        <p className="eyebrow">The Food Line</p>
        <h2>Choose your <em>island mood.</em></h2>
        <a href="/images/board.jpg?v=1" target="_blank" rel="noopener" className="board-link">The painted board <span aria-hidden="true">↗</span></a>
      </div>

      <div className="menu-toolbar">
        <div className="menu-tabs" role="tablist" aria-label="Menu categories" ref={tabs}>
          {menuGroups.map((entry, index) => (
            <button
              key={entry.id}
              id={`tab-${entry.id}`}
              className={active === entry.id ? 'active' : ''}
              role="tab"
              type="button"
              aria-selected={active === entry.id}
              aria-controls={`panel-${entry.id}`}
              tabIndex={active === entry.id ? 0 : -1}
              onClick={() => setActive(active === entry.id ? null : entry.id)}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              <span>{entry.label}</span><small>{entry.eyebrow}</small>
            </button>
          ))}
        </div>
        <div className="menu-toolbar-right">
        </div>
      </div>

      <div role="tabpanel" id={`panel-${active || 'all'}`} aria-labelledby={`tab-${active || 'all'}`} tabIndex={-1}>

        <div className="menu-grid">{shown.map((entry) => (<div key={entry.id} className="menu-group"><div className="menu-group-head"><h3>{entry.label}</h3><small>{entry.eyebrow}</small></div>
          {entry.items.map((item, index) => {
            const line = cart.lines[item.id];
            const qty = line?.qty || 0;
            return (
              <article className={qty ? 'dish-card in-cart' : 'dish-card'} key={item.id}>
                <div className="dish-main">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  {item.tags.length > 0 && (
                    <ul className="dish-tags">{item.tags.map((tag) => <li key={tag} className={`tag tag-${tag}`}>{tag}</li>)}</ul>
                  )}
                </div>
                <div className="dish-order">
                  <strong>{money(item.price)} <small>JMD</small></strong>
                  {qty > 0 && item.options && (
                    <div className="dish-options">
                      <select aria-label={`Pepper level for ${item.name}`} value={line?.pepper || ''} onChange={(event) => cart.setOptions(item.id, 'pepper', event.target.value)}>
                        <option value="">Pepper level</option>
                        {peppers.map((level) => <option key={level}>{level}</option>)}
                      </select>
                      <select aria-label={`Extra sauce for ${item.name}`} value={line?.sauces?.[0] || ''} onChange={(event) => cart.setOptions(item.id, 'sauces', event.target.value ? [event.target.value] : [])}>
                        <option value="">Extra sauce</option>
                        {sauces.map((sauce) => <option key={sauce}>{sauce}</option>)}
                      </select>
                    </div>
                  )}
                  <div className="stepper">
                    <button type="button" onClick={() => cart.bump(item.id, -1)} disabled={!qty} aria-label={`Remove one ${item.name}`}>−</button>
                    <output aria-live="polite">{qty}</output>
                    <button type="button" onClick={() => cart.bump(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button>
                  </div>
                </div>
              </article>
            );
            })}</div>))}</div>
          {shown.every((entry) => entry.items.length === 0) && <p className="menu-empty">Nothing in this category matches that filter.</p>}
      </div>
    </section>
  );
};

export default MenuSection;
