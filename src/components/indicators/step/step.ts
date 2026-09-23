import { LitElement, html } from 'lit'
import { customElement, property, queryAssignedElements } from 'lit/decorators.js'

import type { StepItem, StepOrientation } from '@/components/indicators/step/step-item'
import type { PropertyValues } from 'lit'

import { stepStyles } from '@/components/indicators/step/step.styles'
import '@/components/indicators/step/step-item'

/**
 * <mm-step>
 * 단계를 순서대로 늘어놓고 단계를 잇는 선을 그리는 진행 표시입니다.
 * 번호와 orientation은 항목마다 받지 않고 순서를 소유한 이 그룹이 채웁니다.
 */
@customElement('mm-step')
export class Step extends LitElement {
  static styles = stepStyles
  @property({ type: String, reflect: true }) orientation: StepOrientation = 'horizontal'
  @queryAssignedElements({ flatten: true, selector: 'mm-step-item' })
  private items!: StepItem[]

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  protected updated(changed: PropertyValues) {
    if (!changed.has('orientation')) return

    this.syncItems()
  }

  render() {
    return html`
      <slot @slotchange=${this.syncItems}></slot>
    `
  }

  private syncItems() {
    this.items.forEach((item, index) => {
      item.orientation = this.orientation
      item.value = index + 1
    })
  }
}
