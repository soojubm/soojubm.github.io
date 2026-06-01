import { customElement } from 'lit/decorators.js'
import { Caption } from '../../text/semantics/caption'

/**
 * <mm-textfield-helper>
 * textfield의 보조 설명 텍스트 컴포넌트입니다.
 */
@customElement('mm-textfield-helper')
export class TextfieldHelper extends Caption {
  constructor() {
    super()
    this.as = 'p'
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textfield-helper': TextfieldHelper
  }
}
