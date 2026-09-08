import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/icon'
import '@/components/common/text'

/**
 * mm-review-summary
 * 상품의 평균 별점과 전체 리뷰 수를 간결하게 요약한다.
 */
@customElement('mm-review-summary')
export class ReviewSummary extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }

      .stars {
        display: flex;
        gap: var(--space-1);
        color: var(--color-accent);
      }
    `,
  ]

  @property({ type: Number }) rating = 0
  @property({ type: Number, attribute: 'review-count' }) reviewCount = 0

  render() {
    const rating = Math.min(5, Math.max(0, this.rating))
    const filledStars = Math.round(rating)

    return html`
      <div class="stars" role="img" aria-label="5점 만점에 ${rating}점">
        ${Array.from(
          { length: 5 },
          (_, index) => html`
            <mm-icon
              name=${index < filledStars ? ICON_NAMES.FAVORITE_SELECTED : ICON_NAMES.FAVORITE}
            ></mm-icon>
          `,
        )}
      </div>
      <mm-text weight="bold">${rating.toFixed(1)}</mm-text>
      <mm-text>리뷰 ${this.reviewCount.toLocaleString('ko-KR')}개</mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-review-summary': ReviewSummary
  }
}

export default ReviewSummary
