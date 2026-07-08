import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

// 트리거는 aria-controls로 popover를 가리키기만 하면 되고, 클릭 토글·외부 클릭·ESC 닫기·aria는 popover가 소유한다.
document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
})
