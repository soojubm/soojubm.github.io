import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import {
  surfaceBaseStyles,
  surfaceElevatedStyles,
} from '@/components/common/surface/surface.styles'
import { EventSubscriptionController } from '@/controllers/event-subscription-controller'
import { emit } from '@/utils'

import '@/components/common'

export type ChatFeedbackValue = 'bad' | 'neutral' | 'good'

const RATINGS: { value: ChatFeedbackValue; label: string }[] = [
  { value: 'bad', label: '나쁨' },
  { value: 'neutral', label: '보통' },
  { value: 'good', label: '좋음' },
]

@customElement('mm-chat-feedback')
export class ChatFeedback extends LitElement {
  static styles = css`
    :host {
      ${surfaceBaseStyles};
      ${surfaceElevatedStyles};

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
  `
  @property({ type: String }) question = ''
  @state() private value: ChatFeedbackValue | null = null
  private readonly dismissSubscription = new EventSubscriptionController(this, 'dismiss')

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
    if (!this.dismissSubscription.subscribed) return nothing

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

  private handleRatingClick(value: ChatFeedbackValue) {
    this.value = value
    emit(this, 'change', { value })
  }

  private handleDismissClick() {
    this.hidden = true
    emit(this, 'dismiss')
  }
}
