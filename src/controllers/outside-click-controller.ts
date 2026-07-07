import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

interface OutsideClickOptions {
  /** 감지할 이벤트 (기본 'pointerdown') */
  event?: 'click' | 'pointerdown'
  /** 활성 상태일 때만 콜백을 실행한다 (닫혀 있으면 바깥 클릭을 무시) */
  isActive?: () => boolean
  /** host 밖이지만 바깥으로 치지 않을 요소들 (예: 열림을 토글하는 트리거) */
  getSafeElements?: () => Array<EventTarget | null | undefined>
}

/**
 * host 바깥을 클릭하면 콜백을 호출하는 ReactiveController.
 *
 * 연결 시 document 리스너를 걸고 해제 시 대칭으로 정리하므로,
 * 컴포넌트마다 connectedCallback/disconnectedCallback에 같은 코드를 반복하지 않는다.
 * composedPath()로 shadow 경계를 넘어 host 포함 여부를 판별하기 때문에,
 * 트리거가 다른 컴포넌트의 shadow DOM에 끼워져도 정상 동작한다.
 */
export class OutsideClickController implements ReactiveController {
  constructor(
    private host: Host,
    private onOutside: () => void,
    private options: OutsideClickOptions = {},
  ) {
    host.addController(this)
  }

  private get event() {
    return this.options.event ?? 'pointerdown'
  }

  hostConnected() {
    document.addEventListener(this.event, this.handleEvent)
  }

  hostDisconnected() {
    document.removeEventListener(this.event, this.handleEvent)
  }

  private handleEvent = (e: Event) => {
    if (this.options.isActive && !this.options.isActive()) return
    const path = e.composedPath()
    if (path.includes(this.host)) return
    const safe = this.options.getSafeElements?.() ?? []
    if (safe.some(el => el != null && path.includes(el))) return
    this.onOutside()
  }
}
