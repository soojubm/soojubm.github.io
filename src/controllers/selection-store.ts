/** 선택 값을 소유하는 컨트롤러(Single/MultipleSelectionController)가 소비자에게 내미는 표면. */
export interface SelectionStore {
  isEmpty(): boolean
  isSelected(value: string): boolean
  isOptionSelected(option: { value: string }): boolean
  setSelected(option: { value: string }, selected: boolean): void
  /** 항목을 누른 것처럼 처리한다. 단일 선택은 그 항목을 고르고, 다중 선택은 켜고 끈다. */
  select(option: { value: string }): void
}
