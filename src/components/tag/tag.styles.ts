import { css } from 'lit'

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
    background: 'var(--color-background)',
    color: 'var(--color-foreground)',
    borderColor: 'var(--color-border)',
  },
  gold: {
    background: 'var(--color-accent)',
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
 * component styles
 * --------------------------------------------------
 */

export const tagStyles = css`
  :host {
    --tag-height: var(--size-small);
    --tag-padding-inline: var(--space-2);
    --tag-gap: var(--space-1);
    --tag-border: var(--border);
    --tag-border-color: var(--color-border);
    --tag-border-radius: var(--radius);
    --tag-background-color: var(--color-background);
    --tag-color: var(--color-foreground);
    --tag-text-size: var(--font-size-12);

    display: inline-flex;
    align-items: center;
    width: fit-content;
    min-height: var(--tag-height);
    gap: var(--tag-gap);
    padding-inline: var(--tag-padding-inline);
    border: var(--tag-border);
    border-color: var(--tag-border-color);
    border-radius: var(--tag-border-radius);
    box-sizing: border-box;
    background-color: var(--tag-background-color);
    color: var(--tag-color);
    white-space: nowrap;
    font-size: var(--tag-text-size);
    line-height: 1;
  }

  :host([tone='default']) {
    --tag-background-color: var(--color-background);
    --tag-color: var(--color-foreground);
    --tag-border-color: var(--color-border);
  }

  :host([tone='gold']) {
    --tag-background-color: var(--color-accent);
    --tag-color: var(--color-foreground);
    --tag-border-color: var(--color-accent-border);
  }

  :host([tone='green']) {
    --tag-background-color: var(--tag-category-2-bg);
    --tag-color: var(--tag-category-2-text);
    --tag-border-color: var(--tag-category-2-border);
  }

  :host([tone='yellow']) {
    --tag-background-color: var(--tag-category-6-bg);
    --tag-color: var(--tag-category-6-text);
    --tag-border-color: var(--tag-category-6-border);
  }

  :host([tone='red']) {
    --tag-background-color: var(--tag-category-7-bg);
    --tag-color: var(--tag-category-7-text);
    --tag-border-color: var(--tag-category-7-border);
  }

  :host([tone='blue']) {
    --tag-background-color: var(--tag-category-1-bg);
    --tag-color: var(--tag-category-1-text);
    --tag-border-color: var(--tag-category-1-border);
  }

  :host([tone='purple']) {
    --tag-background-color: var(--tag-category-8-bg);
    --tag-color: var(--tag-category-8-text);
    --tag-border-color: var(--tag-category-8-border);
  }

  :host([tone='pink']) {
    --tag-background-color: var(--tag-category-3-bg);
    --tag-color: var(--tag-category-3-text);
    --tag-border-color: var(--tag-category-3-border);
  }

  :host([tone='orange']) {
    --tag-background-color: var(--tag-category-4-bg);
    --tag-color: var(--tag-category-4-text);
    --tag-border-color: var(--tag-category-4-border);
  }

  :host([tone='cyan']) {
    --tag-background-color: var(--tag-category-5-bg);
    --tag-color: var(--tag-category-5-text);
    --tag-border-color: var(--tag-category-5-border);
  }
`
