import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset.styles'

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

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      .toggle {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        min-height: var(--size-medium);
        padding: 0 var(--space-3);
        border: 1px solid var(--color-border-strong);
        border-radius: var(--radius);
        background: var(--color-background);
        color: var(--color-foreground);
        font: inherit;
        font-size: var(--font-size-14);
        cursor: pointer;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
      }

      .toggle:hover {
        background: var(--color-background-subtle);
      }

      :host([selected]) .toggle {
        background: var(--selection-background);
        border-color: var(--selection-indicator-color);
        color: var(--selection-foreground);
      }

      :host([disabled]) .toggle {
        opacity: 0.5;
        cursor: not-allowed;
      }
    `,
  ]

  protected handleClick() {
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
      <button
        type="button"
        class="toggle"
        role="button"
        aria-pressed=${this.selected ? 'true' : 'false'}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        ${this.icon ? html`<mm-icon name=${this.icon}></mm-icon>` : ''}
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
