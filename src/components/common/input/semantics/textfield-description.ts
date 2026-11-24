import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/common/text/semantics/paragraph'

@customElement('mm-textfield-description')
export class TextfieldDescription extends LitElement {
  render() {
    return html`
      <mm-paragraph color="light">
        <slot></slot>
      </mm-paragraph>
    `
  }
}
