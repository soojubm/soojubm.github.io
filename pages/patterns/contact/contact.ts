import { renderLayout } from '../../../layouts/base-layouts'
import main from './contact.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
