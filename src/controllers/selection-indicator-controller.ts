import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { FrameController } from '@/controllers/frame-controller'

type Host = ReactiveControllerHost & HTMLElement
type SelectionIndicatorAxis = 'x' | 'y'

interface SelectionIndicatorControllerOptions {
  axis: SelectionIndicatorAxis
  autoUpdate?: boolean
  getContainer?: () => HTMLElement | undefined
  getIndicator: () => HTMLElement | undefined
  getTarget: () => HTMLElement | undefined
}

export class SelectionIndicatorController implements ReactiveController {
  private frame: FrameController

  constructor(private host: Host, private options: SelectionIndicatorControllerOptions) {
    this.frame = new FrameController(host, () => this.syncPosition())
    host.addController(this)
  }

  hostUpdated() {
    if (this.options.autoUpdate) this.update()
  }

  update = () => {
    this.frame.request()
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
