import { LitElement, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'
import { type Constructor } from '@/utils'

export interface ChatImage {
  src: string
  /** 대화 속 이미지는 내용이므로 무엇이 담겼는지 설명한다. */
  alt: string
}

const isChatBubbleImage = (images: ChatImage[], typing: boolean) => images.length > 0 && !typing

const chatTimeFormat = new Intl.DateTimeFormat('ko-KR', { hour: 'numeric', minute: '2-digit' })
const chatDateFormat = new Intl.DateTimeFormat('ko-KR', { dateStyle: 'long' })

/** 날짜만 있는 값(2022-05-17)은 UTC가 아니라 로컬 자정으로 읽는다. */
const parseChatDatetime = (datetime: string) =>
  new Date(datetime.length === 10 ? `${datetime}T00:00` : datetime)

/** 기계가 읽는 ISO 값을 화면용 문구로 바꾼다. 읽을 수 없는 값은 그대로 보인다. */
const formatChatDatetime = (datetime: string, format: Intl.DateTimeFormat) => {
  const date = parseChatDatetime(datetime)
  if (Number.isNaN(date.getTime())) return datetime

  return format.format(date)
}

export const renderChatMessageTime = (datetime: string) => {
  if (!datetime) return nothing

  return html`
    <mm-text size="12">
      <time datetime=${datetime}>${formatChatDatetime(datetime, chatTimeFormat)}</time>
    </mm-text>
  `
}

export const renderChatDate = (datetime: string) => {
  if (!datetime) return nothing

  return html`
    <time datetime=${datetime}>${formatChatDatetime(datetime, chatDateFormat)}</time>
  `
}

const renderChatBubbleImages = (images: ChatImage[], typing: boolean) => {
  if (!isChatBubbleImage(images, typing)) return nothing

  return html`
    <mm-grid columns=${images.length === 1 ? 1 : 2} column-min-width="6rem" gap="1">
      ${images.map(
        ({ src, alt }) => html`
          <mm-thumbnail src=${src} alt=${alt} ratio="4:3"></mm-thumbnail>
        `,
      )}
    </mm-grid>
  `
}

export interface ChatBubbleImage {
  typing: boolean
  images: ChatImage[]
}

/** ai/participant/my-chat-bubble이 공유하는 typing/images 상태와 image attribute 동기화. */
export const withChatBubbleImage = <T extends Constructor<LitElement>>(Base: T) => {
  class ChatBubbleImageElement extends Base {
    @property({ type: Boolean, reflect: true }) typing = false
    @property({ attribute: false }) images: ChatImage[] = []

    protected willUpdate() {
      this.toggleAttribute('image', isChatBubbleImage(this.images, this.typing))
    }
  }

  return ChatBubbleImageElement as Constructor<ChatBubbleImage> & T
}

/**
 * typing 인디케이터·이미지·메시지를 순서대로 조립하는 채팅 버블 셸.
 * 상태는 컴포넌트가 이미 갖고 있으므로 이를 그대로 받고, 버블마다 다른 메시지 조각만 따로 받는다.
 * 인디케이터 색은 버블의 color를 그대로 물려받는다.
 */
export const renderChatBubbleShell = (host: ChatBubbleImage, message: unknown) => html`
  ${host.typing
    ? html`
        <mm-typing-indicator></mm-typing-indicator>
      `
    : nothing}
  ${renderChatBubbleImages(host.images, host.typing)}
  ${host.typing || host.images.length ? nothing : message}
`
