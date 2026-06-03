import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { resetStyles } from '../../../stylesheets/shared/reset.styles'
import '../../flex/flex'

@customElement('mm-paragraph-group')
export class ParagraphGroup extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
    `,
  ]

  render() {
    return html`
      <mm-flex direction="column" gap="4">
        <slot></slot>
      </mm-flex>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-paragraph-group': ParagraphGroup
  }
}
