import { LitElement } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js'

import {
  textStyles,
  type TextColor,
  type TextMaxLength,
  type TextSize,
  type TextWeight,
} from '@/components/text/text.styles'
import { resetStyles } from '@/stylesheets/shared/reset.styles'

@customElement('mm-text')
export class Text extends LitElement {
  static styles = [resetStyles, textStyles]

  @property({ type: String }) as = 'span'
  @property({ type: String, reflect: true }) size: TextSize = '14'
  @property({ type: String, reflect: true }) weight: TextWeight = 'medium'
  @property({ type: String, reflect: true }) color: TextColor = 'inherit'
  @property({ type: Boolean, reflect: true }) centered = false
  @property({ type: String, attribute: 'max-length', reflect: true }) maxLength: TextMaxLength = ''

  render() {
    const tag = unsafeStatic(this.as)
    return html`<${tag}><slot></slot></${tag}>`
  }
}
