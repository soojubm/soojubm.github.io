import { LitElement, html } from 'lit'
import { property, state } from 'lit/decorators.js'
import { textfieldStyles } from './textfield.styles'

class Input extends LitElement {
  @property({ type: String }) type = 'text'
  @property({ type: String }) value = ''
  @property({ type: String }) name = ''
  @property({ type: String }) placeholder = ''
  @property({ type: String }) label = ''
  @property({ type: String }) helper = ''
  @property({ type: String, attribute: 'validation-text' }) validationText = ''
  @property({ type: Boolean, attribute: 'isOptional' }) isOptional = false
  @property({ type: Boolean, attribute: 'hiddenLabel' }) hiddenLabel = false
  @property({ type: Boolean, reflect: true }) disabled = false
  @property({ type: Boolean, attribute: 'aria-invalid' }) isInvalid = false
  @state() private hasPrefixSlot = false
  @state() private hasSuffixSlot = false
  @state() private hasLinkSlot = false

  static styles = [textfieldStyles]

  private handleSlotChange(kind: 'prefix' | 'suffix' | 'link', event: Event) {
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

  render() {
    return html`
      <div class="textfield ${this.isInvalid ? 'is-invalid' : ''}" data-label="${String(this.hiddenLabel)}">
        ${this.label ? html`<label class="textfield-label">${this.label}${this.isOptional ? html`<small>선택입력</small>` : ''}</label>` : ''}
        ${this.helper ? html`<mm-text size="12" class="textfield-helper">${this.helper}</mm-text>` : ''}
        <div class="textfield-control">
          ${this.hasPrefixSlot
            ? html`<span class="textfield-affix textfield-prefix"><slot name="prefix" @slotchange=${(event: Event) => this.handleSlotChange('prefix', event)}></slot></span>`
            : html`<slot name="prefix" @slotchange=${(event: Event) => this.handleSlotChange('prefix', event)}></slot>`}
          <input class="reset-input textfield-input" type="${this.type}" .value="${this.value}" name="${this.name}" placeholder="${this.placeholder}" ?disabled="${this.disabled}" />
          ${this.hasSuffixSlot
            ? html`<span class="textfield-affix textfield-suffix"><slot name="suffix" @slotchange=${(event: Event) => this.handleSlotChange('suffix', event)}></slot></span>`
            : html`<slot name="suffix" @slotchange=${(event: Event) => this.handleSlotChange('suffix', event)}></slot>`}
          ${this.hasLinkSlot
            ? html`<span class="textfield-affix textfield-link"><slot name="link" @slotchange=${(event: Event) => this.handleSlotChange('link', event)}></slot></span>`
            : html`<slot name="link" @slotchange=${(event: Event) => this.handleSlotChange('link', event)}></slot>`}
        </div>
        ${this.validationText ? html`<mm-text size="12" class="textfield-validation">${this.validationText}</mm-text>` : ''}
      </div>
    `
  }
}

export default Input
