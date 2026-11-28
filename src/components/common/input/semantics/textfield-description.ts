import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/common/text/semantics/paragraph'

@customElement('fff-textfield-description')
export class TextfieldDescription extends LitElement {
  render() {
    return html`
      <fff-paragraph color="light">
        <slot></slot>
      </fff-paragraph>
    `
  }
}
