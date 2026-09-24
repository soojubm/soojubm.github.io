import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/dot/dot'
import '@/components/common/text/text'
import { type TagTone } from '@/components/common/tag/tag.styles'

export type ChartLegendItem = {
  label: string
  value?: string
  tone: TagTone
}

/**
 * 차트가 그린 시리즈와 이름을 잇는 범례.
 * 점의 색은 mm-dot의 tone 규칙을 따르므로, 막대 같은 짝 차트와 같은 tone을 넘기면 색이 맞는다.
 */
@customElement('mm-chart-legend')
export class ChartLegend extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .item {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    .value {
      margin-left: auto;
    }
  `
  @property({ type: Array }) items: ChartLegendItem[] = []

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  render() {
    return html`
      ${this.items.map(item => this.renderItem(item))}
    `
  }

  private renderItem({ label, value, tone }: ChartLegendItem) {
    return html`
      <div class="item" role="listitem">
        <mm-dot tone=${tone}></mm-dot>
        <mm-text>${label}</mm-text>
        ${value
          ? html`
              <mm-text class="value">${value}</mm-text>
            `
          : nothing}
      </div>
    `
  }
}
