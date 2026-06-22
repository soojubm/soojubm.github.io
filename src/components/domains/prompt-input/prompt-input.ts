import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import '../../icon-button/icon-button'
import { inputStyles } from '../../input/input.styles'
import { Textarea } from '../../input/textarea'
import './attachment-dropdown'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
  @property({ type: String, reflect: true }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = 'Ask me anything...'
  @property({ type: String }) model = 'claude-sonnet'
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '전송'
  @property({ type: Boolean, attribute: 'is-loading', reflect: true }) isLoading = false
  @property({ type: Boolean, attribute: 'hidden-attachment' }) hiddenAttachment = false

  @query('mm-textarea') private _textarea?: Textarea

  @state() private _isSingleLine = true

  static styles = [
    inputStyles,
    css`
      :host {
        display: block;
        padding-inline: var(--space-2);
        background: var(--input-background-color);
        border-radius: var(--radius);
      }

      .chat-input {
        display: grid;
        grid-template-areas:
          'textarea textarea textarea'
          'actions actions actions';
        grid-template-columns: auto minmax(0, 1fr) auto;
        align-items: center;
      }

      .chat-input.is-single-line {
        grid-template-areas: 'attach textarea submit';
        grid-template-rows: var(--input-height);
      }

      .chat-input.is-single-line .start-actions,
      .chat-input.is-single-line .end-actions {
        align-self: center;
      }

      mm-textarea {
        grid-area: textarea;
        --input-color-border-hover: transparent;
        --input-focus-shadow: none;
      }

      .actions {
        display: flex;
        grid-area: actions;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-2);
        min-width: 0;
      }

      .chat-input.is-single-line .actions {
        display: contents;
      }

      .start-actions {
        display: flex;
        grid-area: attach;
        align-items: center;
        gap: var(--space-1);
        min-width: 0;
      }

      .end-actions {
        display: flex;
        grid-area: submit;
        align-items: center;
        gap: var(--space-1);
        justify-self: end;
      }
    `,
  ]

  protected firstUpdated() {
    this._syncSingleLineState()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this._syncTextareaValue()
      this._queueSingleLineSync()
    }
  }

  private _syncTextareaValue() {
    if (!this._textarea || this._textarea.value === this.value) return
    this._textarea.value = this.value
  }

  private _handleTextareaInput(e: CustomEvent<{ value: string }>) {
    this.value = e.detail.value
    this._queueSingleLineSync()
    this.dispatchEvent(
      new CustomEvent('value-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _queueSingleLineSync() {
    window.requestAnimationFrame(() => {
      this._syncSingleLineState()
    })
  }

  private _syncSingleLineState() {
    if (!this._textarea) return

    this._textarea.resizeToContent()
    this._isSingleLine = this._textarea.isSingleLine
  }

  private _handleTextareaKeydown(e: KeyboardEvent) {
    if (e.isComposing) return
    if (e.key !== 'Enter' || e.shiftKey) return

    e.preventDefault()
    this._submit()
  }

  private _submit() {
    if (!this.isLoading && this.value.trim()) {
      this.dispatchEvent(
        new CustomEvent('submit', {
          detail: { value: this.value, model: this.model },
          bubbles: true,
          composed: true,
        }),
      )
    }
  }

  render() {
    return html`
      <form>
        <div class=${this._isSingleLine ? 'chat-input is-single-line' : 'chat-input'}>
          <mm-textarea
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            .rows=${1}
            ?disabled=${this.isLoading}
            @input=${this._handleTextareaInput}
            @keydown=${this._handleTextareaKeydown}
          ></mm-textarea>
          <div class="actions">
            <div class="start-actions">
              ${this.hiddenAttachment
                ? ''
                : html`
                    <mm-attachment-dropdown></mm-attachment-dropdown>
                  `}
              <slot name="leading-actions"></slot>
              <!-- <mm-model-selector></mm-model-selector> -->
            </div>
            <div class="end-actions">
              <slot name="trailing-actions"></slot>
              <mm-icon-button
                variant="primary"
                icon="send-diagonal"
                aria-label=${this.submitLabel}
                ?disabled=${this.isLoading}
                @click=${this._submit}
              ></mm-icon-button>
            </div>
          </div>
        </div>
      </form>
    `
  }
}
