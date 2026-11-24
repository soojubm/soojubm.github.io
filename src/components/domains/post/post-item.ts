import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { postLinkStyles } from '@/components/domains/post/post.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common'

@customElement('mm-post-item')
export class PostItem extends LitElement {
  static styles = [
    resetStyles,
    postLinkStyles,
    css`
      :host {
        display: block;
      }

      .link {
        flex-direction: column;
        gap: var(--space-4);
      }
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) thumbnail = ''
  @property({ type: String }) title = ''
  @property({ type: String }) category = ''
  @property({ type: String }) date = ''
  @property({ type: Number, attribute: 'heading-level' }) headingLevel = 3

  render() {
    const body = html`
      <mm-thumbnail src=${this.thumbnail} ratio="1:1"></mm-thumbnail>
      <mm-heading level=${this.headingLevel}>${this.title}</mm-heading>
      <mm-meta-item-group gap="2">
        <mm-text>${this.category}</mm-text>
        <mm-text as="time" color="light">${this.date}</mm-text>
      </mm-meta-item-group>
    `

    if (!this.href) {
      return html`
        <div class="link">${body}</div>
      `
    }

    return html`
      <a class="link" href=${this.href}>${body}</a>
    `
  }
}
