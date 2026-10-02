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
 * 위치는 호스트가 렌더될 때마다, 그리고 컨테이너나 그 자식(항목)의 크기가 바뀔 때 다시 잰다. 측정은 다음 프레임 하나로 합친다.
 * 호스트 렌더 없이 선택이나 항목이 바뀌면(slot으로 받은 항목 등) update를 직접 부른다.
 * 웹폰트가 늦게 로드되거나 창 폭이 바뀌면 선택된 항목의 크기뿐 아니라 앞선 항목 때문에 위치도 밀리므로,
 * 선택된 항목만이 아니라 컨테이너의 자식 전체를 관찰한다.
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

  hostUpdated() {
    this.update()
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
