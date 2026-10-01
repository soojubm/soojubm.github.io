import type { ReactiveController, ReactiveControllerHost } from 'lit'

interface ScheduleOptions {
  /** 요청한 뒤 이 시간(ms)이 지나면 실행한다. 생략하면 다음 프레임에 실행한다 */
  delay?: number
}

/**
 * 나중에 한 번 실행할 작업을 예약하는 ReactiveController.
 *
 * 요청이 겹치면 마지막 요청만 실행하므로, 렌더·리사이즈마다 쏟아지는 요청을 한 번의 측정이나
 * 스타일 쓰기로 합치고(다음 프레임), 입력이 멈출 때까지 기다리는 debounce나 자동 닫힘 같은
 * 시간 지연도 같은 규칙으로 다룬다(delay). host가 분리되면 예약을 취소해 분리된 뒤에 작업이 돌지 않는다.
 */
export class ScheduleController implements ReactiveController {
  private handle = 0

  constructor(
    host: ReactiveControllerHost,
    private callback: () => void,
    private options: ScheduleOptions = {},
  ) {
    host.addController(this)
  }

  /** 이전 예약을 취소하고 다시 예약한다. */
  request() {
    this.cancel()

    const run = () => {
      this.handle = 0
      this.callback()
    }
    if (this.options.delay === undefined) {
      this.handle = requestAnimationFrame(run)
      return
    }

    this.handle = window.setTimeout(run, this.options.delay)
  }

  /** 예약된 작업이 없어도 안전하게 부를 수 있다. */
  cancel() {
    if (!this.handle) return

    if (this.options.delay === undefined) cancelAnimationFrame(this.handle)
    else window.clearTimeout(this.handle)
    this.handle = 0
  }

  hostDisconnected() {
    this.cancel()
  }
}
