import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

export type ChartStackedBarItem = {
  label: string
  color: string
  share: number
}

/**
 * 전체를 시리즈별 몫으로 나눠 채우는 가로 막대.
 * 색은 차트의 시리즈 팔레트에서 오므로 tone 어휘가 아니라 값으로 받는다.
 */
@customElement('mm-chart-stacked-bar')
export class ChartStackedBar extends LitElement {
  static styles = css`
    :host {
      --chart-stacked-bar-height: var(--size-16);

      display: flex;
      gap: var(--space-1);
      padding: var(--space-1);
      border-radius: var(--radius);
      background: var(--background-subtle-color);
    }

    .segment {
      height: var(--chart-stacked-bar-height);
      border-radius: var(--radius);
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

  private renderSegment({ color, share }: ChartStackedBarItem) {
    return html`
      <div class="segment" style=${styleMap({ backgroundColor: color, width: `${share}%` })}></div>
    `
  }
}
