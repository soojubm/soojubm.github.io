import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './presentation.html'

import '/public/stylesheets/shared.css'

import '/public/stylesheets/pages/presentations.css'
// import '/pages/patterns/dialog.css'
import '/pages/components/components.css'
import '/pages/patterns/table/pagination.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

  const sheets = document.querySelectorAll('[data-open-sheet]')
  console.log('sheets', sheets)
  sheets.forEach(btn => {
    btn.addEventListener('click', e => {
      const type = (e.currentTarget as HTMLElement).dataset.openSheet
      const sheet = document.querySelector(`mm-sheet[type="${type}"]`) as any
      sheet?.open()
    })
  })

  document.querySelectorAll('mm-sheet').forEach(sheetEl => {
    sheetEl.addEventListener('sheetclose', () => {
      ;(sheetEl as any).close()
    })
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
