import { renderDocumentLayout } from '../../layouts/document-layout'
import main from './index.html'

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main, { footer: true })
})
