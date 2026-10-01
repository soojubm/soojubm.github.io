import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

// 옮겨진 host는 원래 자리의 트리와 함께 사라지지 않는다. 모든 컨트롤러가 관찰자 하나를 나눠 쓰며,
// 자리표 주석이 문서에서 떨어졌는지(소비자가 DOM에서 빠졌는지)를 살펴 host를 걷어낸다.
const watched = new Set<PortalController>()
let observer: MutationObserver | undefined

const releaseOrphans = () => watched.forEach(controller => controller.releaseIfOrphaned())

const watch = (controller: PortalController, roots: Node[]) => {
  observer ??= new MutationObserver(releaseOrphans)
  watched.add(controller)
  roots.forEach(root => observer?.observe(root, { childList: true, subtree: true }))
}

const unwatch = (controller: PortalController) => {
  watched.delete(controller)
  if (watched.size > 0) return

  observer?.disconnect()
  observer = undefined
}

/**
 * 연결된 동안 host를 index.html의 portal 컨테이너(#portal-root)로 옮겨, 조상의 transform·contain·stacking context에
 * 갇히지 않게 하는 ReactiveController.
 *
 * React의 createPortal과 같은 역할을 하되 host 노드를 통째로 이동하므로,
 * 이동 중 재실행되는 connected/disconnected lifecycle은 moving 플래그로 무시한다.
 * 원래 위치는 anchor 주석으로 표시한다. 이 주석이 문서에서 떨어지면(소비자가 DOM에서 빠지면) 옮겨간 host도 함께 걷어낸다.
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
    this.move(() => document.getElementById('portal-root')?.append(this.host))
    this.portaled = true
    watch(this, this.ancestorRoots)
  }

  /**
   * 옮기기 전 자리의 root(document나 소비자의 shadow root). 자리표 주석이 그곳에 남아 있어,
   * 옮겨진 뒤에도 선언한 트리 안의 요소(aria-controls로 가리키는 트리거 등)를 찾을 때 쓴다.
   */
  get originRoot() {
    const origin = this.portaled ? this.anchor : this.host
    return origin.getRootNode() as Document | ShadowRoot
  }

  hostDisconnected() {
    if (this.moving) return
    if (!this.portaled) return

    this.anchor.remove()
    this.portaled = false
    unwatch(this)
  }

  /** 자리표가 문서에서 떨어졌으면 옮겨간 host를 걷어낸다. 공유 관찰자가 부른다. */
  releaseIfOrphaned() {
    if (!this.portaled || this.anchor.isConnected) return

    this.host.remove()
  }

  // 소비자가 놓인 트리와 그 바깥 shadow 트리들의 root. 어느 단계에서 빠져도 알아채도록 모두 관찰한다.
  private get ancestorRoots() {
    const roots: Node[] = []
    let root = this.anchor.getRootNode()
    roots.push(root)
    while (root instanceof ShadowRoot) {
      root = root.host.getRootNode()
      roots.push(root)
    }

    return roots
  }

  // host 이동은 disconnected/connected를 재실행하므로 그 사이 자기 정리를 막는다.
  private move(run: () => void) {
    this.moving = true
    run()
    this.moving = false
  }
}
