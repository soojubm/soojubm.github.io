import { LitElement, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { Checkbox } from '@/components/common/checkbox/checkbox'

import { checkboxGroupStyles } from '@/components/common/checkbox/checkbox.styles'
import { MultipleSelectionController } from '@/controllers/multiple-selection-controller'
import {
  SelectionGroupController,
  selectionItemValue,
} from '@/controllers/selection-group-controller'
import { emit } from '@/utils'

@customElement('mm-checkbox-group')
export class CheckboxGroup extends LitElement {
  static styles = [checkboxGroupStyles]

  @property({ type: String }) name?: string
  @property({ type: String }) legend?: string
  @property({ type: Array }) values: string[] = []

  @queryAssignedElements({ selector: 'mm-checkbox' })
  private checkboxes!: Checkbox[]

  private selection = new MultipleSelectionController(this, {
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () => this.checkboxes.map(checkbox => ({ value: selectionItemValue(checkbox) })),
  })

  private group = new SelectionGroupController<Checkbox>(this, {
    selection: this.selection,
    getItems: () => this.checkboxes,
    isEmpty: () => !this.values.length,
    applyItem: checkbox => {
      if (this.name) checkbox.name = this.name
    },
    onChange: () => {
      this.dispatchValueChange()
    },
  })

  render() {
    return html`
      <fieldset @change=${this.group.handleItemChange}>
        ${this.renderLegend()}
        <slot @slotchange=${this.group.handleSlotChange}></slot>
      </fieldset>
    `
  }

  private renderLegend() {
    if (!this.legend) return nothing

    return html`
      <legend>
        <mm-text size="12" color="light">${this.legend}</mm-text>
      </legend>
    `
  }

  protected updated(changed: Map<string, unknown>) {
    if (!changed.has('values') && !changed.has('name')) return

    this.group.sync()
  }

  private dispatchValueChange() {
    emit(this, 'change', {
      values: this.values,
    })
  }

  get checked() {
    const selectable = this.selectableCheckboxes
    return selectable.length > 0 && selectable.every(checkbox => this.isChecked(checkbox))
  }

  get indeterminate() {
    const selectable = this.selectableCheckboxes
    const checkedCount = selectable.filter(checkbox => this.isChecked(checkbox)).length

    return checkedCount > 0 && checkedCount < selectable.length
  }

  toggleAll() {
    const checked = !this.checked
    const selectableValues = this.selectableCheckboxes.map(checkbox => selectionItemValue(checkbox))
    const otherValues = this.values.filter(value => !selectableValues.includes(value))

    this.values = checked ? [...otherValues, ...selectableValues] : otherValues
    this.group.sync()
    this.dispatchValueChange()
  }

  private get selectableCheckboxes() {
    return this.checkboxes.filter(checkbox => !checkbox.disabled)
  }

  private isChecked(checkbox: Checkbox) {
    return this.selection.isSelected(selectionItemValue(checkbox))
  }
}

export default CheckboxGroup
