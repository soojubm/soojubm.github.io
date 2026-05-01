import { renderLayout } from '../../../layouts/base-layouts'
import main from './signifier.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
