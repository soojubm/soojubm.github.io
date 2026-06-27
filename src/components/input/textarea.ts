import { LitElement, html, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import type { AriaIdRef, AriaInvalid } from '@/types/aria'
import { inputStyles } from '@/components/input/input.styles'
import { emit } from '@/utils/emit'

let uniqueIdCounter = 0

@customElement('mm-textarea')
export class Textarea extends LitElement {
  static styles = inputStyles

  @property({ type: String, attribute: 'input-id' }) inputId = ''
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: AriaIdRef = null
  @property({ type: Number }) rows = 3
  @property({ type: Boolean }) disabled = false
  @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null

  @query('textarea') protected _textarea!: HTMLTextAreaElement

  @state() protected _defaultTextareaId = `mm-textarea-${uniqueIdCounter++}`

  protected get textareaId() {
    return this.inputId || this._defaultTextareaId
  }

  protected get textareaDescribedBy() {
    return this.ariaDescribedBy
  }

  protected get maxVisibleRows() {
    return 5
  }

  public get isSingleLine() {
    if (!this._textarea) return true

    const computedStyle = window.getComputedStyle(this._textarea)
    const fontSize = Number.parseFloat(computedStyle.fontSize)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.2
    const paddingBlock =
      Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom)

    return this._textarea.scrollHeight < lineHeight * 2 + paddingBlock
  }

  public resizeToContent() {
    this._autoResize()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this._autoResize()
    }
  }

  protected _autoResize() {
    if (!this._textarea) return
    const computedStyle = window.getComputedStyle(this._textarea)
    const fontSize = Number.parseFloat(computedStyle.fontSize)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.2
    const paddingBlock =
      Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom)
    const maxHeight = lineHeight * this.maxVisibleRows + paddingBlock

    this._textarea.style.height = 'auto'
    const nextHeight = Math.min(this._textarea.scrollHeight, maxHeight)
    this._textarea.style.height = `${nextHeight}px`
    this._textarea.style.overflowY = this._textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  protected _onInput(event: InputEvent) {
    const target = event.target as HTMLTextAreaElement
    event.stopPropagation()
    this.value = target.value
    this._autoResize()
    this._dispatchInputEvent(target.value)
  }

  protected _onKeyDown(_event: KeyboardEvent) {}

  private _dispatchInputEvent(value: string) {
    emit(this, 'input', { value })
  }

  protected renderTextarea() {
    return html`
      <div class="textarea-control" ?data-invalid=${this.ariaInvalid === 'true'}>
        <textarea
          id=${this.textareaId}
          rows=${this.rows}
          .value=${this.value}
          name=${this.name || nothing}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.disabled}
          aria-invalid=${this.ariaInvalid ?? nothing}
          aria-describedby=${this.textareaDescribedBy || nothing}
          @input=${this._onInput}
          @keydown=${this._onKeyDown}
        ></textarea>
      </div>
    `
  }

  render() {
    return this.renderTextarea()
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textarea': Textarea
  }
}
