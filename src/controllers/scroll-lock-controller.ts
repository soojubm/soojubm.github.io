import type { ReactiveController, ReactiveControllerHost } from 'lit'

// 여러 호스트가 동시에 잠글 수 있으므로 전역 카운트로 관리한다.
// 마지막 호스트가 해제될 때만 body 스타일을 원복한다.
let scrollLockCount = 0
let lockedScrollY = 0
let previousBodyStyles: Partial<CSSStyleDeclaration> = {}

function lockBodyScroll() {
  scrollLockCount += 1
  if (scrollLockCount > 1) return

  lockedScrollY = window.scrollY
  previousBodyStyles = {
    left: document.body.style.left,
    overflow: document.body.style.overflow,
    position: document.body.style.position,
    right: document.body.style.right,
    top: document.body.style.top,
    width: document.body.style.width,
  }

  document.body.classList.add('lock-scroll')
  document.body.style.position = 'fixed'
  document.body.style.top = `-${lockedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
  document.body.style.overflow = 'hidden'
}

function unlockBodyScroll() {
  if (!scrollLockCount) return

  scrollLockCount -= 1
  if (scrollLockCount > 0) return

  document.body.classList.remove('lock-scroll')
  document.body.style.position = previousBodyStyles.position ?? ''
  document.body.style.top = previousBodyStyles.top ?? ''
  document.body.style.left = previousBodyStyles.left ?? ''
  document.body.style.right = previousBodyStyles.right ?? ''
  document.body.style.width = previousBodyStyles.width ?? ''
  document.body.style.overflow = previousBodyStyles.overflow ?? ''
  window.scrollTo(0, lockedScrollY)

  lockedScrollY = 0
  previousBodyStyles = {}
}

/**
 * 활성 동안 body 스크롤을 잠그는 ReactiveController.
 *
 * 호스트당 한 번만 잠금을 점유하고, host가 disconnect되면 대칭으로 해제하므로
 * 컴포넌트마다 잠금 플래그와 정리 코드를 반복하지 않는다.
 * 전역 카운트를 공유하므로 모달이 중첩되어도 마지막 해제 시에만 원복된다.
 */
export class ScrollLockController implements ReactiveController {
  private locked = false

  constructor(host: ReactiveControllerHost) {
    host.addController(this)
  }

  hostDisconnected() {
    this.set(false)
  }

  /** active이면 잠그고 아니면 해제한다. 같은 상태로의 중복 호출은 무시된다. */
  set(active: boolean) {
    if (active === this.locked) return

    this.locked = active
    if (active) lockBodyScroll()
    else unlockBodyScroll()
  }
}
