import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import '@/components/common/text/text'

@customElement('mm-caption')
export class Caption extends LitElement {
  render() {
    return html`
      <mm-text as="span" size="12" weight="medium" color="light">
        <slot></slot>
      </mm-text>
    `
  }
}
