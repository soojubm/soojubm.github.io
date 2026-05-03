import footer from '/src/components/footer/footer.html'
import navbar from '/src/components/navbar/navbar.html'
import main from './profile.html'
import './profile.css'
import '/src/stylesheets/shared.css'
import '/pages/components/components.css'
import '/src/stylesheets/components/chat.css'
import { hideNavbar } from '../../../src/javascripts/common/navbar'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  // document.body.insertAdjacentHTML('beforeend', footer)

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
