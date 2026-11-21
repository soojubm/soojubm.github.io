import type { OpenState } from '@/utils/open-state'
import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { DisclosureController } from '@/controllers/disclosure-controller'
import { EscapeKeyController } from '@/controllers/escape-key-controller'
import { PortalController } from '@/controllers/portal-controller'
import { ScrollLockController } from '@/controllers/scroll-lock-controller'
import { getDeepActiveElement } from '@/utils'

type Host = ReactiveControllerHost & HTMLElement & OpenState

// 모달이 겹쳐 열려도 아래쪽 표면과 본문이 위 표면이 닫히는 순서와 무관하게 풀리도록, 요소마다 inert를 건 표면의 수를 센다.
// 이미 inert인 요소(닫힌 사이드바 등)는 그 요소가 상태를 소유하므로 세지 않고 건드리지 않는다.
const inertOwners = new WeakMap<HTMLElement, number>()

// 열려 있는 모달 표면. 위에 새 모달이 열리면 이 표면들도 포커스 밖으로 뺀다.
// portal 컨테이너 안의 형제라 body 자식을 거르는 것만으로는 아래쪽 표면이 걸러지지 않는다.
const openModals = new Set<HTMLElement>()

const claimInert = (element: HTMLElement) => {
  const owners = inertOwners.get(element) ?? 0
  if (owners === 0 && element.inert) return false

  inertOwners.set(element, owners + 1)
  element.inert = true
  return true
}

const releaseInert = (element: HTMLElement) => {
  const owners = (inertOwners.get(element) ?? 0) - 1
  if (owners > 0) {
    inertOwners.set(element, owners)
    return
  }

  inertOwners.delete(element)
  element.inert = false
}

interface SheetControllerOptions {
  /** 배경 클릭으로 닫을지. 표면의 용도가 정하므로 컴포넌트가 명시한다. ESC는 항상 닫는다 */
  closeOnBackdrop: boolean
}

/**
 * viewport 기준 modal 표면(mm-sheet, mm-dialog)을 트리거로 열고, portal로 옮기고, 스크롤을 잠그고,
 * ESC와 closeOnBackdrop을 켠 배경 클릭으로 닫아 주는 ReactiveController.
 * 트리거는 aria-controls로 컴포넌트를 가리키는 요소이며, 열림 상태는 컴포넌트의 `open`을 따른다.
 * 열린 동안 나머지 화면을 inert로 만들어 포커스를 표면 안에 가두고, 닫히면 연 요소로 돌려준다.
 */
export class SheetController implements ReactiveController {
  private scrollLock: ScrollLockController
  private wasOpen = false
  private returnFocusElement?: HTMLElement
  private inertElements: HTMLElement[] = []

  constructor(private host: Host, private options: SheetControllerOptions) {
    this.scrollLock = new ScrollLockController(host)
    const portal = new PortalController(host)
    // 부를 메서드가 없어 host에 등록만 하면 된다. 생성자가 addController를 호출한다.
    new DisclosureController(host, { getRoot: () => portal.originRoot })
    new EscapeKeyController(host)

    host.addController(this)
    // 리스너 대상이 host 자신이라 portal 이동에도 유지되므로 생성자에서 한 번만 등록한다.
    host.addEventListener('click', this.handleBackdropClick)
  }

  hostConnected() {
    // 열릴 때 표면 자체가 포커스를 받을 수 있게 하되, Tab 순서에는 넣지 않는다.
    if (!this.host.hasAttribute('tabindex')) this.host.tabIndex = -1
  }

  hostDisconnected() {
    if (this.wasOpen) this.releaseFocus()
  }

  hostUpdated() {
    const open = this.host.open
    this.scrollLock.set(open)

    if (open === this.wasOpen) return

    if (open) {
      this.trapFocus()
      return
    }

    this.releaseFocus()
  }

  private trapFocus() {
    this.wasOpen = true
    this.returnFocusElement = getDeepActiveElement() as HTMLElement | undefined

    // 표면을 담은 body 자식(portal 컨테이너)은 남기고, 그 안에 먼저 열려 있는 모달 표면은 포커스 밖으로 뺀다.
    const bodyChildren = [...document.body.children].filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && !element.contains(this.host),
    )
    const lowerModals = [...openModals]
    openModals.add(this.host)
    this.inertElements = [...new Set([...bodyChildren, ...lowerModals])].filter(claimInert)

    // 네이티브 dialog처럼 autofocus를 단 자손이 있으면 그 요소가, 없으면 표면 자체가 포커스를 받는다.
    const autofocusElement = this.host.querySelector<HTMLElement>('[autofocus]')
    ;(autofocusElement ?? this.host).focus()
  }

  private releaseFocus() {
    this.wasOpen = false
    openModals.delete(this.host)
    this.inertElements.forEach(releaseInert)
    this.inertElements = []

    this.returnFocusElement?.focus()
    this.returnFocusElement = undefined
  }

  private handleBackdropClick = (e: MouseEvent) => {
    if (!this.options.closeOnBackdrop || !this.host.open) return
    if (e.target === this.host) this.host.close()
  }
}
