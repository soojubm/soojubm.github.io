import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { resetStyles } from '../shared/reset.styles'

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

      button {
        font: inherit;
        background: none;
        border: none;
        padding: 0;
        margin: 0;
        margin-left: var(--space-1);
        font-weight: var(--font-weight-bold);
        color: var(--color-foreground);
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
          ? html`<button @click=${this.toggle}>${this.expanded ? '접기' : '더 보기'}</button>`
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
