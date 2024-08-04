import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './presentation.html'

import '/public/stylesheets/shared.css'

import '/public/stylesheets/pages/presentations.css'
// import '/pages/patterns/dialog.css'
import '/pages/components/components.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

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
