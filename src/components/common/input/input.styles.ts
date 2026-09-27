import { css, unsafeCSS } from 'lit'

import { visuallyHiddenStyles } from '@/stylesheets/shared.styles'
import { buildAttributeRules } from '@/utils'

/** radio·checkbox처럼 네이티브 input을 시각적으로 숨기고 label의 인디케이터로 대체하는 컨트롤이 공유하는 규칙. */
export const visuallyHiddenInputStyles = css`
  input {
    ${visuallyHiddenStyles};
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
`

/** 선택 컨트롤을 fieldset으로 묶는 그룹. 그룹 이름(legend)은 스크린리더에만 전달한다. */
export const inputSelectionGroupStyles = css`
  :host {
    display: block;
  }

  /* fieldset 기본값(min-width: min-content) 때문에 flex 부모 안에서 줄어들지 못하고 넘치는 것을 막는다. */
  fieldset {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  legend {
    ${visuallyHiddenStyles};
  }
`

const inputSizeTokens = {
  small: {
    '--input-height': 'var(--size-32)',
    '--input-padding-block': '0',
  },
}

/** 입력 필드 크기 단계. 빈 값이 기본(48) 크기다. */
export type InputSize = keyof typeof inputSizeTokens | ''

export const inputStyles = css`
  :host {
    display: block;
    position: relative;
    --input-height: var(--size-48);
    --input-padding-block: var(--space-3);
    --input-padding-inline: var(--space-3);
    --input-background-color: var(--background-subtle-color);
    --input-border-radius: var(--radius);
    --input-border: var(--border-transparent);
    --input-focus-outline: var(--interaction-focus-outline);
  }

  :host(:hover:not([disabled])) {
    --input-border: var(--border);
  }

  ${unsafeCSS(buildAttributeRules('size', inputSizeTokens))}

  .textfield-control,
  .textarea-control {
    display: flex;
    align-items: center;
    width: 100%;
    min-height: var(--input-height);
    gap: var(--space-2);
    padding-inline: var(--input-padding-inline);
    border: var(--input-border);
    border-radius: var(--input-border-radius);
    box-sizing: border-box;
    background: var(--input-background-color);

    &:focus-within {
      outline: var(--input-focus-outline);
      /* outline-offset: 2px; */
    }

    &[aria-invalid='true'] {
      --input-border: var(--border-danger);
    }
  }

  .textfield-control {
    overflow: hidden;
  }

  textarea {
    width: 100%;
    min-width: 0;
    height: auto;
    min-height: var(--input-height);
    outline: none;
    color: var(--foreground-color);
    padding: var(--input-padding-block) 0;
    box-sizing: border-box;
    resize: none;

    &:focus-visible {
      outline: 0;
    }
    &::placeholder {
      color: var(--foreground-subtle-color);
    }
  }

  [aria-invalid='true'] {
    & .textfield-control,
    & .textarea-control,
    & textarea {
      border-color: var(--danger-color);
    }
  }
`

/** label·description·validation을 함께 렌더하는 field 계열(textfield, textarea-field, numberfield)의 공유 규칙. */
export const textfieldStyles = [
  inputStyles,
  css`
    mm-textfield-description,
    mm-textfield-validation {
      margin: var(--space-1) 0 0;
    }

    /* 라벨을 시각적으로만 감추고 스크린리더에는 남김 (for 연결 유지) */
    :host([hidden-label]) mm-textfield-label {
      ${visuallyHiddenStyles};
    }
  `,
]
