import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { MenuItemCheckbox } from '@/components/common/menuitem/semantics/menu-item-checkbox'

import '@/components/common/menuitem/semantics/menu-item-group'
import { MultipleSelectionController } from '@/controllers/multiple-selection-controller'
import { emit } from '@/utils'

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

  @queryAssignedElements({ selector: 'mm-menu-item-checkbox' })
  private checkboxes!: MenuItemCheckbox[]

  private selection = new MultipleSelectionController(this, {
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.checkboxes.map(checkbox => ({ value: checkbox.value })),
  })

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('values')) this.syncCheckboxes()
  }

  render() {
    return html`
      <mm-menu-item-group
        role="group"
        aria-label=${this.ariaLabel || nothing}
        @change=${this.handleCheckboxChange}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </mm-menu-item-group>
    `
  }

  private handleCheckboxChange(e: Event) {
    const target = e.target as HTMLElement
    if (target.tagName.toLowerCase() !== 'mm-menu-item-checkbox') return
    e.stopPropagation()

    const { checked, value } = (e as CustomEvent<{ checked: boolean; value: string }>).detail

    this.updateSelection(value, checked)
  }

  private updateSelection(value: string, checked: boolean) {
    this.selection.setSelected({ value }, checked)
    this.syncCheckboxes()

    emit(this, 'change', { values: this.values })
  }

  private handleSlotChange() {
    // 마크업의 초기 checked 상태를 values로 흡수
    const preselected = this.checkboxes.filter(cb => cb.checked).map(cb => cb.value)
    if (preselected.length && !this.values.length) this.values = preselected

    this.syncCheckboxes()
  }

  private syncCheckboxes() {
    this.selection.sync(this.checkboxes, (checkbox, selected) => {
      checkbox.checked = selected
    })
  }
}

export default MenuItemCheckboxGroup
