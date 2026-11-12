const KEY = 'ty-order'
let lines = []
try { lines = JSON.parse(localStorage.getItem(KEY) || '[]') } catch { lines = [] }
const subs = new Set()
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(lines)) } catch {} ; subs.forEach(f => f([...lines])) }
export const subscribe = f => { subs.add(f); f([...lines]); return () => subs.delete(f) }
export const add = (name, price, mods) => {
  const key = name + '|' + mods.join(',')
  const hit = lines.find(l => l.key === key)
  if (hit) hit.qty++
  else lines.push({ key, name, price, mods, qty: 1 })
  save()
}
export const dec = key => {
  const i = lines.findIndex(l => l.key === key)
  if (i < 0) return
  if (lines[i].qty > 1) lines[i].qty--
  else lines.splice(i, 1)
  save()
}
export const clear = () => { lines = []; save() }
export const count = () => lines.reduce((n, l) => n + l.qty, 0)
export const total = () => lines.reduce((n, l) => n + l.qty * l.price, 0)
export const fmt = n => '$' + n.toLocaleString()
export const waUrl = () => {
  if (!lines.length) return 'https://wa.me/18763520139'
  const body = lines.map(l => l.qty + 'x ' + l.name + (l.mods.length ? ' — ' + l.mods.join(', ') : '') + ' ($' + (l.price * l.qty).toLocaleString() + ' JMD)').join('\n')
  const msg = 'Hi Trini-Yaad! Order from the site:\n\n' + body + '\n\nTotal $' + total().toLocaleString() + ' JMD\nPickup: 82 Lady Musgrave Rd'
  return 'https://wa.me/18763520139?text=' + encodeURIComponent(msg)
}