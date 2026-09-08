import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import '@/components/common/icon/icon'
import { ICON_NAMES } from '@/components/common/icon/icon-names'
import { resetStyles } from '@/stylesheets/shared.styles'

/**
 * 펼침/접힘 상태를 나타내는 장식용 방향 표시.
 * 열고 닫는 상호작용은 트리거(버튼·메뉴 항목)가 소유하고, 이 요소는 expanded 상태만 받아 아이콘 회전으로 반영한다.
 */
@customElement('mm-expand-indicator')
export class ExpandIndicator extends LitElement {
  static styles = [
    resetStyles,
    css`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--size-24);
        height: var(--size-24);
      }

      :host([expanded]) mm-icon {
        transform: rotate(180deg);
      }
    `,
  ]

  @property({ type: Boolean, reflect: true }) expanded = false
  @property({ type: String, attribute: 'aria-hidden', reflect: true }) ariaHidden = 'true'

  render() {
    return html`
      <mm-icon name=${ICON_NAMES.EXPAND}></mm-icon>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'mm-expand-indicator': ExpandIndicator
  }
}
