import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/scroll/scroll'

@customElement('fff-search-suggestion-group')
export class SearchSuggestionGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ::slotted(fff-search-suggestion) {
      flex-shrink: 0;
    }
  `
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      <fff-scroll gap="2" hide-scrollbar>
        <slot></slot>
      </fff-scroll>
    `
  }
}
