import type { SelectionStore } from '@/controllers/selection-store'

type SelectionOption = { value: string }

interface SingleSelectionOptions {
  getValue: () => string
  /** 값은 컴포넌트의 reactive property라 대입하면 컴포넌트가 스스로 다시 그린다 */
  setValue: (value: string) => void
}

/** 항목을 누르면 그 항목 하나만 선택하고, 선택된 항목을 다시 누르면 해제하는 클래스. */
export class SingleSelection implements SelectionStore {
  constructor(private options: SingleSelectionOptions) {}

  select(option: SelectionOption) {
    this.setSelected(option, true)
  }

  setSelected(option: SelectionOption, selected: boolean) {
    this.options.setValue(selected ? option.value : '')
  }

  isEmpty() {
    return !this.options.getValue()
  }

  isSelected(value: string) {
    return this.options.getValue() === value
  }

  isOptionSelected(option: SelectionOption) {
    return this.isSelected(option.value)
  }
}
