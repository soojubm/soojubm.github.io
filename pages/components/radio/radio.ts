import { renderLayout } from '../../../layouts/base-layouts'
import main from './radio.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
