import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common'

@customElement('fff-search-result-empty')
export class SearchResultEmpty extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) query = ''

  render() {
    return html`
      <fff-result heading="'${this.query}'와(과) 일치하는 내용이 없습니다.">
        <slot></slot>
      </fff-result>
    `
  }
}
