import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import type { IconName } from '../../icon-button/semantics/icon-names'
import { emit } from '../../../utils/emit'

/**
 * 검색 추천 키워드 버튼. mm-button(size=small)을 베이스로 합니다.
 * 클릭 시 search-suggestion-select 이벤트를 발행합니다.
 */
@customElement('mm-search-suggestion')
export class SearchSuggestion extends LitElement {
  /** 선택 시 전달할 검색어 (없으면 텍스트 콘텐츠 사용) */
  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }
    `,
  ]

  private handleClick() {
    const value = this.value || this.textContent?.trim() || ''
    emit(this, 'search-suggestion-select', { value })
  }

  render() {
    return html`
      <mm-button variant="tertiary" size="small" icon=${this.icon} @click=${this.handleClick}>
        <slot></slot>
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-search-suggestion': SearchSuggestion
  }
}
