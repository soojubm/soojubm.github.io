import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/button/button-group'
import '@/components/common/button/semantics/hashtag-link'
import { arrayAttributeConverter } from '@/utils'
import '@/components/common/text/semantics/heading'

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

  @property({
    attribute: 'items',
    converter: arrayAttributeConverter<ComponentRelatedItemData>(),
  })
  items: ComponentRelatedItemData[] = []

  render() {
    return html`
      <section class="component-related">
        <mm-heading level="2">Related</mm-heading>
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

export default ComponentRelated
