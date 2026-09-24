import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/scroll/scroll'

/**
 * 검색 추천 키워드 그룹. 가로 스크롤 가능한 추천어 영역.
 * 스크롤과 양 끝의 흐림·넘김 버튼은 mm-scroll(row)이 소유한다.
 *
 * bleed: 부모 패딩만큼 좌우로 블리드해서 스크롤 끝까지 도달 가능하게 함
 *
 * <mm-search-suggestion-group bleed="var(--space-4)" aria-label="추천 검색어">
 *   <mm-search-suggestion>로얄테넌바움</mm-search-suggestion>
 *   <mm-search-suggestion>소매치기</mm-search-suggestion>
 * </mm-search-suggestion-group>
 */
@customElement('mm-search-suggestion-group')
export class SearchSuggestionGroup extends LitElement {
  static styles = css`
    :host {
      --_bleed: 0px;

      display: block;
      margin-inline: calc(-1 * var(--_bleed));
    }

    mm-scroll {
      padding-inline: var(--_bleed);
    }

    ::slotted(mm-search-suggestion) {
      flex-shrink: 0;
    }
  `
  @property({ type: String }) bleed?: string

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

  updated(changed: Map<string, unknown>) {
    if (changed.has('bleed')) this.style.setProperty('--_bleed', this.bleed ?? '0px')
  }
}
