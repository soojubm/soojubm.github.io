import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import type { IconName } from '../icon-button/semantics/icon-names'
import { buttonBaseStyles, toggleButtonStyles, buttonSelectedStyles } from '../button/button.styles'
import { toggleSelection } from '../button/button.utils'
import '../icon/icon'

@customElement('mm-toggle-button')
export class ToggleButton extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  static styles = [buttonBaseStyles, toggleButtonStyles, buttonSelectedStyles]

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick)
    super.disconnectedCallback()
  }

  protected handleClick = (event: Event) => {
    event.stopPropagation()
    toggleSelection(this)
  }

  render() {
    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-pressed=${String(this.selected)}
        aria-label=${this.ariaLabel || nothing}
      >
        ${this.icon
          ? html`
              <mm-icon name=${this.icon}></mm-icon>
            `
          : nothing}
        <slot></slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button': ToggleButton
  }
}
