import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './accordion.html'

// import '/public/stylesheets/shared.css'
import '/public/stylesheets/shared/webfonts.css'
import '/public/stylesheets/shared/variables.css'
import '/public/stylesheets/shared/reset.css'
import '/public/stylesheets/shared/mixins.css'

import '/public/components/navbar/navbar.css'
import '/public/components/footer/footer.css'
import '/pages/components/components.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer

  document.addEventListener('click', toggleDetails)

  function toggleDetails(event) {
    if (!event.target.closest('.js-accordion')) return

    const targetElement = event.target.closest('.js-accordion')
    const panelElement = targetElement.querySelector('.accordion-panel')

    panelElement?.addEventListener('click', event => event.stopPropagation())

    const expanded = targetElement.getAttribute('aria-expanded') === 'true' ? 'false' : 'true'

    console.log(targetElement, targetElement.getAttribute('aria-expanded'), targetElement.getAttribute('aria-expanded') === 'true')
    targetElement.setAttribute('aria-expanded', expanded)
    // targetElement.classList.toggle('is-active')
  }
})

// {
//   name: 'button',
//   role: action',
//   description: '',
//   aka: ['string', 'string'],
//   features: [],
//   bestPractices: [],
//   props: { name: '', size: ''}
//   relatedComponents: [],
//   useCases: [],
// }
