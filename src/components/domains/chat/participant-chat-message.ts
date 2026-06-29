import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

import { renderChatMessageTime } from './chat.helpers'

import '@/components/avatar/avatar'
import '@/components/text/text'

@customElement('mm-participant-chat-message')
export class ParticipantChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }

      .message {
        display: grid;
        grid-template-columns: var(--size-medium) minmax(0, 1fr);
        align-items: start;
        gap: var(--space-1) var(--space-2);
      }

      mm-avatar {
        grid-row: 1 / span 2;
      }

      .bubbles {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-2);
        min-width: 0;
      }
    `,
  ]

  @property({ type: String }) name = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <div class="message">
        <mm-avatar
          size="medium"
          variant="tertiary"
          src=${ifDefined(this.avatarSrc || undefined)}
        ></mm-avatar>
        ${this.name || this.datetime
          ? html`
              <mm-flex gap="1">
                ${this.renderName()} ${renderChatMessageTime(this.datetime)}
              </mm-flex>
            `
          : nothing}
        <div class="bubbles">
          <slot></slot>
        </div>
      </div>
    `
  }

  private renderName() {
    if (!this.name) return nothing

    return html`
      <mm-text class="name" size="12">${this.name}</mm-text>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-participant-chat-message': ParticipantChatMessage
  }
}
