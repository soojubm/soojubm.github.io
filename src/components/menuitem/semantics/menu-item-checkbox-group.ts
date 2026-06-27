import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import type { MenuItemCheckbox } from './menu-item-checkbox'
import './menu-item-group'
import { emit } from '../../../utils/emit'

/**
 * mm-menu-item-checkbox를 묶는 다중 선택 그룹.
 * 선택된 value 목록을 values prop으로 관리하며
 * 변경 시 change 이벤트를 발행합니다.
 */
@customElement('mm-menu-item-checkbox-group')
export class MenuItemCheckboxGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ type: Array }) values: string[] = []

  @queryAssignedElements({ selector: 'mm-menu-item-checkbox', flatten: true })
  private checkboxes!: MenuItemCheckbox[]

  private handleChange(e: Event) {
    const target = e.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'mm-menu-item-checkbox') return
    e.stopPropagation()

    const { checked, value } = (e as CustomEvent<{ checked: boolean; value: string }>).detail

    this.values = checked ? [...this.values, value] : this.values.filter(v => v !== value)

    // 자식 동기화
    this.checkboxes.forEach(cb => {
      cb.checked = this.values.includes(cb.value)
    })

    emit(this, 'change', { values: this.values })
  }

  private handleSlotChange() {
    // 마크업의 초기 checked 상태를 values로 흡수
    const preselected = this.checkboxes.filter(cb => cb.checked).map(cb => cb.value)
    if (preselected.length && !this.values.length) {
      this.values = preselected
    }
    // values 기준으로 동기화
    this.checkboxes.forEach(cb => {
      cb.checked = this.values.includes(cb.value)
    })
  }

  render() {
    return html`
      <mm-menu-item-group
        role="group"
        aria-label=${this.ariaLabel || nothing}
        @change=${this.handleChange}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </mm-menu-item-group>
    `
  }
}

export default MenuItemCheckboxGroup
