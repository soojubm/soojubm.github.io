import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/button/semantics/read-more-button'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-read-more-paragraph')
export class ReadMoreParagraph extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      mm-read-more-button {
        margin: 0;
        margin-left: var(--space-1);
      }
    `,
  ]

  @property({ type: String }) content = ''
  @property({ type: Number }) limit = 100

  @state() private expanded = false

  private readonly contentId = uniqueId('read-more-content')

  render() {
    const truncated = this.content.length > this.limit
    const displayText =
      truncated && !this.expanded
        ? this.content.slice(0, this.limit).trimEnd() + '...'
        : this.content

    return html`
      <mm-paragraph>
        <span id=${this.contentId}>${displayText}</span>
        ${truncated
          ? html`
              <mm-read-more-button
                aria-expanded=${String(this.expanded)}
                aria-controls=${this.contentId}
                @click=${this.toggle}
              ></mm-read-more-button>
            `
          : nothing}
      </mm-paragraph>
    `
  }

  private toggle() {
    this.expanded = !this.expanded
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-read-more-paragraph': ReadMoreParagraph
  }
}
