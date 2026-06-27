import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

/**
 * 인라인 "더 보기 / 접기" 토글 버튼.
 * 고정 크기 없이 주변 텍스트에 녹아든다.
 */
@customElement('mm-read-more-button')
export class ReadMoreButton extends LitElement {
  static styles = css`
    :host {
      display: inline;
    }

    button {
      all: unset;
      font: inherit;
      font-weight: var(--font-weight-bold);
      color: var(--color-foreground);
      cursor: pointer;

      &:focus-visible {
        outline: 2px solid var(--color-primary);
        outline-offset: 2px;
      }
    }
  `

  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded = 'false'
  @property({ type: String, attribute: 'aria-controls' }) ariaControls: string | null = null
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

declare global {
  interface HTMLElementTagNameMap {
    'mm-read-more-button': ReadMoreButton
  }
}
