import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { postLinkStyles } from '@/components/domains/post/post.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common/thumbnail/thumbnail'
import '@/components/common/text/text'
import '@/components/common/text/semantics/paragraph'

/**
 * 목록 맨 위에서 한 편을 크게 내세우는 글 카드.
 * post-item과 같은 링크 표면을 쓰되 썸네일을 넓게 두고 제목·설명을 아래로 쌓는다.
 */
@customElement('mm-post-feature')
export class PostFeature extends LitElement {
  static styles = [
    resetStyles,
    postLinkStyles,
    css`
      :host {
        display: block;
      }

      .link {
        flex-direction: column;
        gap: var(--space-3);
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
      <mm-thumbnail src=${this.thumbnail} ratio="16:9"></mm-thumbnail>
      <mm-text as="time" size="12" color="light">${this.date}</mm-text>
      <mm-text size="24" weight="bold">${this.title}</mm-text>
      <mm-paragraph color="light">${this.description}</mm-paragraph>
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

declare global {
  interface HTMLElementTagNameMap {
    'mm-post-feature': PostFeature
  }
}

export default PostFeature
