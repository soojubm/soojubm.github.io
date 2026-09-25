import { LitElement, css, html, nothing } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { AriaIdRef, AriaInvalid } from '@/types'

import { inputStyles } from '@/components/common/input/input.styles'
import { TextareaAutoHeightController } from '@/controllers/textarea-auto-height-controller'
import { resetStyles } from '@/stylesheets/shared.styles'
import { emit } from '@/utils'

let uniqueIdCounter = 0

@customElement('mm-textarea')
export class Textarea extends LitElement {
  static styles = [
    resetStyles,
    inputStyles,
    css`
      .textarea-control {
        flex-direction: column;
        align-items: stretch;
        gap: 0;
      }

      slot[name='leading'],
      slot[name='trailing'] {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: var(--space-2);
      }

      slot[name='leading'] {
        padding-block-start: var(--input-padding-block);
      }

      slot[name='trailing'] {
        padding-block-end: var(--input-padding-block);
      }

      slot[hidden] {
        display: none;
      }
    `,
  ]
  @property({ type: String, attribute: 'input-id' }) inputId = ''
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String, attribute: 'aria-describedby' }) ariaDescribedBy: AriaIdRef = null
  @property({ type: Number }) rows = 2
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: String, attribute: 'aria-invalid' }) ariaInvalid: AriaInvalid = null
  @query('textarea') protected textarea!: HTMLTextAreaElement
  @state() protected defaultTextareaId = `mm-textarea-${uniqueIdCounter++}`
  private autoHeight = new TextareaAutoHeightController(this, {
    getTextarea: () => this.textarea,
    getMinVisibleRows: () => this.rows,
    getMaxVisibleRows: () => this.maxVisibleRows,
    onSingleLineChange: isSingleLine => emit(this, 'single-line-change', { isSingleLine }),
  })

  render() {
    return this.renderTextarea()
  }

  // 호스트는 포커스를 받지 않으므로 실제 textarea로 넘긴다.
  focus(options?: FocusOptions) {
    this.textarea?.focus(options)
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
    return this.autoHeight.isSingleLine
  }

  public resizeToContent() {
    this.autoHeight.resizeToContent()
  }

  protected handleTextareaInput(event: InputEvent) {
    const target = event.target as HTMLTextAreaElement
    event.stopPropagation()
    this.value = target.value
    this.resizeToContent()
    this.dispatchInputEvent(target.value)
  }

  protected handleTextareaKeydown(_event: KeyboardEvent) {}

  // 비어 있는 슬롯이 여백을 차지하지 않도록 내용이 있을 때만 드러낸다.
  // textarea-field처럼 슬롯을 전달받으면 전달용 slot의 slotchange도 올라오므로 currentTarget을 보고,
  // flatten으로 전달용 slot이 아닌 실제 내용을 센다.
  private handleSlotChange(event: Event) {
    const slot = event.currentTarget as HTMLSlotElement
    slot.hidden = slot.assignedElements({ flatten: true }).length === 0
  }

  private dispatchInputEvent(value: string) {
    emit(this, 'input', { value })
  }

  protected renderTextarea() {
    return html`
      <div class="textarea-control" aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}>
        <slot name="leading" hidden @slotchange=${this.handleSlotChange}></slot>
        <textarea
          id=${this.textareaId}
          rows=${this.rows}
          .value=${this.value}
          name=${ifDefined(this.name || undefined)}
          placeholder=${ifDefined(this.placeholder || undefined)}
          ?disabled=${this.disabled}
          aria-invalid=${ifDefined(this.ariaInvalid ?? undefined)}
          aria-describedby=${this.textareaDescribedBy || nothing}
          @input=${this.handleTextareaInput}
          @keydown=${this.handleTextareaKeydown}
        ></textarea>
        <slot name="trailing" hidden @slotchange=${this.handleSlotChange}></slot>
      </div>
    `
  }
}
