import { useEffect } from 'react'

const CHIP = /^(no pepper|slight pepper|medium pepper|heavy pepper|extra sauce|shado beni|tamarind|white garlic|scotch bonnet)$/i

export default function OrderBar() {
  useEffect(() => {
    const onClick = e => {
      if (!(e.target instanceof Element)) return
      const btn = e.target.closest('button')
      if (!btn) return
      if (!CHIP.test(btn.textContent.trim())) return
      btn.classList.toggle('is-on')
      btn.setAttribute('aria-pressed', btn.classList.contains('is-on'))
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
  return null
}