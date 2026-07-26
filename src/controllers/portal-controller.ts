import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

/**
 * 연결된 동안 host를 document.body로 옮겨, 조상의 transform·contain·stacking context에
 * 갇히지 않게 하는 ReactiveController.
 *
 * React의 createPortal과 같은 역할을 하되 host 노드를 통째로 이동하므로,
 * 이동 중 재실행되는 connected/disconnected lifecycle은 moving 플래그로 무시한다.
 * 원래 위치는 anchor 주석으로 표시해 disconnect 시 그대로 복원한다.
 *
 * open 상태가 아니라 connect 생명주기에 이동을 묶은 이유: open이 바뀌는 시점에 이동까지 겹치면
 * "이동 직후 열림"이 같은 프레임에서 처리되어 브라우저가 전환 시작 스타일을 커밋하지 못하고
 * CSS transition이 재생되지 않는다. host는 항상 미리 마운트돼 있고 open만 토글되므로,
 * 이동을 connect 시점으로 분리해두면 open 전환 전에 위치가 이미 안정된 상태다.
 */
export class PortalController implements ReactiveController {
  private anchor = document.createComment('portal')
  private portaled = false
  private moving = false

  constructor(private host: Host) {
    host.addController(this)
  }

  hostConnected() {
    if (this.portaled || this.moving) return

    this.host.before(this.anchor)
    this.move(() => document.body.appendChild(this.host))
    this.portaled = true
  }

  hostDisconnected() {
    if (this.moving) return
    if (!this.portaled) return

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
