import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { ICON_NAMES } from '@/components/common'
import { listItemInteractiveStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'
import '@/components/common'

export interface SearchResult {
  href: string
  label: string
  description?: string
}

@customElement('mm-search-result-list')
export class SearchResultList extends LitElement {
  static styles = [
    resetStyles,
    css`
      a {
        ${listItemInteractiveStyles}
      }
    `,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }
    `,
  ]
  @property({ type: String }) heading?: string
  @property({ attribute: false }) results: SearchResult[] = []
  private readonly headingId = uniqueId('search-result-heading')

  render() {
    return html`
      ${this.renderHeading()}
      <mm-list-item-group
        gap="0"
        aria-labelledby=${ifDefined(this.heading ? this.headingId : undefined)}
      >
        ${repeat(
          this.results,
          result => result.href,
          result => this.renderResult(result),
        )}
      </mm-list-item-group>
    `
  }

  private renderHeading() {
    if (!this.heading) return nothing

    return html`
      <mm-heading level="5" id=${this.headingId}>${this.heading}</mm-heading>
    `
  }

  private renderResult(result: SearchResult) {
    return html`
      <div>
        <a href=${result.href}>
          <mm-list-item
            size="medium"
            icon=${ICON_NAMES.SEARCH}
            label=${result.label}
            description=${result.description ?? ''}
          ></mm-list-item>
        </a>
      </div>
    `
  }
}
