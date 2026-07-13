import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { OutsideClickController } from '@/controllers/outside-click-controller'

type Host = ReactiveControllerHost & HTMLElement

type DismissOn = 'outside' | 'escape'

interface DisclosureOptions {
  /** 호스트의 열림 상태를 읽는다 */
  isOpen: () => boolean
  /** 호스트에 열림 상태 변경을 요청한다 */
  setOpen: (open: boolean) => void
  /** 토글 트리거. 반환값이 없으면 host.id를 aria-controls로 가리키는 요소로 폴백한다 */
  getTrigger?: () => HTMLElement | undefined
  /** 스스로 닫히는 조건 (기본 없음) */
  dismissOn?: DismissOn[]
  /** 트리거에 반영할 aria-haspopup 값 */
  hasPopup?: () => string | undefined
  /** 스스로 닫힐 때 알린다 (예: close 이벤트 발행) */
  onDismiss?: () => void
}

/**
 * 트리거로 열고 스스로 닫히는(dismissable) 레이어형 disclosure의 트리거·닫기·aria 배관을 소유한다.
 * 열림 상태 자체는 공개 API라 호스트의 reflected property로 남기고(컨트롤러는 읽기/쓰기만 위임받는다),
 * aria-controls로 연결된 트리거의 클릭 토글과 aria-expanded·haspopup 동기화, 외부 클릭·ESC 닫기를 담당한다.
 * 트리거가 내부에 있고 닫힘이 없는 제자리(in-place) disclosure(accordion·read-more)는 대상이 아니다.
 */
export class DisclosureController implements ReactiveController {
  private wiredTrigger?: HTMLElement

  constructor(private host: Host, private options: DisclosureOptions) {
    host.addController(this)

    if (!this.dismissOn.includes('outside')) return

    new OutsideClickController(host, () => this.dismiss(), {
      isActive: () => this.options.isOpen() && !!this.trigger,
      getSafeElements: () => [this.trigger],
    })
  }

  toggle() {
    this.options.setOpen(!this.options.isOpen())
  }

  hostConnected() {
    if (!this.dismissOn.includes('escape')) return
    document.addEventListener('keydown', this.handleKeydown)
  }

  hostDisconnected() {
    document.removeEventListener('keydown', this.handleKeydown)
    this.unwireTrigger()
  }

  hostUpdated() {
    this.syncTrigger()
  }

  private get dismissOn() {
    return this.options.dismissOn ?? []
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
    const hasPopup = this.options.hasPopup?.()
    if (hasPopup) trigger.setAttribute('aria-haspopup', hasPopup)
  }

  private handleTriggerClick = () => {
    this.toggle()
  }

  private unwireTrigger() {
    this.wiredTrigger?.removeEventListener('click', this.handleTriggerClick)
    this.wiredTrigger = undefined
  }

  private dismiss() {
    this.options.setOpen(false)
    this.options.onDismiss?.()
  }

  private handleKeydown = (e: KeyboardEvent) => {
    if (e.key !== 'Escape' || !this.options.isOpen() || !this.trigger) return
    this.dismiss()
  }
}
