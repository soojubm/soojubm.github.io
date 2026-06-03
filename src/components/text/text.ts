import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'
import { textStyles, type TextSize, type TextWeight } from './text.styles'

@customElement('mm-text')
export class Text extends LitElement {
  @property({ type: String }) as = 'span'
  @property({ type: String, reflect: true }) size: TextSize = '14'
  @property({ type: String, reflect: true }) weight: TextWeight = 'medium'
  @property({ type: String }) color = 'inherit'
  @property({ type: Boolean, reflect: true }) center = false

  static styles = [resetStyles, textStyles]

  updated(changed: Map<string, unknown>) {
    if (changed.has('color')) {
      this.style.color = this.color !== 'inherit' ? this.color : ''
    }
  }

  render() {
    const tag = unsafeStatic(this.as)
    return html`<${tag}><slot></slot></${tag}>`
  }
}
