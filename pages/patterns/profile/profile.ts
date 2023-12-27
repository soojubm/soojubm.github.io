import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './profile.html'
import './profile.css'

import '/public/stylesheets/shared.css'
import '/pages/components/components.css'
import '/public/stylesheets/components/chat.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer

  document.body.classList.remove('is-opened-menu')
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
