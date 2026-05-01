import { renderLayout } from '../../../layouts/base-layouts'
import main from './menuitem.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
