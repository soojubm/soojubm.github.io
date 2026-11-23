import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { codeTextStyles } from '@/components/common/text/semantics/code.styles'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * <mm-code>
 * 본문 속 컴포넌트 이름, 속성, 토큰처럼 코드로 읽어야 하는 짧은 조각입니다.
 * 여러 줄 스니펫은 mm-code-block을 사용합니다.
 */
@customElement('mm-code')
export class Code extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-block;
      }

      code {
        display: inline-flex;
        vertical-align: 1px;
        align-items: center;
        height: 20px;
        padding: 0 var(--space-1);
        border: var(--border);
        border-radius: var(--border-radius);
        box-sizing: border-box;
        background: var(--background-color);
        ${codeTextStyles};
        color: var(--foreground-danger-color);
      }
    `,
  ]

  render() {
    return html`
      <code><slot></slot></code>
    `
  }
}
