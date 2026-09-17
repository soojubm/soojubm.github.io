import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, queryAssignedElements } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type {
  MenuItemGroup,
  MenuItemGroupSize,
} from '@/components/common/menu-item/menu-item-group'
import type { MenuItemCheckbox } from '@/components/common/menu-item/semantics/menu-item-checkbox'

import '@/components/common/menu-item/menu-item-group'
import '@/components/common/menu-item/semantics/menu-item-checkbox'
import { MultipleSelectionController } from '@/controllers/multiple-selection-controller'
import {
  SelectionGroupController,
  selectionItemValue,
} from '@/controllers/selection-group-controller'
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
  @property({ type: String }) size: MenuItemGroupSize = ''
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @property({ attribute: false }) values: string[] = []
  @queryAssignedElements({ selector: 'mm-menu-item-checkbox' })
  private checkboxes!: MenuItemCheckbox[]
  @query('mm-menu-item-group') private list?: MenuItemGroup
  private selection = new MultipleSelectionController(this, {
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.checkboxes.map(checkbox => ({ value: selectionItemValue(checkbox) })),
  })
  private group = new SelectionGroupController<MenuItemCheckbox>({
    selection: this.selection,
    getItems: () => this.checkboxes,
    isEmpty: () => !this.values.length,
    onChange: () => {
      emit(this, 'change', { values: this.values })
    },
  })

  render() {
    return html`
      <mm-menu-item-group
        role="group"
        size=${ifDefined(this.size || undefined)}
        aria-label=${this.ariaLabel || nothing}
        @change=${this.group.handleItemChange}
      >
        <slot @slotchange=${this.group.handleSlotChange}></slot>
      </mm-menu-item-group>
    `
  }

  // 목록 role은 shadow 안의 mm-menu-item-group이 가지므로, 표면이 포커스를 옮길 때 그 목록에 넘긴다.
  focus() {
    this.list?.focus()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('values')) return

    this.group.sync()
  }
}
