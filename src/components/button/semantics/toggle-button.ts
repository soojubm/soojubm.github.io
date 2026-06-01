import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

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

        --toggle-size: var(--size-medium);
        --toggle-padding-inline: var(--space-3);
        --toggle-color: var(--color-background);
        --toggle-border: 1px solid var(--color-border-strong);
        --toggle-radius: var(--radius);
        --toggle-text-color: var(--color-foreground);
        --toggle-selected-color: var(--selection-background);
        --toggle-selected-border-color: var(--selection-indicator-color);
        --toggle-selected-text-color: var(--selection-foreground);
      }

      .toggle {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        min-height: var(--toggle-size);
        padding: 0 var(--toggle-padding-inline);
        border: var(--toggle-border);
        border-radius: var(--toggle-radius);
        background: var(--toggle-color);
        color: var(--toggle-text-color);
        font: inherit;
        font-size: var(--font-size-14);
        cursor: pointer;
        transition: background 0.15s, color 0.15s, border-color 0.15s;
      }

      .toggle:hover {
        background: var(--color-background-subtle);
      }

      :host([selected]) .toggle {
        background: var(--toggle-selected-color);
        border-color: var(--toggle-selected-border-color);
        color: var(--toggle-selected-text-color);
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
