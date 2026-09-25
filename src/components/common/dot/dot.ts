import { LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  dotSizeTokens,
  dotStyles,
  dotToneColors,
  dotToneTokens,
  type DotSize,
  type DotTone,
} from '@/components/common/dot/dot.styles'
import { buildAttributeRules } from '@/utils'

const toneTokens = Object.fromEntries(
  Object.keys(dotToneColors).map(tone => [tone, dotToneTokens(tone as DotTone)]),
)

/**
 * 색 하나만 갖는 점. 상태 어휘를 갖지 않으므로 색은 tone으로만 고른다.
 * 범례처럼 옆에 붙는 라벨이 이름을 맡는 자리에 쓰고, 점이 스스로 상태를 뜻해야 하면 mm-status-dot을 쓴다.
 */
@customElement('mm-dot')
export class Dot extends LitElement {
  static styles = css`
    :host {
      ${dotStyles}
    }

    ${unsafeCSS(buildAttributeRules('tone', toneTokens))}
    ${unsafeCSS(buildAttributeRules('size', dotSizeTokens))}
  `
  @property({ type: String, reflect: true }) tone: DotTone = 'default'
  @property({ type: String, reflect: true, useDefault: true }) size: DotSize = '8'

  // 색 면만 그리고 이름은 옆 라벨이 맡으므로 보조 기술에는 드러내지 않는다.
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }
}
