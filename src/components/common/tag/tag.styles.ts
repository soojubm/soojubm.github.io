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

export const categoryToneMap = defineToneMap({
  music: 'purple' as const,
  finance: 'green' as const,
  design: 'pink' as const,
  engineering: 'blue' as const,
  marketing: 'orange' as const,
  news: 'cyan' as const,
  lifestyle: 'yellow' as const,
  sports: 'red' as const,
})

export type Category = keyof typeof categoryToneMap

export const dotVariantMap = defineToneMap({
  live: 'red' as const,
  online: 'green' as const,
  new: 'gold' as const,
  unread: 'blue' as const,
})

export type DotVariant = keyof typeof dotVariantMap

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
