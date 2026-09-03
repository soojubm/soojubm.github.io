/** 선택 값을 소유하는 컨트롤러(Single/MultipleSelectionController)에게서 위임받는 표면. */
export interface SelectionStore {
  isSelected(value: string): boolean
  setSelected(option: { value: string }, selected: boolean): void
}

/** slot으로 배정되는 선택 항목이 공통으로 갖는 상태. */
export interface SelectionGroupItem extends HTMLElement {
  value?: string
  checked: boolean
}

interface SelectionGroupOptions<T extends SelectionGroupItem> {
  /** 선택 값을 소유하는 컨트롤러 */
  selection: SelectionStore
  /** slot에 배정된 항목. queryAssignedElements 결과를 그대로 넘긴다 */
  getItems: () => T[]
  /** 그룹이 아직 선택을 갖지 않았는지. 마크업의 초기 선택을 흡수할지 판단한다 */
  isEmpty: () => boolean
  /** checked 외에 그룹이 항목으로 내려보내는 상태(name, disabled 등) */
  applyItem?: (item: T) => void
  /** 선택이 바뀐 뒤 그룹의 change를 발행한다 */
  onChange: () => void
}

/**
 * slot으로 받은 항목의 선택 상태를 그룹이 소유하게 하는 배관.
 * 값 자체는 selection이 소유하고, 이 컨트롤러는 항목 수집 → 마크업 초기 선택 흡수 →
 * 그룹 상태를 항목에 반영 → 항목의 change를 그룹 change로 승격까지의 왕복만 맡는다.
 * checkbox·radio 계열 그룹이 초기화·커밋 순서를 같게 갖는 것이 목적이다.
 */
export class SelectionGroupController<T extends SelectionGroupItem> {
  // 첫 slot 배정 전에는 마크업이 선언한 초기 선택을 아직 읽지 못한 상태다.
  private initialized = false

  constructor(private options: SelectionGroupOptions<T>) {}

  /** slot의 slotchange에 그대로 연결한다. */
  handleSlotChange = () => {
    if (!this.initialized) this.absorbInitialSelection()
    this.initialized = true

    this.sync()
  }

  /** 항목의 change가 올라오는 컨테이너에 그대로 연결한다. */
  handleItemChange = (event: Event) => {
    const item = this.options.getItems().find(candidate => candidate === event.target)
    if (!item) return

    // 항목 단위 이벤트는 여기서 끊고 그룹 단위 change로 승격한다.
    event.stopPropagation()

    this.options.selection.setSelected({ value: selectionItemValue(item) }, item.checked)
    this.sync()
    this.options.onChange()
  }

  /** 그룹이 소유한 선택 상태를 항목에 되돌린다. */
  sync() {
    // 첫 렌더의 updated()는 slotchange보다 먼저 도는데, 그때 되돌리면
    // 마크업이 선언한 초기 선택을 흡수하기도 전에 지워버린다.
    if (!this.initialized) return

    this.options.getItems().forEach(item => {
      this.options.applyItem?.(item)
      item.checked = this.options.selection.isSelected(selectionItemValue(item))
    })
  }

  // 마크업이 선언한 초기 선택은 그룹이 아직 값을 갖지 않았을 때만 흡수한다.
  // 항목 순서대로 위임하므로 다중 선택은 전부 남고, 단일 선택은 네이티브 radio처럼 마지막 항목이 남는다.
  private absorbInitialSelection() {
    if (!this.options.isEmpty()) return

    this.options
      .getItems()
      .filter(item => item.checked)
      .forEach(item =>
        this.options.selection.setSelected({ value: selectionItemValue(item) }, true),
      )
  }
}

/** 아직 업그레이드되지 않은 항목도 값을 잃지 않도록 attribute를 함께 본다. */
export const selectionItemValue = (item: SelectionGroupItem) =>
  item.value || item.getAttribute('value') || ''
