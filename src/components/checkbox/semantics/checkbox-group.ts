import { LitElement, html, nothing } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { Checkbox } from '@/components/checkbox/checkbox'

import { checkboxGroupStyles } from '@/components/checkbox/checkbox.styles'
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
  value: string[] = []

  @queryAssignedElements({ selector: 'mm-checkbox' })
  private checkboxes!: Checkbox[]

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
    if (this.isInitialized && (changed.has('value') || changed.has('name'))) this.syncCheckboxes()
  }

  private onSlotChange = () => {
    if (!this.isInitialized && this.value.length === 0) {
      const initialCheckedValues = this.checkboxes
        .filter(checkbox => checkbox.checked || checkbox.hasAttribute('checked'))
        .map(checkbox => checkbox.value || checkbox.getAttribute('value') || '')

      if (initialCheckedValues.length > 0) this.value = initialCheckedValues
    }

    this.isInitialized = true
    this.syncCheckboxes()
  }

  private syncCheckboxes() {
    if (!this.checkboxes) return

    this.checkboxes.forEach(checkbox => {
      const value = checkbox.value || checkbox.getAttribute('value') || ''

      if (this.name) checkbox.name = this.name

      checkbox.checked = this.value.includes(value)
    })
  }

  private onCheckboxChange = (event: Event) => {
    const target = event.target

    if (!(target instanceof HTMLElement) || target.tagName !== 'MM-CHECKBOX') return

    const customEvent = event as CustomEvent<CheckboxChangeDetail>
    customEvent.stopPropagation()

    const { checked, value } = customEvent.detail

    if (!value) return

    if (checked) {
      if (!this.value.includes(value)) this.value = [...this.value, value]
    } else {
      this.value = this.value.filter(item => item !== value)
    }

    this.dispatchValueChange()
  }

  private dispatchValueChange() {
    emit(this, 'change', {
      values: this.value,
    })
  }
}

export default CheckboxGroup
