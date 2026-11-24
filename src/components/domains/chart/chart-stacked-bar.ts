import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { dotToneColor } from '@/components/common/dot/dot.styles'
import { type TagTone } from '@/components/common/tag/tag.styles'

export type ChartStackedBarItem = {
  label: string
  tone: TagTone
  share: number
}

@customElement('mm-chart-stacked-bar')
export class ChartStackedBar extends LitElement {
  static styles = css`
    :host {
      --chart-stacked-bar-height: var(--size-16);

      display: flex;
      gap: var(--space-1);
      padding: var(--space-1);
      border-radius: var(--border-radius);
      background: var(--background-subtle-color);
    }

    .segment {
      height: var(--chart-stacked-bar-height);
      border-radius: var(--border-radius);
    }
  `
  @property({ type: Array }) items: ChartStackedBarItem[] = []

  // 색 면만 그리고 이름은 범례가 맡으므로 보조 기술에는 드러내지 않는다.
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('aria-hidden', 'true')
  }

  render() {
    return html`
      ${this.items.map(item => this.renderSegment(item))}
    `
  }

  private renderSegment({ tone, share }: ChartStackedBarItem) {
    return html`
      <div
        class="segment"
        style=${styleMap({ backgroundColor: dotToneColor(tone), width: `${share}%` })}
      ></div>
    `
  }
}
