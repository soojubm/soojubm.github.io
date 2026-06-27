import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/text/semantics/paragraph'

@customElement('mm-textfield-validation')
export class TextfieldValidation extends LitElement {
  render() {
    return html`
      <mm-paragraph color="danger"><slot></slot></mm-paragraph>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textfield-validation': TextfieldValidation
  }
}
