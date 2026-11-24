import { LitElement, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('mm-bullet')
export class Bullet extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      flex-shrink: 0;
    }

    :host::before {
      content: '·';
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }
}
