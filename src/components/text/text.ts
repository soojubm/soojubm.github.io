import { LitElement, css } from 'lit' // 👈 여기서는 LitElement와 css만!
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js' // 👈
import { styleMap } from 'lit/directives/style-map.js'

import { resetStyles } from '../../stylesheets/shared/reset.styles'
import { textSizes, textWeights, type TextSize, type TextWeight } from './text.styles'

@customElement('mm-text')
export class Text extends LitElement {
  @property({ type: String }) as = 'span'
  @property({ type: String }) size: TextSize = '14'
  @property({ type: String }) weight: TextWeight = 'medium'
  @property({ type: String }) color = 'inherit'
  @property({ type: Boolean }) center = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-block;
        --text-color: inherit;
      }
      :host([center]) {
        display: block;
      }
      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      p,
      span {
        font-family: inherit;
        color: var(--text-color);
      }
    `,
  ]

  render() {
    const tag = unsafeStatic(this.as)
    const sizeStyle = textSizes[this.size] ?? textSizes['14']
    const weightStyle = textWeights[this.weight] || textWeights.medium

    const dynamicStyles = {
      fontSize: sizeStyle.fontSize,
      lineHeight: sizeStyle.lineHeight,
      fontWeight: weightStyle,
      ...(this.color !== 'inherit' ? { color: this.color } : {}),
      ...(this.center ? { textAlign: 'center' } : {}),
    }

    return html`
    <${tag} style=${styleMap(dynamicStyles)}>
      <slot></slot>
    </${tag}>
  `
  }
}
