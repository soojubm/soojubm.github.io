import { LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { buildAttributeRules } from '@/utils/attribute-styles'
import {
  dotVariantMap,
  tagToneStyles,
  type DotVariant,
  type TagTone,
} from '@/components/tag/tag.styles'

const toneTokens = Object.fromEntries(
  Object.entries(tagToneStyles)
    .filter(([tone]) => tone !== 'default')
    .map(([tone, style]) => [tone, { '--dot-background-color': style.background }]),
)

const variantTokens = Object.fromEntries(
  Object.entries(dotVariantMap).map(([variant, tone]) => [
    variant,
    { '--dot-background-color': tagToneStyles[tone as TagTone].background },
  ]),
)

@customElement('mm-dot')
export class Dot extends LitElement {
  static styles = css`
    :host {
      --dot-size: 8px;
      --dot-background-color: var(--foreground-subtle-color);

      display: inline-block;
      flex-shrink: 0;
      width: var(--dot-size);
      height: var(--dot-size);
      border-radius: 50%;
      background-color: var(--dot-background-color);
    }

    ${unsafeCSS(buildAttributeRules('tone', toneTokens))}
    ${unsafeCSS(buildAttributeRules('variant', variantTokens))}
  `

  @property({ type: String, reflect: true, useDefault: true }) tone: TagTone = 'default'
  @property({ type: String, reflect: true }) variant?: DotVariant
}

export default Dot
