import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../icon-button.styles'
import { ICON_NAMES } from './icon-names'

@customElement('mm-next-button')
export class NextButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel = '다음'
  @property({ type: Boolean, reflect: true }) disabled = false

  static styles = [iconButtonStyles]

  private handleClick() {
    if (this.disabled) return

    this.dispatchEvent(new CustomEvent('next', { bubbles: true, composed: true }))
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
        <mm-icon name=${ICON_NAMES.ARROW_RIGHT}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-next-button': NextButton
  }
}
