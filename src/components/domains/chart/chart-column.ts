import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import { focusRingStyles, resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'
import '@/components/common/text/text'

export type ChartColumnItem = {
  label: string
  share: number
  value?: string
}

/**
 * 범주별 몫을 세로 막대 높이로 그리는 차트.
 * 한 시리즈를 범주로 나눈 것이므로 막대마다 색을 나누지 않고 하나의 색을 쓴다.
 * selectable이면 각 열이 버튼이 되고, 고른 값은 change로 알리되 쓰임새는 소비처가 정한다.
 */
@customElement('mm-chart-column')
export class ChartColumn extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        --chart-column-height: var(--size-80);
        --chart-column-color: var(--background-strong-color);

        display: flex;
        gap: var(--space-2);
      }

      /* 열 너비는 컨테이너를 고르게 나눠 갖는다. 축의 폭은 차트가 놓인 자리가 정한다. */
      .column {
        display: flex;
        flex: 1;
        min-width: 0;
      }

      .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-1);
        width: 100%;
      }

      button.content {
        cursor: pointer;
      }

      button.content:focus-visible {
        ${focusRingStyles};
      }

      .track {
        display: flex;
        align-items: flex-end;
        width: 100%;
        height: var(--chart-column-height);
        border-radius: var(--radius);
        background: var(--background-subtle-color);
      }

      button.content:hover .track {
        background: var(--interaction-hover-background-color);
      }

      button.content[aria-pressed='true'] .track {
        background: var(--interaction-selected-background-color);
      }

      .bar {
        width: 100%;
        border-radius: var(--radius);
        background: var(--chart-column-color);
      }
    `,
  ]
  @property({ type: Array }) items: ChartColumnItem[] = []
  @property({ type: Boolean, reflect: true }) selectable = false
  @property({ type: String }) selected = ''

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'list')
  }

  render() {
    return html`
      ${this.items.map(item => this.renderColumn(item))}
    `
  }

  private renderColumn(item: ChartColumnItem) {
    return html`
      <div class="column" role="listitem">${this.renderContent(item)}</div>
    `
  }

  private renderContent(item: ChartColumnItem) {
    if (!this.selectable) {
      return html`
        <div class="content">${this.renderBody(item)}</div>
      `
    }

    return html`
      <button
        class="content"
        aria-pressed=${this.selected === item.label}
        @click=${() => this.handleColumnClick(item.label)}
      >
        ${this.renderBody(item)}
      </button>
    `
  }

  private renderBody({ label, share, value }: ChartColumnItem) {
    return html`
      ${value
        ? html`
            <mm-text size="12">${value}</mm-text>
          `
        : nothing}
      <div class="track">
        <div class="bar" style=${styleMap({ height: `${share}%` })}></div>
      </div>
      <mm-text size="12">${label}</mm-text>
    `
  }

  private handleColumnClick(label: string) {
    this.selected = this.selected === label ? '' : label

    emit(this, 'change', { value: this.selected })
  }
}
