import { html, nothing } from 'lit'

import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'

import '@/components/icon-button/icon-button'
import '@/components/text/text'
import '@/components/thumbnail/thumbnail'
import '@/components/spinner/semantics/typing-indicator'

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
  color = 'var(--color-foreground-light)',
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
