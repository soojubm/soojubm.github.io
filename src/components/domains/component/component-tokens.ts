import { LitElement, html, nothing, type CSSResultOrNative } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentTokensStyles } from '@/components/domains/component/component.styles'
import { formatTokenName } from '@/components/domains/component/token.utils'
import '@/components/common'

/**
 * 컴포넌트 CSS 커스텀 프로퍼티(토큰) 목록.
 * 토큰 이름을 분류 없이 mm-code-tag로 평평하게 나열합니다. elements를 생략하면 목록 없이 슬롯만 보여 줍니다.
 * 슬롯에는 토큰 목록 아래에 이어 붙일 콘텐츠(예: 토큰 값 카드)를 넣는다.
 * 목록은 손으로 적지 않고 elements로 넘긴 컴포넌트의 스타일에서 직접 읽어, 코드와 문서가 어긋나지 않게 한다.
 */
@customElement('mm-component-tokens')
export class ComponentTokens extends LitElement {
  static styles = componentTokensStyles
  @property({ attribute: false }) elements: string[] = []

  render() {
    return html`
      <section class="component-content-frame" style="margin-top: var(--space-4)">
        <div class="token-list">
          ${this.renderNames()}
          <slot></slot>
        </div>
      </section>
    `
  }

  // elements가 없으면 슬롯의 토큰 카드가 이름을 대신 보여 주므로 목록을 그리지 않는다.
  private renderNames() {
    if (!this.elements.length) return nothing

    return html`
      <mm-flex gap="2" wrap="wrap">
        ${this.hostTokenNames().map(
          name =>
            html`
              <mm-code-tag>${formatTokenName(name)}</mm-code-tag>
            `,
        )}
      </mm-flex>
    `
  }

  // 컴포넌트가 :host에 기본값을 선언한 커스텀 프로퍼티가 곧 공개 토큰이다.
  // :host([size]) 같은 상태 selector는 같은 토큰에 값을 재할당할 뿐이라 모으지 않는다.
  private hostTokenNames() {
    const styles = this.elements.flatMap(tagName => elementStylesOf(tagName))
    const sheets = styles.map(style => (style instanceof CSSStyleSheet ? style : style.styleSheet))
    const names = new Set(sheets.flatMap(sheet => hostCustomProperties(sheet?.cssRules)))

    return [...names]
  }
}

function elementStylesOf(tagName: string): CSSResultOrNative[] {
  const element = customElements.get(tagName) as typeof LitElement | undefined
  return element?.elementStyles ?? []
}

// @media나 중첩 규칙 안의 :host 선언도 찾도록 하위 규칙까지 내려간다.
function hostCustomProperties(rules?: CSSRuleList): string[] {
  return [...(rules ?? [])].flatMap(rule => {
    const nested = 'cssRules' in rule ? hostCustomProperties(rule.cssRules as CSSRuleList) : []
    if (!(rule instanceof CSSStyleRule) || rule.selectorText !== ':host') return nested

    const declared = [...rule.style].filter(property => property.startsWith('--'))
    return [...declared.map(property => property.slice(2)), ...nested]
  })
}
