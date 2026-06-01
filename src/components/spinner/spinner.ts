import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'

@customElement('mm-spinner')
export class Spinner extends LitElement {
  @property({ type: String }) size: 'small' | 'medium' | 'large' = 'medium'
  @property({ type: String }) label = '로딩 중'

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
      }

      .spinner {
        --spinner-size: var(--size-medium);
        width: var(--spinner-size);
        height: var(--spinner-size);
        border-radius: 50%;
        border: 2px solid var(--color-border);
        border-top-color: var(--color-primary);
        animation: spin 0.8s linear infinite;
        flex-shrink: 0;
      }

      [data-size='small'] {
        --spinner-size: var(--size-small);
      }

      [data-size='medium'] {
        --spinner-size: var(--size-medium);
      }

      [data-size='large'] {
        --spinner-size: var(--size-large);
      }

      .label {
        font-size: var(--font-size-14);
        color: var(--color-foreground-light);
      }

      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `,
  ]

  render() {
    return html`
      <span
        class="spinner"
        data-size=${this.size}
        role="status"
        aria-label=${this.label}
      ></span>
      <slot>
        <span class="label">${this.label}</span>
      </slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-spinner': Spinner
  }
}
