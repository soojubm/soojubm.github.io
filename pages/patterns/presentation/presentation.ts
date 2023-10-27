import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './presentation.html'

// import '/public/stylesheets/shared.css'
import '/public/stylesheets/shared/webfonts.css'
import '/public/stylesheets/shared/variables.css'
import '/public/stylesheets/shared/reset.css'

import '/public/stylesheets/pages/presentations.css'

import '/public/components/footer/footer.css'
import '/pages/components/components.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer

  // todo
  const sheetElement = document.querySelector('.js-sheet')
  const sheetCloseElement = sheetElement?.querySelector('.js-sheet-close')

  window.addEventListener('load', () => {
    sheetElement?.classList.add('is-visible')
  })
  sheetCloseElement?.addEventListener('click', () => {
    sheetCloseElement.parentElement?.classList.remove('is-visible')
  })
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
