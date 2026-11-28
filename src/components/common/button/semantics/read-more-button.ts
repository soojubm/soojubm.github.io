import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaBoolean, AriaIdRef } from '@/types'

import { focusRingStyles, resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-read-more-button')
export class ReadMoreButton extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline;
      }

      button {
        display: inline;
        border-radius: var(--border-radius);
        font-weight: var(--font-weight-bold);
        color: var(--foreground-color);

        &:focus-visible {
          ${focusRingStyles};
        }
      }
    `,
  ]
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded: AriaBoolean = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: AriaIdRef = null
  @property({ type: String, attribute: 'more-label' }) moreLabel = '더 보기'

  render() {
    return html`
      <button
        type="button"
        aria-expanded=${this.ariaExpanded}
        aria-controls=${this.ariaControls ?? nothing}
      >
        <slot>${this.ariaExpanded === 'true' ? '접기' : this.moreLabel}</slot>
      </button>
    `
  }
}
