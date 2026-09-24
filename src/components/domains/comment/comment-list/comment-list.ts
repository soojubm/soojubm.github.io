import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/comment/comment-item/comment-item'

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
  @queryAssignedElements({ flatten: true }) private comments!: HTMLElement[]

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
    this.comments.forEach(comment => comment.setAttribute('role', 'listitem'))
  }
}
