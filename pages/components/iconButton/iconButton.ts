import { renderLayout } from '../../../layouts/base-layouts'
import main from './iconButton.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
