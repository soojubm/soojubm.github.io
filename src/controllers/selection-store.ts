/** 선택 값을 소유하는 컨트롤러(Single/MultipleSelectionController)가 소비자에게 내미는 표면. */
export interface SelectionStore {
  isEmpty(): boolean
  isSelected(value: string): boolean
  setSelected(option: { value: string }, selected: boolean): void
}
