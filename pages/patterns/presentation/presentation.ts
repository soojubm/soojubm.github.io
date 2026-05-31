import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'

/** mm-sheet의 공개 메서드만 사용한다 */
type SheetElement = HTMLElement & { open(): void; close(): void }

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
  setupSheetTriggers()
})

/**
 * [data-open-sheet] 트리거를 대응하는 mm-sheet에 연결한다.
 * 값이 #id / .class 형태면 선택자로, 그 외에는 sheet type으로 해석한다.
 * (닫기는 mm-sheet가 sheetclose 이벤트로 스스로 처리하므로 별도 배선이 필요 없다.)
 */
function setupSheetTriggers() {
  document.querySelectorAll<HTMLElement>('[data-open-sheet]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const value = trigger.dataset.openSheet ?? ''
      const selector = /^[#.]/.test(value) ? value : `mm-sheet[type="${value}"]`
      document.querySelector<SheetElement>(selector)?.open()
    })
  })
}
