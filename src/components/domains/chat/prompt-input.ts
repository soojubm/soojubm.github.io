import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'
import '@/components/overlay/popover/popover'
import { emit } from '@/utils'
import '@/components/domains/chat/model-selector'

@customElement('mm-prompt-input')
export class PromptInput extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .toolbar {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: space-between;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }
  `
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = 'Ask me anything...'
  @property({ type: String }) model = 'claude-sonnet'
  @property({ type: String, attribute: 'submit-label' }) submitLabel = '전송'
  @property({ type: Boolean }) loading = false

  render() {
    return html`
      <form>
        <mm-textarea
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .rows=${1}
          ?disabled=${this.loading}
          @input=${this.handleTextareaInput}
          @keydown=${this.handleTextareaKeydown}
        >
          <div slot="trailing" class="toolbar">
            ${this.renderStartActions()} ${this.renderEndActions()}
          </div>
        </mm-textarea>
      </form>
    `
  }

  private handleTextareaInput = (e: CustomEvent<{ value: string }>) => {
    e.stopPropagation()
    this.value = e.detail.value
    emit(this, 'input', { value: this.value })
  }
  private handleTextareaKeydown = (e: KeyboardEvent) => {
    // 슬롯에 둔 툴바 버튼의 키 입력도 mm-textarea를 거쳐 올라오므로 입력 영역에서 온 것만 받는다.
    if (e.target !== e.currentTarget) return
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
        <mm-popover placement="top-left">
          <mm-icon-button
            slot="trigger"
            icon=${ICON_NAMES.ADD_CIRCLE}
            aria-label="이미지 첨부"
            aria-haspopup="menu"
          ></mm-icon-button>
          <mm-menu-item-group aria-label="이미지 첨부">
            <mm-menu-item-action
              icon=${ICON_NAMES.IMPORT}
              label="이미지 업로드"
            ></mm-menu-item-action>
            <mm-menu-item-action
              icon=${ICON_NAMES.CAMERA}
              label="카메라 촬영"
            ></mm-menu-item-action>
            <mm-menu-item-action icon=${ICON_NAMES.LINK} label="URL로 추가"></mm-menu-item-action>
          </mm-menu-item-group>
        </mm-popover>
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
