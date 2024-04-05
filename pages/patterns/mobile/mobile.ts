import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './mobile.html'

import '/public/stylesheets/shared.css'
import '/pages/components/components.css'
import '/pages/components/bar/bar.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer
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
