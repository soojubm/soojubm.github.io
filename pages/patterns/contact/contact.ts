import './contact.css'

import main from './index.html'
import { renderLayout } from '../../../layouts/base-layouts'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main)
})
