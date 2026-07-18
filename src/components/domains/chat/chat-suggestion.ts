import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'

import {
  renderSuggestionButton,
  suggestionButtonStyles,
} from '@/components/domains/shared/suggestion-button'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import { emit } from '@/utils/emit'

/**
 * 채팅 입력 추천 버튼. mm-button(size=small)을 베이스로 합니다.
 * 클릭 시 chat-suggestion-select 이벤트를 발행합니다.
 */
@customElement('mm-chat-suggestion')
export class ChatSuggestion extends LitElement {
  static styles = [resetStyles, suggestionButtonStyles]

  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName

  render() {
    return renderSuggestionButton(this.icon, this.handleClick)
  }

  private handleClick = () => {
    const value = this.value || this.textContent?.trim() || ''
    emit(this, 'chat-suggestion-select', { value })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-suggestion': ChatSuggestion
  }
}
