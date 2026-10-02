import type { ReactiveController, ReactiveControllerHost } from 'lit'

interface ResizeOptions {
  /** 크기를 관찰할 요소들. 렌더 뒤에야 생기는 요소(@query 결과)는 비어 있어도 되며, 생기는 대로 관찰에 더한다 */
  getTargets: () => Array<Element | null | undefined>
  /** 관찰 중인 요소의 크기가 바뀌면 호출된다 */
  onResize: () => void
}

/**
 * 요소들의 크기 변화를 관찰하는 ReactiveController.
 *
 * 연결·렌더가 끝날 때마다 getTargets와 관찰 중인 요소를 맞추고, 연결이 끊기면 관찰자를 정리한다.
 * 그래서 호스트는 최초 연결과 재연결(DOM 이동)을 가르거나 disconnectedCallback에서 관찰자를 끊지 않는다.
 * 호스트 렌더와 무관하게 대상이 바뀌면(부모의 자식 목록 등) refresh로 직접 맞춘다.
 */
export class ResizeController implements ReactiveController {
  private observer?: ResizeObserver
  private observed = new Set<Element>()
  private connected = false

  constructor(host: ReactiveControllerHost, private options: ResizeOptions) {
    host.addController(this)
  }

  hostConnected() {
    this.connected = true
    this.refresh()
  }

  hostUpdated() {
    this.refresh()
  }

  hostDisconnected() {
    this.connected = false
    this.observer?.disconnect()
    this.observer = undefined
    this.observed.clear()
  }

  /** 관찰 대상을 getTargets 기준으로 다시 맞춘다. 연결이 끊긴 동안에는 관찰을 되살리지 않는다. */
  refresh() {
    if (!this.connected) return

    const observer = (this.observer ??= new ResizeObserver(() => this.options.onResize()))
    const targets = new Set(
      this.options.getTargets().filter((target): target is Element => target != null),
    )

    this.observed.forEach(target => {
      if (targets.has(target)) return

      observer.unobserve(target)
      this.observed.delete(target)
    })
    targets.forEach(target => {
      if (this.observed.has(target)) return

      observer.observe(target)
      this.observed.add(target)
    })
  }
}
