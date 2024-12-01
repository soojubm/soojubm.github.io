import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'
import main from './link.html'

// import '/public/stylesheets/shared.css'
import '/public/stylesheets/shared/webfonts.css'
import '/public/stylesheets/shared/reset.css'
import '/public/stylesheets/shared/keyframes.css'
import '/public/stylesheets/shared/variables.css'

import '/pages/components/components.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
