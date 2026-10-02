import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { ResizeController } from '@/controllers/resize-controller'
import { ScheduleController } from '@/controllers/schedule-controller'

type Host = ReactiveControllerHost & HTMLElement

interface TextareaAutoHeightControllerOptions {
  getTextarea: () => HTMLTextAreaElement | undefined
  getMinVisibleRows: () => number
  getMaxVisibleRows: () => number
}

/**
 * 내용과 폭에 맞춰 textarea 높이를 rows 범위 안에서 맞추는 ReactiveController.
 * 렌더가 끝날 때마다 다시 재고, textarea의 크기가 바뀌어도 다시 잰다. 숨겨진 채 측정됐다가 보이게 되거나
 * 폭이 바뀌어 줄바꿈이 달라지는 경우 렌더가 없어도 높이가 어긋나기 때문이다.
 */
export class TextareaAutoHeightController implements ReactiveController {
  private frame: ScheduleController

  constructor(host: Host, private options: TextareaAutoHeightControllerOptions) {
    this.frame = new ScheduleController(host, () => this.syncHeight())
    new ResizeController(host, {
      getTargets: () => [this.options.getTextarea()],
      onResize: () => this.resizeToContent(),
    })
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
