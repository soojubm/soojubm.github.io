import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { MenuItemGroupSize } from '@/components/common/menu-item/menu-item-group'

import '@/components/common/menu-item/menu-item-group'
import { MenuItemRadio } from '@/components/common/menu-item/semantics/menu-item-radio'
import { SelectionGroupController } from '@/controllers/selection-group-controller'
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
  @property({ type: String }) size: MenuItemGroupSize = ''
  @property({ type: String, attribute: 'aria-label' }) ariaLabel = ''

  @queryAssignedElements({ selector: 'mm-menu-item-radio' })
  private radios!: MenuItemRadio[]

  private selection = new SingleSelectionController(this, {
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })

  private group = new SelectionGroupController<MenuItemRadio>({
    selection: this.selection,
    getItems: () => this.radios,
    isEmpty: () => !this.value,
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
        size=${ifDefined(this.size || undefined)}
        aria-label=${this.ariaLabel || nothing}
        @change=${this.group.handleItemChange}
      >
        <slot @slotchange=${this.group.handleSlotChange}></slot>
      </mm-menu-item-group>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('value') && !changedProperties.has('name')) return

    this.group.sync()
  }
}

export default MenuItemRadioGroup
