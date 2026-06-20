import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { separatorStyles } from './separator.styles'

type SeparatorSpacing = 'small' | 'medium'

@customElement('mm-separator')
export class Separator extends LitElement {
  @property({ type: String, reflect: true }) spacing: SeparatorSpacing = 'medium'

  static styles = [separatorStyles]

  render() {
    return html`
      <hr role="separator" />
      <slot name="text"></slot>
    `
  }
}

export default Separator
