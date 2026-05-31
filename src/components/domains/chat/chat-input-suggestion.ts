import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../shared/reset.styles'

/**
 * 채팅 입력 추천 버튼. mm-button(size=small)을 베이스로 합니다.
 * 클릭 시 chat-suggestion-select 이벤트를 발행합니다.
 */
@customElement('mm-chat-input-suggestion')
export class ChatInputSuggestion extends LitElement {
  /** 선택 시 전달할 값 (없으면 텍스트 콘텐츠 사용) */
  @property({ type: String }) value = ''
  @property({ type: String }) icon = ''

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
    this.dispatchEvent(
      new CustomEvent('chat-suggestion-select', {
        detail: { value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  render() {
    return html`
      <mm-button
        variant="tertiary"
        size="small"
        icon=${this.icon}
        @click=${this.handleClick}
      >
        <slot></slot>
      </mm-button>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-input-suggestion': ChatInputSuggestion
  }
}
