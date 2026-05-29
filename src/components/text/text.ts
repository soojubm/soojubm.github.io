import { LitElement, css } from 'lit' // 👈 여기서는 LitElement와 css만!
import { customElement, property } from 'lit/decorators.js'
import { html, unsafeStatic } from 'lit/static-html.js' // 👈
import { styleMap } from 'lit/directives/style-map.js'

import { resetStyles } from '../shared/reset.styles'
import { textSizes, textWeights, type TextSize, type TextWeight } from './text.styles'

@customElement('mm-text')
export class Text extends LitElement {
  @property({ type: String }) as = 'span'
  @property({ type: String }) variant = 'body' // 구형 매핑 프롭스 (하위 호환 유지)
  @property({ type: String }) size = '' // 신형 프리미티브 사이즈 프롭스 ('32' | '24' | '18' | '14' | '12')
  @property({ type: String }) weight: TextWeight = 'medium'
  @property({ type: String }) color = 'inherit'

  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-block;
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
        color: inherit;
      }
    `,
  ]

  render() {
    const tag = unsafeStatic(this.as)

    // ❌ 기존 코드: size가 존재하기만 하면 무조건 variant를 무시함
    // const sizeKey = (this.size || this.variant) as TextSize

    //  수정 코드: 들어온 size가 실제로 textSizes 토큰에 존재하는 정당한 키(32, 24, 14 등)인지 검사
    const isValidSize = this.size in textSizes
    const sizeKey = (isValidSize ? this.size : this.variant) as TextSize

    const sizeStyle = textSizes[sizeKey] || textSizes['14']
    const weightStyle = textWeights[this.weight] || textWeights.medium

    const dynamicStyles = {
      fontSize: sizeStyle.fontSize,
      lineHeight: sizeStyle.lineHeight,
      fontWeight: weightStyle,
      color: this.color,
    }

    return html`
    <${tag} style=${styleMap(dynamicStyles)}>
      <slot></slot>
    </${tag}>
  `
  }
}
