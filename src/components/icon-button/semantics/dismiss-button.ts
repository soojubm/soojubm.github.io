import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../icon-button.styles'
import { ICON_NAMES } from './icon-names'

/**
 * 배너, 알림, 토스트 등 비파괴적 해제 버튼.
 * plain variant — 배경 없음, 경량
 */
@customElement('mm-dismiss-button')
export class DismissButton extends LitElement {
  @property({ type: String, attribute: 'aria-label' })
  override ariaLabel = '닫기'

  static styles = [
    iconButtonStyles,
    css`
      .icon-button[data-variant='plain'] {
        color: var(--color-foreground-light);
      }
      .icon-button[data-variant='plain']:hover {
        color: var(--color-foreground);
        background-color: var(--color-background-subtle);
      }
    `,
  ]

  private handleClick() {
    this.dispatchEvent(new CustomEvent('dismiss', { bubbles: true, composed: true }))
  }

  render() {
    return html`
      <button
        type="button"
        class="icon-button"
        data-variant="plain"
        aria-label=${this.ariaLabel}
        @click=${this.handleClick}
      >
        <mm-icon name=${ICON_NAMES.XMARK}></mm-icon>
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-dismiss-button': DismissButton
  }
}
