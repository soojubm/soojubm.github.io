import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'

@customElement('fff-review-item')
export class ReviewItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
    }

    .body {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .rating {
      display: flex;
    }

    .rating {
      color: var(--accent-color);
    }
  `
  @property({ type: Number }) rating = 5
  @property({ type: String }) content = ''
  @property({ type: String }) author = ''
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <fff-surface variant="outlined">
        <div class="body">
          <div class="rating" role="img" aria-label="${this.rating}점">
            ${Array.from(
              { length: this.rating },
              () => html`
                <fff-icon name=${ICON_NAMES.FAVORITE_SELECTED}></fff-icon>
              `,
            )}
          </div>

          <fff-paragraph>${this.content}</fff-paragraph>
          ${this.renderMeta()}
        </div>
      </fff-surface>
    `
  }

  private renderMeta() {
    if (!this.author && !this.datetime) return nothing

    return html`
      <fff-list-item
        size="medium"
        label=${this.author}
        description=${this.datetime}
      ></fff-list-item>
    `
  }
}
