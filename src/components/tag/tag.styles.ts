import { css, unsafeCSS } from 'lit'

type ToneStyle = {
  background: string
  color: string
  borderColor: string
}

const categoryTone = (token: number): ToneStyle => ({
  background: `var(--tag-category-${token}-bg)`,
  color: `var(--tag-category-${token}-text)`,
  borderColor: `var(--tag-category-${token}-border)`,
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
    background: 'transparent',
    color: 'var(--color-foreground)',
    borderColor: 'var(--color-border)',
  },
  gold: {
    background: 'var(--yellow800)',
    color: 'var(--color-foreground)',
    borderColor: 'var(--color-accent-border)',
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

/**
 * --------------------------------------------------
 * tone css generator
 * --------------------------------------------------
 */

const toneCss = Object.entries(tagToneStyles)
  .map(
    ([tone, styles]) => `
    :host([tone='${tone}']) span,
    :host([tone='${tone}']) time {
      background: ${styles.background};
      color: ${styles.color};
      border-color: ${styles.borderColor};
    }
  `,
  )
  .join('\n')

/**
 * --------------------------------------------------
 * component styles
 * --------------------------------------------------
 */

export const tagStyles = css`
  :host {
    display: inline-flex;
    --tag-size: var(--size-small);
    --tag-padding-inline: var(--space-2);
    --tag-gap: var(--space-1);
    --tag-radius: var(--radius);
    --tag-font-size: var(--font-size-12);

    --tag-category-1-bg: var(--color-blue-50, #dbeafe);
    --tag-category-1-border: var(--color-blue-200, #93c5fd);
    --tag-category-1-text: var(--color-blue-700, #1d4ed8);
    --tag-category-2-bg: var(--color-green-50, #dcfce7);
    --tag-category-2-border: var(--color-green-200, #86efac);
    --tag-category-2-text: var(--color-green-700, #166534);
    --tag-category-3-bg: var(--color-pink-50, #fce7f3);
    --tag-category-3-border: var(--color-pink-200, #f9a8d4);
    --tag-category-3-text: var(--color-pink-700, #be185d);
    --tag-category-4-bg: var(--color-orange-50, #ffedd5);
    --tag-category-4-border: var(--color-orange-200, #fdba74);
    --tag-category-4-text: var(--color-orange-700, #c2410c);
    --tag-category-5-bg: var(--color-cyan-50, #cffafe);
    --tag-category-5-border: var(--color-cyan-200, #67e8f9);
    --tag-category-5-text: var(--color-cyan-700, #0e7490);
    --tag-category-6-bg: var(--color-yellow-50, #fef3c7);
    --tag-category-6-border: var(--color-yellow-200, #fcd34d);
    --tag-category-6-text: var(--color-yellow-700, #92400e);
    --tag-category-7-bg: var(--color-red-50, #fee2e2);
    --tag-category-7-border: var(--color-red-200, #fca5a5);
    --tag-category-7-text: var(--color-red-700, #991b1b);
    --tag-category-8-bg: var(--color-purple-50, #f3e8ff);
    --tag-category-8-border: var(--color-purple-200, #d8b4fe);
    --tag-category-8-text: var(--color-purple-700, #7e22ce);
  }

  span,
  time {
    display: inline-flex;
    align-items: center;
    gap: var(--tag-gap);
    min-height: var(--tag-size);
    padding-inline: var(--tag-padding-inline);
    border-radius: var(--tag-radius);
    border: var(--border-transparent);
    box-sizing: border-box;
    white-space: nowrap;
    font-size: var(--tag-font-size);
    font-weight: var(--font-weight);
    line-height: 1;
  }
  // slot[name='icon']::slotted(*) {
  //   inline-size: 0.875rem;
  //   block-size: 0.875rem;
  //   flex-shrink: 0;
  // }

  ${unsafeCSS(toneCss)}

  /* brutal: 톤별 색상 보더를 --brutal-border-color(#000)로 통일 */
  :host-context([data-theme='brutal']) span,
  :host-context([data-theme='brutal']) time {
    border-color: var(--brutal-border-color);
  }
`
