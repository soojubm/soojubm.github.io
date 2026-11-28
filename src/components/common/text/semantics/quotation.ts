import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/paragraph'
import { resetStyles } from '@/stylesheets/shared.styles'

@customElement('fff-quotation')
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
          <fff-paragraph size="large"><slot></slot></fff-paragraph>
        </blockquote>
        ${this.renderAuthor()}
      </figure>
    `
  }

  private renderAuthor() {
    if (!this.author) return nothing
    return html`
      <figcaption>
        <fff-paragraph size="large">${this.author}</fff-paragraph>
      </figcaption>
    `
  }
}
