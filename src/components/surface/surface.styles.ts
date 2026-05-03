import { css, unsafeCSS, CSSResult } from 'lit'
import { mapToStyles } from '../../utils/style-helpers'

// 1. 컴포넌트 이름에 종속되지 않는 일반적인 명칭 사용
export const VARIANTS = {
  plain: css`
    padding: 0;
    border: 0;
    background: none;
  `,
  tinted: css`
    border-color: transparent;
    background-color: var(--color-background-subtle);
  `,
  elevated: css`
    box-shadow: var(--shadow);
  `,
}

export const SIZES = {
  small: css`
    padding: var(--space-2);
  `,
  medium: css`
    width: 100%;
    max-width: var(--width-medium);
  `,
}

// 2. 타입 정의도 공통 명칭으로 추출
export type Variant = keyof typeof VARIANTS
export type Size = keyof typeof SIZES

// 3. 맵핑된 스타일 (내부 클래스명을 'surface'로 지정)
export const variantStyles = mapToStyles(VARIANTS, 'variant', 'surface')
export const sizeStyles = mapToStyles(SIZES, 'size', 'surface')

export const styles = css`
  :host {
    display: block;
  }

  .surface {
    height: var(--surface-height, auto);
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: var(--space-4);
    border: var(--border);
    border-radius: var(--radius);
    box-sizing: border-box;
    background: var(--color-background);
    position: relative;
    z-index: 1;
    transition: box-shadow 0.2s ease-in-out;
  }

  /* 슬롯 래퍼(Wrapper) 스타일 - ::slotted 대신 이 방식을 권장 */
  .thumbnail-wrapper {
    max-height: 200px;
    border-radius: var(--radius);
    overflow: hidden;
  }
`
