import { renderLayout } from '../../../layouts/base-layouts'
import main from './indicator.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
