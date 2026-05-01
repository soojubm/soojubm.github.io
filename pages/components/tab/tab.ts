import { renderLayout } from '../../../layouts/base-layouts'
import main from './tab.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
