import type { SelectionStore } from '@/controllers/selection-store'

type SelectionOption = { value: string }

interface SingleSelectionControllerOptions {
  getValue: () => string
  /** 값은 호스트의 reactive property라 대입하면 호스트가 스스로 다시 그린다 */
  setValue: (value: string) => void
}

export class SingleSelectionController implements SelectionStore {
  constructor(private options: SingleSelectionControllerOptions) {}

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
