import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/text'

@customElement('mm-my-chat-message')
export class MyChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        align-items: flex-end;
      }

      .time {
        color: var(--color-foreground-light);
      }

      ::slotted(mm-my-chat-bubble) {
        align-self: flex-end;
        justify-content: flex-end;
      }
    `,
  ]

  @property({ type: String }) datetime = ''

  render() {
    return html`
      <slot></slot>
      ${this.datetime
        ? html`
            <mm-text class="time" as="time" size="12" weight="medium">${this.datetime}</mm-text>
          `
        : nothing}
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-message': MyChatMessage
  }
}
