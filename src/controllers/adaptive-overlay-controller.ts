import type { ReactiveControllerHost } from 'lit'

import { MEDIA_QUERY } from '@/constants'
import { MediaQueryController } from '@/controllers/media-query-controller'

/**
 * 넓은 화면에서는 popover로, 좁은 화면에서는 sheet로 목록을 여는 컴포넌트(mm-select, mm-more-menu)의 열림 상태를 소유한다.
 * 두 표면은 backdrop·스크롤 잠금·포커스 가두기를 쥐는 방식이 달라 한 표면을 CSS로 갈아입힐 수 없으므로 표면 컴포넌트 자체를 갈아 끼운다.
 * 그래서 열림 상태는 두 표면이 나눠 갖지 않고 이 컨트롤러가 갖고, 호스트는 open·compact·trigger를 읽어 두 표면과 트리거에 내려준다.
 * 열림 상태를 이 컨트롤러가 소유하므로 트리거는 aria-controls로 표면을 가리키지 않고 호스트가 handleTriggerClick으로 직접 배선한다.
 * 걸면 표면의 DisclosureController가 같은 클릭을 또 토글하기 때문이다. 마지막으로 누른 트리거는 popover의 기준 요소가 된다.
 * 트리거·목록 템플릿은 호스트마다 달라 호스트가 그린다.
 */
export class AdaptiveOverlayController {
  private media: MediaQueryController
  private isOpen = false
  private triggerElement?: HTMLElement

  constructor(private host: ReactiveControllerHost) {
    // 표면이 갈리면 트리거 배선도 새 표면으로 옮겨가므로, 열린 채로 넘어가지 않게 렌더 전에 닫는다.
    this.media = new MediaQueryController(host, MEDIA_QUERY.compact, () => {
      this.isOpen = false
    })
  }

  get open() {
    return this.isOpen
  }

  /** 마지막으로 누른 트리거. popover가 이 요소의 화면 좌표를 기준으로 놓인다. */
  get trigger() {
    return this.triggerElement
  }

  /** 좁은 화면이라 sheet가 목록을 맡는지 여부 */
  get compact() {
    return this.media.matches
  }

  close() {
    this.setOpen(false)
  }

  // Lit은 템플릿 리스너를 호스트를 this로 두고 부르므로, 템플릿에 넘기는 핸들러는 화살표 함수로 둔다.
  // 열림 상태를 이 컨트롤러가 소유하므로 호스트 트리거가 직접 연다. 트리거에는 aria-controls를 걸지 않는다.
  handleTriggerClick = (event: Event) => {
    this.triggerElement = event.currentTarget as HTMLElement
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
