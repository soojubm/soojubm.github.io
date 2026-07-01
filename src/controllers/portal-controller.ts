import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

interface PortalControllerOptions {
  /** portal로 띄울 조건. 거짓이면 원래 위치로 복원한다. */
  isActive: () => boolean
  /** 텔레포트 대상. 기본은 document.body */
  root?: () => HTMLElement
}

/**
 * 활성 동안 host를 portal root(기본 document.body)로 옮겨, 조상의
 * transform·contain·stacking context에 갇히지 않게 하는 ReactiveController.
 *
 * React의 createPortal과 같은 역할을 하되 host 노드를 통째로 이동하므로,
 * 이동 중 재실행되는 connected/disconnected lifecycle은 moving 플래그로 무시한다.
 * 원래 위치는 anchor 주석으로 표시해 비활성 시 그대로 복원한다.
 *
 * host 이동은 host의 lifecycle을 재실행하므로, 함께 붙는 컨트롤러의
 * 정리 순서에 주의해야 한다(예: 스크롤 잠금은 portal 이후에 걸고, 복원 이전에 푼다).
 */
export class PortalController implements ReactiveController {
  private anchor = document.createComment('portal')
  private portaled = false
  private moving = false

  constructor(private host: Host, private options: PortalControllerOptions) {
    host.addController(this)
  }

  hostDisconnected() {
    if (this.moving) return
    this.removeFromRoot()
  }

  /** 현재 isActive 상태에 맞춰 portal/복원을 동기화한다. */
  sync() {
    if (this.options.isActive()) this.activate()
    else this.deactivate()
  }

  private get root() {
    return this.options.root?.() ?? document.body
  }

  private activate() {
    if (this.portaled) return

    this.host.before(this.anchor)
    this.move(() => this.root.appendChild(this.host))
    this.portaled = true
  }

  private deactivate() {
    if (!this.portaled) return

    this.move(() => this.anchor.replaceWith(this.host))
    this.portaled = false
  }

  private removeFromRoot() {
    if (!this.portaled) return

    this.host.remove()
    this.anchor.remove()
    this.portaled = false
  }

  // host 이동은 disconnected/connected를 재실행하므로 그 사이 자기 정리를 막는다.
  private move(run: () => void) {
    this.moving = true
    run()
    this.moving = false
  }
}
