import { LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'

import { backdropStyles } from '@/components/overlay/overlay.styles'

/**
 * modal 표면 뒤를 덮는 dim·blur 레이어.
 * 콘텐츠 없이 재질만 책임지며, 열림/닫힘은 자신을 품은 레이어가 소유한다.
 */
@customElement('mm-backdrop')
export class Backdrop extends LitElement {
  static styles = backdropStyles
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-backdrop': Backdrop
  }
}
