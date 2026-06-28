import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

// 파일명이 바뀌어도 import 구조는 깨지지 않음
import {
  styles,
  variantStyles,
  sizeStyles,
  radiusStyles,
  type Variant,
  type Size,
  type Radius,
} from '@/components/surface/surface.styles'

@customElement('mm-surface')
export class Surface extends LitElement {
  static styles = [styles, ...variantStyles, ...sizeStyles, ...radiusStyles]

  @property({ type: String, reflect: true }) variant?: Variant
  @property({ type: String, reflect: true }) size?: Size
  @property({ type: String, reflect: true }) radius?: Radius

  render() {
    return html`
      <slot></slot>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-surface': Surface
  }
}
