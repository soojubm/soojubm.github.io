import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { separatorStyles } from '@/components/separator/separator.styles'

type SeparatorScope = 'element' | 'section'

@customElement('mm-separator')
export class Separator extends LitElement {
  static styles = [separatorStyles]

  @property({ type: String, reflect: true }) scope: SeparatorScope = 'section'

  render() {
    return html`
      <hr role="separator" />
      <mm-caption><slot></slot></mm-caption>
    `
  }
}

export default Separator
