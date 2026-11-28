import { LitElement, html, css, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

export interface ComponentChangelogItemData {
  /** YYYY-MM-DD */
  date: string
  description: string
}

@customElement('fff-component-changelog')
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
      <fff-heading>${this.heading}</fff-heading>
      <fff-surface variant="outlined" radius="large">
        <div class="changelog-items">${this.items.map(item => this.renderItem(item))}</div>
      </fff-surface>
    `
  }

  private renderItem(item: ComponentChangelogItemData) {
    return html`
      <div class="changelog-item">
        <fff-text color="light">${item.date}</fff-text>
        <fff-paragraph>${item.description}</fff-paragraph>
      </div>
    `
  }
}
