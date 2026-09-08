import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/thumbnail/thumbnail'
import '@/components/common/text/text'
import '@/components/common/text/semantics/text-block'

/**
 * 블로그 글 목록의 한 행. 썸네일을 leading으로 두고 제목·설명·날짜를 세로로 쌓는다.
 * href가 있으면 행 전체가 링크가 되고 hover 배경을 표시한다.
 */
@customElement('mm-post-item')
export class PostItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
        --post-item-background-color: transparent;
      }

      .row {
        display: flex;
        gap: var(--space-3);
        border-radius: var(--radius);
        color: inherit;
        text-decoration: none;
        position: relative;
        isolation: isolate;
      }

      /* hover 배경은 레이아웃 박스를 밀지 않도록 inset된 ::before 레이어로 깐다 */
      .row::before {
        content: '';
        border-radius: var(--radius);
        background-color: var(--post-item-background-color);
        position: absolute;
        inset: 0 calc(var(--space-3) * -1);
        z-index: -1;
      }

      a.row:hover {
        --post-item-background-color: var(--interaction-hover-background-color);
      }

      a.row:focus-visible {
        outline: var(--interaction-focus-outline);
        outline-offset: -1px;
      }

      mm-thumbnail {
        flex: 0 0 auto;
        width: var(--size-80);
      }

      mm-text-block {
        min-width: 0;
      }
    `,
  ]

  @property({ type: String }) href = ''
  @property({ type: String }) thumbnail = ''
  @property({ type: String }) title = ''
  @property({ type: String }) description = ''
  @property({ type: String }) date = ''

  render() {
    const body = html`
      <mm-thumbnail src=${this.thumbnail} ratio="1:1"></mm-thumbnail>
      <mm-text-block level="3" heading=${this.title} description=${this.description}>
        <mm-text as="time" size="12" color="light">${this.date}</mm-text>
      </mm-text-block>
    `

    if (!this.href) {
      return html`
        <div class="row">${body}</div>
      `
    }

    return html`
      <a class="row" href=${this.href}>${body}</a>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-post-item': PostItem
  }
}

export default PostItem
