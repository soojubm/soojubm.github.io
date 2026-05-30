import { renderDocumentLayout } from '../../../layouts/document-layout'
import main from './breadcrumb.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
})
