import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import '@/components/common/dot/dot'
import '@/components/common/text/text'

export type ChartLegendItem = {
  label: string
  value?: string
  color: string
}

/**
 * 차트가 그린 시리즈와 이름을 잇는 범례.
 * 색은 차트의 시리즈 팔레트에서 오므로 tone 어휘가 아니라 값으로 받는다.
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
  @property({ type: String, reflect: true }) role = 'list'

  render() {
    return html`
      ${this.items.map(item => this.renderItem(item))}
    `
  }

  private renderItem({ label, value, color }: ChartLegendItem) {
    return html`
      <div class="item" role="listitem">
        <mm-dot style=${styleMap({ '--dot-background-color': color })}></mm-dot>
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
