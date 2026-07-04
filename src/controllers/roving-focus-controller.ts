import type { ReactiveController, ReactiveControllerHost } from 'lit'

type Host = ReactiveControllerHost & HTMLElement
export type Orientation = 'horizontal' | 'vertical' | 'both'

interface RovingFocusControllerOptions {
  // 포커스를 순회할 항목들을 DOM 순서대로 반환한다. 비활성 항목도 포함해 인덱스를 정렬한다.
  getItems: () => HTMLElement[]
  // 방향키 매핑을 결정한다. 함수로 주면 매 입력마다 다시 읽는다.
  orientation?: Orientation | (() => Orientation)
  // Tab으로 진입했을 때 tabindex=0이 될 기준 항목. 보통 선택된 항목이다.
  getActiveIndex?: () => number
  // Enter/Space 활성화를 컨트롤러가 처리해야 하는 비네이티브 항목에서만 넘긴다.
  onActivate?: (index: number) => void
}

// 방향키를 이동 방향(+1/-1)으로 좁힌다. 방향과 무관한 키는 undefined.
function directionFor(key: string, orientation: Orientation): 1 | -1 | undefined {
  const forward = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  const backward = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'

  if (key === forward) return 1
  if (key === backward) return -1
  if (orientation === 'both' && key === 'ArrowDown') return 1
  if (orientation === 'both' && key === 'ArrowUp') return -1
  return undefined
}

// 비활성 항목을 건너뛰며 방향으로 다음 포커스 가능한 인덱스를 찾는다. 경계에서 멈춘다(순환 없음).
function nextFocusableIndex(
  from: number,
  step: 1 | -1,
  isFocusable: (index: number) => boolean,
  length: number,
): number {
  let index = from + step
  while (index >= 0 && index < length) {
    if (isFocusable(index)) return index
    index += step
  }
  return from
}

export class RovingFocusController implements ReactiveController {
  private focusedIndex = -1

  constructor(private host: Host, private options: RovingFocusControllerOptions) {
    host.addController(this)
  }

  hostConnected() {
    this.host.addEventListener('keydown', this.onKeyDown)
  }

  hostDisconnected() {
    this.host.removeEventListener('keydown', this.onKeyDown)
  }

  // 렌더 후 항목이 갱신되면 tab stop 하나만 tabindex=0으로 유지한다.
  hostUpdated() {
    const items = this.options.getItems()
    const tabStop = this.resolveTabStop(items)

    items.forEach((item, index) => {
      item.tabIndex = index === tabStop ? 0 : -1
    })
  }

  private resolveTabStop(items: HTMLElement[]) {
    const focusable = (index: number) => this.isFocusable(items[index])

    if (this.focusedIndex >= 0 && focusable(this.focusedIndex)) return this.focusedIndex

    const active = this.options.getActiveIndex?.() ?? -1
    if (active >= 0 && focusable(active)) return active

    return items.findIndex((_, index) => focusable(index))
  }

  private get orientation(): Orientation {
    const orientation = this.options.orientation ?? 'horizontal'
    return typeof orientation === 'function' ? orientation() : orientation
  }

  private isFocusable(item: HTMLElement | undefined) {
    if (!item) return false
    return !item.hasAttribute('disabled') && item.getAttribute('aria-disabled') !== 'true'
  }

  private onKeyDown = (event: KeyboardEvent) => {
    const items = this.options.getItems()
    if (items.length === 0) return

    const target = this.targetIndex(event, items)
    if (target === undefined) return

    event.preventDefault()

    if (target === 'activate') {
      this.activate(items)
      return
    }

    this.moveFocus(items, target)
  }

  // 키를 목표 인덱스나 'activate'로 해석한다. 처리 대상이 아니면 undefined.
  private targetIndex(event: KeyboardEvent, items: HTMLElement[]): number | 'activate' | undefined {
    const current = this.currentIndex(items)
    const isFocusable = (index: number) => this.isFocusable(items[index])

    if (event.key === 'Home') return nextFocusableIndex(-1, 1, isFocusable, items.length)
    if (event.key === 'End') return nextFocusableIndex(items.length, -1, isFocusable, items.length)

    if (this.options.onActivate && (event.key === 'Enter' || event.key === ' ')) return 'activate'

    const step = directionFor(event.key, this.orientation)
    if (step === undefined) return undefined
    return nextFocusableIndex(current, step, isFocusable, items.length)
  }

  private currentIndex(items: HTMLElement[]) {
    const active = items.indexOf(document.activeElement as HTMLElement)
    if (active >= 0) return active
    return this.resolveTabStop(items)
  }

  private moveFocus(items: HTMLElement[], index: number) {
    this.focusedIndex = index
    items[index]?.focus()
    this.host.requestUpdate()
  }

  private activate(items: HTMLElement[]) {
    const index = this.currentIndex(items)
    if (!this.isFocusable(items[index])) return
    this.options.onActivate?.(index)
  }
}
