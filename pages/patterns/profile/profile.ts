import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'
import main from './profile.html'
import './profile.css'
import '/public/stylesheets/shared.css'
import '/pages/components/components.css'
import '/public/stylesheets/components/chat.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)

  // TODO function
  document.body.classList.remove('is-opened-menu')

  document.addEventListener('click', event => {
    const target = event.target as any
    if (!target.closest('.js-test-toggle')) return

    alert()

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
