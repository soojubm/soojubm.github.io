import footer from '/src/components/footer/footer.html'
import navbar from '/src/components/navbar/navbar.html'

import main from './contact.html'
import './contact.css'

import '/src/stylesheets/shared.css'
import '/src/stylesheets/components/step.css'
import '/pages/components/components.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
