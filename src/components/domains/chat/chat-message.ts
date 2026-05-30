import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { resetStyles } from '../../shared/reset.styles'

@customElement('mm-chat-message')
export class ChatMessage extends LitElement {
  /** 내가 보낸 메시지 그룹 */
  @property({ type: Boolean, reflect: true }) mine = false
  /** 발신자 이름 (상대방만 표시) */
  @property({ type: String }) username = ''
  /** 발신자 아바타 이미지 */
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''

  static styles = [
    resetStyles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        padding-left: calc(var(--size-medium) + var(--space-2));
        position: relative;
        box-sizing: border-box;
      }

      :host([mine]) {
        padding-left: 0;
        padding-right: calc(var(--size-medium) + var(--space-2));
        align-items: flex-end;
      }

      .avatar {
        position: absolute;
        left: 0;
        top: 0;
      }

      :host([mine]) .avatar {
        display: none;
      }

      .username {
        font-size: var(--font-size-12);
        color: var(--color-foreground-light);
        margin: 0;
      }

      :host([mine]) .username {
        display: none;
      }
    `,
  ]

  render() {
    return html`
      <mm-avatar
        class="avatar"
        size="medium"
        src=${this.avatarSrc || ''}
      ></mm-avatar>
      ${this.username && !this.mine
        ? html`<span class="username">${this.username}</span>`
        : nothing}
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-chat-message': ChatMessage
  }
}
