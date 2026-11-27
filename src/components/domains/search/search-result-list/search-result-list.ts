import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import '@/components/common'
import '@/components/domains/search/search-group'
import '@/components/domains/search/search-result-item'

export interface SearchResult {
  href: string
  label: string
  description?: string
}

@customElement('mm-search-result-list')
export class SearchResultList extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) heading?: string
  @property({ attribute: false }) results: SearchResult[] = []

  render() {
    return html`
      <mm-search-group heading=${ifDefined(this.heading)}>
        ${repeat(
          this.results,
          result => result.href,
          result => this.renderResult(result),
        )}
      </mm-search-group>
    `
  }

  private renderResult(result: SearchResult) {
    return html`
      <mm-search-result-item
        href=${result.href}
        label=${result.label}
        description=${result.description ?? ''}
      ></mm-search-result-item>
    `
  }
}
