import { css, unsafeCSS } from 'lit'

import { buildAttributeRules } from '@/utils'

type ToneStyle = {
  background: string
  textColor: string
  border: string
  /** 테두리 색만 따로 소비하는 곳(dot 등)을 위한 값. */
  borderColor: string
}

const categoryTone = (token: number): ToneStyle => {
  const borderColor = `var(--category-${token}-border-color)`

  return {
    background: `var(--category-${token}-background-color)`,
    textColor: `var(--category-${token}-text-color)`,
    border: `var(--border-width) solid ${borderColor}`,
    borderColor,
  }
}

const defineToneMap = <Map extends Record<string, TagTone>>(map: Map) => map

/**
 * --------------------------------------------------
 * primitive visual tones
 * purely visual layer
 * --------------------------------------------------
 */

export const tagToneStyles = {
  default: {
    background: 'var(--background-color)',
    textColor: 'var(--foreground-color)',
    border: 'var(--border)',
    borderColor: 'var(--border-color)',
  },
  gold: {
    background: 'var(--accent-color)',
    textColor: 'var(--gray800)',
    border: 'var(--border-transparent)',
    /* 테두리는 투명하지만, 색만 쓰는 곳은 같은 계열인 yellow의 값을 따른다. */
    borderColor: 'var(--category-6-border-color)',
  },
  green: categoryTone(2),
  yellow: categoryTone(6),
  red: categoryTone(7),
  blue: categoryTone(1),
  purple: categoryTone(8),
  pink: categoryTone(3),
  orange: categoryTone(4),
  cyan: categoryTone(5),
} as const

export type TagTone = keyof typeof tagToneStyles

/**
 * --------------------------------------------------
 * semantic mappings
 * --------------------------------------------------
 */

export const statusToneMap = defineToneMap({
  success: 'green' as const,
  warning: 'yellow' as const,
  error: 'red' as const,
  info: 'blue' as const,
  neutral: 'default' as const,
})

export type StatusVariant = keyof typeof statusToneMap

export const progressToneMap = defineToneMap({
  todo: 'default' as const,
  'in-progress': 'blue' as const,
  done: 'green' as const,
  blocked: 'red' as const,
})

export type ProgressVariant = keyof typeof progressToneMap

/** 상태 톤(green·yellow·red·blue)은 의미를 전하는 색이라 category 색으로 쓰지 않는다. */
export type CategoryTone = 'pink' | 'orange' | 'cyan' | 'purple'

/**
 * --------------------------------------------------
 * component styles
 * --------------------------------------------------
 */

const tagToneTokens = Object.fromEntries(
  Object.entries(tagToneStyles).map(([tone, style]) => [
    tone,
    {
      '--tag-background-color': style.background,
      '--tag-text-color': style.textColor,
      '--tag-border': style.border,
    },
  ]),
)

export const tagStyles = css`
  :host {
    --tag-height: var(--size-24);
    --tag-padding-inline: var(--space-2);
    --tag-gap: var(--space-1);
    --tag-border: var(--border);
    --tag-border-radius: var(--radius);
    --tag-background-color: var(--background-color);
    --tag-text-color: var(--foreground-color);
    --tag-text-size: var(--font-size-12);

    display: inline-flex;
    align-items: center;
    /* baseline 정렬이면 첫 자식(글자 없는 아이콘 등)에 따라 줄 위치가 달라지므로 자기 중앙으로 맞춘다. */
    vertical-align: middle;
    width: fit-content;
    min-height: var(--tag-height);
    gap: var(--tag-gap);
    padding-inline: var(--tag-padding-inline);
    border: var(--tag-border);
    border-radius: var(--tag-border-radius);
    box-sizing: border-box;
    background-color: var(--tag-background-color);
    color: var(--tag-text-color);
    white-space: nowrap;
    font-size: var(--tag-text-size);
    line-height: 1;
  }

  ${unsafeCSS(buildAttributeRules('tone', tagToneTokens))}
`
