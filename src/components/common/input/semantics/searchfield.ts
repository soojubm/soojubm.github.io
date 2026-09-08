import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { inputStyles } from '@/components/common/input/input.styles'
import '@/components/common/input/input'
import { emit, uniqueId } from '@/utils'
import '@/components/common/icon'
import '@/components/common/icon-button/semantics/clear-button'

@customElement('mm-searchfield')
class SearchField extends LitElement {
  static styles = [inputStyles]

  @property({ type: String }) value = ''
  @property({ type: String }) placeholder = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String, reflect: true }) size: 'small' | '' = ''

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

  private renderClearButton() {
    if (!this.value || this.disabled) return nothing

    return html`
      <mm-clear-button aria-label="검색어 지우기" @click=${this.handleClearClick}></mm-clear-button>
    `
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
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

export default SearchField
