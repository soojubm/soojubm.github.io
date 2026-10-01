import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { toastStyles } from '@/components/overlay/toast/toast.styles'
import { PortalController } from '@/controllers/portal-controller'
import { ScheduleController } from '@/controllers/schedule-controller'
import { withOpenState } from '@/utils/open-state'

// 스스로 닫히기까지의 표시 시간(ms). transient 동작은 내부 책임이라 prop으로 노출하지 않는다.
const DURATION = 3000

/**
 * 화면 하단 중앙에 잠깐 떠올랐다 스스로 사라지는 transient non-modal 레이어.
 * mm-sheet처럼 열림 상태(open/close)를 스스로 소유하고 portal 컨테이너로 옮겨지되, backdrop·스크롤 잠금 없이
 * 배경 상호작용을 막지 않고, 표시 시간이 지나면 스스로 닫힙니다.
 * 포인터가 올라와 있거나 포커스가 들어와 있는 동안은 읽거나 조작 중이므로 시간을 멈추고, 벗어나면 처음부터 다시 잽니다.
 * portal로 옮기는 이유: 조상의 쌓임 맥락에 갇히지 않고, 모달이 열려 본문이 inert가 된 동안에도 알림이 읽히게 한다.
 */
@customElement('mm-toast')
export class Toast extends withOpenState(LitElement) {
  static styles = toastStyles
  private hideTimer = new ScheduleController(this, () => this.close(), { delay: DURATION })
  private engagedBy = new Set<'hover' | 'focus'>()
  private portal = new PortalController(this)

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'status')
    this.addEventListener('mouseenter', this.handleHostEnter)
    this.addEventListener('focusin', this.handleHostEnter)
    this.addEventListener('mouseleave', this.handleHostLeave)
    this.addEventListener('focusout', this.handleHostLeave)
  }

  render() {
    return html`
      <slot></slot>
    `
  }

  // 리스너는 연결과 함께 생성되므로 연결 해제 시 대칭으로 정리한다.
  disconnectedCallback() {
    this.removeEventListener('mouseenter', this.handleHostEnter)
    this.removeEventListener('focusin', this.handleHostEnter)
    this.removeEventListener('mouseleave', this.handleHostLeave)
    this.removeEventListener('focusout', this.handleHostLeave)
    super.disconnectedCallback()
  }

  override show() {
    super.show()
    this.restartTimer()
  }

  override close() {
    this.hideTimer.cancel()
    this.engagedBy.clear()
    super.close()
  }

  private handleHostEnter = (event: Event) => {
    this.engagedBy.add(event.type === 'mouseenter' ? 'hover' : 'focus')
    this.hideTimer.cancel()
  }
  // 포인터와 포커스 중 하나라도 남아 있으면 계속 멈춰 둔다.
  private handleHostLeave = (event: Event) => {
    this.engagedBy.delete(event.type === 'mouseleave' ? 'hover' : 'focus')
    if (!this.open) return

    this.restartTimer()
  }

  // 열려 있을 때 다시 열면 남은 시간을 초기화한다. 읽거나 조작 중이면 시간을 재지 않는다.
  private restartTimer() {
    if (this.engagedBy.size > 0) {
      this.hideTimer.cancel()
      return
    }

    this.hideTimer.request()
  }
}
