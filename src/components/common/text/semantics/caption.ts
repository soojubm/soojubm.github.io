import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/common/text/text'

@customElement('fff-caption')
export class Caption extends LitElement {
  render() {
    return html`
      <fff-text as="span" size="12" weight="medium" color="light">
        <slot></slot>
      </fff-text>
    `
  }
}
