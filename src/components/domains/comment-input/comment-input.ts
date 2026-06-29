import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import '@/components/button'
import { inputStyles } from '@/components/input/input.styles'
import '@/components/input/textarea'
import { Textarea } from '@/components/input/textarea'
import '@/components/domains/textfield-action-bar'
import { emit } from '@/utils/emit'

@customElement('mm-comment-input')
export class CommentInput extends LitElement {
  static styles = [
    inputStyles,
    css`
      :host {
        display: block;
      }

      .textarea-control {
        flex-direction: column;
        align-items: stretch;
        padding-block: var(--input-padding-block);
      }
    `,
  ]

  @property({ type: String }) name = 'comment'
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '댓글 게시'

  @query('mm-textarea') private textarea!: Textarea

  render() {
    return html`
      <form @submit=${this.submitComment}>
        <mm-textarea
          name=${this.name}
          placeholder=${this.placeholder}
          @keydown=${this.handleTextareaKeydown}
        ></mm-textarea>
        <mm-textfield-action-bar>
          <mm-button variant="primary" @click=${this.submitComment}>${this.submitLabel}</mm-button>
        </mm-textfield-action-bar>
      </form>
    `
  }

  private submitComment(event?: Event) {
    event?.preventDefault()

    emit(this, 'submit', {
      value: this.textarea?.value ?? '',
    })
  }

  private handleTextareaKeydown(event: KeyboardEvent) {
    if (event.isComposing) return
    if (event.key !== 'Enter' || event.shiftKey) return

    event.preventDefault()
    this.submitComment()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-comment-input': CommentInput
  }
}
