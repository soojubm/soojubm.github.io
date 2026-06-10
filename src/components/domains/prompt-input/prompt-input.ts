import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'
import '../../button/button-group'
import '../../icon-button/icon-button'
import { inputStyles } from '../../input/input.styles'
import { Textarea } from '../../input/textarea'
import '../textfield-action-bar'
import './attachment-dropdown'
import './model-selector'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
  @property({ type: String, reflect: true }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = 'Ask me anything...'
  @property({ type: String }) model = 'claude-sonnet'
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '전송'
  @property({ type: Boolean, attribute: 'is-loading', reflect: true }) isLoading = false
  @property({ type: Boolean, attribute: 'hide-attachment' }) hideAttachment = false
  @property({ type: Boolean, attribute: 'hide-model-selector' }) hideModelSelector = false

  @query('mm-textarea') private _textarea?: Textarea

  static styles = [
    inputStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this._syncTextareaValue()
    }
  }

  private _syncTextareaValue() {
    if (!this._textarea || this._textarea.value === this.value) return
    this._textarea.value = this.value
  }

  private _handleTextareaInput(e: CustomEvent<{ value: string }>) {
    this.value = e.detail.value
    this.dispatchEvent(
      new CustomEvent('value-change', {
        detail: { value: this.value },
        bubbles: true,
        composed: true,
      }),
    )
  }

  private _handleTextareaKeydown(e: KeyboardEvent) {
    if (e.isComposing) return
    if (e.key !== 'Enter' || e.shiftKey) return

    e.preventDefault()
    this._submit()
  }

  private _handleModelChange(event: CustomEvent<{ value: string }>) {
    this.model = event.detail.value
    this.dispatchEvent(
      new CustomEvent('model-change', {
        detail: { value: this.model },
        bubbles: true,
        composed: true,
      }),
    )
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
        <mm-flex direction="column" gap="2">
          <mm-textarea
            .value=${this.value}
            .name=${this.name}
            .placeholder=${this.placeholder}
            .rows=${1}
            ?disabled=${this.isLoading}
            @input=${this._handleTextareaInput}
            @keydown=${this._handleTextareaKeydown}
          ></mm-textarea>
          <mm-textfield-action-bar align="between">
            <mm-button-group gap="1">
              <slot name="leading-actions"></slot>
              ${this.hideAttachment ? '' : html`<mm-attachment-dropdown></mm-attachment-dropdown>`}
              ${this.hideModelSelector
                ? ''
                : html`<mm-model-selector
                    .value=${this.model}
                    @change=${this._handleModelChange}
                  ></mm-model-selector>`}
            </mm-button-group>
            <mm-button-group gap="1">
              <slot name="trailing-actions"></slot>
              <mm-icon-button
                variant="primary"
                icon="send-diagonal"
                aria-label=${this.submitLabel}
                ?disabled=${this.isLoading}
                @click=${this._submit}
              ></mm-icon-button>
            </mm-button-group>
          </mm-textfield-action-bar>
        </mm-flex>
      </form>
    `
  }
}
