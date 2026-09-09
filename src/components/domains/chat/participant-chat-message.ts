import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { resetStyles } from '@/stylesheets/shared.styles'

import { renderChatMessageTime } from './chat.helpers'

import '@/components/common/avatar/avatar'
import '@/components/common/text/text'

@customElement('mm-participant-chat-message')
export class ParticipantChatMessage extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        gap: var(--space-1) var(--space-2);
      }

      .body {
        display: flex;
        flex-direction: column;
        gap: var(--space-1);
      }

      .bubbles {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: var(--space-2);
      }

      .meta {
        display: flex;
        gap: var(--space-1);
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
      <div class="body">
        ${this.renderMeta()}
        <div class="bubbles">
          <slot></slot>
        </div>
      </div>
    `
  }

  private renderMeta() {
    if (!this.name && !this.datetime) return nothing

    return html`
      <div class="meta">
        <mm-text class="name" size="12">${this.name}</mm-text>
        ${renderChatMessageTime(this.datetime)}
      </div>
    `
  }
}
