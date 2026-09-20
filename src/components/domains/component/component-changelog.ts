import { LitElement, html, css, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

export interface ComponentChangelogItemData {
  /** YYYY-MM-DD */
  date: string
  description: string
}

/**
 * <mm-component-changelog>
 * 컴포넌트 문서 최하단에 API·동작 변경 이력을 최신순으로 나열한다.
 */
@customElement('mm-component-changelog')
export class ComponentChangelog extends LitElement {
  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding-top: var(--space-section);
    }

    .changelog-items {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .changelog-item {
      display: flex;
      gap: var(--space-4);
    }
  `
  @property({ type: String }) heading = 'Changelog'
  @property({ attribute: false }) items: ComponentChangelogItemData[] = []

  render() {
    if (this.items.length === 0) return nothing

    return html`
      <mm-heading>${this.heading}</mm-heading>
      <mm-surface variant="outlined" radius="large">
        <div class="changelog-items">${this.items.map(item => this.renderItem(item))}</div>
      </mm-surface>
    `
  }

  private renderItem(item: ComponentChangelogItemData) {
    return html`
      <div class="changelog-item">
        <mm-text color="light">${item.date}</mm-text>
        <mm-paragraph>${item.description}</mm-paragraph>
      </div>
    `
  }
}
