import type { OpenState } from '@/utils/open-state'
import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { emit } from '@/utils'

type Host = ReactiveControllerHost & HTMLElement

interface OpenStateDisclosureOptions {
  /** 토글 트리거. 반환값이 없으면 host.id를 aria-controls로 가리키는 요소로 폴백한다 */
  getTrigger?: () => HTMLElement | undefined
  /** aria-controls로 트리거를 찾을 root. portal로 옮겨지는 컴포넌트는 옮기기 전 자리의 root를 넘긴다. 생략하면 컴포넌트의 root */
  getRoot?: () => Document | ShadowRoot
}

interface DisclosureOptions extends OpenStateDisclosureOptions {
  open: () => boolean
  setOpen: (open: boolean) => void
}

/**
 * 트리거를 누르면 컴포넌트를 열고 닫고, 열림 상태를 트리거의 aria-expanded와 toggle 이벤트로 알리는 ReactiveController.
 * 열림 상태는 컴포넌트의 `open`을 따르고(다르게 가지면 open·setOpen을 넘긴다), 트리거는 getTrigger로 지정하거나 aria-controls로 컴포넌트를 가리키는 요소에서 찾는다.
 */
export class DisclosureController implements ReactiveController {
  private wiredTrigger?: HTMLElement
  private wasOpen?: boolean
  private options: DisclosureOptions

  constructor(host: Host & OpenState, options?: OpenStateDisclosureOptions)
  constructor(host: Host, options: DisclosureOptions)
  constructor(
    private host: Host & Partial<OpenState>,
    options: DisclosureOptions | OpenStateDisclosureOptions = {},
  ) {
    this.options = {
      open: () => !!host.open,
      setOpen: open => (open ? host.show?.() : host.close?.()),
      ...options,
    }
    host.addController(this)
  }

  toggle() {
    this.options.setOpen(!this.options.open())
  }

  hostDisconnected() {
    this.unwireTrigger()
  }

  hostUpdated() {
    this.syncTrigger()
    this.dispatchToggle()
  }

  /** 이 표면의 트리거. 표면이 기준 위치로 쓰기도 한다(mm-popover). */
  get trigger() {
    const explicit = this.options.getTrigger?.()
    if (explicit) return explicit
    if (!this.host.id) return undefined

    const root = this.options.getRoot?.() ?? (this.host.getRootNode() as Document | ShadowRoot)
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

    const expanded = String(this.options.open())
    if (trigger.getAttribute('aria-expanded') === expanded) return

    trigger.setAttribute('aria-expanded', expanded)
  }

  // 렌더가 끝날 때마다 직전 열림 값과 비교해 toggle을 알리므로, 트리거·외부 클릭·ESC 등 어느 경로로 바뀌어도 한 번씩 나간다.
  // 첫 렌더는 기록만 한다. 버블링하지 않아 안에 둔 다른 disclosure의 toggle이 바깥 리스너에 섞이지 않는다.
  private dispatchToggle() {
    const open = this.options.open()
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
