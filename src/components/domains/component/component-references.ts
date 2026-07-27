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
      <mm-flex direction="column" gap="3">
        <mm-heading>${this.heading}</mm-heading>
        <mm-surface variant="filled" radius="large" style="padding-inline: 1.25rem">
          <mm-flex gap="4" wrap="wrap" style="row-gap:var(--space-1)">
            ${this.items.map(
              item =>
                html`
                  <mm-link ?external=${item.external} href=${item.href}>${item.label}</mm-link>
                `,
            )}
          </mm-flex>
        </mm-surface>
      </mm-flex>
    `
  }
}

export default ComponentReferences
