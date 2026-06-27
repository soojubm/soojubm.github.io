import { LitElement, css, html } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import '@/components/icon-button/icon-button'
import '@/components/flex/flex'
import { inputStyles } from '@/components/input/input.styles'
import { Textarea } from '@/components/input/textarea'
import '@/components/domains/prompt-input/attachment-dropdown'
import { emit } from '@/utils/emit'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
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
        grid-area: actions;
        min-width: 0;
      }

      .start-actions {
        grid-area: attach;
        min-width: 0;
      }

      .end-actions {
        grid-area: submit;
        justify-self: end;
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = 'Ask me anything...'
  @property({ type: String }) model = 'claude-sonnet'
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '전송'
  @property({ type: Boolean, attribute: 'is-loading' }) isLoading = false
  @property({ type: Boolean, attribute: 'hidden-attachment' }) hiddenAttachment = false

  @query('mm-textarea') private textarea?: Textarea

  @state() private isSingleLine = true

  render() {
    return html`
      <form>
        <div class=${this.isSingleLine ? 'chat-input is-single-line' : 'chat-input'}>
          <mm-textarea
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            .rows=${1}
            ?disabled=${this.isLoading}
            @input=${this.handleTextareaInput}
            @keydown=${this.handleTextareaKeydown}
          ></mm-textarea>
          ${this.isSingleLine
            ? html`
                ${this.renderStartActions()} ${this.renderEndActions()}
              `
            : html`
                <mm-flex class="actions" gap="2" align-items="center" justify-content="between">
                  ${this.renderStartActions()} ${this.renderEndActions()}
                </mm-flex>
              `}
        </div>
      </form>
    `
  }

  protected firstUpdated() {
    this.syncSingleLineState()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.syncTextareaValue()
      this.queueSingleLineSync()
    }
  }

  private syncTextareaValue() {
    if (!this.textarea || this.textarea.value === this.value) return
    this.textarea.value = this.value
  }

  private handleTextareaInput = (e: CustomEvent<{ value: string }>) => {
    e.stopPropagation()
    this.value = e.detail.value
    this.queueSingleLineSync()
    emit(this, 'input', { value: this.value })
  }

  private queueSingleLineSync() {
    window.requestAnimationFrame(() => {
      this.syncSingleLineState()
    })
  }

  private syncSingleLineState() {
    if (!this.textarea) return

    this.textarea.resizeToContent()
    this.isSingleLine = this.textarea.isSingleLine
  }

  private handleTextareaKeydown = (e: KeyboardEvent) => {
    if (e.isComposing) return
    if (e.key !== 'Enter' || e.shiftKey) return

    e.preventDefault()
    this.submit()
  }

  private submit = () => {
    if (!this.isLoading && this.value.trim()) {
      emit(this, 'submit', { value: this.value, model: this.model })
    }
  }

  private renderStartActions() {
    return html`
      <mm-flex class="start-actions" gap="1" align-items="center">
        ${this.hiddenAttachment
          ? ''
          : html`
              <mm-attachment-dropdown></mm-attachment-dropdown>
            `}
        <slot name="leading-actions"></slot>
        <!-- <mm-model-selector></mm-model-selector> -->
      </mm-flex>
    `
  }

  private renderEndActions() {
    return html`
      <mm-flex class="end-actions" gap="1" align-items="center">
        <slot name="trailing-actions"></slot>
        <mm-icon-button
          variant="primary"
          icon="send-diagonal"
          aria-label=${this.submitLabel}
          ?disabled=${this.isLoading}
          @click=${this.submit}
        ></mm-icon-button>
      </mm-flex>
    `
  }
}
