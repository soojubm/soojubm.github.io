import footer from '/src/components/footer/footer.html'
import navbar from '/src/components/navbar/navbar.html'

import main from './searchfield.html'
import '/pages/components/components.css'

import '/src/stylesheets/shared.css'
import '/src/stylesheets/components/form.css'

import '/src/stylesheets/components/step.css'
import '/src/components/textfield/textfield.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
