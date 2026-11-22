import { LitElement, html, type CSSResultOrNative } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentTokensStyles } from '@/components/domains/component/component.styles'
import {
  formatTokenName,
  tokenCategoryLabel,
  tokenCategorySortIndex,
} from '@/components/domains/component/token.utils'

/**
 * 컴포넌트 CSS 커스텀 프로퍼티(토큰) 목록.
 * 카테고리(dimension·surface·state)마다 mm-keyword-tag-group으로 묶어, 카테고리를 제목 태그로, 토큰 이름을 키워드 태그로 나열합니다.
 * 슬롯에는 토큰 목록 아래에 이어 붙일 콘텐츠(예: 토큰 값 카드)를 넣는다.
 * 목록은 손으로 적지 않고 elements로 넘긴 컴포넌트의 스타일에서 직접 읽어, 코드와 문서가 어긋나지 않게 한다.
 */
@customElement('mm-component-tokens')
export class ComponentTokens extends LitElement {
  static styles = componentTokensStyles
  @property({ attribute: false }) elements: string[] = []

  render() {
    const groups = this.groupedNames(this.sortedNames())

    return html`
      <section class="component-content-frame" style="margin-top: var(--space-4)">
        <div class="token-list">
          ${groups.map(
            ({ label, names }) =>
              html`
                <mm-keyword-tag-group
                  heading=${label}
                  .keywords=${names.map(formatTokenName)}
                ></mm-keyword-tag-group>
              `,
          )}
          <slot></slot>
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

  // 정렬된 토큰에서 카테고리가 같은 연속 구간을 한 그룹으로 묶는다.
  private groupedNames(names: string[]) {
    return names.reduce<{ label: string; names: string[] }[]>((groups, name) => {
      const label = tokenCategoryLabel(name)
      const last = groups[groups.length - 1]
      if (last?.label === label) {
        last.names.push(name)
        return groups
      }

      return [...groups, { label, names: [name] }]
    }, [])
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
