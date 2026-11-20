import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/semantics/paragraph'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * <mm-quotation>
 * 다른 곳에서 가져온 글을 본문과 구분해 인용하는 블록입니다.
 * 기본 slot이 인용문이고, author가 있으면 인용문 아래에 출처를 덧붙입니다.
 */
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
