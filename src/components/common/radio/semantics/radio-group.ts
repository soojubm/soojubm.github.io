import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { Radio } from '@/components/common/radio/radio'
import { radioGroupStyles } from '@/components/common/radio/radio.styles' // 🔥 외부 스타일 임포트
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { emit } from '@/utils'

@customElement('mm-radio-group')
export class RadioGroup extends LitElement {
  // 🔥 분리한 스타일 지정
  static styles = [radioGroupStyles]

  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) legend = ''

  @queryAssignedElements({ selector: 'mm-radio' })
  private radios!: Radio[]

  private selection = new SingleSelectionController(this, {
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })

  render() {
    return html`
      <fieldset class="radio-group" ?disabled=${this.disabled} @change=${this.handleRadioChange}>
        <legend class="visually-hidden">${this.legend}</legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (!changedProperties.has('value') && !changedProperties.has('disabled')) return

    this.syncRadios()
  }

  private handleSlotChange = () => {
    this.syncRadios()
  }

  private syncRadios() {
    this.selection.sync(this.radios, (radio, selected) => {
      if (this.name) radio.name = this.name
      radio.disabled = this.disabled
      radio.checked = selected
    })
  }

  private handleRadioChange(e: Event) {
    const target = e.target as Radio
    if (target.tagName.toLowerCase() !== 'mm-radio') return

    e.stopPropagation()

    if (!target.checked) return

    const newValue = target.value || ''
    if (this.value === newValue) return

    this.commitValue(newValue)
  }

  private commitValue(value: string) {
    this.selection.setSelected({ value }, true)
    this.syncRadios()

    emit(this, 'change', { value: this.value, name: this.name })
  }
}

export default RadioGroup
