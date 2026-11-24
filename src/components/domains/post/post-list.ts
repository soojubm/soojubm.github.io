import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/post/post-item'
import { MEDIA } from '@/constants'

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
