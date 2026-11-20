import { LitElement, html, nothing, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { StepOrientation } from '@/components/indicators/step/step-item'
import type { AriaCurrent } from '@/types'

import { stepStyles } from '@/components/indicators/step/step.styles'
import '@/components/indicators/step/step-item'

export type StepItemData = {
  label: string
  active?: boolean
  ariaCurrent?: AriaCurrent
  /** 단계 아래에 펼쳐 보일 내용 */
  content?: TemplateResult
}

/**
 * <mm-step>
 * 단계를 순서대로 늘어놓고 단계를 잇는 선을 그리는 진행 표시입니다.
 * items 배열로 단계를 받아 번호와 orientation을 순서에 맞춰 채웁니다.
 */
@customElement('mm-step')
export class Step extends LitElement {
  static styles = stepStyles
  @property({ type: String, reflect: true }) orientation: StepOrientation = 'horizontal'
  @property({ attribute: false }) items: StepItemData[] = []

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  render() {
    return html`
      ${this.items.map((item, index) => this.renderItem(item, index))}
    `
  }

  private renderItem(item: StepItemData, index: number) {
    return html`
      <mm-step-item
        .orientation=${this.orientation}
        .value=${index + 1}
        .label=${item.label}
        ?active=${item.active}
        .ariaCurrent=${item.ariaCurrent ?? null}
      >
        ${item.content ?? nothing}
      </mm-step-item>
    `
  }
}
