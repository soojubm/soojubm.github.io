import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { ScheduleController } from '@/controllers/schedule-controller'

type Host = ReactiveControllerHost & HTMLElement

interface TextareaAutoHeightControllerOptions {
  getTextarea: () => HTMLTextAreaElement | undefined
  getMinVisibleRows: () => number
  getMaxVisibleRows: () => number
}

export class TextareaAutoHeightController implements ReactiveController {
  private frame: ScheduleController

  constructor(host: Host, private options: TextareaAutoHeightControllerOptions) {
    this.frame = new ScheduleController(host, () => this.syncHeight())
    host.addController(this)
  }

  hostUpdated() {
    this.resizeToContent()
  }

  resizeToContent() {
    this.frame.request()
  }

  private syncHeight() {
    const textarea = this.options.getTextarea()
    if (!textarea) return

    textarea.style.height = 'auto'

    const metrics = this.measureTextArea(textarea)
    const contentHeight = textarea.scrollHeight
    const minHeight = metrics.lineHeight * this.options.getMinVisibleRows() + metrics.paddingBlock
    const maxHeight = metrics.lineHeight * this.options.getMaxVisibleRows() + metrics.paddingBlock
    // 숨겨진 상태(scrollHeight 0)에서 측정돼도 rows 높이 아래로 줄어들지 않게 한다.
    const nextHeight = Math.min(Math.max(contentHeight, minHeight), maxHeight)

    textarea.style.height = `${nextHeight}px`
    textarea.style.overflowY = textarea.scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  private measureTextArea(textarea: HTMLTextAreaElement) {
    const computedStyle = window.getComputedStyle(textarea)
    const fontSize = Number.parseFloat(computedStyle.fontSize)
    const lineHeight = Number.parseFloat(computedStyle.lineHeight) || fontSize * 1.2
    const paddingBlock =
      Number.parseFloat(computedStyle.paddingTop) + Number.parseFloat(computedStyle.paddingBottom)

    return { lineHeight, paddingBlock }
  }
}
