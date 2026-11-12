import { useRef, useState } from 'react';
import { menuGroups, money, peppers, sauces } from '../data/menu.js';

const FILTERS = [
  { id: 'all', label: 'Everything' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'fish', label: 'Seafood' },
];

const MenuSection = ({ cart }) => {
  const [active, setActive] = useState('doubles');
  const [filter, setFilter] = useState('all');
  const [board, setBoard] = useState(false);
  const tabs = useRef(null);

  const group = menuGroups.find((entry) => entry.id === active) || menuGroups[0];
  const visible = filter === 'all'
    ? group.items
    : group.items.filter((item) => item.tags.includes(filter));

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
      </div>

      <button className="mobile-menu-board-card" type="button" onClick={() => setBoard(true)} aria-label="Open the full menu board">
        <img src="/images/board.jpg?v=1" width="1400" height="1000" loading="lazy" decoding="async" alt="" />
        <span className="mobile-menu-board-shade" aria-hidden="true" />
        <span className="mobile-menu-board-copy"><small>FULL MENU</small><strong>View the complete board</strong></span>
        <span className="mobile-menu-board-arrow" aria-hidden="true">↗</span>
      </button>

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
              onClick={() => setActive(entry.id)}
              onKeyDown={(event) => onTabKey(event, index)}
            >
              <span>{entry.label}</span><small>{entry.eyebrow}</small>
            </button>
          ))}
        </div>
        <div className="menu-toolbar-right">
          <div className="menu-filters" role="group" aria-label="Filter dishes">
            {FILTERS.map((entry) => (
              <button key={entry.id} type="button" className={filter === entry.id ? 'active' : ''} aria-pressed={filter === entry.id} onClick={() => setFilter(entry.id)}>{entry.label}</button>
            ))}
          </div>
          <button className="board-button" type="button" onClick={() => setBoard(true)}>Full board</button>
        </div>
      </div>

      <div role="tabpanel" id={`panel-${group.id}`} aria-labelledby={`tab-${group.id}`} tabIndex={-1}>
        {group.description && <p className="category-description">{group.description}</p>}
        {group.items.some((item) => item.options) && (
          <div className="sauce-strip" aria-label="House sauces">
            <div><span className="sauce-dot green" aria-hidden="true" /><b>Signature Green</b><small>Shado beni sauce</small></div>
            <div><span className="sauce-dot gold" aria-hidden="true" /><b>Sweet Tamarind</b><small>Tangy house chutney</small></div>
            <div><span className="sauce-dot cream" aria-hidden="true" /><b>White Garlic</b><small>Creamy house sauce</small></div>
            <div><span className="sauce-dot red" aria-hidden="true" /><b>Scotch Bonnet</b><small>Heat by request</small></div>
          </div>
        )}

        <div className="menu-grid">
          {visible.map((item, index) => {
            const line = cart.lines[item.id];
            const qty = line?.qty || 0;
            return (
              <article className={qty ? 'dish-card in-cart' : 'dish-card'} key={item.id}>
                <div className="dish-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
                <div className="dish-main">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  {item.tags.length > 0 && (
                    <ul className="dish-tags">{item.tags.map((tag) => <li key={tag} className={`tag tag-${tag}`}>{tag}</li>)}</ul>
                  )}
                </div>
                <div className="dish-order">
                  <strong>{money(item.price)} <small>JMD</small></strong>
                  {item.options && (
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
          })}
        </div>
        {visible.length === 0 && <p className="menu-empty">Nothing in this category matches that filter.</p>}
      </div>

      {board && (
        <div className="menu-modal" role="dialog" aria-modal="true" aria-label="Menu board" onMouseDown={() => setBoard(false)}>
          <button className="modal-close" type="button" onClick={() => setBoard(false)} aria-label="Close menu board">×</button>
          <img src="/images/board.jpg?v=1" width="1400" height="1000" loading="lazy" decoding="async" alt="Official Trini-Yaad menu board" />
        </div>
      )}
    </section>
  );
};

export default MenuSection;