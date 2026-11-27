import { html, nothing } from 'lit'
import { styleMap, type StyleInfo } from 'lit/directives/style-map.js'

import type { PopoverPlacement } from '@/components/overlay/popover/popover'
import type { AdaptiveOverlay } from '@/controllers/adaptive-overlay'

import '@/components/overlay/popover/popover'
import '@/components/overlay/sheet'

interface AdaptiveOverlayOptions {
  /** sheet의 접근성 이름이자 제목 */
  label: string
  placement: PopoverPlacement
  anchor?: HTMLElement
  /** popover는 portal로 옮겨져 컴포넌트의 shadow 스타일이 닿지 않으므로 패널 변수는 인라인으로 싣는다 */
  popoverStyle?: StyleInfo
}

/**
 * 넓은 화면의 popover와 좁은 화면의 sheet를 함께 그리고, AdaptiveOverlay가 고른 표면에만 content를 넣는다.
 * 표면은 연결되는 순간 portal로 옮겨져 Lit의 템플릿 범위를 벗어나므로, 조건부로 걷어내지 않고 늘 마운트해 둔다.
 */
export function renderAdaptiveOverlay(
  overlay: AdaptiveOverlay,
  content: unknown,
  { label, placement, anchor, popoverStyle = {} }: AdaptiveOverlayOptions,
) {
  return html`
    <mm-popover
      placement=${placement}
      .anchor=${anchor}
      ?open=${overlay.popoverOpen}
      style=${styleMap(popoverStyle)}
      @toggle=${overlay.handlePopoverToggle}
    >
      ${overlay.isViewportCompact ? nothing : content}
    </mm-popover>
    <mm-sheet
      aria-label=${label || nothing}
      ?open=${overlay.sheetOpen}
      @toggle=${overlay.handleSheetToggle}
    >
      <mm-sheet-header heading=${label}></mm-sheet-header>
      <mm-sheet-body>${overlay.isViewportCompact ? content : nothing}</mm-sheet-body>
    </mm-sheet>
  `
}
