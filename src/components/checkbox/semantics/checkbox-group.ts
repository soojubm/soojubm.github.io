import { LitElement, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { Checkbox } from '@/components/checkbox/checkbox'

import { checkboxGroupStyles } from '@/components/checkbox/checkbox.styles'
import { SelectionController } from '@/controllers/selection-controller'
import { emit } from '@/utils/emit'

type CheckboxChangeDetail = {
  checked: boolean
  value?: string
}

@customElement('mm-checkbox-group')
export class CheckboxGroup extends LitElement {
  static styles = [checkboxGroupStyles]

  @property({ type: String })
  name?: string

  @property({ type: String })
  legend?: string

  @property({ type: Array })
  values: string[] = []

  @queryAssignedElements({ selector: 'mm-checkbox' })
  private checkboxes!: Checkbox[]

  private selection = new SelectionController(this, {
    getMode: () => 'multiple',
    getValues: () => this.values,
    setValues: values => {
      this.values = values
    },
    getOptions: () =>
      this.checkboxes?.map(checkbox => ({ value: this.getCheckboxValue(checkbox) })) ?? [],
  })

  private isInitialized = false

  render() {
    return html`
      <fieldset>
        ${this.renderLegend()}
        <slot @slotchange=${this.onSlotChange}></slot>
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

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('change', this.onCheckboxChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.removeEventListener('change', this.onCheckboxChange)
  }

  updated(changed: Map<string, unknown>) {
    if (this.isInitialized && (changed.has('values') || changed.has('name'))) this.syncCheckboxes()
  }

  private onSlotChange = () => {
    if (!this.isInitialized && this.values.length === 0) {
      const initialCheckedValues = this.checkboxes
        .filter(checkbox => checkbox.checked || checkbox.hasAttribute('checked'))
        .map(checkbox => checkbox.value || checkbox.getAttribute('value') || '')

      if (initialCheckedValues.length > 0) this.values = initialCheckedValues
    }

    this.isInitialized = true
    this.syncCheckboxes()
  }

  private syncCheckboxes() {
    if (!this.checkboxes) return

    this.selection.sync(
      this.checkboxes.map(checkbox => ({ checkbox, value: this.getCheckboxValue(checkbox) })),
      ({ checkbox }, selected) => {
        if (this.name) checkbox.name = this.name

        checkbox.checked = selected
      },
    )
  }

  private onCheckboxChange = (event: Event) => {
    const target = event.target

    if (!(target instanceof HTMLElement) || target.tagName !== 'MM-CHECKBOX') return

    const customEvent = event as CustomEvent<CheckboxChangeDetail>
    customEvent.stopPropagation()

    const { checked, value } = customEvent.detail

    if (!value) return

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
}

export default CheckboxGroup
