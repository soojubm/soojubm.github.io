import type { ReactiveController, ReactiveControllerHost } from 'lit'

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
  private updateFrame = 0

  constructor(private host: Host, private options: SelectionIndicatorControllerOptions) {
    host.addController(this)
  }

  hostDisconnected() {
    cancelAnimationFrame(this.updateFrame)
  }

  hostUpdated() {
    if (this.options.autoUpdate) this.update()
  }

  update = () => {
    cancelAnimationFrame(this.updateFrame)
    this.updateFrame = requestAnimationFrame(() => {
      this.updateFrame = 0
      this.syncPosition()
    })
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
      indicator.style.transform = `translateX(${targetRect.left - containerRect.left}px)`
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
