import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { postLinkStyles } from '@/components/domains/post/post.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common'

/**
 * 블로그 글 목록의 카드 한 장. 정사각 썸네일 아래에 제목을 두고, 분류와 날짜를 메타 한 줄로 붙인다.
 * href가 있으면 카드 전체가 링크가 되고 hover 배경을 표시한다.
 */
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

  render() {
    const body = html`
      <mm-thumbnail src=${this.thumbnail} ratio="1:1"></mm-thumbnail>
      <mm-heading level="3">${this.title}</mm-heading>
      <mm-meta-item-group gap="3">
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
