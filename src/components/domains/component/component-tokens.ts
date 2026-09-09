import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentTokensStyles } from '@/components/domains/component/component.styles'
import '@/components/domains/component/token'
import {
  tokenCategoryLabel,
  tokenCategorySortIndex,
} from '@/components/domains/component/token.utils'

export interface ComponentTokenItemData {
  name: string
  default: string
  // 이 토큰 값을 재할당하는 prop. prop 프리셋 밖의 값을 잡을 때 이 토큰을 override 한다.
  prop?: string
}

/**
 * 컴포넌트 CSS 커스텀 프로퍼티(토큰) 목록.
 * mm-component-props와 동일한 레이아웃으로 토큰을 소개합니다.
 */
@customElement('mm-component-tokens')
export class ComponentTokens extends LitElement {
  static styles = componentTokensStyles

  @property({ attribute: false }) tokens: ComponentTokenItemData[] = []

  render() {
    const tokens = this.sortedTokens()

    return html`
      <section class="component-content-frame" style="margin-top: var(--space-4)">
        <!-- <mm-heading>Component Tokens</mm-heading> -->
        <div class="token-list">
          ${tokens.map(
            (token, index) =>
              html`
                <mm-token
                  name=${token.name}
                  default=${token.default}
                  prop=${token.prop ?? ''}
                  .showCategory=${this.isCategoryStart(tokens, index)}
                ></mm-token>
              `,
          )}
        </div>
      </section>
    `
  }

  // 카테고리 태그를 한 번만 보이려면 같은 카테고리 토큰이 서로 붙어 있어야 하므로,
  // 작성 순서 대신 표시 순서(dimension → surface → state)로 먼저 묶는다.
  private sortedTokens() {
    return [...this.tokens].sort(
      (a, b) => tokenCategorySortIndex(a.name) - tokenCategorySortIndex(b.name),
    )
  }

  // 앞선 토큰과 카테고리가 같으면 그 행에서는 태그를 생략해, 같은 분류가 이어지는 구간에서
  // 맨 위 한 번만 보이게 한다.
  private isCategoryStart(tokens: ComponentTokenItemData[], index: number) {
    if (index === 0) return true

    return tokenCategoryLabel(tokens[index].name) !== tokenCategoryLabel(tokens[index - 1].name)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-tokens': ComponentTokens
  }
}
