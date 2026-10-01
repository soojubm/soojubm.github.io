import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement
type AnchorEdge = 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'

interface AnchorOptions {
  /** 위치를 재는 기준 요소 */
  getAnchor: () => HTMLElement | undefined
  /** 열려 있는 동안에만 기준 요소를 따라간다 */
  isOpen: () => boolean
  /** 기준 요소의 좌표와 그 값을 host에 싣는 CSS 변수. CSS가 읽는 좌표만 넘긴다 */
  variables: Partial<Record<AnchorEdge, string>>
}

/**
 * portal로 옮겨져 기준 요소의 자손이 아닌 표면이, 기준 요소의 화면 좌표를 CSS 변수로 받게 하는 ReactiveController.
 *
 * 열려 있는 동안 렌더가 끝날 때마다, 그리고 scroll·resize마다 좌표를 다시 재고 host에 싣는다.
 * 놓이는 자리는 CSS가 이 변수로 정하므로 컨트롤러는 어느 모서리에 맞출지 모른다.
 * scroll·resize 리스너는 열려 있는 동안에만 걸고 닫히거나 연결이 끊기면 대칭으로 정리하므로,
 * 닫힌 표면이 window 이벤트마다 깨어나지 않는다.
 */
export class AnchorController implements ReactiveController {
  constructor(private host: Host, private options: AnchorOptions) {
    host.addController(this)
  }

  hostConnected() {
    this.syncListeners()
  }

  hostUpdated() {
    this.syncListeners()
    this.measure()
  }

  hostDisconnected() {
    this.unlisten()
  }

  // 같은 리스너를 같은 옵션으로 다시 걸어도 한 번만 등록되므로 열려 있는 동안 반복 호출해도 안전하다.
  private syncListeners() {
    if (!this.options.isOpen()) {
      this.unlisten()
      return
    }

    window.addEventListener('scroll', this.handleViewportChange, { capture: true, passive: true })
    window.addEventListener('resize', this.handleViewportChange)
  }

  private unlisten() {
    window.removeEventListener('scroll', this.handleViewportChange, { capture: true })
    window.removeEventListener('resize', this.handleViewportChange)
  }

  private handleViewportChange = () => {
    this.measure()
  }

  private measure() {
    if (!this.options.isOpen()) return

    const anchor = this.options.getAnchor()
    if (!anchor) return

    const rect = anchor.getBoundingClientRect()
    const edges = Object.entries(this.options.variables) as [AnchorEdge, string][]
    for (const [edge, variable] of edges) this.host.style.setProperty(variable, `${rect[edge]}px`)
  }
}
