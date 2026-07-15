import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon-button/icon-button'

@customElement('mm-clear-button')
class ClearButton extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
    }

    mm-icon-button {
      --icon-button-size: var(--size-tiny);
      --icon-button-border-radius: var(--radius-round);
      --icon-button-background-color: var(--color-background-subtle);
    }
  `

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: String }) tooltip = ''
  @property({ type: String, attribute: 'tooltip-placement' }) tooltipPlacement = ''
  @property({ type: Boolean }) disabled = false

  render() {
    return html`
      <mm-icon-button
        icon=${ICON_NAMES.CLOSE}
        variant="tertiary"
        aria-label=${this.ariaLabel}
        tooltip=${this.tooltip}
        tooltip-placement=${this.tooltipPlacement}
        ?disabled=${this.disabled}
      ></mm-icon-button>
    `
  }
}

export default ClearButton

declare global {
  interface HTMLElementTagNameMap {
    'mm-clear-button': ClearButton
  }
}
