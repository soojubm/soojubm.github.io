import { renderLayout } from '../../../layouts/base-layouts'
import main from './avatar.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
