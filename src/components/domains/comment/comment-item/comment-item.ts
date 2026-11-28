import { LitElement, css, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import type { MoreMenuAction } from '@/components/overlay/popover/semantics/more-menu'

import '@/components/common'
import '@/components/overlay/popover/semantics/more-menu'
import { emit } from '@/utils'
import '@/components/common/list-item/domain/user-item'

const MENU_ACTIONS: MoreMenuAction[] = [
  { value: 'edit', label: '수정' },
  { value: 'delete', label: '삭제', destructive: true },
]

@customElement('fff-comment-item')
export class CommentItem extends LitElement {
  static styles = css`
    :host {
      display: block;
      --comment-item-gap: var(--space-2);
      position: relative;
    }

    article {
      display: flex;
      flex-direction: column;
      gap: var(--comment-item-gap);
      position: relative;
    }

    fff-button {
      align-self: flex-start;
    }

    slot[name='replies']::slotted(*) {
      margin: var(--space-4) 0 0;
      padding-left: var(--space-4);
      box-shadow: inset 2px 0 0 var(--border-color);
      position: relative;
    }
  `
  @property({ type: String }) author = ''
  @property({ type: String }) datetime = ''
  @property({ attribute: false }) avatar?: { src?: string }
  @property({ type: String, attribute: 'reply-label' }) replyLabel = ''
  @property({ type: Boolean }) editable = false

  render() {
    return html`
      <article>
        <fff-user-item
          size="medium"
          label=${this.author}
          description=${this.datetime}
          .avatar=${this.avatar}
        >
          ${this.renderMenu()}
        </fff-user-item>

        <slot></slot>

        ${this.renderReplyButton()}

        <slot name="replies"></slot>
      </article>
    `
  }

  private renderReplyButton() {
    if (!this.replyLabel) return nothing

    return html`
      <fff-button variant="tertiary" @click=${() => this.emitAction('reply')}>
        ${this.replyLabel}
      </fff-button>
    `
  }

  private renderMenu() {
    if (!this.editable) return nothing

    return html`
      <fff-more-menu
        slot="trailing"
        aria-label="댓글 메뉴"
        .actions=${MENU_ACTIONS}
        @action=${this.handleMenuAction}
      ></fff-more-menu>
    `
  }

  private emitAction(type: string) {
    emit(this, type)
  }

  // 메뉴의 action은 여기서 끊고, 댓글 단위의 edit·delete로 다시 알린다.
  private handleMenuAction(event: CustomEvent<{ value: string }>) {
    event.stopPropagation()
    this.emitAction(event.detail.value)
  }
}
