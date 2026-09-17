import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement

interface TextareaAutoHeightControllerOptions {
  getTextarea: () => HTMLTextAreaElement | undefined
  getMinVisibleRows: () => number
  getMaxVisibleRows: () => number
  onSingleLineChange?: (isSingleLine: boolean) => void
}

export class TextareaAutoHeightController implements ReactiveController {
  private resizeFrame = 0
  isSingleLine = true

  constructor(private host: Host, private options: TextareaAutoHeightControllerOptions) {
    host.addController(this)
  }

  hostUpdated() {
    this.resizeToContent()
  }

  hostDisconnected() {
    cancelAnimationFrame(this.resizeFrame)
  }

  resizeToContent() {
    cancelAnimationFrame(this.resizeFrame)
    this.resizeFrame = requestAnimationFrame(() => {
      this.resizeFrame = 0
      this.syncHeight()
    })
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

    this.updateSingleLine(contentHeight < metrics.lineHeight * 2 + metrics.paddingBlock)
  }

  private updateSingleLine(isSingleLine: boolean) {
    if (isSingleLine === this.isSingleLine) return

    this.isSingleLine = isSingleLine
    this.options.onSingleLineChange?.(isSingleLine)
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
