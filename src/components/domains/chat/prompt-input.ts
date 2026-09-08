import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon-button/semantics/icon-names'
import '@/components/common/icon-button/icon-button'
import { inputStyles } from '@/components/common/input/input.styles'
import '@/components/common/input/textarea'
import '@/components/overlay/popover/semantics/select'
import { emit } from '@/utils'
import '@/components/domains/chat/model-selector'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
  static styles = [
    inputStyles,
    css`
      :host {
        display: block;
        padding-inline: var(--space-2);
        background: var(--surface-chrome-background-color);
        border: var(--surface-chrome-border);
        border-radius: var(--radius);
        box-shadow: var(--surface-chrome-shadow);

        backdrop-filter: var(--surface-chrome-backdrop-filter);
        -webkit-backdrop-filter: var(--surface-chrome-backdrop-filter);
      }

      form {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      :host([single-line]) form {
        justify-content: flex-start;
        min-height: var(--input-height);
      }

      .actions {
        display: flex;
        align-items: center;
        gap: var(--space-1);
      }

      mm-textarea {
        /* 배경은 호스트가 칠한다. 반투명 테마에서 이중 레이어 방지 */
        --input-background-color: transparent;
        --input-border: var(--border-transparent);
        --input-focus-outline: none;
      }

      :host([single-line]) mm-textarea {
        flex: 1;
        min-width: 0;
      }

      :host(:not([single-line])) mm-textarea {
        order: -1;
        flex-basis: 100%;
      }
    `,
  ]

  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = 'Ask me anything...'
  @property({ type: String }) model = 'claude-sonnet'
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '전송'
  @property({ type: Boolean }) loading = false

  @property({ type: Boolean, reflect: true, attribute: 'single-line' })
  private singleLine = true

  render() {
    return html`
      <form>
        ${this.renderStartActions()}
        <mm-textarea
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .rows=${1}
          ?disabled=${this.loading}
          @input=${this.handleTextareaInput}
          @keydown=${this.handleTextareaKeydown}
          @single-line-change=${this.handleSingleLineChange}
        ></mm-textarea>
        ${this.renderEndActions()}
      </form>
    `
  }

  private handleTextareaInput = (e: CustomEvent<{ value: string }>) => {
    e.stopPropagation()
    this.value = e.detail.value
    emit(this, 'input', { value: this.value })
  }

  private handleSingleLineChange = (e: CustomEvent<{ isSingleLine: boolean }>) => {
    this.singleLine = e.detail.isSingleLine
  }

  private handleTextareaKeydown = (e: KeyboardEvent) => {
    if (e.isComposing) return
    if (e.key !== 'Enter' || e.shiftKey) return

    e.preventDefault()
    this.handleSubmitClick()
  }

  private handleSubmitClick = () => {
    if (this.loading || !this.value.trim()) return

    emit(this, 'submit', { value: this.value, model: this.model })
  }

  private renderStartActions() {
    return html`
      <div class="actions">
        <mm-select placement="top-left">
          <mm-icon-button
            slot="trigger"
            icon=${ICON_NAMES.ADD_CIRCLE}
            aria-label="이미지 첨부"
          ></mm-icon-button>
          <option value="upload" icon=${ICON_NAMES.IMPORT}>이미지 업로드</option>
          <option value="camera" icon=${ICON_NAMES.CAMERA}>카메라 촬영</option>
          <option value="url" icon=${ICON_NAMES.LINK}>URL로 추가</option>
        </mm-select>
        <slot name="leading-actions"></slot>
        <!-- <mm-model-selector></mm-model-selector> -->
      </div>
    `
  }

  private renderEndActions() {
    return html`
      <div class="actions">
        <slot name="trailing-actions"></slot>
        <mm-icon-button
          variant="primary"
          icon=${ICON_NAMES.SUBMIT}
          aria-label=${this.submitLabel}
          ?disabled=${this.loading}
          @click=${this.handleSubmitClick}
        ></mm-icon-button>
      </div>
    `
  }
}
