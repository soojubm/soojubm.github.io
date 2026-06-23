import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import type { IconName } from '../../icon-button/semantics/icon-names'
import '../button'
import { toggleSelection } from '../button.utils'

@customElement('mm-toggle-button')
export class ToggleButton extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;

        --toggle-button-radius: var(--radius);
      }

      mm-button {
        --button-radius: var(--toggle-button-radius);
      }

      :host([selected]) mm-button {
        --button-border: var(--border-width) solid var(--selection-indicator-color);
        --button-background-color: var(--selection-background);
        --button-text-color: var(--selection-foreground);
      }
    `,
  ]

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
      <mm-button
        variant="tertiary"
        size="small"
        full-width
        icon=${this.icon}
        aria-label=${this.ariaLabel}
        aria-pressed=${String(this.selected)}
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-toggle-button': ToggleButton
  }
}
