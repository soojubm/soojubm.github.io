import { css, unsafeCSS } from 'lit'

import type { AvatarSize, AvatarVariant } from '@/components/common/avatar/avatar'
import { tagToneStyles, type CategoryTone } from '@/components/common/tag/tag.styles'

import { buildAttributeRules, type AttributeTokens } from '@/utils'

const avatarSizeTokens: AttributeTokens<Exclude<AvatarSize, '40'>> = {
  '80': {
    '--avatar-width': 'var(--size-80)',
    '--avatar-height': 'var(--size-80)',
    'font-size': 'var(--font-size-32)',
  },
  '48': {
    '--avatar-width': 'var(--size-48)',
    '--avatar-height': 'var(--size-48)',
    'font-size': 'var(--font-size-24)',
  },
  '32': {
    '--avatar-width': 'var(--size-32)',
    '--avatar-height': 'var(--size-32)',
    'font-size': 'var(--font-size-12)',
  },
}

const avatarVariantTokens: AttributeTokens<AvatarVariant> = {
  primary: { border: 'var(--avatar-border)' },
  secondary: {
    '--avatar-background-color': 'var(--background-color)',
    '--avatar-border': 'var(--border)',
  },
  tertiary: {
    '--avatar-background-color': 'transparent',
    '--avatar-border': 'none',
    'box-shadow': 'none',
  },
}

// 태그의 category 톤 배경을 그대로 쓴다. variant가 정한 배경보다 뒤에 두어 톤이 이긴다.
const toneBackground = (tone: CategoryTone) => ({
  '--avatar-background-color': tagToneStyles[tone].background,
})

const avatarToneTokens: AttributeTokens<CategoryTone> = {
  pink: toneBackground('pink'),
  orange: toneBackground('orange'),
  cyan: toneBackground('cyan'),
  purple: toneBackground('purple'),
}

export const avatarStyles = css`
  :host {
    --avatar-width: var(--size-40);
    --avatar-height: var(--size-40);
    --avatar-background-color: var(--background-subtle-color);
    --avatar-icon-color: var(--foreground-color);
    --avatar-border: var(--border-transparent);
    --avatar-border-radius: var(--border-radius);

    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: var(--avatar-width);
    height: var(--avatar-height);
    max-height: var(--avatar-height);
    background-repeat: no-repeat;
    background-position: center;
    background-color: var(--avatar-background-color);
    border: var(--avatar-border);
    border-radius: var(--avatar-border-radius);
    box-sizing: border-box;
    position: relative;
    color: var(--avatar-icon-color);
  }

  :host([shape='circle']) {
    --avatar-border-radius: var(--border-radius-full);
  }

  ${unsafeCSS(buildAttributeRules('size', avatarSizeTokens))}

  ${unsafeCSS(buildAttributeRules('variant', avatarVariantTokens))}

  ${unsafeCSS(buildAttributeRules('tone', avatarToneTokens))}

  img {
    width: 100%;
    height: 100%;
    border-radius: var(--avatar-border-radius);
    object-fit: cover;
  }
`
