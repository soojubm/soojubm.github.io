import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/paragraph'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('mm-quotation')
export class Quotation extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      figure {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        padding-inline-start: var(--space-6);
      }

      blockquote::before {
        content: '“';
        display: block;
        margin-bottom: calc(var(--space-6) * -1);
        font-size: var(--font-size-32);
        font-weight: var(--font-weight-bold);
        line-height: 1;
      }
    `,
  ]
  @property({ type: String }) author = ''

  render() {
    return html`
      <figure>
        <blockquote>
          <mm-paragraph size="large"><slot></slot></mm-paragraph>
        </blockquote>
        ${this.renderAuthor()}
      </figure>
    `
  }

  private renderAuthor() {
    if (!this.author) return nothing
    return html`
      <figcaption>
        <mm-paragraph size="large">${this.author}</mm-paragraph>
      </figcaption>
    `
  }
}
