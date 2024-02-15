import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './filtering.html'

import '/public/stylesheets/shared.css'

import '/public/stylesheets/pages/filter.css'

import '/pages/components/components.css'
import '/pages/patterns/setting/setting.css'

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
