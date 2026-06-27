import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

/**
 * 검색 추천 키워드 그룹. 가로 스크롤 가능한 추천어 영역.
 *
 * bleed: 부모 패딩만큼 좌우로 블리드해서 스크롤 끝까지 도달 가능하게 함
 * fade: 우측에 fade mask를 적용해 추가 콘텐츠 존재를 암시
 *
 * <mm-search-suggestions bleed="var(--space-4)" fade aria-label="추천 검색어">
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
        --_bleed: 0px;

        display: flex;
        gap: var(--space-2);
        flex-wrap: nowrap;
        overflow-x: auto;
        scroll-behavior: smooth;
        -ms-overflow-style: none;
        scrollbar-width: none;

        margin-inline: calc(-1 * var(--_bleed));
        padding-inline: var(--_bleed);
      }

      :host::-webkit-scrollbar {
        display: none;
      }

      :host([fade]) {
        -webkit-mask-image: linear-gradient(to right, black calc(100% - 3rem), transparent 100%);
        mask-image: linear-gradient(to right, black calc(100% - 3rem), transparent 100%);
      }

      ::slotted(mm-search-suggestion) {
        flex-shrink: 0;
      }
    `,
  ]

  @property({ type: String }) bleed?: string

  @property({ type: Boolean, reflect: true }) fade = false
  @property({ type: String, reflect: true }) role = 'group'

  render() {
    return html`
      <slot></slot>
    `
  }

  updated(changed: Map<string, unknown>) {
    if (changed.has('bleed')) {
      this.style.setProperty('--_bleed', this.bleed ?? '0px')
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-search-suggestions': SearchSuggestions
  }
}
