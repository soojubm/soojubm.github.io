import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { separatorStyles } from '@/components/separator/separator.styles'

type SeparatorSpacing = 'small' | 'medium'

@customElement('mm-separator')
export class Separator extends LitElement {
  static styles = [separatorStyles]

  @property({ type: String, reflect: true }) spacing: SeparatorSpacing = 'medium'

  render() {
    return html`
      <hr role="separator" />
      <slot name="text"></slot>
    `
  }
}

export default Separator
