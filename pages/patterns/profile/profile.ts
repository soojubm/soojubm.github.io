import { renderLayout } from '../../../layouts/base-layouts'
import { hideNavbar } from '../../../src/javascripts/common/navbar'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})

document.addEventListener('DOMContentLoaded', () => {
  hideNavbar()

  document.addEventListener('click', event => {
    const target = event.target as any

    if (!target.closest('.js-test-toggle')) return

    const containerElement = target.closest('.profile-body')
    const siblingElements = [...target.parentElement.children]

    containerElement.classList.toggle('list', target.dataset.name === 'list')

    siblingElements.forEach(element => element.classList.remove('is-selected'))
    target.classList.add('is-selected')
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
