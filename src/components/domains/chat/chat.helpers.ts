import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/icon-button/icon-button'
import '@/components/text/text'
import '@/components/thumbnail/thumbnail'
import '@/components/spinner/semantics/typing-indicator'
import { type Constructor } from '@/utils/mixin'

export const isChatBubbleImage = (src: string, typing: boolean) => !!src && !typing

export const renderChatMessageTime = (datetime: string) => {
  if (!datetime) return nothing

  return html`
    <mm-text as="time" size="12">${datetime}</mm-text>
  `
}

export const renderChatMessageFailedActions = (failed: boolean, onRetry: () => void) => {
  if (!failed) return nothing

  return html`
    <mm-flex gap="1" align-items="center">
      <mm-text size="12" color="danger" role="alert">전송 실패</mm-text>
      <mm-icon-button
        size="small"
        variant="ghost"
        icon=${ICON_NAMES.RETRY}
        aria-label="재전송"
        @click=${onRetry}
      ></mm-icon-button>
    </mm-flex>
  `
}

export const renderChatTypingIndicator = (
  typing: boolean,
  color = 'var(--foreground-subtle-color)',
) => {
  if (!typing) return nothing

  return html`
    <mm-typing-indicator .color=${color}></mm-typing-indicator>
  `
}

export const renderChatBubbleImage = (src: string, typing: boolean) => {
  if (!isChatBubbleImage(src, typing)) return nothing

  return html`
    <mm-thumbnail src=${src} alt="" ratio="4:3"></mm-thumbnail>
  `
}

export interface ChatBubbleImage {
  typing: boolean
  src: string
}

/** ai/participant/my-chat-bubble이 공유하는 typing/src 상태와 image attribute 동기화. */
export const withChatBubbleImage = <T extends Constructor<LitElement>>(Base: T) => {
  class ChatBubbleImageElement extends Base {
    @property({ type: Boolean }) typing = false
    @property({ type: String }) src = ''

    protected willUpdate() {
      this.toggleAttribute('image', isChatBubbleImage(this.src, this.typing))
    }
  }

  return ChatBubbleImageElement as Constructor<ChatBubbleImage> & T
}

/** typing 인디케이터·이미지·메시지 슬롯을 순서대로 조립하는 채팅 버블 셸. */
export const renderChatBubbleShell = (
  typing: boolean,
  src: string,
  message: unknown,
  typingColor?: string,
) => html`
  ${renderChatTypingIndicator(typing, typingColor)} ${renderChatBubbleImage(src, typing)}
  ${typing || src ? nothing : message}
`
