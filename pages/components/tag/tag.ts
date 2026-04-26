import { renderLayout } from '../../../layouts/base-layouts'
import main from './tag.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
