import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import { surfaceBaseStyles } from '@/components/common/surface/surface.styles'
import { emit } from '@/utils'

import '@/components/common'

export type ChatFeedbackValue = 'bad' | 'neutral' | 'good'

const RATINGS: { value: ChatFeedbackValue; label: string }[] = [
  { value: 'bad', label: '나쁨' },
  { value: 'neutral', label: '보통' },
  { value: 'good', label: '좋음' },
]

/**
 * 대화 전체에 대한 평가 바. 메시지마다 반응을 두지 않고 입력창 위에 한 번만 묻는다.
 * 평가를 고르면 value와 함께 change를 발행하고 감사 문구로 바뀐다.
 * 소비자가 dismiss를 구독할 때만 닫기 버튼을 노출한다.
 */
@customElement('mm-chat-feedback')
export class ChatFeedback extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      --surface-border-radius: var(--radius-large);

      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-4);
    }

    :host([hidden]) {
      display: none;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-2);
    }

    mm-button {
      --button-min-width: 3rem;
    }
  `
  @property({ type: String }) question = ''
  @state() private value: ChatFeedbackValue | null = null
  @state() private dismissible = false
  private dismissListenerCount = 0

  render() {
    return html`
      <mm-text>${this.renderMessage()}</mm-text>
      <div class="actions">${this.renderRatings()} ${this.renderDismissButton()}</div>
    `
  }

  private renderMessage() {
    if (this.value) return '의견을 보내 주셔서 감사합니다.'

    return this.question
  }

  private renderRatings() {
    if (this.value) return nothing

    return html`
      <mm-button-group role="group" aria-label="평가">
        ${RATINGS.map(
          ({ value, label }) => html`
            <mm-button
              variant="tertiary"
              size="small"
              @click=${() => this.handleRatingClick(value)}
            >
              ${label}
            </mm-button>
          `,
        )}
      </mm-button-group>
    `
  }

  private renderDismissButton() {
    if (!this.dismissible) return nothing

    return html`
      <mm-icon-button
        variant="secondary"
        size="small"
        icon=${ICON_NAMES.DISMISS}
        aria-label="닫기"
        @click=${this.handleDismissClick}
      ></mm-icon-button>
    `
  }

  // 소비자가 dismiss를 구독할 때만 닫기 버튼을 노출한다.
  override addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(type, listener, options)

    if (type !== 'dismiss') return
    this.dismissListenerCount += 1
    this.dismissible = true
  }

  override removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void {
    super.removeEventListener(type, listener, options)

    if (type !== 'dismiss') return
    this.dismissListenerCount = Math.max(0, this.dismissListenerCount - 1)
    this.dismissible = this.dismissListenerCount > 0
  }

  private handleRatingClick(value: ChatFeedbackValue) {
    this.value = value
    emit(this, 'change', { value })
  }

  private handleDismissClick() {
    this.hidden = true
    emit(this, 'dismiss')
  }
}
