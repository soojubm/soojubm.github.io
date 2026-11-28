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

@customElement('fff-chart-legend')
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
        <fff-dot tone=${tone}></fff-dot>
        <fff-text>${label}</fff-text>
        ${value
          ? html`
              <fff-text class="value">${value}</fff-text>
            `
          : nothing}
      </div>
    `
  }
}
