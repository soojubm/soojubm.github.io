import { LitElement, html, nothing } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { textfieldStyles } from './textfield.styles'

@customElement('mm-textfield')
export class Textfield extends LitElement {
  @property({ type: String }) type = 'text'
  @property({ type: String }) value = ''
  @property({ type: String }) name?: string
  @property({ type: String }) placeholder?: string
  @property({ type: String }) label?: string
  @property({ type: String }) helper?: string
  @property({ type: String, attribute: 'validation-text' }) validationText?: string
  @property({ type: String }) size = ''

  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'isoptional' }) isOptionalAlias = false
  @property({ type: Boolean, attribute: 'hidden-label' }) hiddenLabel = false
  @property({ type: Boolean, attribute: 'hiddenlabel' }) hiddenLabelAlias = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false

  static styles = textfieldStyles

  protected inputId = `input-${crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`
  @state() private hasPrefixSlot = false
  @state() private hasSuffixSlot = false
  @state() private hasLinkSlot = false

  protected get effectiveHiddenLabel() {
    return this.hiddenLabel || this.hiddenLabelAlias
  }

  protected get effectiveIsOptional() {
    return this.isOptional || this.isOptionalAlias
  }

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

  protected get showLink() {
    return this.hasLinkSlot
  }

  protected handleSlotChange(kind: 'prefix' | 'suffix' | 'link', event: Event) {
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
    if (kind === 'link') this.hasLinkSlot = hasContent
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
      <label for=${this.inputId}>
        ${this.label} ${this.effectiveIsOptional ? html`<small>선택입력</small>` : nothing}
      </label>
    `
  }

  protected renderPrefix(): unknown {
    return html`<slot name="prefix" @slotchange=${(event: Event) => this.handleSlotChange('prefix', event)}></slot>`
  }

  protected renderSuffix(): unknown {
    return html`<slot name="suffix" @slotchange=${(event: Event) => this.handleSlotChange('suffix', event)}></slot>`
  }

  protected renderLink(): unknown {
    return html`<slot name="link" @slotchange=${(event: Event) => this.handleSlotChange('link', event)}></slot>`
  }

  protected renderHelper(): unknown {
    return this.helper
      ? html`<mm-text class="textfield-helper" size="12" color="var(--color-foreground-light)" as="p">${this.helper}</mm-text>`
      : nothing
  }

  protected renderValidation(): unknown {
    return this.validationText
      ? html`<mm-text id=${`${this.inputId}-validation`} class="textfield-validation" size="12" color="var(--color-danger)" as="p">${this.validationText}</mm-text>`
      : nothing
  }

  protected renderInput(): unknown {
    return html`
      <input
        id=${this.inputId}
        class=${this.inputClasses}
        type=${this.inputType}
        .value=${this.value}
        name=${this.name || nothing}
        placeholder=${this.placeholder || nothing}
        ?disabled=${this.disabled}
        aria-invalid=${this.isInvalid ? 'true' : 'false'}
        aria-describedby=${this.validationText ? `${this.inputId}-validation` : nothing}
        @input=${this._handleInput}
      />
    `
  }

  protected renderControl(): unknown {
    return html`
      <div class="textfield-control">
        ${this.showPrefix
          ? html`<span class="textfield-affix textfield-prefix">${this.renderPrefix()}</span>`
          : this.renderPrefix()}
        ${this.renderInput()}
        ${this.showSuffix
          ? html`<span class="textfield-affix textfield-suffix">${this.renderSuffix()}</span>`
          : this.renderSuffix()}
        ${this.showLink
          ? html`<span class="textfield-affix textfield-link">${this.renderLink()}</span>`
          : this.renderLink()}
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
        data-label=${this.effectiveHiddenLabel ? 'true' : 'false'}
        data-size=${ifDefined(this.size || undefined)}
      >
        ${this.renderLabel()} ${this.renderHelper()} ${this.renderControl()} ${this.renderValidation()}
      </div>
    `
  }
}

export default Textfield
