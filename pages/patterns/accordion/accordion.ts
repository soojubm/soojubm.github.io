import { renderLayout } from '../../../layouts/base-layouts'
import main from './accordion.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)

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
