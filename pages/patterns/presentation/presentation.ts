import './presentation.css'
import { renderLayout } from '../../../layouts/base-layouts'
import main from './index.html'

/** mm-sheet의 공개 메서드만 사용한다 */
type SheetElement = HTMLElement & {
  open(): void
  close(): void
  toggle(): void
  type: string
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.innerHTML = renderLayout(main, { closeSidebar: true })
  setupSheetTriggers()
  setupToastTrigger()
})

/**
 * [data-open-sheet] 트리거를 대응하는 mm-sheet에 연결한다.
 * 값이 #id / .class 형태면 선택자로, 그 외에는 sheet type으로 해석한다.
 *
 * anchor 타입은 dropdown처럼 트리거 아래에 위치하며 toggle / outside-click 동작을 한다.
 * (닫기는 mm-sheet가 sheetclose 이벤트로 스스로 처리하므로 별도 배선이 필요 없다.)
 */
function setupToastTrigger() {
  const trigger = document.querySelector<HTMLElement>('[data-open-toast]')
  const toast = document.querySelector<HTMLElement>('.toast')
  if (!trigger || !toast) return

  let hideTimer: ReturnType<typeof setTimeout>

  trigger.addEventListener('click', () => {
    clearTimeout(hideTimer)
    toast.classList.add('is-visible')
    hideTimer = setTimeout(() => toast.classList.remove('is-visible'), 3000)
  })
}

function setupSheetTriggers() {
  document.querySelectorAll<HTMLElement>('[data-open-sheet]').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const value = trigger.dataset.openSheet ?? ''
      const selector = /^[#.]/.test(value) ? value : `mm-sheet[type="${value}"]`
      const sheet = document.querySelector<SheetElement>(selector)
      if (!sheet) return

      if (sheet.type === 'anchor') {
        // dropdown과 동일: 트리거 바로 아래에 위치시키고 toggle
        const rect = trigger.getBoundingClientRect()
        sheet.style.top = `${rect.bottom + 4}px`
        sheet.style.left = `${rect.left}px`
        sheet.toggle()
      } else {
        sheet.open()
      }
    })
  })
}
