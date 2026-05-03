import { LitElement, html, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { separatorStyles } from './separator.styles'

@customElement('mm-separator')
export class Separator extends LitElement {
  @property({ type: String }) spacing?: string

  static styles = [separatorStyles]

  render() {
    return html`
      <hr role="separator" data-spacing=${this.spacing || nothing} />
      <slot name="text"></slot>
    `
  }
}

export default Separator
