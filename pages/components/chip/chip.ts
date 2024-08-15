import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'
import main from './chip.html'

import '/public/stylesheets/shared.css'
import '/public/stylesheets/shared/variables.css'

import '/pages/components/components.css'

import '/public/components/group/group.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
