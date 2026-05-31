import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../button/icon-button.styles'

@customElement('mm-prev-button')
export class PrevButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel = '이전'
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [iconButtonStyles]

  private handleClick() {
    if (this.disabled) return

    this.dispatchEvent(new CustomEvent('prev', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <button
        type="button"
        class="icon-button"
        data-variant="navigator"
        aria-label=${this.ariaLabel}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <mm-icon name="arrow-left"></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-prev-button': PrevButton
  }
}
