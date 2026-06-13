import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../../button/semantics/read-more-button'

@customElement('mm-read-more-paragraph')
export class ReadMoreParagraph extends LitElement {
  @property({ type: String }) content = ''
  @property({ type: Number }) limit = 100

  @state() private expanded = false

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

  private toggle() {
    this.expanded = !this.expanded
  }

  render() {
    const truncated = this.content.length > this.limit
    const displayText =
      truncated && !this.expanded
        ? this.content.slice(0, this.limit).trimEnd() + '...'
        : this.content

    return html`
      <mm-paragraph>
        ${displayText}
        ${truncated
          ? html`
              <mm-read-more-button
                .expanded=${this.expanded}
                @click=${this.toggle}
              ></mm-read-more-button>
            `
          : nothing}
      </mm-paragraph>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-read-more-paragraph': ReadMoreParagraph
  }
}
