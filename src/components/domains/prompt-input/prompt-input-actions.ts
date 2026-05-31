import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'
import '../textfield-action-bar'

@customElement('mm-prompt-input-actions')
export class PromptInputActions extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding-top: 8px;
    }
  `

  render() {
    return html`<mm-textfield-action-bar><slot></slot></mm-textfield-action-bar>`
  }
}
