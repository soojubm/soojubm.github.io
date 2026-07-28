import { LitElement, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { Checkbox } from '@/components/common/checkbox/checkbox'

import { checkboxGroupStyles } from '@/components/common/checkbox/checkbox.styles'
import { MultipleSelectionController } from '@/controllers/multiple-selection-controller'
import { emit } from '@/utils'

type CheckboxChangeDetail = {
  checked: boolean
  value?: string
}

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
    getOptions: () => this.checkboxes.map(checkbox => ({ value: this.getCheckboxValue(checkbox) })),
  })

  private isInitialized = false

  render() {
    return html`
      <fieldset @change=${this.handleCheckboxChange}>
        ${this.renderLegend()}
        <slot @slotchange=${this.handleSlotChange}></slot>
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

  updated(changed: Map<string, unknown>) {
    if (!this.isInitialized) return
    if (!changed.has('values') && !changed.has('name')) return

    this.syncCheckboxes()
  }

  private handleSlotChange = () => {
    if (!this.isInitialized && this.values.length === 0) {
      const initialCheckedValues = this.checkboxes
        .filter(checkbox => checkbox.checked)
        .map(checkbox => this.getCheckboxValue(checkbox))

      if (initialCheckedValues.length > 0) this.values = initialCheckedValues
    }

    this.isInitialized = true
    this.syncCheckboxes()
  }

  private syncCheckboxes() {
    this.selection.sync(
      this.checkboxes.map(checkbox => ({ checkbox, value: this.getCheckboxValue(checkbox) })),
      ({ checkbox }, selected) => {
        if (this.name) checkbox.name = this.name

        checkbox.checked = selected
      },
    )
  }

  private handleCheckboxChange = (event: Event) => {
    const target = event.target

    if (!(target instanceof HTMLElement) || target.tagName !== 'MM-CHECKBOX') return

    const customEvent = event as CustomEvent<CheckboxChangeDetail>
    customEvent.stopPropagation()

    const { checked, value } = customEvent.detail

    if (!value) return

    this.updateSelection(value, checked)
  }

  private updateSelection(value: string, checked: boolean) {
    this.selection.setSelected({ value }, checked)
    this.syncCheckboxes()
    this.dispatchValueChange()
  }

  private getCheckboxValue(checkbox: Checkbox) {
    return checkbox.value || checkbox.getAttribute('value') || ''
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
    const selectableValues = this.selectableCheckboxes.map(checkbox =>
      this.getCheckboxValue(checkbox),
    )
    const otherValues = this.values.filter(value => !selectableValues.includes(value))

    this.values = checked ? [...otherValues, ...selectableValues] : otherValues
    this.syncCheckboxes()
    this.dispatchValueChange()
  }

  private get selectableCheckboxes() {
    return this.checkboxes.filter(checkbox => !checkbox.disabled)
  }

  private isChecked(checkbox: Checkbox) {
    return this.selection.isSelected(this.getCheckboxValue(checkbox))
  }
}

export default CheckboxGroup
