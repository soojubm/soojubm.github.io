import { customElement, property } from 'lit/decorators.js'
import { Flex } from '../flex/flex'

/**
 * 버튼 그룹 레이아웃 컴포넌트.
 * mm-flex를 상속하며 버튼 그룹에 맞는 기본값을 오버라이드한다.
 * - align: center (flex 기본값 stretch 대신)
 */
@customElement('mm-button-group')
export class ButtonGroup extends Flex {
  @property({ type: String }) override align = 'center' as const
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-button-group': ButtonGroup
  }
}
