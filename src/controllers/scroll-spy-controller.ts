import type { ReactiveController, ReactiveControllerHost } from 'lit'

interface ScrollSpyOptions {
  /** IntersectionObserver rootMargin (기본: 뷰포트 상단 30% 영역에서 활성) */
  rootMargin?: string
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

  constructor(private host: ReactiveControllerHost, private options: ScrollSpyOptions) {
    host.addController(this)
  }

  observe(targets: Element[]) {
    this.disconnect()
    if (!targets.length) return

    this.observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible.length) this.options.onActiveChange(visible[0].target.id)
      },
      { rootMargin: this.options.rootMargin ?? '0px 0px -70% 0px' },
    )
    targets.forEach(target => this.observer?.observe(target))
  }

  private disconnect() {
    this.observer?.disconnect()
    this.observer = undefined
  }

  hostDisconnected() {
    this.disconnect()
  }
}
