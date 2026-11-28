import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import '@/components/common/button/semantics/read-more-button'
import '@/components/common/text/text'
import { DisclosureController } from '@/controllers/disclosure-controller'
import { uniqueId } from '@/utils'
import '@/components/common/text/semantics/paragraph'

@customElement('fff-read-more-paragraph')
export class ReadMoreParagraph extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    fff-read-more-button {
      margin: 0;
      margin-left: var(--space-1);
    }

    fff-text {
      display: inline;
    }
  `
  @property({ type: String }) content = ''
  @property({ type: Number, attribute: 'max-length' }) maxLength = 100
  @state() private expanded = false
  @query('fff-read-more-button') private trigger?: HTMLElement
  private readonly contentId = uniqueId('read-more-content')
  private disclosure = new DisclosureController(this, {
    open: () => this.expanded,
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
      <fff-paragraph>
        <fff-text id=${this.contentId}>${displayText}</fff-text>
        ${this.renderToggleButton(truncated)}
      </fff-paragraph>
    `
  }

  private renderToggleButton(truncated: boolean) {
    if (!truncated) return nothing

    return html`
      <fff-read-more-button aria-controls=${this.contentId}></fff-read-more-button>
    `
  }
}
