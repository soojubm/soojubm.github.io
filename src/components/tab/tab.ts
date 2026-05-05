import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styles as TabStyles } from './tab.styles'

@customElement('mm-tab')
class Tab extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false

  static styles = [TabStyles]

  private _onClick() {
    this.dispatchEvent(
      new CustomEvent('mm-tab-select', {
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <button role="tab" class="tab" ?aria-selected="${this.selected}" @click="${this._onClick}">
        <slot></slot>
      </button>
    `
  }
}
