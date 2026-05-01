import { renderLayout } from '../../../layouts/base-layouts'
import main from './searchfield.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
