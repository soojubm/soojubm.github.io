import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  surfaceStyles,
  type SurfaceVariant,
  type SurfaceRadius,
} from '@/components/common/surface/surface.styles'

@customElement('fff-surface')
export class Surface extends LitElement {
  static styles = surfaceStyles
  /** `filled`는 상호작용 가능한 액션이 있는 맥락에서만 사용한다. */
  @property({ type: String, reflect: true }) variant?: SurfaceVariant
  @property({ type: String, reflect: true }) radius?: SurfaceRadius
  /** 좁은 화면에서 면을 화면 가장자리까지 넓힌다. 페이지 좌우 여백 안에 놓인 섹션 단위 면에 쓴다. */
  @property({ type: Boolean, reflect: true }) bleed = false
  /** 면을 화면 좌우 끝까지 넓힌 구획 띠로 만든다. 내용은 본문 칼럼 안에 남는다. */
  @property({ type: Boolean, reflect: true }) band = false

  render() {
    return html`
      <slot></slot>
    `
  }
}
