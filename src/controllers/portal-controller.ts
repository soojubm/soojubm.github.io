import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

// 옮겨진 host는 원래 자리의 트리와 함께 사라지지 않는다. 모든 컨트롤러가 관찰자 하나를 나눠 쓰며,
// 자리표 주석이 문서에서 떨어졌는지(소비자가 DOM에서 빠졌는지)를 살펴 host를 걷어낸다.
const watched = new Set<PortalController>()
let observer: MutationObserver | undefined

const removeOrphans = () => watched.forEach(controller => controller.removeIfOrphaned())

const watch = (controller: PortalController, roots: Node[]) => {
  observer ??= new MutationObserver(removeOrphans)
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
 * 연결된 동안 host를 #portal-root로 옮겨, 조상의 transform·contain·stacking context에 갇히지 않게 하는 ReactiveController.
 * 원래 자리는 주석 노드로 표시하고, 이 노드가 문서에서 떨어지면 옮겨간 host도 걷어낸다. 이동 중 재실행되는 connected/disconnected는 moving 플래그로 무시한다.
 * 이동을 open이 아니라 connect 시점에 묶은 것은, 둘이 같은 프레임에 겹치면 CSS transition이 재생되지 않기 때문이다.
 * 열릴 때 만들어지는 표면(tooltip 말풍선)은 `@starting-style`로 전환을 재생한다.
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
  removeIfOrphaned() {
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
