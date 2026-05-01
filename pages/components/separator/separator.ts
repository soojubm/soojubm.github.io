import { renderLayout } from '../../../layouts/base-layouts'
import main from './separator.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
