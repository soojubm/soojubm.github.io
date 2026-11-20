import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-chat-feed')
export class ChatFeed extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-section);
      flex: none;
      width: 100%;
      max-width: var(--layout-width-small);
      margin: var(--space-8) auto 0;
      box-sizing: border-box;
    }
  `

  connectedCallback() {
    super.connectedCallback()
    // 새 메시지가 붙을 때 스크린리더가 알리도록 log로 고정한다.
    this.setAttribute('role', 'log')
    if (!this.hasAttribute('aria-label')) this.setAttribute('aria-label', '대화 내용')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
