import type { ReactiveController, ReactiveControllerHost } from 'lit'

interface ScrollSpyOptions {
  /** IntersectionObserver root. 생략하면 viewport를 기준으로 관찰한다. */
  root?: Element | Document | null
  /** host 업데이트 후 root를 다시 계산한다. */
  getRoot?: () => Element | Document | null
  /** IntersectionObserver rootMargin (기본: 뷰포트 상단 30% 영역에서 활성) */
  rootMargin?: string
  /** host 업데이트 후 관찰할 대상을 다시 계산한다. */
  getTargets?: () => Element[]
  /** 활성 대상이 바뀔 때 해당 요소의 id로 호출된다. */
  onActiveChange: (id: string) => void
}

/**
 * 화면에 보이는 섹션을 추적하는 ReactiveController.
 *
 * 스크롤 이벤트 + offsetTop 계산(레거시) 대신 IntersectionObserver를 사용하고,
 * host 분리 시 observer를 자동으로 정리한다.
 * observe()로 관찰 대상을 (재)설정한다.
 */
export class ScrollSpyController implements ReactiveController {
  private observer?: IntersectionObserver
  private targets: Element[] = []

  constructor(private host: ReactiveControllerHost, private options: ScrollSpyOptions) {
    host.addController(this)
  }

  observe(targets: Element[]) {
    if (this.hasSameTargets(targets)) return

    this.disconnect()
    this.targets = targets

    if (!targets.length) return

    this.observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) this.options.onActiveChange(visible[0].target.id)
      },
      {
        root: this.options.getRoot?.() ?? this.options.root ?? null,
        rootMargin: this.options.rootMargin ?? '0px 0px -70% 0px',
      },
    )
    targets.forEach(target => this.observer?.observe(target))
  }

  hostUpdated() {
    if (this.options.getTargets) this.observe(this.options.getTargets())
  }

  private disconnect() {
    this.observer?.disconnect()
    this.observer = undefined
  }

  private hasSameTargets(targets: Element[]) {
    return (
      this.targets.length === targets.length &&
      this.targets.every((target, i) => target === targets[i])
    )
  }

  hostDisconnected() {
    this.disconnect()
    this.targets = []
  }
}
