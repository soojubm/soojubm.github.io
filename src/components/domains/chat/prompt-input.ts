import { LitElement, css, html } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common'
import '@/components/common'
import '@/components/overlay/popover/popover'
import { EventSubscriptionController } from '@/controllers/event-subscription-controller'
import { emit, uniqueId } from '@/utils'
import '@/components/domains/chat/model-selector'

@customElement('fff-prompt-input')
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
  @property({ type: String, attribute: 'stop-label' }) stopLabel = '생성 중단'
  @property({ type: Boolean }) loading = false
  private readonly stopSubscription = new EventSubscriptionController(this, 'stop')
  // popover는 portal로 옮겨져 한 트리에 모이므로, 인스턴스가 여럿이어도 id가 겹치지 않게 한다.
  private readonly attachMenuId = uniqueId('attach-menu')

  render() {
    return html`
      <form>
        <fff-textarea
          .value=${this.value}
          .name=${this.name}
          .placeholder=${this.placeholder}
          ?disabled=${this.loading}
          @input=${this.handleTextareaInput}
          @keydown=${this.handleTextareaKeydown}
        >
          <div slot="trailing" class="toolbar">
            ${this.renderStartActions()} ${this.renderEndActions()}
          </div>
        </fff-textarea>
      </form>
    `
  }

  private handleTextareaInput = (e: CustomEvent<{ value: string }>) => {
    e.stopPropagation()
    this.value = e.detail.value
    emit(this, 'input', { value: this.value })
  }
  private handleTextareaKeydown = (e: KeyboardEvent) => {
    // 슬롯에 둔 툴바 버튼의 키 입력도 fff-textarea를 거쳐 올라오므로 입력 영역에서 온 것만 받는다.
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
        <fff-icon-button
          icon=${ICON_NAMES.ADD_CIRCLE}
          aria-label="이미지 첨부"
          aria-haspopup="menu"
          aria-controls=${this.attachMenuId}
        ></fff-icon-button>
        <fff-popover id=${this.attachMenuId} placement="top-start">
          <fff-menu-item-group aria-label="이미지 첨부">
            <fff-menu-item-action
              icon=${ICON_NAMES.IMPORT}
              label="이미지 업로드"
            ></fff-menu-item-action>
            <fff-menu-item-action
              icon=${ICON_NAMES.CAMERA}
              label="카메라 촬영"
            ></fff-menu-item-action>
            <fff-menu-item-action
              icon=${ICON_NAMES.EXTERNAL_LINK}
              label="URL로 추가"
            ></fff-menu-item-action>
          </fff-menu-item-group>
        </fff-popover>
        <slot name="leading-actions"></slot>
        <!-- <fff-model-selector></fff-model-selector> -->
      </div>
    `
  }

  private renderEndActions() {
    return html`
      <div class="actions">
        <slot name="trailing-actions"></slot>
        ${this.renderSubmitOrStop()}
      </div>
    `
  }

  // 응답을 만드는 중에는 전송 대신 중단 버튼을 보인다.
  private renderSubmitOrStop() {
    if (this.loading && this.stopSubscription.subscribed) {
      return html`
        <fff-icon-button
          variant="primary"
          icon=${ICON_NAMES.STOP}
          aria-label=${this.stopLabel}
          @click=${this.handleStopClick}
        ></fff-icon-button>
      `
    }

    return html`
      <fff-icon-button
        variant="primary"
        icon=${ICON_NAMES.SUBMIT}
        aria-label=${this.submitLabel}
        ?disabled=${this.loading}
        @click=${this.handleSubmitClick}
      ></fff-icon-button>
    `
  }

  private handleStopClick = () => {
    emit(this, 'stop')
  }
}
