import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './text.html'
import '/pages/components/components.css'
import './text.css'

import '/public/stylesheets/shared.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

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
