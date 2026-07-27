import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  surfaceStyles,
  type SurfaceVariant,
  type SurfaceRadius,
  type SurfaceTone,
} from '@/components/surface/surface.styles'

@customElement('mm-surface')
export class Surface extends LitElement {
  static styles = surfaceStyles

  /** `filled`는 상호작용 가능한 액션이 있는 맥락에서만 사용한다. */
  @property({ type: String, reflect: true }) variant?: SurfaceVariant
  @property({ type: String, reflect: true }) radius?: SurfaceRadius
  @property({ type: String, reflect: true }) tone?: SurfaceTone

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
