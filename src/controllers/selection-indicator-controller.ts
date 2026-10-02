import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { ResizeController } from '@/controllers/resize-controller'
import { ScheduleController } from '@/controllers/schedule-controller'

type Host = ReactiveControllerHost & HTMLElement
type SelectionIndicatorAxis = 'x' | 'y'

interface SelectionIndicatorControllerOptions {
  axis: SelectionIndicatorAxis
  autoUpdate?: boolean
  getContainer?: () => HTMLElement | undefined
  getIndicator: () => HTMLElement | undefined
  getTarget: () => HTMLElement | undefined
}

/**
 * 선택된 항목 아래·곁에 인디케이터를 놓는 ReactiveController.
 * 위치는 선택이 바뀔 때 update로 다시 재고, 컨테이너나 그 자식(항목)의 크기가 바뀔 때도 다시 잰다.
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
    if (this.options.autoUpdate) this.update()
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

    if (!target) {
      this.resetIndicator(indicator)
      return
    }

    indicator.style.removeProperty('opacity')

    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()

    if (this.options.axis === 'x') {
      // 컨테이너가 가로 스크롤되면 인디케이터도 스크롤 콘텐츠 기준으로 놓이므로 scrollLeft만큼 되돌린다.
      const x = targetRect.left - containerRect.left + container.scrollLeft
      indicator.style.transform = `translateX(${x}px)`
      indicator.style.width = `${targetRect.width}px`
      return
    }

    const indicatorRect = indicator.getBoundingClientRect()
    const y = targetRect.top - containerRect.top + targetRect.height / 2 - indicatorRect.height / 2
    indicator.style.setProperty('--selection-indicator-y', `${y}px`)
  }

  private resetIndicator(indicator: HTMLElement) {
    if (this.options.axis === 'x') {
      indicator.style.width = '0px'
      return
    }

    indicator.style.opacity = '0'
  }
}
