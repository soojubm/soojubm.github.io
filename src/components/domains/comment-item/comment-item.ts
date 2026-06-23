import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import '../../button/button'
import '../../icon-button/semantics/more-button'
import '../../menuitem/semantics/menu-item-action'

/**
 * 댓글 목록의 개별 항목.
 * 작성자(아바타·이름·시간), 본문(기본 슬롯), 답글 버튼, 수정/삭제 메뉴로 구성됩니다.
 * 대댓글은 slot="replies"에 중첩된 mm-comment-item을 배치합니다.
 */
@customElement('mm-comment-item')
export class CommentItem extends LitElement {
  private readonly _menuId = `comment-menu-${crypto.randomUUID()}`
  @property({ type: String }) author = ''
  @property({ type: String }) datetime = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  /** 답글 버튼 레이블. 비우면 버튼을 숨깁니다. (예: "답글 10개") */
  @property({ type: String, attribute: 'reply-label' }) replyLabel = ''
  /** 수정/삭제 메뉴 노출 여부 (작성자 본인) */
  @property({ type: Boolean }) editable = false

  @state() private _menuOpen = false
  @state() private _hasReplies = false

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

      --button-color: transparent;
      --button-padding-inline: 0;
      --button-text-color: var(--comment-item-reply-color);
    }

    .replies {
      margin: 1rem 0 0;
      padding-left: 1rem;
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

  private _emit(type: string) {
    this.dispatchEvent(new CustomEvent(type, { bubbles: true, composed: true }))
  }

  private _toggleMenu() {
    this._menuOpen = !this._menuOpen
  }

  private _onMenuAction(type: 'edit' | 'delete') {
    this._menuOpen = false
    this._emit(type)
  }

  private _onRepliesSlotChange(event: Event) {
    const slot = event.target as HTMLSlotElement
    this._hasReplies = slot.assignedElements().length > 0
  }

  render() {
    return html`
      <article class="item">
        <mm-user-row label=${this.author} description=${this.datetime} avatar-src=${this.avatarSrc}>
          ${this.editable
            ? html`
                <mm-more-button
                  slot="trailing"
                  aria-label="댓글 메뉴"
                  .ariaControls=${this._menuId}
                  .ariaExpanded=${String(this._menuOpen)}
                  @click=${this._toggleMenu}
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
                @click=${() => this._emit('reply')}
              >
                ${this.replyLabel}
              </mm-button>
            `
          : ''}
        ${this.editable
          ? html`
              <menu id=${this._menuId} class="menu" data-open=${this._menuOpen ? 'true' : 'false'}>
                <mm-menu-item-action
                  label="수정"
                  @click=${() => this._onMenuAction('edit')}
                ></mm-menu-item-action>
                <mm-menu-item-action
                  label="삭제"
                  tone="danger"
                  @click=${() => this._onMenuAction('delete')}
                ></mm-menu-item-action>
              </menu>
            `
          : ''}

        <div class="replies" ?hidden=${!this._hasReplies}>
          <slot name="replies" @slotchange=${this._onRepliesSlotChange}></slot>
        </div>
      </article>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-comment-item': CommentItem
  }
}
