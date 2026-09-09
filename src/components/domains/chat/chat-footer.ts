import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/flex/flex'

@customElement('mm-chat-footer')
export class ChatFooter extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        background: var(--surface-chrome-background-color);
        backdrop-filter: var(--surface-chrome-backdrop-filter);
        box-sizing: border-box;

        z-index: var(--material-zindex-raised);
      }

      /* 화면 전체를 덮는 스크롤 위로 프롬프트 입력이 떠서
         chat-feed가 그 아래로 깔리고 글래스모피즘이 성립한다. */
      :host > * {
        width: 100%;
        max-width: var(--layout-width-small);
        margin-inline: auto;
      }

      /* inner 왜 있어야 되는 거였지 */
      .inner {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        gap: var(--space-3);
        padding: var(--space-4) var(--layout-padding-inline);
        box-sizing: border-box;
      }
    `,
  ]

  render() {
    return html`
      <div class="inner"><slot></slot></div>
    `
  }
}
