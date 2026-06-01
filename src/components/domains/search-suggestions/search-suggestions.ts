import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

/**
 * 검색 추천 키워드 그룹. 가로 스크롤 가능한 추천어 영역.
 *
 * <mm-search-suggestions aria-label="추천 검색어">
 *   <mm-search-suggestion>로얄테넌바움</mm-search-suggestion>
 *   <mm-search-suggestion>소매치기</mm-search-suggestion>
 * </mm-search-suggestions>
 */
@customElement('mm-search-suggestions')
export class SearchSuggestions extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-2);
        flex-wrap: nowrap;
        overflow-x: auto;
        scroll-behavior: smooth;
        padding: var(--space-1) 0;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      :host::-webkit-scrollbar {
        display: none;
      }

      ::slotted(mm-search-suggestion) {
        flex-shrink: 0;
      }
    `,
  ]

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`<slot></slot>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-search-suggestions': SearchSuggestions
  }
}
