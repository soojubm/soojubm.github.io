import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'
import { emit } from '../../../utils/emit'

/**
 * 더보기/접기 토글 버튼.
 * aria-expanded 상태에 따라 레이블과 아이콘 방향이 전환됩니다.
 */
@customElement('mm-show-more-button')
export class ShowMoreButton extends LitElement {
  @property({ type: String, attribute: 'aria-expanded' }) ariaExpanded = 'false'
  @property({ type: String, attribute: 'more-label' }) moreLabel = 'Show more'
  @property({ type: String, attribute: 'less-label' }) lessLabel = 'Show less'

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        justify-content: center;
      }

      mm-icon {
        transition: transform 0.2s ease;
      }

      mm-button[aria-expanded='true'] mm-icon {
        transform: rotate(180deg);
      }
    `,
  ]

  private handleClick() {
    this.ariaExpanded = this.ariaExpanded === 'true' ? 'false' : 'true'
    emit(this, 'change', { expanded: this.ariaExpanded === 'true' })
  }

  render() {
    return html`
      <mm-button
        variant="tertiary"
        icon=${ICON_NAMES.EXPAND}
        icon-position="trailing"
        @click=${this.handleClick}
        aria-expanded=${this.ariaExpanded}
      >
        ${this.ariaExpanded === 'true' ? this.lessLabel : this.moreLabel}
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-show-more-button': ShowMoreButton
  }
}
