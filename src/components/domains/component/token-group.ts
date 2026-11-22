import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

/** 토큰 항목을 묶어 보여 주며, aria-label로 이름을 받아 보조기술에는 이름 있는 그룹으로 전달된다. */
@customElement('mm-token-group')
export class TokenGroup extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
  `

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      <slot></slot>
    `
  }
}
