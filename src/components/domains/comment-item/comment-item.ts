import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import '@/components/button/button'
import '@/components/icon-button/semantics/more-button'
import '@/components/menuitem/semantics/menu-item-action'
import { emit } from '@/utils/emit'
import { uniqueId } from '@/utils/unique-id'

/**
 * 댓글 목록의 개별 항목.
 * 작성자(아바타·이름·시간), 본문(기본 슬롯), 답글 버튼, 수정/삭제 메뉴로 구성됩니다.
 * 대댓글은 slot="replies"에 중첩된 mm-comment-item을 배치합니다.
 */
@customElement('mm-comment-item')
export class CommentItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      --comment-item-gap: var(--space-2);
      --comment-item-menu-width: var(--width-tiny);
      --comment-item-reply-color: var(--color-foreground);
      position: relative;
    }

    .item {
      display: flex;
      flex-direction: column;
      gap: var(--comment-item-gap);
      position: relative;
    }

    mm-button.reply {
      align-self: flex-start;

      --button-background-color: transparent;
      --button-padding-inline: 0;
      --button-text-color: var(--comment-item-reply-color);
    }

    .replies {
      margin: var(--space-4) 0 0;
      padding-left: var(--space-4);
      position: relative;
    }

    .replies[hidden] {
      display: none;
    }

    .replies::before {
      content: '';
      display: block;
      width: 2px;
      height: 100%;
      background-color: var(--color-border);
      position: absolute;
      left: 0;
      top: 0;
    }

    .menu {
      display: none;
      width: var(--comment-item-menu-width);
      margin: 0;
      padding: 0;
      background: var(--color-background);
      border: var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      position: absolute;
      right: 40px;
      top: 0;
      z-index: var(--zindex-default);
    }

    .menu[data-open='true'] {
      display: block;
    }

    .menu mm-menu-item-action {
      width: 100%;
    }
  `

  private readonly menuId = uniqueId('comment-menu')
  @property({ type: String }) author = ''
  @property({ type: String }) datetime = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'reply-label' }) replyLabel = ''
  @property({ type: Boolean }) editable = false

  @state() private menuOpen = false
  @state() private hasReplies = false

  render() {
    return html`
      <article class="item">
        <mm-user-row label=${this.author} description=${this.datetime} avatar-src=${this.avatarSrc}>
          ${this.editable
            ? html`
                <mm-more-button
                  slot="trailing"
                  aria-label="댓글 메뉴"
                  aria-controls=${this.menuId}
                  aria-expanded=${String(this.menuOpen)}
                  @click=${this.toggleMenu}
                ></mm-more-button>
              `
            : ''}
        </mm-user-row>

        <slot></slot>

        ${this.replyLabel
          ? html`
              <mm-button
                class="reply"
                variant="ghost"
                size="small"
                @click=${() => this.emitAction('reply')}
              >
                ${this.replyLabel}
              </mm-button>
            `
          : ''}
        ${this.editable
          ? html`
              <menu id=${this.menuId} class="menu" data-open=${this.menuOpen ? 'true' : 'false'}>
                <mm-menu-item-action
                  label="수정"
                  @click=${() => this.onMenuAction('edit')}
                ></mm-menu-item-action>
                <mm-menu-item-action
                  label="삭제"
                  tone="danger"
                  @click=${() => this.onMenuAction('delete')}
                ></mm-menu-item-action>
              </menu>
            `
          : ''}

        <div class="replies" ?hidden=${!this.hasReplies}>
          <slot name="replies" @slotchange=${this.onRepliesSlotChange}></slot>
        </div>
      </article>
    `
  }

  private emitAction(type: string) {
    emit(this, type)
  }

  private toggleMenu() {
    this.menuOpen = !this.menuOpen
  }

  private onMenuAction(type: 'edit' | 'delete') {
    this.menuOpen = false
    this.emitAction(type)
  }

  private onRepliesSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this.hasReplies = slot.assignedElements().length > 0
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-comment-item': CommentItem
  }
}
