import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

// 파일명이 바뀌어도 import 구조는 깨지지 않음
import { styles, variantStyles, sizeStyles, type Variant, type Size } from './surface.styles'

@customElement('mm-surface')
export class Surface extends LitElement {
  static styles = [styles, ...variantStyles, ...sizeStyles]

  @property({ type: String }) variant?: Variant
  @property({ type: String }) size?: Size

  render() {
    return html`
      <div
        class="surface"
        data-variant=${ifDefined(this.variant)}
        data-size=${ifDefined(this.size)}
      >
        <slot></slot>
      </div>
    `
  }
}

// ;div class="thumbnail-wrapper">
//   // <slot name="thumbnail"></slot> //
// </div>

declare global {
  interface HTMLElementTagNameMap {
    'mm-surface': Surface
  }
}
