import { useEffect, useState } from 'react'
import { subscribe, add, dec, clear, count, total, waUrl, fmt } from '../lib/order'

const CARD = 'article, li, [data-dish], .dish-card'
const CHIP = /^(no pepper|slight pepper|medium pepper|heavy pepper|extra sauce|shado beni|tamarind|white garlic|scotch bonnet)$/i

const readCard = btn => {
  const card = btn.closest(CARD)
  if (!card) return null
  const name = (card.querySelector('h3, h4, [data-name]')?.textContent || '').trim()
  const price = Number(((card.textContent.match(/\$([\d,]+)/) || [])[1] || '').replace(/,/g, ''))
  if (!name || !price) return null
  return { card, name, price, mods: [...card.querySelectorAll('.is-on')].map(c => c.textContent.trim()).filter(Boolean) }
}

export default function OrderBar() {
  const [lines, setLines] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(() => subscribe(setLines), [])
  useEffect(() => {
    const onClick = e => {
      if (!(e.target instanceof Element)) return
      const btn = e.target.closest('button')
      if (!btn) return
      const label = btn.textContent.trim()
      if (CHIP.test(label)) {
        btn.classList.toggle('is-on')
        btn.setAttribute('aria-pressed', btn.classList.contains('is-on'))
        return
      }
      if (label !== '+') return
      const c = readCard(btn)
      if (!c) return
      add(c.name, c.price, c.mods)
      const n = (Number(c.card.dataset.qty) || 0) + 1
      c.card.dataset.qty = n
      const num = c.card.querySelector('[data-qty]') || btn.previousElementSibling
      if (num && /^\d+$/.test(num.textContent.trim())) num.textContent = n
    }
    const onSubmit = e => {
      const f = e.target
      if (!(f instanceof HTMLFormElement) || !/party|table/i.test(f.innerHTML)) return
      e.preventDefault()
      const rows = [...f.querySelectorAll('input, select, textarea')].filter(i => i.value && i.type !== 'submit')
        .map(i => (i.name || i.getAttribute('aria-label') || i.placeholder || 'field') + ': ' + i.value)
      const chips = [...f.querySelectorAll('.is-on')].map(c => c.textContent.trim())
      window.open('https://wa.me/18763520139?text=' + encodeURIComponent('Hi Trini-Yaad! Table request:\n' + rows.concat(chips).join('\n')), '_blank', 'noopener')
    }
    document.addEventListener('click', onClick)
    document.addEventListener('submit', onSubmit)
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('submit', onSubmit) }
  }, [])

  const n = count(), t = total()
  if (!n) return null
  return (
    <>
      <div className="orderbar">
        <button className="orderbar__toggle" onClick={() => setOpen(o => !o)} aria-expanded={open}>
          <span className="orderbar__count">{n}</span>
          <span className="orderbar__label">Your order</span>
          <span className="orderbar__total">{fmt(t)} JMD</span>
        </button>
        <a className="orderbar__send" href={waUrl()} target="_blank" rel="noopener">Send on WhatsApp</a>
      </div>
      {open && (
        <div className="ordersheet" role="dialog" aria-modal="true" aria-label="Order summary">
          <div className="ordersheet__head"><strong>Your order</strong><button onClick={clear}>Clear</button></div>
          <ul>
            {lines.map(l => (
              <li key={l.key}>
                <div><p>{l.qty}× {l.name}</p>{l.mods.length > 0 && <small>{l.mods.join(', ')}</small>}</div>
                <div className="ordersheet__right"><span>{fmt(l.price * l.qty)}</span><button onClick={() => dec(l.key)} aria-label={'Remove one ' + l.name}>−</button></div>
              </li>
            ))}
          </ul>
          <p className="ordersheet__note">Confirmed on WhatsApp. Pay on pickup at 82 Lady Musgrave Rd.</p>
          <a className="ordersheet__send" href={waUrl()} target="_blank" rel="noopener">Send order ↗</a>
        </div>
      )}
    </>
  )
}