import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { separatorStyles } from './separator.styles'

@customElement('mm-separator')
class Separator extends LitElement {
  @property({ type: String }) spacing = ''

  static styles = [separatorStyles]

  render() {
    return html`
      <hr role="separator" data-spacing="${this.spacing}" />
      <slot name="text"></slot>
    `
  }
}

export default Separator
