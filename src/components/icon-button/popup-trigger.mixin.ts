import { LitElement, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'

type Constructor<T = {}> = new (...args: any[]) => T

/**
 * 팝업·메뉴를 여닫는 트리거 버튼에 공통으로 필요한 동작을 제공합니다.
 *
 * - expanded: 팝업 열림 상태 (aria-expanded 반영)
 * - 호스트에 aria-haspopup="true" / aria-expanded를 세팅합니다.
 *   inner button으로의 포워딩은 베이스 컴포넌트가 책임집니다.
 */
export const PopupTriggerMixin = <T extends Constructor<LitElement>>(Base: T) => {
  class PopupTrigger extends Base {
    @property({ type: Boolean, reflect: true }) expanded = false

    override connectedCallback() {
      super.connectedCallback()
      this.setAttribute('aria-haspopup', 'true')
    }

    override willUpdate(changed: PropertyValues<this>) {
      super.willUpdate(changed)
      if ((changed as Map<string, unknown>).has('expanded')) {
        this.setAttribute('aria-expanded', this.expanded ? 'true' : 'false')
      }
    }
  }
  return PopupTrigger
}
