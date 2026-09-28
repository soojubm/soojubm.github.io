import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { MEDIA_QUERY } from '@/constants'
import { MediaQueryController } from '@/controllers/media-query-controller'

/**
 * 넓은 화면에서는 popover로, 좁은 화면에서는 sheet로 목록을 여는 컴포넌트(mm-select, mm-more-menu)의 열림 상태를 소유한다.
 * 두 표면은 backdrop·portal·스크롤 잠금을 쥐는 방식이 달라 한 표면을 CSS로 갈아입힐 수 없으므로 표면 컴포넌트 자체를 갈아 끼운다.
 * 그래서 열림 상태는 두 표면이 나눠 갖지 않고 이 컨트롤러가 갖고, 호스트는 open·compact를 읽어 두 표면과 트리거에 내려준다.
 * 트리거·목록 템플릿은 호스트마다 달라 호스트가 그린다.
 */
export class AdaptiveOverlayController implements ReactiveController {
  private media: MediaQueryController
  private wasCompact: boolean
  private isOpen = false

  constructor(private host: ReactiveControllerHost) {
    this.media = new MediaQueryController(host, MEDIA_QUERY.compact)
    this.wasCompact = this.media.matches
    host.addController(this)
  }

  get open() {
    return this.isOpen
  }

  /** 좁은 화면이라 sheet가 목록을 맡는지 여부 */
  get compact() {
    return this.media.matches
  }

  // 표면이 갈리면 트리거 배선도 새 표면으로 옮겨가므로, 열린 채로 넘어가지 않게 렌더 직전에 닫는다.
  hostUpdate() {
    if (this.compact === this.wasCompact) return

    this.wasCompact = this.compact
    this.isOpen = false
  }

  close() {
    this.setOpen(false)
  }

  // Lit은 템플릿 리스너를 호스트를 this로 두고 부르므로, 템플릿에 넘기는 핸들러는 화살표 함수로 둔다.
  // popover는 slot=trigger의 클릭을 스스로 배선하지만, portal로 옮겨진 sheet는 트리거를 찾을 수 없어 호스트 트리거가 직접 연다.
  handleTriggerClick = () => {
    this.setOpen(!this.isOpen)
  }
  // popover·sheet는 외부 클릭·ESC·닫기 버튼으로 스스로 닫히므로, 표면이 디스패치하는 toggle 이벤트의 open 값으로 상태를 맞춘다.
  handleOverlayToggle = (event: CustomEvent<{ open: boolean }>) => {
    this.setOpen(event.detail.open)
  }

  private setOpen(open: boolean) {
    if (open === this.isOpen) return

    this.isOpen = open
    this.host.requestUpdate()
  }
}
