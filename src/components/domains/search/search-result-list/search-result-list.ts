import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import '@/components/common'
import '@/components/domains/search/search-group'
import '@/components/domains/search/search-result-item'

export interface SearchResultSegment {
  text: string
  match?: boolean
}

export interface SearchResult {
  href: string
  label: string
  description?: string | SearchResultSegment[]
}

@customElement('fff-search-result-list')
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
      <fff-search-group heading=${ifDefined(this.heading)} gap="2">
        ${repeat(
          this.results,
          result => result.href,
          result => this.renderResult(result),
        )}
      </fff-search-group>
    `
  }

  private renderResult({ href, label, description = '' }: SearchResult) {
    const segments = typeof description === 'string' ? undefined : description
    const text = segments ? segments.map(segment => segment.text).join('') : description

    return html`
      <fff-search-result-item
        href=${href}
        label=${label}
        description=${text}
        .segments=${segments}
      ></fff-search-result-item>
    `
  }
}
