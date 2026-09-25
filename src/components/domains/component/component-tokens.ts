import type { CSSResultOrNative } from 'lit'

import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentTokensStyles } from '@/components/domains/component/component.styles'
import '@/components/domains/component/token'
import {
  tokenCategoryLabel,
  tokenCategorySortIndex,
} from '@/components/domains/component/token.utils'

/**
 * 컴포넌트 CSS 커스텀 프로퍼티(토큰) 목록.
 * mm-component-props와 동일한 레이아웃으로 토큰을 소개합니다.
 * 목록은 손으로 적지 않고 elements로 넘긴 컴포넌트의 스타일에서 직접 읽어, 코드와 문서가 어긋나지 않게 한다.
 */
@customElement('mm-component-tokens')
export class ComponentTokens extends LitElement {
  static styles = componentTokensStyles
  @property({ attribute: false }) elements: string[] = []

  render() {
    const names = this.sortedNames()

    return html`
      <section class="component-content-frame" style="margin-top: var(--space-4)">
        <!-- <mm-heading>Component Tokens</mm-heading> -->
        <div class="token-list">
          ${names.map(
            (name, index) =>
              html`
                <mm-token
                  name=${name}
                  .showCategory=${this.isCategoryStart(names, index)}
                ></mm-token>
              `,
          )}
        </div>
      </section>
    `
  }

  // 카테고리 태그를 한 번만 보이려면 같은 카테고리 토큰이 서로 붙어 있어야 하므로,
  // 작성 순서 대신 표시 순서(dimension → surface → state)로 먼저 묶는다.
  private sortedNames() {
    return this.hostTokenNames().sort(
      (a, b) => tokenCategorySortIndex(a) - tokenCategorySortIndex(b),
    )
  }

  // 컴포넌트가 :host에 기본값을 선언한 커스텀 프로퍼티가 곧 공개 토큰이다.
  // :host([size]) 같은 상태 selector는 같은 토큰에 값을 재할당할 뿐이라 모으지 않는다.
  private hostTokenNames() {
    const styles = this.elements.flatMap(tagName => elementStylesOf(tagName))
    const sheets = styles.map(style => (style instanceof CSSStyleSheet ? style : style.styleSheet))
    const names = new Set(sheets.flatMap(sheet => hostCustomProperties(sheet?.cssRules)))

    return [...names]
  }

  // 앞선 토큰과 카테고리가 같으면 그 행에서는 태그를 생략해, 같은 분류가 이어지는 구간에서
  // 맨 위 한 번만 보이게 한다.
  private isCategoryStart(names: string[], index: number) {
    if (index === 0) return true

    return tokenCategoryLabel(names[index]) !== tokenCategoryLabel(names[index - 1])
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
