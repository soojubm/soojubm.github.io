import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import type { IconName } from '@/components/icon-button/semantics/icon-names'
import type { TagTone } from '@/components/tag/tag.styles'

/** tag 계열이 공유하는 mm-tag 조립 규칙. tone·icon·slot 기본값 매핑은 각 시맨틱 컴포넌트가 소유한다. */
export function renderTag(tone: TagTone, icon: IconName | undefined, fallback?: unknown) {
  return html`
    <mm-tag tone=${tone} icon=${ifDefined(icon)}>
      <slot>${fallback}</slot>
    </mm-tag>
  `
}
