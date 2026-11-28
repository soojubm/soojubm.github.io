import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'

@customElement('fff-review-summary')
export class ReviewSummary extends LitElement {
  static styles = css`
    :host {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .stars {
      display: flex;
      gap: var(--space-1);
      color: var(--accent-color);
    }
  `
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
            <fff-icon
              name=${index < filledStars ? ICON_NAMES.FAVORITE_SELECTED : ICON_NAMES.FAVORITE}
            ></fff-icon>
          `,
        )}
      </div>
      <fff-text weight="bold">${rating.toFixed(1)}</fff-text>
      <fff-text>리뷰 ${this.reviewCount.toLocaleString('ko-KR')}개</fff-text>
    `
  }
}
