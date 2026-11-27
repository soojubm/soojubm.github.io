import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { SearchResultSegment } from '@/components/domains/search/search-result-list'

import { ICON_NAMES } from '@/components/common'
import { listItemInteractiveStyles } from '@/components/common/list-item/list-item.styles'
import { resetStyles } from '@/stylesheets/shared.styles'
import '@/components/common'

@customElement('mm-search-result-item')
export class SearchResultItem extends LitElement {
  static styles = [
    resetStyles,
    css`
      a {
        ${listItemInteractiveStyles}
      }
    `,
    css`
      :host {
        display: block;
      }

      mm-paragraph {
        color: var(--foreground-color);
      }
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''
  @property({ attribute: false }) segments?: SearchResultSegment[]

  render() {
    return html`
      <a href=${this.href}>
        <mm-list-item
          size="medium"
          icon=${ICON_NAMES.SEARCH}
          avatar-variant="tertiary"
          label=${this.label}
          description=${this.description}
        >
          ${this.renderDescription()}
        </mm-list-item>
      </a>
    `
  }

  private renderDescription() {
    if (!this.description) return nothing

    return html`
      <mm-paragraph slot="description" size="medium" max-lines="1">
        ${this.renderSegments()}
      </mm-paragraph>
    `
  }

  // 템플릿의 줄바꿈이 글자 사이 공백으로 보이지 않도록 한 줄로 둔다.
  // prettier-ignore
  private renderSegments() {
    if (!this.segments) return this.description

    return this.segments.map(({ text, match }) => (match ? html`<mm-highlight>${text}</mm-highlight>` : text))
  }
}
