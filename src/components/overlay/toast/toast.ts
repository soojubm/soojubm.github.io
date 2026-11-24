import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

import { toastStyles } from '@/components/overlay/toast/toast.styles'
import { PortalController } from '@/controllers/portal-controller'
import { ScheduleController } from '@/controllers/schedule-controller'
import { withOpenState } from '@/utils/open-state'

// 스스로 닫히기까지의 표시 시간(ms). transient 동작은 내부 책임이라 prop으로 노출하지 않는다.
const DURATION = 3000

@customElement('mm-toast')
export class Toast extends withOpenState(LitElement) {
  static styles = toastStyles
  private hideTimer = new ScheduleController(this, () => this.close(), { delay: DURATION })
  private engagedBy = new Set<'hover' | 'focus'>()
  private portal = new PortalController(this)

  constructor() {
    super()
    // 리스너 대상이 host 자신이라 연결이 바뀌어도 유지되므로 생성자에서 한 번만 등록한다.
    this.addEventListener('mouseenter', this.handleHostEnter)
    this.addEventListener('focusin', this.handleHostEnter)
    this.addEventListener('mouseleave', this.handleHostLeave)
    this.addEventListener('focusout', this.handleHostLeave)
  }

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'status')
  }

  render() {
    return html`
      <slot></slot>
    `
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
