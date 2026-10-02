import type { ReactiveController, ReactiveControllerHost } from 'lit'

import { getDeepActiveElement } from '@/utils'

type Host = ReactiveControllerHost & HTMLElement
export type Orientation = 'horizontal' | 'vertical'

interface RovingFocusControllerOptions {
  // 포커스를 순회할 항목들을 DOM 순서대로 반환한다. 비활성 항목도 포함해 인덱스를 정렬한다.
  getItems: () => HTMLElement[]
  // 방향키 매핑을 결정한다. 함수로 주면 매 입력마다 다시 읽는다.
  orientation?: Orientation | (() => Orientation)
  // 끝에서 반대편 끝으로 이어 순환한다. 기본은 경계에서 멈춘다. 탭처럼 순환하는 패턴에서 켠다.
  wrap?: boolean
  // Tab으로 진입했을 때 tabindex=0이 될 기준 항목. 보통 선택된 항목이다.
  getActiveIndex?: () => number
  // 키보드로 포커스를 옮긴 뒤 호출한다. 이동이 곧 선택인 radiogroup에서 넘긴다.
  onFocusMove?: (index: number) => void
}

// 방향키를 이동 방향(+1/-1)으로 좁힌다. 방향과 무관한 키는 undefined.
function directionFor(key: string, orientation: Orientation): 1 | -1 | undefined {
  const forward = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight'
  const backward = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft'

  if (key === forward) return 1
  if (key === backward) return -1
  return undefined
}

// 비활성 항목을 건너뛰며 방향으로 다음 포커스 가능한 인덱스를 찾는다. 순환하지 않으면 경계에서 멈춘다.
function nextFocusableIndex(
  from: number,
  step: 1 | -1,
  isFocusable: (index: number) => boolean,
  length: number,
  wrap: boolean,
): number {
  for (let offset = 1; offset <= length; offset++) {
    const index = from + step * offset
    if (!wrap && (index < 0 || index >= length)) return from

    const candidate = (index + length) % length
    if (isFocusable(candidate)) return candidate
  }
  return from
}

export class RovingFocusController implements ReactiveController {
  constructor(private host: Host, private options: RovingFocusControllerOptions) {
    host.addController(this)
    // 리스너 대상이 host 자신이라 연결이 바뀌어도 유지되므로 생성자에서 한 번만 등록한다.
    host.addEventListener('keydown', this.handleKeydown)
    host.addEventListener('focusin', this.handleFocusChange)
    host.addEventListener('focusout', this.handleFocusChange)
  }

  // 렌더 후 항목이 갱신되면 tab stop 하나만 tabindex=0으로 유지한다.
  hostUpdated() {
    this.refresh()
  }

  /** tab stop을 다시 맞춘다. 호스트 렌더와 무관하게 항목이나 기준 항목이 바뀌면 직접 부른다. */
  refresh() {
    const items = this.options.getItems()
    const tabStop = this.resolveTabStop(items)

    items.forEach((item, index) => {
      item.tabIndex = index === tabStop ? 0 : -1
    })
  }

  private resolveTabStop(items: HTMLElement[]) {
    const focusable = (index: number) => this.isFocusable(items[index])

    // 포커스가 그룹 안에 있으면 그 항목이, 밖에 있으면 기준 항목이 tab stop이다.
    // 마지막으로 키보드로 옮긴 항목을 기억하지 않으므로 클릭으로 고른 항목과 어긋나지 않는다.
    const focused = items.indexOf(getDeepActiveElement() as HTMLElement)
    if (focused >= 0 && focusable(focused)) return focused

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

  // 기준 항목(보통 선택된 항목)으로 포커스를 옮긴다. 목록 표면이 열릴 때 쓴다.
  focusTabStop() {
    const items = this.options.getItems()
    const tabStop = this.resolveTabStop(items)
    items[tabStop]?.focus()
  }

  private handleFocusChange = () => {
    this.refresh()
  }
  private handleKeydown = (event: KeyboardEvent) => {
    // 중첩된 그룹이 이미 처리한 키는 바깥 그룹이 다시 처리하지 않는다.
    if (event.defaultPrevented) return

    const items = this.options.getItems()
    if (items.length === 0) return

    const target = this.targetIndex(event, items)
    if (target === undefined) return

    event.preventDefault()
    items[target]?.focus()
    this.options.onFocusMove?.(target)
  }

  // 키를 목표 인덱스로 해석한다. 처리 대상이 아니면 undefined.
  private targetIndex(event: KeyboardEvent, items: HTMLElement[]): number | undefined {
    const isFocusable = (index: number) => this.isFocusable(items[index])
    const wrap = this.options.wrap ?? false
    const next = (from: number, step: 1 | -1) =>
      nextFocusableIndex(from, step, isFocusable, items.length, wrap)

    if (event.key === 'Home') return next(-1, 1)
    if (event.key === 'End') return next(items.length, -1)

    const step = directionFor(event.key, this.orientation)
    if (step === undefined) return undefined

    return next(this.resolveTabStop(items), step)
  }
}
