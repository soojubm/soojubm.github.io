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

@customElement('fff-step')
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
      <fff-step-item
        .orientation=${this.orientation}
        .value=${index + 1}
        .label=${item.label}
        ?active=${item.active}
        .ariaCurrent=${item.ariaCurrent ?? null}
      >
        ${item.content ?? nothing}
      </fff-step-item>
    `
  }
}
