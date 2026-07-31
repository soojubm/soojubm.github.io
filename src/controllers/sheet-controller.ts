import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { PortalController } from '@/controllers/portal-controller'
import { ScrollLockController } from '@/controllers/scroll-lock-controller'

type Host = ReactiveControllerHost & HTMLElement

interface SheetControllerOptions {
  isOpen: () => boolean
  /** 스스로 닫힐 때 호출된다(backdrop 클릭, ESC). 실제 상태 변경은 호스트가 수행한다 */
  onDismiss: () => void
}

/**
 * viewport 기준 modal 표면(mm-sheet, mm-dialog)가 공통으로 소유하는 portal·스크롤 잠금·닫기 배관을
 * 소유하는 ReactiveController. 배경 클릭과 ESC로 스스로 닫히는 처리까지 담당한다.
 * 배경(mm-backdrop)은 호스트의 shadow DOM 안에 있어 클릭이 호스트로 retarget되므로,
 * 닫기 판정은 호스트 자신을 target으로 보는 것으로 충분하다.
 * 열림 상태 자체는 공개 API라 호스트의 reflected property로 남기고, 이 컨트롤러는
 * isOpen/onDismiss로 읽기/알림만 위임받는다.
 */
export class SheetController implements ReactiveController {
  private scrollLock: ScrollLockController

  constructor(private host: Host, private options: SheetControllerOptions) {
    this.scrollLock = new ScrollLockController(host)
    new PortalController(host)

    host.addController(this)
    // 리스너 대상이 host 자신이라 portal 이동에도 유지되므로 생성자에서 한 번만 등록한다.
    host.addEventListener('click', this.handleBackdropClick)
  }

  hostConnected() {
    document.addEventListener('keydown', this.handleKeydown)
  }

  hostDisconnected() {
    document.removeEventListener('keydown', this.handleKeydown)
  }

  hostUpdated() {
    this.scrollLock.set(this.options.isOpen())
  }

  private handleBackdropClick = (e: MouseEvent) => {
    if (!this.options.isOpen()) return
    if (e.target === this.host) this.options.onDismiss()
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !this.options.isOpen()) return
    this.options.onDismiss()
  }
}
