import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import { ICON_NAMES } from '../../icon-button/semantics/icon-names'

/**
 * 더보기/접기 토글 버튼.
 * expanded 상태에 따라 레이블과 아이콘 방향이 전환됩니다.
 */
@customElement('mm-show-more-button')
export class ShowMoreButton extends LitElement {
  @property({ type: Boolean, reflect: true }) expanded = false
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

      :host([expanded]) mm-icon {
        transform: rotate(180deg);
      }
    `,
  ]

  private handleClick() {
    this.expanded = !this.expanded
    this.dispatchEvent(
      new CustomEvent('change', {
        detail: { expanded: this.expanded },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <mm-button
        variant="tertiary"
        icon=${ICON_NAMES.EXPAND}
        icon-position="trailing"
        @click=${this.handleClick}
        aria-expanded=${this.expanded}
      >
        ${this.expanded ? this.lessLabel : this.moreLabel}
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-show-more-button': ShowMoreButton
  }
}
