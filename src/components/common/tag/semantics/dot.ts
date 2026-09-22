import { LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  dotVariantMap,
  tagToneStyles,
  type DotVariant,
  type TagTone,
} from '@/components/common/tag/tag.styles'
import { buildAttributeRules } from '@/utils'

/**
 * 점은 면이 작아 글자 뒤에 까는 배경 틴트로는 색이 드러나지 않는다.
 * tone이 테두리로 쓰는 값을 채운다.
 */
const toneFill = (tone: TagTone) => tagToneStyles[tone].borderColor

const toneTokens = Object.fromEntries(
  Object.entries(tagToneStyles)
    .filter(([tone]) => tone !== 'default')
    .map(([tone]) => [tone, { '--dot-background-color': toneFill(tone as TagTone) }]),
)

const variantTokens = Object.fromEntries(
  Object.entries(dotVariantMap).map(([variant, tone]) => [
    variant,
    { '--dot-background-color': toneFill(tone as TagTone) },
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
