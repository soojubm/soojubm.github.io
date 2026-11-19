import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import '@/components/common/spinner/semantics/process-status'

/**
 * 여러 단계로 이어지는 작업의 진행 과정을 mm-process-status로 나열하는 그룹.
 * 지나온 단계는 success, 지금 단계는 running, 남은 단계는 pending으로 각 항목이 자기 상태를 그리고,
 * 그룹은 목록 의미와 간격, 단계가 바뀔 때의 안내를 소유한다.
 *
 * <mm-process-status-list>
 *   <mm-process-status variant="success" label="요청을 확인함"></mm-process-status>
 *   <mm-process-status label="관련 자료 탐색 중"></mm-process-status>
 *   <mm-process-status variant="pending" label="답변 정리"></mm-process-status>
 * </mm-process-status-list>
 */
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
