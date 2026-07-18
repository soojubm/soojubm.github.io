import { LitElement, css, html, svg } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

type Variant = 'number' | 'check'

@customElement('mm-list-marker')
export class ListMarker extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: var(--gray800);
        color: var(--foreground-color-on-solid);
        border-radius: 50%;
        width: var(--size-16);
        height: var(--size-16);
        margin-top: var(--space-1);
        font-size: 10px;
        font-weight: var(--font-weight-bold);
      }

      svg {
        width: 0.5rem;
        height: 0.5rem;
        color: var(--foreground-color-on-solid);
      }
    `,
  ]

  @property({ type: String }) variant: Variant = 'number'
  @property({ type: Number }) value = 1

  render() {
    if (this.variant === 'check') return this.renderCheck()
    return html`
      ${this.value}
    `
  }

  private renderCheck() {
    return svg`
      <svg viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M1.5 5L4 7.5L8.5 2.5"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-list-marker': ListMarker
  }
}
