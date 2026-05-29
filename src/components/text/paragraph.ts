import { LitElement, css, html } from 'lit'
import { styleMap } from 'lit/directives/style-map.js'
import { customElement, property } from 'lit/decorators.js'

import { resetStyles } from '../shared/reset.styles'
import { textSizes, textWeights, type TextSize, type TextWeight } from './text.styles'

type ParagraphSize = 'medium' | 'large'

const paragraphSizes: Record<ParagraphSize, TextSize> = {
  medium: '14',
  large: '18',
}

@customElement('mm-paragraph')
export class Paragraph extends LitElement {
  @property({ type: String }) size: ParagraphSize = 'medium'
  @property({ type: String }) weight: TextWeight = 'medium'
  @property({ type: String }) color = 'inherit'
  @property({ type: Boolean, reflect: true }) center = false

  static styles = [
    resetStyles,
    css`
      :host {
        display: block;
      }
      p {
        font-family: inherit;
        color: inherit;
      }
    `,
  ]

  render() {
    const size = paragraphSizes[this.size] ?? paragraphSizes.medium
    const sizeStyle = textSizes[size]
    const weightStyle = textWeights[this.weight] ?? textWeights.medium

    const dynamicStyles = {
      fontSize: sizeStyle.fontSize,
      lineHeight: sizeStyle.lineHeight,
      fontWeight: weightStyle,
      color: this.color,
      textAlign: this.center ? 'center' : undefined,
    }

    return html`<p style=${styleMap(dynamicStyles)}><slot></slot></p>`
  }
}
