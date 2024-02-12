import footer from '/public/components/footer/footer.html'
import navbar from '/public/components/navbar/navbar.html'

import main from './textfield.html'
import '/pages/components/components.css'

import '/public/stylesheets/shared.css'
import '/public/stylesheets/components/form.css'

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('main')!.innerHTML = navbar + main + footer
})

// input.addEventListener("input", updateValue);
// function updateValue(e) {
// log.textContent = e.target.value;
// }
