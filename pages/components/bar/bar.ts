import { renderLayout } from '../../../layouts/base-layouts'
import main from './bar.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
