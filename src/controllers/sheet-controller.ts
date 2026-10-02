import type { OpenState } from '@/utils/open-state'
import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { DisclosureController } from '@/controllers/disclosure-controller'
import { EscapeKeyController } from '@/controllers/escape-key-controller'
import { PortalController } from '@/controllers/portal-controller'
import { ScrollLockController } from '@/controllers/scroll-lock-controller'
import { getDeepActiveElement } from '@/utils'

type Host = ReactiveControllerHost & HTMLElement & OpenState
type DismissOn = 'backdrop' | 'escape'

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
  /** 스스로 닫히는 조건. 표면의 용도가 정하므로 호스트가 명시한다 */
  dismissOn: DismissOn[]
}

/**
 * viewport 기준 modal 표면(mm-sheet, mm-dialog)이 공통으로 쓰는 트리거·portal·스크롤 잠금·
 * 닫기 배관을 소유하는 ReactiveController. dismissOn에 켠 배경 클릭·ESC로 스스로 닫히는 처리까지 담당한다.
 * 배경(mm-backdrop)은 호스트의 shadow DOM 안에 있어 클릭이 호스트로 retarget되므로,
 * 닫기 판정은 호스트 자신을 target으로 보는 것으로 충분하다.
 * 여는 쪽은 popover와 같은 규약을 쓴다. aria-controls로 호스트를 가리키는 요소가 트리거가 되고,
 * 클릭 토글과 aria-expanded 반영은 DisclosureController가 맡고, aria-haspopup="dialog"는 트리거가
 * 직접 선언한다. 트리거는 portal로 옮겨지기 전 자리의 root에서 찾으므로 소비자의 shadow 안에 있어도 된다.
 * 열림 상태는 호스트가 `OpenState`로 소유하고, 이 컨트롤러는 `open`을 읽고 `close()`로 닫기만 한다.
 * 열고 닫힐 때의 toggle 이벤트는 DisclosureController가 디스패치한다.
 * 포커스는 열린 동안 portal 컨테이너 바깥의 body 자식과 이미 열려 있는 아래쪽 모달 표면을 inert로 만들어
 * 표면 안에 가두고, 닫히면 inert를 풀고 연 요소로 돌려준다. shadow DOM을 가로지르는 Tab 순서를 직접 계산하지 않기 위해서다.
 * 모달이 겹쳐 열리면 같은 요소를 여러 표면이 맡으므로, 닫히는 순서와 무관하게 마지막 표면이 닫힐 때 푼다.
 */
export class SheetController implements ReactiveController {
  private scrollLock: ScrollLockController
  private wasOpen = false
  private returnFocusElement?: HTMLElement
  private inertElements: HTMLElement[] = []

  constructor(private host: Host, private options: SheetControllerOptions) {
    this.scrollLock = new ScrollLockController(host)
    const portal = new PortalController(host)
    new DisclosureController(host, { getRoot: () => portal.originRoot })
    new EscapeKeyController(host, this.handleEscapeKeydown)

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
    if (!this.options.dismissOn.includes('backdrop') || !this.host.open) return
    if (e.target === this.host) this.host.close()
  }
  private handleEscapeKeydown = () => {
    if (!this.options.dismissOn.includes('escape')) return

    this.host.close()
  }
}
