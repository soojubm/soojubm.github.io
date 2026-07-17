import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/flex/flex'

/**
 * mm-review-item
 * 상품 상세(커머스) 도메인의 사용자 리뷰 카드.
 * 별점·본문·작성자·작성일을 prop으로 받아 표시한다.
 */
@customElement('mm-review-item')
export class ReviewItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        width: 100%;
      }

      .rating {
        color: var(--color-accent);
      }
    `,
  ]

  @property({ type: Number }) rating = 5
  @property({ type: String }) content = ''
  @property({ type: String }) author = ''
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <mm-surface variant="outlined">
        <mm-flex direction="column" gap="3">
          <mm-flex class="rating" role="img" aria-label="${this.rating}점">
            ${Array.from(
              { length: this.rating },
              () => html`
                <mm-icon name=${ICON_NAMES.FAVORITE_SELECTED}></mm-icon>
              `,
            )}
          </mm-flex>

          <mm-paragraph>${this.content}</mm-paragraph>
          ${this.renderMeta()}
        </mm-flex>
      </mm-surface>
    `
  }

  private renderMeta() {
    if (!this.author && !this.datetime) return nothing

    return html`
      <mm-list-item label=${this.author} description=${this.datetime}></mm-list-item>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-review-item': ReviewItem
  }
}
