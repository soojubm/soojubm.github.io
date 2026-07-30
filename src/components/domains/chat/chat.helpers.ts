import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import '@/components/common/icon-button/icon-button'
import '@/components/common/text/text'
import '@/components/common/thumbnail/thumbnail'
import '@/components/common/spinner/semantics/typing-indicator'
import { type Constructor } from '@/utils'

const isChatBubbleImage = (src: string, typing: boolean) => !!src && !typing

export const renderChatMessageTime = (datetime: string) => {
  if (!datetime) return nothing

  return html`
    <mm-text as="time" size="12">${datetime}</mm-text>
  `
}

export const renderChatMessageFailedActions = (failed: boolean, onRetry: () => void) => {
  if (!failed) return nothing

  return html`
    <span class="failed-actions">
      <mm-text size="12" color="danger" role="alert">전송 실패</mm-text>
      <mm-icon-button
        size="small"
        variant="ghost"
        icon=${ICON_NAMES.RETRY}
        aria-label="재전송"
        @click=${onRetry}
      ></mm-icon-button>
    </span>
  `
}

const renderChatBubbleImage = (src: string, typing: boolean) => {
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

/**
 * typing 인디케이터·이미지·메시지를 순서대로 조립하는 채팅 버블 셸.
 * 상태는 호스트가 이미 갖고 있으므로 호스트를 그대로 받고, 버블마다 다른 메시지 조각만 따로 받는다.
 * 인디케이터 색은 버블의 color를 그대로 물려받는다.
 */
export const renderChatBubbleShell = (host: ChatBubbleImage, message: unknown) => html`
  ${host.typing
    ? html`
        <mm-typing-indicator></mm-typing-indicator>
      `
    : nothing}
  ${renderChatBubbleImage(host.src, host.typing)} ${host.typing || host.src ? nothing : message}
`
