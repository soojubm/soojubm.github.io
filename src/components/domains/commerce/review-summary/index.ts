import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/flex/flex'

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
        display: block;
      }

      .stars {
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
      <mm-flex align-items="center" gap="2">
        <mm-flex class="stars" role="img" aria-label="5점 만점에 ${rating}점">
          ${Array.from(
            { length: 5 },
            (_, index) => html`
              <mm-icon
                name=${index < filledStars ? ICON_NAMES.FAVORITE_SELECTED : ICON_NAMES.FAVORITE}
              ></mm-icon>
            `,
          )}
        </mm-flex>
        <mm-text weight="bold">${rating.toFixed(1)}</mm-text>
        <mm-text>리뷰 ${this.reviewCount.toLocaleString('ko-KR')}개</mm-text>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-review-summary': ReviewSummary
  }
}

export default ReviewSummary
