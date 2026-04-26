import { renderLayout } from '../../../layouts/base-layouts'
import main from './breadcrumb.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
