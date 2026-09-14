import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common'

@customElement('mm-chat-footer')
export class ChatFooter extends LitElement {
  static styles = css`
    :host {
      box-sizing: border-box;
      position: relative;
      z-index: var(--material-zindex-elevated);
      isolation: isolate;
    }

    /* 재질은 ::before 형제 레이어가 소유한다. 조상에 backdrop-filter가 걸리면 슬롯된 prompt-input의 blur가 죽기 때문이다. */
    :host::before {
      content: '';
      background: var(--material-chrome-background-color);
      backdrop-filter: var(--material-chrome-backdrop-filter);
      -webkit-backdrop-filter: var(--material-chrome-backdrop-filter);
      position: absolute;
      inset: 0;
      z-index: -1;
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
  `

  render() {
    return html`
      <div class="inner"><slot></slot></div>
    `
  }
}
