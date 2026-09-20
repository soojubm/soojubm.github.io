import { LitElement, css, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import '@/components/domains/faq/faq-item'

/**
 * 자주 묻는 질문 목록. 항목의 간격과 목록 role을 소유한다.
 */
@customElement('mm-faq-list')
export class FaqList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }
  `
  @property({ type: String, reflect: true }) role = 'list'
  @queryAssignedElements({ flatten: true }) private items!: HTMLElement[]

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  private handleSlotChange() {
    this.items.forEach(item => item.setAttribute('role', 'listitem'))
  }
}
