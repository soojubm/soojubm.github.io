import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { resetStyles } from '@/stylesheets/shared/reset.styles'

import { renderChatMessageTime } from './chat.helpers'

import '@/components/avatar/avatar'
import '@/components/flex/flex'
import '@/components/text/text'

@customElement('mm-participant-chat-message')
export class ParticipantChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-1) var(--space-2);
      }
    `,
  ]

  @property({ type: String }) name = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <mm-avatar
        size="32"
        variant="tertiary"
        src=${ifDefined(this.avatarSrc || undefined)}
      ></mm-avatar>
      <mm-flex direction="column" gap="1">
        ${this.renderMeta()}
        <mm-flex direction="column" gap="2" align-items="start">
          <slot></slot>
        </mm-flex>
      </mm-flex>
    `
  }

  private renderMeta() {
    if (!this.name && !this.datetime) return nothing

    return html`
      <mm-flex gap="1">
        <mm-text class="name" size="12">${this.name}</mm-text>
        ${renderChatMessageTime(this.datetime)}
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-participant-chat-message': ParticipantChatMessage
  }
}
