import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-prompt-input-actions')
export class PromptInputActions extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      justify-content: flex-end; /* 기본적으로 우측 정렬 */
      gap: 8px;
      padding-top: 8px;
    }
  `

  render() {
    return html`<slot></slot>`
  }
}
