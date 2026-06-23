import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('mm-tab-panel')
export default class TabPanel extends LitElement {
  @property({ type: String }) value = ''
  @property({ type: Boolean, reflect: true }) active = false
  @property({ type: String, reflect: true }) role = 'tabpanel'

  connectedCallback() {
    super.connectedCallback()
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
