import { css, unsafeCSS, CSSResult } from 'lit'

/**
 * 객체 정의를 바탕으로 data-attribute 선택자를 생성합니다.
 * @param data 스타일 정의 객체
 * @param attribute 데이터 속성 명 (예: 'variant', 'size')
 * @param baseClass 기준 클래스명 (기본값: 'tile')
 */
export const mapToStyles = (
  data: Record<string, CSSResult>,
  attribute: string,
  baseClass: string = 'tile',
) =>
  Object.entries(data).map(
    ([key, style]) => css`
      .${unsafeCSS(baseClass)}[data-${unsafeCSS(attribute)}='${unsafeCSS(key)}'] {
        ${style}
      }
    `,
  )
