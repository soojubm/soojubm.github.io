/**
 * button 변형(variant / size) 정의 — 프레임워크에 독립적인 "순수 데이터".
 *
 * 각 변형은 `--button-*` 토큰 또는 일반 속성을 덮어쓴다.
 */
export const buttonVariants = {
  primary: {
    '--button-border': 'var(--border-transparent)',
    'background-color': 'var(--color-primary)',
    '--button-text-color': 'var(--color-foreground-on-solid)',
  },
  secondary: {
    '--button-border': 'var(--border-transparent)',
    '--button-color': 'var(--green100)',
    '--button-text-color': 'var(--color-primary)',
  },
  tertiary: {
    '--button-text-color': 'var(--color-foreground)',
  },
  ghost: {
    '--button-border': 'var(--border-transparent)',
    '--button-color': 'transparent',
    '--button-text-color': 'var(--color-primary)',
  },
  destructive: {
    '--button-color': 'var(--red800)',
    '--button-text-color': 'var(--color-foreground-on-solid)',
  },
} as const

export const buttonSizes = {
  huge: {
    '--button-size': '64px',
    '--button-text-size': 'var(--font-size-18)',
    'padding-bottom': '5px',
  },
  large: {
    '--button-size': 'var(--size-large)',
    'min-width': 'var(--button-min-width)',
  },
} as const
