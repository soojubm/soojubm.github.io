import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './utilites.html'
import '/pages/components/components.css'

// import '/public/stylesheets/shared.css'
import '/public/stylesheets/shared/webfonts.css'
import '/public/stylesheets/shared/variables.css'
import '/public/stylesheets/shared/reset.css'
import '/public/stylesheets/shared/mixins.css'

import '/public/components/footer/footer.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer
})
