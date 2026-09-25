import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import type { Textarea } from '@/components/common'

import '@/components/common'
import { emit } from '@/utils'

@customElement('mm-comment-input')
export class CommentInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `
  @property({ type: String }) name = 'comment'
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '댓글 게시'
  @query('mm-textarea') private textarea!: Textarea

  render() {
    return html`
      <form @submit=${this.handleCommentSubmit}>
        <mm-textarea
          name=${this.name}
          placeholder=${this.placeholder}
          @keydown=${this.handleTextareaKeydown}
        >
          <mm-button slot="trailing" variant="primary" @click=${this.handleCommentSubmit}>
            ${this.submitLabel}
          </mm-button>
        </mm-textarea>
      </form>
    `
  }

  private handleCommentSubmit(event?: Event) {
    event?.preventDefault()

    emit(this, 'submit', {
      value: this.textarea?.value ?? '',
    })
  }

  private handleTextareaKeydown(event: KeyboardEvent) {
    // 슬롯에 둔 버튼의 키 입력도 mm-textarea를 거쳐 올라오므로 입력 영역에서 온 것만 받는다.
    if (event.target !== event.currentTarget) return
    if (event.isComposing) return
    if (event.key !== 'Enter' || event.shiftKey) return

    event.preventDefault()
    this.handleCommentSubmit()
  }
}
