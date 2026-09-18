import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/comment-item/comment-item'

/**
 * 댓글 목록. 대댓글은 각 댓글이 slot="replies"로 품으므로 이 목록의 항목은 최상위 댓글뿐이다.
 */
@customElement('mm-comment-list')
export class CommentList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }
  `
  @property({ type: String, reflect: true }) role = 'list'
  @queryAssignedElements({ flatten: true }) private comments!: HTMLElement[]

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  private handleSlotChange() {
    this.comments.forEach(comment => comment.setAttribute('role', 'listitem'))
  }
}
