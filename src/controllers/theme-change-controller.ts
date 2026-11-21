import type { ReactiveController, ReactiveControllerHost } from 'lit'

// data-theme는 body 하나에만 붙으므로 관찰자도 하나면 된다.
// 토큰 카드가 수십 개씩 붙는 문서 페이지에서 인스턴스마다 관찰자를 만들지 않도록 모듈이 소유한다.
const hosts = new Set<ReactiveControllerHost>()
let observer: MutationObserver | undefined

function watchTheme() {
  if (observer) return

  observer = new MutationObserver(() => hosts.forEach(host => host.requestUpdate()))
  observer.observe(document.body, { attributeFilter: ['data-theme'] })
}

/**
 * 테마가 바뀌면 컴포넌트를 다시 렌더하는 ReactiveController.
 * 계산된 스타일에서 값을 읽는 요소는 CSS 변수가 교체된 것을 Lit이 알 수 없어 쓴다. data-theme 관찰자는 모듈이 하나만 둔다.
 */
export class ThemeChangeController implements ReactiveController {
  constructor(private host: ReactiveControllerHost) {
    host.addController(this)
  }

  hostConnected() {
    watchTheme()
    hosts.add(this.host)
  }

  hostDisconnected() {
    hosts.delete(this.host)
    if (hosts.size > 0) return

    observer?.disconnect()
    observer = undefined
  }
}
