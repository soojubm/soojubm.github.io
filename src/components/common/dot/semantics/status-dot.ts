import { LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { dotStyles, dotToneTokens } from '@/components/common/dot/dot.styles'
import { type TagTone } from '@/components/common/tag/tag.styles'
import { buildAttributeRules } from '@/utils'

const statusDotToneMap = {
  live: 'red',
  online: 'green',
  new: 'gold',
  unread: 'blue',
} as const satisfies Record<string, TagTone>

export type StatusDotVariant = keyof typeof statusDotToneMap

/** variant가 곧 의미이므로 읽히는 이름도 함께 갖는다. */
const statusDotLabels: Record<StatusDotVariant, string> = {
  live: '실시간',
  online: '접속 중',
  new: '새 항목',
  unread: '읽지 않음',
}

const variantTokens = Object.fromEntries(
  Object.entries(statusDotToneMap).map(([variant, tone]) => [
    variant,
    dotToneTokens(tone),
  ]),
)

/**
 * 색 하나로 상태를 말하는 점. 자기가 의미를 가지므로 role과 읽히는 이름을 스스로 갖는다.
 */
@customElement('mm-status-dot')
export class StatusDot extends LitElement {
  static styles = css`
    :host {
      ${dotStyles}
    }

    ${unsafeCSS(buildAttributeRules('variant', variantTokens))}
  `
  @property({ type: String, reflect: true, useDefault: true }) variant: StatusDotVariant = 'online'
  @property({ type: String, attribute: 'aria-label', reflect: true }) ariaLabel = ''

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'img')
  }

  willUpdate() {
    if (this.ariaLabel) return

    this.ariaLabel = statusDotLabels[this.variant]
  }
}
