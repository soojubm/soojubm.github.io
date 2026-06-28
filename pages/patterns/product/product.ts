import './product.css'
import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
  setupCartSheet()
})

type SheetElement = HTMLElement & {
  open(): void
}

type ValueElement = HTMLElement & {
  value: string
}

function setupCartSheet() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-open-cart]')
  const sheet = document.querySelector<SheetElement>('#cart-sheet')
  const productQuantity = document.querySelector<ValueElement>('.product-info mm-number-input')
  const cartQuantity = document.querySelector<ValueElement>('#cart-quantity')
  const cartTotal = document.querySelector<ValueElement>('#cart-total')

  if (!triggers.length || !sheet || !cartQuantity || !cartTotal) return

  const updateTotal = () => {
    const quantity = Math.max(1, Number(cartQuantity.value) || 1)
    cartTotal.value = `₩ ${(quantity * 16000).toLocaleString('ko-KR')}`
  }

  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      cartQuantity.value = productQuantity?.value || '1'
      updateTotal()
      sheet.open()
    })
  })

  cartQuantity.addEventListener('input', updateTotal)
}
