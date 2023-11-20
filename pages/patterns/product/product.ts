import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './product.html'
import './product.css'

import '/public/stylesheets/shared.css'
import '/public/stylesheets/components/step.css'
import '/pages/components/components.css'

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
