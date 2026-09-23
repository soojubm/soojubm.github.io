import { LitElement, css, html } from 'lit'
import { customElement, queryAssignedElements } from 'lit/decorators.js'

import type { SelectOption } from '@/components/overlay/select/select-option'

import { RovingFocusController } from '@/controllers/roving-focus-controller'

/**
 * mm-select의 선택지 목록. menu와 달리 선택 상태를 유지하는 listbox라 menu 계열 그룹을 빌리지 않고,
 * 목록 하나를 tab stop 하나로 두는 방향키 이동을 스스로 소유한다. 선택은 각 항목이 맡는다.
 */
@customElement('mm-select-listbox')
export class SelectListbox extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
    }
  `
  @queryAssignedElements({ selector: 'mm-select-option' }) private options!: SelectOption[]
  private rovingFocus = new RovingFocusController(this, {
    getItems: () => this.items,
    orientation: 'vertical',
    getActiveIndex: () =>
      this.items.findIndex(item => item.getAttribute('aria-selected') === 'true'),
  })

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'listbox')
  }

  render() {
    return html`
      <slot @slotchange=${this.handleSlotChange}></slot>
    `
  }

  // 목록 표면이 열릴 때 선택된 항목(없으면 첫 항목)으로 포커스를 옮긴다.
  focus() {
    this.rovingFocus.focusTabStop()
  }

  private get items() {
    return this.options
      .map(option => option.shadowRoot?.querySelector<HTMLElement>('[role="option"]'))
      .filter((item): item is HTMLElement => !!item)
  }

  // 항목은 자기 shadow를 렌더한 뒤에야 포커스 대상이 생기므로, 렌더가 끝난 뒤 tab stop을 다시 맞춘다.
  private async handleSlotChange() {
    await Promise.all(this.options.map(option => option.updateComplete))
    this.requestUpdate()
  }
}
