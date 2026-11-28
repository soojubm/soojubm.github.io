import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import '@/components/common/link/link'
import '@/components/common/text/text'
import '@/components/domains/chart/chart-column'

export type ComponentUsagePage = {
  href: string
  label: string
}

export type ComponentUsageItem = {
  label: string
  /** 템플릿에 나타난 횟수. 막대 높이의 근거. */
  count: number
  /** 쓰는 페이지 수. 목록을 두지 않을 때도 규모는 말한다. */
  pageCount: number
  /** 한 화면에 들어올 만큼 적을 때만 둔다. */
  pages?: ComponentUsagePage[]
}

@customElement('fff-component-usage')
export class ComponentUsage extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
    }

    .pages {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1) var(--space-4);
    }
  `
  @property({ type: Array }) items: ComponentUsageItem[] = []
  @state() private selected = ''

  render() {
    return html`
      <fff-chart-column
        selectable
        .items=${this.shares}
        .selected=${this.selected}
        @change=${this.handleSelectionChange}
      ></fff-chart-column>
      ${this.renderUsage()}
    `
  }

  private renderUsage() {
    const item = this.items.find(({ label }) => label === this.selected)
    if (!item) return nothing

    return html`
      <fff-text size="12" color="light">${item.pageCount}개 페이지에서 씁니다.</fff-text>
      ${this.renderPages(item)}
    `
  }

  private renderPages({ pages }: ComponentUsageItem) {
    if (!pages) return nothing

    return html`
      <div class="pages">
        ${pages.map(
          ({ href, label }) => html`
            <fff-link href=${href}>${label}</fff-link>
          `,
        )}
      </div>
    `
  }

  private handleSelectionChange(event: CustomEvent<{ value: string }>) {
    this.selected = event.detail.value
  }

  /** 막대 높이는 가장 큰 값을 100으로 잡는다. */
  private get shares() {
    const max = Math.max(...this.items.map(({ count }) => count))

    return this.items.map(({ label, count }) => ({
      label,
      share: Math.round((count / max) * 100),
      value: String(count),
    }))
  }
}
