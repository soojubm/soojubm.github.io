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
        display: grid;
        grid-template-columns: var(--size-medium) minmax(0, 1fr);
        align-items: start;
        gap: var(--space-1) var(--space-2);
      }

      mm-avatar {
        grid-row: 1 / span 2;
      }

      mm-flex {
        min-width: 0;
      }
    `,
  ]

  @property({ type: String }) name = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <mm-avatar
        size="40"
        variant="tertiary"
        src=${ifDefined(this.avatarSrc || undefined)}
      ></mm-avatar>
      ${this.renderMeta()}
      <mm-flex direction="column" gap="2" align-items="start">
        <slot></slot>
      </mm-flex>
    `
  }

  private renderMeta() {
    if (!this.name && !this.datetime) return nothing

    return html`
      <mm-flex gap="1">${this.renderName()} ${renderChatMessageTime(this.datetime)}</mm-flex>
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
