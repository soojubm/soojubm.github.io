import { css, html } from 'lit'

import type { IconName } from '@/components/common'

/** chat-suggestion·search-suggestion이 공유하는 host 레이아웃. */
export const suggestionButtonStyles = css`
  :host {
    display: inline-flex;
  }
`

/** 추천어가 알릴 값. value를 주지 않으면 슬롯에 적은 글자를 쓴다. */
export function resolveSuggestionValue(host: HTMLElement & { value: string }) {
  return host.value || host.textContent?.trim() || ''
}

/** mm-button(tertiary, small)을 감싸고 클릭을 위임하는 추천 버튼 조립. 발행 이벤트 이름만 각 컴포넌트가 소유한다. */
export function renderSuggestionButton(icon: IconName | undefined, onClick: () => void) {
  return html`
    <mm-button variant="tertiary" icon=${icon} @click=${onClick}>
      <slot></slot>
    </mm-button>
  `
}
