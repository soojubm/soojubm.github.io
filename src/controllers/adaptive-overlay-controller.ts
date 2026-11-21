import type { OpenState } from '@/utils/open-state'
import type { ReactiveControllerHost } from 'lit'

import { MEDIA_QUERY } from '@/constants'
import { MediaQueryController } from '@/controllers/media-query-controller'

type Host = ReactiveControllerHost & OpenState

/**
 * 넓은 화면에서는 popover로, 좁은 화면에서는 sheet로 목록을 여는 컴포넌트(mm-select, mm-more-menu)가 열릴 표면을 고르는 컨트롤러.
 * 열림 상태는 컴포넌트의 `open`이 쥐고, 이 컨트롤러는 화면 폭에 맞는 표면에만 열림을 내려준다. 표면이 스스로 닫히면 컴포넌트의 상태를 맞춘다.
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

  // 표면이 스스로 닫히면(외부 클릭·ESC·닫기 버튼) toggle 이벤트로 컴포넌트의 상태를 맞춘다.
  // 화면 폭이 바뀌어 물러나는 표면의 닫힘은 무시하려고 활성 표면의 이벤트만 반영한다.
  // 템플릿에 넘기는 핸들러는 Lit이 컴포넌트를 this로 부르므로 화살표 함수로 둔다.
  handlePopoverToggle = (event: CustomEvent<{ open: boolean }>) => {
    if (this.isViewportCompact) return

    this.syncOpen(event.detail.open)
  }

  handleSheetToggle = (event: CustomEvent<{ open: boolean }>) => {
    if (!this.isViewportCompact) return

    this.syncOpen(event.detail.open)
  }

  private syncOpen(open: boolean) {
    if (open) this.host.show()
    else this.host.close()
  }
}
