import './table.css'
import './pagination.css'
import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
})
