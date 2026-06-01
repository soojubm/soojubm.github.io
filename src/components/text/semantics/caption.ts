import { customElement } from 'lit/decorators.js'
import { Text } from '../text'

/**
 * <mm-caption>
 * 보조 설명, 메타 정보, 이미지 캡션처럼 본문보다 낮은 위계의 텍스트입니다.
 */
@customElement('mm-caption')
export class Caption extends Text {
  constructor() {
    super()
    this.as = 'span'
    this.size = '12'
    this.weight = 'medium'
    this.color = 'var(--color-foreground-light)'
  }
}
