import { customElement } from 'lit/decorators.js'
import { Paragraph } from '../../text/semantics/paragraph'

/**
 * <mm-textfield-validation>
 * textfield의 유효성 검사 오류 메시지 컴포넌트입니다.
 */
@customElement('mm-textfield-validation')
export class TextfieldValidation extends Paragraph {
  override size: 'small' | 'medium' | 'large' = 'small'
  override color = 'var(--color-danger)'
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-textfield-validation': TextfieldValidation
  }
}
