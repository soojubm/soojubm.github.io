import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

interface OutsideClickOptions {
  /** 열려 있는 동안만 document 리스너를 건다. 생략하면 연결된 동안 계속 건다 */
  isOpen?: () => boolean
  /** host 밖이지만 바깥으로 치지 않을 요소들 (예: 열림을 토글하는 트리거) */
  getSafeElements?: () => Array<EventTarget | null | undefined>
}

/**
 * host 바깥을 누르면 콜백을 호출하는 ReactiveController.
 *
 * 열려 있는 동안에만 document 리스너를 걸고 닫히거나 해제되면 대칭으로 뺀다.
 * 닫힌 채 연결만 된 컴포넌트가 많아도 누를 때마다 호출되지 않으며, 컴포넌트마다
 * connectedCallback/disconnectedCallback에 같은 코드를 반복하지 않는다.
 * composedPath()로 shadow 경계를 넘어 host 포함 여부를 판별하기 때문에,
 * 트리거가 다른 컴포넌트의 shadow DOM에 끼워져도 정상 동작한다.
 */
export class OutsideClickController implements ReactiveController {
  private listening = false

  constructor(
    private host: Host,
    private onOutside: () => void,
    private options: OutsideClickOptions = {},
  ) {
    host.addController(this)
  }

  hostConnected() {
    this.syncListener()
  }

  hostUpdated() {
    this.syncListener()
  }

  hostDisconnected() {
    this.removeListener()
  }

  // 열림에 맞춰 리스너를 걸고 뺀다. 이미 걸려 있거나 빠져 있으면 아무것도 하지 않는다.
  private syncListener() {
    const shouldListen = this.options.isOpen?.() ?? true
    if (shouldListen) this.addListener()
    else this.removeListener()
  }

  private addListener() {
    if (this.listening) return

    document.addEventListener('pointerdown', this.handleOutsideEvent)
    this.listening = true
  }

  private removeListener() {
    if (!this.listening) return

    document.removeEventListener('pointerdown', this.handleOutsideEvent)
    this.listening = false
  }

  private handleOutsideEvent = (e: Event) => {
    if (this.options.isOpen && !this.options.isOpen()) return
    const path = e.composedPath()
    if (path.includes(this.host)) return
    const safe = this.options.getSafeElements?.() ?? []
    if (safe.some(el => el != null && path.includes(el))) return
    this.onOutside()
  }
}
