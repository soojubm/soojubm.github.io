import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { AriaBoolean, AriaIdRef } from '@/types'

import { focusRingStyles, resetStyles } from '@/stylesheets/shared.styles'

/**
 * 인라인 "더 보기 / 접기" 토글 버튼.
 * 고정 크기 없이 주변 텍스트에 녹아든다.
 */
@customElement('mm-read-more-button')
export class ReadMoreButton extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline;
      }

      button {
        display: inline;
        border-radius: var(--radius);
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
  @property({ type: String, attribute: 'less-label' }) lessLabel = '접기'

  render() {
    return html`
      <button
        type="button"
        aria-expanded=${this.ariaExpanded}
        aria-controls=${this.ariaControls ?? nothing}
      >
        <slot>${this.ariaExpanded === 'true' ? this.lessLabel : this.moreLabel}</slot>
      </button>
    `
  }
}
