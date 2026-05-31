import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import '../../button'
import '../prompt-input/prompt-input-textarea'
import '../textfield-action-bar'

@customElement('mm-comment-input')
export class CommentInput extends LitElement {
  @property({ type: String }) name = 'comment'
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '댓글 게시'

  static styles = css`
    :host {
      display: block;
    }

    form {
      position: relative;
      margin: 0;
    }

    .comment-input-field {
      position: relative;
      border: 1px solid var(--color-border, #e4e4e7);
      border-radius: 12px;
      padding: 12px;
      padding-bottom: calc(var(--size-medium) + var(--space-4));
      background-color: var(--color-background);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
      transition: border-color 0.2s, box-shadow 0.2s;
    }

    .comment-input-field:focus-within {
      border-color: var(--color-foreground, #09090b);
      box-shadow: 0 0 0 1px var(--color-foreground, #09090b);
    }

    mm-prompt-input-textarea {
      --prompt-textarea-min-height: 96px;
    }

    mm-textfield-action-bar {
      position: absolute;
      right: 12px;
      bottom: 12px;
    }
  `

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
        <div class="comment-input-field">
          <mm-prompt-input-textarea
            name=${this.name}
            placeholder=${this.placeholder}
          ></mm-prompt-input-textarea>
          <mm-textfield-action-bar>
            <mm-button variant="primary" @click=${this._submitComment}>${this.submitLabel}</mm-button>
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
