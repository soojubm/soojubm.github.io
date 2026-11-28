import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { renderChatMessageTime } from '@/components/domains/chat/chat.helpers'

import '@/components/common'

@customElement('fff-participant-chat-message')
export class ParticipantChatMessage extends LitElement {
  static styles = css`
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
  `
  @property({ type: String }) name = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String }) datetime = ''

  render() {
    return html`
      <fff-user-avatar
        size="32"
        name=${this.name}
        src=${ifDefined(this.avatarSrc || undefined)}
      ></fff-user-avatar>
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
        <fff-text class="name" size="12">${this.name}</fff-text>
        ${renderChatMessageTime(this.datetime)}
      </div>
    `
  }
}
