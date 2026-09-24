import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { ICON_NAMES } from '@/components/common'
import { interactiveRowStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { uniqueId } from '@/utils'
import '@/components/common'

export interface SearchResult {
  href: string
  label: string
  description?: string
}

/**
 * 검색어와 일치하는 페이지로 가는 링크 목록.
 * 결과를 누르면 그 페이지로 이동하므로 menu가 아닌 list로 읽히고, 각 링크가 저마다 Tab 순서를 갖는다.
 * heading은 목록 밖에 제목 요소로 렌더하고 목록에 aria-labelledby로 연결한다.
 */
@customElement('mm-search-result-list')
export class SearchResultList extends LitElement {
  static styles = [
    resetStyles,
    interactiveRowStyles,
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
      <mm-list-item-group aria-labelledby=${ifDefined(this.heading ? this.headingId : undefined)}>
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
