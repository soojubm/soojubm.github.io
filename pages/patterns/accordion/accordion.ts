import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './accordion.html'

import '/public/stylesheets/shared.css'
import '/pages/components/components.css'

import '/public/stylesheets/components/accordion.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

  document.addEventListener('click', toggleDetails)

  function toggleDetails(event) {
    if (!event.target.closest('.js-accordion')) return

    const targetElement = event.target.closest('.js-accordion')
    const panelElement = targetElement.querySelector('.accordion-panel')

    panelElement?.addEventListener('click', event => event.stopPropagation())

    const expanded = targetElement.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'

    targetElement.setAttribute('aria-expanded', expanded)
    // targetElement.classList.toggle('is-active')
  }
})
