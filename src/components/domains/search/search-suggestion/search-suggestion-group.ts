import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import '@/components/common/scroll/scroll'

/**
 * 검색 추천 키워드 그룹. 가로 스크롤 가능한 추천어 영역.
 * 스크롤과 양 끝의 흐림·넘김 버튼은 mm-scroll(row)이 소유한다.
 *
 * <mm-search-suggestion-group aria-label="추천 검색어">
 *   <mm-search-suggestion>로얄테넌바움</mm-search-suggestion>
 *   <mm-search-suggestion>소매치기</mm-search-suggestion>
 * </mm-search-suggestion-group>
 */
@customElement('mm-search-suggestion-group')
export class SearchSuggestionGroup extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    ::slotted(mm-search-suggestion) {
      flex-shrink: 0;
    }
  `
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'group')
  }

  render() {
    return html`
      <mm-scroll gap="2" hide-scrollbar>
        <slot></slot>
      </mm-scroll>
    `
  }
}
