import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tab-panel')
export default class TabPanel extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'tabpanel')
    this.tabIndex = 0
  }

  static styles = css`
    :host {
      display: none;
    }
    :host([active]) {
      display: block;
    }
  `

  render() {
    return html`
      <slot></slot>
    `
  }
}
