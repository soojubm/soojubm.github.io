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
