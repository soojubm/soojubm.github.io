import type { ReactiveController, ReactiveControllerHost } from 'lit'

interface TransientFlagControllerOptions {
  /** 활성 상태 지속 시간(ms) */
  duration: number
  /** 활성 상태가 바뀔 때 호출된다. */
  onChange: (active: boolean) => void
}

/**
 * 잠깐 켜졌다가 일정 시간 뒤 스스로 꺼지는 상태(복사 성공 표시 등)를 관리하는 ReactiveController.
 * host 분리 시 예약된 타이머를 정리한다.
 */
export class TransientFlagController implements ReactiveController {
  private timer = 0

  constructor(
    private host: ReactiveControllerHost,
    private options: TransientFlagControllerOptions,
  ) {
    host.addController(this)
  }

  trigger() {
    this.clear()
    this.options.onChange(true)
    this.timer = window.setTimeout(() => {
      this.timer = 0
      this.options.onChange(false)
    }, this.options.duration)
  }

  hostDisconnected() {
    this.clear()
  }

  private clear() {
    if (this.timer) window.clearTimeout(this.timer)
    this.timer = 0
  }
}
