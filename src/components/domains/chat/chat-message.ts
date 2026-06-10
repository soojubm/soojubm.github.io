import { LitElement, css, html, nothing } from 'lit'
import { property } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../../text/text'

export class ChatMessageBase extends LitElement {
  /** 메시지 시간 */
  @property({ type: String }) time = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
      }

      .time {
        color: var(--color-foreground-light);
      }
    `,
  ]

  protected renderMessage() {
    return html`
      <slot></slot>
      ${this.time
        ? html` <mm-text class="time" as="time" size="12" weight="medium">${this.time}</mm-text> `
        : nothing}
    `
  }

  render() {
    return this.renderMessage()
  }
}
