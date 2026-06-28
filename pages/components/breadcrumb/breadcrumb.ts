import main from './breadcrumb.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
})
