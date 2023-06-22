import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import result from './result.html'
import './result.css'

import '/public/components/footer/footer.css'

// import '/public/stylesheets/shared.css'
import '/public/stylesheets/shared/webfonts.css'
import '/public/stylesheets/shared/variables.css'
import '/public/stylesheets/shared/reset.css'
import '/public/stylesheets/shared/mixins.css'

import '/public/components/navbar/navbar.css'

import '/public/stylesheets/components/avatars.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + result + footer
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
