import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/link/semantics/pager'

export interface PostPagerItem {
  href: string
  title: string
}

@customElement('mm-post-pager')
export class PostPager extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ attribute: false }) previous?: PostPagerItem
  @property({ attribute: false }) next?: PostPagerItem

  render() {
    const { previous, next } = this

    return html`
      <mm-pager
        aria-label="글 이동"
        .previous=${previous && {
          href: previous.href,
          heading: previous.title,
          description: '이전 글',
        }}
        .next=${next && { href: next.href, heading: next.title, description: '다음 글' }}
      ></mm-pager>
    `
  }
}
