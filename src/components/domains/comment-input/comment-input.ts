import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import '../../button'
import { inputStyles } from '../../input/input.styles'
import '../../input/textarea'
import { Textarea } from '../../input/textarea'
import '../textfield-action-bar'

@customElement('mm-comment-input')
export class CommentInput extends LitElement {
  @property({ type: String }) name = 'comment'
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '댓글 게시'

  @query('mm-textarea') private _textarea!: Textarea

  static styles = [
    inputStyles,
    css`
      :host {
        display: block;
      }

      .textfield-control {
        flex-direction: column;
        align-items: stretch;
        padding-block: var(--input-padding-block);
      }
    `,
  ]

  private _submitComment(event?: Event) {
    event?.preventDefault()

    this.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        composed: true,
        detail: {
          value: this._textarea?.value ?? '',
        },
      }),
    )
  }

  private _handleTextareaKeydown(event: KeyboardEvent) {
    if (event.isComposing) return
    if (event.key !== 'Enter' || event.shiftKey) return

    event.preventDefault()
    this._submitComment()
  }

  render() {
    return html`
      <form @submit=${this._submitComment}>
        <mm-textarea
          name=${this.name}
          placeholder=${this.placeholder}
          @keydown=${this._handleTextareaKeydown}
        ></mm-textarea>
        <mm-textfield-action-bar>
          <mm-button variant="primary" @click=${this._submitComment}>${this.submitLabel}</mm-button>
        </mm-textfield-action-bar>
      </form>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-comment-input': CommentInput
  }
}
