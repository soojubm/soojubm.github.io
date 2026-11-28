import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/comment/comment-item/comment-item'

@customElement('fff-comment-list')
export class CommentList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-6);
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
