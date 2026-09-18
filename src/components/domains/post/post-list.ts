import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/post/post-item'

/**
 * 글 목록. 행 전체가 글 상세로 가는 링크라 명령이 아닌 목록으로 읽히고, 각 링크가 저마다 Tab 순서를 갖는다.
 */
@customElement('mm-post-list')
export class PostList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  `
  @property({ type: String, reflect: true }) role = 'list'
  @queryAssignedElements({ flatten: true }) private posts!: HTMLElement[]

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  private handleSlotChange() {
    this.posts.forEach(post => post.setAttribute('role', 'listitem'))
  }
}
