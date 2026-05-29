import { customElement } from 'lit/decorators.js'
import { Text } from './text'

/**
 * <design-page-title>
 * 페이지의 최상위 제목을 담당하는 시멘틱 컴포넌트입니다.
 * 디자인상 다른 타이틀과 스타일이 겹치더라도, '페이지 제목'이라는 고유한 역할을 위해 독립적으로 존재합니다.
 */
@customElement('mm-page-title')
export class PageTitle extends Text {
  constructor() {
    super()
    this.as = 'h1'

    // 2단계: 페이지 타이틀에 정의된 고유 토큰 값을 주입합니다.
    // 내부적으로 textSizes.xl은 var(--font-size-28)에 매핑됩니다.
    this.variant = 'title'
    this.weight = 'bold'

    // 3단계: 기본 테마 색상을 지정합니다.
    this.color = 'var(--gray-900, #1a1a1a)'
  }
}
