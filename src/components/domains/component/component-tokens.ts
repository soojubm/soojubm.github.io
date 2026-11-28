import { LitElement, html, nothing, type CSSResultOrNative } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentTokensStyles } from '@/components/domains/component/component.styles'
import '@/components/common'

@customElement('fff-component-tokens')
export class ComponentTokens extends LitElement {
  static styles = componentTokensStyles
  @property({ attribute: false }) elements: string[] = []

  render() {
    return html`
      <section class="component-content-frame" style="margin-top: var(--space-4)">
        <fff-flex wrap="wrap" gap="2">
          ${this.renderNames()}
          <slot></slot>
        </fff-flex>
      </section>
    `
  }

  // elements가 없으면 슬롯의 토큰 카드가 이름을 대신 보여 주므로 목록을 그리지 않는다.
  private renderNames() {
    return this.elements.flatMap(tagName =>
      hostTokenNames(tagName).map(
        name =>
          html`
            <fff-token-item element=${tagName} key=${name}></fff-token-item>
          `,
      ),
    )
  }
}

// 컴포넌트가 :host에 기본값을 선언한 커스텀 프로퍼티가 곧 공개 토큰이다.
// :host([size]) 같은 상태 selector는 같은 토큰에 값을 재할당할 뿐이라 모으지 않는다.
function hostTokenNames(tagName: string) {
  const sheets = elementStylesOf(tagName).map(style =>
    style instanceof CSSStyleSheet ? style : style.styleSheet,
  )

  const names = [...new Set(sheets.flatMap(sheet => hostCustomProperties(sheet?.cssRules)))]
  return names.sort((a, b) => tokenOrder(a) - tokenOrder(b))
}

// 스타일 선언 순서(크기, 간격, 경계)를 따르고, 같은 단계 안에서는 선언 순서를 유지한다.
const tokenOrderPatterns = [
  /(width|height)$/,
  /(padding|margin|gap|offset)(-|$)/,
  /(border|radius)/,
]

function tokenOrder(name: string) {
  const order = tokenOrderPatterns.findIndex(pattern => pattern.test(name))
  return order === -1 ? tokenOrderPatterns.length : order
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
