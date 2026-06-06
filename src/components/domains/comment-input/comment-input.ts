import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import '../../button'
import '../prompt-input/prompt-input'
import { PromptInputTextarea } from '../prompt-input/prompt-input-textarea'
import '../textfield-action-bar'

@customElement('mm-comment-input')
export class CommentInput extends LitElement {
  @property({ type: String }) name = 'comment'
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '댓글 게시'

  @query('mm-prompt-input-textarea') private _textarea!: PromptInputTextarea

  static styles = css`
    :host {
      display: block;
    }
  `

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

  render() {
    return html`
      <form @submit=${this._submitComment}>
        <mm-prompt-input @submit=${this._submitComment}>
          <mm-prompt-input-textarea name=${this.name} placeholder=${this.placeholder}></mm-prompt-input-textarea>
          <mm-textfield-action-bar>
            <mm-button variant="primary" @click=${this._submitComment}
              >${this.submitLabel}</mm-button
            >
          </mm-textfield-action-bar>
        </mm-prompt-input>
      </form>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-comment-input': CommentInput
  }
}
