import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { PortalController } from '@/controllers/portal-controller'
import { ScrollLockController } from '@/controllers/scroll-lock-controller'

type Host = ReactiveControllerHost & HTMLElement

interface LayerControllerOptions {
  /** 호스트의 열림 상태를 읽는다 */
  isOpen: () => boolean
  /** 스스로 닫힐 때 호출된다(backdrop 클릭, ESC). 실제 상태 변경은 호스트가 수행한다 */
  onDismiss: () => void
  /** portal 텔레포트 대상. 기본은 document.body */
  portalRoot?: () => HTMLElement
}

/**
 * viewport 기준 modal 레이어(mm-layer, mm-dialog)가 공통으로 소유하는 portal·스크롤 잠금·닫기 배관을
 * 소유하는 ReactiveController. 호스트 자신이 고정 배경(backdrop)이 되는 것을 전제로,
 * 배경 클릭과 ESC로 스스로 닫히는 처리까지 담당한다.
 * 열림 상태 자체는 공개 API라 호스트의 reflected property로 남기고, 이 컨트롤러는
 * isOpen/onDismiss로 읽기/알림만 위임받는다.
 */
export class LayerController implements ReactiveController {
  private scrollLock: ScrollLockController
  private portal: PortalController

  constructor(private host: Host, private options: LayerControllerOptions) {
    this.scrollLock = new ScrollLockController(host)
    this.portal = new PortalController(host, {
      isActive: () => this.options.isOpen(),
      root: this.options.portalRoot,
    })

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
    this.sync()
  }

  // portal과 스크롤 잠금을 함께 동기화한다.
  // host를 portal로 옮기면 lifecycle이 재실행되며 스크롤 잠금이 풀리므로,
  // 열 때는 portal 이후에 잠그고 닫을 때는 잠금을 푼 뒤 복원한다.
  private sync() {
    if (this.options.isOpen()) {
      this.portal.sync()
      this.scrollLock.set(true)
      return
    }

    this.scrollLock.set(false)
    this.portal.sync()
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
