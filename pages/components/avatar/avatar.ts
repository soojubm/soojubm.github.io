import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './avatar.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
})
