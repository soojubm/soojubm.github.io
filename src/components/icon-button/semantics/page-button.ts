import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaCurrent } from '@/types/aria'

import { interactiveControlStyles } from '@/components/button/button.styles'
import { iconButtonStyles } from '@/components/icon-button/icon-button.styles'

/**
 * 페이지네이션 번호 버튼.
 * 아이콘 대신 페이지 번호 텍스트를 렌더링하고 현재 페이지 상태(aria-current)를 표현한다.
 */
@customElement('mm-page-button')
export class PageButton extends LitElement {
  static styles = [
    interactiveControlStyles,
    iconButtonStyles,
    css`
      :host {
        --icon-button-background-color: transparent;
      }

      button[aria-current='page'] {
        border-color: var(--selection-indicator-color);
        color: var(--selection-foreground);
        font-weight: var(--font-weight-bold);
      }
    `,
  ]

  @property({ type: Number }) page = 1
  @property({ type: String, attribute: 'aria-current', reflect: true }) ariaCurrent: AriaCurrent =
    null
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  render() {
    return html`
      <button
        type="button"
        aria-label=${this.ariaLabel || `${this.page} 페이지로 이동`}
        aria-current=${ifDefined(this.ariaCurrent ?? undefined)}
        ?disabled=${this.disabled}
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
