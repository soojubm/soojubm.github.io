import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { ICON_NAMES } from '@/components/common'
import { listItemInteractiveStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'
import '@/components/common'
import '@/components/domains/search/search-group'

@customElement('mm-recent-search-list')
export class RecentSearchList extends LitElement {
  static styles = [
    resetStyles,
    css`
      button {
        ${listItemInteractiveStyles}
      }
    `,
    css`
      :host {
        display: block;
      }

      .item {
        display: flex;
        align-items: center;
        gap: var(--space-2);
      }
    `,
  ]
  @property({ type: String }) heading?: string
  @property({ attribute: false }) keywords: string[] = []

  render() {
    return html`
      <mm-search-group heading=${ifDefined(this.heading)}>
        ${this.keywords.map(keyword => this.renderKeyword(keyword))}
      </mm-search-group>
    `
  }

  private renderKeyword(keyword: string) {
    return html`
      <div class="item">
        <button type="button" @click=${() => this.handleKeywordClick(keyword)}>
          <mm-list-item label=${keyword}></mm-list-item>
        </button>
        <mm-icon-button
          size="small"
          icon=${ICON_NAMES.DISMISS}
          aria-label="'${keyword}' 검색 기록 삭제"
          @click=${() => this.handleRemoveClick(keyword)}
        ></mm-icon-button>
      </div>
    `
  }

  private handleKeywordClick(keyword: string) {
    emit(this, 'recent-search-select', { value: keyword })
  }

  private handleRemoveClick(keyword: string) {
    this.keywords = this.keywords.filter(item => item !== keyword)
    emit(this, 'recent-search-remove', { value: keyword })
  }
}
