import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
})

document.addEventListener('DOMContentLoaded', () => {
  countUp({ selector: '.js-counter' })

  function countUp({ selector: selector }) {
    let element = document.querySelector(selector)
    if (!element) return

    let number = 0
    let targetNumber = element.dataset.number || element.getAttribute('data-number')

    let interval = setInterval(() => {
      renderNumber()

      if (number >= targetNumber) clearInterval(interval)
    }, 1)

    function renderNumber() {
      ++number
      element.textContent = `${number}`
    }
  }
})
