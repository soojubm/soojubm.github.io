import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/button/semantics/read-more-button'
import '@/components/text/text'
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

      mm-text {
        display: inline;
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
        <mm-text id=${this.contentId}>${displayText}</mm-text>
        ${this.renderToggleButton(truncated)}
      </mm-paragraph>
    `
  }

  private renderToggleButton(truncated: boolean) {
    if (!truncated) return nothing

    return html`
      <mm-read-more-button
        aria-expanded=${this.expanded ? 'true' : 'false'}
        aria-controls=${this.contentId}
        @click=${this.toggle}
      ></mm-read-more-button>
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
