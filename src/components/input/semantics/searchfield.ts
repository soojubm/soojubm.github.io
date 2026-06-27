import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { inputStyles } from '@/components/input/input.styles'
import { ICON_NAMES } from '@/components/icon-button/semantics/icon-names'
import '@/components/input/input'
import { emit } from '@/utils/emit'
import { uniqueId } from '@/utils/unique-id'

@customElement('mm-searchfield')
class SearchField extends LitElement {
  static styles = [inputStyles]

  @property({ type: String }) value = ''
  @property({ type: String }) placeholder = ''
  @property({ type: Boolean }) disabled = false
  @property({ type: String, reflect: true }) size: 'small' | '' = ''

  private inputId = uniqueId('input')

  render() {
    const hasValue = this.value.length > 0

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
        ${hasValue && !this.disabled
          ? html`
              <mm-clear-button aria-label="검색어 지우기" @click=${this.clear}></mm-clear-button>
            `
          : null}
      </div>
    `
  }

  private handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    emit(this, 'input', { value: this.value })
  }

  private clear(event: Event) {
    event.stopPropagation()
    if (this.disabled || !this.value) return
    this.value = ''
    emit(this, 'input', { value: '' })
  }
}

export default SearchField
