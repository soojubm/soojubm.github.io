import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/text/text'
import { dotStyles, dotToneTokens } from '@/components/common/dot/dot.styles'
import { type TagTone } from '@/components/common/tag/tag.styles'
import { buildAttributeRules } from '@/utils'

export const progressDotToneMap = {
  todo: 'default',
  'in-progress': 'blue',
  done: 'green',
  blocked: 'red',
} as const satisfies Record<string, TagTone>

export type ProgressDotVariant = keyof typeof progressDotToneMap

const variantTokens = Object.fromEntries(
  Object.entries(progressDotToneMap).map(([variant, tone]) => [
    variant,
    dotToneTokens(tone),
  ]),
)

/**
 * 작업이 어느 단계에 있는지 점과 라벨로 보이는 표시.
 * 점의 색이 단계를 가르고 이름은 라벨이 맡으므로, 점은 보조 기술에 드러내지 않는다.
 */
@customElement('mm-progress-dot')
export class ProgressDot extends LitElement {
  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1);
      white-space: nowrap;
    }

    .dot {
      ${dotStyles}
    }

    ${unsafeCSS(buildAttributeRules('variant', variantTokens, '.dot'))}
  `
  @property({ type: String, reflect: true, useDefault: true }) variant: ProgressDotVariant = 'todo'

  render() {
    return html`
      <span class="dot" aria-hidden="true"></span>
      <mm-text size="12">
        <slot>${this.variant}</slot>
      </mm-text>
    `
  }
}
