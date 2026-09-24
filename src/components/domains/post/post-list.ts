import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/post/post-item'
import { MEDIA } from '@/constants'

/**
 * 글 목록. 카드를 격자로 늘어놓는다. 카드 전체가 글 상세로 가는 링크라 명령이 아닌 목록으로 읽히고, 각 링크가 저마다 Tab 순서를 갖는다.
 */
@customElement('mm-post-list')
export class PostList extends LitElement {
  static styles = css`
    :host {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: var(--space-12) var(--space-8);
    }

    @media ${MEDIA.narrow} {
      :host {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
  `
  @queryAssignedElements({ flatten: true }) private posts!: HTMLElement[]

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  private handleSlotChange() {
    this.posts.forEach(post => post.setAttribute('role', 'listitem'))
  }
}
