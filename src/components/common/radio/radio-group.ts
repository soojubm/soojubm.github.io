import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import { Radio } from '@/components/common/radio/radio'
import { radioGroupStyles } from '@/components/common/radio/radio.styles'
import { SelectionGroupController } from '@/controllers/selection-group-controller'
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { emit } from '@/utils'

@customElement('mm-radio-group')
export class RadioGroup extends LitElement {
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

  private group = new SelectionGroupController<Radio>(this, {
    selection: this.selection,
    getItems: () => this.radios,
    isEmpty: () => !this.value,
    applyItem: radio => {
      if (this.name) radio.name = this.name
      // 그룹 disabled는 항목 자신의 disabled를 덮지 않고 더한다.
      // disabled는 reflect하지 않으므로 attribute가 마크업이 선언한 의도로 남는다.
      radio.disabled = this.disabled || radio.hasAttribute('disabled')
    },
    onChange: () => {
      emit(this, 'change', { value: this.value, name: this.name })
    },
  })

  render() {
    return html`
      <fieldset
        class="radio-group"
        ?disabled=${this.disabled}
        @change=${this.group.handleItemChange}
      >
        <legend class="visually-hidden">${this.legend}</legend>
        <slot @slotchange=${this.group.handleSlotChange}></slot>
      </fieldset>
    `
  }

  protected updated(changedProperties: Map<string, unknown>) {
    const syncedProperties = ['value', 'name', 'disabled']
    if (!syncedProperties.some(propertyName => changedProperties.has(propertyName))) return

    this.group.sync()
  }
}

export default RadioGroup
