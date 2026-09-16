import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { separatorStyles } from '@/components/common/separator/separator.styles'
import '@/components/common/text/semantics/caption'
import { resetStyles } from '@/stylesheets/shared.styles'

type SeparatorVariant = 'element' | 'section'

@customElement('mm-separator')
export class Separator extends LitElement {
  static styles = [resetStyles, separatorStyles]
  @property({ type: String, reflect: true }) variant: SeparatorVariant = 'element'

  render() {
    return html`
      <hr />
      <mm-caption><slot></slot></mm-caption>
    `
  }
}
