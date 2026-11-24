import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { buttonInteractiveStyles } from '@/components/common/button/button.styles'
import { withTogglePressed } from '@/components/common/button/button.utils'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-color-chip')
export class ColorChip extends withTogglePressed(LitElement) {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }

      button {
        ${buttonInteractiveStyles}
        width: var(--size-32);
        height: var(--size-32);
        border: var(--border);
        border-radius: var(--border-radius-full);
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
