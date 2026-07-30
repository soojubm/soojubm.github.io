import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/link/link'
import { arrayAttributeConverter } from '@/utils'

export interface ComponentReferenceItemData {
  href: string
  label: string
  external?: boolean
}

@customElement('mm-component-references')
export class ComponentReferences extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .references-body {
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .references-links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-1) var(--space-4);
    }

    .component-references {
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
      padding: var(--space-section) 0;
    }
  `

  @property({ type: String }) heading = 'References'

  @property({
    attribute: 'items',
    converter: arrayAttributeConverter<ComponentReferenceItemData>(),
  })
  items: ComponentReferenceItemData[] = []

  render() {
    return html`
      <div class="references-body">
        <mm-heading>${this.heading}</mm-heading>
        <mm-surface variant="filled" radius="large" style="padding-inline: 1.25rem">
          <div class="references-links">
            ${this.items.map(
              item =>
                html`
                  <mm-link ?external=${item.external} href=${item.href}>${item.label}</mm-link>
                `,
            )}
          </div>
        </mm-surface>
      </div>
    `
  }
}

export default ComponentReferences
