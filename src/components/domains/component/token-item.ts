import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { computedTokenValue } from '@/components/domains/component/token-values'
import { ThemeChangeController } from '@/controllers/theme-change-controller'
import '@/components/common'

/**
 * 토큰 이름과 값을 한 칸으로 보여준다.
 * 값은 자기 자리에서 계산된 스타일로 읽으므로 테마를 바꾸면 그 테마의 값이 그대로 나온다.
 * 이름·값 모두 12px bold로 촘촘히 보여줘야 해서 meta-item 대신 mm-text 두 줄을 직접 쌓는다.
 */
@customElement('mm-token-item')
export class TokenItem extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-direction: column;
      padding: var(--space-3) var(--space-4);
      border: var(--border);
      border-radius: var(--radius);
    }
  `

  private themeChange = new ThemeChangeController(this)

  @property({ type: String }) key = ''

  render() {
    return html`
      <mm-text size="12" weight="bold" color="light">${this.key}</mm-text>
      <mm-text size="12" weight="bold">${computedTokenValue(this.key, this)}</mm-text>
    `
  }
}
