import { LitElement } from 'lit'
import { property } from 'lit/decorators.js'

import type { Constructor } from '@/utils'

export interface OpenState {
  open: boolean
  show(): void
  close(): void
  toggle(): void
}

/**
 * 열고 닫히는 표면(sheet·dialog·popover·toast·sidebar)이 공유하는 공개 API.
 * 열림 상태는 reflect되는 open 속성 하나로 나타내고, 네이티브 dialog·popover처럼 show·close·toggle 메서드를 함께 둔다.
 * 열고 닫을 때 할 일이 있는 표면(toast의 자동 닫힘 타이머 등)은 메서드를 덮어쓰고 super를 부른다.
 * toggle은 open을 직접 바꾸지 않고 show·close를 거쳐, 덮어쓴 동작이 토글에서도 그대로 실행되게 한다.
 */
export const withOpenState = <T extends Constructor<LitElement>>(Base: T) => {
  class OpenStateElement extends Base {
    @property({ type: Boolean, reflect: true }) open = false

    show() {
      this.open = true
    }

    close() {
      this.open = false
    }

    toggle() {
      if (this.open) {
        this.close()
        return
      }

      this.show()
    }
  }

  return OpenStateElement as Constructor<OpenState> & T
}
