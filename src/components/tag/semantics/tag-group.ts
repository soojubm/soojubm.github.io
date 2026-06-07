import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'

@customElement('mm-tag-group')
export class TagGroup extends LitElement {
  static styles = [resetStyles]

  render() {
    return html`
      <mm-flex gap="2" wrap>
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-tag-group': TagGroup
  }
}
