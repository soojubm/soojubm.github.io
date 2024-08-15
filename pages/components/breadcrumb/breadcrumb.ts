import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'
import main from './breadcrumb.html'

import '/public/stylesheets/shared.css'
import '/pages/components/components.css'
import '/public/components/breadcrumb/breadcrumb.css'

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('beforeend', navbar)
  document.body.insertAdjacentHTML('beforeend', main)
  document.body.insertAdjacentHTML('beforeend', footer)
})
