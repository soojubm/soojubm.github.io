import { css, unsafeCSS } from 'lit'

import type { StatusTone } from '@/components/common/icon/icon-names'

import { buildAttributeRules } from '@/utils'

type ToneStyle = {
  background: string
  textColor?: string
  border?: string
}

const categoryTone = (token: number): ToneStyle => ({
  background: `var(--category-${token}-background-color)`,
  border: 'var(--border-transparent)',
})

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
  },
  gold: {
    background: 'color-mix(in srgb, var(--accent-color) 65%, var(--background-color))',
    textColor: 'var(--gray800)',
    border: 'var(--border-transparent)',
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

export type StatusTagVariant = Extract<StatusTone, 'success' | 'warning' | 'error' | 'info'>

export const statusToneMap = defineToneMap<Record<StatusTagVariant, TagTone>>({
  success: 'green',
  warning: 'yellow',
  error: 'red',
  info: 'blue',
})

/** 상태 톤(green·yellow·red·blue)은 의미를 전하는 색이라 category 색으로 쓰지 않는다. */
export type CategoryTone = 'pink' | 'orange' | 'cyan' | 'purple'

/**
 * --------------------------------------------------
 * component styles
 * --------------------------------------------------
 */

const tagToneTokens = Object.fromEntries(
  Object.entries(tagToneStyles as Record<TagTone, ToneStyle>).map(([tone, style]) => [
    tone,
    {
      '--tag-background-color': style.background,
      ...(style.textColor && { '--tag-text-color': style.textColor }),
      ...(style.border && { '--tag-border': style.border }),
    },
  ]),
)

export const tagStyles = css`
  :host {
    --tag-height: var(--size-24);
    --tag-padding-inline: var(--space-2);
    --tag-gap: var(--space-1);
    --tag-border: var(--border);
    --tag-border-radius: var(--border-radius);
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
