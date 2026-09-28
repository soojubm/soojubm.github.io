import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { emit } from '@/utils'

type Host = ReactiveControllerHost & HTMLElement

interface DisclosureOptions {
  isOpen: () => boolean
  setOpen: (open: boolean) => void
  /** 토글 트리거. 반환값이 없으면 host.id를 aria-controls로 가리키는 요소로 폴백한다 */
  getTrigger?: () => HTMLElement | undefined
}

/**
 * 열고 닫는 모든 disclosure의 트리거 클릭 토글, aria-expanded 동기화, toggle 이벤트 발행을 소유한다.
 * 여는 표면의 종류(aria-haspopup)는 호스트가 추정하지 않고 트리거가 표준 attribute로 직접 선언한다.
 * 열림 상태 자체는 공개 API라 호스트의 reflected property로 남기고, 컨트롤러는 읽기/쓰기만 위임받는다.
 * 트리거는 getTrigger로 지정하며, 생략하면 aria-controls로 호스트를 가리키는 외부 요소를 기본값으로 찾는다.
 * 외부 클릭·ESC로 스스로 닫히는 동작은 overlay 표면이 각자 소유한다.
 */
export class DisclosureController implements ReactiveController {
  private wiredTrigger?: HTMLElement
  private wasOpen?: boolean

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
    this.dispatchToggle()
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

  // 호스트가 열리거나 닫히면 호스트 요소에서 toggle 이벤트를 디스패치한다. 호스트를 쓰는 쪽(소비자)은
  // 이 이벤트에 리스너를 달아, 호스트가 외부 클릭·ESC처럼 스스로 닫힌 경우에도 자기 상태(펼침 표시 등)를 맞춘다.
  // 열림 여부는 렌더가 끝날 때마다 직전 값과 비교해 판단하므로, 트리거·외부 클릭·ESC·소비자의 open 변경 중
  // 어느 경로로 바뀌었든 한 번씩 나간다. 첫 렌더는 바뀐 것이 아니므로 비교할 값만 기록한다.
  // 네이티브 toggle처럼 버블링하지 않아 호스트에 직접 단 리스너만 받는다. 안에 둔 다른 disclosure의 toggle이
  // 부모로 올라가 바깥 리스너에 섞이지 않게 하기 위해서다.
  private dispatchToggle() {
    const open = this.options.isOpen()
    const wasOpen = this.wasOpen
    this.wasOpen = open
    if (wasOpen === undefined || wasOpen === open) return

    emit(this.host, 'toggle', { open }, { bubbles: false, composed: false })
  }

  private handleTriggerClick = () => {
    this.toggle()
  }

  private unwireTrigger() {
    this.wiredTrigger?.removeEventListener('click', this.handleTriggerClick)
    this.wiredTrigger = undefined
  }
}
