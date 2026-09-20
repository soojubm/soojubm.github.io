import type { ReactiveController, ReactiveControllerHost } from 'lit'

/**
 * 미디어 쿼리의 일치 여부가 바뀌면 호스트를 다시 렌더한다.
 * 같은 조건을 CSS로 표현할 수 있으면 미디어 쿼리를 쓰고, 이 컨트롤러는
 * 화면 크기에 따라 표면 컴포넌트 자체가 갈리는 것처럼 render에서 골라야 하는 분기에만 쓴다.
 * 조건은 constants의 MEDIA_QUERY를 넘겨 브레이크포인트를 CSS와 한 곳에서 공유한다.
 */
export class MediaQueryController implements ReactiveController {
  private query: MediaQueryList

  constructor(private host: ReactiveControllerHost, query: string) {
    this.query = window.matchMedia(query)
    host.addController(this)
  }

  get matches() {
    return this.query.matches
  }

  hostConnected() {
    this.query.addEventListener('change', this.handleQueryChange)
  }

  hostDisconnected() {
    this.query.removeEventListener('change', this.handleQueryChange)
  }

  private handleQueryChange = () => {
    this.host.requestUpdate()
  }
}
