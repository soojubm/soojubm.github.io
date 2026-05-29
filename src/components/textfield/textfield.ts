import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
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
  @property({ type: String }) size = ''

  @property({ type: Boolean, attribute: 'is-optional' }) isOptional = false
  @property({ type: Boolean, attribute: 'isoptional' }) isOptionalAlias = false
  @property({ type: Boolean, attribute: 'hidden-label' }) hiddenLabel = false
  @property({ type: Boolean, attribute: 'hiddenlabel' }) hiddenLabelAlias = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false

  static styles = [textfieldStyles]

  protected inputId = `input-${crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`

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
    return html`<slot name="prefix"></slot>`
  }

  protected renderSuffix(): unknown {
    return html`<slot name="suffix"></slot>`
  }

  protected renderLink(): unknown {
    return html`<slot name="link"></slot>`
  }

  protected renderHelper(): unknown {
    return this.helper ? html`<p>${this.helper}</p>` : nothing
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
        @input=${this._handleInput}
      />
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
        ${this.renderLabel()} ${this.renderPrefix()} ${this.renderInput()} ${this.renderSuffix()}
        ${this.renderLink()} ${this.renderHelper()}
      </div>
    `
  }
}

export default Textfield
