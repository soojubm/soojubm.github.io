import { LitElement, css } from 'lit'
import { customElement } from 'lit/decorators.js'

import { dotStyles } from '@/components/common/dot/dot.styles'

/**
 * 색 하나만 갖는 점. 상태 어휘를 갖지 않으므로 색은 소비처가 --dot-background-color로 정한다.
 * 범례처럼 옆에 붙는 라벨이 이름을 맡는 자리에 쓰고, 점이 스스로 상태를 뜻해야 하면 mm-status-dot을 쓴다.
 */
@customElement('mm-dot')
export class Dot extends LitElement {
  static styles = css`
    :host {
      ${dotStyles}
    }
  `

  // 색 면만 그리고 이름은 옆 라벨이 맡으므로 보조 기술에는 드러내지 않는다.
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }
}
