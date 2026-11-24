import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/common/spinner/semantics/process-status'

@customElement('mm-process-status-list')
export class ProcessStatusList extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }
  `
  @queryAssignedElements({ flatten: true }) private slotElements!: HTMLElement[]

  // 항목 하나하나가 live region이면 단계마다 겹쳐 읽히므로, 그룹이 목록이자 하나의 live region이 된다.
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
    this.setAttribute('aria-live', 'polite')
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  private handleSlotChange() {
    this.slotElements.forEach(element => element.setAttribute('role', 'listitem'))
  }
}
