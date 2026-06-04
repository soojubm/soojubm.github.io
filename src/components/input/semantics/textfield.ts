import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { textfieldStyles } from './textfield.styles'
import '../input'

@customElement('mm-textfield')
export class Textfield extends LitElement {
  @property({ type: String }) type = 'text'
  @property({ type: String }) value = ''
  @property({ type: String }) name?: string
  @property({ type: String }) placeholder?: string
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string
  @property({ type: String, attribute: 'validation-text' }) validationText?: string
  @property({ type: String, reflect: true }) size = ''

  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hidden-label', reflect: true }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false

  static styles = textfieldStyles

  protected inputId = `input-${crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`
  @state() private hasPrefixSlot = false
  @state() private hasSuffixSlot = false

  protected get fieldClasses() {
    return 'textfield'
  }

  protected get fieldRole(): string | undefined {
    return undefined
  }

  protected get fieldAriaLabel(): string | undefined {
    return undefined
  }

  protected get inputType() {
    return this.type
  }

  protected get inputClasses() {
    return 'textfield-input'
  }

  protected get showPrefix() {
    return this.hasPrefixSlot
  }

  protected get showSuffix() {
    return this.hasSuffixSlot
  }

  protected handleSlotChange(kind: 'prefix' | 'suffix', event: Event) {
    const slot = event.target as HTMLSlotElement
    const hasContent = slot
      .assignedNodes({ flatten: true })
      .some(
        node =>
          (node.nodeType === Node.TEXT_NODE && node.textContent?.trim() !== '') ||
          node.nodeType === Node.ELEMENT_NODE,
      )

    if (kind === 'prefix') this.hasPrefixSlot = hasContent
    if (kind === 'suffix') this.hasSuffixSlot = hasContent
  }

  protected _handleInput(event: Event) {
    const target = event.target as HTMLInputElement
    this.value = target.value
    this.dispatchInputEvent(this.value)
  }

  protected dispatchInputEvent(value: string) {
    this.dispatchEvent(
      new CustomEvent('input', {
        bubbles: true,
        composed: true,
        detail: { value },
      }),
    )
  }

  protected renderLabel(): unknown {
    if (!this.label) return nothing

    return html`
      <mm-textfield-label for=${this.inputId} ?optional=${this.isOptional}>
        ${this.label}
      </mm-textfield-label>
    `
  }

  protected renderPrefix(): unknown {
    return html`<slot
      name="prefix"
      @slotchange=${(event: Event) => this.handleSlotChange('prefix', event)}
    ></slot>`
  }

  protected renderSuffix(): unknown {
    return html`<slot
      name="suffix"
      @slotchange=${(event: Event) => this.handleSlotChange('suffix', event)}
    ></slot>`
  }

  protected renderHelper(): unknown {
    return this.helper
      ? html`<div style="margin-top:-.25rem">
          <mm-textfield-helper>${this.helper}</mm-textfield-helper>
        </div>`
      : nothing
  }

  protected renderValidation(): unknown {
    return this.validationText
      ? html`<mm-textfield-validation id=${`${this.inputId}-validation`}
          >${this.validationText}</mm-textfield-validation
        >`
      : nothing
  }

  protected renderInput(): unknown {
    return html`
      <mm-input
        input-id=${this.inputId}
        input-class=${this.inputClasses}
        .type=${this.inputType}
        .value=${this.value}
        .name=${this.name}
        .placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        ?invalid=${this.isInvalid}
        .describedBy=${this.validationText ? `${this.inputId}-validation` : undefined}
        @input=${this._handleInput}
      ></mm-input>
    `
  }

  protected renderControl(): unknown {
    return html`
      <div class="textfield-control">
        ${this.showPrefix
          ? html`<span class="textfield-prefix">${this.renderPrefix()}</span>`
          : this.renderPrefix()}
        ${this.renderInput()}
        ${this.showSuffix
          ? html`<span class="textfield-suffix">${this.renderSuffix()}</span>`
          : this.renderSuffix()}
      </div>
    `
  }

  render() {
    return html`
      <div
        class=${this.fieldClasses}
        role=${ifDefined(this.fieldRole)}
        aria-label=${ifDefined(this.fieldAriaLabel)}
        ?data-invalid=${this.isInvalid}
      >
        ${this.renderLabel()} ${this.renderHelper()} ${this.renderControl()}
        ${this.renderValidation()}
      </div>
    `
  }
}

export default Textfield
