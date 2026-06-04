import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../button'
import '../prompt-input/prompt-input-textarea'
import '../textfield-action-bar'
import { textfieldStyles } from '../../input/semantics/textfield.styles'

@customElement('mm-comment-input')
export class CommentInput extends LitElement {
  @property({ type: String }) name = 'comment'
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '댓글 게시'

  static styles = [
    textfieldStyles,
    css`
      .textfield-control {
        flex-direction: column;
        align-items: stretch;
      }
    `,
  ]

  private _submitComment(event?: Event) {
    event?.preventDefault()

    const textarea = this.renderRoot.querySelector('mm-prompt-input-textarea') as HTMLElement & {
      value?: string
    }

    this.dispatchEvent(
      new CustomEvent('submit', {
        bubbles: true,
        composed: true,
        detail: {
          value: textarea?.value ?? '',
        },
      }),
    )
  }

  render() {
    return html`
      <form @submit=${this._submitComment} @prompt-textarea-submit=${this._submitComment}>
        <div class="textfield-control">
          <mm-prompt-input-textarea
            name=${this.name}
            placeholder=${this.placeholder}
          ></mm-prompt-input-textarea>

          <mm-textfield-action-bar>
            <mm-button variant="primary" @click=${this._submitComment}
              >${this.submitLabel}</mm-button
            >
          </mm-textfield-action-bar>
        </div>
      </form>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-comment-input': CommentInput
  }
}
