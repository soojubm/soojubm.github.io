import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

export interface ComponentRelatedItemData {
  href: string
  label: string
}

@customElement('mm-component-related')
export class ComponentRelated extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .component-related {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
      padding: var(--space-section) 0;
    }
  `
  @property({ type: String }) heading = 'Related'
  @property({ attribute: false }) items: ComponentRelatedItemData[] = []

  render() {
    return html`
      <section class="component-related">
        <mm-heading level="2">${this.heading}</mm-heading>
        <mm-button-group>
          ${this.items.map(
            item =>
              html`
                <mm-hashtag-link href=${item.href}>${item.label}</mm-hashtag-link>
              `,
          )}
        </mm-button-group>
      </section>
    `
  }
}
