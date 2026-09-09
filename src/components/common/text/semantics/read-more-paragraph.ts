import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import '@/components/common/button/semantics/read-more-button'
import '@/components/common/text/text'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

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

  private disclosure = new DisclosureController(this, {
    isOpen: () => this.expanded,
    setOpen: open => {
      this.expanded = open
    },
    getTrigger: () => this.shadowRoot?.querySelector('mm-read-more-button') ?? undefined,
  })

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
      <mm-read-more-button aria-controls=${this.contentId}></mm-read-more-button>
    `
  }
}
