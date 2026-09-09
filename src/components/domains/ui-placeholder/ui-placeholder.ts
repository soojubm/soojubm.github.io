import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 문서·예제에서 실제 UI가 들어갈 자리를 대신하는 장식용 박스.
 * 높이·배경·모서리는 소비처가 CSS custom property로 직접 설정한다.
 */
@customElement('mm-ui-placeholder')
export class UiPlaceholder extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --ui-placeholder-height: var(--size-80);
        --ui-placeholder-background-color: var(--primary-subtle-color);
        --ui-placeholder-border-radius: var(--radius-large);

        display: block;
      }

      .placeholder {
        width: 100%;
        height: var(--ui-placeholder-height);
        box-sizing: border-box;
        border: var(--border);
        border-radius: var(--ui-placeholder-border-radius);
        background: var(--ui-placeholder-background-color);
      }
    `,
  ]

  render() {
    return html`
      <div class="placeholder" aria-hidden="true"></div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-ui-placeholder': UiPlaceholder
  }
}
