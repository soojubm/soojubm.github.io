import { LitElement, css, html } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { inputStyles } from '@/components/common/input/input.styles'
import '@/components/common/input/input'
import { emit, uniqueId } from '@/utils'
import '@/components/common/icon'
import '@/components/common/icon-button/semantics/clear-button'

@customElement('mm-searchfield')
export class SearchField extends LitElement {
  static styles = [
    inputStyles,
    css`
      /* 값이 없어도 자리를 남겨, 내용 폭을 따르는 배치에서 지울 때 필드 폭이 줄지 않게 한다. */
      mm-clear-button[hidden] {
        display: inline-flex;
        visibility: hidden;
      }
    `,
  ]
  @property({ type: String }) value = ''
  @property({ type: String }) placeholder = ''
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, reflect: true }) size: 'small' | '' = ''
  @query('mm-input') private input?: HTMLElement
  private inputId = uniqueId('input')

  render() {
    return html`
      <div class="textfield-control">
        <mm-icon name=${ICON_NAMES.SEARCH}></mm-icon>
        <mm-input
          input-id=${this.inputId}
          .type=${'search'}
          .value=${this.value}
          .placeholder=${this.placeholder}
          aria-label=${this.placeholder || '검색'}
          ?disabled=${this.disabled}
          @input=${this.handleInput}
        ></mm-input>
        ${this.renderClearButton()}
      </div>
    `
  }

  // 호스트는 포커스를 받지 않으므로 검색 입력으로 넘긴다.
  focus(options?: FocusOptions) {
    this.input?.focus(options)
  }

  private renderClearButton() {
    return html`
      <mm-clear-button
        aria-label="검색어 지우기"
        ?hidden=${!this.value || this.disabled}
        @click=${this.handleClearClick}
      ></mm-clear-button>
    `
  }

  // mm-input의 input 이벤트를 여기서 멈추지 않으면, detail 없는 원본이 뒤따라 올라가 소비자의 값을 덮는다.
  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    event.stopPropagation()
    this.commitValue(target.value)
  }

  private handleClearClick(event: Event) {
    event.stopPropagation()
    if (this.disabled || !this.value) return

    this.commitValue('')
  }

  private commitValue(value: string) {
    this.value = value
    emit(this, 'input', { value: this.value })
  }
}
