import { css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { Button } from '../button'

/**
 * 인라인 "더 보기 / 접기" 토글 버튼.
 * mm-button(text variant)을 상속하며 고정 크기 없이 주변 텍스트에 녹아든다.
 */
@customElement('mm-read-more-button')
export class ReadMoreButton extends Button {
  @property({ type: Boolean, reflect: true }) expanded = false
  @property({ type: String, attribute: 'more-label' }) moreLabel = '더 보기'
  @property({ type: String, attribute: 'less-label' }) lessLabel = '접기'

  override variant = 'text' as const

  static styles = [
    ...Button.styles,
    css`
      :host {
        --button-size: auto;
        --button-padding-inline: 0;
        --button-border: none;
        --button-color: transparent;
        --button-text-color: var(--color-foreground);
        --button-radius: 0;
      }

      button {
        font: inherit;
        font-weight: var(--font-weight-bold);
        text-transform: none;
        height: auto;

        &:hover {
          border-color: transparent;
        }
        &:focus-visible {
          outline: 2px solid var(--color-primary);
          outline-offset: 2px;
        }
        &:enabled:active {
          background: transparent;
          border-color: transparent;
          box-shadow: none;
        }
      }
    `,
  ]

  override render() {
    return html`
      <button type="button" aria-expanded=${this.expanded ? 'true' : 'false'}>
        <slot>${this.expanded ? this.lessLabel : this.moreLabel}</slot>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-read-more-button': ReadMoreButton
  }
}
