import type { OpenState } from '@/utils/open-state'
import type { ReactiveControllerHost } from 'lit'

import { MEDIA_QUERY } from '@/constants'
import { MediaQueryController } from '@/controllers/media-query-controller'

type Host = ReactiveControllerHost & OpenState

/**
 * 넓은 화면에서는 popover로, 좁은 화면에서는 sheet로 목록을 여는 컴포넌트(mm-select, mm-more-menu)가
 * 열릴 표면을 고르게 하는 ReactiveController.
 * 두 표면은 backdrop·스크롤 잠금·포커스 가두기를 쥐는 방식이 달라 한 표면을 CSS로 갈아입힐 수 없으므로 표면 컴포넌트 자체를 갈아 끼운다.
 * 열림 상태는 컴포넌트가 `open`으로 소유하고 두 표면이 나눠 갖지 않는다. 이 컨트롤러는 그 값을 읽어
 * 화면 폭에 맞는 표면에만 열림을 내려주고, 표면이 스스로 닫히면 컴포넌트의 상태를 맞춘다.
 * 트리거·목록 템플릿은 사용하는 컴포넌트마다 달라 그 컴포넌트가 그린다.
 */
export class AdaptiveOverlayController {
  private media: MediaQueryController

  constructor(private host: Host) {
    this.media = new MediaQueryController(host, MEDIA_QUERY.compact)
  }

  /** 좁은 화면이라 sheet가 목록을 맡는지 여부 */
  get isViewportCompact() {
    return this.media.matches
  }

  /** 넓은 화면에서 popover가 열려야 하는지 */
  get popoverOpen() {
    return !this.isViewportCompact && this.host.open
  }

  /** 좁은 화면에서 sheet가 열려야 하는지 */
  get sheetOpen() {
    return this.isViewportCompact && this.host.open
  }

  // popover·sheet는 외부 클릭·ESC·닫기 버튼으로 스스로 닫히므로, 표면이 알리는 toggle 이벤트의 open 값으로 컴포넌트의 상태를 맞춘다.
  // Lit은 템플릿 리스너를 컴포넌트를 this로 두고 부르므로, 템플릿에 넘기는 핸들러는 화살표 함수로 둔다.
  handleOverlayToggle = (event: CustomEvent<{ open: boolean }>) => {
    if (event.detail.open) this.host.show()
    else this.host.close()
  }
}
