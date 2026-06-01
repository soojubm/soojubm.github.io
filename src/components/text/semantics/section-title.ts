import { customElement } from 'lit/decorators.js'
import { Text } from '../text'

/**
 * <mm-section-title>
 * 화면 안에서 주요 콘텐츠 묶음을 구분하는 섹션 제목입니다.
 */
@customElement('mm-section-title')
export class SectionTitle extends Text {
  constructor() {
    super()
    this.as = 'h2'
    this.size = '18'
    this.weight = 'bold'
    this.color = 'var(--color-foreground)'
  }
}
