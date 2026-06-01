import { css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import IconButton from '../icon-button'
import { iconButtonStyles } from '../icon-button.styles'

/**
 * 페이지네이션 번호 버튼.
 * icon-button의 스타일 베이스(크기/포커스/active/disabled)를 공유하되
 * 아이콘 대신 페이지 번호 텍스트를 렌더링하고 현재 페이지 상태(aria-current)를 표현한다.
 */
@customElement('mm-page-button')
export class PageButton extends IconButton {
  @property({ type: Number }) page = 1
  @property({ type: Boolean, reflect: true }) current = false

  static override styles = [
    iconButtonStyles,
    css`
      .icon-button[aria-current='page'] {
        border-color: var(--selection-indicator-color);
        background-color: var(--selection-background);
        color: var(--selection-foreground);
        font-weight: var(--font-weight-bold);
      }
    `,
  ]

  protected override renderControl() {
    return html`
      <button
        slot="trigger"
        type="button"
        class="icon-button"
        data-variant="${this.variant}"
        data-size="${this.size}"
        aria-label="${this.ariaLabel || `${this.page} 페이지로 이동`}"
        aria-current="${this.current ? 'page' : nothing}"
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
