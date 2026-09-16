import { LitElement, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { toastStyles } from '@/components/overlay/overlay.styles'
import { PortalController } from '@/controllers/portal-controller'

// 스스로 닫히기까지의 표시 시간(ms). transient 동작은 내부 책임이라 prop으로 노출하지 않는다.
const DURATION = 3000

/**
 * 화면 하단 중앙에 잠깐 떠올랐다 스스로 사라지는 transient non-modal 레이어.
 * mm-sheet처럼 열림 상태(open/close)를 스스로 소유하고 portal 컨테이너로 옮겨지되, backdrop·스크롤 잠금 없이
 * 배경 상호작용을 막지 않고, 표시 시간이 지나면 스스로 닫힙니다.
 * portal로 옮기는 이유: 조상의 쌓임 맥락에 갇히지 않고, 모달이 열려 본문이 inert가 된 동안에도 알림이 읽히게 한다.
 */
@customElement('mm-toast')
export class Toast extends LitElement {
  static styles = toastStyles
  @property({ type: String, reflect: true }) role = 'status'
  @property({ type: Boolean, reflect: true }) open = false
  private hideTimer: ReturnType<typeof setTimeout> | null = null
  private portal = new PortalController(this)

  render() {
    return html`
      <slot></slot>
    `
  }

  // 자동 닫힘 타이머는 열림과 함께 생성되므로 연결 해제 시 대칭으로 정리한다.
  disconnectedCallback() {
    this.clearTimer()
    super.disconnectedCallback()
  }

  show() {
    this.open = true
    this.restartTimer()
  }

  close() {
    this.clearTimer()
    this.open = false
  }

  // 열려 있을 때 다시 열면 남은 시간을 초기화한다.
  private restartTimer() {
    this.clearTimer()
    this.hideTimer = setTimeout(() => this.close(), DURATION)
  }

  private clearTimer() {
    if (!this.hideTimer) return
    clearTimeout(this.hideTimer)
    this.hideTimer = null
  }
}
