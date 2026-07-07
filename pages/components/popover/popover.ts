import main from './index.html'
import { renderDocumentLayout } from '../../../layouts/document-layout'

type PopoverElement = HTMLElement & {
  toggle(): void
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderDocumentLayout(main)
  setupPopoverDemo()
})

// 트리거는 popover를 여는 책임만 갖고, 외부 클릭·ESC 닫기와 aria-expanded 반영은 popover가 소유한다.
function setupPopoverDemo() {
  const trigger = document.querySelector<HTMLElement>('#popover-trigger')
  const popover = document.querySelector<PopoverElement>('#demo-popover')
  if (!trigger || !popover) return

  trigger.addEventListener('click', () => popover.toggle())
}
