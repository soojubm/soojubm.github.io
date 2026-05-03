import footer from '/src/components/footer/footer.html'
import navbar from '/src/components/navbar/navbar.html'

import main from './bar.html'
import '/pages/components/components.css'
import './bar.css'

import '/src/stylesheets/shared.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
