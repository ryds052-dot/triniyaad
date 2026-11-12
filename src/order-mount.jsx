import { createRoot } from 'react-dom/client'
import OrderBar from './components/OrderBar'
if (!document.getElementById('order-root')) {
  const el = document.createElement('div')
  el.id = 'order-root'
  document.body.appendChild(el)
  createRoot(el).render(<OrderBar />)
}