import type { ReactiveController, ReactiveControllerHost } from 'lit'

interface EscapeKeyOptions {
  /** 열려 있을 때만 콜백을 실행한다 (닫혀 있으면 ESC를 무시) */
  isOpen?: () => boolean
}

/**
 * ESC 키를 누르면 콜백을 호출하는 ReactiveController.
 *
 * 연결 시 document 리스너를 걸고 해제 시 대칭으로 정리하므로,
 * 컴포넌트마다 connectedCallback/disconnectedCallback에 같은 코드를 반복하지 않는다.
 * OutsideClickController와 함께 떠 있는 표면이 스스로 닫히는 수단을 이룬다.
 */
export class EscapeKeyController implements ReactiveController {
  constructor(
    host: ReactiveControllerHost,
    private onEscape: () => void,
    private options: EscapeKeyOptions = {},
  ) {
    host.addController(this)
  }

  hostConnected() {
    document.addEventListener('keydown', this.handleDocumentKeydown)
  }

  hostDisconnected() {
    document.removeEventListener('keydown', this.handleDocumentKeydown)
  }

  private handleDocumentKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return
    if (this.options.isOpen && !this.options.isOpen()) return

    this.onEscape()
  }
}
