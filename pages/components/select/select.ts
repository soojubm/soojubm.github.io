import { renderLayout } from '../../../layouts/base-layouts'
import main from './select.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
