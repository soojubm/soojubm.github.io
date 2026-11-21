import type { ReactiveController, ReactiveControllerHost } from 'lit'

/**
 * 미디어 쿼리의 일치 여부가 바뀌면 컴포넌트를 다시 렌더하는 ReactiveController.
 * CSS로 쓸 수 있는 조건은 CSS로 쓰고, render에서 분기해야 할 때만 쓴다. 조건은 constants의 MEDIA_QUERY를 넘긴다.
 * 상태도 바꿔야 하면 onChange를 넘긴다. 연결될 때 한 번, 이후 일치 여부가 바뀔 때마다 호출된다.
 */
export class MediaQueryController implements ReactiveController {
  private query: MediaQueryList

  constructor(
    private host: ReactiveControllerHost,
    query: string,
    private onChange?: (matches: boolean) => void,
  ) {
    this.query = window.matchMedia(query)
    host.addController(this)
  }

  get matches() {
    return this.query.matches
  }

  hostConnected() {
    this.query.addEventListener('change', this.handleQueryChange)
    this.onChange?.(this.query.matches)
  }

  hostDisconnected() {
    this.query.removeEventListener('change', this.handleQueryChange)
  }

  private handleQueryChange = () => {
    this.onChange?.(this.query.matches)
    this.host.requestUpdate()
  }
}
