import { css, unsafeCSS } from 'lit'

/**
 * --------------------------------------------------
 * primitive visual tones
 * purely visual layer
 * --------------------------------------------------
 */

export const tagToneStyles = {
  gray: {
    background: 'var(--color-background-subtle)',
    color: 'var(--color-foreground)',
    borderColor: 'var(--color-border)',
  },

  green: {
    background: '#dcfce7',
    color: '#166534',
    borderColor: '#86efac',
  },

  yellow: {
    background: '#fef3c7',
    color: '#92400e',
    borderColor: '#fcd34d',
  },

  red: {
    background: '#fee2e2',
    color: '#991b1b',
    borderColor: '#fca5a5',
  },

  blue: {
    background: '#dbeafe',
    color: '#1d4ed8',
    borderColor: '#93c5fd',
  },

  purple: {
    background: '#f3e8ff',
    color: '#7e22ce',
    borderColor: '#d8b4fe',
  },

  pink: {
    background: '#fce7f3',
    color: '#be185d',
    borderColor: '#f9a8d4',
  },

  orange: {
    background: '#ffedd5',
    color: '#c2410c',
    borderColor: '#fdba74',
  },

  cyan: {
    background: '#cffafe',
    color: '#0e7490',
    borderColor: '#67e8f9',
  },
} as const

export type TagTone = keyof typeof tagToneStyles

/**
 * --------------------------------------------------
 * semantic mappings
 * --------------------------------------------------
 */

export const statusToneMap = {
  success: 'green',
  warning: 'yellow',
  error: 'red',
  info: 'blue',
  neutral: 'gray',
} as const satisfies Record<string, TagTone>

export type StatusVariant = keyof typeof statusToneMap

export const categoryToneMap = {
  music: 'purple',
  finance: 'green',
  design: 'pink',
  engineering: 'blue',
  marketing: 'orange',
  news: 'cyan',
  lifestyle: 'yellow',
  sports: 'red',
} as const satisfies Record<string, TagTone>

export type Category = keyof typeof categoryToneMap

/**
 * --------------------------------------------------
 * tone css generator
 * --------------------------------------------------
 */

const toneCss = Object.entries(tagToneStyles)
  .map(([tone, styles]) => {
    return `
      [data-tone='${tone}'] {
        background: ${styles.background};
        color: ${styles.color};
        border-color: ${styles.borderColor};
      }
    `
  })
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
  }

  span,
  time {
    display: inline-flex;
    align-items: center;
    gap: var(--tag-gap);
    min-height: var(--tag-size);
    padding-inline: var(--tag-padding-inline);
    border-radius: var(--tag-radius);
    border: 1px solid transparent;
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
`