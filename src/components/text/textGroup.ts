import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { textStyles } from './text.styles'

@customElement('mm-text-group')
class TextGroup extends LitElement {
  @property({ type: String }) variant = ''

  static styles = [textStyles]

  render() {
    return html`
      <div role="group" class="text-group" data-variant="${this.variant}">
        <slot></slot>
      </div>
    `
  }
}

export default TextGroup
