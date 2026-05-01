import { renderLayout } from '../../../layouts/base-layouts'
import main from './tile.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
