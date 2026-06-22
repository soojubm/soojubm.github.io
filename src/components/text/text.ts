import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js'
import { resetStyles } from '../../stylesheets/shared/reset.styles'
import { textStyles, type TextColor, type TextSize, type TextWeight } from './text.styles'

@customElement('mm-text')
export class Text extends LitElement {
  @property({ type: String }) as = 'span'
  @property({ type: String, reflect: true }) size: TextSize = '14'
  @property({ type: String, reflect: true }) weight: TextWeight = 'medium'
  @property({ type: String, reflect: true }) color: TextColor = 'inherit'
  @property({ type: Boolean, reflect: true }) centered = false

  static styles = [resetStyles, textStyles]

  render() {
    const tag = unsafeStatic(this.as)
    return html`<${tag}><slot></slot></${tag}>`
  }
}
