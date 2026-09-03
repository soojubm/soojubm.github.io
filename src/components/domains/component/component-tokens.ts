import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { componentTokensStyles } from '@/components/domains/component/component.styles'
import '@/components/domains/component/token'
import { arrayAttributeConverter } from '@/utils'

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

  @property({
    attribute: 'tokens',
    converter: arrayAttributeConverter<ComponentTokenItemData>(),
  })
  tokens: ComponentTokenItemData[] = []

  render() {
    return html`
      <section class="component-content-frame" style="margin-top: var(--space-4)">
        <!-- <mm-heading>Component Tokens</mm-heading> -->
        <div class="token-list">
          ${this.tokens.map(
            token =>
              html`
                <mm-token
                  name=${token.name}
                  default=${token.default}
                  prop=${token.prop ?? ''}
                ></mm-token>
              `,
          )}
        </div>
      </section>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-component-tokens': ComponentTokens
  }
}
