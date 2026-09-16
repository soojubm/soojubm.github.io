import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { RadioCard } from '@/components/common/radio/semantics/radio-card'

import { radioGroupStyles } from '@/components/common/radio/radio.styles'
import { SelectionGroupController } from '@/controllers/selection-group-controller'
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'

/**
 * 카드는 가격·배지·설명처럼 옵션 배열로 표현할 수 없는 콘텐츠를 담으므로,
 * mm-radio-group과 달리 mm-radio-card를 자식으로 받아 선택 상태를 소유한다.
 */
@customElement('mm-radio-card-group')
export class RadioCardGroup extends LitElement {
  static styles = [resetStyles, radioGroupStyles]
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) legend = ''
  @queryAssignedElements({ selector: 'mm-radio-card' })
  private cards!: RadioCard[]
  private selection = new SingleSelectionController(this, {
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })
  private group = new SelectionGroupController<RadioCard>({
    selection: this.selection,
    getItems: () => this.cards,
    isEmpty: () => !this.value,
    applyItem: card => {
      if (this.name) card.name = this.name
      // 그룹 disabled는 항목 자신의 disabled를 덮지 않고 더한다.
      // disabled는 reflect하지 않으므로 attribute가 마크업이 선언한 의도로 남는다.
      card.disabled = this.disabled || card.hasAttribute('disabled')
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
        <legend>${this.legend}</legend>
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
