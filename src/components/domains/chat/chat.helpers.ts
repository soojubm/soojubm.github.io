import { html, nothing } from 'lit'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'

import '@/components/icon-button/icon-button'
import '@/components/text/text'
import '@/components/thumbnail/thumbnail'

export const isChatBubbleImage = (src: string, typing: boolean) => !!src && !typing

export const renderChatMessageTime = (datetime: string) => {
  if (!datetime) return nothing

  return html`
    <mm-text class="time" as="time" size="12" weight="medium">${datetime}</mm-text>
  `
}

export const renderChatMessageFailedActions = (failed: boolean, onRetry: () => void) => {
  if (!failed) return nothing

  return html`
    <div class="failed-row">
      <mm-text class="failed-status" size="12" role="alert">전송 실패</mm-text>
      <mm-icon-button
        size="small"
        variant="ghost"
        icon=${ICON_NAMES.RETRY}
        aria-label="재전송"
        @click=${onRetry}
      ></mm-icon-button>
    </div>
  `
}

export const renderChatTypingIndicator = (typing: boolean) => {
  if (!typing) return nothing

  return html`
    <div class="typing">
      <span></span>
      <span></span>
      <span></span>
    </div>
  `
}

export const renderChatBubbleImage = (src: string, typing: boolean) => {
  if (!isChatBubbleImage(src, typing)) return nothing

  return html`
    <mm-thumbnail src=${src} alt="" ratio="4:3"></mm-thumbnail>
  `
}
