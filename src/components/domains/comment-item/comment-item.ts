import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import type Popover from '@/components/popover/popover'

import '@/components/button/button'
import '@/components/icon-button/semantics/more-button'
import '@/components/menuitem/semantics/menu-item-action'
import '@/components/popover/popover'
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

    article {
      display: flex;
      flex-direction: column;
      gap: var(--comment-item-gap);
      position: relative;
    }

    mm-button {
      align-self: flex-start;

      --button-background-color: transparent;
      --button-padding-inline: 0;
      --button-text-color: var(--comment-item-reply-color);
    }

    slot[name='replies']::slotted(*) {
      margin: var(--space-4) 0 0;
      padding-left: var(--space-4);
      box-shadow: inset 2px 0 0 var(--color-border);
      position: relative;
    }

    mm-popover {
      width: var(--comment-item-menu-width);
      right: 40px;
      top: 0;
    }

    mm-menu-item-action {
      width: 100%;
    }
  `

  private readonly menuId = uniqueId('comment-menu')
  @property({ type: String }) author = ''
  @property({ type: String }) datetime = ''
  @property({ type: String, attribute: 'avatar-src' }) avatarSrc = ''
  @property({ type: String, attribute: 'reply-label' }) replyLabel = ''
  @property({ type: Boolean }) editable = false

  @query('mm-popover') private menu?: Popover

  render() {
    return html`
      <article>
        <mm-user-row label=${this.author} description=${this.datetime} avatar-src=${this.avatarSrc}>
          ${this.renderMenuTrigger()}
        </mm-user-row>

        <slot></slot>

        ${this.renderReplyButton()} ${this.renderMenu()}

        <slot name="replies"></slot>
      </article>
    `
  }

  private renderMenuTrigger() {
    if (!this.editable) return nothing

    return html`
      <mm-more-button
        slot="trailing"
        aria-label="댓글 메뉴"
        aria-controls=${this.menuId}
        @click=${() => this.menu?.toggle()}
      ></mm-more-button>
    `
  }

  private renderReplyButton() {
    if (!this.replyLabel) return nothing

    return html`
      <mm-button variant="ghost" size="small" @click=${() => this.emitAction('reply')}>
        ${this.replyLabel}
      </mm-button>
    `
  }

  private renderMenu() {
    if (!this.editable) return nothing

    return html`
      <mm-popover id=${this.menuId} role="menu">
        <mm-menu-item-action
          label="수정"
          @click=${() => this.onMenuAction('edit')}
        ></mm-menu-item-action>
        <mm-menu-item-action
          label="삭제"
          tone="danger"
          @click=${() => this.onMenuAction('delete')}
        ></mm-menu-item-action>
      </mm-popover>
    `
  }

  private emitAction(type: string) {
    emit(this, type)
  }

  private onMenuAction(type: 'edit' | 'delete') {
    this.menu?.close()
    this.emitAction(type)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-comment-item': CommentItem
  }
}
