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

  @query('textarea') protected textarea!: HTMLTextAreaElement

  @state() protected defaultTextareaId = `mm-textarea-${uniqueIdCounter++}`

  render() {
    return this.renderTextarea()
  }

  protected get textareaId() {
    return this.inputId || this.defaultTextareaId
  }

  protected get textareaDescribedBy() {
    return this.ariaDescribedBy
  }

  protected get maxVisibleRows() {
    return 5
  }

  public get isSingleLine() {
    if (!this.textarea) return true

    const computedStyle = window.getComputedStyle(this.textarea)
    const fontSize = Number.parseFloat(computedStyle.fontSize)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.2
    const paddingBlock =
      Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom)

    return this.textarea.scrollHeight < lineHeight * 2 + paddingBlock
  }

  public resizeToContent() {
    this.autoResize()
  }

  protected updated(changedProperties: Map<string, unknown>) {
    if (changedProperties.has('value')) {
      this.autoResize()
    }
  }

  protected autoResize() {
    if (!this.textarea) return
    const computedStyle = window.getComputedStyle(this.textarea)
    const fontSize = Number.parseFloat(computedStyle.fontSize)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.2
    const paddingBlock =
      Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom)
    const maxHeight = lineHeight * this.maxVisibleRows + paddingBlock

    this.textarea.style.height = 'auto'
    const nextHeight = Math.min(this.textarea.scrollHeight, maxHeight)
    this.textarea.style.height = `${nextHeight}px`
    this.textarea.style.overflowY = this.textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  protected onInput(event: InputEvent) {
    const target = event.target as HTMLTextAreaElement
    event.stopPropagation()
    this.value = target.value
    this.autoResize()
    this.dispatchInputEvent(target.value)
  }

  protected onKeyDown(_event: KeyboardEvent) {}

  private dispatchInputEvent(value: string) {
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
          @input=${this.onInput}
          @keydown=${this.onKeyDown}
        ></textarea>
      </div>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textarea': Textarea
  }
}
