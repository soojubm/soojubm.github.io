import { renderLayout } from '../../../layouts/base-layouts'
import main from './tooltip.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
