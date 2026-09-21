import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import '@/components/common/button/semantics/read-more-button'
import '@/components/common/text/text'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

@customElement('mm-read-more-paragraph')
export class ReadMoreParagraph extends LitElement {
  static styles = css`
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
  `
  @property({ type: String }) content = ''
  @property({ type: Number, attribute: 'max-length' }) maxLength = 100
  @state() private expanded = false
  @query('mm-read-more-button') private trigger?: HTMLElement
  private readonly contentId = uniqueId('read-more-content')
  private disclosure = new DisclosureController(this, {
    isOpen: () => this.expanded,
    setOpen: open => {
      this.expanded = open
    },
    getTrigger: () => this.trigger ?? undefined,
  })

  render() {
    const truncated = this.content.length > this.maxLength
    const displayText =
      truncated && !this.expanded
        ? this.content.slice(0, this.maxLength).trimEnd() + '...'
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
