import { LitElement, html, type PropertyValues } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { RadioCard } from '@/components/common/radio/semantics/radio-card'

import { inputSelectionGroupStyles } from '@/components/common/input/input.styles'
import { SingleSelectionController } from '@/controllers/single-selection-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'

/**
 * 카드는 가격·배지·설명처럼 옵션 배열로 표현할 수 없는 콘텐츠를 담으므로,
 * mm-radio-group과 달리 mm-radio-card를 자식으로 받는다.
 * 선택 값은 그룹이 소유하고, 자식 카드와의 왕복(초기 선택 흡수 → 값을 카드에 반영 →
 * 카드의 change를 그룹 change로 승격)도 그룹이 맡는다.
 */
@customElement('mm-radio-card-group')
export class RadioCardGroup extends LitElement {
  static styles = [resetStyles, inputSelectionGroupStyles]
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String }) legend = ''
  @queryAssignedElements({ selector: 'mm-radio-card' })
  private cards!: RadioCard[]
  private selection = new SingleSelectionController({
    getValue: () => this.value,
    setValue: value => {
      this.value = value
    },
  })
  // 첫 slot 배정 전에는 마크업이 선언한 초기 선택을 아직 읽지 못한 상태다.
  private initialized = false

  render() {
    return html`
      <fieldset ?disabled=${this.disabled} @change=${this.handleCardChange}>
        <legend>${this.legend}</legend>
        <slot @slotchange=${this.handleSlotChange}></slot>
      </fieldset>
    `
  }

  protected updated(_changed: PropertyValues) {
    this.syncCards()
  }

  private handleSlotChange() {
    if (!this.initialized) this.absorbInitialSelection()
    this.initialized = true

    this.syncCards()
  }

  private handleCardChange(event: Event) {
    const card = this.cards.find(candidate => candidate === event.target)
    if (!card) return

    // 카드 단위 이벤트는 여기서 끊고 그룹 단위 change로 승격한다.
    event.stopPropagation()
    this.selection.setSelected({ value: cardValue(card) }, card.checked)
    this.syncCards()
    emit(this, 'change', { value: this.value, name: this.name })
  }

  // 그룹이 소유한 선택 상태와 그룹 상태(name, disabled)를 카드에 되돌린다.
  private syncCards() {
    // 첫 렌더의 updated()는 slotchange보다 먼저 도는데, 그때 되돌리면
    // 마크업이 선언한 초기 선택을 흡수하기도 전에 지워버린다.
    if (!this.initialized) return

    this.cards.forEach(card => {
      if (this.name) card.name = this.name
      // 그룹 disabled는 카드 자신의 disabled를 덮지 않고 더한다.
      // disabled는 reflect하지 않으므로 attribute가 마크업이 선언한 의도로 남는다.
      card.disabled = this.disabled || card.hasAttribute('disabled')
      card.checked = this.selection.isSelected(cardValue(card))
    })
  }

  // 마크업이 선언한 초기 선택은 그룹이 아직 값을 갖지 않았을 때만 흡수한다.
  // 단일 선택이라 네이티브 radio처럼 선언된 카드 중 마지막이 남는다.
  private absorbInitialSelection() {
    if (!this.selection.isEmpty()) return

    this.cards
      .filter(card => card.checked)
      .forEach(card => this.selection.setSelected({ value: cardValue(card) }, true))
  }
}

// 아직 업그레이드되지 않은 카드도 값을 잃지 않도록 attribute를 함께 본다.
const cardValue = (card: RadioCard) => card.value || card.getAttribute('value') || ''
