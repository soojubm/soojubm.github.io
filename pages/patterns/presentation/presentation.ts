import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
})

document.addEventListener('DOMContentLoaded', () => {
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

  const filterTrigger = document.querySelector('#filter-trigger')
  const filterSheet = document.querySelector('#filter-sheet') as any
  filterTrigger?.addEventListener('click', () => filterSheet?.open())
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
