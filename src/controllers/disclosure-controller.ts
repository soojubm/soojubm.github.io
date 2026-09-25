import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

interface DisclosureOptions {
  isOpen: () => boolean
  setOpen: (open: boolean) => void
  /** 토글 트리거. 반환값이 없으면 host.id를 aria-controls로 가리키는 요소로 폴백한다 */
  getTrigger?: () => HTMLElement | undefined
}

/**
 * 열고 닫는 모든 disclosure의 트리거 클릭 토글과 aria-expanded 동기화를 소유한다.
 * 여는 표면의 종류(aria-haspopup)는 호스트가 추정하지 않고 트리거가 표준 attribute로 직접 선언한다.
 * 열림 상태 자체는 공개 API라 호스트의 reflected property로 남기고, 컨트롤러는 읽기/쓰기만 위임받는다.
 * 트리거는 getTrigger로 지정하며, 생략하면 aria-controls로 호스트를 가리키는 외부 요소를 기본값으로 찾는다.
 * 외부 클릭·ESC로 스스로 닫히는 동작은 overlay 표면이 각자 소유한다.
 */
export class DisclosureController implements ReactiveController {
  private wiredTrigger?: HTMLElement

  constructor(private host: Host, private options: DisclosureOptions) {
    host.addController(this)
  }

  toggle() {
    this.options.setOpen(!this.options.isOpen())
  }

  hostDisconnected() {
    this.unwireTrigger()
  }

  hostUpdated() {
    this.syncTrigger()
  }

  private get trigger() {
    const explicit = this.options.getTrigger?.()
    if (explicit) return explicit
    if (!this.host.id) return undefined

    const root = this.host.getRootNode() as Document | ShadowRoot
    return root.querySelector<HTMLElement>(`[aria-controls="${this.host.id}"]`) ?? undefined
  }

  // 트리거가 바뀌면 클릭 배선을 옮기고, 열림 상태를 aria로 반영한다.
  private syncTrigger() {
    const trigger = this.trigger
    if (trigger !== this.wiredTrigger) {
      this.unwireTrigger()
      trigger?.addEventListener('click', this.handleTriggerClick)
      this.wiredTrigger = trigger
    }
    if (!trigger) return

    trigger.setAttribute('aria-expanded', String(this.options.isOpen()))
  }

  private handleTriggerClick = () => {
    this.toggle()
  }

  private unwireTrigger() {
    this.wiredTrigger?.removeEventListener('click', this.handleTriggerClick)
    this.wiredTrigger = undefined
  }
}
