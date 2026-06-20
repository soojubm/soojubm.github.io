import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../button'

/**
 * 개별 토글 버튼. 클릭하면 선택/비선택 상태를 전환합니다.
 * (단일 선택 세그먼트는 mm-toggle-button-group 사용)
 */
@customElement('mm-toggle-button')
export class ToggleButton extends LitElement {
  @property({ type: Boolean, reflect: true }) selected = false
  @property({ type: String }) value = ''
  @property({ type: String }) icon = ''
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) override ariaLabel = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;

        --toggle-selected-color: var(--selection-background);
        --toggle-selected-border-color: var(--selection-indicator-color);
        --toggle-selected-text-color: var(--selection-foreground);
      }

      mm-button {
        width: 100%;
      }

      :host([selected]) mm-button {
        --button-border: var(--border-width) solid var(--toggle-selected-border-color);
        --button-color: var(--toggle-selected-color);
        --button-text-color: var(--toggle-selected-text-color);
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
    if (this.disabled) return
    this.selected = !this.selected
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { selected: this.selected, value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <mm-button
        variant="tertiary"
        size="small"
        isFullWidth
        icon=${this.icon}
        aria-label=${this.ariaLabel}
        aria-pressed=${this.selected ? 'true' : 'false'}
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
