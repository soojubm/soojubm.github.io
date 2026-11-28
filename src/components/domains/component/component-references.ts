import { LitElement, html, css, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

export interface ComponentReferenceItemData {
  href: string
  label: string
  /** 외부 링크 표식. 생략하면 href가 절대 URL인지로 정한다. */
  external?: boolean
}

const isAbsoluteUrl = (href: string) => /^https?:\/\//.test(href)

@customElement('fff-component-references')
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
    const groups = Array.isArray(this.items[0])
      ? (this.items as ComponentReferenceItemData[][])
      : [this.items as ComponentReferenceItemData[]]
    return groups.filter(group => group.length > 0)
  }

  render() {
    if (this.groups.length === 0) return nothing

    return html`
      <div class="references-body">
        <fff-heading>${this.heading}</fff-heading>
        <fff-surface variant="filled" radius="large" style="padding-inline: 1.25rem">
          ${this.groups.map((group, index) => this.renderGroup(group, index))}
        </fff-surface>
      </div>
    `
  }

  private renderGroup(group: ComponentReferenceItemData[], index: number) {
    return html`
      ${index > 0
        ? html`
            <fff-separator></fff-separator>
          `
        : null}
      <div class="references-links">${group.map(item => this.renderLink(item))}</div>
    `
  }

  private renderLink({ href, label, external }: ComponentReferenceItemData) {
    const isExternal = external ?? isAbsoluteUrl(href)

    return html`
      <fff-link ?external=${isExternal} href=${href}>${label}</fff-link>
    `
  }
}
