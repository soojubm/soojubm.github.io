import { css } from 'lit'

// 1. 컴포넌트 이름에 종속되지 않는 일반적인 명칭 사용
export const VARIANTS = {
  transparent: css`
    border: var(--border-transparent);
    background: none;
  `,
  plain: css`
    padding: 0;
    border: 0;
    background: none;
  `,
  subtle: css`
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

export const RADII = {
  default: css`
    --surface-radius: var(--radius);
  `,
  large: css`
    --surface-radius: var(--radius-large);
  `,
}

// 2. 타입 정의도 공통 명칭으로 추출
export type Variant = keyof typeof VARIANTS
export type Size = keyof typeof SIZES
export type Radius = keyof typeof RADII

export const variantStyles = [
  css`
    :host([variant='transparent']) .surface {
      ${VARIANTS.transparent}
    }
  `,
  css`
    :host([variant='plain']) .surface {
      ${VARIANTS.plain}
    }
  `,
  css`
    :host([variant='subtle']) .surface {
      ${VARIANTS.subtle}
    }
  `,
  css`
    :host([variant='elevated']) .surface {
      ${VARIANTS.elevated}
    }
  `,
]

export const sizeStyles = [
  css`
    :host([size='small']) .surface {
      ${SIZES.small}
    }
  `,
  css`
    :host([size='medium']) .surface {
      ${SIZES.medium}
    }
  `,
]

export const radiusStyles = [
  css`
    :host([radius='default']) {
      ${RADII.default}
    }
  `,
  css`
    :host([radius='large']) {
      ${RADII.large}
    }
  `,
]

export const styles = css`
  :host {
    display: block;
    --surface-height: auto;
    --surface-padding: var(--space-4);
    --surface-border: var(--border);
    --surface-radius: var(--radius);
    --surface-color: var(--color-background);
  }

  .surface {
    height: var(--xsurface-height);
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: var(--surface-padding);
    border: var(--surface-border);
    border-radius: var(--surface-radius);
    box-sizing: border-box;
    background: var(--surface-color);
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
