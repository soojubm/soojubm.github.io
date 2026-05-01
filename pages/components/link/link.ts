import { renderLayout } from '../../../layouts/base-layouts'
import main from './link.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
