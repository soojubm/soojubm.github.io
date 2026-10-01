import type { ReactiveController, ReactiveControllerHost } from 'lit'

/**
 * 다음 프레임에 한 번 실행할 작업을 예약하는 ReactiveController.
 *
 * 같은 프레임에 여러 번 요청하면 마지막 요청만 실행하므로, 렌더·리사이즈마다 쏟아지는 요청을
 * 한 번의 측정이나 스타일 쓰기로 합친다. host가 분리되면 예약을 취소해 분리된 뒤에 작업이 돌지 않는다.
 */
export class FrameController implements ReactiveController {
  private frame = 0

  constructor(host: ReactiveControllerHost, private callback: () => void) {
    host.addController(this)
  }

  request() {
    cancelAnimationFrame(this.frame)
    this.frame = requestAnimationFrame(() => {
      this.frame = 0
      this.callback()
    })
  }

  hostDisconnected() {
    cancelAnimationFrame(this.frame)
    this.frame = 0
  }
}
