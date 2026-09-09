import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/link/link'
import '@/components/common/separator/separator'
import '@/components/common/text/semantics/heading'
import '@/components/common/surface'

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

  @property({ attribute: false }) items:
    | ComponentReferenceItemData[]
    | ComponentReferenceItemData[][] = []

  private get groups(): ComponentReferenceItemData[][] {
    if (this.items.length === 0) return []
    if (Array.isArray(this.items[0])) return this.items as ComponentReferenceItemData[][]
    return [this.items as ComponentReferenceItemData[]]
  }

  render() {
    return html`
      <div class="references-body">
        <mm-heading>${this.heading}</mm-heading>
        <mm-surface variant="filled" radius="large" style="padding-inline: 1.25rem">
          ${this.groups.map((group, index) => this.renderGroup(group, index))}
        </mm-surface>
      </div>
    `
  }

  private renderGroup(group: ComponentReferenceItemData[], index: number) {
    return html`
      ${index > 0
        ? html`
            <mm-separator></mm-separator>
          `
        : null}
      <div class="references-links">
        ${group.map(
          item => html`
            <mm-link ?external=${item.external} href=${item.href}>${item.label}</mm-link>
          `,
        )}
      </div>
    `
  }
}
