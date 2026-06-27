import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tab-panel')
export default class TabPanel extends LitElement {
  static styles = css`
    :host {
      display: none;
    }
    :host([active]) {
      display: block;
    }
  `

  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false
  @property({ type: String, reflect: true }) role = 'tabpanel'

  render() {
    return html`
      <slot></slot>
    `
  }

  connectedCallback() {
    super.connectedCallback()
    this.tabIndex = 0
  }
}
