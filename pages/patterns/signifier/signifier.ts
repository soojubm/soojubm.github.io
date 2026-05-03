import footer from '/src/components/footer/footer.html'
import navbar from '/src/components/navbar/navbar.html'

import main from './signifier.html'
import '/pages/components/components.css'
import '/pages/patterns/tokens/tokens.css'

import '/src/stylesheets/shared.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
