import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { MenuItemGroupSize } from '@/components/common/menu-item/menu-item-group'
import type { MenuItemRadio } from '@/components/common/menu-item/semantics/menu-item-radio'

import '@/components/common/menu-item/menu-item-group'
import '@/components/common/menu-item/semantics/menu-item-radio'
import { SlottedSelectionController } from '@/controllers/slotted-selection-controller'
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { emit } from '@/utils'

@customElement('mm-menu-item-radio-group')
export class MenuItemRadioGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) name = ''
  @property({ type: String }) value = ''
  @property({ type: String }) size: MenuItemGroupSize = 'medium'
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''
  @queryAssignedElements({ selector: 'mm-menu-item-radio' })
  private radios!: MenuItemRadio[]
  private selection = new SingleSelectionController(this, {
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })
  private group = new SlottedSelectionController<MenuItemRadio>(this, {
    selection: this.selection,
    getItems: () => this.radios,
    applyItem: radio => {
      if (this.name) radio.name = this.name
    },
    onChange: () => {
      emit(this, 'change', { value: this.value, name: this.name })
    },
  })

  render() {
    return html`
      <mm-menu-item-group
        role="radiogroup"
        size=${this.size}
        aria-label=${this.ariaLabel || nothing}
        @change=${this.group.handleItemChange}
      >
        <slot @slotchange=${this.group.handleSlotChange}></slot>
      </mm-menu-item-group>
    `
  }
}
