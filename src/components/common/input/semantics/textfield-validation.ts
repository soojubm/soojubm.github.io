import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/common/text/semantics/paragraph'

@customElement('fff-textfield-validation')
export class TextfieldValidation extends LitElement {
  render() {
    return html`
      <fff-paragraph color="danger"><slot></slot></fff-paragraph>
    `
  }
}
