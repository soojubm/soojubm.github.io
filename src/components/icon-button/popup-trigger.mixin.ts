import { html } from 'lit'
import { property } from 'lit/decorators.js'
import type IconButton from './icon-button'

type IconButtonConstructor = new (...args: any[]) => IconButton

/**
 * 팝업·메뉴를 여닫는 트리거 버튼에 공통으로 필요한 동작을 제공합니다.
 * - expanded: 팝업 열림 상태 (aria-expanded 반영)
 * - renderControl(): aria-haspopup="true" + aria-expanded를 내부 button에 선언
 */
export const PopupTriggerMixin = <T extends IconButtonConstructor>(Base: T) => {
  class PopupTrigger extends Base {
    @property({ type: Boolean, reflect: true }) expanded = false

    protected override renderControl() {
      return html`
        <button
          slot="trigger"
          type="button"
          aria-label="${this._accessibilityLabel}"
          ?disabled="${this.disabled}"
          aria-haspopup="true"
          aria-expanded="${this.expanded ? 'true' : 'false'}"
        >
          <mm-icon name="${this.icon}"></mm-icon>
        </button>
      `
    }
  }
  return PopupTrigger
}
