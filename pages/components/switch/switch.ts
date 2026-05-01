import { renderLayout } from '../../../layouts/base-layouts'
import main from './switch.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
