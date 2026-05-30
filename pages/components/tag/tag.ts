import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './tag.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
})
