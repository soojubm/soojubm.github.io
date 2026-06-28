import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'
import '@/components/text/text'
import '@/components/flex/flex'

@customElement('mm-my-chat-message')
export class MyChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
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
      <mm-flex direction="column" gap="2" align-items="end">
        <slot></slot>
        ${this.renderTime()}
      </mm-flex>
    `
  }

  private renderTime() {
    if (!this.datetime) return nothing

    return html`
      <mm-text class="time" as="time" size="12" weight="medium">${this.datetime}</mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-my-chat-message': MyChatMessage
  }
}
