import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { interactiveControlStyles } from '@/components/common/button/button.styles'
import { withTogglePressed } from '@/components/common/button/button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 색 하나를 고르는 토글. 면 전체가 색이라 보이는 레이블이 없으므로 aria-label이 색 이름을 맡는다.
 * 칠할 색은 상품 옵션처럼 데이터로 들어오는 값이라 토큰이 아니라 color prop으로 받는다.
 */
@customElement('mm-color-chip')
export class ColorChip extends withTogglePressed(LitElement) {
  static styles = [
    resetStyles,
    interactiveControlStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        width: var(--size-32);
        height: var(--size-32);
        border: var(--border);
        border-radius: var(--radius-full);
      }

      /* radio처럼 안쪽에 배경색 링을 둘러 칠한 색과 선택 테두리 사이를 띄운다. */
      button[aria-pressed='true'] {
        border-color: var(--interaction-selected-border-color);
        box-shadow: 0 0 0 calc(var(--size-32) / 16) var(--background-color) inset;
      }
    `,
  ]
  @property({ type: String }) color = ''
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  render() {
    return html`
      <button
        type="button"
        aria-pressed=${this.pressed ? 'true' : 'false'}
        aria-label=${this.ariaLabel}
        ?disabled=${this.disabled}
        style=${styleMap({ backgroundColor: this.color })}
        @click=${this.handleToggleClick}
      ></button>
    `
  }
}
