import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { ResizeController } from '@/controllers/resize-controller'
import { ScheduleController } from '@/controllers/schedule-controller'

type Host = ReactiveControllerHost & HTMLElement

interface SelectionIndicatorControllerOptions {
  getContainer?: () => HTMLElement | undefined
  getIndicator: () => HTMLElement | undefined
  getTarget: () => HTMLElement | undefined
}

/**
 * 선택된 항목 아래에 인디케이터를 놓는 ReactiveController.
 * 렌더가 끝날 때와 컨테이너·항목의 크기가 바뀔 때 위치를 다시 재며, 측정은 다음 프레임 하나로 합친다. 렌더 없이 선택이나 항목이 바뀌면 update를 직접 부른다.
 */
export class SelectionIndicatorController implements ReactiveController {
  private frame: ScheduleController
  private resize: ResizeController

  constructor(private host: Host, private options: SelectionIndicatorControllerOptions) {
    this.frame = new ScheduleController(host, () => this.syncPosition())
    this.resize = new ResizeController(host, {
      getTargets: () => this.resizeTargets,
      onResize: () => this.update(),
    })
    host.addController(this)
  }

  // 관찰 대상은 ResizeController가 렌더가 끝날 때마다 맞추므로, 여기서는 위치만 다시 잰다.
  hostUpdated() {
    this.frame.request()
  }

  // 선택이 바뀌거나 항목이 늘고 줄 때 부르므로, 관찰 대상도 그에 맞춰 다시 맞춘다.
  update = () => {
    this.resize.refresh()
    this.frame.request()
  }

  // 인디케이터는 크기를 직접 쓰므로 관찰 대상에서 뺀다. 관찰하면 쓴 크기가 다시 측정을 부른다.
  private get resizeTargets() {
    const container = this.options.getContainer?.() ?? this.host
    const indicator = this.options.getIndicator()
    const items = Array.from(container.children).filter(child => child !== indicator)
    return [container, ...items]
  }

  private syncPosition() {
    const container = this.options.getContainer?.() ?? this.host
    const indicator = this.options.getIndicator()
    const target = this.options.getTarget()
    if (!container || !indicator) return

    // 선택된 항목이 없으면 폭을 접어 숨긴다.
    if (!target) {
      indicator.style.width = '0px'
      return
    }

    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    // 컨테이너가 가로 스크롤되면 인디케이터도 스크롤 콘텐츠 기준으로 놓이므로 scrollLeft만큼 되돌린다.
    const x = targetRect.left - containerRect.left + container.scrollLeft
    indicator.style.transform = `translateX(${x}px)`
    indicator.style.width = `${targetRect.width}px`
  }
}
