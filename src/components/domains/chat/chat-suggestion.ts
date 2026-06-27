import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import type { IconName } from '../../icon-button/semantics/icon-names'
import { emit } from '../../../utils/emit'

/**
 * 채팅 입력 추천 버튼. mm-button(size=small)을 베이스로 합니다.
 * 클릭 시 chat-suggestion-select 이벤트를 발행합니다.
 */
@customElement('mm-chat-suggestion')
export class ChatSuggestion extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) icon?: IconName

  private handleClick() {
    const value = this.value || this.textContent?.trim() || ''
    emit(this, 'chat-suggestion-select', { value })
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
    'mm-chat-suggestion': ChatSuggestion
  }
}
