import { renderLayout } from '../../../layouts/base-layouts'
import main from './callout.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
