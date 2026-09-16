import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
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

      /* code-block과 같은 면을 쓰되, 본문 줄 안에 앉도록 inline 박스로 좁힌다. */
      code {
        ${surfaceBaseStyles};
        --surface-padding: 0 var(--space-2);

        display: inline-block;
        width: auto;
        font-family: var(--font-family-code);
        font-size: var(--font-size-12);
        font-weight: var(--font-weight-bold);
        color: color-mix(in srgb, var(--foreground-danger-color) 85%, transparent);
      }
    `,
  ]

  render() {
    return html`
      <code><slot></slot></code>
    `
  }
}
