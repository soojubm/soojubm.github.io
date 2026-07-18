import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/text'

@customElement('mm-spinner')
export class Spinner extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
      }

      .spinner {
        --spinner-size: var(--size-32);
        width: var(--spinner-size);
        height: var(--spinner-size);
        border-radius: 50%;
        border: 2px solid var(--color-border);
        border-top-color: var(--color-primary);
        animation: spin 0.8s linear infinite;
        flex-shrink: 0;
      }

      :host([size='small']) .spinner {
        --spinner-size: var(--size-24);
      }

      :host([size='medium']) .spinner {
        --spinner-size: var(--size-32);
      }

      :host([size='large']) .spinner {
        --spinner-size: var(--size-48);
      }

      .label {
        font-size: var(--font-size-14);
        color: var(--color-foreground-light);
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ]

  @property({ type: String, reflect: true }) size: 'small' | 'medium' | 'large' = 'medium'
  @property({ type: String }) label = '로딩 중'

  render() {
    return html`
      <span class="spinner" role="status" aria-label=${this.label}></span>
      <slot>
        <mm-text class="label">${this.label}</mm-text>
      </slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-spinner': Spinner
  }
}
