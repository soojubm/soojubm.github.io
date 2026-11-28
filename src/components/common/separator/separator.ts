import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { separatorStyles } from '@/components/common/separator/separator.styles'
import '@/components/common/text/semantics/caption'
import { resetStyles } from '@/stylesheets/shared.styles'

export type SeparatorLevel = 'element' | 'section'

@customElement('fff-separator')
export class Separator extends LitElement {
  static styles = [resetStyles, separatorStyles]
  @property({ type: String, reflect: true }) level: SeparatorLevel = 'element'

  render() {
    return html`
      <hr />
      <fff-caption><slot></slot></fff-caption>
    `
  }
}
