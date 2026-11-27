import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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
    `,
  ]
  @property({ type: String }) href = ''
  @property({ type: String }) label = ''
  @property({ type: String }) description = ''

  render() {
    return html`
      <a href=${this.href}>
        <mm-list-item
          size="medium"
          icon=${ICON_NAMES.SEARCH}
          label=${this.label}
          description=${this.description}
        ></mm-list-item>
      </a>
    `
  }
}
