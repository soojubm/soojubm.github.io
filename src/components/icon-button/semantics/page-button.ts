import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { iconButtonStyles } from '../icon-button.styles'

/**
 * 페이지네이션 번호 버튼.
 * 아이콘 대신 페이지 번호 텍스트를 렌더링하고 현재 페이지 상태(aria-current)를 표현한다.
 */
@customElement('mm-page-button')
export class PageButton extends LitElement {
  @property({ type: Number }) page = 1
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent: string | null =
    null
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  static styles = [
    iconButtonStyles,
    css`
      :host {
        --icon-button-color: transparent;
      }

      button[aria-current='page'] {
        border-color: var(--selection-indicator-color);
        color: var(--selection-foreground);
        font-weight: var(--font-weight-bold);
      }
    `,
  ]

  render() {
    return html`
      <button
        type="button"
        aria-label="${this.ariaLabel || `${this.page} 페이지로 이동`}"
        aria-current="${this.ariaCurrent ?? nothing}"
        ?disabled="${this.disabled}"
      >
        ${this.page}
      </button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-page-button': PageButton
  }
}
